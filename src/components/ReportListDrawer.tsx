import { useState, useEffect, useRef, ChangeEvent } from "react";
import {
  X,
  Search,
  FolderOpen,
  Copy,
  Trash2,
  Download,
  Upload,
  Clock,
  FileCheck,
  PlusCircle,
} from "lucide-react";
import { ReportData } from "../types";

interface ReportListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentReport: ReportData;
  onLoadReport: (report: ReportData) => void;
  onNewReport: () => void;
}

const STORAGE_SAVED_REPORTS_KEY = "food_qc_saved_reports_v1";

export function getSavedReports(): ReportData[] {
  try {
    const raw = localStorage.getItem(STORAGE_SAVED_REPORTS_KEY);
    if (!raw) return [];
    const sanitized = raw
      .replaceAll("대한푸드품질연구원", "광동제약주식회사 식품품질경영팀")
      .replaceAll("대한푸드", "광동제약");
    return JSON.parse(sanitized);
  } catch (e) {
    console.error("Failed to parse saved reports", e);
    return [];
  }
}

export function saveReportToArchive(report: ReportData): void {
  const existing = getSavedReports();
  const index = existing.findIndex((r) => r.id === report.id);
  let updated: ReportData[];
  if (index >= 0) {
    updated = existing.map((r, i) => (i === index ? report : r));
  } else {
    updated = [report, ...existing];
  }
  localStorage.setItem(STORAGE_SAVED_REPORTS_KEY, JSON.stringify(updated));
}

export function ReportListDrawer({
  isOpen,
  onClose,
  currentReport,
  onLoadReport,
  onNewReport,
}: ReportListDrawerProps) {
  const [reports, setReports] = useState<ReportData[]>(() => getSavedReports());
  const [searchTerm, setSearchTerm] = useState("");
  const jsonImportRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setReports(getSavedReports());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveCurrent = () => {
    saveReportToArchive(currentReport);
    setReports(getSavedReports());
    alert("현재 작성 중인 보고서가 보관함에 영구 저장되었습니다.");
  };

  const handleClone = (report: ReportData) => {
    const cloned: ReportData = {
      ...JSON.parse(JSON.stringify(report)),
      id: `rep-${Date.now()}`,
      title: `${report.title} (사본)`,
      docNumber: `${report.docNumber}-COPY`,
      issueDate: new Date().toISOString().split("T")[0],
    };
    saveReportToArchive(cloned);
    setReports(getSavedReports());
    onLoadReport(cloned);
    onClose();
  };

  const handleDelete = (id: string) => {
    if (!confirm("이 보고서를 보관함에서 영구 삭제하시겠습니까?")) return;
    const filtered = reports.filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_SAVED_REPORTS_KEY, JSON.stringify(filtered));
    setReports(filtered);
  };

  // Export JSON Backup
  const handleExportJson = () => {
    const payload = {
      version: "1.0",
      exportedAt: new Date().toISOString(),
      currentReport,
      savedReports: reports,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `식품클레임조사_전체데이터_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON Backup
  const handleImportJson = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        if (parsed.currentReport) {
          onLoadReport(parsed.currentReport);
        }
        if (Array.isArray(parsed.savedReports)) {
          const merged = [...parsed.savedReports, ...reports];
          // deduplicate by id
          const map = new Map<string, ReportData>();
          merged.forEach((item) => map.set(item.id, item));
          const unique = Array.from(map.values());
          localStorage.setItem(STORAGE_SAVED_REPORTS_KEY, JSON.stringify(unique));
          setReports(unique);
        }
        alert("백업 파일(JSON)의 데이터 복원이 정상 완료되었습니다!");
        onClose();
      } catch (err) {
        alert("올바르지 않은 JSON 백업 파일 형식입니다.");
        console.error(err);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const filteredReports = reports.filter((r) => {
    const matchName = r.productInfo.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCustomer = r.customerClaim.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDoc = r.docNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTitle = r.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchName || matchCustomer || matchDoc || matchTitle;
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-800">조사 보고서 보관함 & 이력</h3>
              <p className="text-[11px] text-slate-500">로컬 영구 저장 및 이전 보고서 복제</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Buttons */}
        <div className="p-3 bg-slate-100/70 border-b border-slate-200 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleSaveCurrent}
            className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>현재 문서 보관함 저장</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm("현재 작성 중인 내용 대신 새 보고서를 작성하시겠습니까?")) {
                onNewReport();
                onClose();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>새 문서</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-slate-200">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="제품명, 고객명, 문서번호 검색..."
              className="w-full text-xs pl-8 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50 focus:bg-white"
            />
          </div>
        </div>

        {/* Report List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredReports.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              <FolderOpen className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>저장된 보고서가 없습니다.</p>
              <p className="text-[11px] mt-1 text-slate-500">
                상단의 [현재 문서 보관함 저장]을 눌러 보관할 수 있습니다.
              </p>
            </div>
          ) : (
            filteredReports.map((item) => {
              const isCurrent = item.id === currentReport.id;
              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-lg border transition-all ${
                    isCurrent
                      ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-400"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                          {item.docNumber}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-blue-600 text-white font-bold rounded">
                            현재 편집 중
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">
                        {item.productInfo.productName || item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        고객: {item.customerClaim.customerName || "-"} | 일자: {item.issueDate}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleClone(item)}
                        className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                        title="새 문서로 복제 (Clone)"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                        title="삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {!isCurrent && (
                    <button
                      type="button"
                      onClick={() => {
                        onLoadReport(item);
                        onClose();
                      }}
                      className="mt-2 w-full text-center py-1 text-[11px] font-semibold text-blue-600 hover:bg-blue-100/50 rounded transition-colors"
                    >
                      이 보고서 불러오기 →
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Backup Actions */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <input
            ref={jsonImportRef}
            type="file"
            accept=".json"
            onChange={handleImportJson}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => jsonImportRef.current?.click()}
            className="flex items-center gap-1 px-3 py-1.5 text-slate-600 hover:text-slate-900 bg-white border border-slate-300 rounded-lg"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>JSON 복원</span>
          </button>
          <button
            type="button"
            onClick={handleExportJson}
            className="flex items-center gap-1 px-3 py-1.5 text-slate-600 hover:text-slate-900 bg-white border border-slate-300 rounded-lg"
          >
            <Download className="w-3.5 h-3.5" />
            <span>전체 JSON 백업</span>
          </button>
        </div>
      </div>
    </div>
  );
}
