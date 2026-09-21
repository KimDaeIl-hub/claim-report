import { ReportData, PhotoAttachment } from "../types";

const DB_NAME = "FoodQcReportDb";
const DB_VERSION = 1;
const STORE_NAME = "drafts";
const DRAFT_KEY = "active_report";
export const DRAFT_STORAGE_KEY = "food_qc_draft_report";

// Simple native IndexedDB helper (safe in iframes and modern browsers)
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB not supported"));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveReportToDb(report: ReportData): Promise<void> {
  // 1. Try IndexedDB (handles large images seamlessly without quota limits)
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(report, DRAFT_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("IndexedDB save note:", err);
  }

  // 2. Also try localStorage for instant synchronous recovery
  try {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(report));
  } catch (err) {
    // If localStorage quota is reached, do NOT strip photos from memory or IndexedDB!
    console.warn("Notice: LocalStorage quota reached. IndexedDB will maintain full draft with photos.", err);
  }
}

export async function loadReportFromDb(): Promise<ReportData | null> {
  // 1. Try IndexedDB first (most complete, preserves high-res photos)
  try {
    const db = await openDatabase();
    const data = await new Promise<ReportData | null>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(DRAFT_KEY);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
    if (data && typeof data === "object") {
      return data;
    }
  } catch (err) {
    console.warn("IndexedDB load note:", err);
  }

  // 2. Fallback to localStorage
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("LocalStorage load note:", err);
  }

  return null;
}

// Check if a photo is valid user-uploaded photo
export const isUserPhoto = (p: any): boolean =>
  Boolean(
    p &&
    typeof p.url === "string" &&
    p.url.trim() !== "" &&
    !p.url.includes("unsplash.com") &&
    !p.url.includes("placeholder")
  );

/**
 * Merges a preset into the current report while STRICTLY PRESERVING
 * all photos uploaded by the user and existing customer information.
 */
export function mergePresetData(currentReport: ReportData, presetData: Partial<ReportData>): ReportData {
  // Extract all existing user-attached photos
  const existingCustomerPhotos = (currentReport.customerClaim?.customerPhotos || []).filter(isUserPhoto);
  const existingLotPhotos = (currentReport.lotHistory?.retainedSamplePhotos || []).filter(isUserPhoto);
  const existingAtt1 = (currentReport.attachments?.attachment1Photos || []).filter(isUserPhoto);
  const existingAtt2 = (currentReport.attachments?.attachment2Photos || []).filter(isUserPhoto);
  const existingAtt3 = (currentReport.attachments?.attachment3Photos || []).filter(isUserPhoto);

  const merged: ReportData = {
    ...currentReport,
    ...presetData,
    id: currentReport.id,
    docNumber: currentReport.docNumber || presetData.docNumber,
    companyLogoUrl: currentReport.companyLogoUrl || presetData.companyLogoUrl,
    customerClaim: {
      ...presetData.customerClaim,
      // Preserve customer contact info if user already typed it
      customerName: currentReport.customerClaim?.customerName || presetData.customerClaim?.customerName || "",
      contact: currentReport.customerClaim?.contact || presetData.customerClaim?.contact || "",
      channel: currentReport.customerClaim?.channel || presetData.customerClaim?.channel || "고객상담센터 (유선 접수)",
      receivedAt: currentReport.customerClaim?.receivedAt || presetData.customerClaim?.receivedAt || "",
      // Keep customer photos!
      customerPhotos: existingCustomerPhotos.length > 0
        ? existingCustomerPhotos
        : ((presetData.customerClaim?.customerPhotos || []).filter(isUserPhoto)),
    },
    lotHistory: {
      ...presetData.lotHistory,
      // Keep lot photos!
      retainedSamplePhotos: existingLotPhotos.length > 0
        ? existingLotPhotos
        : ((presetData.lotHistory?.retainedSamplePhotos || []).filter(isUserPhoto)),
    },
    attachments: {
      attachment1Photos: existingAtt1.length > 0
        ? existingAtt1
        : ((presetData.attachments?.attachment1Photos || []).filter(isUserPhoto)),
      attachment2Photos: existingLotPhotos.length > 0
        ? existingLotPhotos
        : (existingAtt2.length > 0
            ? existingAtt2
            : ((presetData.attachments?.attachment2Photos || []).filter(isUserPhoto))),
      attachment3Photos: existingAtt3.length > 0
        ? existingAtt3
        : ((presetData.attachments?.attachment3Photos || []).filter(isUserPhoto)),
    },
  };

  return merged;
}
