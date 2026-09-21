import { ReportData, ClaimPreset } from "../types";
import { OEM_CLAIM_PRESETS } from "./oemPresets";

export const INITIAL_REPORT_DATA: ReportData = {
  id: "rep-kwangdong-glass-001",
  title: "“병 제품 (100ml)” 유리 파손 및 이물 클레임 조사 보고의 건.",
  docNumber: "광동 QM 2026-B01",
  issueDate: "2026-06-22",
  companyName: "광동제약주식회사",
  companyLogoUrl: "",
  companyAddress: "우 17784 경기도 평택시 경기대로 1081 광동제약㈜",
  companyTel: "전화 (031)8093-1813",
  companyFax: "FAX (031)668-8365",
  researcherName: "담당 연구원 김진영 대리",
  department: "식품품질경영팀",
  teamLeader: "신준호",
  sealType: "signature",
  greetingIntro:
    "항상 저희 제품을 애용해 주셔서 진심으로 감사 드립니다.\n당사 제품과 관련하여 고객께서 문의해 주신 사항에 대해 해당 제품의 제조 이력 조사 및 정밀 파손 단면 분석을 실시하였습니다. 이에 대한 조사와 분석 결과를 아래와 같이 안내해 드립니다.",

  customerClaim: {
    receivedAt: "2026-06-20",
    sampleReceivedDate: "2026-06-22",
    customerName: "김민수",
    maskCustomerName: false,
    channel: "고객상담센터 (유선 접수)",
    claimDetails:
      "10입 케이스 포장된 병 제품을 개봉하여 음용 중 병 내부에서 반짝이는 유리 조각 같은 이물이 발견되어 음용을 즉시 중단하고 고객센터로 인입됨. 섭취에 따른 인체 위해 증상은 없다고 진술함.",
    customerPhotos: [],
  },

  productInfo: {
    productName: "병 제품 (100ml)",
    lotNumber: "LOT-26F20-V1",
    manufactureDate: "2026-06-15",
    expiryDate: "2027-06-14",
    manufacturer: "광동제약 평택공장 음료 1호 유리병 충전라인",
    packageType: "갈색 유리병 (28mm 알루미늄 ROPP 캡)",
  },

  analysisResults: {
    visualInspection: {
      skipped: false,
      sampleCondition:
        "회수된 현품 잔여량 약 80ml 확인됨. 병 동체부 측면에 외부 충격에 의한 타격점(Hitted mark)이 명확히 관찰되며, 병 내부에서 길이 약 4.2mm x 폭 1.8mm 크기의 유리 파편 1점이 확인됨.",
      foreignObjectAppearance:
        "투명 황갈색 유리 파편으로, 날카로운 파단면을 형성하고 있으며 타격점 중심부에서 방사형으로 뻗어나간 원호 형태의 물결무늬(Ripple marks / 콘코이달 단면)가 뚜렷하게 관찰됨.",
      includePrinciple: false,
      principleText: "",
    },
    magnifierInspection: {
      skipped: false,
      magnification: "20x ~ 40x 정밀 확대경",
      result:
        "유리병 외면에 국소적 압력 집중으로 인한 '타격점(Hitted mark)'이 명확하며, 타격점으로부터 내부로 균열이 관통된 외부 물리적 충격에 의한 파손 특성을 나타냄. 공병 성형 시 발생하는 기포나 불용성 이물 결함은 관찰되지 않음.",
      includePrinciple: true,
      principleText:
        "※ 확대경 파선 분석 원리: 광학 렌즈계를 통하여 외력 집중 지점(타격점, Hitted mark) 및 파괴 진행 방향선(Wallner line, 원호형 물결무늬)을 추적하여 제조 공정상 결함인지 유통·보관 중 외력 충격인지를 감식합니다.",
    },
    opticalMicroscope: {
      skipped: false,
      magnification: "100x 광학 현미경",
      result:
        "파편의 단면이 열에 의해 둥글게 융착된 유리병 제조 시 흡착물이 아니며, 상온 상태에서 기계적 외력 충격에 의해 순간적으로 깨진 날카로운 취성 파단면(Brittle Fracture) 형상임을 확인.",
      includePrinciple: true,
      principleText:
        "※ 광학 현미경 원리: 고배율 광학 분석을 통해 유리 파편 모서리의 용융 여부를 확인하여 공병 제병 공정 흡착물인지 유통 취급 중 발생한 기계적 파손 조각인지를 명확히 판별합니다.",
    },
    ftirAnalysis: {
      skipped: true,
      summary: "",
      matchedMaterial: "",
      similarity: "",
      includePrinciple: false,
      principleText: "",
    },
    xrfAnalysis: {
      skipped: true,
      elementsRatio: "",
      summary: "",
      includePrinciple: false,
      principleText: "",
    },
    physicochemicalAnalysis: {
      skipped: true,
      testDate: "",
      sampleClass: "",
      items: [],
      summary: "",
      includePrinciple: false,
      principleText: "",
    },
    catalaseTest: {
      skipped: true,
      resultJudgement: "",
      reactionDetail: "",
      includePrinciple: false,
      principleText: "",
    },
    additionalTests: [],
  },

  manufacturingProcess: {
    skipped: false,
    processFlow:
      "공병 입고/검사 → 고압 린서(세병기) 전도 세척 → 여과된 조제액 충전 → ROPP 캡핑 → FBI(Full Bottle Inspector) 바닥이물/액위 검사 → 라벨링 → 인카토너(10입) 포장 → 중량선별기 → 박스(100입) 적재",
    processSteps: [
      "공병 공급 및 외관 검사",
      "고압 반전 세병(Rinser)",
      "3㎛ 정밀 여과 및 정밀 충전",
      "ROPP 캡핑(토크 제어)",
      "FBI 광학 바닥이물 검사",
      "인카토너 자동 포장 및 중량선별",
    ],
    filtrationAnalysis:
      "음료 조제액은 3㎛ 마이크로 카트리지 필터를 통과하여 충전되므로 액상 배관을 통한 유리 혼입은 원천적으로 불가능함.",
    cleaningAnalysis:
      "충전 직전 고압 정제수 세병기(도치 세척)에서 거꾸로 세워 고압 세척되므로 공병 내 잔존 가능성 차단됨.",
    criticalControlPoint:
      "충전 후 FBI(Full Bottle Inspector) 검사기를 통해 병 바닥 이물 및 파손 여부를 광학 카메라로 100% 전수 검사하여 이상 제품 출하를 원천 차단하고 있음.",
    highlightedStep: "FBI 바닥이물 검사 및 인카토너 중량선별 공정",
  },

  lotHistory: {
    skipped: false,
    productionLogNote:
      "해당 Lot 생산 당일 설비 비상 정지나 유리병 깨짐 사고 이력 전혀 없으며, 세병기 수압 및 충전 압력 정상 범위 가동 기록 확인됨.",
    qualityTestRecord:
      "완제품 시험성적서 상 이물, 성상, 용량, 캡핑 기밀도 전 항목 적합 출하 판정 확인.",
    priorClaimsCount: "동일 Lot(생산량 120,000병) 내 유사 유리 파손 관련 이전 클레임 접수 이력 없음 (0건).",
    retainedSampleCheck:
      "당사 공장 보관품(동일 Lot 50병) 무작위 전수 정밀 검사 결과, 타격점 및 유리 파손이나 이물 혼입 0건으로 정상 상태 유지 확인.",
    retainedSamplePhotos: [],
  },

  rootCauseAndActions: {
    skipped: false,
    rootCause:
      "유리 파편 단면의 원호 형태 물결무늬 및 병 외면의 명확한 타격점(Hitted mark)으로 볼 때, 제조 공정상의 불량이 아니며 유통 및 물류 취급 과정(10입 케이스 내 병끼리 충돌 또는 100입 외박스 운반 중 외부 충격)에서 발생한 외력 파손으로 최종 판정됨. (식품위생법 제46조에 따른 '식품 이물보고 대상'으로 신속 규정 준수 조치 완료)",
    preventiveMeasuresSkipped: false,
    preventiveMeasures:
      "1. [공병 공급사 관리 강화] 공병 입고 시 기포, 내압 강도, 불용성 이물에 대한 샘플링 수입 검사 기준 강화(AQL 0.65 적용).\n2. [물류 포장 완충성 개선] 10입 케이스 내부 간지 완충력 보강 및 물류센터 파렛트 적재 높이 제한, 운송 충격 완화 가이드라인 배포.\n3. [법적 이물보고 규정 준수] 유리 이물 특성에 따라 관할 행정관청 신속 보고 및 신속 회수 프로세스 준수.",
  },

  conclusion: {
    summaryPoints: [
      "가. 현품 정밀 광학 검사 결과, 병 외면에 타격점(Hitted mark)과 원호형 물결무늬가 뚜렷하여 유통·운반 중 외부 물리적 충격에 의해 발생한 파손 조각임을 확인하였습니다.",
      "나. 당사 평택공장 제조 라인은 고압 반전 세병, 3㎛ 정밀 여과, FBI(Full Bottle Inspector) 바닥 이물 전수 검사를 가동하고 있어 제조 과정 중 유리 파편 혼입은 원천 불가함을 입증하였습니다.",
      "다. 공장 동일 Lot 보관품 50병 전수 조사 결과 파손 및 유리 이물 혼입은 전혀 발견되지 않아 제품 전반의 제조 무결성을 확증하였습니다.",
    ],
    apologyText:
      "제품 파손 및 유리 조각 발견으로 고객님께 큰 불안과 불편을 끼쳐드려 머리 숙여 깊이 사과드립니다. 고객님의 안전을 최우선으로 하여 유통 물류 완충 관리 및 공병 강도 검사를 더욱 엄격히 시행하도록 하겠습니다.",
    closingRemarks: "2026년 6월 22일\n광동제약주식회사 식품품질경영팀",
  },

  attachments: {
    attachment1Photos: [],
    attachment2Photos: [],
    attachment3Photos: [],
  },
};

