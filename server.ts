import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: true, limit: "25mb" }));

  // API Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // AI Tone & Manner Polish API
  app.post("/api/ai/polish", async (req, res) => {
    try {
      const { text, fieldName = "조사 내용", promptType = "qa_formal" } = req.body;

      if (!text || typeof text !== "string" || text.trim().length === 0) {
        return res.status(400).json({ error: "정돈할 텍스트가 필요합니다." });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      if (apiKey) {
        const candidateModels = ["gemini-3.8-flash", "gemini-flash-latest"];
        const systemInstruction = `당신은 대한민국 1등 식품 대기업의 식품안전/품질경영팀(QA/QC) 수석 연구원입니다.
작성자가 메모나 일상적인 표현으로 거칠게 작성한 클레임 조사 내용을 정형화된 고품격 식품공문서 표준 어투(Tone & Manner)로 다듬어주세요.

[필수 원칙]
1. 문미 종결어미 통일: '~로 사료됩니다.', '~으로 확인되었습니다.', '~로 판단됩니다.', '~로 분석되었습니다.'
2. 과학적이고 객관적인 전문 용어 사용 (예: 현품, 보관 검체, 성상, 표준 규격, 이물 관리 기준, 이상 징후 등).
3. 억측이나 과장 배제, 사실(Fact)과 분석 결과에 기반한 정중하고 명확한 문장 구성.
4. 설명이나 따옴표 없이, 오직 다듬어진 최종 보고서 문장 텍스트만 출력할 것.
5. 원래 기재된 사실 데이터(수치, 제품명, 일자, 원인 물질 등)는 절대 임의로 왜곡하거나 삭제하지 말 것.`;

        const ai = new GoogleGenAI({ apiKey });

        for (const model of candidateModels) {
          let succeeded = false;
          for (let attempt = 0; attempt < 2; attempt++) {
            try {
              const response = await ai.models.generateContent({
                model,
                contents: `[조사 항목]: ${fieldName}\n[원문 메모]:\n${text}\n\n위 원문을 식품품질공문서 표준 어투로 품격 있게 다듬어주세요.`,
                config: {
                  systemInstruction,
                  temperature: 0.2,
                },
              });

              const polished = response.text ? response.text.trim() : null;
              if (polished) {
                return res.json({
                  success: true,
                  polishedText: polished,
                  source: model,
                });
              }
            } catch (err: any) {
              const isHighDemand =
                err?.status === 503 ||
                err?.code === 503 ||
                (typeof err?.message === "string" &&
                  (err.message.includes("503") ||
                    err.message.includes("high demand") ||
                    err.message.includes("UNAVAILABLE")));

              if (isHighDemand && attempt === 0) {
                // Short wait before retry on demand spike
                await new Promise((resolve) => setTimeout(resolve, 600));
                continue;
              }
              // If not recoverable on this model, proceed to fallback model
              break;
            }
          }
          if (succeeded) break;
        }
      }

      // Fallback Rule-based Polish Engine
      const polished = ruleBasedPolish(text);
      return res.json({
        success: true,
        polishedText: polished,
        source: "rule-engine",
      });
    } catch (err: any) {
      console.error("Error in /api/ai/polish:", err);
      res.status(500).json({ error: err.message || "문장 다듬기 중 오류가 발생했습니다." });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`QA/QC Claim Report Server running on http://0.0.0.0:${PORT}`);
  });
}

function ruleBasedPolish(text: string): string {
  let result = text.trim();

  // Convert colloquial or brief sentences to food QA formal Korean
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

  // Ensure professional ending if sentence ends abruptly
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

startServer();
