import React, { useState } from "react";
import { Copy, Check, X, Mail, FileText, Send, Building2, UserCheck, ShieldCheck } from "lucide-react";
import { ReportData } from "../types";
import { maskCustomerName } from "../utils/masking";

interface CsEmailModalProps {
  report: ReportData;
  isOpen: boolean;
  onClose: () => void;
}

export function CsEmailModal({ report, isOpen, onClose }: CsEmailModalProps) {
  // Mode: 'internal_comm' (식품품질경영팀 -> 커뮤니케이션팀) vs 'direct_consumer' (식품품질경영팀 -> 소비자)
  const [emailTarget, setEmailTarget] = useState<"internal_comm" | "direct_consumer">("internal_comm");
  const [includeHtmlFormat, setIncludeHtmlFormat] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const displayName = maskCustomerName(
    report.customerClaim.customerName || "고객",
    report.customerClaim.maskCustomerName
  );
  const receivedDate = report.customerClaim.receivedAt
    ? report.customerClaim.receivedAt.split("T")[0]
    : new Date().toISOString().split("T")[0];

  const cleanResearcher =
    report.researcherName && !report.researcherName.includes("박병철") && !report.researcherName.includes("커뮤니케이션")
      ? report.researcherName.startsWith("담당")
        ? report.researcherName
        : `담당 연구원 ${report.researcherName}`
      : "담당 연구원 김진영 대리";

  const analysisSummary =
    report.analysisResults.ftirAnalysis.summary ||
    report.analysisResults.visualInspection.sampleCondition ||
    report.rootCauseAndActions.rootCause ||
    "회수 현품 정밀 분석 결과 규격 이상 및 외관 성상 확인을 완료하였습니다.";

  const processSummary =
    report.lotHistory.retainedSampleCheck ||
    "동일 Lot 당사 공장 보관품 및 제조 공정 데이터 확인 결과 정상 관리되었음을 확인하였습니다.";

  // =========================================================================
  // 1. [기본] 커뮤니케이션팀 내부 보고용 메일 (식품품질경영팀 -> 커뮤니케이션팀)
  // =========================================================================
  const internalCommPlainText = `[클레임 원인조사 결과 회신 및 고객 응대 가이드]

수신: 커뮤니케이션팀 (고객소통 / CS 상담 담당자 앞)
발신: ${report.companyName} 식품품질경영팀 (${cleanResearcher})
제목: [조사결과 회신] ${report.productInfo.productName || "제품"} 클레임 원인조사 완료 및 고객 응대 가이드 (${displayName} 건)

커뮤니케이션팀 담당자님, 안녕하십니까.
${report.companyName} 식품품질경영팀 ${cleanResearcher}입니다.

접수 의뢰해 주신 [${report.productInfo.productName || "당사 제품"}] 건에 대하여 동일 Lot 제조 이력 점검 및 정밀 시험 분석을 완료하여 그 결과를 회신드립니다.
식품품질경영팀장이 최종 승인한 정식 원인조사 결과 보고서(공문서 PDF)를 첨부하오니, 고객 응대(유선/서면) 시 아래의 핵심 요약 및 고객 소통 가이드를 참고하여 주시기 바랍니다.

--------------------------------------------------
1. 클레임 인입 개요
• 고객명: ${displayName} (접수일자: ${receivedDate})
• 인입 채널: ${report.customerClaim.channel || "커뮤니케이션팀 접수"}
• 대상 제품: ${report.productInfo.productName || "제품명"}
• 유통기한 / Lot: ${report.productInfo.expiryDate || "YYYY-MM-DD"} / ${report.productInfo.lotNumber || "-"}

2. 식품품질경영팀 정밀 조사 결과 요약
• 현품 성상 및 시험: ${analysisSummary}
• 공장 보관 검체: ${processSummary}
• 원인 분석: ${report.rootCauseAndActions.rootCause || "분석 완료"}
• 안전성 평가: 유해 미생물 및 독성 물질 불검출 (인체 위해성 없음)

3. 커뮤니케이션팀 고객 소통 가이드 (상담 스크립트 포인트)
• [안심 안내]: 당사 공장 보관 검체 및 제조공정 전수 점검 결과 완제품 규격에 적합하며 인체에 무해함을 친절히 설명.
• [원인 설명]: ${report.rootCauseAndActions.rootCause || "유통 및 보관 환경 요인"}에 대한 과학적 조사 결과를 바탕으로 고객 눈높이에 맞추어 설명.
• [공식 보고서 전달]: 식품품질경영팀장이 최종 승인한 [정식 원인조사 보고서(PDF)]가 첨부되었음을 안내하고 고객 메일/문자로 전달.

4. 첨부 파일
• [첨부] ${report.productInfo.productName || "제품"}_원인조사보고서(식품품질경영팀).pdf

--------------------------------------------------
발신: ${report.companyName} 식품품질경영팀
${cleanResearcher} (문의: ${report.companyTel || "전화(031)8093-1813"})`;

  const internalCommHtmlText = `<div style="font-family: Arial, 'Noto Sans KR', sans-serif; line-height: 1.6; color: #1e293b; max-width: 650px; padding: 20px; border: 1px solid #cbd5e1; border-radius: 8px; background: #ffffff;">
  <div style="background-color: #0f172a; color: #ffffff; padding: 12px 16px; border-radius: 6px; margin-bottom: 16px;">
    <div style="font-size: 15px; font-weight: bold;">[조사결과 회신] ${report.productInfo.productName || "제품"} 원인조사 완료 및 고객 응대 가이드</div>
  </div>

  <table style="width: 100%; font-size: 13px; margin-bottom: 16px; border-collapse: collapse; background: #f8fafc; border-radius: 6px;">
    <tr><td style="padding: 6px 12px; width: 80px; font-weight: bold; color: #475569;">수 신</td><td style="padding: 6px 12px; font-weight: bold; color: #0f172a;">커뮤니케이션팀 (고객상담 / CS 담당자 앞)</td></tr>
    <tr><td style="padding: 6px 12px; font-weight: bold; color: #475569;">발 신</td><td style="padding: 6px 12px; color: #0f172a;"><strong>${report.companyName} 식품품질경영팀</strong> (${cleanResearcher})</td></tr>
    <tr><td style="padding: 6px 12px; font-weight: bold; color: #475569;">인입 고객</td><td style="padding: 6px 12px; color: #0f172a;">${displayName} 고객님 (접수일: ${receivedDate})</td></tr>
  </table>

  <p style="font-size: 13px; color: #334155;">
    커뮤니케이션팀 담당자님, 안녕하십니까.<br/>
    <strong>${report.companyName} 식품품질경영팀 ${cleanResearcher}</strong>입니다.<br/>
    접수 의뢰해 주신 <strong>[${report.productInfo.productName || "당사 제품"}]</strong> 클레임 건에 대하여 동일 Lot 제조 이력 점검 및 정밀 시험 분석을 완료하여 결과를 회신드립니다.<br/>
    식품품질경영팀장이 최종 승인한 <strong>[소비자용 정식 원인조사 결과 보고서(공문서 PDF)]</strong>를 첨부하오니, 고객 응대 시 아래의 요약 및 고객 소통 가이드를 참고하여 주시기 바랍니다.
  </p>

  <div style="margin: 16px 0; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; background: #f8fafc;">
    <h4 style="margin: 0 0 8px 0; font-size: 13px; color: #1e3a8a; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px;">
      1. 품질조사 결과 요약 (식품품질경영팀)
    </h4>
    <ul style="margin: 0; padding-left: 20px; font-size: 12px; color: #334155;">
      <li style="margin-bottom: 4px;"><strong>현품 분석 소견:</strong> ${analysisSummary}</li>
      <li style="margin-bottom: 4px;"><strong>공장 보관 검체:</strong> ${processSummary}</li>
      <li style="margin-bottom: 4px;"><strong>원인 판정:</strong> ${report.rootCauseAndActions.rootCause || "조사 완료"}</li>
      <li><strong>인체 위해성:</strong> 유해 미생물/독성 물질 불검출 (인체 무해 확인)</li>
    </ul>
  </div>

  <div style="margin: 16px 0; border: 1px solid #bfdbfe; border-radius: 6px; padding: 12px; background: #eff6ff;">
    <h4 style="margin: 0 0 8px 0; font-size: 13px; color: #1d4ed8;">
      2. 📢 커뮤니케이션팀 고객 소통 가이드 (상담 포인트)
    </h4>
    <p style="margin: 0; font-size: 12px; line-height: 1.6; color: #1e40af;">
      • 고객 유선 상담 시 당사 공장 보관품 전수 검사 결과 이상이 없었으며 인체에 무해함을 안심 설명해 주시기 바랍니다.<br/>
      • 식품품질경영팀장이 승인한 정식 공문서 보고서(PDF)가 첨부되어 있으니 필요 시 고객 이메일로 발송해 주시기 바랍니다.
    </p>
  </div>

  <div style="font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 10px; margin-top: 16px;">
    <strong>첨부파일:</strong> ${report.productInfo.productName || "제품"}_원인조사보고서(식품품질경영팀).pdf<br/>
    발신: ${report.companyName} 식품품질경영팀 (문의: ${report.companyTel || "전화(031)8093-1813"})
  </div>
</div>`;

  // =========================================================================
  // 2. 소비자 직접 발송용 메일 (식품품질경영팀 -> 소비자)
  // =========================================================================
  const consumerPlainText = `수신: ${displayName} 고객님
발신: ${report.companyName} 식품품질경영팀
제목: [안내] ${report.productInfo.productName || "제품"} 관련 문의에 대한 식품품질경영팀 원인조사 결과 안내의 건

안녕하십니까, ${displayName} 고객님.
${report.companyName} 식품품질경영팀입니다.

항상 저희 제품을 애용해 주셔서 진심으로 감사드립니다.
고객님께서 문의해 주신 [${report.productInfo.productName || "당사 제품"}]에 대하여 당사 식품품질경영팀에서 제조 이력 점검 및 정밀 시험 분석을 실시하였으며, 식품품질경영팀장이 최종 승인한 조사 결과를 아래와 같이 정중히 안내해 드립니다.

--------------------------------------------------
[대상 제품 정보]
• 제품명: ${report.productInfo.productName || "-"}
• 유통기한/제조번호: ${report.productInfo.expiryDate || "-"} / ${report.productInfo.lotNumber || "-"}

[원인조사 핵심 요약]
1. 현품 정밀 분석: ${analysisSummary}
2. 공장 보관 검체: ${processSummary}
3. 원인 분석 종합: ${report.rootCauseAndActions.rootCause || "조사 완료"}

[소비자 안내 및 사과문]
${report.conclusion.apologyText || "저희 제품으로 인해 불편을 겪으신 고객님께 진심으로 사과의 말씀을 드리며, 더욱 철저한 품질관리로 보답하겠습니다."}

* 상세한 과학적 시험 내용과 검증 데이터는 첨부된 [원인조사 결과 보고서(공문서 PDF)]를 확인해 주시기 바랍니다.

감사합니다.

--------------------------------------------------
${report.companyName} 식품품질경영팀
${cleanResearcher} (문의: ${report.companyTel || "전화(031)8093-1813"})`;

  const consumerHtmlText = `<div style="font-family: Arial, 'Noto Sans KR', sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
  <div style="background-color: #f8fafc; border-left: 4px solid #dc2626; padding: 12px 16px; margin-bottom: 16px;">
    <div style="font-size: 12px; color: #64748b;"><strong>수신:</strong> ${displayName} 고객님</div>
    <div style="font-size: 15px; font-weight: bold; color: #0f172a; margin-top: 4px;">[안내] ${report.productInfo.productName || "제품"} 원인조사 결과 안내의 건</div>
  </div>
  <p style="font-size: 13px;">안녕하십니까, <strong>${displayName}</strong> 고객님.<br/><strong>${report.companyName} 식품품질경영팀</strong>입니다.</p>
  <p style="font-size: 13px;">고객님께서 문의해 주신 사항에 대하여 식품품질경영팀에서 정밀 분석 및 공장 보관품 점검을 실시하였으며, 식품품질경영팀장이 최종 승인한 조사 결과를 아래와 같이 안내해 드립니다.</p>
  <div style="background: #f1f5f9; padding: 12px; border-radius: 6px; font-size: 12px; margin: 14px 0;">
    <strong>[조사 결과 요약]</strong><br/>
    • 현품 분석: ${analysisSummary}<br/>
    • 보관 검체: ${processSummary}
  </div>
  <div style="background: #fef2f2; border-left: 3px solid #ef4444; padding: 12px; font-size: 12px; color: #991b1b; margin-top: 14px;">
    ${report.conclusion.apologyText}
  </div>
  <p style="font-size: 12px; color: #64748b; margin-top: 16px;">* 상세 공문서 보고서는 첨부된 PDF 파일을 참고해 주시기 바랍니다.</p>
  <div style="font-size: 12px; color: #94a3b8; margin-top: 16px; text-align: right;">
    발신: ${report.companyName} 식품품질경영팀 (${cleanResearcher})
  </div>
</div>`;

  const currentPlainText = emailTarget === "internal_comm" ? internalCommPlainText : consumerPlainText;
  const currentHtmlText = emailTarget === "internal_comm" ? internalCommHtmlText : consumerHtmlText;

  const handleCopy = async () => {
    const textToCopy = includeHtmlFormat ? currentHtmlText : currentPlainText;
    try {
      if (includeHtmlFormat && navigator.clipboard && window.ClipboardItem) {
        const blobHtml = new Blob([currentHtmlText], { type: "text/html" });
        const blobText = new Blob([currentPlainText], { type: "text/plain" });
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": blobHtml,
            "text/plain": blobText,
          }),
        ]);
      } else {
        await navigator.clipboard.writeText(textToCopy);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Clipboard copy failed", e);
      await navigator.clipboard.writeText(currentPlainText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-400/30">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  이메일 회신문 생성 및 복사
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  발신: 식품품질경영팀
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                클레임 조사결과 회신 및 안내 메일 서식입니다.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target Selector Tabs */}
        <div className="px-6 pt-3 pb-2 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5 bg-slate-200/80 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setEmailTarget("internal_comm")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                emailTarget === "internal_comm"
                  ? "bg-white text-blue-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span>커뮤니케이션팀 회신</span>
            </button>
            <button
              type="button"
              onClick={() => setEmailTarget("direct_consumer")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                emailTarget === "direct_consumer"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-slate-600" />
              <span>소비자 안내</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setIncludeHtmlFormat(false)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                !includeHtmlFormat
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              텍스트 (Text)
            </button>
            <button
              type="button"
              onClick={() => setIncludeHtmlFormat(true)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                includeHtmlFormat
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              HTML 서식 코드
            </button>
          </div>
        </div>

        {/* Modal Body: Preview */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-100/50">
          <div className="mb-2 text-[11px] text-slate-500 flex items-center justify-between">
            <span className="font-semibold text-slate-700">
              {emailTarget === "internal_comm"
                ? "커뮤니케이션팀 회신 메일 내용"
                : "소비자 안내 메일 내용"}
            </span>
            <span>그룹웨어 및 메일 프로그램에서 즉시 붙여넣기 가능</span>
          </div>

          <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs leading-relaxed overflow-x-auto max-h-96 font-mono whitespace-pre-wrap selection:bg-blue-600 border border-slate-800 shadow-inner">
            {includeHtmlFormat ? currentHtmlText : currentPlainText}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            {copied ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <Check className="w-4 h-4 text-emerald-600" />
                클립보드에 복사 완료! 그룹웨어 메일창에서 Ctrl+V 하세요.
              </span>
            ) : (
              "버튼을 누르면 서식/텍스트가 클립보드에 복사됩니다."
            )}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              닫기
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all active:scale-95"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "복사 완료!" : "메일 내용 전체 복사"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
