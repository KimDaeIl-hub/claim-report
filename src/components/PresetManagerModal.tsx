import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Plus,
  Trash2,
  Edit3,
  Check,
  Sparkles,
  FolderDown,
  RotateCcw,
  BookOpen,
  Tag,
  Building2,
  Factory,
  Search,
  Filter,
  CheckCircle2,
  ChevronRight,
  Layers,
  FileCheck,
  Copy,
  FileText,
  AlertCircle,
  Clock,
  Beaker,
  ShieldCheck,
  Microscope,
} from "lucide-react";
import { ClaimPreset, StandardPhrase, ReportData, PresetSubCategory } from "../types";
import {
  loadAllPresets,
  saveAllPresets,
  resetAllPresetsToDefault,
} from "../data/presets";
import {
  loadAllPhrases,
  saveAllPhrases,
} from "../data/standardPhrases";

interface PresetManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentReport: ReportData;
  onApplyPreset: (preset: ClaimPreset) => void;
  onOpenPhraseManager?: () => void;
}

export const SUB_CATEGORY_CONFIG: Record<
  string,
  {
    key: string;
    label: string;
    badgeColor: string;
    dotColor: string;
    description: string;
  }
> = {
  breakage: {
    key: "breakage",
    label: "파손",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
    dotColor: "bg-rose-500",
    description: "유리병 파손, 외포장 크랙 등 물리적 파손",
  },
  cap: {
    key: "cap",
    label: "캡불량",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    dotColor: "bg-amber-500",
    description: "캡 이물, 오버캡 헛돎, 실링 불량 등",
  },
  spoilage: {
    key: "spoilage",
    label: "변질",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    dotColor: "bg-emerald-500",
    description: "기밀해제 곰팡이, 산패, 단백질 응고 등",
  },
  foreign: {
    key: "foreign",
    label: "혼입",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
    dotColor: "bg-purple-500",
    description: "곤충, 설비 파편, 젤리 탄화물 등 이물 혼입",
  },
  quantity: {
    key: "quantity",
    label: "수량부족",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    dotColor: "bg-blue-500",
    description: "박스 내 제품 결손, 수량 불일치",
  },
  fill: {
    key: "fill",
    label: "충전불량",
    badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-300",
    dotColor: "bg-cyan-500",
    description: "내용량 부족, FBI 액위 검사 허용오차",
  },
  packaging: {
    key: "packaging",
    label: "포장불량",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-300",
    dotColor: "bg-orange-500",
    description: "라벨 오류, 핫멜트, 절취선 터짐, 탭 파손 등",
  },
};

const SUB_CATEGORY_OPTIONS = [
  { value: "breakage", label: "파손" },
  { value: "cap", label: "캡불량" },
  { value: "spoilage", label: "변질" },
  { value: "foreign", label: "혼입" },
  { value: "quantity", label: "수량부족" },
  { value: "fill", label: "충전불량" },
  { value: "packaging", label: "포장불량" },
];

const CATEGORY_OPTIONS = [
  { value: "foreign_object", label: "이물 혼입" },
  { value: "spoilage", label: "변질 / 산패" },
  { value: "precipitate", label: "침전 / 혼탁" },
  { value: "leak", label: "용기 파손 / 리크" },
  { value: "swelling", label: "용기 팽창" },
  { value: "general", label: "공통 / 기타" },
];

const FIELD_OPTIONS = [
  { value: "sampleCondition", label: "현품 외관 및 이물 육안 확인" },
  { value: "foreignObjectAppearance", label: "이물 외형 및 물리적 성상" },
  { value: "magnifierResult", label: "확대경(10~40x) 조사 결과" },
  { value: "microscopeResult", label: "광학 현미경(200x) 조사 결과" },
  { value: "ftirSummary", label: "FT-IR 정성 분석 결과" },
  { value: "vacuumCheck", label: "내압 진공도/밀봉도 판정" },
  { value: "microbialResult", label: "미생물/세균 시험 결과" },
  { value: "retainedSampleCheck", label: "동일 Lot 공장 보관품 점검" },
  { value: "productionLogNote", label: "제조일지 및 검출기 모니터링" },
  { value: "criticalControlPoint", label: "클레임 연계 주요 관리점 점검" },
  { value: "rootCause", label: "원인 분석 종합 판정" },
  { value: "preventiveAction", label: "재발방지대책" },
  { value: "apologyText", label: "사과 및 고객 안내문" },
  { value: "conclusion", label: "최종 결론 요약" },
  { value: "principle_visual", label: "시험법 원리: 육안 검사" },
  { value: "principle_magnifier", label: "시험법 원리: 확대경 파선 분석" },
  { value: "principle_microscope", label: "시험법 원리: 현미경 관찰" },
  { value: "principle_ftir", label: "시험법 원리: FT-IR 적외선 분광" },
  { value: "principle_physicochemical", label: "시험법 원리: 이화학/진공도" },
  { value: "principle_catalase", label: "시험법 원리: 카탈라아제 효소" },
];