export const CLAIM_PRESETS: ClaimPreset[] = [
  // 1. [자사-병] 파손 및 유리이물
  {
    id: "preset-bottle-glass-breakage",
    name: "1. [자사-병] 파손 및 유리어물 혼입",
    description: "유통 중 병간 충돌/운반 충격 타격점(Hitted mark) 및 원호형 물결무늬 파손 분석 (식품 이물보고 대상)",
    badgeColor: "bg-red-100 text-red-800 border-red-300",
    category: "자사 제품 (병)",
    scope: "in_house",
    subCategory: "breakage",
    isBuiltin: true,
    data: INITIAL_REPORT_DATA,
  },

  // 2. [자사-병] 캡불량 (스와빙오일 탄화 이물)
  {
    id: "preset-bottle-cap-swabbing-oil",
    name: "2. [자사-병] 캡 불량 (캡 라이너 스와빙오일 탄화 이물)",
    description: "공병사/캡 제조사 성형 공정 중 윤활유(Swabbing Oil) 고온 탄화로 캡 라이너 접촉부에 부착된 공급사 불량",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    category: "자사 제품 (병)",
    scope: "in_house",
    subCategory: "cap",
    isBuiltin: true,
    data: {
      title: "“병 제품 (100ml)” 캡 내 흑색 이물(스와빙오일) 클레임 조사 보고의 건.",
      docNumber: "광동 QM 2026-B02",
      customerClaim: {
        receivedAt: "2026-06-18",
        sampleReceivedDate: "2026-06-20",
        customerName: "이정훈",
        maskCustomerName: false,
        channel: "고객상담센터 (유선 접수)",
        claimDetails:
          "병 제품 캡을 개봉하여 마시려던 중 캡 안쪽 흰색 라이너 테두리 부위에 검은 점 같은 이물질이 여러 개 묻어 있는 것을 발견하고 이물감과 위생 불안으로 접수함.",
        customerPhotos: [],
      },
      productInfo: {
        productName: "병 제품 (100ml)",
        lotNumber: "LOT-26E28-V2",
        manufactureDate: "2026-05-28",
        expiryDate: "2027-05-27",
        manufacturer: "광동제약 평택공장 음료 1호 라인",
        packageType: "갈색 유리병 (28mm 알루미늄 캡)",
      },
      analysisResults: {
        visualInspection: {
          skipped: false,
          sampleCondition: "회수된 캡 내부 검사 결과, 병구와 직접 밀착되는 흰색 실링 라이너 원주부에 0.2~0.5mm 크기의 흑색 미세 반점 4점이 흡착되어 있음.",
          foreignObjectAppearance: "흑색의 탄화물 형태로, 분말상 부착이 아닌 라이너 수지 표면에 열융착된 미세 탄화 유기물 성상.",
          includePrinciple: false,
          principleText: "",
        },
        magnifierInspection: {
          skipped: false,
          magnification: "30x 실체현미경",
          result: "캡 라이너 표면 성형 시 고온 압착되면서 융착된 기름 탄화 흔적 확인. 곰팡이나 생체 조직(곤충 파편)은 전혀 아님.",
          includePrinciple: true,
          principleText: "※ 확대경 정밀 관찰을 통해 이물의 표면 흡착 상태 및 열에 의한 탄화(Caramelized oil) 형상을 확인합니다.",
        },
        opticalMicroscope: {
          skipped: false,
          magnification: "200x 광학 현미경",
          result: "비결정질 유기 탄화물로 판명. 유리병 성형 및 캡 드로잉 공정에서 금형 이형 윤활제로 사용하는 스와빙 오일(Swabbing Oil)의 고온 탄화 파편과 일치.",
          includePrinciple: false,
          principleText: "",
        },
        ftirAnalysis: {
          skipped: true,
          summary: "",
          matchedMaterial: "",
          similarity: "",
          includePrinciple: false,
          principleText: "",
        },
        xrfAnalysis: {
          skipped: true,
          elementsRatio: "",
          summary: "",
          includePrinciple: false,
          principleText: "",
        },
        physicochemicalAnalysis: {
          skipped: true,
          testDate: "",
          sampleClass: "",
          items: [],
          summary: "",
          includePrinciple: false,
          principleText: "",
        },
        catalaseTest: {
          skipped: true,
          resultJudgement: "",
          reactionDetail: "",
          includePrinciple: false,
          principleText: "",
        },
        additionalTests: [],
      },
      manufacturingProcess: {
        skipped: false,
        processFlow: "캡 입고 → 정전기 집진 및 에어 린싱 → 자동 캡핑기 공급 → 충전 용기 실링",
        processSteps: ["캡 입고 및 수입 검사", "에어 블로워 린싱", "자동 피더 이송", "ROPP 캡핑 실링"],
        filtrationAnalysis: "음료 조제액은 3㎛ 필터를 거쳐 청정 충전되므로 액체 내 유입은 아님.",
        cleaningAnalysis: "캡 공급 라인 에어 집진 린서 필터 차압 정상 가동 중.",
        criticalControlPoint: "캡 제조사 성형 공정 중 윤활유 관리 기준 및 당사 캡 세정 공정 관리 기준.",
        highlightedStep: "캡 성형 공정 및 에어 블로워 린싱 공정",
      },
      lotHistory: {
        skipped: false,
        productionLogNote: "생산일지 확인 결과 캡핑기 압력 및 회전 토크 정상. 특이사항 없음.",
        qualityTestRecord: "완제품 관능 및 기밀 시험 전 항목 적합.",
        priorClaimsCount: "동일 캡 Lot 입고분 중 유사 흑색 이물 접수 이력 1건 존재.",
        retainedSampleCheck: "당사 보관품 30병 확인 결과 캡 라이너 이상 없으며 청결 상태 유지.",
        retainedSamplePhotos: [],
      },
      rootCauseAndActions: {
        skipped: false,
        rootCause:
          "공급사(캡 및 공병 제조사)의 캡 성형 공정에서 펀치 금형에 도포되는 스와빙 오일(Swabbing Oil)이 고온 조건에서 국소 탄화되어 캡 라이너 성형부에 흡착 잔류한 공급자 원자재 불량 건으로 최종 판정됨.",
        preventiveMeasuresSkipped: false,
        preventiveMeasures:
          "1. [공급사 시정조치 요구(CAR)] 캡 제조업체에 스와빙 오일 자동 정량 도포 장치 점검 및 금형 고온 탄화물 정기 세척 주기 단축 공문 발송.\n2. [입고 검사 강화] 캡 수입 검사 시 라이너 테두리 고배율 현미경 검사 기준 신설 및 전수 세척 에어 노즐 압력 상향.",
      },
      conclusion: {
        summaryPoints: [
          "가. 캡 안쪽 흑색 이물은 캡 제조 과정에서 금형 윤활유인 스와빙 오일이 고온 탄화된 미세 흔적으로 확인되었습니다.",
          "나. 곰팡이나 생체 이물이 아니며 내용액에는 아무런 위해성이 없음을 확인하였습니다.",
          "다. 캡 공급사에 엄중한 품질 시정 요구(CAR)를 발행하고 입고 검사를 대폭 강화하였습니다.",
        ],
        apologyText:
          "캡 라이너 마감 불량으로 불쾌감과 염려를 끼쳐드려 깊이 사과드립니다. 원부자재 협력사 품질 감사를 강화하여 완벽한 포장재만 사용되도록 만전을 기하겠습니다.",
        closingRemarks: "2026년 6월 20일\n광동제약주식회사 식품품질경영팀",
      },
      attachments: { attachment1Photos: [], attachment2Photos: [], attachment3Photos: [] },
    },
  },

  // 3. [자사-병] 기밀해제에 따른 곰팡이 발생건
  {
    id: "preset-bottle-mold-vacuum-loss",
    name: "3. [자사-병] 기밀해제에 따른 곰팡이 변질 (캡 미세회전/내압 0kPa)",
    description: "병 제품에서 다빈도 발생. 유통 중 캡 미세회전 또는 외부 충격으로 기밀 해제되어 호기성 곰팡이 증식",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    category: "자사 제품 (병)",
    scope: "in_house",
    subCategory: "spoilage",
    isBuiltin: true,
    data: {
      title: "“병 제품 (100ml)” 기밀해제 및 곰팡이 변질 클레임 조사 보고의 건.",
      docNumber: "광동 QM 2026-B03",
      customerClaim: {
        receivedAt: "2026-06-15",
        sampleReceivedDate: "2026-06-17",
        customerName: "박선우",
        maskCustomerName: false,
        channel: "고객상담센터 (유선 접수)",
        claimDetails:
          "매장에서 병 제품을 구매하여 개봉하였는데 액상 표면에 짙은 검은색 솜털 같은 덩어리(곰팡이)가 떠 있고 시큼한 변질취가 발생하여 음용하지 않고 접수함.",
        customerPhotos: [],
      },
      productInfo: {
        productName: "병 제품 (100ml)",
        lotNumber: "LOT-26D10-S1",
        manufactureDate: "2026-04-10",
        expiryDate: "2028-04-09",
        manufacturer: "광동제약 평택공장 탕류 전문라인",
        packageType: "갈색 유리병 (28mm 알루미늄 ROPP 캡)",
      },
      analysisResults: {
        visualInspection: {
          skipped: false,
          sampleCondition: "회수 현품 확인 결과 캡 브릿지가 미세하게 늘어나 있으며, 외관상 닫혀 있으나 캡이 살짝 돌아가 기밀이 해제된 상태임. 잔여액 상부에 직경 약 15mm의 균사체 덩어리 관찰됨.",
          foreignObjectAppearance: "흑갈색의 부유성 유기물로 전형적인 호기성 진균류(곰팡이) 군집 형성.",
          includePrinciple: false,
          principleText: "",
        },
        magnifierInspection: {
          skipped: false,
          magnification: "40x 실체현미경",
          result: "캡 널링(Knurling) 및 스크류부에 개봉 방향으로 살짝 회전된 마찰 흔적 확인됨. 용기 입구부 기밀 링 압착력이 상실되어 있음.",
          includePrinciple: true,
          principleText: "※ 캡 스크류 및 라이너 인덴테이션 검사: 캡이 미세하게 돌아간 경우 외관상 정상처럼 보이나 진공이 파괴되어 외기가 유입됩니다.",
        },
        opticalMicroscope: {
          skipped: false,
          magnification: "200x 광학 현미경",
          result: "진균류(Aspergillus / Penicillium 속 추정)의 균사(Hyphae) 및 격벽 구조, 포자낭이 명확히 관찰됨. 외부 공기 유입 후 증식한 전형적인 호기성 곰팡이임.",
          includePrinciple: true,
          principleText: "※ 광학 현미경 균사 검사: 곰팡이 고유의 균사체와 포자 구조를 고배율로 확인하여 진균류 증식 여부를 규명합니다.",
        },
        ftirAnalysis: { skipped: true, summary: "", matchedMaterial: "", similarity: "", includePrinciple: false, principleText: "" },
        xrfAnalysis: { skipped: true, elementsRatio: "", summary: "", includePrinciple: false, principleText: "" },
        physicochemicalAnalysis: {
          skipped: false,
          testDate: "2026-06-17",
          sampleClass: "현품 vs 당사 정상 보관품",
          items: [
            { id: "pc-b1", testDate: "2026.06.17", name: "내압 진공도 (Vacuum)", unit: "kPa", standard: "-6 kPa 이하", controlValue: "-30 kPa (진공 적합)", sampleValue: "0 kPa (기밀 완전 해제)", judgment: "부적합", remarks: "진공 게이지 직결 측정" },
            { id: "pc-b2", testDate: "2026.06.17", name: "pH (수소이온농도)", unit: "-", standard: "3.8 ~ 4.4", controlValue: "4.15", sampleValue: "3.48 (산패 강하)", judgment: "부적합", remarks: "호기성 발효 산성화" },
            { id: "pc-b3", testDate: "2026.06.17", name: "Brix (당도)", unit: "°Bx", standard: "13.0 ~ 15.0", controlValue: "14.2", sampleValue: "11.1 (균주 대사 소모)", judgment: "부적합", remarks: "당 성분 소모" },
          ],
          summary: "정상 보관품의 내압은 -30 kPa로 강력한 음압 진공을 유지하고 있으나, 현품은 0 kPa로 대기압과 동일하여 외부 공기가 지속 유입되었음이 과학적으로 입증됨.",
          includePrinciple: true,
          principleText: "※ 내압(진공도) 측정 원리: 당사 병 제품은 고온 충전 및 밀봉 후 냉각 수축으로 내부가 강한 음압(-30 kPa 이하)을 형성하며, 외부 공기가 유입되면 0 kPa로 진공이 파괴됩니다.",
        },
        catalaseTest: {
          skipped: false,
          resultJudgement: "호기성 진균류 카탈라아제 강양성 (Strong Positive)",
          reactionDetail: "분리된 곰팡이 덩어리에 3% 과산화수소수(H2O2) 적하 시 즉시 격렬한 산소 기포 발생 → 살아있는 생균 증식 확증.",
          includePrinciple: true,
          principleText: "※ 카탈라아제 시험: 가열 살균(100℃ 이상)된 음료 내 생균 증식 시 효소가 활성화되어 산소 기포가 발생하는 원리를 이용합니다.",
        },
        additionalTests: [],
      },
      manufacturingProcess: {
        skipped: false,
        processFlow: "원료 추출/농축 → 여과(3㎛) → 고온 살균(105℃, 30초) → 핫필링 충전 → ROPP 캡핑 → 진공 타격 검사기 → 전도 냉각 → 포장",
        processSteps: ["고온 가열 살균(105℃)", "무균 핫필링 충전", "스팀 진공 캡핑", "타격식 진공 검사기(Acoustic Vacuum Checker)", "급속 냉각 및 포장"],
        filtrationAnalysis: "추출액은 3㎛ 마이크로 필터를 거쳐 100% 맑게 정제 충전됨.",
        cleaningAnalysis: "충전 배관은 CIP(Clean-in-Place) 95℃ 열수 살균 표준 준수.",
        criticalControlPoint: "캡핑 직후 진공 검사기에서 캡 타격 음향 주파수를 분석하여 기밀 불량품을 100% 자동 선별 배출함.",
        highlightedStep: "고온 살균 및 진공 검사기 전수 판정 공정",
      },
      lotHistory: {
        skipped: false,
        productionLogNote: "생산 당일 살균 온도 F0값 기준 이상 유지, 진공 불량률 0.01% 미만으로 정상 출하 기록.",
        qualityTestRecord: "출하 검사 성적서 상 세균수 및 진균류 음성(무균) 확인.",
        priorClaimsCount: "동일 Lot 내 곰팡이 변질 클레임 접수 이력 없음 (0건).",
        retainedSampleCheck: "공장 동일 Lot 보관품 20병 검사 결과: 진공도 -30 kPa 유지, 곰팡이 및 변질 0건으로 완벽한 품질 상태 유지.",
        retainedSamplePhotos: [],
      },
      rootCauseAndActions: {
        skipped: false,
        rootCause:
          "당사 제조 공정은 105℃ 고온 살균 및 자동 진공 검사를 통해 100% 무균 출하되었으나, 유통 단계(약국/소매점 취급 또는 온장고 장기 보관 중 캡 충격, 또는 누군가 캡을 살짝 돌려놓은 미세 회전)에서 기밀이 해제(내압 0 kPa)되어 외기 중의 곰팡이 포자가 유입·증식한 것으로 최종 판정됨.",
        preventiveMeasuresSkipped: false,
        preventiveMeasures:
          "1. [캡핑 실링 토크 상향 관리] ROPP 캡 스크류 롤러 가압력을 정밀 튜닝하여 비틀림 저항 토크 강화.\n2. [유통점 온장고 보관 수칙 안내] 60℃ 이하 적정 온도 유지 및 2주 이내 판매 권장 가이드라인 지속 배포.",
      },
      conclusion: {
        summaryPoints: [
          "가. 현품의 내압 테스트 결과 0 kPa(진공 파괴)로 확인되어, 유통 중 캡 충격 또는 미세 개봉에 의해 기밀이 해제되었음을 입증하였습니다.",
          "나. 탕류 제품의 풍부한 영양원과 외부 유입된 공기(산소)가 결합하여 호기성 곰팡이가 2차 증식한 것으로 판정되었습니다.",
          "다. 당사 공장 보관품 전수 조사 결과 -30 kPa의 완벽한 진공과 무균 상태를 유지하고 있음을 확증하였습니다.",
        ],
        apologyText:
          "변질된 제품으로 고객님께 큰 불쾌감과 염려를 끼쳐드려 진심으로 사과드립니다. 유통 중 용기 밀봉이 훼손되지 않도록 완충 및 포장 품질 개선에 최선을 다하겠습니다.",
        closingRemarks: "2026년 6월 17일\n광동제약주식회사 식품품질경영팀",
      },
      attachments: { attachment1Photos: [], attachment2Photos: [], attachment3Photos: [] },
    },
  },

  // 4. [자사-병] 벌레 혼입 클레임 (카탈라아제 시험 & 식품이물보고)
  {
    id: "preset-bottle-insect-catalase",
    name: "4. [자사-병] 벌레 혼입 클레임 (카탈라아제 열변성 시험 & 식품이물보고)",
    description: "파리/벌레 혼입 클레임 시 카탈라아제 열변성(음성/양성) 시험으로 가열 살균 전후 혼입 판별 (식품 이물보고 대상)",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
    category: "자사 제품 (병)",
    scope: "in_house",
    subCategory: "foreign",
    isBuiltin: true,
    data: {
      title: "“병 제품 (100ml)” 곤충(파리) 혼입 클레임 조사 및 카탈라아제 시험 보고의 건.",
      docNumber: "광동 QM 2026-B04",
      customerClaim: {
        receivedAt: "2026-06-19",
        sampleReceivedDate: "2026-06-21",
        customerName: "최동원",
        maskCustomerName: false,
        channel: "고객상담센터 (유선 접수)",
        claimDetails:
          "병 제품 음용을 위해 뚜껑을 열고 컵에 따르던 중 검은색 벌레(파리) 1마리가 발견되어 경악하고 즉시 고객센터에 신고함. 현품 보존 중이라고 진술함.",
        customerPhotos: [],
      },
      productInfo: {
        productName: "병 제품 (100ml)",
        lotNumber: "LOT-26E15-S2",
        manufactureDate: "2026-05-15",
        expiryDate: "2028-05-14",
        manufacturer: "광동제약 평택공장 탕류 전문라인",
        packageType: "갈색 유리병 (28mm 알루미늄 캡)",
      },
      analysisResults: {
        visualInspection: {
          skipped: false,
          sampleCondition: "회수된 병 및 잔여액 내에서 약 6mm 크기의 흑색 파리류 성충 1개체 확인됨.",
          foreignObjectAppearance: "파리의 날개와 다리 형태가 온전하게 보존되어 있으며, 표면에 액상 점액이 부착되어 있음.",
          includePrinciple: false,
          principleText: "",
        },
        magnifierInspection: {
          skipped: false,
          magnification: "30x 실체현미경",
          result: "검정파리과(Calliphoridae) 성충으로 동정됨. 복부 체벽 손상이 거의 없고 날개 막 구조가 온전함.",
          includePrinciple: false,
          principleText: "",
        },
        opticalMicroscope: {
          skipped: false,
          magnification: "100x 현미경",
          result: "곤충 체벽의 열변성 및 파열 흔적이 관찰되지 않음.",
          includePrinciple: false,
          principleText: "",
        },
        ftirAnalysis: { skipped: true, summary: "", matchedMaterial: "", similarity: "", includePrinciple: false, principleText: "" },
        xrfAnalysis: { skipped: true, elementsRatio: "", summary: "", includePrinciple: false, principleText: "" },
        physicochemicalAnalysis: { skipped: true, testDate: "", sampleClass: "", items: [], summary: "", includePrinciple: false, principleText: "" },
        catalaseTest: {
          skipped: false,
          resultJudgement: "카탈라아제 활성 강양성 (Strong Positive) → 가열 살균 미노출 판정",
          reactionDetail:
            "수거된 곤충 시료에 3% H2O2 용액을 적하한 결과 즉각적이고 격렬한 산소 기포가 다량 발생함. 이는 곤충 생체 내 카탈라아제 효소가 고온 가열 살균(105℃)에 의해 불활성화되지 않은 '생체 효소 보존 상태'임을 완벽히 증명함.",
          includePrinciple: true,
          principleText:
            "※ 카탈라아제 효소 시험 원리: 곤충이 100℃ 이상의 제조 살균 공정을 거쳤다면 체내 카탈라아제 단백질이 영구 변성되어 H2O2 반응 시 기포가 전혀 발생하지 않습니다(음성). 반면 개봉 후 유입된 경우 효소가 살아있어 즉시 격렬한 기포를 발생시킵니다(양성).",
        },
        additionalTests: [
          {
            id: "add-fbi-1",
            title: "FBI(Full Bottle Inspector) 바닥이물 검출 시뮬레이션",
            result:
              "완제품 FBI 검사기 테스트 런 결과: 침강 이물은 100% 감지 리젝트되나, 병 제품 특유의 짙은 암갈색 농색 액상 및 액 표면 부유 이물의 경우 광학 투과율 한계가 존재함을 확인. 제조 공정 중 방충망, 에어커튼, 포충등 3중 차단망 운영의 절대적 중요성 재확인.",
            includePrinciple: false,
            principleText: "",
            skipped: false,
          },
        ],
      },
      manufacturingProcess: {
        skipped: false,
        processFlow: "원료 추출 → 3㎛ 마이크로 여과 → UHT 살균(105℃) → 클린룸 핫필링 충전 → 캡핑 → FBI 바닥 검사 → 포장",
        processSteps: ["밀폐 추출 및 정밀 여과(3㎛)", "105℃ 열처리 살균", "클린부스 양압 충전", "FBI 광학 바닥이물 검사"],
        filtrationAnalysis: "추출 라인은 3㎛ 여과 필터를 밀폐 통과하므로 성충 곤충의 배관 통과는 절대 불가능함.",
        cleaningAnalysis: "충전실은 Class 10,000 수준의 클린룸 양압 환경 유지 중.",
        criticalControlPoint: "포충등 24시간 모니터링 및 방충·방서 전문 기업(세스코) 정기 방제 관리.",
        highlightedStep: "UHT 살균(105℃) 및 클린룸 충전 공정",
      },
      lotHistory: {
        skipped: false,
        productionLogNote: "생산일지 확인 결과 충전실 양압 정상 유지, 포충등 모니터링상 파리류 포집 0마리 기록.",
        qualityTestRecord: "완제품 무균 시험 및 이물 검사 전 항목 적합.",
        priorClaimsCount: "동일 Lot 내 곤충 이물 클레임 접수 이력 없음 (0건).",
        retainedSampleCheck: "공장 보관품 50병 전수 투시 검사 결과 곤충 및 일체 이물 미검출 확인.",
        retainedSamplePhotos: [],
      },
      rootCauseAndActions: {
        skipped: false,
        rootCause:
          "카탈라아제 효소 반응 검사 결과 즉각적인 기포 발생(양성)을 확인하였으며, 이는 곤충이 당사의 105℃ 고온 살균 공정을 거치지 않은 '비가열 곤충'임을 과학적으로 입증함. 따라서 제조 공정 내 혼입이 아닌, 소비자가 캡을 개봉한 후 보관 또는 음용 준비 과정에서 외부에 서식하던 날파리가 날아들어 유입된 것으로 최종 판정됨. (식품위생법 제46조에 의거 '식품 이물보고 대상'으로 지자체 행정 보고 절차 완결)",
        preventiveMeasuresSkipped: false,
        preventiveMeasures:
          "1. [식품 이물보고 법적 절차 완결] 곤충 이물 접수 즉시 관할 보건소/식약처 전산 보고 및 현품 인수 조사 협조.\n2. [공장 방충 설비 점검] 평택공장 충전실 출입구 2중 에어커튼 풍속 상향 및 전단 포충등 트랩 주기적 분격 세척.\n3. [고객 개봉 후 취식 가이드] 개봉 즉시 음용하거나 밀폐 보관할 것을 권장하는 소비자 안내문 배포.",
      },
      conclusion: {
        summaryPoints: [
          "가. 수거된 파리에 대해 공인 카탈라아제 시험을 실시한 결과, 효소가 살아있는 강양성으로 확인되어 당사의 105℃ 가열 살균 공정을 거치지 않았음을 과학적으로 규명하였습니다.",
          "나. 당사 추출 및 충전 배관은 3㎛ 필터로 밀폐 관리되어 제조 과정 중 성충 파리가 유입되는 것은 물리적으로 불가능합니다.",
          "다. 본 건은 개봉 후 음용 대기 과정에서 외부 곤충이 유입된 것으로 판단되며, 식품위생법에 따른 행정관청 이물보고 절차를 철저히 이행하였습니다.",
        ],
        apologyText:
          "제품 개봉 시 곤충 발견으로 고객님께 큰 충격과 불쾌감을 안겨드려 머리 숙여 깊이 사과드립니다. 고객님의 안심을 위해 철저한 방충 관리 및 제품 포장 무결성을 더욱 완벽히 유지하겠습니다.",
        closingRemarks: "2026년 6월 21일\n광동제약주식회사 식품품질경영팀",
      },
      attachments: { attachment1Photos: [], attachment2Photos: [], attachment3Photos: [] },
    },
  },

  // 5. [자사-병] 생약 원료 침전 vs 온장고 장기보관 침전탄화(Caramelization)
  {
    id: "preset-bottle-precipitate-caramelization",
    name: "5. [자사-병] 생약 침전 vs 온장고 장기보관 탄화 (Caramelization)",
    description: "생약 고유 성분의 자연 침전 vs 60℃ 이상 온장고 장기보관에 따른 당성분 캐러멜화 탄화 침전(고온수 불용) 판별",
    badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-300",
    category: "자사 제품 (병)",
    scope: "in_house",
    subCategory: "foreign",
    isBuiltin: true,
    data: {
      title: "“병 제품 (100ml)” 바닥 침전물 및 온장고 탄화 시험 조사 보고의 건.",
      docNumber: "광동 QM 2026-B05",
      customerClaim: {
        receivedAt: "2026-06-12",
        sampleReceivedDate: "2026-06-14",
        customerName: "윤상현",
        maskCustomerName: false,
        channel: "고객상담센터 (유선 접수)",
        claimDetails:
          "온장고에서 따뜻한 병 제품을 꺼내 마시려는데 바닥에 검고 진한 침전 찌꺼기가 뭉쳐 있어 변질된 것이 아닌지 불안하여 문의 및 접수함.",
        customerPhotos: [],
      },
      productInfo: {
        productName: "병 제품 (100ml)",
        lotNumber: "LOT-26C08-D1",
        manufactureDate: "2026-03-08",
        expiryDate: "2028-03-07",
        manufacturer: "광동제약 평택공장 탕류 라인",
        packageType: "갈색 유리병 (28mm ROPP 캡)",
      },
      analysisResults: {
        visualInspection: {
          skipped: false,
          sampleCondition: "용기 하단부에 암갈색의 응집 침전물이 관찰됨. 흔들었을 때 일부 분산되나 바닥에 단단히 눌어붙은 응고물 일부 잔존.",
          foreignObjectAppearance: "생약 농축액 고유 성분 및 고온 가열에 의해 뭉쳐진 암갈색 탄화 과립 성상.",
          includePrinciple: false,
          principleText: "",
        },
        magnifierInspection: {
          skipped: false,
          magnification: "20x 확대 관찰",
          result: "결정성 광물이나 금속, 고무 파편이 아니며, 대추와 숙지황 등 생약 엑기스 당성분의 열변성 응집체로 관찰됨.",
          includePrinciple: false,
          principleText: "",
        },
        opticalMicroscope: {
          skipped: false,
          magnification: "100x 광학 현미경",
          result: "세포막 조직이나 미생물 균사체는 전혀 없으며, 유기 당류 및 생약 펙틴질의 캐러멜화(Caramelization) 응집 덩어리 확인.",
          includePrinciple: false,
          principleText: "",
        },
        ftirAnalysis: { skipped: true, summary: "", matchedMaterial: "", similarity: "", includePrinciple: false, principleText: "" },
        xrfAnalysis: { skipped: true, elementsRatio: "", summary: "", includePrinciple: false, principleText: "" },
        physicochemicalAnalysis: {
          skipped: false,
          testDate: "2026-06-14",
          sampleClass: "침전물 고온수 물리적 용해 시험",
          items: [
            { id: "pc-s1", testDate: "2026.06.14", name: "원료 침전물 (정상)", unit: "-", standard: "90℃ 온수 교반 시 재용해", controlValue: "100% 용해 분산됨", sampleValue: "-", judgment: "적합", remarks: "흔들면 쉽게 분산" },
            { id: "pc-s2", testDate: "2026.06.14", name: "온장고 탄화 침전물 (현품)", unit: "-", standard: "90℃ 온수 1시간 교반", controlValue: "-", sampleValue: "용해되지 않음 (불용성 탄화)", judgment: "부적합", remarks: "온장고 과열 탄화 불용성" },
          ],
          summary: "현품의 침전물을 분리하여 90℃ 고온수 투입 및 1시간 자석 교반기(Magnetic stirrer) 테스트를 진행한 결과, 완전히 녹지 않는 불용성 탄화 침전물로 확인되어 온장고 고온(60℃ 이상) 장기 보관에 의한 당 탄화로 확증됨.",
          includePrinciple: true,
          principleText: "※ 침전 용해성 감별 시험: 대추/생약 고유 침전물은 온수에서 쉽게 재용해되나, 60℃ 이상 온장고에서 장기 보관되어 당성분이 캐러멜화 탄화된 침전물은 90℃ 고온수 교반에도 전혀 녹지 않습니다.",
        },
        catalaseTest: { skipped: true, resultJudgement: "", reactionDetail: "", includePrinciple: false, principleText: "" },
        additionalTests: [],
      },
      manufacturingProcess: {
        skipped: false,
        processFlow: "생약 추출(대추, 숙지황, 작약 등) → 여과 → 살균 → 충전 → 캡핑 → 포장",
        processSteps: ["생약 원료 가압 추출", "규조토 및 3㎛ 여과", "농축 및 배합", "초고온 살균 및 충전"],
        filtrationAnalysis: "추출액은 3㎛ 필터로 균일 여과됨.",
        cleaningAnalysis: "배관 청결 및 고온 살균 관리 적합.",
        criticalControlPoint: "완제품 라벨 표시 규정 준수 관리.",
        highlightedStep: "라벨 표시 문구 관리 공정",
      },
      lotHistory: {
        skipped: false,
        productionLogNote: "생산 당시 당도, 추출 농도 표준 규격 적합 출하.",
        qualityTestRecord: "자가품질검사 적합 출하.",
        priorClaimsCount: "동일 Lot 내 온장고 탄화 관련 유사 문의 1건 접수 이력.",
        retainedSampleCheck: "상온 보관 중인 공장 보관품 확인 결과: 탄화 침전물 전무하며, 가볍게 흔들었을 때 맑게 분산되는 정상 상태 유지.",
        retainedSamplePhotos: [],
      },
      rootCauseAndActions: {
        skipped: false,
        rootCause:
          "본 제품은 생약 추출 농축액(대추, 생강 등)을 함유하여 라벨에 '원료 성분에 의해 간혹 침전물이 생길 수 있으나 변질이 아니오니 안심하시고 잘 흔들어 드십시오'라고 명기되어 있습니다. 본 현품의 침전물은 유통 단계(약국 온장고)에서 적정 보관 온도(60℃ 이하, 2주 이내)를 초과하여 장기간 고온 보관됨에 따라 당 성분이 열분해되어 발생한 '캐러멜화 탄화 침전물'로 최종 확인되었습니다.",
        preventiveMeasuresSkipped: false,
        preventiveMeasures:
          "1. [온장고 보관 가이드 강화 배포] 전국 약국 및 편의점 대상 '온장고 적정 보관 온도(60℃ 이하) 및 적정 보관 기간(14일 이내)' 준수 캠페인 스티커 부착 안내.\n2. [소비자 안심 문구 강조] 라벨의 '흔들어 드십시오' 시각 가독성 개선.",
      },
      conclusion: {
        summaryPoints: [
          "가. 현품 침전물은 생약 원료의 당 성분이 유통 판매처 온장고의 고온 환경에서 장시간 노출되어 발생한 캐러멜화(탄화) 현상임을 확인하였습니다.",
          "나. 90℃ 고온수 교반 시험 결과 이물질이 아닌 고유 농축액의 열변성 탄화물이며 유해 미생물 증식은 전혀 없음을 규명하였습니다.",
          "다. 상온 보관 공장 제품은 침전 없이 완벽한 상태를 유지하고 있으며, 유통처 온장고 보관 가이드를 한층 강화하겠습니다.",
        ],
        apologyText:
          "온장고 보관 중 침전 발생으로 인해 고객님께 염려를 끼쳐드려 송구합니다. 인체에 유해한 이물이 아니오니 안심하시길 바라며, 판매처 보관 환경 관리를 철저히 점검하겠습니다.",
        closingRemarks: "2026년 6월 14일\n광동제약주식회사 식품품질경영팀",
      },
      attachments: { attachment1Photos: [], attachment2Photos: [], attachment3Photos: [] },
    },
  },

  // 6. [자사-병] 캡 플라스틱 파편 혼입 (FT-IR 99.5% 일치)
  {
    id: "preset-bottle-cap-plastic-ftir",
    name: "6. [자사-병] 캡 플라스틱 파편 혼입 (FT-IR 분광분석 99.5% 일치)",
    description: "3㎛ 필터 여과로 공정 혼입 불가, FT-IR 적외선 분광분석으로 캡 라이너 성형 버(Burr) 공급사 불량 규명",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    category: "자사 제품 (병)",
    scope: "in_house",
    subCategory: "foreign",
    isBuiltin: true,
    data: {
      title: "“병 제품 (100ml)” 플라스틱 이물 조사 및 FT-IR 적외선 분광분석 보고의 건.",
      docNumber: "광동 QM 2026-B06",
      customerClaim: {
        receivedAt: "2026-06-10",
        sampleReceivedDate: "2026-06-12",
        customerName: "정다은",
        maskCustomerName: false,
        channel: "고객상담센터 (유선 접수)",
        claimDetails:
          "병 제품을 마시던 중 입안에서 단단하고 얇은 플라스틱 조각이 씹혀 뱉어내고 고객센터로 사진과 함께 접수함.",
        customerPhotos: [],
      },
      productInfo: {
        productName: "병 제품 (100ml)",
        lotNumber: "LOT-26E05-V3",
        manufactureDate: "2026-05-05",
        expiryDate: "2027-05-04",
        manufacturer: "광동제약 평택공장 음료 1호 라인",
        packageType: "갈색 유리병 (28mm 알루미늄 캡)",
      },
      analysisResults: {
        visualInspection: {
          skipped: false,
          sampleCondition: "길이 약 3.1mm, 두께 0.4mm 크기의 반투명 백색 플라스틱 미세 조각 1점 수거됨.",
          foreignObjectAppearance: "반투명 흰색의 얇은 필름형 수지 조각으로 끝단이 사출 금형에서 뜯겨나간 버(Burr) 형상을 보임.",
          includePrinciple: false,
          principleText: "",
        },
        magnifierInspection: {
          skipped: false,
          magnification: "40x 실체현미경",
          result: "캡 라이너의 성형 절단부와 동일한 두께 및 만곡률을 가진 플라스틱 성형 잔류 버(Burr)로 관찰됨.",
          includePrinciple: false,
          principleText: "",
        },
        opticalMicroscope: { skipped: true, magnification: "", result: "", includePrinciple: false, principleText: "" },
        ftirAnalysis: {
          skipped: false,
          summary: "이물질과 당사 제품에 체결된 28mm 알루미늄 캡 내부 플라스틱 라이너(Cap Plastic Liner)의 FT-IR 흡수 스펙트럼이 99.5% 완벽히 일치함.",
          matchedMaterial: "Cap Plastic Liner (HDPE / EVA copolymer)",
          similarity: "99.5% (스펙트럼 완벽 일치)",
          includePrinciple: true,
          principleText: "※ FT-IR(적외선 분광분석) 원리: 분자 결합 고유의 적외선 진동 스펙트럼(Fingerprint)을 캡 성형 원료 라이브러리와 1:1 대조하여 99% 이상의 신뢰도로 재질 동일성을 확증합니다.",
        },
        xrfAnalysis: { skipped: true, elementsRatio: "", summary: "", includePrinciple: false, principleText: "" },
        physicochemicalAnalysis: { skipped: true, testDate: "", sampleClass: "", items: [], summary: "", includePrinciple: false, principleText: "" },
        catalaseTest: { skipped: true, resultJudgement: "", reactionDetail: "", includePrinciple: false, principleText: "" },
        additionalTests: [],
      },
      manufacturingProcess: {
        skipped: false,
        processFlow: "원료 배합 → 3㎛ 마이크로 여과망 통과 → 청정 세병 → 충전 → 캡핑 → FBI 바닥 검사 → 포장",
        processSteps: ["조제액 3㎛ 정밀 필터링", "고압 반전 세병기 세척", "자동 충전 및 캡핑", "FBI 바닥이물 검사"],
        filtrationAnalysis: "음료 조제액 배관에 3㎛ 마이크로 필터가 장착되어 있어 3mm 크기의 플라스틱이 액상 라인을 통과하는 것은 원천적으로 불가능함.",
        cleaningAnalysis: "공병 세병기 도치 세척 및 에어 세정 공정 가동.",
        criticalControlPoint: "캡 공급사 라이너 금형 사출 버(Burr) 제거 품질 관리.",
        highlightedStep: "3㎛ 정밀 여과 및 캡핑 공정",
      },
      lotHistory: {
        skipped: false,
        productionLogNote: "생산일지 확인 결과 캡핑기 이상 없음. 3㎛ 필터 차압 정상 유지.",
        qualityTestRecord: "완제품 이물 검사 전 항목 적합.",
        priorClaimsCount: "동일 캡 Lot에서 유사 라이너 조각 접수 이력 0건.",
        retainedSampleCheck: "공장 보관품 30병 라이너 정밀 검사 결과 전수 정상.",
        retainedSamplePhotos: [],
      },
      rootCauseAndActions: {
        skipped: false,
        rootCause:
          "당사 제조 공정의 3㎛ 정밀 여과 시스템상 조제액을 통한 유입은 불가능하나, FT-IR 분광분석 결과 캡 플라스틱 라이너와 99.5% 일치함이 입증되었습니다. 이는 캡 공급업체의 사출 성형 공정 중 커팅 나이프 마모로 인해 미세 플라스틱 버(Burr)가 캡 내부에 부착되어 출하된 공급사 부자재 불량 건으로 최종 규명되었습니다.",
        preventiveMeasuresSkipped: false,
        preventiveMeasures:
          "1. [캡 공급업체 시정조치(CAR)] 캡 라이너 성형용 펀칭 커터 교체 주기를 50% 단축하고 사출 후 비전 검사기 감도 상향 지시.\n2. [당사 캡 공급 라인 에어 린서 노즐 증설] 캡핑기 공급 전 에어 블로워 압력을 상향하여 미세 부착 잔류물 탈락 강화.",
      },
      conclusion: {
        summaryPoints: [
          "가. FT-IR 적외선 정밀 분광분석 결과, 이물은 캡 라이너 성형 재질과 99.5% 동일한 플라스틱 파편임이 규명되었습니다.",
          "나. 당사의 3㎛ 정밀 필터 여과 공정으로 조제액 혼입이 아님을 확인하였으며, 캡 제조 업체의 사출 마감 불량으로 확인되었습니다.",
          "다. 캡 제조업체에 엄중한 시정 조치를 완료하고 캡 입고 검사를 대폭 강화하였습니다.",
        ],
        apologyText:
          "포장재 마감 불량으로 고객님께 불편과 놀라움을 드려 진심으로 사과드립니다. 공급 협력업체 품질 평가 기준을 강화하여 무결점 용기 관리에 최선을 다하겠습니다.",
        closingRemarks: "2026년 6월 12일\n광동제약주식회사 식품품질경영팀",
      },
      attachments: { attachment1Photos: [], attachment2Photos: [], attachment3Photos: [] },
    },
  },

  // 7. [자사-병] 수량부족 (10입 케이스 1병 부족 & 중량선별기 검증)
  {
    id: "preset-bottle-shortage-weight-checker",
    name: "7. [자사-병] 수량 부족 클레임 (10입 케이스 1병 부족 & 중량선별 검증)",
    description: "인카토너 자동 중량선별기(Weight Checker) 100% 전수 검증 및 케이스 바닥면 10개 원형 압흔(눌림 자국) 추적 분석",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-300",
    category: "자사 제품 (병)",
    scope: "in_house",
    subCategory: "quantity",
    isBuiltin: true,
    data: {
      title: "“병 제품 10입 케이스” 수량 부족(1병 결손) 클레임 조사 보고의 건.",
      docNumber: "광동 QM 2026-B07",
      customerClaim: {
        receivedAt: "2026-06-08",
        sampleReceivedDate: "2026-06-10",
        customerName: "강민철",
        maskCustomerName: false,
        channel: "고객상담센터 (유선 접수)",
        claimDetails:
          "마트에서 병 제품 10입 박스를 구매하여 집에서 뜯어보니 9병만 들어있고 1병 자리가 비어있어 공장 출하 시 수량 누락이 아닌지 확인 및 보상을 요청함.",
        customerPhotos: [],
      },
      productInfo: {
        productName: "병 제품 10입 케이스 (100ml x 10병)",
        lotNumber: "LOT-26E02-V1",
        manufactureDate: "2026-05-02",
        expiryDate: "2027-05-01",
        manufacturer: "식품 제조공장 병 제품 포장라인",
        packageType: "10입 골판 케이스 (단품: 100ml 유리병)",
      },
      analysisResults: {
        visualInspection: {
          skipped: false,
          sampleCondition: "고객이 반납한 병 제품 10입 종이 케이스의 테이프 개봉 상태 및 내부 바닥면을 정밀 관찰함.",
          foreignObjectAppearance: "케이스 내부 10개 병 안착 공간 중 1개 빈 공간 바닥면에 원형 병 바닥의 압흔 자국 확인.",
          includePrinciple: false,
          principleText: "",
        },
        magnifierInspection: {
          skipped: false,
          magnification: "육안 및 확대경 관찰",
          result: "케이스 바닥면 10구 전 구역에서 유리병 바닥 널링(Knurling)에 의한 원형 압흔 자국 10개가 선명하게 남아있음을 확인. 즉 공장 포장 출하 시에는 10병이 모두 장입되어 출하되었음을 물증으로 입증.",
          includePrinciple: true,
          principleText: "※ 케이스 바닥 압흔 감식 원리: 10입 케이스에 유리병이 장입되면 병 자중에 의해 판지 바닥에 원형 압흔 자국이 생성됩니다. 10개 구역 모두 압흔이 존재하면 공장에서 10병 정상 포장 후 유통·소비 단계에서 1병이 인출된 것입니다.",
        },
        opticalMicroscope: { skipped: true, magnification: "", result: "", includePrinciple: false, principleText: "" },
        ftirAnalysis: { skipped: true, summary: "", matchedMaterial: "", similarity: "", includePrinciple: false, principleText: "" },
        xrfAnalysis: { skipped: true, elementsRatio: "", summary: "", includePrinciple: false, principleText: "" },
        physicochemicalAnalysis: { skipped: true, testDate: "", sampleClass: "", items: [], summary: "", includePrinciple: false, principleText: "" },
        catalaseTest: { skipped: true, resultJudgement: "", reactionDetail: "", includePrinciple: false, principleText: "" },
        additionalTests: [
          {
            id: "add-weight-1",
            title: "인카토너(In Cartoner) 라인 자동 중량선별기(Weight Checker) 데이터 분석",
            result:
              "인카토너 인터록 로그 전수 대조 결과: 기준 중량 2,230g ± 35g 설정되어 1병(약 220g) 부족 시 100% 자동 리젝트 배출 시스템 정상 가동. 해당 생산일자 중량 미달 통과 건수 0건으로 제조 공정 상 9병 출하는 물리적으로 불가능함.",
            includePrinciple: false,
            principleText: "",
            skipped: false,
          },
        ],
      },
      manufacturingProcess: {
        skipped: false,
        processFlow: "충전/캡핑 → 라벨러 → 인카토너 10입 자동 장입 → 자동 중량선별기(Weight Checker) → 외박스 포장",
        processSteps: ["자동 10병 집적 장입", "카토너 케이스 봉함", "자동 중량선별기 100% 전수 검사", "불합격품 자동 에어 리젝트"],
        filtrationAnalysis: "해당 없음.",
        cleaningAnalysis: "해당 없음.",
        criticalControlPoint: "중량선별기 100% 통과 인터록 시스템.",
        highlightedStep: "인카토너 자동 중량선별기(Weight Checker) 공정",
      },
      lotHistory: {
        skipped: false,
        productionLogNote: "생산 당일 중량선별기 시작 전 표준 분동(2,230g) 교정 완료 및 에러 로그 0건 확인.",
        qualityTestRecord: "포장 수량 및 완제품 검사 적합.",
        priorClaimsCount: "동일 Lot 내 수량 부족 클레임 접수 이력 0건.",
        retainedSampleCheck: "보관품 10박스(100병) 수량 전수 일치 확인.",
        retainedSamplePhotos: [],
      },
      rootCauseAndActions: {
        skipped: false,
        rootCause:
          "당사 포장 라인에서는 인카토너 포장 직후 초정밀 '자동 중량선별기(Weight Checker)'를 통해 1병(약 220g)이라도 부족할 경우 100% 자동 배출되도록 완벽히 인터록되어 있습니다. 또한 회수된 케이스 바닥면 조사 결과 10병 전 구역에 선명한 '원형 바닥 압흔 자국'이 확인되므로, 공장 출하 당시 10병이 모두 정상 장입된 후 유통 매장 진열 또는 취급 과정에서 1병이 임의 인출된 것으로 최종 규명되었습니다.",
        preventiveMeasuresSkipped: false,
        preventiveMeasures:
          "1. [케이스 봉함 봉인력 강화] 인카토너 핫멜트 접착 면적을 확대하여 외부에서 임의 개봉 시 케이스 파손 흔적이 남도록 봉인 강화.\n2. [유통 매장 진열 취급 가이드] 묶음 상품의 매장 내 임의 낱개 개봉 판매 방지 협조 공문 발송.",
      },
      conclusion: {
        summaryPoints: [
          "가. 공장 라인의 자동 중량선별기(Weight Checker) 100% 전수 검증 시스템상 1병 부족 제품 출하는 원천 불가능합니다.",
          "나. 고객 반납 케이스 바닥면을 정밀 검사한 결과 10병 전 구역에 병 바닥 원형 압흔이 선명히 존재하여 정상 장입 출하되었음을 입증하였습니다.",
          "다. 유통 매장 보관 중 임의 개봉 방지를 위해 케이스 봉함 핫멜트 접착 봉인을 한층 강화하였습니다.",
        ],
        apologyText:
          "구매하신 제품의 수량 부족으로 큰 당혹감과 불편을 드려 진심으로 사과드립니다. 고객님의 소중한 신뢰를 위해 유통 과정 봉인력을 강화하고 즉시 새 제품으로 교환 조치해 드리겠습니다.",
        closingRemarks: "2026년 6월 10일\n광동제약주식회사 식품품질경영팀",
      },
      attachments: { attachment1Photos: [], attachment2Photos: [], attachment3Photos: [] },
    },
  },

  // 8. [자사-병] 충전량 부족 및 누액 (FBI 액위 검사 & 표시기준 허용오차)
  {
    id: "preset-bottle-fill-volume-fbi",
    name: "8. [자사-병] 충전량 부족 및 누액 (FBI 액위 검사 & 표시기준 허용오차)",
    description: "내용액 부족 클레임에 대해 FBI(Full Bottle Inspector) 액위 검사 및 식품등의 표시기준 허용오차(4.5mL) 적합 판정",
    badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-300",
    category: "자사 제품 (병)",
    scope: "in_house",
    subCategory: "fill",
    isBuiltin: true,
    data: {
      title: "“병 제품 (100ml)” 내용량 부족 클레임 조사 및 FBI 액위 검증 보고의 건.",
      docNumber: "광동 QM 2026-B08",
      customerClaim: {
        receivedAt: "2026-06-05",
        sampleReceivedDate: "2026-06-07",
        customerName: "조현우",
        maskCustomerName: false,
        channel: "고객상담센터 (유선 접수)",
        claimDetails:
          "병 제품 10병을 사서 마시려는데 그중 1병의 음료 높이가 다른 병들에 비해 눈에 띄게 낮아 충전 불량이 아닌지 정밀 확인을 요청함.",
        customerPhotos: [],
      },
      productInfo: {
        productName: "병 제품 (100ml)",
        lotNumber: "LOT-26E01-V2",
        manufactureDate: "2026-05-01",
        expiryDate: "2027-04-30",
        manufacturer: "광동제약 평택공장 음료 1호 라인",
        packageType: "갈색 유리병 (28mm ROPP 캡)",
      },
      analysisResults: {
        visualInspection: {
          skipped: false,
          sampleCondition: "미개봉 현품 수거 완료. 캡 실링 상태 양호하며 외부 누액 흔적은 없음. 액면 높이가 표준선 대비 약 3mm 낮아 보임.",
          foreignObjectAppearance: "이물 및 부유물 전혀 없음. 맑은 황금색 고유 성상.",
          includePrinciple: false,
          principleText: "",
        },
        magnifierInspection: { skipped: true, magnification: "", result: "", includePrinciple: false, principleText: "" },
        opticalMicroscope: { skipped: true, magnification: "", result: "", includePrinciple: false, principleText: "" },
        ftirAnalysis: { skipped: true, summary: "", matchedMaterial: "", similarity: "", includePrinciple: false, principleText: "" },
        xrfAnalysis: { skipped: true, elementsRatio: "", summary: "", includePrinciple: false, principleText: "" },
        physicochemicalAnalysis: {
          skipped: false,
          testDate: "2026-06-07",
          sampleClass: "정밀 내용량 및 비중 측정 (메틀러 토레도 정밀 천칭)",
          items: [
            { id: "pc-v1", testDate: "2026.06.07", name: "표시량", unit: "mL", standard: "100.0", controlValue: "100.0", sampleValue: "100.0", judgment: "해당없음", remarks: "규격" },
            { id: "pc-v2", testDate: "2026.06.07", name: "식품등의 표시기준 허용오차", unit: "mL", standard: "허용오차 4.5mL (95.5 ~ 104.5)", controlValue: "95.5 이상", sampleValue: "95.5 이상", judgment: "해당없음", remarks: "식약처 고시 기준" },
            { id: "pc-v3", testDate: "2026.06.07", name: "실측 내용량", unit: "mL", standard: "95.5 mL 이상", controlValue: "101.8 mL", sampleValue: "97.4 mL", judgment: "적합", remarks: "법적 허용오차 범위 내 적합" },
          ],
          summary: "정밀 실측 결과 현품의 내용량은 97.4 mL로, '식품등의 표시·광고에 관한 법률' 상 허용오차 범위(100mL 기준 ±4.5mL, 즉 95.5mL 이상)를 완벽히 충족하는 적합 제품임이 판정됨.",
          includePrinciple: true,
          principleText: "※ 내용량 허용오차 법적 기준: '식품등의 표시기준'에 따라 50mL 초과 100mL 이하 제품의 법적 허용오차는 4.5mL이며, 충전 시 발생하는 거품 등으로 인한 미세 액위 차이는 정상 범위에 해당합니다.",
        },
        catalaseTest: { skipped: true, resultJudgement: "", reactionDetail: "", includePrinciple: false, principleText: "" },
        additionalTests: [
          {
            id: "add-fbi-lvl",
            title: "FBI(Full Bottle Inspector) 액 레벨 검사기 상/하한선 검증",
            result:
              "광학 레벨 센서 감도 검증 결과: 하한 리젝트 기준 95.0mL 이하 설정되어 정상 가동 중. C라인 액 레벨 검사기 재검증 완료. 법적 허용치(95.5mL) 이하의 저충전 제품은 100% 자동 리젝트 배출됨을 입증.",
            includePrinciple: false,
            principleText: "",
            skipped: false,
          },
        ],
      },
      manufacturingProcess: {
        skipped: false,
        processFlow: "조제 → 정량 충전기(24 밸브) → ROPP 캡핑 → FBI 액 Level 검사기 → 라벨러 → 포장",
        processSteps: ["정량 밸브 충전", "캡핑 실링", "FBI 액위 광학 전수 검사", "하한 미달품 자동 취출"],
        filtrationAnalysis: "정상 가동.",
        cleaningAnalysis: "충전 밸브 CIP 살균 완료.",
        criticalControlPoint: "FBI 액 Level 상한/하한 검사기 전수 검사.",
        highlightedStep: "FBI 액 레벨(Level) 검사 공정",
      },
      lotHistory: {
        skipped: false,
        productionLogNote: "생산 중 C라인 FBI 충전량 검증 및 정량 밸브 토출압 편차 정상 범위 확인.",
        qualityTestRecord: "내용량 평균 101.2 mL로 합격 출하.",
        priorClaimsCount: "동일 Lot 내 충전량 클레임 0건.",
        retainedSampleCheck: "보관품 20병 평균 내용량 101.4 mL 정상 확인.",
        retainedSamplePhotos: [],
      },
      rootCauseAndActions: {
        skipped: false,
        rootCause:
          "현품의 정밀 계량 결과 실측량은 97.4 mL로 확인되었으며, 이는 관련 법령인 '식품등의 표시기준' 상 허용오차(100mL 제품 기준 4.5mL 허용, 즉 95.5mL 이상)를 완벽히 준수하는 정상 제품입니다. 동일 Lot라 하더라도 초고속 충전 밸브의 미세 거품(Foam) 발생 및 병 두께 편차에 의해 액면 높이가 시각적으로 다소 낮아 보일 수 있으나 법적 정량에는 이상이 없음을 최종 확인하였습니다.",
        preventiveMeasuresSkipped: false,
        preventiveMeasures:
          "1. [충전 밸브 소포 가이드 개선] 충전 노즐의 거품 억제 망 상태를 일일 점검하여 액면 편차 최소화.\n2. [FBI 액위 검사 감도 정밀 튜닝] C라인 액 레벨 센서의 검출 마진을 더욱 정밀하게 유지 보정.",
      },
      conclusion: {
        summaryPoints: [
          "가. 정밀 계량 결과 내용량은 97.4 mL로 식품위생법상 허용오차(±4.5mL) 이내의 완벽한 적합 제품입니다.",
          "나. 공장 FBI 액 Level 검사기를 통해 기준 미달 제품은 자동 선별 배출되고 있음을 확인하였습니다.",
          "다. 충전 시 순간적 거품 분산에 따른 액위 차이임을 규명하였으며 고객님께 정밀 결과를 상세히 안내하였습니다.",
        ],
        apologyText:
          "용기별 미세한 액위 차이로 인하여 의구심과 염려를 드리게 되어 송구스럽습니다. 언제나 정량 이상의 정직한 제품만을 생산할 수 있도록 충전 밸브 정밀도 향상에 최선을 다하겠습니다.",
        closingRemarks: "2026년 6월 7일\n광동제약주식회사 식품품질경영팀",
      },
      attachments: { attachment1Photos: [], attachment2Photos: [], attachment3Photos: [] },
    },
  },

  // 9. [자사-병] 포장불량 - 라벨 이상 (무라벨, 라벨 뒤집힘 및 접착제 마찰 전사)
  {
    id: "preset-bottle-label-defect",
    name: "9. [자사-병] 포장 불량 - 라벨 이상 (무라벨/접착제 마찰 전사)",
    description: "라벨링 후 컨베이어 정지 시 병 간 마찰로 인한 라벨 접착제 전사 풀칠 자국 규명 및 무라벨 점 감지 센서 개선",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-300",
    category: "자사 제품 (병)",
    scope: "in_house",
    subCategory: "packaging",
    isBuiltin: true,
    data: {
      title: "“병 제품 (100ml)” 라벨 부착 오류 및 접착제 번짐 클레임 조사 보고의 건.",
      docNumber: "광동 QM 2026-B09",
      customerClaim: {
        receivedAt: "2026-06-03",
        sampleReceivedDate: "2026-06-05",
        customerName: "서민경",
        maskCustomerName: false,
        channel: "고객상담센터 (유선 접수)",
        claimDetails:
          "병 제품 외면에 라벨이 거꾸로 뒤집혀 붙어있고, 병 표면에 끈적끈적한 풀칠 자국이 지저분하게 묻어 있어 불량품인 것 같아 신고함.",
        customerPhotos: [],
      },
      productInfo: {
        productName: "병 제품 (100ml)",
        lotNumber: "LOT-26D25-S1",
        manufactureDate: "2026-04-25",
        expiryDate: "2028-04-24",
        manufacturer: "광동제약 평택공장 탕류 라인",
        packageType: "갈색 유리병 (28mm ROPP 캡)",
      },
      analysisResults: {
        visualInspection: {
          skipped: false,
          sampleCondition: "회수 현품 확인 결과 라벨 끝단이 일부 접혀 있으며, 라벨 반대편 병 외벽에 접착제(풀칠 자국) 흔적이 전사되어 묻어 있음.",
          foreignObjectAppearance: "외면에 묻은 물질은 라벨용 수용성 접착제 성분으로 확인됨.",
          includePrinciple: false,
          principleText: "",
        },
        magnifierInspection: {
          skipped: false,
          magnification: "20x 확대 관찰",
          result: "컨베이어 이송 중 인접한 병의 라벨 접착면과 마찰(비비임)되면서 접착제가 전사된 기계적 접촉 흔적 확인.",
          includePrinciple: false,
          principleText: "",
        },
        opticalMicroscope: { skipped: true, magnification: "", result: "", includePrinciple: false, principleText: "" },
        ftirAnalysis: { skipped: true, summary: "", matchedMaterial: "", similarity: "", includePrinciple: false, principleText: "" },
        xrfAnalysis: { skipped: true, elementsRatio: "", summary: "", includePrinciple: false, principleText: "" },
        physicochemicalAnalysis: { skipped: true, testDate: "", sampleClass: "", items: [], summary: "", includePrinciple: false, principleText: "" },
        catalaseTest: { skipped: true, resultJudgement: "", reactionDetail: "", includePrinciple: false, principleText: "" },
        additionalTests: [],
      },
      manufacturingProcess: {
        skipped: false,
        processFlow: "충전/캡핑 → 아큐뮬레이터 컨베이어 → 자동 롤 라벨러 → 무라벨 검사 센서 → 카토너",
        processSteps: ["용기 표면 수분 건조", "자동 롤 라벨링", "무라벨 광학 검사 센서", "10입 카토너 투입"],
        filtrationAnalysis: "해당 없음.",
        cleaningAnalysis: "해당 없음.",
        criticalControlPoint: "B라인, C라인 무라벨 센서(점 감지 방식) 및 브라켓 간격 유지.",
        highlightedStep: "자동 롤 라벨러 및 무라벨 센서 검사 공정",
      },
      lotHistory: {
        skipped: false,
        productionLogNote: "생산 중 후단 카토너 일시 정지로 라벨링 아큐뮬레이터 컨베이어 정체 발생 기록 확인.",
        qualityTestRecord: "완제품 포장 검사 적합 출하.",
        priorClaimsCount: "동일 Lot 내 유사 라벨 접착제 번짐 1건 접수.",
        retainedSampleCheck: "보관품 20병 라벨링 정위치 부착 및 청결 상태 유지 확인.",
        retainedSamplePhotos: [],
      },
      rootCauseAndActions: {
        skipped: false,
        rootCause:
          "라벨링 직후 후단 포장 설비의 일시 정지로 컨베이어 상에서 병 제품들이 서로 밀착되어 정체되는 과정에서, 미건조된 라벨 접착제가 인접한 다른 병 표면에 비벼지며 전사 부착된 것으로 확인되었습니다.",
        preventiveMeasuresSkipped: false,
        preventiveMeasures:
          "1. [센서 및 브라켓 개선] B라인, C라인 무라벨 센서를 기존 '면 감지 방식'에서 정밀 '점 감지 방식'으로 교체 완료하고, 센서 브라켓을 '고정식'에서 '간격 조절식'으로 개조하여 이상 감지율 극대화.\n2. [컨베이어 제어 인터록] 라벨러 후단 정체 발생 시 즉시 라벨러 투입을 멈추는 자동 감속 인터록 로직 적용 완료.",
      },
      conclusion: {
        summaryPoints: [
          "가. 현품의 풀칠 자국은 설비 일시 정지 시 병 간 마찰로 인한 라벨 접착제 전사 현상임을 규명하였습니다.",
          "나. 내용액의 품질 및 위생에는 전혀 영향이 없음을 확인하였습니다.",
          "다. 무라벨 센서를 점 감지 방식으로 전면 교체하고 컨베이어 감속 인터록을 보강하였습니다.",
        ],
        apologyText:
          "깔끔하지 못한 포장 마감으로 고객님께 불편과 실망을 안겨드려 사과드립니다. 센서 및 라인 개선을 통해 단정한 제품만을 제공해 드리겠습니다.",
        closingRemarks: "2026년 6월 5일\n광동제약주식회사 식품품질경영팀",
      },
      attachments: { attachment1Photos: [], attachment2Photos: [], attachment3Photos: [] },
    },
  },

  // 10. [자사-병] 포장불량 - 10입 케이스 소비기한 미인쇄 & 핫멜트 부착
  {
    id: "preset-bottle-packaging-inkjet-hotmelt",
    name: "10. [자사-병] 포장 불량 - 10입 케이스 소비기한 미인쇄 및 핫멜트 부착",
    description: "10입 케이스 잉크젯 노즐 일시 막힘 및 인카토너 포장기 케이스 접지부 핫멜트(Hot-melt) 수지 외면 부착",
    badgeColor: "bg-stone-100 text-stone-800 border-stone-300",
    category: "자사 제품 (병)",
    scope: "in_house",
    subCategory: "packaging",
    isBuiltin: true,
    data: {
      title: "“병 제품 10입 케이스” 소비기한 미인쇄 및 핫멜트 접착제 부착 클레임 조사 보고의 건.",
      docNumber: "광동 QM 2026-B10",
      customerClaim: {
        receivedAt: "2026-06-01",
        sampleReceivedDate: "2026-06-03",
        customerName: "한지우",
        maskCustomerName: false,
        channel: "고객상담센터 (유선 접수)",
        claimDetails:
          "병 제품 10입 박스 상단에 유통기한 날짜가 하얗게 비어있어 인쇄가 안 되어 있고, 병 목 부위에 굳은 실리콘 같은 하얀 덩어리(핫멜트)가 붙어 있어 찝찝하여 교환 요청함.",
        customerPhotos: [],
      },
      productInfo: {
        productName: "병 제품 10입 케이스 (100ml x 10병)",
        lotNumber: "LOT-26E10-V1",
        manufactureDate: "2026-05-10",
        expiryDate: "2027-05-09",
        manufacturer: "식품 제조공장 병 제품 포장라인",
        packageType: "10입 골판 케이스",
      },
      analysisResults: {
        visualInspection: {
          skipped: false,
          sampleCondition: "10입 케이스 상단 유통기한 인쇄란에 잉크 흔적이 누락되어 있음. 내부 1병의 어깨 부위에 반투명 백색의 탄성 고무상 접착제 덩어리(핫멜트) 부착 확인.",
          foreignObjectAppearance: "핫멜트 접착제는 포장 박스 조립 시 사용하는 무독성 EVA계 열가소성 수지로 판정됨.",
          includePrinciple: false,
          principleText: "",
        },
        magnifierInspection: {
          skipped: false,
          magnification: "20x 확대 관찰",
          result: "케이스 날개 접착에 사용하는 핫멜트 접착제와 동일 성분 및 동일 색상임을 확인. 용기 내부 유입은 없음.",
          includePrinciple: false,
          principleText: "",
        },
        opticalMicroscope: { skipped: true, magnification: "", result: "", includePrinciple: false, principleText: "" },
        ftirAnalysis: { skipped: true, summary: "", matchedMaterial: "", similarity: "", includePrinciple: false, principleText: "" },
        xrfAnalysis: { skipped: true, elementsRatio: "", summary: "", includePrinciple: false, principleText: "" },
        physicochemicalAnalysis: { skipped: true, testDate: "", sampleClass: "", items: [], summary: "", includePrinciple: false, principleText: "" },
        catalaseTest: { skipped: true, resultJudgement: "", reactionDetail: "", includePrinciple: false, principleText: "" },
        additionalTests: [],
      },
      manufacturingProcess: {
        skipped: false,
        processFlow: "병 라벨링(개별 인쇄) → 인카토너 케이스 투입 → 핫멜트 도포 및 접지 → 10입 케이스 잉크젯 날인",
        processSteps: ["개별 병 라벨 비전 검사", "인카토너 케이스 접지 및 핫멜트 분사", "10입 케이스 잉크젯 날인", "박스 적재"],
        filtrationAnalysis: "해당 없음.",
        cleaningAnalysis: "해당 없음.",
        criticalControlPoint: "개별 병 라벨 검사기 가동 및 10입 케이스 잉크젯 노즐 관리.",
        highlightedStep: "인카토너 핫멜트 도포 및 10입 케이스 잉크젯 인쇄 공정",
      },
      lotHistory: {
        skipped: false,
        productionLogNote: "생산일지 확인 결과 10입 케이스 잉크젯 프린터 노즐 일시 막힘으로 헤드 청소 1회 실시 기록 확인. 개별 병 라벨에는 정상 소비기한 100% 인쇄 확인.",
        qualityTestRecord: "개별 완제품 소비기한 비전 검사 100% 합격 출하.",
        priorClaimsCount: "동일 Lot 내 케이스 미인쇄 1건 접수.",
        retainedSampleCheck: "공장 보관 10입 케이스 확인 결과 정상 인쇄 확인.",
        retainedSamplePhotos: [],
      },
      rootCauseAndActions: {
        skipped: false,
        rootCause:
          "1) 소비기한 미인쇄: 개별 병 라벨에는 고정밀 비전 검사기가 가동되어 100% 정상 인쇄되었으나, 10입 외박스 인쇄용 잉크젯 프린터 노즐에 미세 잉크 건조로 인한 일시적 노즐 막힘이 발생하여 외박스 인쇄가 누락되었습니다.\n2) 핫멜트 부착: 인카토너 포장기에서 10입 케이스를 접어주는 타이밍 오류로 인하여 박스 접착용 핫멜트 접착제가 병 외면에 접촉 부착되었습니다. 인체에 무해한 포장용 무독성 EVA 수지입니다.",
        preventiveMeasuresSkipped: false,
        preventiveMeasures:
          "1. [잉크젯 프린터 교체 및 비전 센서 연동] 10입 케이스 노후 잉크젯 프린터를 신형 고해상도 모델로 교체하고, 외박스 인쇄 누락 감지 비전 카메라 신설 연동.\n2. [인카토너 핫멜트 건 위치 조정] 핫멜트 분사 노즐 각도 및 가압 타이밍을 정밀 재세팅하여 병 접촉 원천 방지.",
      },
      conclusion: {
        summaryPoints: [
          "가. 개별 병 라벨에는 정상 소비기한(2027.05.09)이 정확히 인쇄되어 있으며, 10입 외박스 잉크젯 노즐의 일시적 막힘으로 확인되었습니다.",
          "나. 병 외면 부착물은 케이스 접착용 무독성 핫멜트 접착제로 내용물에는 전혀 영향이 없습니다.",
          "다. 노후 잉크젯 프린터를 전면 교체하고 외박스 인쇄 감지 비전 센서를 도입하였습니다.",
        ],
        apologyText:
          "포장 마감 및 인쇄 누락으로 고객님께 혼란과 불편을 끼쳐드려 깊이 사과드립니다. 완제품 포장 검사 설비를 즉시 최신화하여 완벽한 상태로 공급하겠습니다.",
        closingRemarks: "2026년 6월 3일\n광동제약주식회사 식품품질경영팀",
      },
      attachments: { attachment1Photos: [], attachment2Photos: [], attachment3Photos: [] },
    },
  },
  // 외주 제품 10종 프리셋 병합
  ...OEM_CLAIM_PRESETS,
];

