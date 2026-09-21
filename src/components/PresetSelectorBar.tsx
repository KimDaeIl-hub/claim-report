import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Building2,
  Factory,
  ChevronDown,
  CheckCircle2,
  Settings,
  X,
  Layers,
  Filter,
  Info,
} from "lucide-react";
import { ClaimPreset } from "../types";

export interface PresetSelectorBarProps {
  presets: ClaimPreset[];
  selectedPresetId: string | null;
  onSelectPreset: (preset: ClaimPreset) => void;
  onClearPreset?: () => void;
  onOpenPresetManager?: () => void;
}

const SUB_CATEGORIES = [
  { key: "all", label: "전체" },
  { key: "breakage", label: "파손" },
  { key: "cap", label: "캡불량" },
  { key: "spoilage", label: "변질" },
  { key: "foreign", label: "혼입" },
  { key: "quantity", label: "수량부족" },
  { key: "fill", label: "충전불량" },
  { key: "packaging", label: "포장불량" },
] as const;

export function PresetSelectorBar({
  presets,
  selectedPresetId,
  onSelectPreset,
  onClearPreset,
  onOpenPresetManager,
}: PresetSelectorBarProps) {
  // 1. Scope tab: in_house (자사) vs oem (외주)
  const [activeScope, setActiveScope] = useState<"in_house" | "oem">("in_house");

  // 2. Subcategory tab: all, breakage, cap, spoilage, foreign, quantity, fill, packaging
  const [activeSubCategory, setActiveSubCategory] = useState<string>("all");

  // Selected preset object
  const activePreset = useMemo(() => {
    return presets.find((p) => p.id === selectedPresetId);
  }, [presets, selectedPresetId]);

  // Filter presets by scope first
  const scopePresets = useMemo(() => {
    return presets.filter((p) => {
      const pScope = p.scope || (p.category?.includes("외주") ? "oem" : "in_house");
      return pScope === activeScope;
    });
  }, [presets, activeScope]);

  // Counts per subcategory in current scope
  const subCategoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: scopePresets.length };
    SUB_CATEGORIES.forEach((sub) => {
      if (sub.key === "all") return;
      counts[sub.key] = scopePresets.filter((p) => (p.subCategory || "") === sub.key).length;
    });
    return counts;
  }, [scopePresets]);

  // Presets filtered by both scope and subcategory
  const filteredPresets = useMemo(() => {
    if (activeSubCategory === "all") return scopePresets;
    return scopePresets.filter((p) => (p.subCategory || "") === activeSubCategory);
  }, [scopePresets, activeSubCategory]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden transition-all">
      {/* 1단계: 자사 / 외주 대분류 탭 헤더 */}
      <div className="bg-slate-50/90 border-b border-slate-200 px-3 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <div className="flex rounded-lg bg-slate-200/80 p-0.5">
            <button
              type="button"
              onClick={() => {
                setActiveScope("in_house");
                setActiveSubCategory("all");
              }}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-md transition-all ${
                activeScope === "in_house"
                  ? "bg-white text-blue-700 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>자사 제품</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeScope === "in_house"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-slate-300/70 text-slate-700"
                }`}
              >
                {presets.filter((p) => (p.scope || "in_house") === "in_house").length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveScope("oem");
                setActiveSubCategory("all");
              }}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-md transition-all ${
                activeScope === "oem"
                  ? "bg-white text-purple-700 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Factory className="w-3.5 h-3.5" />
              <span>외주 제품</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeScope === "oem"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-slate-300/70 text-slate-700"
                }`}
              >
                {presets.filter((p) => p.scope === "oem").length}
              </span>
            </button>
          </div>

          <span className="text-[11px] text-slate-400 hidden sm:inline">|</span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            {activeScope === "in_house" ? "광동제약 생산 라인 다빈도 유형" : "외주 위탁가공처(OEM/ODM) 다빈도 유형"}
          </span>
        </div>

        {onOpenPresetManager && (
          <button
            type="button"
            onClick={onOpenPresetManager}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-blue-700 bg-white hover:bg-slate-100 px-2.5 py-1 rounded border border-slate-300 transition-colors shrink-0"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>프리셋 추가/수정</span>
          </button>
        )}
      </div>

      {/* 2단계: 세부분류 탭 한 줄 바 (파손 / 캡불량 / 변질 / 혼입 / 수량부족 / 충전불량 / 포장불량) */}
      <div className="px-3 py-2 bg-slate-50/40 border-b border-slate-100 flex items-center gap-1 overflow-x-auto">
        <span className="text-[11px] font-bold text-slate-500 mr-1 flex items-center gap-1 shrink-0">
          <Filter className="w-3 h-3 text-slate-400" />
          <span>세부분류:</span>
        </span>

        {SUB_CATEGORIES.map((sub) => {
          const count = subCategoryCounts[sub.key] || 0;
          const isActive = activeSubCategory === sub.key;
          return (
            <button
              key={sub.key}
              type="button"
              onClick={() => setActiveSubCategory(sub.key)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap flex items-center gap-1 shrink-0 ${
                isActive
                  ? activeScope === "in_house"
                    ? "bg-blue-600 text-white shadow-2xs font-bold"
                    : "bg-purple-600 text-white shadow-2xs font-bold"
                  : count > 0
                  ? "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                  : "bg-slate-100/70 text-slate-400 border border-slate-200/60"
              }`}
            >
              <span>{sub.label}</span>
              <span
                className={`text-[10px] px-1 py-0.2 rounded-full ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3단계: 한 줄 선택 드롭다운 및 주요 프리셋 목록 */}
      <div className="p-3 space-y-2.5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* 한 줄 셀렉트 드롭다운 (원클릭 빠른 선택) */}
          <div className="relative flex-1">
            <select
              value={selectedPresetId || ""}
              onChange={(e) => {
                const p = presets.find((item) => item.id === e.target.value);
                if (p) onSelectPreset(p);
              }}
              className="w-full text-xs font-semibold pl-3 pr-8 py-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors cursor-pointer truncate"
            >
              <option value="" disabled>
                -- [{activeScope === "in_house" ? "자사" : "외주"}] {activeSubCategory === "all" ? "전체" : SUB_CATEGORIES.find(s => s.key === activeSubCategory)?.label} 유형 목록에서 선택하세요 ({filteredPresets.length}건) --
              </option>
              {filteredPresets.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          {/* 현재 선택된 프리셋이 있을 때 취소 버튼 */}
          {selectedPresetId && onClearPreset && (
            <button
              type="button"
              onClick={onClearPreset}
              className="inline-flex items-center justify-center gap-1 px-2.5 py-2 text-xs font-semibold text-slate-600 hover:text-red-600 bg-slate-100 hover:bg-red-50 border border-slate-200 hover:border-red-200 rounded-lg transition-colors shrink-0"
              title="선택된 프리셋 해제"
            >
              <X className="w-3.5 h-3.5" />
              <span>선택 해제</span>
            </button>
          )}
        </div>

        {/* 세부분류에 속한 프리셋 카드들 (한눈에 보고 바로 클릭 가능) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
          {filteredPresets.length === 0 ? (
            <div className="col-span-full py-4 text-center text-xs text-slate-400">
              해당 분류({SUB_CATEGORIES.find(s => s.key === activeSubCategory)?.label})에 등록된 프리셋이 없습니다.
            </div>
          ) : (
            filteredPresets.map((preset) => {
              const isSelected = selectedPresetId === preset.id;
              const isOem = preset.scope === "oem";
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onSelectPreset(preset)}
                  className={`text-left p-2.5 rounded-lg border transition-all relative ${
                    isSelected
                      ? isOem
                        ? "bg-purple-50/90 border-purple-500 ring-2 ring-purple-400 shadow-2xs"
                        : "bg-blue-50/90 border-blue-500 ring-2 ring-blue-400 shadow-2xs"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80"
                  }`}
                >
                  <div className="flex items-start justify-between gap-1.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isOem
                            ? "bg-purple-100 text-purple-800 border border-purple-200"
                            : "bg-blue-100 text-blue-800 border border-blue-200"
                        }`}
                      >
                        {isOem ? "외주" : "자사"}
                      </span>
                      <span className="text-xs font-bold text-slate-900 leading-snug">
                        {preset.name}
                      </span>
                    </div>

                    {isSelected && (
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${
                          isOem ? "text-purple-600" : "text-blue-600"
                        }`}
                      />
                    )}
                  </div>

                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {preset.description}
                  </p>
                </button>
              );
            })
          )}
        </div>

        {/* 선택된 프리셋이 있으면 안내 칩 표시 */}
        {activePreset && (
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="truncate">
                <span className="font-bold text-slate-800">현재 적용된 유형: </span>
                <span className="text-blue-700 font-semibold">{activePreset.name}</span>
              </div>
            </div>
            <span className="text-[11px] text-slate-400 shrink-0">
              보고서 양식에 표준 문구 적용 완료
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