export function PresetManagerModal({
  isOpen,
  onClose,
  currentReport,
  onApplyPreset,
  onOpenPhraseManager,
}: PresetManagerModalProps) {
  const [presets, setPresets] = useState<ClaimPreset[]>([]);
  const [allPhrases, setAllPhrases] = useState<StandardPhrase[]>([]);

  // Selection & Mode state:
  // "view": Inspect selected preset contents, linked phrases, with choices to apply to form or edit
  // "edit": Edit selected preset details, templates, or linked phrases
  // "create": Separate form to register a new preset
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [mode, setMode] = useState<"view" | "edit" | "create">("view");

  // View mode tab: "phrases" (Linked boilerplate phrases) or "template_data" (Investigation form data)
  const [viewDetailTab, setViewDetailTab] = useState<"phrases" | "template_data">("phrases");

  // Form fields for editing/creating
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [scope, setScope] = useState<"in_house" | "oem">("in_house");
  const [subCategory, setSubCategory] = useState<
    "breakage" | "cap" | "spoilage" | "foreign" | "quantity" | "fill" | "packaging"
  >("breakage");
  const [category, setCategory] = useState("foreign_object");
  const [badgeColor, setBadgeColor] = useState("bg-rose-100 text-rose-800 border-rose-300");

  // Template editable fields for edit mode
  const [templateRootCause, setTemplateRootCause] = useState("");
  const [templatePreventiveAction, setTemplatePreventiveAction] = useState("");
  const [templateApologyText, setTemplateApologyText] = useState("");
  const [templateSampleCondition, setTemplateSampleCondition] = useState("");

  // List filters
  const [listScope, setListScope] = useState<"all" | "in_house" | "oem">("all");
  const [listSubCategory, setListSubCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Inline Phrase editing & adding states
  const [editingPhraseId, setEditingPhraseId] = useState<string | null>(null);
  const [editPhraseTitle, setEditPhraseTitle] = useState("");
  const [editPhraseField, setEditPhraseField] = useState("sampleCondition");
  const [editPhraseContent, setEditPhraseContent] = useState("");

  const [isAddingPhrase, setIsAddingPhrase] = useState(false);
  const [newPhraseTitle, setNewPhraseTitle] = useState("");
  const [newPhraseField, setNewPhraseField] = useState("sampleCondition");
  const [newPhraseContent, setNewPhraseContent] = useState("");

  // Feedback toast
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // DOM Refs
  const editorPanelRef = useRef<HTMLDivElement>(null);

  const showFeedback = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 3500);
  };

  useEffect(() => {
    if (isOpen) {
      const loadedPresets = loadAllPresets();
      const loadedPhrases = loadAllPhrases();
      setPresets(loadedPresets);
      setAllPhrases(loadedPhrases);

      // Default select the first preset in view mode
      if (loadedPresets.length > 0) {
        setSelectedPresetId(loadedPresets[0].id);
        setMode("view");
      }
      setIsAddingPhrase(false);
      setEditingPhraseId(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Selected preset object
  const selectedPreset = presets.find((p) => p.id === selectedPresetId) || presets[0] || null;

  // Get phrases linked to a preset
  const getLinkedPhrasesForPreset = (p: ClaimPreset | null): StandardPhrase[] => {
    if (!p) return [];
    return allPhrases.filter(
      (ph) => ph.presetId === p.id || (p.category && ph.category && ph.category === p.category)
    );
  };

  const currentLinkedPhrases = getLinkedPhrasesForPreset(selectedPreset);

  // Switch to View Mode for a preset
  const handleSelectPreset = (p: ClaimPreset) => {
    setSelectedPresetId(p.id);
    setMode("view");
    setEditingPhraseId(null);
    setIsAddingPhrase(false);
    if (editorPanelRef.current) {
      editorPanelRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Switch to Edit Mode for a preset
  const handleStartEdit = (p: ClaimPreset) => {
    setSelectedPresetId(p.id);
    setMode("edit");
    setName(p.name);
    setDescription(p.description);
    const pScope = p.scope || (p.category?.includes("외주") ? "oem" : "in_house");
    setScope(pScope);
    const pSub = (p.subCategory as any) || "breakage";
    setSubCategory(pSub);
    setCategory(p.category || "foreign_object");
    setBadgeColor(p.badgeColor || SUB_CATEGORY_CONFIG[pSub]?.badgeColor || "bg-blue-100 text-blue-800 border-blue-300");

    // Template fields
    setTemplateRootCause(p.data?.rootCauseAndActions?.rootCause || "");
    setTemplatePreventiveAction(p.data?.rootCauseAndActions?.preventiveMeasures || "");
    setTemplateApologyText(p.data?.conclusion?.apologyText || "");
    setTemplateSampleCondition(p.data?.analysisResults?.visualInspection?.sampleCondition || "");

    setEditingPhraseId(null);
    setIsAddingPhrase(false);

    if (editorPanelRef.current) {
      editorPanelRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Switch to Create Mode (Separate from preset viewing)
  const handleStartCreate = () => {
    setMode("create");
    setSelectedPresetId(null);
    setName(`[신규] ${currentReport.productInfo.productName || "클레임"} 원인조사 템플릿`);
    setDescription(currentReport.customerClaim.claimDetails || "사용자 등록 맞춤 원인조사 프리셋");
    setScope("in_house");
    setSubCategory("foreign");
    setCategory("foreign_object");
    setBadgeColor(SUB_CATEGORY_CONFIG["foreign"].badgeColor);
    setEditingPhraseId(null);
    setIsAddingPhrase(false);

    if (editorPanelRef.current) {
      editorPanelRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubCategoryChange = (
    newSub: "breakage" | "cap" | "spoilage" | "foreign" | "quantity" | "fill" | "packaging"
  ) => {
    setSubCategory(newSub);
    const matchedTheme = SUB_CATEGORY_CONFIG[newSub]?.badgeColor;
    if (matchedTheme) {
      setBadgeColor(matchedTheme);
    }
  };

  // Save Preset (either update existing or create new)
  const handleSavePreset = () => {
    if (!name.trim()) {
      alert("프리셋 명칭을 입력해주세요.");
      return;
    }

    if (mode === "edit" && selectedPresetId) {
      const updated = presets.map((p) => {
        if (p.id === selectedPresetId) {
          return {
            ...p,
            name: name.trim(),
            description: description.trim() || "클레임 원인조사 프리셋",
            scope,
            subCategory,
            category,
            badgeColor,
            data: {
              ...p.data,
              rootCauseAndActions: {
                ...(p.data?.rootCauseAndActions || {
                  skipped: false,
                  rootCause: "",
                  preventiveMeasuresSkipped: false,
                  preventiveMeasures: "",
                }),
                rootCause: templateRootCause,
                preventiveMeasures: templatePreventiveAction,
              },
              conclusion: {
                ...(p.data?.conclusion || {
                  summaryPoints: [],
                  apologyText: "",
                  closingRemarks: "",
                }),
                apologyText: templateApologyText,
              },
              analysisResults: {
                ...(p.data?.analysisResults || {}),
                visualInspection: {
                  ...(p.data?.analysisResults?.visualInspection || { skipped: false }),
                  sampleCondition: templateSampleCondition,
                },
              },
            } as Partial<ReportData>,
          };
        }
        return p;
      });
      saveAllPresets(updated);
      setPresets(updated);
      setMode("view");
      showFeedback(`프리셋 '${name.trim()}'이(가) 성공적으로 수정 저장되었습니다.`);
    } else if (mode === "create") {
      const newPreset: ClaimPreset = {
        id: `preset-custom-${Date.now()}`,
        name: name.trim(),
        description: description.trim() || "사용자 등록 맞춤 프리셋",
        scope,
        subCategory,
        category,
        badgeColor,
        isCustom: true,
        data: {
          title: currentReport.title,
          productInfo: currentReport.productInfo,
          customerClaim: {
            ...currentReport.customerClaim,
            customerName: currentReport.customerClaim.customerName || "고객",
          },
          analysisResults: currentReport.analysisResults,
          manufacturingProcess: currentReport.manufacturingProcess,
          lotHistory: currentReport.lotHistory,
          rootCauseAndActions: currentReport.rootCauseAndActions,
          conclusion: currentReport.conclusion,
        },
      };
      const updated = [newPreset, ...presets];
      saveAllPresets(updated);
      setPresets(updated);
      setSelectedPresetId(newPreset.id);
      setMode("view");
      showFeedback(`새 클레임 프리셋 '${name.trim()}'이(가) 성공적으로 등록되었습니다.`);
    }
  };

  // Overwrite preset data with current active report form data
  const handleOverwriteWithCurrentReport = (targetPresetId: string) => {
    if (!confirm("현재 메인 화면에서 작성 중인 모든 시험 및 분석 데이터로 이 프리셋의 내용을 덮어쓰시겠습니까?")) return;
    const updated = presets.map((p) => {
      if (p.id === targetPresetId) {
        return {
          ...p,
          data: {
            title: currentReport.title,
            productInfo: currentReport.productInfo,
            customerClaim: currentReport.customerClaim,
            analysisResults: currentReport.analysisResults,
            manufacturingProcess: currentReport.manufacturingProcess,
            lotHistory: currentReport.lotHistory,
            rootCauseAndActions: currentReport.rootCauseAndActions,
            conclusion: currentReport.conclusion,
          },
        };
      }
      return p;
    });
    saveAllPresets(updated);
    setPresets(updated);
    showFeedback("현재 작성 폼 내용으로 프리셋 조사 데이터가 동기화되었습니다.");
  };

  // Delete preset
  const handleDeletePreset = (id: string, presetName: string) => {
    if (!confirm(`'${presetName}' 프리셋을 정말 삭제하시겠습니까?`)) return;
    const updated = presets.filter((p) => p.id !== id);
    saveAllPresets(updated);
    setPresets(updated);
    if (selectedPresetId === id) {
      if (updated.length > 0) {
        setSelectedPresetId(updated[0].id);
        setMode("view");
      } else {
        setSelectedPresetId(null);
      }
    }
    showFeedback("프리셋이 성공적으로 삭제되었습니다.");
  };

  // Factory reset
  const handleResetToFactoryDefaults = () => {
    if (!confirm("모든 기본 프리셋을 공장 출하 초기 상태로 복원하시겠습니까? (사용자 등록 프리셋이 초기화될 수 있습니다)")) return;
    const defaults = resetAllPresetsToDefault();
    setPresets(defaults);
    if (defaults.length > 0) {
      setSelectedPresetId(defaults[0].id);
      setMode("view");
    }
    showFeedback("기본 프리셋이 공장 출하값으로 복원되었습니다.");
  };

  // =========================================================================
  // LINKED PHRASE ACTIONS (Inspect, Inline Edit, Add, Delete, Copy)
  // =========================================================================
  const handleStartEditPhrase = (phrase: StandardPhrase) => {
    setEditingPhraseId(phrase.id);
    setEditPhraseTitle(phrase.title);
    setEditPhraseField(phrase.fieldKey);
    setEditPhraseContent(phrase.content);
  };

  const handleCancelEditPhrase = () => {
    setEditingPhraseId(null);
    setEditPhraseTitle("");
    setEditPhraseContent("");
  };

  const handleSaveEditedPhrase = (phraseId: string) => {
    if (!editPhraseTitle.trim() || !editPhraseContent.trim()) {
      alert("상용구 제목과 내용을 모두 입력해주세요.");
      return;
    }
    const updated = allPhrases.map((ph) => {
      if (ph.id === phraseId) {
        return {
          ...ph,
          title: editPhraseTitle.trim(),
          fieldKey: editPhraseField,
          content: editPhraseContent.trim(),
        };
      }
      return ph;
    });
    saveAllPhrases(updated);
    setAllPhrases(updated);
    setEditingPhraseId(null);
    showFeedback(`'${editPhraseTitle.trim()}' 상용구 문구가 성공적으로 수정되었습니다.`);
  };

  const handleDeletePhrase = (phraseId: string, title: string) => {
    if (!confirm(`'${title}' 연계 상용구를 삭제하시겠습니까?`)) return;
    const updated = allPhrases.filter((ph) => ph.id !== phraseId);
    saveAllPhrases(updated);
    setAllPhrases(updated);
    showFeedback("연계 상용구가 삭제되었습니다.");
  };

  const handleAddLinkedPhrase = () => {
    if (!selectedPreset) return;
    if (!newPhraseTitle.trim() || !newPhraseContent.trim()) {
      alert("상용구 제목과 내용을 모두 입력해주세요.");
      return;
    }

    const newPhrase: StandardPhrase = {
      id: `p-custom-${Date.now()}`,
      fieldKey: newPhraseField,
      title: newPhraseTitle.trim(),
      content: newPhraseContent.trim(),
      presetId: selectedPreset.id,
      category: selectedPreset.category || "foreign_object",
      isCustom: true,
    };

    const updated = [...allPhrases, newPhrase];
    saveAllPhrases(updated);
    setAllPhrases(updated);

    setNewPhraseTitle("");
    setNewPhraseContent("");
    setIsAddingPhrase(false);
    showFeedback(`프리셋 [${selectedPreset.name}]에 새 연계 상용구가 등록되었습니다.`);
  };

  const handleCopyPhrase = (content: string, title: string) => {
    navigator.clipboard.writeText(content);
    showFeedback(`'${title}' 상용구 문구가 클립보드에 복사되었습니다.`);
  };

  // Filtered presets for left list
  const filteredPresets = presets.filter((p) => {
    const pScope = p.scope || (p.category?.includes("외주") ? "oem" : "in_house");
    if (listScope !== "all" && pScope !== listScope) return false;
    if (listSubCategory !== "all" && (p.subCategory || "") !== listSubCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      if (!matchName && !matchDesc) return false;
    }
    return true;
  });

  const inHouseCount = presets.filter((p) => (p.scope || "in_house") === "in_house").length;
  const oemCount = presets.filter((p) => p.scope === "oem").length;

  return (
    <div
      id="preset-manager-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full h-[94vh] max-h-[960px] overflow-hidden border border-slate-300 flex flex-col">
        {/* Modal Master Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-white">
                  품질 클레임 원인조사 프리셋 &amp; 연계 상용구 지식 관리
                </h3>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  총 {presets.length}개 프리셋 보유
                </span>
              </div>
              <p className="text-xs text-slate-300 hidden sm:block mt-0.5">
                프리셋을 클릭하여 세부 내용과 연계 상용구를 바로 확인하고, 작성 폼 적용 또는 프리셋 수정을 선택할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenPhraseManager && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenPhraseManager();
                }}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
                title="전체 상용구 및 시험분석 원리 라이브러리로 이동"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>전체 상용구 관리</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="창 닫기 (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Toast Feedback */}
        {feedbackMessage && (
          <div className="bg-emerald-600 text-white px-6 py-2.5 text-xs font-bold flex items-center gap-2 shrink-0 animate-in slide-in-from-top-1">
            <Check className="w-4 h-4 shrink-0" />
            <span>{feedbackMessage}</span>
          </div>
        )}

        {/* Master-Detail 2-Column Body */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Searchable List & Filters (w-full lg:w-[420px] shrink-0)    */}
          {/* ========================================================================= */}
          <div className="w-full lg:w-[420px] shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-slate-50/70 overflow-hidden">
            {/* Top Distinct Action: New Preset Registration (Separated clearly!) */}
            <div className="p-3.5 bg-white border-b border-slate-200 shrink-0 space-y-3">
              {/* Separate New Preset Registration Button */}
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleStartCreate}
                  className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 ${
                    mode === "create"
                      ? "bg-blue-700 text-white ring-2 ring-blue-400"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                  title="현재 작성 화면 데이터로 새로운 프리셋 등록"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ 신규 프리셋 등록</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetToFactoryDefaults}
                  className="px-2.5 py-2 text-xs text-slate-500 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 border border-slate-200 rounded-xl transition-colors shrink-0"
                  title="기본 프리셋 공장 출하값 복원"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Scope Switcher */}
              <div className="flex rounded-lg bg-slate-100 p-1 border border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setListScope("all");
                    setListSubCategory("all");
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all text-center ${
                    listScope === "all"
                      ? "bg-white text-slate-900 shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  전체 ({presets.length})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setListScope("in_house");
                    setListSubCategory("all");
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1 ${
                    listScope === "in_house"
                      ? "bg-blue-600 text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>자사 ({inHouseCount})</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setListScope("oem");
                    setListSubCategory("all");
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1 ${
                    listScope === "oem"
                      ? "bg-purple-600 text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Factory className="w-3.5 h-3.5" />
                  <span>외주 ({oemCount})</span>
                </button>
              </div>

              {/* Search Box */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="프리셋 명칭, 현상 또는 결함 검색..."
                  className="w-full text-xs pl-9 pr-8 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Cause Sub-Categories Filter Pills */}
              <div className="space-y-1 pt-0.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span className="flex items-center gap-1">
                    <Filter className="w-3 h-3 text-slate-400" />
                    <span>원인 분류 필터</span>
                  </span>
                  {listSubCategory !== "all" && (
                    <button
                      type="button"
                      onClick={() => setListSubCategory("all")}
                      className="text-blue-600 hover:underline text-[10px]"
                    >
                      필터 해제
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin">
                  <button
                    type="button"
                    onClick={() => setListSubCategory("all")}
                    className={`px-2 py-0.5 text-xs font-semibold rounded-md transition-all shrink-0 ${
                      listSubCategory === "all"
                        ? "bg-slate-900 text-white font-bold"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    전체
                  </button>
                  {SUB_CATEGORY_OPTIONS.map((sub) => {
                    const isActive = listSubCategory === sub.value;
                    const cfg = SUB_CATEGORY_CONFIG[sub.value];
                    const count = presets.filter((p) => {
                      const pScope = p.scope || (p.category?.includes("외주") ? "oem" : "in_house");
                      if (listScope !== "all" && pScope !== listScope) return false;
                      return (p.subCategory || "") === sub.value;
                    }).length;

                    return (
                      <button
                        key={sub.value}
                        type="button"
                        onClick={() => setListSubCategory(sub.value)}
                        className={`px-2 py-0.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1 shrink-0 border ${
                          isActive
                            ? `${cfg?.badgeColor || "bg-blue-600 text-white"} ring-1 ring-blue-500 font-bold`
                            : count > 0
                            ? "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                            : "bg-slate-100/50 text-slate-400 border-slate-200/50"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg?.dotColor || "bg-slate-400"}`} />
                        <span>{sub.label}</span>
                        <span className="text-[10px] text-slate-400">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Presets List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              <div className="px-1 text-[11px] font-bold text-slate-500 flex items-center justify-between">
                <span>프리셋 목록 ({filteredPresets.length}개)</span>
                <span className="text-[10px] text-slate-400">클릭 시 우측에서 상세 확인</span>
              </div>

              {filteredPresets.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400 bg-white rounded-xl border border-dashed border-slate-300">
                  <Layers className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="font-semibold text-slate-600">조건에 부합하는 프리셋이 없습니다.</p>
                  <p className="text-[11px] text-slate-400 mt-1">상단 필터를 조정해보세요.</p>
                </div>
              ) : (
                filteredPresets.map((preset) => {
                  const isSelected = selectedPresetId === preset.id && mode !== "create";
                  const isOem = preset.scope === "oem";
                  const subCfg = SUB_CATEGORY_CONFIG[preset.subCategory || ""];
                  const linkedPhrasesList = getLinkedPhrasesForPreset(preset);

                  return (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer relative ${
                        isSelected
                          ? "bg-blue-50/90 border-blue-500 ring-2 ring-blue-300 shadow-md"
                          : "bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/50"
                      }`}
                    >
                      {/* Top tags row */}
                      <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                        <span
                          className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded border ${
                            isOem
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          }`}
                        >
                          {isOem ? "외주 OEM" : "자사 생산"}
                        </span>

                        {subCfg && (
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded border flex items-center gap-1 ${subCfg.badgeColor}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${subCfg.dotColor}`} />
                            <span>{subCfg.label}</span>
                          </span>
                        )}

                        <span className="text-[10px] text-blue-700 bg-blue-50 font-semibold px-1.5 py-0.5 rounded border border-blue-200 flex items-center gap-1 ml-auto">
                          <Tag className="w-2.5 h-2.5 text-blue-500" />
                          <span>연계 상용구 {linkedPhrasesList.length}개</span>
                        </span>
                      </div>

                      {/* Preset Name */}
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-1">
                        {preset.name}
                      </h4>

                      {/* Description preview */}
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-2.5">
                        {preset.description}
                      </p>

                      {/* Quick action buttons row */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <span className="text-[10px] font-medium text-slate-400">
                          {isSelected ? (
                            <span className="text-blue-600 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>현재 선택됨</span>
                            </span>
                          ) : (
                            "클릭하여 내용 확인"
                          )}
                        </span>

                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          {/* Quick Edit button */}
                          <button
                            type="button"
                            onClick={() => handleStartEdit(preset)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:text-blue-700 transition-colors"
                            title="이 프리셋의 설정 및 템플릿 수정"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>수정</span>
                          </button>

                          {/* Quick Apply button */}
                          <button
                            type="button"
                            onClick={() => {
                              onApplyPreset(preset);
                              onClose();
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-bold rounded-md bg-slate-900 hover:bg-blue-600 text-white transition-colors shadow-2xs"
                            title="현재 작성 폼에 즉시 적용"
                          >
                            <FileCheck className="w-3 h-3" />
                            <span>폼 적용</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Detail Viewer / Editor Panel (flex-1 overflow-y-auto)       */}
          {/* ========================================================================= */}
          <div
            ref={editorPanelRef}
            className="flex-1 flex flex-col bg-white overflow-y-auto min-h-0"
          >
            {/* --------------------------------------------------------------------- */}
            {/* MODE 1: VIEW / INSPECT (보고 싶은 프리셋을 눌러서 내용 확인)            */}
            {/* --------------------------------------------------------------------- */}
            {mode === "view" && selectedPreset && (
              <div className="p-6 space-y-6 max-w-4xl mx-auto w-full animate-in fade-in duration-100">
                {/* 1. Header Card with Badges & Name */}
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-xs font-extrabold px-2.5 py-1 rounded-lg border ${
                        selectedPreset.scope === "oem"
                          ? "bg-purple-100 text-purple-800 border-purple-300"
                          : "bg-blue-100 text-blue-800 border-blue-300"
                      }`}
                    >
                      {selectedPreset.scope === "oem" ? "🏭 외주 OEM 생산" : "🏢 자사 공장 생산"}
                    </span>

                    {selectedPreset.subCategory && SUB_CATEGORY_CONFIG[selectedPreset.subCategory] && (
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
                          SUB_CATEGORY_CONFIG[selectedPreset.subCategory].badgeColor
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${SUB_CATEGORY_CONFIG[selectedPreset.subCategory].dotColor}`}
                        />
                        <span>{SUB_CATEGORY_CONFIG[selectedPreset.subCategory].label}</span>
                        <span className="text-[11px] opacity-75">
                          ({SUB_CATEGORY_CONFIG[selectedPreset.subCategory].description})
                        </span>
                      </span>
                    )}

                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg border bg-blue-50 text-blue-800 border-blue-200 flex items-center gap-1.5 ml-auto">
                      <Tag className="w-3.5 h-3.5 text-blue-600" />
                      <span>연계 상용구 {currentLinkedPhrases.length}개</span>
                    </span>

                    {selectedPreset.isCustom && (
                      <span className="text-xs font-bold px-2 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                        사용자 등록
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base sm:text-xl font-extrabold text-slate-900 leading-tight">
                      {selectedPreset.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed bg-white p-3 rounded-xl border border-slate-200/80">
                      {selectedPreset.description}
                    </p>
                  </div>
                </div>

                {/* 2. CORE DECISION ACTION BAR (폼 적용할지 / 프리셋 수정할지 명확한 선택!) */}
                <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 rounded-2xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg border border-slate-700">
                  <div>
                    <span className="text-[10px] font-extrabold text-blue-300 uppercase tracking-wider bg-blue-500/20 px-2 py-0.5 rounded-full border border-blue-400/30">
                      프리셋 활용 선택
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-white mt-1">
                      이 프리셋의 조사 내용과 상용구를 어떻게 활용하시겠습니까?
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      아래 세부 내용을 확인하신 후 작성 폼에 즉시 적용하거나 프리셋 설정을 수정할 수 있습니다.
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    {/* Primary Choice 1: Apply to form */}
                    <button
                      type="button"
                      onClick={() => {
                        onApplyPreset(selectedPreset);
                        onClose();
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-extrabold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 rounded-xl shadow-md transition-all"
                    >
                      <FileCheck className="w-4 h-4" />
                      <span>이 프리셋을 현재 폼에 적용</span>
                    </button>

                    {/* Primary Choice 2: Edit preset contents */}
                    <button
                      type="button"
                      onClick={() => handleStartEdit(selectedPreset)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 active:scale-95 rounded-xl shadow-sm transition-all border border-slate-200"
                    >
                      <Edit3 className="w-4 h-4 text-blue-600" />
                      <span>프리셋 내용 수정</span>
                    </button>

                    {selectedPreset.isCustom && (
                      <button
                        type="button"
                        onClick={() => handleDeletePreset(selectedPreset.id, selectedPreset.name)}
                        className="p-2.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-colors"
                        title="커스텀 프리셋 삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* 3. Detail Tabs (연계 상용구 문구 확인 vs 원인조사 템플릿 데이터) */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setViewDetailTab("phrases")}
                        className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${
                          viewDetailTab === "phrases"
                            ? "bg-white text-blue-700 shadow-sm"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Tag className="w-4 h-4 text-blue-600" />
                        <span>연계 전문 상용구 문구 ({currentLinkedPhrases.length}개)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setViewDetailTab("template_data")}
                        className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${
                          viewDetailTab === "template_data"
                            ? "bg-white text-blue-700 shadow-sm"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <FileText className="w-4 h-4 text-slate-600" />
                        <span>원인조사 템플릿 세부 내용</span>
                      </button>
                    </div>

                    {viewDetailTab === "phrases" && (
                      <button
                        type="button"
                        onClick={() => setIsAddingPhrase(!isAddingPhrase)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>새 연계 상용구 추가</span>
                      </button>
                    )}
                  </div>

                  {/* ----------------------------------------------------------------- */}
                  {/* TAB 1: 연계 전문 상용구 문구 확인 및 바로 수정 (핵심 요구사항!)        */}
                  {/* ----------------------------------------------------------------- */}
                  {viewDetailTab === "phrases" && (
                    <div className="space-y-4">
                      {/* Add new linked phrase form */}
                      {isAddingPhrase && (
                        <div className="p-4 bg-blue-50/70 rounded-xl border-2 border-blue-200 space-y-3 animate-in fade-in duration-150">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                              <Plus className="w-4 h-4 text-blue-600" />
                              <span>[{selectedPreset.name}]에 새 연계 상용구 등록</span>
                            </h5>
                            <button
                              type="button"
                              onClick={() => setIsAddingPhrase(false)}
                              className="text-slate-400 hover:text-slate-600 text-xs"
                            >
                              취소
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                적용할 보고서 입력 항목
                              </label>
                              <select
                                value={newPhraseField}
                                onChange={(e) => setNewPhraseField(e.target.value)}
                                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              >
                                {FIELD_OPTIONS.map((f) => (
                                  <option key={f.value} value={f.value}>
                                    {f.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                상용구 제목 (식별용 명칭)
                              </label>
                              <input
                                type="text"
                                value={newPhraseTitle}
                                onChange={(e) => setNewPhraseTitle(e.target.value)}
                                placeholder="예: 타격점 및 원호형 물결무늬 파선 감식 소견"
                                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              상용구 본문 내용 (보고서 입력란에 채워질 전문 문구)
                            </label>
                            <textarea
                              rows={3}
                              value={newPhraseContent}
                              onChange={(e) => setNewPhraseContent(e.target.value)}
                              placeholder="프리셋 적용 시 추천될 전문 시험분석 및 판정 문구를 입력하세요."
                              className="w-full text-xs p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 leading-relaxed"
                            />
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => setIsAddingPhrase(false)}
                              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200/60 rounded-lg"
                            >
                              취소
                            </button>
                            <button
                              type="button"
                              onClick={handleAddLinkedPhrase}
                              className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>연계 상용구 등록</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Phrases List with inline view & edit */}
                      {currentLinkedPhrases.length === 0 ? (
                        <div className="p-10 text-center text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-300 space-y-2">
                          <Tag className="w-8 h-8 text-slate-300 mx-auto" />
                          <p className="font-semibold text-slate-600">
                            이 프리셋에 연계된 상용구가 아직 없습니다.
                          </p>
                          <p className="text-[11px] text-slate-400">
                            상단의 [+ 새 연계 상용구 추가] 버튼을 눌러 자주 사용하는 전문 문구를 등록해보세요.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                            <span>
                              총 <strong>{currentLinkedPhrases.length}개</strong>의 상용구가 연계되어 있습니다. 문구를 바로 확인하고 수정할 수 있습니다.
                            </span>
                            <span className="text-[11px] text-slate-400">
                              메인 폼에서 추천 상용구로 자동 우선 노출됩니다.
                            </span>
                          </div>

                          {currentLinkedPhrases.map((phrase, idx) => {
                            const isEditingThisPhrase = editingPhraseId === phrase.id;
                            const fieldLabel =
                              FIELD_OPTIONS.find((f) => f.value === phrase.fieldKey)?.label ||
                              phrase.fieldKey;

                            if (isEditingThisPhrase) {
                              return (
                                <div
                                  key={phrase.id}
                                  className="p-4 bg-amber-50/60 border-2 border-amber-300 rounded-xl space-y-3 shadow-sm animate-in fade-in"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                                      <Edit3 className="w-3.5 h-3.5 text-amber-700" />
                                      <span>연계 상용구 내용 수정</span>
                                    </span>
                                    <button
                                      type="button"
                                      onClick={handleCancelEditPhrase}
                                      className="text-xs text-slate-500 hover:text-slate-800"
                                    >
                                      수정 취소
                                    </button>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                        적용 항목
                                      </label>
                                      <select
                                        value={editPhraseField}
                                        onChange={(e) => setEditPhraseField(e.target.value)}
                                        className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                                      >
                                        {FIELD_OPTIONS.map((f) => (
                                          <option key={f.value} value={f.value}>
                                            {f.label}
                                          </option>
                                        ))}
                                      </select>
                                    </div>

                                    <div>
                                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                        상용구 제목
                                      </label>
                                      <input
                                        type="text"
                                        value={editPhraseTitle}
                                        onChange={(e) => setEditPhraseTitle(e.target.value)}
                                        className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 font-semibold"
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                      문구 본문
                                    </label>
                                    <textarea
                                      rows={4}
                                      value={editPhraseContent}
                                      onChange={(e) => setEditPhraseContent(e.target.value)}
                                      className="w-full text-xs p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 leading-relaxed"
                                    />
                                  </div>

                                  <div className="flex items-center justify-end gap-2">
                                    <button
                                      type="button"
                                      onClick={handleCancelEditPhrase}
                                      className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200/70 rounded-lg"
                                    >
                                      취소
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleSaveEditedPhrase(phrase.id)}
                                      className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-2xs"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                      <span>수정 저장</span>
                                    </button>
                                  </div>
                                </div>
                              );
                            }

                            return (
                              <div
                                key={phrase.id}
                                className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 shadow-2xs hover:shadow-xs transition-all space-y-2.5"
                              >
                                {/* Phrase Top Info Bar */}
                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                  <div className="flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold flex items-center justify-center shrink-0">
                                      {idx + 1}
                                    </span>
                                    <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                                      {phrase.title}
                                    </h5>
                                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                                      {fieldLabel}
                                    </span>
                                    {phrase.isCustom ? (
                                      <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                                        사용자 정의
                                      </span>
                                    ) : (
                                      <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                                        표준 규격
                                      </span>
                                    )}
                                  </div>

                                  {/* Quick Action Buttons for Phrase */}
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => handleCopyPhrase(phrase.content, phrase.title)}
                                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                                      title="문구 내용 복사"
                                    >
                                      <Copy className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleStartEditPhrase(phrase)}
                                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-blue-700 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors"
                                      title="상용구 제목 및 내용 직접 수정"
                                    >
                                      <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                                      <span>수정</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeletePhrase(phrase.id, phrase.title)}
                                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                      title="상용구 삭제"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>

                                {/* Actual Phrase Text Content Box (Clearly displayed!) */}
                                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans whitespace-pre-line">
                                  {phrase.content}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* ----------------------------------------------------------------- */}
                  {/* TAB 2: 원인조사 템플릿 세부 내용 (폼에 실제로 적용될 데이터 확인)      */}
                  {/* ----------------------------------------------------------------- */}
                  {viewDetailTab === "template_data" && (
                    <div className="space-y-4 text-xs">
                      {/* Product & Claim Summary */}
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <h5 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-blue-600" />
                          <span>대상 제품 &amp; 고객 클레임 개요</span>
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                          <div>
                            <span className="font-semibold text-slate-500">제품명: </span>
                            <span className="font-bold text-slate-900">
                              {selectedPreset.data?.productInfo?.productName || "-"}
                            </span>
                          </div>
                          <div>
                            <span className="font-semibold text-slate-500">포장 형태: </span>
                            <span>{selectedPreset.data?.productInfo?.packageType || "-"}</span>
                          </div>
                          <div className="sm:col-span-2">
                            <span className="font-semibold text-slate-500">클레임 내용: </span>
                            <span className="text-slate-800">
                              {selectedPreset.data?.customerClaim?.claimDetails || "-"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Visual & Microscopic Inspection */}
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <h5 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                          <Microscope className="w-4 h-4 text-purple-600" />
                          <span>현품 외관 및 과학 정밀 시험 분석 결과</span>
                        </h5>
                        <div className="space-y-2 text-slate-700">
                          <div>
                            <span className="font-semibold text-slate-600 block mb-0.5">
                              • 현품 상태 및 외관 검사:
                            </span>
                            <p className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-800 leading-relaxed">
                              {selectedPreset.data?.analysisResults?.visualInspection?.sampleCondition ||
                                "외관상 특이점 없음"}
                            </p>
                          </div>
                          {selectedPreset.data?.analysisResults?.magnifierInspection?.result && (
                            <div>
                              <span className="font-semibold text-slate-600 block mb-0.5">
                                • 정밀 확대경 조사 결과:
                              </span>
                              <p className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-800 leading-relaxed">
                                {selectedPreset.data.analysisResults.magnifierInspection.result}
                              </p>
                            </div>
                          )}
                          {selectedPreset.data?.analysisResults?.ftirAnalysis?.summary && (
                            <div>
                              <span className="font-semibold text-slate-600 block mb-0.5">
                                • FT-IR 적외선 분광 분석 결과:
                              </span>
                              <p className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-800 leading-relaxed">
                                {selectedPreset.data.analysisResults.ftirAnalysis.summary}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Retained sample & Manufacturing log */}
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <h5 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>동일 Lot 공장 보관품 및 제조공정 점검 결과</span>
                        </h5>
                        <div className="space-y-2 text-slate-700">
                          <div>
                            <span className="font-semibold text-slate-600 block mb-0.5">
                              • 공장 보관 검체 점검:
                            </span>
                            <p className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-800 leading-relaxed">
                              {selectedPreset.data?.manufacturingProcess?.retainedSampleCheck ||
                                "공장 보관품 전수 검사 결과 이상 없음 (규격 적합)"}
                            </p>
                          </div>
                          {selectedPreset.data?.manufacturingProcess?.productionLogNote && (
                            <div>
                              <span className="font-semibold text-slate-600 block mb-0.5">
                                • 제조일지 및 설비 모니터링:
                              </span>
                              <p className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-800 leading-relaxed">
                                {selectedPreset.data.manufacturingProcess.productionLogNote}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Root Cause & Actions */}
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <h5 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 text-rose-600" />
                          <span>원인 분석 종합 판정 및 재발방지대책</span>
                        </h5>
                        <div className="space-y-2 text-slate-700">
                          <div>
                            <span className="font-semibold text-slate-600 block mb-0.5">
                              • 근본 원인 분석 종합 판정:
                            </span>
                            <p className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-800 leading-relaxed font-semibold">
                              {selectedPreset.data?.rootCauseAndActions?.rootCause || "-"}
                            </p>
                          </div>
                          <div>
                            <span className="font-semibold text-slate-600 block mb-0.5">
                              • 재발방지대책 및 조치 사항:
                            </span>
                            <p className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-800 leading-relaxed">
                              {selectedPreset.data?.rootCauseAndActions?.preventiveMeasures || "-"}
                            </p>
                          </div>
                          {selectedPreset.data?.conclusion?.apologyText && (
                            <div>
                              <span className="font-semibold text-slate-600 block mb-0.5">
                                • 사과 및 고객 안내문:
                              </span>
                              <p className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-800 leading-relaxed">
                                {selectedPreset.data.conclusion.apologyText}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Sticky Action Bar */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    원하는 프리셋을 확인한 후 폼에 적용하거나 내용을 수정할 수 있습니다.
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(selectedPreset)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>프리셋 내용 수정</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onApplyPreset(selectedPreset);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-md transition-all"
                    >
                      <FileCheck className="w-4 h-4" />
                      <span>이 프리셋을 폼에 적용</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* --------------------------------------------------------------------- */}
            {/* MODE 2: EDIT (프리셋 내용 수정 모드)                                    */}
            {/* --------------------------------------------------------------------- */}
            {mode === "edit" && selectedPreset && (
              <div className="p-6 space-y-6 max-w-4xl mx-auto w-full animate-in fade-in duration-100">
                {/* Header Banner */}
                <div className="flex items-center justify-between gap-3 p-4 bg-blue-50 border-2 border-blue-400 rounded-xl text-blue-900 shadow-sm">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Edit3 className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold truncate">
                        [{selectedPreset.name}] 프리셋 내용 수정
                      </h4>
                      <p className="text-xs text-blue-700 mt-0.5">
                        프리셋 명칭, 원인 분류, 템플릿 내용 및 연계 상용구를 편집할 수 있습니다.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMode("view")}
                    className="text-xs font-semibold px-3 py-1.5 bg-white border border-blue-300 text-blue-800 hover:bg-blue-100 rounded-lg shrink-0 transition-colors"
                  >
                    수정 취소 (상세보기로 복귀)
                  </button>
                </div>

                {/* Form fields */}
                <div className="space-y-5">
                  {/* Preset Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      프리셋 명칭 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="예: 01. [자사-병] 유리병 외력 타격 파손 및 내부 파편 클레임"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold text-slate-900 transition-all"
                    />
                  </div>

                  {/* Scope & Cause SubCategory */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        제조/생산 대분류 구분
                      </label>
                      <div className="flex rounded-lg bg-white p-1 border border-slate-300">
                        <button
                          type="button"
                          onClick={() => setScope("in_house")}
                          className={`flex-1 py-2 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1.5 ${
                            scope === "in_house"
                              ? "bg-blue-600 text-white shadow-2xs"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          <Building2 className="w-3.5 h-3.5" />
                          <span>자사 제품 (사내 공장)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setScope("oem")}
                          className={`flex-1 py-2 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1.5 ${
                            scope === "oem"
                              ? "bg-purple-600 text-white shadow-2xs"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          <Factory className="w-3.5 h-3.5" />
                          <span>외주 제품 (OEM/ODM)</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        원인 세부분류
                      </label>
                      <select
                        value={subCategory}
                        onChange={(e) =>
                          handleSubCategoryChange(
                            e.target.value as "breakage" | "cap" | "spoilage" | "foreign" | "quantity" | "fill" | "packaging"
                          )
                        }
                        className="w-full text-xs sm:text-sm px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold text-slate-800"
                      >
                        {SUB_CATEGORY_OPTIONS.map((sub) => (
                          <option key={sub.value} value={sub.value}>
                            {sub.label} ({SUB_CATEGORY_CONFIG[sub.value]?.description})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Badge Theme */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-blue-600" />
                        <span>식별 배지 색상 테마</span>
                      </label>
                      <span className="text-[11px] text-slate-500">
                        원인 분류에 맞추어 자동 지정됩니다.
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                      {Object.entries(SUB_CATEGORY_CONFIG).map(([subKey, cfg]) => {
                        const isSelected = badgeColor === cfg.badgeColor;
                        return (
                          <button
                            key={subKey}
                            type="button"
                            onClick={() => {
                              setBadgeColor(cfg.badgeColor);
                              setSubCategory(subKey as any);
                            }}
                            className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-semibold transition-all ${
                              isSelected
                                ? `${cfg.badgeColor} ring-2 ring-blue-600 shadow-2xs font-extrabold scale-[1.02]`
                                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-center gap-1.5">
                              <span className={`w-2 h-2 rounded-full ${cfg.dotColor} shrink-0`} />
                              <span className="font-bold">{cfg.label}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Category linkage */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        상용구 연계 카테고리
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      >
                        {CATEGORY_OPTIONS.map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        연계 상용구 상태
                      </label>
                      <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-center justify-between">
                        <span>현재 등록된 연계 상용구</span>
                        <span className="font-bold text-blue-700">
                          {currentLinkedPhrases.length}개
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      시나리오 및 원인 요약 설명
                    </label>
                    <textarea
                      rows={2}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="프리셋의 주요 결함 상황 및 원인 요약을 입력하세요."
                      className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed transition-all"
                    />
                  </div>

                  {/* Template Key Fields Editor */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <h5 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>원인조사 템플릿 핵심 문구 편집</span>
                    </h5>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        근본 원인 분석 종합 판정
                      </label>
                      <textarea
                        rows={2}
                        value={templateRootCause}
                        onChange={(e) => setTemplateRootCause(e.target.value)}
                        placeholder="이 프리셋 적용 시 기본으로 입력될 원인 판정 내용"
                        className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        재발방지대책 및 공정 조치
                      </label>
                      <textarea
                        rows={2}
                        value={templatePreventiveAction}
                        onChange={(e) => setTemplatePreventiveAction(e.target.value)}
                        placeholder="이 프리셋 적용 시 기본으로 입력될 재발방지대책"
                        className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        현품 외관 및 이물 검사 소견
                      </label>
                      <textarea
                        rows={2}
                        value={templateSampleCondition}
                        onChange={(e) => setTemplateSampleCondition(e.target.value)}
                        placeholder="현품 상태 소견"
                        className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Overwrite with current form */}
                  <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center justify-between gap-3">
                    <div>
                      <h5 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                        <FolderDown className="w-4 h-4 text-amber-700" />
                        <span>작성 폼 데이터로 전체 덮어쓰기</span>
                      </h5>
                      <p className="text-[11px] text-amber-800 mt-0.5">
                        현재 메인 화면에서 작성 중인 시험 분석 데이터 전체를 이 프리셋의 템플릿으로 저장합니다.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleOverwriteWithCurrentReport(selectedPreset.id)}
                      className="px-3 py-1.5 text-xs font-bold text-amber-900 bg-amber-200 hover:bg-amber-300 border border-amber-300 rounded-lg transition-colors shrink-0"
                    >
                      현재 폼 데이터로 덮어쓰기
                    </button>
                  </div>

                  {/* Bottom Save & Cancel Bar */}
                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setMode("view")}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                    >
                      수정 취소 (상세보기로 복귀)
                    </button>

                    <button
                      type="button"
                      onClick={handleSavePreset}
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-md transition-all"
                    >
                      <Check className="w-4 h-4" />
                      <span>프리셋 수정 완료 저장</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* --------------------------------------------------------------------- */}
            {/* MODE 3: CREATE (신규 등록은 신규 등록으로 별도 분리!)                      */}
            {/* --------------------------------------------------------------------- */}
            {mode === "create" && (
              <div className="p-6 space-y-6 max-w-4xl mx-auto w-full animate-in fade-in duration-100">
                {/* Header Banner */}
                <div className="flex items-center justify-between gap-3 p-4 bg-blue-900 text-white rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Plus className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm sm:text-base font-bold truncate">
                        신규 클레임 프리셋 등록
                      </h4>
                      <p className="text-xs text-blue-200 mt-0.5">
                        현재 작성 폼에 입력된 세부 시험 분석, 제조공정 점검, 재발방지대책 데이터를 기반으로 새로운 프리셋을 생성합니다.
                      </p>
                    </div>
                  </div>
                  {presets.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPresetId(presets[0].id);
                        setMode("view");
                      }}
                      className="text-xs font-semibold px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-200 hover:text-white rounded-lg shrink-0 transition-colors"
                    >
                      등록 취소 (목록으로 복귀)
                    </button>
                  )}
                </div>

                {/* Form fields */}
                <div className="space-y-5">
                  {/* Preset Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      새 프리셋 명칭 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="예: [자사-신규] 원료 침전물 및 온장고 열분해 탄화 클레임"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold text-slate-900 transition-all"
                    />
                  </div>

                  {/* Scope & Cause SubCategory */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        제조/생산 대분류 구분
                      </label>
                      <div className="flex rounded-lg bg-white p-1 border border-slate-300">
                        <button
                          type="button"
                          onClick={() => setScope("in_house")}
                          className={`flex-1 py-2 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1.5 ${
                            scope === "in_house"
                              ? "bg-blue-600 text-white shadow-2xs"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          <Building2 className="w-3.5 h-3.5" />
                          <span>자사 제품 (사내 공장)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setScope("oem")}
                          className={`flex-1 py-2 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1.5 ${
                            scope === "oem"
                              ? "bg-purple-600 text-white shadow-2xs"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          <Factory className="w-3.5 h-3.5" />
                          <span>외주 제품 (OEM/ODM)</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        원인 세부분류
                      </label>
                      <select
                        value={subCategory}
                        onChange={(e) =>
                          handleSubCategoryChange(
                            e.target.value as "breakage" | "cap" | "spoilage" | "foreign" | "quantity" | "fill" | "packaging"
                          )
                        }
                        className="w-full text-xs sm:text-sm px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold text-slate-800"
                      >
                        {SUB_CATEGORY_OPTIONS.map((sub) => (
                          <option key={sub.value} value={sub.value}>
                            {sub.label} ({SUB_CATEGORY_CONFIG[sub.value]?.description})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Badge Theme */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-blue-600" />
                        <span>식별 배지 색상 테마</span>
                      </label>
                      <span className="text-[11px] text-slate-500">
                        원인 세부분류에 맞춰 색상이 자동 지정됩니다.
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                      {Object.entries(SUB_CATEGORY_CONFIG).map(([subKey, cfg]) => {
                        const isSelected = badgeColor === cfg.badgeColor;
                        return (
                          <button
                            key={subKey}
                            type="button"
                            onClick={() => {
                              setBadgeColor(cfg.badgeColor);
                              setSubCategory(subKey as any);
                            }}
                            className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-semibold transition-all ${
                              isSelected
                                ? `${cfg.badgeColor} ring-2 ring-blue-600 shadow-2xs font-extrabold scale-[1.02]`
                                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-center gap-1.5">
                              <span className={`w-2 h-2 rounded-full ${cfg.dotColor} shrink-0`} />
                              <span className="font-bold">{cfg.label}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Category linkage */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        상용구 연계 카테고리
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      >
                        {CATEGORY_OPTIONS.map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        초기 등록 기반 데이터
                      </label>
                      <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
                        현재 작성 중인 <strong>[{currentReport.productInfo.productName || "보고서"}]</strong>의 데이터가 프리셋 템플릿으로 저장됩니다.
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      시나리오 및 원인 요약 설명
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="프리셋의 주요 결함 상황 및 원인 요약을 입력하세요."
                      className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed transition-all"
                    />
                  </div>

                  {/* Bottom Save & Cancel Bar */}
                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    {presets.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPresetId(presets[0].id);
                          setMode("view");
                        }}
                        className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                      >
                        등록 취소
                      </button>
                    ) : (
                      <div />
                    )}

                    <button
                      type="button"
                      onClick={handleSavePreset}
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-md transition-all"
                    >
                      <Check className="w-4 h-4" />
                      <span>새 프리셋 등록하기</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
