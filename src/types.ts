export interface PhysicochemicalItem {
  id: string;
  testDate?: string; // 시험일자 (예: 2026.03.03, 출하 시점일 등)
  name: string; // 성상, pH, Brix, 산도, 비중 등
  unit: string;
  standard: string; // 기준치 (예: 3.20 ~ 3.60)
  controlValue: string; // 정상 보관품 수치
  sampleValue: string; // 회수 현품 측정치
  judgment: '적합' | '부적합' | '해당없음';
  remarks?: string; // 비고 (출하 시점 / 현시점 등 수동 기입)
}

export interface AdditionalTestItem {
  id: string;
  title: string;
  result: string;
  includePrinciple: boolean;
  principleText: string;
  skipped: boolean;
}

export interface PhotoAttachment {
  id: string;
  url: string;
  caption: string;
  stepName?: string;
}

export interface ReportData {
  id: string;
  title: string;
  docNumber: string;
  issueDate: string;
  companyName: string;
  companyLogoUrl?: string;
  companyAddress?: string;
  companyTel?: string;
  companyFax?: string;
  researcherName?: string;
  department: string;
  teamLeader: string;
  sealType: 'seal' | 'signature' | 'none';
  customSealUrl?: string;
  greetingIntro?: string;

  // [1] 고객 및 클레임 접수 정보
  customerClaim: {
    receivedAt: string;
    sampleReceivedDate?: string;
    customerName: string;
    maskCustomerName: boolean;
    contact?: string;
    channel: string;
    claimDetails: string;
    customerPhotos: PhotoAttachment[];
  };

  // [2] 접수 제품 정보
  productInfo: {
    productName: string;
    lotNumber: string;
    manufactureDate: string;
    expiryDate: string;
    manufacturer: string;
    packageType: string;
  };

  // [3] 정밀 분석 결과 (각 항목별 Skip 및 원리 토글)
  analysisResults: {
    // 1. 현품 확인
    visualInspection: {
      skipped: boolean;
      sampleCondition: string;
      foreignObjectAppearance: string;
      includePrinciple: boolean;
      principleText: string;
    };
    // 2. 확대경 조사
    magnifierInspection: {
      skipped: boolean;
      magnification: string;
      result: string;
      includePrinciple: boolean;
      principleText: string;
    };
    // 3. 광학 현미경 조사
    opticalMicroscope: {
      skipped: boolean;
      magnification: string;
      result: string;
      includePrinciple: boolean;
      principleText: string;
    };
    // 4. FT-IR 적외선 분광 분석
    ftirAnalysis: {
      skipped: boolean;
      summary: string;
      matchedMaterial: string;
      similarity: string;
      includePrinciple: boolean;
      principleText: string;
    };
    // 5. XRF X선 형광 분석
    xrfAnalysis: {
      skipped: boolean;
      elementsRatio: string;
      summary: string;
      includePrinciple: boolean;
      principleText: string;
    };
    // 6. 이화학 분석 (테이블)
    physicochemicalAnalysis: {
      skipped: boolean;
      testDate: string;
      sampleClass: string;
      items: PhysicochemicalItem[];
      summary: string;
      includePrinciple: boolean;
      principleText: string;
    };
    // 7. 카탈라아제(Catalase) 시험
    catalaseTest: {
      skipped: boolean;
      resultJudgement: string; // 유기물/생물체/가열 여부
      reactionDetail: string;
      includePrinciple: boolean;
      principleText: string;
    };
    // 8. 기타 추가 시험 항목
    additionalTests: AdditionalTestItem[];
  };

  // [4] 제조공정 분석
  manufacturingProcess: {
    skipped: boolean;
    processFlow: string; // 텍스트 및 흐름도
    processSteps: string[];
    filtrationAnalysis: string; // 여과망 Mesh 규격 및 제어 설명
    cleaningAnalysis: string; // 용기/캡 세척 공정 설명
    criticalControlPoint: string; // 클레임 발생 유력 지점 연계 분석
    highlightedStep: string;
  };

  // [5] 동일 Lot 제조 및 품질검사 이력
  lotHistory: {
    skipped: boolean;
    productionLogNote: string; // 생산일지 특이사항
    qualityTestRecord: string; // 완제품 성적서 적합 여부
    priorClaimsCount: string; // 동일 Lot 이전 클레임 접수 이력
    retainedSampleCheck: string; // 당사 보관품 확인 결과
    retainedSamplePhotos: PhotoAttachment[];
  };

  // [6] 원인 분석 및 재발방지대책
  rootCauseAndActions: {
    skipped: boolean;
    rootCause: string; // 종합 원인 판정
    preventiveMeasuresSkipped: boolean; // 재발방지대책 개별 Skip 가능
    preventiveMeasures: string; // 재발방지대책
  };

  // [7] 결론 및 맺음말
  conclusion: {
    summaryPoints: string[]; // 가, 나, 다 핵심 요약
    apologyText: string; // 고객 안심 및 사과 문구
    closingRemarks: string;
  };

  // [8] 첨부 문서 (사진 그리드)
  attachments: {
    attachment1Photos: PhotoAttachment[]; // 현품 외관, 이물 확대, FT-IR 그래프
    attachment2Photos: PhotoAttachment[]; // 동일 Lot 보관품
    attachment3Photos: PhotoAttachment[]; // 주요 공정 사진
  };
}

export interface StandardPhrase {
  id: string;
  fieldKey: string;
  title: string;
  content: string;
  category?: string; // 'foreign_object' | 'spoilage' | 'precipitate' | 'leak' | 'swelling' | 'test_principle' | 'general'
  presetId?: string; // optional linked preset ID
  isCustom?: boolean;
}

export interface SavedReportSummary {
  id: string;
  title: string;
  docNumber: string;
  customerName: string;
  productName: string;
  claimType: string;
  updatedAt: string;
}

export type PresetScope = "all" | "in_house" | "oem";
export type PresetSubCategory =
  | "all"
  | "breakage" // 파손
  | "cap" // 캡불량
  | "spoilage" // 변질
  | "foreign" // 혼입 (이물)
  | "quantity" // 수량부족
  | "fill" // 충전불량
  | "packaging"; // 포장불량 (용기/라벨)

export interface ClaimPreset {
  id: string;
  name: string;
  badgeColor?: string;
  description: string;
  category?: string;
  scope?: "in_house" | "oem"; // 자사 vs 외주
  subCategory?: PresetSubCategory; // 파손, 캡불량, 변질, 혼입, 수량부족, 충전불량, 포장불량
  isCustom?: boolean;
  isBuiltin?: boolean;
  linkedPhraseIds?: string[];
  data: Partial<ReportData>;
}
