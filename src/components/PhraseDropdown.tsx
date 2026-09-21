import React, { useState, useEffect, useRef } from "react";
import { BookOpen, Plus, ChevronDown, Check, Tag, Sparkles } from "lucide-react";
import { getAllPhrasesForField, StandardPhrase } from "../data/standardPhrases";

interface PhraseDropdownProps {
  fieldKey: string;
  activePresetId?: string;
  onSelectPhrase: (content: string) => void;
  onOpenManager?: (fieldKey?: string) => void;
  buttonLabel?: string;
  size?: "sm" | "xs";
}

export function PhraseDropdown({
  fieldKey,
  activePresetId,
  onSelectPhrase,
  onOpenManager,
  buttonLabel = "표준 상용구",
  size = "sm",
}: PhraseDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [phrases, setPhrases] = useState<StandardPhrase[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPhrases(getAllPhrasesForField(fieldKey, activePresetId));
  }, [fieldKey, activePresetId, isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (phrases.length === 0 && !onOpenManager) {
    return null;
  }

  const isSmall = size === "xs";

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        id={`phrase-btn-${fieldKey}`}
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 ${
          isSmall ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"
        } font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500`}
        title="자주 쓰는 표준 상용구 / 시험법 설명 선택"
      >
        <BookOpen className="w-3.5 h-3.5 text-blue-600" />
        <span>{buttonLabel}</span>
        <ChevronDown className="w-3 h-3 text-slate-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-80 rounded-lg bg-white shadow-xl ring-1 ring-black/10 z-50 p-1 divide-y divide-slate-100 text-xs animate-in fade-in zoom-in-95 duration-100 max-h-80 overflow-y-auto">
          <div className="py-1">
            <div className="px-2.5 py-1 font-semibold text-slate-500 uppercase tracking-wider text-[10px] flex items-center justify-between">
              <span>권장 표준 상용구 목록</span>
              {activePresetId && (
                <span className="text-[10px] text-blue-600 font-normal">프리셋 연계 우선 표시</span>
              )}
            </div>
            {phrases.length === 0 ? (
              <div className="px-2.5 py-2 text-slate-400 italic">등록된 상용구가 없습니다.</div>
            ) : (
              phrases.map((phrase) => {
                const isLinked = activePresetId && phrase.presetId === activePresetId;
                return (
                  <button
                    key={phrase.id}
                    type="button"
                    onClick={() => {
                      onSelectPhrase(phrase.content);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 hover:bg-blue-50 rounded-md transition-colors group flex flex-col gap-0.5 ${
                      isLinked ? "bg-blue-50/40" : ""
                    }`}
                  >
                    <span className="font-semibold text-slate-800 group-hover:text-blue-700 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        {isLinked && <Sparkles className="w-3 h-3 text-blue-600 shrink-0" />}
                        <span>{phrase.title}</span>
                      </span>
                      {phrase.isCustom ? (
                        <span className="text-[10px] px-1 bg-amber-100 text-amber-700 rounded font-normal">
                          사용자 정의
                        </span>
                      ) : (
                        <span className="text-[10px] px-1 bg-slate-100 text-slate-600 rounded font-normal">
                          표준
                        </span>
                      )}
                    </span>
                    <span className="text-slate-500 line-clamp-2 text-[11px] leading-relaxed">
                      {phrase.content}
                    </span>
                  </button>
                );
              })
            )}
          </div>

          {onOpenManager && (
            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenManager(fieldKey);
                }}
                className="w-full flex items-center justify-center gap-1 px-2.5 py-1.5 text-blue-600 hover:bg-blue-50 rounded font-medium text-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>상용구 / 시험원리 문구 관리</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
