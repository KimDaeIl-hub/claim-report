import { useState } from "react";
import {
  User,
  Package,
  Microscope,
  Cpu,
  History,
  AlertOctagon,
  FileCheck,
  Paperclip,
  EyeOff,
  Eye,
  Plus,
  Trash2,
  HelpCircle,
  Wand2,
  Sparkles,
  Settings,
  FileUp,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";
import { ReportData, PhysicochemicalItem, ClaimPreset } from "../types";
import { getAllPresets } from "../data/presets";
import { parseMhtFile } from "../utils/mhtParser";
import { mergePresetData, isUserPhoto } from "../utils/storage";
import { AiPolishButton } from "./AiPolishButton";
import { PhraseDropdown } from "./PhraseDropdown";
import { PhotoUploadField } from "./PhotoUploadField";
import { TestPrincipleBox } from "./TestPrincipleBox";
import { CompanyLogoUploader } from "./CompanyLogoUploader";
import { PresetSelectorBar } from "./PresetSelectorBar";

interface InputFormPaneProps {
  report: ReportData;
  onChange: (updated: ReportData) => void;
  onOpenPhraseManager: (fieldKey?: string) => void;
  onOpenPresetManager?: () => void;
  activeSectionId?: string;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function InputFormPane({
  report,
  onChange,
  onOpenPhraseManager,
  onOpenPresetManager,
  activeSectionId,
  activeTab: propActiveTab,
  onTabChange,
}: InputFormPaneProps) {
  const [internalTab, setInternalTab] = useState<string>("claim");
  const activeTab = propActiveTab !== undefined ? propActiveTab : internalTab;
  const setActiveTab = (tabId: string) => {
    if (onTabChange) onTabChange(tabId);
    setInternalTab(tabId);
  };

  const [usePreset, setUsePreset] = useState<boolean>(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [mhtStatus, setMhtStatus] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [isDraggingMht, setIsDraggingMht] = useState(false);

  // Photo counts for tabs to provide visual assurance that photos exist
  const customerPhotoCount = (report.customerClaim?.customerPhotos || []).filter(isUserPhoto).length;
  const lotPhotoCount = (report.lotHistory?.retainedSamplePhotos || []).filter(isUserPhoto).length;
  const attPhotoCount = [
    ...(report.attachments?.attachment1Photos || []),
    ...(report.attachments?.attachment2Photos || []),
    ...(report.attachments?.attachment3Photos || []),
  ].filter(isUserPhoto).length;

  const getTabPhotoBadge = (tabId: string) => {
    if (tabId === "claim" && customerPhotoCount > 0) return customerPhotoCount;
    if (tabId === "lot" && lotPhotoCount > 0) return lotPhotoCount;
    if ((tabId === "attach" || tabId === "attachments") && attPhotoCount > 0) return attPhotoCount;
    return 0;
  };

  const handleMhtFileUpload = async (file: File) => {
    try {
      const parsed = await parseMhtFile(file);
      const updatedReport: ReportData = { ...report };

      // Update customerClaim
      const newClaim = { ...updatedReport.customerClaim };
      if (parsed.customerName) newClaim.customerName = parsed.customerName;
      if (parsed.receivedAt) newClaim.receivedAt = parsed.receivedAt;
      if (parsed.channel) newClaim.channel = parsed.channel;
      if (parsed.claimDetails) newClaim.claimDetails = parsed.claimDetails;
      updatedReport.customerClaim = newClaim;

      // Update productInfo (automatically syncs across tabs)
      const newProduct = { ...updatedReport.productInfo };
      if (parsed.productName) newProduct.productName = parsed.productName;
      if (parsed.expiryDate) newProduct.expiryDate = parsed.expiryDate;
      if (parsed.lotNumber) newProduct.lotNumber = parsed.lotNumber;
      if (parsed.manufacturer) newProduct.manufacturer = parsed.manufacturer;
      updatedReport.productInfo = newProduct;

      // Metadata (조사는 언제나 식품품질경영팀에서 수행하며, MHT의 커뮤니케이션팀 기안자/문서번호로 덮어쓰지 않음)
      updatedReport.department = "식품품질경영팀";
      
      // MHT 접수 문서번호가 커뮤니케이션팀 번호인 경우 QM 문서번호 형식으로 변환 또는 보존
      if (parsed.incomingDocNumber) {
        const numMatch = parsed.incomingDocNumber.match(/\d{4}[-_][A-Za-z0-9]+/);
        if (numMatch) {
          updatedReport.docNumber = `광동 QM ${numMatch[0]}`;
        } else if (!updatedReport.docNumber || updatedReport.docNumber.includes("커뮤니케이션팀")) {
          updatedReport.docNumber = "광동 QM 2026-C04";
        }
      } else if (!updatedReport.docNumber || updatedReport.docNumber.includes("커뮤니케이션팀")) {
        updatedReport.docNumber = "광동 QM 2026-C04";
      }

      // 조사 담당 연구원은 식품품질경영팀 연구원 유지 (CS 접수자 박병철 등은 접수 채널로만 기록)
      if (!updatedReport.researcherName || updatedReport.researcherName.includes("박병철")) {
        updatedReport.researcherName = "담당 연구원 김진영 대리";
      }

      // 승인 서명권자는 식품품질경영팀장(신준호) 유지
      if (!updatedReport.teamLeader || updatedReport.teamLeader.includes("이정우")) {
        updatedReport.teamLeader = "신준호";
      }

      onChange(updatedReport);

      const itemsExtracted = [
        parsed.customerName ? `소비자/상호: ${parsed.customerName}` : "",
        parsed.productName ? `제품명: ${parsed.productName}` : "",
        parsed.receivedAt ? `접수일자: ${parsed.receivedAt}` : "",
        parsed.expiryDate ? `소비기한: ${parsed.expiryDate}` : "",
      ].filter(Boolean).join(", ");

      setMhtStatus({
        type: "success",
        message: `그룹웨어 보고서(.mht)에서 정보를 성공적으로 추출하여 자동 기입했습니다! (${itemsExtracted || "주요 항목 반영 완료"})`,
      });
    } catch (err: any) {
      console.error(err);
      setMhtStatus({
        type: "error",
        message: "파일 파싱 중 오류가 발생했습니다. 올바른 .mht 파일인지 확인해 주세요.",
      });
    }
  };

  const updateCustomerClaim = (patch: Partial<ReportData["customerClaim"]>) => {
    onChange({
      ...report,
      customerClaim: { ...report.customerClaim, ...patch },
    });
  };

  const updateProductInfo = (patch: Partial<ReportData["productInfo"]>) => {
    onChange({
      ...report,
      productInfo: { ...report.productInfo, ...patch },
    });
  };

  const updateAnalysisResults = (patch: Partial<ReportData["analysisResults"]>) => {
    onChange({
      ...report,
      analysisResults: { ...report.analysisResults, ...patch },
    });
  };

  const updateManufacturingProcess = (patch: Partial<ReportData["manufacturingProcess"]>) => {
    onChange({
      ...report,
      manufacturingProcess: { ...report.manufacturingProcess, ...patch },
    });
  };

  const updateLotHistory = (patch: Partial<ReportData["lotHistory"]>) => {
    const newLotHistory = { ...report.lotHistory, ...patch };
    const newAttachments =
      patch.retainedSamplePhotos !== undefined
        ? { ...report.attachments, attachment2Photos: patch.retainedSamplePhotos }
        : report.attachments;
    onChange({
      ...report,
      lotHistory: newLotHistory,
      attachments: newAttachments,
    });
  };

  const updateRootCause = (patch: Partial<ReportData["rootCauseAndActions"]>) => {
    onChange({
      ...report,
      rootCauseAndActions: { ...report.rootCauseAndActions, ...patch },
    });
  };

  const updateConclusion = (patch: Partial<ReportData["conclusion"]>) => {
    onChange({
      ...report,
      conclusion: { ...report.conclusion, ...patch },
    });
  };

  const updateAttachments = (patch: Partial<ReportData["attachments"]>) => {
    onChange({
      ...report,
      attachments: { ...report.attachments, ...patch },
    });
  };

  // Physicochemical test item helpers
  const handleAddPhysicochemicalItem = () => {
    const today = new Date().toISOString().split("T")[0].replace(/-/g, ".");
    const newItem: PhysicochemicalItem = {
      id: `pc-${Date.now()}`,
      testDate: today,
      name: "신규 시험 항목",
      unit: "-",
      standard: "기준치 입력",
      controlValue: "-",
      sampleValue: "-",
      judgment: "적합",
      remarks: "출하 시점",
    };
    updateAnalysisResults({
      physicochemicalAnalysis: {
        ...report.analysisResults.physicochemicalAnalysis,
        items: [...report.analysisResults.physicochemicalAnalysis.items, newItem],
      },
    });
  };

  const handleUpdatePhysicochemicalItem = (
    id: string,
    field: keyof PhysicochemicalItem,
    val: any
  ) => {
    const updated = report.analysisResults.physicochemicalAnalysis.items.map((item) =>
      item.id === id ? { ...item, [field]: val } : item
    );
    updateAnalysisResults({
      physicochemicalAnalysis: {
        ...report.analysisResults.physicochemicalAnalysis,
        items: updated,
      },
    });
  };

  const handleDeletePhysicochemicalItem = (id: string) => {
    const updated = report.analysisResults.physicochemicalAnalysis.items.filter(
      (item) => item.id !== id
    );
    updateAnalysisResults({
      physicochemicalAnalysis: {
        ...report.analysisResults.physicochemicalAnalysis,
        items: updated,
      },
    });
  };

  // Additional test helpers
  const handleAddAdditionalTest = () => {
    const newTest = {
      id: `add-test-${Date.now()}`,
      title: "추가 정밀 시험 (예: 미생물 배양)",
      result: "해당 검사 결과 상세 내용을 기재하세요.",
      includePrinciple: false,
      principleText: "",
      skipped: false,
    };
    updateAnalysisResults({
      additionalTests: [...(report.analysisResults.additionalTests || []), newTest],
    });
  };

  // Summary points helpers
  const handleAddSummaryPoint = () => {
    updateConclusion({
      summaryPoints: [...(report.conclusion.summaryPoints || []), "조사 결과 요약 항목을 입력하세요."],
    });
  };

  const handleUpdateSummaryPoint = (index: number, val: string) => {
    const updated = [...(report.conclusion.summaryPoints || [])];
    updated[index] = val;
    updateConclusion({ summaryPoints: updated });
  };

  const handleDeleteSummaryPoint = (index: number) => {
    const updated = (report.conclusion.summaryPoints || []).filter((_, i) => i !== index);
    updateConclusion({ summaryPoints: updated });
  };

  const TABS = [
    { id: "claim", label: "1. 클레임 접수", icon: User },
    { id: "product", label: "2. 제품 정보", icon: Package },
    { id: "analysis", label: "3. 정밀 분석", icon: Microscope },
    { id: "process", label: "4. 제조 공정", icon: Cpu },
    { id: "lot", label: "5. 동일 Lot 이력", icon: History },
    { id: "cause", label: "6. 원인 및 대책", icon: AlertOctagon },
    { id: "conclusion", label: "7. 결론/사과문", icon: FileCheck },
    { id: "attachments", label: "8.0 사진 첨부", icon: Paperclip },
  ];

  const allPresets = getAllPresets();

  const handleSelectPreset = (preset: ClaimPreset) => {
    setSelectedPresetId(preset.id);
    onChange(mergePresetData(report, preset.data));
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Tabs Navigation */}
      <div className="shrink-0 bg-white border-b border-slate-200 px-2 overflow-x-auto flex gap-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const badgeCount = getTabPhotoBadge(tab.id);
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                isActive
                  ? "border-blue-600 text-blue-600 bg-blue-50/40"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {badgeCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                  사진 {badgeCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Form Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
        {/* [1] 클레임 접수 및 고객 정보 */}
        {activeTab === "claim" && (
          <div className="space-y-4 animate-in fade-in duration-100">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">클레임 접수 및 고객 정보</h3>
              <span className="text-xs text-slate-500">불만 인입 경위 및 고객 정보 기재</span>
            </div>

            {/* 클레임 유형 프리셋 설정 여부 (사용자 요청: 클릭 시에만 Yes/No 및 프리셋 목록 노출) */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>클레임 유형 표준 프리셋 설정 여부</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    자주 발생하는 클레임 유형(이물, 침전물, 변색, 팽창 등)의 표준 분석 문구를 선택 적용할 수 있습니다.
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-300 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setUsePreset(false);
                      setSelectedPresetId(null);
                    }}
                    className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                      !usePreset
                        ? "bg-slate-700 text-white shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    No (직접 작성)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUsePreset(true)}
                    className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                      usePreset
                        ? "bg-blue-600 text-white shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Yes (프리셋 선택)
                  </button>
                </div>
              </div>

              {/* Yes일 경우 관련 프리셋 선택 및 관리 UI (대분류 자사/외주, 세부분류, 한줄 선택) */}
              {usePreset && (
                <div className="pt-2 border-t border-slate-200 animate-in fade-in duration-150">
                  <PresetSelectorBar
                    presets={allPresets}
                    selectedPresetId={selectedPresetId}
                    onSelectPreset={handleSelectPreset}
                    onClearPreset={() => setSelectedPresetId(null)}
                    onOpenPresetManager={onOpenPresetManager}
                  />
                </div>
              )}
            </div>

            {/* [그룹웨어 .mht 파일 자동 입력 드롭존] */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingMht(true);
              }}
              onDragLeave={() => setIsDraggingMht(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingMht(false);
                const file = e.dataTransfer.files?.[0];
                if (file) handleMhtFileUpload(file);
              }}
              className={`p-3.5 rounded-xl border-2 border-dashed transition-all ${
                isDraggingMht
                  ? "border-blue-500 bg-blue-50/70"
                  : "border-blue-300 bg-gradient-to-r from-blue-50/50 via-slate-50 to-indigo-50/40 hover:border-blue-400"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="p-2 bg-blue-600 text-white rounded-lg shrink-0 mt-0.5 shadow-xs">
                    <FileUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        그룹웨어 클레임 보고서(.mht) 파일 자동 입력
                      </span>
                      <span className="text-[10px] font-semibold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                        원클릭 파싱
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                      그룹웨어 전자결재에서 전달받은 <strong className="font-semibold text-slate-800">.mht 보고서</strong>를 올리면 소비자명, 제품명, 사용기한, 접수일자, 불만내용 등이 자동으로 채워집니다.
                    </p>
                  </div>
                </div>

                <label className="shrink-0 cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs hover:shadow">
                  <Upload className="w-3.5 h-3.5" />
                  <span>.mht 파일 선택</span>
                  <input
                    type="file"
                    accept=".mht,.mhtml,.html,.htm"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleMhtFileUpload(file);
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>

              {mhtStatus && (
                <div
                  className={`mt-3 p-2.5 rounded-lg text-xs flex items-start justify-between gap-2 animate-in fade-in duration-200 ${
                    mhtStatus.type === "success"
                      ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
                      : "bg-red-50 border border-red-200 text-red-900"
                  }`}
                >
                  <div className="flex items-start gap-1.5">
                    {mhtStatus.type === "success" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    )}
                    <span className="leading-snug">{mhtStatus.message}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMhtStatus(null)}
                    className="text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* 입력 폼 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 1. 클레임 접수일자 (일시/시간 제외, 날짜만 기입) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  클레임 접수일자 <span className="text-slate-400 font-normal">(날짜)</span>
                </label>
                <input
                  type="date"
                  value={report.customerClaim.receivedAt ? report.customerClaim.receivedAt.split("T")[0] : ""}
                  onChange={(e) => updateCustomerClaim({ receivedAt: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* 2. 현품 접수 일자 */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  현품 접수 일자 <span className="text-slate-400 font-normal">(실물 시료 입고일)</span>
                </label>
                <input
                  type="date"
                  value={report.customerClaim.sampleReceivedDate || ""}
                  onChange={(e) => updateCustomerClaim({ sampleReceivedDate: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* 3. 제품명 (작성 시 제품 정보 탭에 자동 반영) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">제품명 (규격/용량 포함)</label>
                  <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-medium">
                    제품 정보 연동
                  </span>
                </div>
                <input
                  type="text"
                  value={report.productInfo.productName}
                  onChange={(e) => updateProductInfo({ productName: e.target.value })}
                  placeholder="예: 썬키스트 감귤주스 1.5L"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none font-medium"
                />
              </div>

              {/* 4. 사용기한 / 소비기한 (작성 시 제품 정보 탭에 자동 반영) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">사용(소비)기한</label>
                  <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-medium">
                    제품 정보 연동
                  </span>
                </div>
                <input
                  type="text"
                  value={report.productInfo.expiryDate}
                  onChange={(e) => updateProductInfo({ expiryDate: e.target.value })}
                  placeholder="예: 2026.12.31 또는 2026-12-31"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none font-medium"
                />
              </div>

              {/* 5. 소비자 성명 / 거래처 상호 */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">소비자 성명 / 거래처 상호</label>
                  <label className="flex items-center gap-1 text-[11px] text-slate-500 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={report.customerClaim.maskCustomerName}
                      onChange={(e) =>
                        updateCustomerClaim({ maskCustomerName: e.target.checked })
                      }
                      className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                    />
                    <span>성명 마스킹 (예: 김*수)</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={report.customerClaim.customerName}
                  onChange={(e) => updateCustomerClaim({ customerName: e.target.value })}
                  placeholder="예: GS25서면경암점 또는 김철수"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* 6. 인입 채널 */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">인입 채널 / 접수자</label>
                <input
                  type="text"
                  value={report.customerClaim.channel}
                  onChange={(e) => updateCustomerClaim({ channel: e.target.value })}
                  placeholder="예: 그룹웨어 커뮤니케이션팀 접수, 고객상담센터"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  클레임 접수 세부 내용 (인입 경위 및 증상)
                </label>
                <div className="flex items-center gap-1.5">
                  <AiPolishButton
                    text={report.customerClaim.claimDetails}
                    fieldName="클레임 접수 내용"
                    onApply={(polished) => updateCustomerClaim({ claimDetails: polished })}
                  />
                </div>
              </div>
              <textarea
                rows={4}
                value={report.customerClaim.claimDetails}
                onChange={(e) => updateCustomerClaim({ claimDetails: e.target.value })}
                placeholder="고객이 제품을 구매·개봉하여 문제를 인지하게 된 구체적 경위, 음용/섭취 여부, 위해 증상 유무 등을 상세히 기재하세요."
                className="w-full text-xs p-3 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none leading-relaxed"
              />
            </div>

            <PhotoUploadField
              label="고객 접수 사진 (인입 시 전달받은 사진)"
              photos={report.customerClaim.customerPhotos}
              onChange={(photos) => updateCustomerClaim({ customerPhotos: photos })}
              maxPhotos={3}
            />
          </div>
        )}

        {/* [2] 접수 제품 정보 */}
        {activeTab === "product" && (
          <div className="space-y-4 animate-in fade-in duration-100">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">접수 대상 제품 정보</h3>
              <span className="text-xs text-slate-500">제품 라벨 및 생산 이력 식별 번호</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  제품명 (규격/용량 포함)
                </label>
                <input
                  type="text"
                  value={report.productInfo.productName}
                  onChange={(e) => updateProductInfo({ productName: e.target.value })}
                  placeholder="예: 유기농 프리미엄 콤부차 오리지널 350ml"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  제조번호 (Lot No.)
                </label>
                <input
                  type="text"
                  value={report.productInfo.lotNumber}
                  onChange={(e) => updateProductInfo({ lotNumber: e.target.value })}
                  placeholder="예: LOT-26A18-F1"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none font-mono font-semibold text-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  용기 및 포장 형태
                </label>
                <input
                  type="text"
                  value={report.productInfo.packageType}
                  onChange={(e) => updateProductInfo({ packageType: e.target.value })}
                  placeholder="예: 내열 투명 PET (28mm 알루미늄 캡)"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">제조일자</label>
                <input
                  type="date"
                  value={report.productInfo.manufactureDate}
                  onChange={(e) => updateProductInfo({ manufactureDate: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">소비기한</label>
                <input
                  type="date"
                  value={report.productInfo.expiryDate}
                  onChange={(e) => updateProductInfo({ expiryDate: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  제조처 (공장 및 생산라인명)
                </label>
                <input
                  type="text"
                  value={report.productInfo.manufacturer}
                  onChange={(e) => updateProductInfo({ manufacturer: e.target.value })}
                  placeholder="예: 충북 진천 제1공장 음료 2호 라인"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* [3] 정밀 분석 결과 (각 항목별 Skip + 원리 자동 삽입) */}
        {activeTab === "analysis" && (
          <div className="space-y-6 animate-in fade-in duration-100">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900">정밀 과학 분석 결과</h3>
                <p className="text-xs text-slate-500">
                  불필요한 조사 항목은 '조사 Skip'을 활성화하면 최종 보고서에서 완전히 제외되고 번호가 자동 재정렬됩니다.
                </p>
              </div>
            </div>

            {/* 1. 현품 확인 결과 */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                report.analysisResults.visualInspection.skipped
                  ? "bg-slate-100/70 border-slate-300 opacity-60"
                  : "bg-white border-slate-300 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">현품 육안 확인 결과</h4>
                </div>
                <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={report.analysisResults.visualInspection.skipped}
                    onChange={(e) =>
                      updateAnalysisResults({
                        visualInspection: {
                          ...report.analysisResults.visualInspection,
                          skipped: e.target.checked,
                        },
                      })
                    }
                    className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                  />
                  <span
                    className={
                      report.analysisResults.visualInspection.skipped
                        ? "text-red-700 font-bold"
                        : "text-slate-600"
                    }
                  >
                    조사 Skip (해당 없음)
                  </span>
                </label>
              </div>

              {!report.analysisResults.visualInspection.skipped ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      외관 성상 및 잔여량 특이사항
                    </label>
                    <textarea
                      rows={2}
                      value={report.analysisResults.visualInspection.sampleCondition}
                      onChange={(e) =>
                        updateAnalysisResults({
                          visualInspection: {
                            ...report.analysisResults.visualInspection,
                            sampleCondition: e.target.value,
                          },
                        })
                      }
                      placeholder="예: 회수된 현품 잔여량 약 120ml 확인됨. 액상 내 직경 약 1.8mm의 흑색 고형물 침전 관찰됨."
                      className="w-full text-xs p-2.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      이물 외형 관찰 결과 (형상, 색상, 탄성 등)
                    </label>
                    <textarea
                      rows={2}
                      value={report.analysisResults.visualInspection.foreignObjectAppearance}
                      onChange={(e) =>
                        updateAnalysisResults({
                          visualInspection: {
                            ...report.analysisResults.visualInspection,
                            foreignObjectAppearance: e.target.value,
                          },
                        })
                      }
                      placeholder="예: 흑색 사각형 조각 형태로 유연한 고무 탄성이 느껴지며 기계적 마모 스크래치 흔적 육안 관찰됨."
                      className="w-full text-xs p-2.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <TestPrincipleBox
                    methodName="현품 육안 확인"
                    fieldKey="principle_visual"
                    includePrinciple={report.analysisResults.visualInspection.includePrinciple}
                    principleText={report.analysisResults.visualInspection.principleText}
                    activePresetId={selectedPresetId || undefined}
                    onChange={(include, text) =>
                      updateAnalysisResults({
                        visualInspection: {
                          ...report.analysisResults.visualInspection,
                          includePrinciple: include,
                          principleText: text,
                        },
                      })
                    }
                    onOpenManager={onOpenPhraseManager}
                  />
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  [조사 Skip 설정됨] 우측 보고서 및 최종 인쇄물에서 본 항목이 완전히 숨겨집니다.
                </p>
              )}
            </div>

            {/* 2. 확대경 조사 결과 (Skip 가능) */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                report.analysisResults.magnifierInspection.skipped
                  ? "bg-slate-100/70 border-slate-300 opacity-60"
                  : "bg-white border-slate-300 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">확대경 조사 결과</h4>
                </div>
                <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={report.analysisResults.magnifierInspection.skipped}
                    onChange={(e) =>
                      updateAnalysisResults({
                        magnifierInspection: {
                          ...report.analysisResults.magnifierInspection,
                          skipped: e.target.checked,
                        },
                      })
                    }
                    className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                  />
                  <span
                    className={
                      report.analysisResults.magnifierInspection.skipped
                        ? "text-red-700 font-bold"
                        : "text-slate-600"
                    }
                  >
                    조사 Skip (해당 없음)
                  </span>
                </label>
              </div>

              {!report.analysisResults.magnifierInspection.skipped ? (
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-36">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        관찰 배율
                      </label>
                      <input
                        type="text"
                        value={report.analysisResults.magnifierInspection.magnification}
                        onChange={(e) =>
                          updateAnalysisResults({
                            magnifierInspection: {
                              ...report.analysisResults.magnifierInspection,
                              magnification: e.target.value,
                            },
                          })
                        }
                        placeholder="예: 20x~40x"
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        조사 결과 요약
                      </label>
                      <input
                        type="text"
                        value={report.analysisResults.magnifierInspection.result}
                        onChange={(e) =>
                          updateAnalysisResults({
                            magnifierInspection: {
                              ...report.analysisResults.magnifierInspection,
                              result: e.target.value,
                            },
                          })
                        }
                        placeholder="예: 시료 절단면이 물리적 압력에 의해 박리된 전형적인 마모 파단면을 보임."
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded"
                      />
                    </div>
                  </div>

                  <TestPrincipleBox
                    methodName="확대경 조사"
                    fieldKey="principle_magnifier"
                    includePrinciple={report.analysisResults.magnifierInspection.includePrinciple}
                    principleText={report.analysisResults.magnifierInspection.principleText}
                    activePresetId={selectedPresetId || undefined}
                    onChange={(include, text) =>
                      updateAnalysisResults({
                        magnifierInspection: {
                          ...report.analysisResults.magnifierInspection,
                          includePrinciple: include,
                          principleText: text,
                        },
                      })
                    }
                    onOpenManager={onOpenPhraseManager}
                  />
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  [조사 Skip 설정됨] 본 항목은 출력물에서 제외됩니다.
                </p>
              )}
            </div>

            {/* 3. 광학 현미경 조사 결과 (Skip 가능) */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                report.analysisResults.opticalMicroscope.skipped
                  ? "bg-slate-100/70 border-slate-300 opacity-60"
                  : "bg-white border-slate-300 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">광학 현미경 조사 결과</h4>
                </div>
                <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={report.analysisResults.opticalMicroscope.skipped}
                    onChange={(e) =>
                      updateAnalysisResults({
                        opticalMicroscope: {
                          ...report.analysisResults.opticalMicroscope,
                          skipped: e.target.checked,
                        },
                      })
                    }
                    className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                  />
                  <span
                    className={
                      report.analysisResults.opticalMicroscope.skipped
                        ? "text-red-700 font-bold"
                        : "text-slate-600"
                    }
                  >
                    조사 Skip (해당 없음)
                  </span>
                </label>
              </div>

              {!report.analysisResults.opticalMicroscope.skipped ? (
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-36">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        관찰 배율
                      </label>
                      <input
                        type="text"
                        value={report.analysisResults.opticalMicroscope.magnification}
                        onChange={(e) =>
                          updateAnalysisResults({
                            opticalMicroscope: {
                              ...report.analysisResults.opticalMicroscope,
                              magnification: e.target.value,
                            },
                          })
                        }
                        placeholder="예: 200x~1000x"
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        조사 결과 요약
                      </label>
                      <input
                        type="text"
                        value={report.analysisResults.opticalMicroscope.result}
                        onChange={(e) =>
                          updateAnalysisResults({
                            opticalMicroscope: {
                              ...report.analysisResults.opticalMicroscope,
                              result: e.target.value,
                            },
                          })
                        }
                        placeholder="예: 다공성 고무 조직 구조가 관찰되며, 생물 세포벽이나 균사는 관찰되지 않음."
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded"
                      />
                    </div>
                  </div>

                  <TestPrincipleBox
                    methodName="광학 현미경 분석"
                    fieldKey="principle_microscope"
                    includePrinciple={report.analysisResults.opticalMicroscope.includePrinciple}
                    principleText={report.analysisResults.opticalMicroscope.principleText}
                    activePresetId={selectedPresetId || undefined}
                    onChange={(include, text) =>
                      updateAnalysisResults({
                        opticalMicroscope: {
                          ...report.analysisResults.opticalMicroscope,
                          includePrinciple: include,
                          principleText: text,
                        },
                      })
                    }
                    onOpenManager={onOpenPhraseManager}
                  />
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  [조사 Skip 설정됨] 본 항목은 출력물에서 제외됩니다.
                </p>
              )}
            </div>

            {/* 4. FT-IR 분석 결과 (Skip 가능) */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                report.analysisResults.ftirAnalysis.skipped
                  ? "bg-slate-100/70 border-slate-300 opacity-60"
                  : "bg-white border-slate-300 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                    4
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">
                    FT-IR 적외선 분광 분석 결과 (고분자/유기물 성분 규명)
                  </h4>
                </div>
                <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={report.analysisResults.ftirAnalysis.skipped}
                    onChange={(e) =>
                      updateAnalysisResults({
                        ftirAnalysis: {
                          ...report.analysisResults.ftirAnalysis,
                          skipped: e.target.checked,
                        },
                      })
                    }
                    className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                  />
                  <span
                    className={
                      report.analysisResults.ftirAnalysis.skipped
                        ? "text-red-700 font-bold"
                        : "text-slate-600"
                    }
                  >
                    조사 Skip (해당 없음)
                  </span>
                </label>
              </div>

              {!report.analysisResults.ftirAnalysis.skipped ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        스펙트럼 매칭 물질명
                      </label>
                      <input
                        type="text"
                        value={report.analysisResults.ftirAnalysis.matchedMaterial}
                        onChange={(e) =>
                          updateAnalysisResults({
                            ftirAnalysis: {
                              ...report.analysisResults.ftirAnalysis,
                              matchedMaterial: e.target.value,
                            },
                          })
                        }
                        placeholder="예: EPDM 합성 고무 (충전기 노즐 패킹)"
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        스펙트럼 일치율 (Similarity)
                      </label>
                      <input
                        type="text"
                        value={report.analysisResults.ftirAnalysis.similarity}
                        onChange={(e) =>
                          updateAnalysisResults({
                            ftirAnalysis: {
                              ...report.analysisResults.ftirAnalysis,
                              similarity: e.target.value,
                            },
                          })
                        }
                        placeholder="예: 98.6%"
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded font-mono font-bold text-blue-900"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700">
                        FT-IR 분석 결과 요약
                      </label>
                      <AiPolishButton
                        text={report.analysisResults.ftirAnalysis.summary}
                        fieldName="FT-IR 분석 결과"
                        onApply={(p) =>
                          updateAnalysisResults({
                            ftirAnalysis: {
                              ...report.analysisResults.ftirAnalysis,
                              summary: p,
                            },
                          })
                        }
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={report.analysisResults.ftirAnalysis.summary}
                      onChange={(e) =>
                        updateAnalysisResults({
                          ftirAnalysis: {
                            ...report.analysisResults.ftirAnalysis,
                            summary: e.target.value,
                          },
                        })
                      }
                      placeholder="예: 충전기 충진 밸브 내 고무 패킹 표준 스펙트럼과 높은 일치도(98.6%)를 보임."
                      className="w-full text-xs p-2.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <TestPrincipleBox
                    methodName="FT-IR 적외선 분광분석"
                    fieldKey="principle_ftir"
                    includePrinciple={report.analysisResults.ftirAnalysis.includePrinciple}
                    principleText={report.analysisResults.ftirAnalysis.principleText}
                    activePresetId={selectedPresetId || undefined}
                    onChange={(include, text) =>
                      updateAnalysisResults({
                        ftirAnalysis: {
                          ...report.analysisResults.ftirAnalysis,
                          includePrinciple: include,
                          principleText: text,
                        },
                      })
                    }
                    onOpenManager={onOpenPhraseManager}
                  />
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  [조사 Skip 설정됨] 본 항목은 출력물에서 제외됩니다.
                </p>
              )}
            </div>

            {/* 5. XRF 분석 결과 (Skip 가능) */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                report.analysisResults.xrfAnalysis.skipped
                  ? "bg-slate-100/70 border-slate-300 opacity-60"
                  : "bg-white border-slate-300 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                    5
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">
                    XRF X선 형광 분석 결과 (무기물 및 금속 원소 조성)
                  </h4>
                </div>
                <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={report.analysisResults.xrfAnalysis.skipped}
                    onChange={(e) =>
                      updateAnalysisResults({
                        xrfAnalysis: {
                          ...report.analysisResults.xrfAnalysis,
                          skipped: e.target.checked,
                        },
                      })
                    }
                    className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                  />
                  <span
                    className={
                      report.analysisResults.xrfAnalysis.skipped
                        ? "text-red-700 font-bold"
                        : "text-slate-600"
                    }
                  >
                    조사 Skip (해당 없음)
                  </span>
                </label>
              </div>

              {!report.analysisResults.xrfAnalysis.skipped ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      분석 원소 비율 (wt%)
                    </label>
                    <input
                      type="text"
                      value={report.analysisResults.xrfAnalysis.elementsRatio}
                      onChange={(e) =>
                        updateAnalysisResults({
                          xrfAnalysis: {
                            ...report.analysisResults.xrfAnalysis,
                            elementsRatio: e.target.value,
                          },
                        })
                      }
                      placeholder="예: Al 88.5%, Fe 8.2%, Si 2.1%, 기타 미량 원소"
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      XRF 분석 결과 요약
                    </label>
                    <textarea
                      rows={2}
                      value={report.analysisResults.xrfAnalysis.summary}
                      onChange={(e) =>
                        updateAnalysisResults({
                          xrfAnalysis: {
                            ...report.analysisResults.xrfAnalysis,
                            summary: e.target.value,
                          },
                        })
                      }
                      placeholder="예: 주성분 Al 알루미늄 합금 조성을 보이며 캔 뚜껑 가공 탭 재질과 일치함."
                      className="w-full text-xs p-2.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <TestPrincipleBox
                    methodName="XRF 형광분석"
                    fieldKey="principle_xrf"
                    includePrinciple={report.analysisResults.xrfAnalysis.includePrinciple}
                    principleText={report.analysisResults.xrfAnalysis.principleText}
                    activePresetId={selectedPresetId || undefined}
                    onChange={(include, text) =>
                      updateAnalysisResults({
                        xrfAnalysis: {
                          ...report.analysisResults.xrfAnalysis,
                          includePrinciple: include,
                          principleText: text,
                        },
                      })
                    }
                    onOpenManager={onOpenPhraseManager}
                  />
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  [조사 Skip 설정됨] 본 항목은 출력물에서 제외됩니다.
                </p>
              )}
            </div>

            {/* 6. 이화학 분석 결과 (테이블, Skip 가능) */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                report.analysisResults.physicochemicalAnalysis.skipped
                  ? "bg-slate-100/70 border-slate-300 opacity-60"
                  : "bg-white border-slate-300 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                    6
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">
                    이화학 분석 결과 (현품 vs 정상 보관품 비교 테이블)
                  </h4>
                </div>
                <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={report.analysisResults.physicochemicalAnalysis.skipped}
                    onChange={(e) =>
                      updateAnalysisResults({
                        physicochemicalAnalysis: {
                          ...report.analysisResults.physicochemicalAnalysis,
                          skipped: e.target.checked,
                        },
                      })
                    }
                    className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                  />
                  <span
                    className={
                      report.analysisResults.physicochemicalAnalysis.skipped
                        ? "text-red-700 font-bold"
                        : "text-slate-600"
                    }
                  >
                    조사 Skip (해당 없음)
                  </span>
                </label>
              </div>

              {!report.analysisResults.physicochemicalAnalysis.skipped ? (
                <div className="space-y-3">
                  {/* Table of items */}
                  <div className="overflow-x-auto border border-slate-200 rounded-lg">
                    <table className="w-full text-xs text-slate-800">
                      <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="p-2 text-left w-28">시험일자</th>
                          <th className="p-2 text-left">시험 항목 (성상/pH/Brix 등)</th>
                          <th className="p-2 text-left w-16">단위</th>
                          <th className="p-2 text-left">품질 기준 규격</th>
                          <th className="p-2 text-left">정상 보관품 수치</th>
                          <th className="p-2 text-left">회수 현품 측정치</th>
                          <th className="p-2 text-center w-24">판정</th>
                          <th className="p-2 text-left w-28">비고</th>
                          <th className="p-2 text-center w-10">삭제</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {(report.analysisResults.physicochemicalAnalysis.items || []).map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50">
                            <td className="p-1.5">
                              <input
                                type="text"
                                placeholder="YYYY.MM.DD"
                                value={item.testDate || ""}
                                onChange={(e) =>
                                  handleUpdatePhysicochemicalItem(
                                    item.id,
                                    "testDate",
                                    e.target.value
                                  )
                                }
                                className="w-full text-xs px-1.5 py-1 border border-slate-200 rounded"
                              />
                            </td>
                            <td className="p-1.5">
                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) =>
                                  handleUpdatePhysicochemicalItem(item.id, "name", e.target.value)
                                }
                                className="w-full text-xs px-1.5 py-1 border border-slate-200 rounded font-medium"
                              />
                            </td>
                            <td className="p-1.5">
                              <input
                                type="text"
                                value={item.unit}
                                onChange={(e) =>
                                  handleUpdatePhysicochemicalItem(item.id, "unit", e.target.value)
                                }
                                className="w-full text-xs px-1.5 py-1 border border-slate-200 rounded"
                              />
                            </td>
                            <td className="p-1.5">
                              <input
                                type="text"
                                value={item.standard}
                                onChange={(e) =>
                                  handleUpdatePhysicochemicalItem(
                                    item.id,
                                    "standard",
                                    e.target.value
                                  )
                                }
                                className="w-full text-xs px-1.5 py-1 border border-slate-200 rounded"
                              />
                            </td>
                            <td className="p-1.5">
                              <input
                                type="text"
                                value={item.controlValue}
                                onChange={(e) =>
                                  handleUpdatePhysicochemicalItem(
                                    item.id,
                                    "controlValue",
                                    e.target.value
                                  )
                                }
                                className="w-full text-xs px-1.5 py-1 border border-slate-200 rounded"
                              />
                            </td>
                            <td className="p-1.5">
                              <input
                                type="text"
                                value={item.sampleValue}
                                onChange={(e) =>
                                  handleUpdatePhysicochemicalItem(
                                    item.id,
                                    "sampleValue",
                                    e.target.value
                                  )
                                }
                                className="w-full text-xs px-1.5 py-1 border border-slate-200 rounded font-bold"
                              />
                            </td>
                            <td className="p-1.5 text-center">
                              <select
                                value={item.judgment}
                                onChange={(e) =>
                                  handleUpdatePhysicochemicalItem(
                                    item.id,
                                    "judgment",
                                    e.target.value as any
                                  )
                                }
                                className={`text-xs px-2 py-1 rounded font-bold border ${
                                  item.judgment === "적합"
                                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                    : item.judgment === "부적합"
                                    ? "bg-red-50 text-red-800 border-red-300"
                                    : "bg-slate-50 text-slate-600 border-slate-200"
                                }`}
                              >
                                <option value="적합">적합</option>
                                <option value="부적합">부적합</option>
                                <option value="해당없음">해당없음</option>
                              </select>
                            </td>
                            <td className="p-1.5">
                              <input
                                type="text"
                                placeholder="예: 출하 시점, 현시점 등"
                                value={item.remarks || ""}
                                onChange={(e) =>
                                  handleUpdatePhysicochemicalItem(
                                    item.id,
                                    "remarks",
                                    e.target.value
                                  )
                                }
                                className="w-full text-xs px-1.5 py-1 border border-slate-200 rounded"
                              />
                            </td>
                            <td className="p-1.5 text-center">
                              <button
                                type="button"
                                onClick={() => handleDeletePhysicochemicalItem(item.id)}
                                className="p-1 text-slate-400 hover:text-red-600 rounded"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={handleAddPhysicochemicalItem}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 py-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>시험 항목 추가</span>
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      이화학 종합 판정 요약
                    </label>
                    <textarea
                      rows={2}
                      value={report.analysisResults.physicochemicalAnalysis.summary}
                      onChange={(e) =>
                        updateAnalysisResults({
                          physicochemicalAnalysis: {
                            ...report.analysisResults.physicochemicalAnalysis,
                            summary: e.target.value,
                          },
                        })
                      }
                      placeholder="예: 회수 현품과 정상 보관품 간 이화학적 특성 차이가 없어 액상 자체의 부패나 변질은 전혀 발생하지 않았음."
                      className="w-full text-xs p-2.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <TestPrincipleBox
                    methodName="이화학적 특성 비교분석"
                    fieldKey="principle_physicochemical"
                    includePrinciple={report.analysisResults.physicochemicalAnalysis.includePrinciple}
                    principleText={report.analysisResults.physicochemicalAnalysis.principleText}
                    activePresetId={selectedPresetId || undefined}
                    onChange={(include, text) =>
                      updateAnalysisResults({
                        physicochemicalAnalysis: {
                          ...report.analysisResults.physicochemicalAnalysis,
                          includePrinciple: include,
                          principleText: text,
                        },
                      })
                    }
                    onOpenManager={onOpenPhraseManager}
                  />
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  [조사 Skip 설정됨] 본 항목은 출력물에서 제외됩니다.
                </p>
              )}
            </div>

            {/* 7. 카탈라아제(Catalase) 시험 결과 (Skip 가능) */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                report.analysisResults.catalaseTest.skipped
                  ? "bg-slate-100/70 border-slate-300 opacity-60"
                  : "bg-white border-slate-300 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                    7
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">
                    카탈라아제(Catalase) 시험 결과 (생물체/유기물/열처리 이력 규명)
                  </h4>
                </div>
                <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={report.analysisResults.catalaseTest.skipped}
                    onChange={(e) =>
                      updateAnalysisResults({
                        catalaseTest: {
                          ...report.analysisResults.catalaseTest,
                          skipped: e.target.checked,
                        },
                      })
                    }
                    className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                  />
                  <span
                    className={
                      report.analysisResults.catalaseTest.skipped
                        ? "text-red-700 font-bold"
                        : "text-slate-600"
                    }
                  >
                    조사 Skip (해당 없음)
                  </span>
                </label>
              </div>

              {!report.analysisResults.catalaseTest.skipped ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      최종 판정 (유기물/생물체/가열 여부)
                    </label>
                    <input
                      type="text"
                      value={report.analysisResults.catalaseTest.resultJudgement}
                      onChange={(e) =>
                        updateAnalysisResults({
                          catalaseTest: {
                            ...report.analysisResults.catalaseTest,
                            resultJudgement: e.target.value,
                          },
                        })
                      }
                      placeholder="예: 비생물성 합성 고분자 (음성, Negative) / 가열 살균 완료"
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded font-semibold text-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      과산화수소 반응 상세 관찰
                    </label>
                    <textarea
                      rows={2}
                      value={report.analysisResults.catalaseTest.reactionDetail}
                      onChange={(e) =>
                        updateAnalysisResults({
                          catalaseTest: {
                            ...report.analysisResults.catalaseTest,
                            reactionDetail: e.target.value,
                          },
                        })
                      }
                      placeholder="예: H2O2 3% 적하 시 기포 미발생 → 살아있는 생체 조직이나 곰팡이/벌레 등 생물 유래 이물이 아님을 확증."
                      className="w-full text-xs p-2.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <TestPrincipleBox
                    methodName="카탈라아제 효소활성 시험"
                    fieldKey="principle_catalase"
                    includePrinciple={report.analysisResults.catalaseTest.includePrinciple}
                    principleText={report.analysisResults.catalaseTest.principleText}
                    activePresetId={selectedPresetId || undefined}
                    onChange={(include, text) =>
                      updateAnalysisResults({
                        catalaseTest: {
                          ...report.analysisResults.catalaseTest,
                          includePrinciple: include,
                          principleText: text,
                        },
                      })
                    }
                    onOpenManager={onOpenPhraseManager}
                  />
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  [조사 Skip 설정됨] 본 항목은 출력물에서 제외됩니다.
                </p>
              )}
            </div>

            {/* 8. 기타 추가 시험 항목 (동적 추가) */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-800">
                  기타 추가 시험 항목 ({(report.analysisResults.additionalTests || []).length}개)
                </h4>
                <button
                  type="button"
                  onClick={handleAddAdditionalTest}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>새 시험 항목 추가</span>
                </button>
              </div>

              {(report.analysisResults.additionalTests || []).map((test, index) => (
                <div
                  key={test.id}
                  className="p-3 bg-white rounded-lg border border-slate-200 space-y-2 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={test.title}
                      onChange={(e) => {
                        const updated = [...(report.analysisResults.additionalTests || [])];
                        updated[index].title = e.target.value;
                        updateAnalysisResults({ additionalTests: updated });
                      }}
                      className="text-xs font-bold px-2 py-1 border border-slate-200 rounded text-slate-800 w-2/3"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (report.analysisResults.additionalTests || []).filter(
                          (t) => t.id !== test.id
                        );
                        updateAnalysisResults({ additionalTests: updated });
                      }}
                      className="p-1 text-slate-400 hover:text-red-600 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={test.result}
                    onChange={(e) => {
                      const updated = [...(report.analysisResults.additionalTests || [])];
                      updated[index].result = e.target.value;
                      updateAnalysisResults({ additionalTests: updated });
                    }}
                    placeholder="시험 결과 내용..."
                    className="w-full text-xs p-2 border border-slate-200 rounded"
                  />
                  <TestPrincipleBox
                    methodName={test.title || "추가 시험"}
                    fieldKey={`principle_add_${test.id}`}
                    includePrinciple={test.includePrinciple}
                    principleText={test.principleText}
                    activePresetId={selectedPresetId || undefined}
                    onChange={(include, text) => {
                      const updated = (report.analysisResults.additionalTests || []).map((t) =>
                        t.id === test.id
                          ? { ...t, includePrinciple: include, principleText: text }
                          : t
                      );
                      updateAnalysisResults({ additionalTests: updated });
                    }}
                    onOpenManager={onOpenPhraseManager}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* [4] 제조공정 분석 */}
        {activeTab === "process" && (
          <div className="space-y-4 animate-in fade-in duration-100">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900">제조공정 분석 및 관리 포인트</h3>
                <p className="text-xs text-slate-500">
                  전체 생산 공정 흐름 및 여과망/세척/핵심 관리 포인트 연계 분석
                </p>
              </div>
              <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={report.manufacturingProcess.skipped}
                  onChange={(e) => updateManufacturingProcess({ skipped: e.target.checked })}
                  className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                />
                <span
                  className={
                    report.manufacturingProcess.skipped
                      ? "text-red-700 font-bold"
                      : "text-slate-600"
                  }
                >
                  제조공정 분석 Skip
                </span>
              </label>
            </div>

            {!report.manufacturingProcess.skipped ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    제품 전체 제조공정 텍스트 (화살표 연결 형식)
                  </label>
                  <input
                    type="text"
                    value={report.manufacturingProcess.processFlow}
                    onChange={(e) => {
                      const val = e.target.value;
                      const steps = val
                        .split(/→|->/)
                        .map((s) => s.trim())
                        .filter(Boolean);
                      updateManufacturingProcess({
                        processFlow: val,
                        processSteps: steps,
                      });
                    }}
                    placeholder="예: 원료 배합 → 150mesh 여과 → 순간 살균 → 병 세척 → 충진/밀봉 → 검사 → 포장"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    클레임 발생 유력 지점 강조 표시 (Highlight Step)
                  </label>
                  <input
                    type="text"
                    value={report.manufacturingProcess.highlightedStep}
                    onChange={(e) =>
                      updateManufacturingProcess({ highlightedStep: e.target.value })
                    }
                    placeholder="예: 충진/밀봉 (충진 노즐 밸브부)"
                    className="w-full text-xs px-3 py-2 border border-amber-300 bg-amber-50/40 rounded-md text-amber-950 font-semibold focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      여과망(Mesh 규격)을 통한 이물 제어 설명
                    </label>
                    <div className="flex items-center gap-2">
                      <PhraseDropdown
                        fieldKey="filtrationAnalysis"
                        activePresetId={selectedPresetId || undefined}
                        onSelectPhrase={(content) =>
                          updateManufacturingProcess({ filtrationAnalysis: content })
                        }
                        onOpenManager={onOpenPhraseManager}
                      />
                      <AiPolishButton
                        text={report.manufacturingProcess.filtrationAnalysis}
                        fieldName="여과망 관리 분석"
                        onApply={(p) => updateManufacturingProcess({ filtrationAnalysis: p })}
                      />
                    </div>
                  </div>
                  <textarea
                    rows={2}
                    value={report.manufacturingProcess.filtrationAnalysis}
                    onChange={(e) =>
                      updateManufacturingProcess({ filtrationAnalysis: e.target.value })
                    }
                    placeholder="원료 투입 및 충진 전 150 Mesh(105㎛) 여과 필터를 통과하여 0.1mm 이상의 물리적 이물은 통과가 불가능한 구조임."
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none leading-relaxed"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      용기 및 캡 세척 공정 설명
                    </label>
                    <div className="flex items-center gap-2">
                      <PhraseDropdown
                        fieldKey="cleaningAnalysis"
                        activePresetId={selectedPresetId || undefined}
                        onSelectPhrase={(content) =>
                          updateManufacturingProcess({ cleaningAnalysis: content })
                        }
                        onOpenManager={onOpenPhraseManager}
                      />
                      <AiPolishButton
                        text={report.manufacturingProcess.cleaningAnalysis}
                        fieldName="용기 세척 공정 분석"
                        onApply={(p) => updateManufacturingProcess({ cleaningAnalysis: p })}
                      />
                    </div>
                  </div>
                  <textarea
                    rows={2}
                    value={report.manufacturingProcess.cleaningAnalysis}
                    onChange={(e) =>
                      updateManufacturingProcess({ cleaningAnalysis: e.target.value })
                    }
                    placeholder="공병 투입 후 85℃ 고온 온수 린싱 및 3.5 bar 청정 에어 블로우로 내부 잔류물을 완벽히 제거함."
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none leading-relaxed"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      클레임 발생 유력 지점 분석 및 공정 연계 설명
                    </label>
                    <AiPolishButton
                      text={report.manufacturingProcess.criticalControlPoint}
                      fieldName="클레임 발생 유력 지점 분석"
                      onApply={(p) => updateManufacturingProcess({ criticalControlPoint: p })}
                    />
                  </div>
                  <textarea
                    rows={3}
                    value={report.manufacturingProcess.criticalControlPoint}
                    onChange={(e) =>
                      updateManufacturingProcess({ criticalControlPoint: e.target.value })
                    }
                    placeholder="여과망 후단인 충진 밸브 노즐 내부 패킹의 반복 피스톤 왕복 마찰에 의해 노후된 가스켓 표면 미세 조각이 탈락되어 용기 내 혼입된 것으로 최종 확인됨."
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none leading-relaxed font-medium"
                  />
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic p-4 bg-slate-100 rounded-lg">
                [제조공정 분석 Skip 설정됨] 우측 보고서 및 최종 출력물에서 본 항목이 완전히 제외됩니다.
              </p>
            )}
          </div>
        )}

        {/* [5] 동일 Lot 제조 및 품질검사 이력 */}
        {activeTab === "lot" && (
          <div className="space-y-4 animate-in fade-in duration-100">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  동일 Lot 제조공정 및 품질검사 이력 조사
                </h3>
                <p className="text-xs text-slate-500">
                  제조 당일 설비 가동일지, 완제품 성적서, 동일 Lot 보관품 전수 조사
                </p>
              </div>
              <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={report.lotHistory.skipped}
                  onChange={(e) => updateLotHistory({ skipped: e.target.checked })}
                  className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                />
                <span
                  className={
                    report.lotHistory.skipped ? "text-red-700 font-bold" : "text-slate-600"
                  }
                >
                  Lot 이력 조사 Skip
                </span>
              </label>
            </div>

            {!report.lotHistory.skipped ? (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      제조 당시 생산일지 특이사항 유무 (설비 트러블 등)
                    </label>
                    <div className="flex items-center gap-2">
                      <PhraseDropdown
                        fieldKey="productionLogNote"
                        activePresetId={selectedPresetId || undefined}
                        onSelectPhrase={(content) =>
                          updateLotHistory({ productionLogNote: content })
                        }
                        onOpenManager={onOpenPhraseManager}
                      />
                      <AiPolishButton
                        text={report.lotHistory.productionLogNote}
                        fieldName="생산일지 조사"
                        onApply={(p) => updateLotHistory({ productionLogNote: p })}
                      />
                    </div>
                  </div>
                  <textarea
                    rows={2}
                    value={report.lotHistory.productionLogNote}
                    onChange={(e) => updateLotHistory({ productionLogNote: e.target.value })}
                    placeholder="생산 당일 제조일지 점검 결과 설비 이상 및 오가동 내역 없음..."
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      생산 완제품 품질검사 성적서 확인 결과
                    </label>
                    <PhraseDropdown
                      fieldKey="qualityTestRecord"
                      activePresetId={selectedPresetId || undefined}
                      onSelectPhrase={(content) =>
                        updateLotHistory({ qualityTestRecord: content })
                      }
                      onOpenManager={onOpenPhraseManager}
                    />
                  </div>
                  <input
                    type="text"
                    value={report.lotHistory.qualityTestRecord}
                    onChange={(e) => updateLotHistory({ qualityTestRecord: e.target.value })}
                    placeholder="예: 완제품 품질검사 성적서(COA) 확인 결과 관능/미생물/이화학 전 항목 적합 판정"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      동일 Lot 이전 클레임 접수 이력
                    </label>
                    <PhraseDropdown
                      fieldKey="priorClaimsCount"
                      activePresetId={selectedPresetId || undefined}
                      onSelectPhrase={(content) =>
                        updateLotHistory({ priorClaimsCount: content })
                      }
                      onOpenManager={onOpenPhraseManager}
                    />
                  </div>
                  <input
                    type="text"
                    value={report.lotHistory.priorClaimsCount}
                    onChange={(e) => updateLotHistory({ priorClaimsCount: e.target.value })}
                    placeholder="예: 0건 (동일/유사 유형 고객 클레임 접수 이력 없음)"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      동일 Lot 당사 보관품(공장 보관 검체) 확인 결과
                    </label>
                    <div className="flex items-center gap-2">
                      <PhraseDropdown
                        fieldKey="retainedSampleCheck"
                        activePresetId={selectedPresetId || undefined}
                        onSelectPhrase={(content) =>
                          updateLotHistory({ retainedSampleCheck: content })
                        }
                        onOpenManager={onOpenPhraseManager}
                      />
                      <AiPolishButton
                        text={report.lotHistory.retainedSampleCheck}
                        fieldName="보관 검체 확인 결과"
                        onApply={(p) => updateLotHistory({ retainedSampleCheck: p })}
                      />
                    </div>
                  </div>
                  <textarea
                    rows={3}
                    value={report.lotHistory.retainedSampleCheck}
                    onChange={(e) =>
                      updateLotHistory({ retainedSampleCheck: e.target.value })
                    }
                    placeholder="동일 제조번호 자사 공장 보관품(검체) 확인 결과, 성상 및 맛/향에 이상이 없으며 이물 혼입 등의 특이사항이 전혀 확인되지 않았습니다."
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none leading-relaxed font-medium"
                  />
                </div>

                <PhotoUploadField
                  label="동일 Lot 공장 보관품 사진 첨부 (보고서 5번 항목 및 첨부문서에 자동 반영)"
                  photos={report.lotHistory.retainedSamplePhotos}
                  onChange={(photos) => updateLotHistory({ retainedSamplePhotos: photos })}
                  maxPhotos={4}
                />
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic p-4 bg-slate-100 rounded-lg">
                [Lot 이력 조사 Skip 설정됨] 본 항목은 출력물에서 제외됩니다.
              </p>
            )}
          </div>
        )}

        {/* [6] 원인 분석 및 재발방지대책 */}
        {activeTab === "cause" && (
          <div className="space-y-4 animate-in fade-in duration-100">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900">종합 원인 판정 및 재발방지대책</h3>
                <p className="text-xs text-slate-500">과학적 분석에 기반한 최종 원인 및 설비/공정 개선 대책</p>
              </div>
              <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={report.rootCauseAndActions.skipped}
                  onChange={(e) => updateRootCause({ skipped: e.target.checked })}
                  className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                />
                <span
                  className={
                    report.rootCauseAndActions.skipped ? "text-red-700 font-bold" : "text-slate-600"
                  }
                >
                  원인/대책 전체 Skip
                </span>
              </label>
            </div>

            {!report.rootCauseAndActions.skipped ? (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      종합 원인 판정 (Root Cause)
                    </label>
                    <div className="flex items-center gap-2">
                      <PhraseDropdown
                        fieldKey="rootCause"
                        activePresetId={selectedPresetId || undefined}
                        onSelectPhrase={(content) => updateRootCause({ rootCause: content })}
                        onOpenManager={onOpenPhraseManager}
                      />
                      <AiPolishButton
                        text={report.rootCauseAndActions.rootCause}
                        fieldName="종합 원인 판정"
                        onApply={(p) => updateRootCause({ rootCause: p })}
                      />
                    </div>
                  </div>
                  <textarea
                    rows={3}
                    value={report.rootCauseAndActions.rootCause}
                    onChange={(e) => updateRootCause({ rootCause: e.target.value })}
                    placeholder="예: 충진기 밸브 노즐 내 EPDM 고무 패킹의 누적 마찰 마모로 인하여 미세 조각 1점이 충진 시 박리 탈락되어 혼입된 것으로 최종 판정됨."
                    className="w-full text-xs p-3 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none leading-relaxed font-semibold text-slate-900"
                  />
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800">
                      재발방지대책 (설비 개선, 점검 주기 단축 등)
                    </label>
                    <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={report.rootCauseAndActions.preventiveMeasuresSkipped}
                        onChange={(e) =>
                          updateRootCause({ preventiveMeasuresSkipped: e.target.checked })
                        }
                        className="rounded text-red-600 focus:ring-red-500 w-3.5 h-3.5"
                      />
                      <span
                        className={
                          report.rootCauseAndActions.preventiveMeasuresSkipped
                            ? "text-red-700 font-bold"
                            : "text-slate-500"
                        }
                      >
                        재발방지대책 Skip
                      </span>
                    </label>
                  </div>

                  {!report.rootCauseAndActions.preventiveMeasuresSkipped ? (
                    <div>
                      <div className="flex justify-end items-center gap-2 mb-1">
                        <PhraseDropdown
                          fieldKey="preventiveMeasures"
                          activePresetId={selectedPresetId || undefined}
                          onSelectPhrase={(content) =>
                            updateRootCause({ preventiveMeasures: content })
                          }
                          onOpenManager={onOpenPhraseManager}
                        />
                        <AiPolishButton
                          text={report.rootCauseAndActions.preventiveMeasures}
                          fieldName="재발방지대책"
                          onApply={(p) => updateRootCause({ preventiveMeasures: p })}
                        />
                      </div>
                      <textarea
                        rows={4}
                        value={report.rootCauseAndActions.preventiveMeasures}
                        onChange={(e) =>
                          updateRootCause({ preventiveMeasures: e.target.value })
                        }
                        placeholder="1. [설비 개선] 노즐 패킹 재질을 내마모성 테프론 규격으로 전면 교체 완료.&#10;2. [점검 주기 단축] 정비 주기를 50% 단축하고 매 교대 시 마모도 점검 의무화.&#10;3. [검사 프로세스 강화] 비전 검사기 감도 상향 조정."
                        className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none leading-relaxed"
                      />
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">
                      [재발방지대책 Skip 설정됨]
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic p-4 bg-slate-100 rounded-lg">
                [원인 및 재발방지대책 Skip 설정됨]
              </p>
            )}
          </div>
        )}

        {/* [7] 결론 및 맺음말 */}
        {activeTab === "conclusion" && (
          <div className="space-y-4 animate-in fade-in duration-100">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900">결론 및 고객 안내 (사과문)</h3>
                <p className="text-xs text-slate-500">
                  핵심 요약(가, 나, 다) 정리 및 고객 안심/사과 표준 문구
                </p>
              </div>
            </div>

            {/* Summary bullet points */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">
                  조사 결과 핵심 요약 (가, 나, 다 항목별 정리)
                </label>
                <button
                  type="button"
                  onClick={handleAddSummaryPoint}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>요약 항목 추가</span>
                </button>
              </div>

              {report.conclusion.summaryPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-xs font-bold text-blue-800 shrink-0 mt-2">
                    {String.fromCharCode(44032 + idx)}.
                  </span>
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => handleUpdateSummaryPoint(idx, e.target.value)}
                    className="flex-1 text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteSummaryPoint(idx)}
                    className="p-2 text-slate-400 hover:text-red-600 rounded"
                    title="항목 삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Apology Text */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800">
                  고객 안심 및 사과 문구 (식품품질 표준 문구 템플릿)
                </label>
                <PhraseDropdown
                  fieldKey="apologyText"
                  activePresetId={selectedPresetId || undefined}
                  onSelectPhrase={(content) => updateConclusion({ apologyText: content })}
                  onOpenManager={onOpenPhraseManager}
                />
              </div>
              <textarea
                rows={4}
                value={report.conclusion.apologyText}
                onChange={(e) => updateConclusion({ apologyText: e.target.value })}
                placeholder="다시 한번 당사 제품을 애용해 주시는 고객님께 불편을 드린 점에 대하여 진심으로 사과를 드립니다..."
                className="w-full text-xs p-3 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none leading-relaxed"
              />
            </div>

            {/* Seal & Department Signature Controls */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-slate-800">공문서 발신 및 직인/서명 설정</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    회사명
                  </label>
                  <input
                    type="text"
                    value={report.companyName}
                    onChange={(e) => onChange({ ...report, companyName: e.target.value })}
                    className="w-full text-xs px-3 py-1.5 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    조사 및 발신 부서명
                  </label>
                  <input
                    type="text"
                    value={report.department || "식품품질경영팀"}
                    onChange={(e) => onChange({ ...report, department: e.target.value })}
                    className="w-full text-xs px-3 py-1.5 border border-slate-300 rounded font-semibold text-slate-800"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    * 조사는 언제나 식품품질경영팀에서 수행하며 보고서 및 메일 발신 주체로 표기됩니다.
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    보고서 문서번호 (QM)
                  </label>
                  <input
                    type="text"
                    value={report.docNumber || "광동 QM 2026-C04"}
                    onChange={(e) => onChange({ ...report, docNumber: e.target.value })}
                    className="w-full text-xs px-3 py-1.5 border border-slate-300 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    조사 담당 연구원 (식품품질경영팀)
                  </label>
                  <input
                    type="text"
                    value={report.researcherName ?? "담당 연구원 김진영 대리"}
                    onChange={(e) => onChange({ ...report, researcherName: e.target.value })}
                    placeholder="예: 담당 연구원 김진영 대리"
                    className="w-full text-xs px-3 py-1.5 border border-slate-300 rounded font-medium focus:ring-1 focus:ring-blue-500"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    * 보고서 상단 조사자 및 커뮤니케이션팀 회신 메일 발신자로 표기됩니다.
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    식품품질경영팀장 성명 (승인 서명본)
                  </label>
                  <input
                    type="text"
                    value={report.teamLeader || "신준호"}
                    onChange={(e) => onChange({ ...report, teamLeader: e.target.value })}
                    className="w-full text-xs px-3 py-1.5 border border-slate-300 rounded font-bold text-slate-900"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    * 보고서 하단 공식 서명부: (주)광동제약 식품품질경영팀 팀장 {report.teamLeader ? report.teamLeader.replace(/팀장/g, "").trim() : "신준호"}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    직인 형태
                  </label>
                  <select
                    value={report.sealType}
                    onChange={(e) => onChange({ ...report, sealType: e.target.value as any })}
                    className="w-full text-xs px-3 py-1.5 border border-slate-300 rounded"
                  >
                    <option value="seal">회사 공식 품질 도장(인감 직인)</option>
                    <option value="signature">팀장 영문/필기 서명 (Signature)</option>
                    <option value="none">도장 없음 (텍스트 성명만 표시)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* [8] 첨부 사진 관리 */}
        {activeTab === "attachments" && (
          <div className="space-y-6 animate-in fade-in duration-100">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900">8.0 사진 첨부 및 CI 로고 관리</h3>
                <p className="text-xs text-slate-500">
                  보고서 상단에 인쇄될 회사 CI 로고 교체 및 공문서 후단에 첨부될 정밀 분석 사진을 등록합니다.
                </p>
              </div>
            </div>

            {/* Company CI Logo Upload */}
            <CompanyLogoUploader
              currentLogoUrl={report.companyLogoUrl}
              onLogoChange={(url) => onChange({ ...report, companyLogoUrl: url })}
            />

            <PhotoUploadField
              label="[첨부 1] 현품 외관, 이물 확대 및 FT-IR 스펙트럼 그래프 사진"
              photos={report.attachments.attachment1Photos}
              onChange={(photos) => updateAttachments({ attachment1Photos: photos })}
              maxPhotos={4}
            />

            {/* Note regarding Lot History Photo */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 flex items-center justify-between gap-3">
              <div>
                <span className="font-semibold text-slate-900">[첨부 2] 동일 Lot 공장 보관품 사진</span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  동일 Lot 보관품 사진은 <strong>'5. 동일 Lot 이력'</strong> 탭에서 일원화하여 관리되며, 등록 시 본 첨부 문서 및 5번 항목에 자동 반영됩니다.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("lot")}
                className="px-2.5 py-1 text-[11px] font-medium text-blue-700 bg-white border border-blue-300 rounded hover:bg-blue-50 transition-colors shrink-0"
              >
                5. 동일 Lot 이력으로 이동
              </button>
            </div>

            <PhotoUploadField
              label="[첨부 3] 주요 제조공정 사진 그리드 (단계별 공정명과 캡션 입력)"
              photos={report.attachments.attachment3Photos}
              onChange={(photos) => updateAttachments({ attachment3Photos: photos })}
              maxPhotos={4}
              withStepName={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}
