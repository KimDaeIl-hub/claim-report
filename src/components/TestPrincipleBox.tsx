import React, { useState } from "react";
import { FlaskConical, ChevronDown, ChevronUp, Save, Settings } from "lucide-react";
import { PhraseDropdown } from "./PhraseDropdown";
import { loadCustomPhrases, saveCustomPhrases, StandardPhrase } from "../data/standardPhrases";

interface TestPrincipleBoxProps {
  methodName: string;
  fieldKey: string;
  includePrinciple: boolean;
  principleText: string;
  activePresetId?: string;
  onChange: (include: boolean, text: string) => void;
  onOpenManager: (fieldKey?: string) => void;
}

export function TestPrincipleBox({
  methodName,
  fieldKey,
  includePrinciple,
  principleText,
  activePresetId,
  onChange,
  onOpenManager,
}: TestPrincipleBoxProps) {
  const [isExpanded, setIsExpanded] = useState(includePrinciple);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleToggleInclude = (checked: boolean) => {
    onChange(checked, principleText);
    if (checked && !isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleSaveAsCustomPhrase = () => {
    if (!principleText.trim()) {
      alert("저장할 시험법 원리 설명 문구를 입력해주세요.");
      return;
    }

    const title = prompt(
      `이 [${methodName}] 원리 설명 문구의 식별 명칭을 입력해주세요:`,
      `${methodName} 시험 원리`
    );
    if (!title) return;

    const newPhrase: StandardPhrase = {
      id: `custom-principle-${Date.now()}`,
      fieldKey,
      category: "test_principle",
      title: title.trim(),
      content: principleText.trim(),
      isCustom: true,
    };

    const customs = loadCustomPhrases();
    saveCustomPhrases([...customs, newPhrase]);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="mt-2.5 rounded-lg border border-slate-200 bg-slate-50/70 overflow-hidden text-xs">
      {/* Header Bar */}
      <div className="px-3 py-2 bg-slate-100/70 border-b border-slate-200 flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700 select-none">
          <input
            type="checkbox"
            checked={includePrinciple}
            onChange={(e) => handleToggleInclude(e.target.checked)}
            className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
          />
          <span className="flex items-center gap-1 text-slate-800">
            <FlaskConical className="w-3.5 h-3.5 text-blue-600" />
            <span>보고서에 [{methodName}] 시험 원리 및 규명 방법 설명 문구 포함</span>
          </span>
        </label>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded transition-colors"
            title={isExpanded ? "문구 편집창 접기" : "문구 편집창 펼치기"}
          >
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Editor Body */}
      {isExpanded && (
        <div className="p-3 space-y-2 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-medium">
              보고서에 출력될 시험법의 과학적 원리와 신뢰성 보증 설명 문구를 직접 편집하세요.
            </span>
            <div className="flex items-center gap-1.5">
              <PhraseDropdown
                fieldKey={fieldKey}
                activePresetId={activePresetId}
                onSelectPhrase={(content) => onChange(true, content)}
                onOpenManager={onOpenManager}
                buttonLabel="표준 원리 선택"
                size="xs"
              />
              <button
                type="button"
                onClick={handleSaveAsCustomPhrase}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium text-slate-600 hover:text-blue-700 bg-slate-100 hover:bg-blue-50 border border-slate-300 rounded transition-colors"
                title="현재 작성된 원리 문구를 상용구 라이브러리에 저장"
              >
                <Save className="w-3 h-3 text-slate-500" />
                <span>{saveSuccess ? "저장됨!" : "상용구로 저장"}</span>
              </button>
            </div>
          </div>

          <textarea
            rows={2}
            value={principleText}
            onChange={(e) => onChange(includePrinciple, e.target.value)}
            placeholder={`예: ${methodName}을 통해 시료의 물리화학적 성상을 비파괴/정밀 측정하여 인체 유해성 및 발생 원인을 과학적으로 규명합니다.`}
            className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none leading-relaxed text-slate-800"
          />
        </div>
      )}
    </div>
  );
}
