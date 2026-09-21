/**
 * Utility to parse MHT / MHTML / HTML claim reports exported from Groupware
 * (Handy, Douzone, Hiworks, etc.)
 */

export interface ParsedMhtClaimData {
  customerName?: string;
  productName?: string;
  receivedAt?: string; // YYYY-MM-DD
  expiryDate?: string; // YYYY-MM-DD or string
  lotNumber?: string;
  claimDetails?: string;
  channel?: string;
  docNumber?: string;
  incomingDocNumber?: string; // 접수 전자결재 문서번호 (예: 커뮤니케이션팀:2026-583)
  csDepartment?: string; // 접수 인입 부서 (예: 커뮤니케이션팀)
  csHandler?: string; // 접수자 (예: 박병철)
  department?: string; // 조사 부서 (언제나 식품품질경영팀)
  researcherName?: string;
  manufacturer?: string;
  purchaseQuantity?: string;
  customerAddress?: string;
  complaintType?: string;
  hasSampleReturn?: boolean;
  rawText?: string;
}

/**
 * Standardize Korean or irregular dates to YYYY-MM-DD
 * e.g. "2026.9.18." -> "2026-09-18", "2026-09-18" -> "2026-09-18"
 */
export function normalizeDate(str: string): string {
  if (!str) return "";
  const cleaned = str.trim().replace(/[.]$/, "");
  // Match YYYY.M.D or YYYY-M-D or YYYY/M/D or YYYY년 M월 D일
  const m = cleaned.match(/(\d{4})[.\-/\s년]+(\d{1,2})[.\-/\s월]+(\d{1,2})/);
  if (m) {
    const y = m[1];
    const mo = m[2].padStart(2, "0");
    const d = m[3].padStart(2, "0");
    return `${y}-${mo}-${d}`;
  }
  return cleaned;
}

/**
 * Decode Quoted-Printable bytes into string with charset fallback
 */
function decodeQuotedPrintable(qpStr: string, charset = "utf-8"): string {
  // Remove soft line breaks: =\r\n or =\n
  const unwrapped = qpStr.replace(/=\r?\n/g, "");
  
  // Collect bytes
  const bytes: number[] = [];
  for (let i = 0; i < unwrapped.length; i++) {
    const char = unwrapped[i];
    if (char === "=" && i + 2 < unwrapped.length) {
      const hex = unwrapped.substring(i + 1, i + 3);
      if (/^[0-9A-Fa-f]{2}$/.test(hex)) {
        bytes.push(parseInt(hex, 16));
        i += 2;
        continue;
      }
    }
    bytes.push(char.charCodeAt(0));
  }

  const uint8 = new Uint8Array(bytes);
  
  // Try specified charset, fallback to euc-kr or utf-8
  const charsetsToTry = [charset.toLowerCase(), "utf-8", "euc-kr", "windows-949"];
  for (const cs of charsetsToTry) {
    try {
      const decoder = new TextDecoder(cs, { fatal: false });
      const decoded = decoder.decode(uint8);
      // Check if it looks reasonably like Korean/text (has Korean chars or common ASCII)
      if (/[\uac00-\ud7af]/.test(decoded) || cs === charsetsToTry[charsetsToTry.length - 1]) {
        return decoded;
      }
    } catch {
      // continue
    }
  }
  return new TextDecoder("utf-8", { fatal: false }).decode(uint8);
}

/**
 * Extract HTML content from raw MHT / MHTML text
 */
function extractHtmlFromMht(rawText: string): string {
  // Look for boundary in Content-Type header
  const boundaryMatch = rawText.match(/boundary=["']?([^"';\r\n]+)["']?/i);
  if (!boundaryMatch) {
    // If no boundary, it might be raw HTML
    return rawText;
  }

  const boundary = boundaryMatch[1];
  const parts = rawText.split(`--${boundary}`);

  for (const part of parts) {
    if (/content-type:\s*text\/html/i.test(part)) {
      // Check encoding
      const isQP = /content-transfer-encoding:\s*quoted-printable/i.test(part);
      const isB64 = /content-transfer-encoding:\s*base64/i.test(part);
      const charsetMatch = part.match(/charset=["']?([^"';\r\n]+)["']?/i);
      const charset = charsetMatch ? charsetMatch[1] : "utf-8";

      // Split header and body
      const bodyIndex = part.indexOf("\r\n\r\n") !== -1 
        ? part.indexOf("\r\n\r\n") + 4 
        : part.indexOf("\n\n") !== -1 
          ? part.indexOf("\n\n") + 2 
          : -1;

      if (bodyIndex !== -1) {
        const body = part.slice(bodyIndex);
        if (isQP) {
          return decodeQuotedPrintable(body, charset);
        } else if (isB64) {
          try {
            const cleanB64 = body.replace(/\s+/g, "");
            const binary = atob(cleanB64);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
            return new TextDecoder(charset).decode(bytes);
          } catch {
            return body;
          }
        } else {
          return body;
        }
      }
    }
  }

  return rawText;
}

