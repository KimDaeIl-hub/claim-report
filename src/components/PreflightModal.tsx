import { CheckCircle2, AlertTriangle, X, Printer, ArrowRight, MinusCircle } from "lucide-react";
import { ReportData } from "../types";

interface PreflightModalProps {
  report: ReportData;
  isOpen: boolean;
  onClose: () => void;
  onProceedPrint: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

interface ChecklistItem {
  id: string;
  name: string;
  sectionKey: string;
  status: 'complete' | 'warning' | 'skipped';
  message: string;
}

export function PreflightModal({
  report,
  isOpen,
  onClose,
  onProceedPrint,
  onNavigateSection,
}: PreflightModalProps) {
  if (!isOpen) return null;

  // Evaluate items based on user criteria:
  // Note: SKIP items are NOT considered missing!
  const items: ChecklistItem[] = [
    // 1. 클레임 정보
    {
      id: "chk-claim",
      name: "클레임 정보 입력",
      sectionKey: "sec-claim",
      status:
        report.customerClaim.customerName &&
        report.customerClaim.receivedAt &&
        report.customerClaim.claimDetails
          ? "complete"
          : "warning",
      message:
        report.customerClaim.customerName && report.customerClaim.claimDetails
          ? "고객명, 접수일시, 클레임 인입 경위 정상 입력 완료"
          : "고객명 또는 클레임 세부 내용이 비어 있습니다.",
    },
    // 2. 제품 정보
    {
      id: "chk-product",
      name: "제품정보 입력",
      sectionKey: "sec-product",
      status:
        report.productInfo.productName &&
        report.productInfo.lotNumber &&
        report.productInfo.manufactureDate
          ? "complete"
          : "warning",
      message:
        report.productInfo.productName && report.productInfo.lotNumber
          ? "제품명, 제조번호(Lot), 제조일자, 소비기한 입력 완료"
          : "제품명 또는 제조번호(Lot No.)가 누락되었습니다.",
    },
    // 3. 현품 분석
    {
      id: "chk-visual",
      name: "현품 분석 완료",
      sectionKey: "sec-analysis",
      status: report.analysisResults.visualInspection.skipped
        ? "skipped"
        : report.analysisResults.visualInspection.sampleCondition ||
          report.analysisResults.visualInspection.foreignObjectAppearance
        ? "complete"
        : "warning",
      message: report.analysisResults.visualInspection.skipped
        ? "현품 확인 항목 (조사 SKIP 처리됨 - 정상)"
        : report.analysisResults.visualInspection.sampleCondition
        ? "현품 외관 성상 및 특이사항 분석 내용 입력 완료"
        : "현품 외관 성상 또는 이물 관찰 결과가 비어 있습니다.",
    },
    // 4. 정밀 과학 분석 (확대경/FT-IR/XRF/이화학/카탈라아제)
    {
      id: "chk-scientific",
      name: "정밀 과학 분석 (FT-IR / XRF / 이화학 등)",
      sectionKey: "sec-analysis",
      status: (() => {
        const ar = report.analysisResults;
        const allSkipped =
          ar.ftirAnalysis.skipped &&
          ar.xrfAnalysis.skipped &&
          ar.physicochemicalAnalysis.skipped &&
          ar.catalaseTest.skipped &&
          ar.magnifierInspection.skipped &&
          ar.opticalMicroscope.skipped;

        if (allSkipped) return "skipped";

        // Check if any non-skipped has content
        const hasFtIr = !ar.ftirAnalysis.skipped && !!ar.ftirAnalysis.summary;
        const hasXrf = !ar.xrfAnalysis.skipped && !!ar.xrfAnalysis.summary;
        const hasPc =
          !ar.physicochemicalAnalysis.skipped &&
          (ar.physicochemicalAnalysis.items.length > 0 || !!ar.physicochemicalAnalysis.summary);
        const hasCat = !ar.catalaseTest.skipped && !!ar.catalaseTest.resultJudgement;
        const hasMag = !ar.magnifierInspection.skipped && !!ar.magnifierInspection.result;
        const hasMicro = !ar.opticalMicroscope.skipped && !!ar.opticalMicroscope.result;

        if (hasFtIr || hasXrf || hasPc || hasCat || hasMag || hasMicro) {
          return "complete";
        }
        return "warning";
      })(),
      message: "정밀 분석 조사 항목 정상 기재 (미적용 항목은 자동 Skip 처리)",
    },
    // 5. 제조과정 분석
    {
      id: "chk-manufacturing",
      name: "제조과정 분석 완료",
      sectionKey: "sec-process",
      status: report.manufacturingProcess.skipped
        ? "skipped"
        : report.manufacturingProcess.processFlow &&
          (report.manufacturingProcess.filtrationAnalysis ||
            report.manufacturingProcess.criticalControlPoint)
        ? "complete"
        : "warning",
      message: report.manufacturingProcess.skipped
        ? "제조공정 분석 항목 (조사 SKIP 처리됨 - 정상)"
        : report.manufacturingProcess.processFlow
        ? "공정 흐름도 및 관리 포인트 연계 분석 작성 완료"
        : "제조공정 흐름도 또는 핵심 관리 분석 설명이 미흡합니다.",
    },
    // 6. 동일 Lot 보관품 조사
    {
      id: "chk-lot",
      name: "동일 Lot 보관품 조사",
      sectionKey: "sec-lot",
      status: report.lotHistory.skipped
        ? "skipped"
        : report.lotHistory.retainedSampleCheck &&
          report.lotHistory.productionLogNote
        ? "complete"
        : "warning",
      message: report.lotHistory.skipped
        ? "동일 Lot 조사 항목 (조사 SKIP 처리됨 - 정상)"
        : report.lotHistory.retainedSampleCheck
        ? "공장 보관 검체 확인 및 생산일지 특이사항 기록 완료"
        : "동일 Lot 보관품 확인 결과 또는 생산일지 내역이 미입력되었습니다.",
    },
    // 7. 결론 작성 완료
    {
      id: "chk-conclusion",
      name: "결론 작성 완료",
      sectionKey: "sec-conclusion",
      status:
        report.conclusion.summaryPoints.length > 0 &&
        report.conclusion.apologyText
          ? "complete"
          : "warning",
      message:
        report.conclusion.summaryPoints.length > 0
          ? "조사 핵심 요약(가, 나, 다) 및 고객 안심 사과문 구비"
          : "핵심 요약 항목 또는 고객 사과 문구가 비어 있습니다.",
    },
  ];

  const warningCount = items.filter((i) => i.status === "warning").length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <span>보고서 출력 전 최종 검토 (Pre-flight Inspection)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              공문서 규격에 맞게 필수 데이터가 누락 없이 기록되었는지 자동 검증합니다.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {warningCount > 0 ? (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-900">
                  확인이 필요한 항목이 {warningCount}건 있습니다.
                </h4>
                <p className="text-[11px] text-amber-700 mt-0.5">
                  누락된 항목이 있더라도 출력이 가능하지만, 정확한 공문서 작성을 위해 보완을 권장합니다. (단, SKIP 처리된 항목은 누락으로 간주되지 않습니다.)
                </p>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-emerald-900">
                  모든 필수 조사 항목이 완벽하게 준비되었습니다!
                </h4>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  규격화된 A4 공문서 규격 및 CS 회신문으로 즉시 출력/발송할 수 있습니다.
                </p>
              </div>
            </div>
          )}

          {/* Checklist rows */}
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden bg-white">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-3 flex items-start justify-between gap-3 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start gap-2.5">
                  {item.status === "complete" && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {item.status === "warning" && (
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  )}
                  {item.status === "skipped" && (
                    <MinusCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                      <span>{item.name}</span>
                      {item.status === "complete" && (
                        <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-semibold">
                          완료
                        </span>
                      )}
                      {item.status === "warning" && (
                        <span className="text-[10px] px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded font-semibold">
                          미입력 주의
                        </span>
                      )}
                      {item.status === "skipped" && (
                        <span className="text-[10px] px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded font-medium">
                          SKIP 처리됨 (정상)
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.message}</p>
                  </div>
                </div>

                {item.status === "warning" && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigateSection(item.sectionKey);
                    }}
                    className="shrink-0 text-[11px] font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-0.5 mt-0.5"
                  >
                    <span>작성하기</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
          >
            닫기 (계속 수정)
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onProceedPrint();
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>최종 A4 인쇄 / PDF 저장</span>
          </button>
        </div>
      </div>
    </div>
  );
}
