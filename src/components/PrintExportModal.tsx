import React, { useState } from "react";
import { Printer, ExternalLink, Download, X, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import { ReportData } from "../types";

interface PrintExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ReportData;
  onDirectPrint: () => void;
}

export function PrintExportModal({
  isOpen,
  onClose,
  report,
  onDirectPrint,
}: PrintExportModalProps) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const printUrl = `/?print=true&t=${Date.now()}`;

  const handleDownloadStandaloneHtml = () => {
    try {
      const printableElem = document.getElementById("printable-report");
      const reportHtml = printableElem ? printableElem.innerHTML : "";

      const fullHtml = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>${report.title || "광동제약 클레임 원인조사 보고서"} - 인쇄용</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 14mm 16mm 14mm;
    }
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", "Pretendard", sans-serif;
      background: #ffffff;
      color: #000000;
      margin: 0;
      padding: 20px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .no-print {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 20px;
      padding: 12px;
      background: #f1f5f9;
      border-radius: 8px;
    }
    .btn {
      padding: 8px 16px;
      font-size: 14px;
      font-weight: bold;
      border-radius: 6px;
      cursor: pointer;
      border: 1px solid #cbd5e1;
      background: #ffffff;
    }
    .btn-primary {
      background: #dc2626;
      color: #ffffff;
      border-color: #dc2626;
    }
    @media print {
      body { padding: 0; }
      .no-print { display: none !important; }
    }
  </style>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div class="no-print">
    <button class="btn btn-primary" onclick="window.print()">A4 인쇄 / PDF 저장 (Ctrl+P)</button>
    <button class="btn" onclick="window.close()">창 닫기</button>
  </div>
  <div style="max-width: 820px; margin: 0 auto; background: #ffffff;">
    ${reportHtml}
  </div>
  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>`;

      const blob = new Blob([fullHtml], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const safeDocNo = (report.docNumber || "C04").replace(/[^a-zA-Z0-9가-힣_-]/g, "_");
      a.href = url;
      a.download = `광동제약_품질보고서_${safeDocNo}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (e) {
      console.error("Failed to download standalone HTML", e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-red-600 text-white">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">A4 공문서 인쇄 및 PDF 저장</h3>
              <p className="text-xs text-slate-300">
                A4 규격 인쇄 및 PDF 다운로드 옵션 선택
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-slate-800">
          {/* Notice for iframe security */}
          <div className="flex items-start gap-3 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">
                미리보기 화면(iFrame) 인쇄 안내:
              </span>
              브라우저 보안 규칙에 따라 미리보기 창 내부에서는 인쇄 팝업 창이 직접 실행되지 않을 수 있습니다.
              아래 <strong>[새 탭에서 열어 인쇄 / PDF 저장]</strong>을 클릭하시면 브라우저 제한 없이 원클릭으로 A4 인쇄 창이 바로 실행됩니다.
            </div>
          </div>

          {/* Action 1: Open in new tab (Recommended) */}
          <a
            href={printUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center justify-between p-4 bg-red-50 hover:bg-red-100/80 border-2 border-red-500 rounded-xl transition-all shadow-sm group text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-lg bg-red-600 text-white group-hover:scale-105 transition-transform">
                <ExternalLink className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-red-950">
                    새 탭에서 열어 인쇄 / PDF 저장
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-red-600 text-white rounded-full">
                    강력 추천
                  </span>
                </div>
                <p className="text-xs text-red-800 mt-0.5">
                  새 브라우저 창에서 고화질 A4 규격 인쇄/PDF 저장 창이 자동 실행됩니다.
                </p>
              </div>
            </div>
          </a>

          {/* Action 2: Direct print in current window */}
          <button
            type="button"
            onClick={() => {
              onDirectPrint();
              onClose();
            }}
            className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-200 text-slate-700">
                <Printer className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  현재 화면에서 브라우저 인쇄 호출 (Ctrl + P)
                </span>
                <span className="text-[11px] text-slate-500">
                  현재 창에서 브라우저 기본 인쇄 대화상자를 직접 호출합니다.
                </span>
              </div>
            </div>
          </button>

          {/* Action 3: Download standalone HTML report */}
          <button
            type="button"
            onClick={handleDownloadStandaloneHtml}
            className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  독립 실행형 HTML 보고서 파일 다운로드 (.html)
                </span>
                <span className="text-[11px] text-slate-500">
                  인터넷 연결 없이 언제든 더블클릭하여 열고 인쇄할 수 있는 파일로 저장합니다.
                </span>
              </div>
            </div>
            <Download className="w-4 h-4 text-slate-400" />
          </button>

          {downloadSuccess && (
            <div className="flex items-center gap-2 p-2.5 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>HTML 보고서 파일이 성공적으로 다운로드되었습니다.</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