const MANAGED_PRESETS_STORAGE_KEY = "food_qc_managed_presets_v4_kwangdong_internal";

export function loadAllPresets(): ClaimPreset[] {
  try {
    const raw = localStorage.getItem(MANAGED_PRESETS_STORAGE_KEY);
    if (raw) {
      const sanitized = raw
        .replaceAll("대한푸드품질연구원", "광동제약주식회사 식품품질경영팀")
        .replaceAll("대한푸드", "광동제약");
      const parsed: ClaimPreset[] = JSON.parse(sanitized);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Notice: Unable to load managed presets from storage", e);
  }
  return CLAIM_PRESETS;
}

export function saveAllPresets(presets: ClaimPreset[]): void {
  try {
    localStorage.setItem(MANAGED_PRESETS_STORAGE_KEY, JSON.stringify(presets));
  } catch (e) {
    console.warn("Notice: Unable to save managed presets to storage", e);
  }
}

export function resetAllPresetsToDefault(): ClaimPreset[] {
  try {
    localStorage.removeItem(MANAGED_PRESETS_STORAGE_KEY);
  } catch (e) {
    console.warn("Notice: Unable to reset presets in storage", e);
  }
  return CLAIM_PRESETS;
}

// Backwards compatibility aliases
export const getAllPresets = loadAllPresets;
export const loadCustomPresets = loadAllPresets;
export const saveCustomPresets = saveAllPresets;