/**
 * Parse .mht / .mhtml or html File object and extract structured claim report fields
 */
export async function parseMhtFile(file: File): Promise<ParsedMhtClaimData> {
  const buffer = await file.arrayBuffer();
  
  // Detect if bytes contain euc-kr or utf-8
  let text = "";
  try {
    // Try utf-8 first
    const utf8Decoder = new TextDecoder("utf-8", { fatal: false });
    text = utf8Decoder.decode(buffer);
    // If it mentions charset=euc-kr or ks_c_5601 and has corrupted chars
    if (/charset=["']?(?:euc-kr|ks_c_5601|cp949|windows-949)/i.test(text)) {
      try {
        const eucDecoder = new TextDecoder("euc-kr");
        text = eucDecoder.decode(buffer);
      } catch {
        // keep utf8
      }
    }
  } catch {
    text = new TextDecoder("euc-kr", { fatal: false }).decode(buffer);
  }

  const html = extractHtmlFromMht(text);
  return parseClaimReportHtml(html, text);
}

/**
 * Parse HTML / text content to extract claim fields
 */
export function parseClaimReportHtml(html: string, fallbackRaw = ""): ParsedMhtClaimData {
  const result: ParsedMhtClaimData = {};

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Helper to extract text cleanly
  const clean = (str: string) => str?.replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim() || "";

  // 1. Table cell key-value finder
  const cells = Array.from(doc.querySelectorAll("th, td"));
  
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    const cellText = clean(cell.textContent || "");

    // Find next non-empty cell in DOM or table row
    const getNextVal = (): string => {
      // Look at next sibling
      let next = cell.nextElementSibling;
      while (next) {
        const val = clean(next.textContent || "");
        if (val) return val;
        next = next.nextElementSibling;
      }
      // Or look at next cell in array
      if (i + 1 < cells.length) {
        return clean(cells[i + 1].textContent || "");
      }
      return "";
    };

    // 상호(성명) / 소비자명 / 고객명
    if (/^(?:상호\s*\(성명\)|상호명|소비자명|고객명|성명)$/i.test(cellText) || cellText.includes("상호(성명)")) {
      const val = getNextVal();
      if (val && !result.customerName) {
        result.customerName = val;
      }
    }

    // 제품명
    if (/^제품명$/i.test(cellText) || (cellText.includes("제품명") && !cellText.includes("클레임"))) {
      const val = getNextVal();
      if (val && !result.productName) {
        result.productName = val;
      }
    }

    // 제조번호 / Lot
    if (/^(?:제조번호|로트번호|LOT\s*NO|LOT번호)$/i.test(cellText)) {
      const val = getNextVal();
      if (val && !result.lotNumber) {
        result.lotNumber = val;
      }
    }

    // 사용기한 / 소비기한 / 유통기한
    if (/^(?:사용기한|소비기한|유통기한)$/i.test(cellText)) {
      const val = getNextVal();
      if (val && !result.expiryDate) {
        result.expiryDate = normalizeDate(val);
      }
    }

    // 접수일자
    if (/^(?:접수일자|접수일|클레임\s*접수일자)$/i.test(cellText)) {
      const val = getNextVal();
      if (val && !result.receivedAt) {
        result.receivedAt = normalizeDate(val);
      }
    }

    // 기안(작성)자 / 작성자 / 접수자 (CS 및 커뮤니케이션팀 인입 접수 담당자)
    if (/^(?:기안\(작성\)자|기안자|작성자|접수자)$/i.test(cellText)) {
      const val = getNextVal();
      if (val) {
        result.csHandler = val;
      }
    }

    // 기안(작성)부서 (커뮤니케이션팀 등 인입 접수 부서)
    if (/^(?:기안\(작성\)부서|기안부서|작성부서|부서)$/i.test(cellText)) {
      const val = getNextVal();
      if (val) {
        result.csDepartment = val;
      }
    }

    // 문서번호 (그룹웨어 인입 접수 전자결재 문서번호)
    if (/^문서번호$/i.test(cellText)) {
      const val = getNextVal();
      if (val) {
        result.incomingDocNumber = val;
      }
    }

    // 구매단위 및 수량
    if (/구매단위\s*(?:및\s*)?수량/i.test(cellText)) {
      const val = getNextVal();
      if (val) result.purchaseQuantity = val;
    }

    // 주소
    if (/^주소$/i.test(cellText)) {
      const val = getNextVal();
      if (val && !result.customerAddress) {
        result.customerAddress = val;
      }
    }

    // 외주처 / 생산공장
    if (/^(?:외주처|생산공장|제조공장)$/i.test(cellText)) {
      const val = getNextVal();
      if (val && !result.manufacturer) {
        result.manufacturer = val;
      }
    }

    // 불만사항
    if (/^불만사항$/i.test(cellText)) {
      const val = getNextVal();
      if (val) result.complaintType = val;
    }

    // 회수유무
    if (/회수유무/i.test(cellText)) {
      const val = getNextVal();
      if (val.includes("유") || /◎\s*유|●\s*유|\[O\]\s*유/i.test(val)) {
        result.hasSampleReturn = true;
      }
    }
  }

  // 2. Extract "(1) 접수내용" and "(2) 고객 불만 및 요청사항" sections
  const fullBodyText = doc.body ? doc.body.textContent || "" : html;
  
  // Section 1: 접수내용
  let receptionContent = "";
  const matchSec1 = fullBodyText.match(/(?:\(1\)\s*접수내용|1\.\s*접수내용|\[1\]\s*접수내용)([\s\S]*?)(?=(?:\(2\)|2\.|\[2\]|고객\s*불만|\n\n\n|$))/i);
  if (matchSec1) {
    receptionContent = clean(matchSec1[1]).replace(/^-+\s*/, "").trim();
  }

  // Section 2: 고객 불만 및 요청사항
  let requestContent = "";
  const matchSec2 = fullBodyText.match(/(?:\(2\)\s*고객\s*불만\s*(?:및\s*)?요청사항|2\.\s*고객[^\n]*|\[2\]\s*고객[^\n]*)([\s\S]*?)(?=(?:\(3\)|3\.|\[3\]|\n\n\n|$))/i);
  if (matchSec2) {
    requestContent = clean(matchSec2[1]).replace(/^-+\s*/, "").trim();
  }

  // 3. Fallback regex on raw text if table parsing missed crucial items
  const allText = fullBodyText + "\n" + fallbackRaw;

  // Title pattern e.g. 클레임 보고서(약국명(소비자명)-제품명) or 클레임 보고서(GS25서면경암점-썬키스트)
  if (!result.customerName || !result.productName) {
    const titleMatch = allText.match(/클레임\s*보고서\s*\(([^)]+)\)/i);
    if (titleMatch) {
      const inner = titleMatch[1];
      const parts = inner.split("-");
      if (parts.length >= 2) {
        if (!result.customerName && parts[0].trim() !== "약국명(소비자명)") {
          result.customerName = parts[0].trim();
        }
        if (!result.productName && parts[1].trim() !== "제품명") {
          result.productName = parts[1].trim();
        }
      }
    }
  }

  // Regex fallbacks for fields
  if (!result.productName) {
    const m = allText.match(/제품명\s*[:\t|]\s*([^\n\r\t|]+)/);
    if (m && m[1].trim()) result.productName = m[1].trim();
  }
  if (!result.customerName) {
    const m = allText.match(/(?:상호\(성명\)|상호명|소비자명)\s*[:\t|]\s*([^\n\r\t|]+)/);
    if (m && m[1].trim()) result.customerName = m[1].trim();
  }
  if (!result.receivedAt) {
    const m = allText.match(/접수일자\s*[:\t|]\s*([0-9]{4}[.\-/][0-9]{1,2}[.\-/][0-9]{1,2})/);
    if (m && m[1].trim()) result.receivedAt = normalizeDate(m[1].trim());
  }
  if (!result.expiryDate) {
    const m = allText.match(/(?:사용기한|소비기한|유통기한)\s*[:\t|]\s*([0-9]{4}[.\-/][0-9]{1,2}[.\-/][0-9]{1,2})/);
    if (m && m[1].trim()) result.expiryDate = normalizeDate(m[1].trim());
  }
  if (!result.docNumber) {
    const m = allText.match(/문서번호\s*[:\t|]\s*([^\n\r\t|]+)/);
    if (m && m[1].trim()) result.docNumber = m[1].trim();
  }

  // 4. Combine into comprehensive claimDetails
  const detailParts: string[] = [];
  if (result.complaintType) {
    detailParts.push(`[불만 사항] ${result.complaintType}`);
  }
  if (receptionContent) {
    detailParts.push(`[접수 내용] ${receptionContent}`);
  }
  if (requestContent) {
    detailParts.push(`[고객 요청사항] ${requestContent}`);
  }
  if (result.purchaseQuantity || result.customerAddress) {
    const loc = [result.purchaseQuantity ? `수량: ${result.purchaseQuantity}` : "", result.customerAddress ? `구입/배송처: ${result.customerAddress}` : ""].filter(Boolean).join(" / ");
    if (loc) detailParts.push(`[구매 정보] ${loc}`);
  }

  if (detailParts.length > 0) {
    result.claimDetails = detailParts.join("\n\n");
  } else if (result.complaintType) {
    result.claimDetails = result.complaintType;
  }

  // Set channel
  const csDept = result.csDepartment || "커뮤니케이션팀";
  const subInfo = [
    result.csHandler ? `접수자: ${result.csHandler}` : "",
    result.incomingDocNumber ? `접수번호: ${result.incomingDocNumber}` : "",
  ].filter(Boolean);

  if (subInfo.length > 0) {
    result.channel = `${csDept} 접수 (${subInfo.join(", ")})`;
  } else {
    result.channel = `${csDept} 접수 (그룹웨어 전자결재)`;
  }

  // 조사는 언제나 식품품질경영팀에서 수행
  result.department = "식품품질경영팀";

  return result;
}
