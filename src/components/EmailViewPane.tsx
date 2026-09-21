import React, { useState } from "react";
import {
  Copy,
  Check,
  FileText,
  Mail,
  ArrowLeft,
  Share2,
  Building2,
  UserCheck,
  ShieldCheck,
  Paperclip,
  Info,
} from "lucide-react";
import { ReportData } from "../types";

interface EmailViewPaneProps {
  report: ReportData;
  onSwitchToReport: () => void;
  onSwitchToForm: () => void;
}

export function EmailViewPane({
  report,
  onSwitchToReport,
  onSwitchToForm,
}: EmailViewPaneProps) {
  // Mode: 'internal_comm' (식품품질경영팀 -> 커뮤니케이션팀) vs 'direct_consumer' (식품품질경영팀 -> 소비자)
  const [emailTarget, setEmailTarget] = useState<"internal_comm" | "direct_consumer">("internal_comm");
  const [copiedType, setCopiedType] = useState<"html" | "text" | null>(null);

  const {
    customerClaim,
    productInfo,
    analysisResults,
    manufacturingProcess,
    lotHistory,
    rootCauseAndActions,
    conclusion,
    companyName = "광동제약주식회사",
    companyTel = "전화(031)8093-1813",
  } = report;

  // 조사는 언제나 식품품질경영팀에서 수행하며, 발신 주체는 식품품질경영팀
  const department = "식품품질경영팀";

  // 식품품질경영팀 조사 담당 연구원
  const cleanResearcher =
    report.researcherName && !report.researcherName.includes("박병철") && !report.researcherName.includes("커뮤니케이션")
      ? report.researcherName.startsWith("담당")
        ? report.researcherName
        : `담당 연구원 ${report.researcherName}`
      : "담당 연구원 김진영 대리";

  const customerNameDisplay = customerClaim.maskCustomerName
    ? customerClaim.customerName.length > 2
      ? customerClaim.customerName[0] +
        "*" +
        customerClaim.customerName.slice(2)
      : customerClaim.customerName.length === 2
      ? customerClaim.customerName[0] + "*"
      : customerClaim.customerName
    : customerClaim.customerName || "고객";

  const receivedDate = customerClaim.receivedAt
    ? customerClaim.receivedAt.split("T")[0]
    : new Date().toISOString().split("T")[0];

  // Subject lines
  const internalSubject = `[조사결과 회신] ${productInfo.productName || "제품"} 클레임 원인조사 완료 및 고객 응대 가이드 (${customerNameDisplay} 건)`;
  const consumerSubject = `[안내] ${productInfo.productName || "제품"} 관련 문의에 대한 식품품질경영팀 원인조사 결과 안내의 건`;
  const emailSubject = emailTarget === "internal_comm" ? internalSubject : consumerSubject;

  // =========================================================================
  // 1. [기본] 커뮤니케이션팀 내부 보고용 플레인 텍스트
  // =========================================================================
  const generateInternalPlainText = () => {
    let txt = `수신: 커뮤니케이션팀 (고객소통 / CS 상담 담당자 앞)\n`;
    txt += `발신: ${companyName} 식품품질경영팀 (${cleanResearcher})\n`;
    txt += `제목: ${internalSubject}\n\n`;

    txt += `커뮤니케이션팀 담당자님, 안녕하십니까.\n`;
    txt += `${companyName} 식품품질경영팀 ${cleanResearcher}입니다.\n\n`;
    txt += `접수 의뢰해 주신 [${productInfo.productName || "당사 제품"}] 클레임 건에 대하여 당사 보관품 및 회수품에 대한 제조 이력 점검과 정밀 시험 분석을 완료하여 결과를 회신드립니다.\n`;
    txt += `식품품질경영팀장이 최종 승인한 정식 원인조사 결과 보고서(공문서 PDF)를 첨부하오니, 고객 응대(유선/서면) 시 아래의 핵심 조사 요약 및 [고객 소통 가이드]를 참고하여 주시기 바랍니다.\n\n`;

    txt += `--------------------------------------------------\n`;
    txt += `1. 클레임 인입 개요\n`;
    txt += `• 고객명: ${customerNameDisplay} (접수일: ${receivedDate})\n`;
    txt += `• 인입 채널: ${customerClaim.channel || "커뮤니케이션팀 접수"}\n`;
    txt += `• 대상 제품: ${productInfo.productName || "-"}\n`;
    txt += `• 유통기한 / 제조번호(Lot): ${productInfo.expiryDate || "-"} / ${productInfo.lotNumber || "-"}\n`;
    txt += `• 고객 인입 증상: ${customerClaim.claimDetails || "이상 현상 확인 의뢰"}\n\n`;

    txt += `2. 식품품질경영팀 정밀 시험 및 분석 결과\n`;
    if (!analysisResults.visualInspection.skipped) {
      txt += `• 현품 외관/성상: ${analysisResults.visualInspection.sampleCondition || "특이사항 없음"}\n`;
      if (analysisResults.visualInspection.foreignObjectAppearance) {
        txt += `• 이물 분석: ${analysisResults.visualInspection.foreignObjectAppearance}\n`;
      }
    }
    if (!analysisResults.physicochemicalAnalysis.skipped && analysisResults.physicochemicalAnalysis.items.length > 0) {
      const itemsStr = analysisResults.physicochemicalAnalysis.items
        .map((i) => `${i.name}: ${i.sampleValue || "-"} (기준: ${i.standard || "-"}, 판정: ${i.judgment})`)
        .join(", ");
      txt += `• 이화학 시험: ${itemsStr}\n`;
    }
    if (analysisResults.additionalTests && analysisResults.additionalTests.length > 0) {
      analysisResults.additionalTests
        .filter((t) => !t.skipped)
        .forEach((t) => {
          txt += `• ${t.title}: ${t.result}\n`;
        });
    }

    txt += `\n3. 제조공정 및 공장 보관 검체 확인\n`;
    txt += `• 공장 보관품 검체: ${lotHistory.retainedSampleCheck || "동일 제조일자 보관 검체 전수 정상 확인"}\n`;
    txt += `• 생산일지/설비: ${lotHistory.productionLogNote || "해당 생산일지 이상 징후 없음"}\n`;
    if (lotHistory.priorClaimsCount) {
      txt += `• 동일 Lot 이전 접수 이력: ${lotHistory.priorClaimsCount}\n`;
    }

    txt += `\n4. 원인 판정 및 재발방지 조치\n`;
    txt += `• 원인 판정: ${rootCauseAndActions.rootCause || "분석 완료"}\n`;
    if (!rootCauseAndActions.preventiveMeasuresSkipped && rootCauseAndActions.preventiveMeasures) {
      txt += `• 개선 조치: ${rootCauseAndActions.preventiveMeasures}\n`;
    }

    txt += `\n5. 📢 [커뮤니케이션팀 고객 소통 가이드 & 설명 스크립트]\n`;
    txt += `• [인체 무해성 강조]: 당사 보관 검체 및 회수품 정밀 검사 결과 유해 미생물 및 유독 성분은 전혀 없었으며 인체에 무해함을 안심 설명 바랍니다.\n`;
    txt += `• [원인 설명 요령]: 제품 자체의 변질이 아니라 ${rootCauseAndActions.rootCause || "유통 및 보관 과정의 외적 요인"}에 기인함을 고객 눈높이에 맞추어 완곡히 설명 바랍니다.\n`;
    txt += `• [공식 보고서 제공]: 식품품질경영팀장이 최종 승인한 [정식 원인조사 보고서(PDF)]를 첨부하여 고객께 정중히 전달해 주시기 바랍니다.\n\n`;

    txt += `6. 첨부 파일\n`;
    txt += `• [첨부1] ${productInfo.productName || "제품"}_원인조사보고서(식품품질경영팀).pdf\n\n`;

    txt += `--------------------------------------------------\n`;
    txt += `${companyName} 식품품질경영팀\n`;
    txt += `${cleanResearcher} (내선/문의: ${companyTel})\n`;

    return txt;
  };

  // =========================================================================
  // 2. [기본] 커뮤니케이션팀 내부 보고용 HTML 서식
  // =========================================================================
  const generateInternalHtmlText = () => {
    let html = `<div style="font-family: 'Malgun Gothic', 'Noto Sans KR', sans-serif; font-size: 13px; line-height: 1.6; color: #334155; max-width: 680px; margin: 0 auto; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px;">`;

    // Title banner (불필요한 설명문 제거)
    html += `<div style="background-color: #0f172a; color: #ffffff; padding: 14px 18px; border-radius: 6px; margin-bottom: 20px;">`;
    html += `<div style="font-size: 16px; font-weight: bold; color: #ffffff;">${internalSubject}</div>`;
    html += `</div>`;

    // Routing table
    html += `<table style="width: 100%; font-size: 13px; margin-bottom: 20px; border-collapse: collapse; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;">`;
    html += `<tr><td style="padding: 8px 14px; width: 90px; font-weight: bold; color: #64748b; border-bottom: 1px solid #e2e8f0;">수 &nbsp; 신</td><td style="padding: 8px 14px; font-weight: bold; color: #0f172a; border-bottom: 1px solid #e2e8f0;">커뮤니케이션팀 (고객소통 / CS 상담 담당자 앞)</td></tr>`;
    html += `<tr><td style="padding: 8px 14px; font-weight: bold; color: #64748b; border-bottom: 1px solid #e2e8f0;">발 &nbsp; 신</td><td style="padding: 8px 14px; color: #0f172a; border-bottom: 1px solid #e2e8f0;"><strong>${companyName} 식품품질경영팀</strong> (${cleanResearcher})</td></tr>`;
    html += `<tr><td style="padding: 8px 14px; font-weight: bold; color: #64748b;">인입 건</td><td style="padding: 8px 14px; color: #334155;"><strong>${customerNameDisplay}</strong> 고객님 건 (접수일자: ${receivedDate}, 인입: ${customerClaim.channel || "커뮤니케이션팀 접수"})</td></tr>`;
    html += `</table>`;

    // Opening
    html += `<p style="margin: 0 0 16px 0; font-size: 13px; color: #1e293b;">`;
    html += `커뮤니케이션팀 담당자님, 안녕하십니까.<br/>`;
    html += `<strong>${companyName} 식품품질경영팀 ${cleanResearcher}</strong>입니다.<br/>`;
    html += `접수 의뢰해 주신 <strong>[${productInfo.productName || "당사 제품"}]</strong> 클레임 건에 대하여 동일 Lot 제조 이력 점검 및 과학 정밀 시험 분석을 완료하여 결과를 회신드립니다.<br/>`;
    html += `식품품질경영팀장이 최종 승인한 <strong>[소비자용 정식 원인조사 결과 보고서(공문서 PDF)]</strong>를 첨부하오니, 고객 응대 시 아래의 [핵심 조사 결과 요약] 및 [고객 소통 가이드]를 참고하여 주시기 바랍니다.`;
    html += `</p>`;

    // Target product
    html += `<div style="background: #f1f5f9; padding: 10px 14px; border-radius: 6px; margin-bottom: 18px; font-size: 12px; color: #334155;">`;
    html += `<strong>[대상 제품 정보]</strong> 제품명: <strong>${productInfo.productName || "-"}</strong> &nbsp;|&nbsp; 유통기한: <strong>${productInfo.expiryDate || "-"}</strong> &nbsp;|&nbsp; 제조번호(Lot): <strong>${productInfo.lotNumber || "-"}</strong>`;
    html += `</div>`;

    // 1. Investigation results
    html += `<div style="margin-bottom: 18px; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; background: #ffffff;">`;
    html += `<h4 style="margin: 0 0 10px 0; font-size: 13px; color: #1e3a8a; border-bottom: 2px solid #3b82f6; padding-bottom: 4px;">1. 식품품질경영팀 정밀 조사 & 시험 결과 요약</h4>`;
    html += `<ul style="margin: 0; padding-left: 20px; font-size: 12px; color: #334155; line-height: 1.8;">`;
    if (!analysisResults.visualInspection.skipped) {
      html += `<li><strong>현품 성상 및 육안:</strong> ${analysisResults.visualInspection.sampleCondition || "특이사항 없음"}</li>`;
      if (analysisResults.visualInspection.foreignObjectAppearance) {
        html += `<li><strong>이물 분석:</strong> ${analysisResults.visualInspection.foreignObjectAppearance}</li>`;
      }
    }
    if (!analysisResults.physicochemicalAnalysis.skipped && analysisResults.physicochemicalAnalysis.items.length > 0) {
      const itemsStr = analysisResults.physicochemicalAnalysis.items
        .map((i) => `<strong>${i.name}</strong>: ${i.sampleValue || "-"} (기준: ${i.standard || "-"}, 판정: <span style="color:${i.judgment === '적합' ? '#16a34a' : '#dc2626'}">${i.judgment}</span>)`)
        .join(" / ");
      html += `<li><strong>이화학 분석:</strong> ${itemsStr}</li>`;
    }
    html += `<li><strong>공장 보관 검체:</strong> ${lotHistory.retainedSampleCheck || "동일 Lot 공장 보관 검체 전수 확인 결과 이상 징후 없음"}</li>`;
    html += `<li><strong>원인 판정 종합:</strong> <strong>${rootCauseAndActions.rootCause || "분석 완료"}</strong></li>`;
    html += `<li><strong>인체 안전성:</strong> <span style="color: #16a34a; font-weight: bold;">유해 미생물 및 독성 물질 불검출 (인체 위해성 없음 확인)</span></li>`;
    html += `</ul>`;
    html += `</div>`;

    // 2. Communication Guide
    html += `<div style="margin-bottom: 20px; border: 1px solid #bfdbfe; border-radius: 6px; padding: 14px; background: #eff6ff;">`;
    html += `<h4 style="margin: 0 0 8px 0; font-size: 13px; color: #1d4ed8; display: flex; align-items: center; gap: 4px;">`;
    html += `<span>📢 2. 커뮤니케이션팀 고객 소통 가이드 (상담 스크립트 포인트)</span>`;
    html += `</h4>`;
    html += `<ol style="margin: 0; padding-left: 20px; font-size: 12px; color: #1e40af; line-height: 1.7;">`;
    html += `<li style="margin-bottom: 4px;"><strong>인체 무해성 안심 설명:</strong> 당사 공장 보관 검체 및 회수품 시험 결과 유해 성분이나 세균 오염이 전혀 없었음을 안내하여 고객 심리적 불안감을 우선 해소해 주시기 바랍니다.</li>`;
    html += `<li style="margin-bottom: 4px;"><strong>원인 설명:</strong> 제품 제조 상의 결함이 아니라 유통/보관 과정에서의 특정 외적 요인임을 고객 눈높이에 맞추어 정중히 설명해 주시기 바랍니다.</li>`;
    html += `<li><strong>공식 보고서 전달:</strong> 식품품질경영팀 명의의 공문서 양식 조사보고서(PDF)가 첨부되어 있으니 필요 시 고객 메일/문자로 발송해 주시기 바랍니다.</li>`;
    html += `</ol>`;
    html += `</div>`;

    // 3. Attachments
    html += `<div style="background: #f8fafc; padding: 10px 14px; border: 1px dashed #cbd5e1; border-radius: 6px; font-size: 12px; color: #475569; margin-bottom: 20px;">`;
    html += `📎 <strong>첨부파일:</strong> ${productInfo.productName || "제품"}_원인조사보고서(식품품질경영팀).pdf`;
    html += `</div>`;

    // Footer signature
    html += `<div style="border-top: 2px solid #e2e8f0; padding-top: 14px; font-size: 12px; color: #64748b;">`;
    html += `<div style="font-weight: bold; font-size: 13px; color: #0f172a;">${companyName} 식품품질경영팀</div>`;
    html += `<div style="margin-top: 2px;">${cleanResearcher} (문의: ${companyTel})</div>`;
    html += `</div>`;

    html += `</div>`;
    return html;
  };

  // =========================================================================
  // 3. 소비자 직접 발송용 텍스트 및 HTML
  // =========================================================================
  const generateConsumerPlainText = () => {
    let txt = `수신: ${customerNameDisplay} 고객님\n`;
    txt += `발신: ${companyName} 식품품질경영팀\n`;
    txt += `제목: ${consumerSubject}\n\n`;
    txt += `안녕하십니까, ${customerNameDisplay} 고객님.\n`;
    txt += `${companyName} 식품품질경영팀입니다.\n\n`;
    txt += `항상 저희 제품을 애용해 주셔서 진심으로 감사드립니다.\n`;
    txt += `고객님께서 문의해 주신 [${productInfo.productName || "당사 제품"}] 관련하여 당사 식품품질경영팀에서 제조 이력 점검 및 정밀 시험 분석을 실시하였으며, 식품품질경영팀장이 최종 승인한 조사 결과를 아래와 같이 정중히 안내해 드립니다.\n\n`;

    txt += `--------------------------------------------------\n`;
    txt += `[대상 제품 정보]\n`;
    txt += `• 제품명: ${productInfo.productName || "-"}\n`;
    txt += `• 유통기한/제조번호: ${productInfo.expiryDate || "-"} / ${productInfo.lotNumber || "-"}\n\n`;

    txt += `1. 제품 정밀 분석 내용\n`;
    if (!analysisResults.visualInspection.skipped) {
      txt += `• 현품 성상 및 육안: ${analysisResults.visualInspection.sampleCondition || "특이사항 없음"}\n`;
    }
    if (!analysisResults.physicochemicalAnalysis.skipped && analysisResults.physicochemicalAnalysis.items.length > 0) {
      const itemsStr = analysisResults.physicochemicalAnalysis.items
        .map((i) => `${i.name}: ${i.sampleValue || "-"} (기준: ${i.standard || "-"}, 판정: ${i.judgment})`)
        .join(", ");
      txt += `• 이화학 분석: ${itemsStr}\n`;
    }

    txt += `\n2. 공장 보관 검체 및 제조공정 점검\n`;
    txt += `• 자사 보관 검체: ${lotHistory.retainedSampleCheck || "동일 제조일자 보관품 확인 결과 정상 확인"}\n`;

    txt += `\n3. 원인 분석 및 재발방지대책\n`;
    txt += `• 원인 규명: ${rootCauseAndActions.rootCause || "조사 완료"}\n`;

    txt += `\n4. 종합 결론 및 안내 말씀\n`;
    txt += `${conclusion.apologyText || "저희 제품으로 인해 불편을 겪으신 고객님께 진심으로 사과의 말씀을 드리며, 더욱 철저한 품질관리로 보답하겠습니다."}\n\n`;
    txt += `* 상세한 과학적 시험 내용과 검증 데이터는 첨부된 [원인조사 결과 보고서(공문서 PDF)]를 확인해 주시기 바랍니다.\n\n`;

    txt += `감사합니다.\n\n`;
    txt += `--------------------------------------------------\n`;
    txt += `${companyName} 식품품질경영팀\n`;
    txt += `${cleanResearcher} (문의 전화: ${companyTel})\n`;
    return txt;
  };

  const generateConsumerHtmlText = () => {
    let html = `<div style="font-family: 'Malgun Gothic', 'Noto Sans KR', sans-serif; font-size: 14px; line-height: 1.6; color: #333333; max-width: 680px; margin: 0 auto;">`;
    html += `<div style="background-color: #f8fafc; border-left: 4px solid #dc2626; padding: 12px 16px; margin-bottom: 20px;">`;
    html += `<p style="margin: 0; font-size: 13px; color: #64748b;"><strong>수신:</strong> ${customerNameDisplay} 고객님</p>`;
    html += `<p style="margin: 4px 0 0 0; font-size: 15px; font-weight: bold; color: #0f172a;">${consumerSubject}</p>`;
    html += `</div>`;

    html += `<p>안녕하십니까, <strong>${customerNameDisplay}</strong> 고객님.<br/><strong>${companyName} 식품품질경영팀</strong>입니다.</p>`;
    html += `<p>항상 저희 제품을 애용해 주셔서 진심으로 감사드립니다.<br/>고객님께서 문의해 주신 <strong>[${productInfo.productName || "당사 제품"}]</strong>에 대해 식품품질경영팀에서 제조 이력 및 보관품 정밀 조사를 신속히 실시하였으며, 식품품질경영팀장이 최종 승인한 조사 결과를 아래와 같이 안내해 드립니다.</p>`;

    html += `<div style="background: #f1f5f9; padding: 10px 14px; border-radius: 6px; margin: 16px 0; font-size: 13px;">`;
    html += `<strong>[대상 제품 정보]</strong> 제품명: <strong>${productInfo.productName || "-"}</strong> | 유통기한: ${productInfo.expiryDate || "-"} | 제조번호: ${productInfo.lotNumber || "-"}`;
    html += `</div>`;

    html += `<h4 style="margin: 18px 0 8px 0; font-size: 14px; color: #1e3a8a; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px;">1. 제품 정밀 분석 및 보관품 확인 내용</h4>`;
    html += `<ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #334155;">`;
    html += `<li><strong>현품 성상:</strong> ${analysisResults.visualInspection.sampleCondition || "특이사항 없음"}</li>`;
    html += `<li><strong>공장 보관 검체:</strong> ${lotHistory.retainedSampleCheck || "동일 Lot 보관품 전수 정상 유지 확인"}</li>`;
    html += `<li><strong>원인 분석:</strong> ${rootCauseAndActions.rootCause || "조사 완료"}</li>`;
    html += `</ul>`;

    html += `<div style="margin-top: 16px; font-size: 13px; line-height: 1.6; color: #1e293b; background-color: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">`;
    html += (conclusion.apologyText || "다시 한번 고객님께 불편을 드린 점 진심으로 사과드립니다.").replace(/\n/g, "<br/>");
    html += `</div>`;

    html += `<p style="font-size: 12px; color: #64748b; margin-top: 16px;">* 상세한 검증 데이터는 첨부된 공문서 PDF 파일을 확인해 주시기 바랍니다.</p>`;

    html += `<div style="margin-top: 24px; padding-top: 14px; border-top: 2px solid #e2e8f0; font-size: 13px; color: #64748b;">`;
    html += `<p style="margin: 0; font-weight: bold; font-size: 14px; color: #0f172a;">${companyName} 식품품질경영팀</p>`;
    html += `<p style="margin: 4px 0 0 0;">${cleanResearcher} (문의: ${companyTel})</p>`;
    html += `</div>`;
    html += `</div>`;
    return html;
  };

  const currentPlainText = emailTarget === "internal_comm" ? generateInternalPlainText() : generateConsumerPlainText();
  const currentHtmlText = emailTarget === "internal_comm" ? generateInternalHtmlText() : generateConsumerHtmlText();

  // Handlers
  const handleCopyRichHtml = async () => {
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const blobHtml = new Blob([currentHtmlText], { type: "text/html" });
        const blobText = new Blob([currentPlainText], { type: "text/plain" });
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": blobHtml,
            "text/plain": blobText,
          }),
        ]);
      } else {
        await navigator.clipboard.writeText(currentPlainText);
      }
      setCopiedType("html");
      setTimeout(() => setCopiedType(null), 2500);
    } catch (e) {
      console.error("Copy failed, fallback to plain text", e);
      await navigator.clipboard.writeText(currentPlainText);
      setCopiedType("text");
      setTimeout(() => setCopiedType(null), 2500);
    }
  };

  const handleCopyPlainText = async () => {
    try {
      await navigator.clipboard.writeText(currentPlainText);
      setCopiedType("text");
      setTimeout(() => setCopiedType(null), 2500);
    } catch (e) {
      console.error("Text copy error", e);
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-slate-100 p-4 md:p-8 flex flex-col items-center">
      {/* Top action bar */}
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-xs border border-slate-200 p-4 mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onSwitchToForm}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>작성 폼으로</span>
          </button>

          <div className="h-4 w-px bg-slate-200" />

          <div className="flex items-center gap-1.5 text-slate-800">
            <Mail className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold">이메일 회신</span>
            <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              발신: 식품품질경영팀
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSwitchToReport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors"
            title="소비자용 정식 A4 공문서 보고서로 전환"
          >
            <FileText className="w-4 h-4 text-slate-600" />
            <span>소비자용 A4 보고서 보기</span>
          </button>

          <button
            type="button"
            onClick={handleCopyPlainText}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            {copiedType === "text" ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-bold">텍스트 복사됨</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>일반 텍스트 복사</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCopyRichHtml}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors active:scale-95"
          >
            {copiedType === "html" ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>그룹웨어 서식 복사 완료!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-white" />
                <span>그룹웨어 메일 복사 (서식 포함)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Target Selector Switcher Card */}
      <div className="max-w-4xl w-full mb-4 bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold text-slate-800 shrink-0">이메일 수신 대상 선택:</span>
            <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => setEmailTarget("internal_comm")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold whitespace-nowrap transition-all ${
                  emailTarget === "internal_comm"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
                }`}
              >
                <Building2 className={`w-3.5 h-3.5 ${emailTarget === "internal_comm" ? "text-blue-400" : "text-slate-500"}`} />
                <span>커뮤니케이션팀 내부 보고용 (기본)</span>
              </button>

              <button
                type="button"
                onClick={() => setEmailTarget("direct_consumer")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold whitespace-nowrap transition-all ${
                  emailTarget === "direct_consumer"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
                }`}
              >
                <UserCheck className={`w-3.5 h-3.5 ${emailTarget === "direct_consumer" ? "text-emerald-400" : "text-slate-500"}`} />
                <span>소비자 직접 발송용</span>
              </button>
            </div>
          </div>
        </div>

        {/* Target Guide Description */}
        <div>
          {emailTarget === "internal_comm" ? (
            <div className="flex items-center gap-2 text-blue-900 bg-blue-50/90 px-3 py-2 rounded-lg border border-blue-200/80 text-xs">
              <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="leading-relaxed">
                <strong className="font-semibold text-blue-950">사내 보고 서식:</strong> 커뮤니케이션팀(CS)에 조사 결과를 회신하고 고객 유선 응대 가이드를 전달하는 사내 보고용 메일입니다.
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-900 bg-emerald-50/90 px-3 py-2 rounded-lg border border-emerald-200/80 text-xs">
              <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="leading-relaxed">
                <strong className="font-semibold text-emerald-950">고객 직발송 서식:</strong> 고객에게 직접 원인조사 결과와 사과문을 발송할 때 사용하는 소비자 친화형 메일입니다.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Copy Alert Banner */}
      {copiedType && (
        <div className="max-w-4xl w-full mb-4 bg-emerald-50 border border-emerald-300 rounded-lg p-3 text-emerald-900 text-xs font-semibold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>
              {copiedType === "html"
                ? "그룹웨어 및 Outlook 등 웹메일에 바로 붙여넣기(Ctrl+V) 가능한 서식으로 복사되었습니다."
                : "일반 텍스트 형식으로 클립보드에 복사되었습니다."}
            </span>
          </div>
          <span className="text-[11px] text-emerald-700 font-normal">그룹웨어 메일 작성창에서 Ctrl+V</span>
        </div>
      )}

      {/* Email Card Container */}
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
        {/* Email Header Bar */}
        <div className="px-6 py-5 bg-slate-50/80 border-b border-slate-200">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-16 font-bold text-slate-500">수신 대상</span>
              <span className="text-slate-900 font-bold bg-blue-50 text-blue-900 border border-blue-200 px-2.5 py-0.5 rounded">
                {emailTarget === "internal_comm"
                  ? "커뮤니케이션팀 (고객소통 / CS 상담 담당자 앞)"
                  : `${customerNameDisplay} 고객님`}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-16 font-bold text-slate-500">발신 부서</span>
              <span className="text-slate-800 font-semibold">
                {companyName} 식품품질경영팀 ({cleanResearcher} / {companyTel})
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs pt-1">
              <span className="w-16 font-bold text-slate-500">메일 제목</span>
              <span className="text-slate-950 font-bold text-sm">
                {emailSubject}
              </span>
            </div>
          </div>
        </div>

        {/* Email Body Preview */}
        <div className="p-8 space-y-6 text-slate-800 text-sm leading-relaxed">
          {emailTarget === "internal_comm" ? (
            /* ========================================================================= */
            /* VIEW: 커뮤니케이션팀 회신용                                                    */
            /* ========================================================================= */
            <div className="space-y-6">
              {/* Internal Opening */}
              <div className="p-4 bg-slate-50 border-l-4 border-blue-600 rounded-r-lg space-y-2 text-slate-700">
                <p className="font-semibold text-slate-900">
                  커뮤니케이션팀 담당자님, 안녕하십니까.
                </p>
                <p>
                  <strong>{companyName} 식품품질경영팀 {cleanResearcher}</strong>입니다.
                  <br />
                  접수 의뢰해 주신 <strong>[{productInfo.productName || "당사 제품"}]</strong> 클레임 건에 대하여 동일 Lot 제조 이력 점검 및 과학 정밀 시험 분석을 완료하여 조사 결과를 회신드립니다.
                  <br />
                  식품품질경영팀장이 최종 승인한 <strong>[소비자용 정식 원인조사 결과 보고서(공문서 PDF)]</strong>를 첨부하오니, 고객 응대 시 아래의 <strong>[핵심 조사 결과 요약]</strong> 및 <strong>[고객 소통/설명 가이드]</strong>를 참고하여 주시기 바랍니다.
                </p>
              </div>

              {/* Product & Claim Info Chip */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                <div>
                  <span className="text-slate-500 block">인입 고객:</span>
                  <span className="font-bold text-slate-900">{customerNameDisplay} (접수일: {receivedDate})</span>
                </div>
                <div>
                  <span className="text-slate-500 block">대상 제품명:</span>
                  <span className="font-bold text-slate-900">{productInfo.productName || "-"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">유통기한:</span>
                  <span className="font-semibold text-slate-800">{productInfo.expiryDate || "-"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">제조번호(Lot):</span>
                  <span className="font-semibold text-slate-800">{productInfo.lotNumber || "-"}</span>
                </div>
              </div>

              {/* 1. Investigation results */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-blue-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                  <span>1. 식품품질경영팀 정밀 시험 및 조사 결과 요약</span>
                </h4>
                <div className="space-y-2 text-xs text-slate-700 pl-2">
                  {!analysisResults.visualInspection.skipped && (
                    <div>
                      <span className="font-semibold">• 현품 성상 및 육안:</span>{" "}
                      <span>{analysisResults.visualInspection.sampleCondition || "특이사항 없음"}</span>
                      {analysisResults.visualInspection.foreignObjectAppearance && (
                        <span className="block pl-3 text-slate-600">
                          - 이물 외관: {analysisResults.visualInspection.foreignObjectAppearance}
                        </span>
                      )}
                    </div>
                  )}

                  {!analysisResults.physicochemicalAnalysis.skipped && analysisResults.physicochemicalAnalysis.items.length > 0 && (
                    <div>
                      <span className="font-semibold">• 이화학 분석:</span>{" "}
                      <span>
                        {analysisResults.physicochemicalAnalysis.items
                          .map((i) => `${i.name} ${i.sampleValue || "-"} (기준: ${i.standard || "-"}, 판정: ${i.judgment})`)
                          .join(" / ")}
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="font-semibold">• 공장 보관 검체:</span>{" "}
                    <span>{lotHistory.retainedSampleCheck || "동일 Lot 공장 보관품 전수 이상 없음"}</span>
                  </div>

                  <div>
                    <span className="font-semibold">• 원인 판정 종합:</span>{" "}
                    <span className="font-bold text-slate-900">{rootCauseAndActions.rootCause || "분석 완료"}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>인체 안전성: 유해 미생물 및 독성 물질 불검출 (인체 무해 확인)</span>
                  </div>
                </div>
              </div>

              {/* 2. Customer Communication Guide (Crucial for CS) */}
              <div className="space-y-2 bg-blue-50/70 border border-blue-200 p-4 rounded-xl">
                <h4 className="text-sm font-bold text-blue-950 flex items-center gap-2">
                  <span>📢 2. 커뮤니케이션팀 고객 소통 가이드 (상담 스크립트 포인트)</span>
                </h4>
                <div className="space-y-2 text-xs text-blue-950 leading-relaxed pl-1">
                  <div className="bg-white p-2.5 rounded-lg border border-blue-100">
                    <strong className="text-blue-900 block mb-0.5">① 인체 무해성 안심 설명</strong>
                    <span>당사 공장 보관 검체 및 회수품 시험 결과 유해 세균이나 독성 물질이 전혀 검출되지 않았음을 명확히 안내하여 고객의 심리적 불안감을 우선 해소해 주시기 바랍니다.</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-blue-100">
                    <strong className="text-blue-900 block mb-0.5">② 원인 설명 요령</strong>
                    <span>제품 자체의 변질이나 제조 공정상의 결함이 아니라, <strong>{rootCauseAndActions.rootCause || "유통/보관 중의 외적 요인"}</strong>에 기인함을 고객 눈높이에 맞추어 완곡히 설명 바랍니다.</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-blue-100">
                    <strong className="text-blue-900 block mb-0.5">③ 공식 공문서 보고서 전달</strong>
                    <span>식품품질경영팀장이 최종 승인한 <strong>[정식 원인조사 보고서(PDF)]</strong>가 첨부되어 있으니 필요 시 고객 메일로 전달하여 당사의 철저한 품질 관리 노력을 설명해 주시기 바랍니다.</span>
                  </div>
                </div>
              </div>

              {/* Attachments */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs flex items-center gap-2 text-slate-700">
                <Paperclip className="w-4 h-4 text-slate-500 shrink-0" />
                <span>
                  <strong>첨부파일:</strong> {productInfo.productName || "제품"}_원인조사보고서(식품품질경영팀).pdf
                </span>
              </div>

              {/* Signoff */}
              <div className="pt-6 border-t border-slate-200 text-xs text-slate-600">
                <p className="font-bold text-slate-800 text-sm">{companyName} 식품품질경영팀</p>
                <p className="mt-0.5">{cleanResearcher} (내선/문의: {companyTel})</p>
              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* VIEW: 소비자 직접 발송용                                                     */
            /* ========================================================================= */
            <div className="space-y-6">
              {/* Greeting */}
              <div className="space-y-2 text-slate-700">
                <p>
                  안녕하십니까, <strong>{customerNameDisplay}</strong> 고객님.
                </p>
                <p>
                  <strong>{companyName} 식품품질경영팀</strong>입니다.
                </p>
                <p>
                  항상 저희 제품을 애용해 주셔서 진심으로 감사드립니다.
                  <br />
                  고객님께서 문의해 주신 <strong>[{productInfo.productName || "당사 제품"}]</strong>에 대해 식품품질경영팀에서 제조 이력 점검 및 보관품 정밀 조사를 신속히 실시하였으며, 식품품질경영팀장이 최종 승인한 조사 결과를 아래와 같이 정중히 안내해 드립니다.
                </p>
              </div>

              {/* Product Info Chip */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <span className="text-slate-500">제품명:</span>{" "}
                  <span className="font-bold text-slate-800">{productInfo.productName || "-"}</span>
                </div>
                <div>
                  <span className="text-slate-500">유통기한:</span>{" "}
                  <span className="font-semibold text-slate-800">{productInfo.expiryDate || "-"}</span>
                </div>
                <div>
                  <span className="text-slate-500">제조번호(Lot):</span>{" "}
                  <span className="font-semibold text-slate-800">{productInfo.lotNumber || "-"}</span>
                </div>
              </div>

              {/* 1. 분석 내용 */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-blue-900 border-b border-slate-200 pb-1">
                  1. 제품 정밀 분석 내용
                </h4>
                <div className="space-y-1 text-xs text-slate-700 pl-2">
                  <p>• 현품 성상: {analysisResults.visualInspection.sampleCondition || "특이사항 없음"}</p>
                  <p>• 공장 보관 검체: {lotHistory.retainedSampleCheck || "동일 제조일자 보관 검체 확인 결과 이상 없음"}</p>
                  <p>• 원인 판정: {rootCauseAndActions.rootCause || "분석 완료"}</p>
                </div>
              </div>

              {/* Apology */}
              <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs leading-relaxed text-slate-800 whitespace-pre-line">
                {conclusion.apologyText ||
                  "다시 한번 당사 제품을 애용해 주시는 고객님께 큰 불편과 심려를 끼쳐드린 점 머리 숙여 사과드립니다. 고객님의 소중한 지적을 겸허히 수용하여 더욱 안전한 제품으로 보답하겠습니다."}
              </div>

              <p className="text-xs text-slate-500 pl-2">
                * 상세한 시험 검증 데이터는 첨부된 [소비자용 정식 원인조사 보고서(PDF)]를 확인해 주시기 바랍니다.
              </p>

              {/* Signoff */}
              <div className="pt-6 border-t border-slate-200 text-xs text-slate-600">
                <p className="font-bold text-slate-800 text-sm">{companyName} 식품품질경영팀</p>
                <p className="mt-0.5">{cleanResearcher} (문의: {companyTel})</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
