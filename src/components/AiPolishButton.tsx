import { useState } from "react";
import { Sparkles, Loader2, Check } from "lucide-react";
import { polishTextWithAI } from "../services/aiService";

interface AiPolishButtonProps {
  text: string;
  fieldName: string;
  onApply: (polishedText: string) => void;
}

export function AiPolishButton({ text, fieldName, onApply }: AiPolishButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [justPolished, setJustPolished] = useState(false);

  const handlePolish = async () => {
    if (!text || text.trim().length === 0) {
      alert("먼저 내용을 입력하신 후 AI 문장 정돈 버튼을 눌러주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await polishTextWithAI(text, fieldName);
      if (result.success && result.polishedText) {
        onApply(result.polishedText);
        setJustPolished(true);
        setTimeout(() => setJustPolished(false), 2500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      id={`ai-polish-btn-${fieldName.replace(/\s+/g, "_")}`}
      onClick={handlePolish}
      disabled={isLoading}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md border transition-all ${
        justPolished
          ? "bg-emerald-50 text-emerald-700 border-emerald-300"
          : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200 active:scale-95"
      } disabled:opacity-60`}
      title="거친 메모를 식품공문서 표준 격식 어투(~로 사료됩니다 등)로 자동 변환"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
          <span>공문서체 윤문 중...</span>
        </>
      ) : justPolished ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span>공문서체 정돈 완료!</span>
        </>
      ) : (
        <>
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>AI 문장 정돈</span>
        </>
      )}
    </button>
  );
}
