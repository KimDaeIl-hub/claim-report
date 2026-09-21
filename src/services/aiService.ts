export interface PolishResult {
  success: boolean;
  polishedText: string;
  source: 'gemini-3.8-flash' | 'gemini-flash-latest' | 'rule-engine' | 'client-fallback' | string;
  error?: string;
}

export async function polishTextWithAI(
  text: string,
  fieldName: string = "조사 내용"
): Promise<PolishResult> {
  if (!text || text.trim().length === 0) {
    return {
      success: false,
      polishedText: text,
      source: 'client-fallback',
      error: "내용을 입력해주세요.",
    };
  }

  try {
    const response = await fetch("/api/ai/polish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        fieldName,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.polishedText) {
        return {
          success: true,
          polishedText: data.polishedText,
          source: data.source || 'gemini-3.8-flash',
        };
      }
    }
  } catch (err) {
    console.warn("Server AI polish endpoint unreachable, using client rule engine fallback:", err);
  }

  // Client-side fallback rule engine
  const polished = clientRuleBasedPolish(text);
  return {
    success: true,
    polishedText: polished,
    source: 'client-fallback',
  };
}

function clientRuleBasedPolish(text: string): string {
  let result = text.trim();

  const replacements: Array<[RegExp, string]> = [
    [/봤을 때|확인해보니|체크해보니|확인해봤더니/g, "확인한 결과"],
    [/문제 없음|이상 없음|문제 없었음|이상 없었음/g, "특이사항 및 이상 징후는 확인되지 않았습니다"],
    [/문제 있다|이상 있다/g, "이상 소견이 확인되었습니다"],
    [/보인다|보입니다|인것 같다|인 것 같다|같음/g, "것으로 사료됩니다"],
    [/생각된다|생각됩니다/g, "판단됩니다"],
    [/나왔다|나옴/g, "측정/검출되었습니다"],
    [/없었다|없음/g, "확인되지 않았습니다"],
    [/했다|하였음|함/g, "진행하였습니다"],
    [/일치함|맞음|동일함/g, "높은 유사도 및 동일성이 확인되었습니다"],
    [/검사함/g, "정밀 검사를 실시하였습니다"],
    [/원인인것 같음|원인인 것 같음/g, "주요 기인 요소인 것으로 추정됩니다"],
    [/깨끗함|정상임/g, "정상 규격에 부합함을 확인하였습니다"],
  ];

  for (const [regex, rep] of replacements) {
    result = result.replace(regex, rep);
  }

  const lines = result.split("\n").map((line) => {
    const trimmed = line.trim();
    if (!trimmed) return "";
    if (
      !trimmed.endsWith(".") &&
      !trimmed.endsWith("습니다") &&
      !trimmed.endsWith("됩니다") &&
      !trimmed.endsWith("확인됨")
    ) {
      if (trimmed.endsWith("사료됨") || trimmed.endsWith("판단됨")) {
        return trimmed + "니다.";
      }
      return trimmed + "을 확인하였습니다.";
    }
    return trimmed;
  });

  return lines.join("\n");
}
