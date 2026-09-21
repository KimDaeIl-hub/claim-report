import React, { useRef, useState } from "react";
import { Upload, Image as ImageIcon, RotateCcw, CheckCircle2 } from "lucide-react";
import { KwangdongLogo } from "./KwangdongLogo";

interface CompanyLogoUploaderProps {
  currentLogoUrl?: string;
  onLogoChange: (url: string) => void;
  compact?: boolean;
}

export function CompanyLogoUploader({
  currentLogoUrl,
  onLogoChange,
  compact = false,
}: CompanyLogoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일(PNG, JPG, SVG, WebP 등)만 업로드 가능합니다.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        try {
          localStorage.setItem("food_qc_custom_company_logo", result);
        } catch (err) {
          console.warn("Could not cache logo to localStorage", err);
        }
        onLogoChange(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    try {
      localStorage.removeItem("food_qc_custom_company_logo");
    } catch (err) {
      console.warn(err);
    }
    onLogoChange("");
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/svg+xml,image/webp"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleFile(e.target.files[0]);
              e.target.value = "";
            }
          }}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-md shadow-2xs transition-colors"
          title="보고서 상단에 인쇄될 회사 CI 이미지를 직접 업로드합니다"
        >
          <Upload className="w-3.5 h-3.5 text-blue-600" />
          <span>{currentLogoUrl ? "CI 로고 교체" : "회사 CI 파일 업로드"}</span>
        </button>

        {currentLogoUrl && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-md transition-colors"
            title="기본 광동제약 CI로 복원"
          >
            <RotateCcw className="w-3 h-3" />
            <span>기본 CI로 초기화</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
            <ImageIcon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">
              보고서 상단 회사 CI 로고 설정
            </h4>
            <p className="text-[11px] text-slate-500">
              A4 공문서 상단 헤더에 들어갈 공식 CI 로고를 파일(PNG, JPG, SVG)로 직접 등록할 수 있습니다.
            </p>
          </div>
        </div>

        {currentLogoUrl && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 rounded transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>기본 CI로 복원</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
        {/* Preview box */}
        <div className="p-3 bg-white rounded-lg border border-slate-200 flex flex-col items-center justify-center min-h-[90px] shadow-2xs">
          <span className="text-[10px] font-semibold text-slate-400 mb-2 uppercase tracking-wider">
            {currentLogoUrl ? "적용된 맞춤 CI 미리보기" : "현재 기본 CI 로고"}
          </span>
          <div className="h-10 flex items-center justify-center">
            {currentLogoUrl ? (
              <img
                src={currentLogoUrl}
                alt="업로드된 회사 CI"
                className="max-h-10 max-w-[240px] object-contain"
              />
            ) : (
              <KwangdongLogo size="md" className="h-9" />
            )}
          </div>
          {currentLogoUrl && (
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium mt-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>맞춤 CI 파일이 정상 반영되었습니다.</span>
            </div>
          )}
        </div>

        {/* Upload dropzone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files?.[0]) {
              handleFile(e.dataTransfer.files[0]);
            }
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-3 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[90px] ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-slate-300 hover:border-blue-400 hover:bg-white bg-slate-100/60"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/svg+xml,image/webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFile(e.target.files[0]);
                e.target.value = "";
              }
            }}
          />
          <Upload className="w-4 h-4 text-blue-600 mb-1" />
          <p className="text-xs font-semibold text-slate-700">
            {currentLogoUrl ? "새 CI 이미지 파일로 변경" : "CI 파일 선택 또는 드래그"}
          </p>
          <p className="text-[10.5px] text-slate-400 mt-0.5">
            PNG (투명 배경 권장), SVG, JPG, WebP
          </p>
        </div>
      </div>
    </div>
  );
}
