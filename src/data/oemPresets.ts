import { ClaimPreset } from "../types";

export const OEM_CLAIM_PRESETS: ClaimPreset[] = [
  // 11. [외주-PET] 차류 개봉 후 상온 방치 세균 증식 및 물곰팡이 변질
  {
    id: "preset-oem-pet-spoilage-mold",
    name: "11. [외주-PET] 차류 개봉 후 상온 방치 세균 증식 및 물곰팡이 변질",
    description: "페트 차음료 제품 섭취 후 상온 방치로 구강 세균 유입(24h 3,600만 CFU/ml 급증) 및 호기성 물곰팡이 피막 발생",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    category: "외주-PET 제품",
    scope: "oem",
    subCategory: "spoilage",
    isBuiltin: true,
    data: {
      title: "“페트(PET) 제품 (500ml)” 개봉 후 음용 방치에 따른 물곰팡이 이물 클레임 조사 보고의 건.",
      docNumber: "광동 QM 2026-OEM-P01",
      customerClaim: {
        receivedAt: "2026-06-19",
        sampleReceivedDate: "2026-06-21",
        customerName: "박서윤",
        maskCustomerName: false,
        channel: "고객상담센터 (온라인 인입)",
        claimDetails:
          "편의점에서 페트 제품을 구입하여 한 모금 마신 후 차량 컵홀더에 이틀간 보관하다가 다시 마시려던 중 액면 상단에 흰색 솜털 같은 곰팡이 덩어리가 떠 있는 것을 발견하고 제품 변질 불안으로 접수함.",
        customerPhotos: [],
      },
      productInfo: {
        productName: "페트(PET) 제품 (500ml)",
        lotNumber: "LOT-OEM-26F08-C1",
        manufactureDate: "2026-06-08",
        expiryDate: "2027-06-07",
        manufacturer: "외주 OEM 전문 수탁제조사 음료 무균충전(Aseptic) 라인",
        packageType: "내열 내압 무균 PET병 (38mm 플라스틱 스크류 캡)",
      },
      analysisResults: {
        visualInspection: {
          skipped: false,
          sampleCondition:
            "회수된 현품 잔여량 약 350ml(개봉 음용 확인). 액면 상부에 직경 약 15mm 크기의 흰색 및 옅은 황갈색의 솜털 모양 부유물(Biofilm 형성) 관찰됨. 캡 나사선 부위에 타액 접촉 및 건조 잔류흔 확인됨.",
          foreignObjectAppearance:
            "호기성 진균류(Mold) 균사체가 얽혀 형성된 전형적인 '물곰팡이(진균 집락)' 성상으로, 악취나 가스 팽창은 관찰되지 않음.",
          includePrinciple: false,
          principleText: "",
        },
        magnifierInspection: {
          skipped: false,
          magnification: "30x 확대 관찰",
          result:
            "캡 라이너 및 페트병 구강 접촉부에서 타액(침) 건조 잔여물 관찰되며, 캡 밀폐 씰 링(Tamper Evidence Band)이 이미 완전 파단 분리되어 개봉 후 상당 시간 경과된 상태임을 확인.",
          includePrinciple: false,
          principleText: "",
        },
        opticalMicroscope: {
          skipped: false,
          magnification: "200x ~ 400x 광학 현미경",
          result:
            "분리된 부유물 도말 염색 검경 결과, 격벽을 가진 전형적인 진균 균사(Hyphae) 및 포자낭 구조가 명확히 관찰되어 자연계 및 공기 중에 존재하는 호기성 진균류(곰팡이)로 최종 동정됨.",
          includePrinciple: true,
          principleText:
            "※ 현미경 진균류 감식 원리: 고배율 광학 현미경 하에서 균사의 형태, 격벽 유무, 포자낭의 구조를 관찰하여 개봉 후 외부 공기 유입 및 구강 접촉에 의해 증식하는 호기성 곰팡이임을 감식합니다.",
        },
        ftirAnalysis: { skipped: true, summary: "", matchedMaterial: "", similarity: "", includePrinciple: false, principleText: "" },
        xrfAnalysis: { skipped: true, elementsRatio: "", summary: "", includePrinciple: false, principleText: "" },
        physicochemicalAnalysis: {
          skipped: false,
          testDate: "2026-06-21",
          sampleClass: "액상차 (음용 잔류 검체 vs 미개봉 보관품)",
          items: [
            { id: "pc-1", name: "일반세균수 (CFU/ml)", unit: "CFU/ml", standard: "음용 즉시: <100 / 규격: n=5, c=0, m=0", controlValue: "0 (완전 무균)", sampleValue: "28,000,000 (2천8백만)", judgment: "부적합", remarks: "개봉 음용 후 상온 방치 급증" },
            { id: "pc-2", name: "진균수(곰팡이, 효모)", unit: "CFU/ml", standard: "규격 기준치 음성(불검출)", controlValue: "음성 (불검출)", sampleValue: "다수 균사체 증식(양성)", judgment: "부적합", remarks: "외기 노출에 의한 호기성 증식" },
            { id: "pc-3", name: "pH (수소이온농도)", unit: "-", standard: "기준치 6.2 ± 0.5", controlValue: "6.2", sampleValue: "5.4 (미세 산패)", judgment: "적합", remarks: "미생물 대사산물로 인한 미세 저하" },
            { id: "pc-4", name: "동일 Lot 보관품 세균수", unit: "CFU/ml", standard: "n=5, c=0, m=0 (불검출)", controlValue: "0 CFU/ml (완전 무균)", sampleValue: "0 CFU/ml (완전 무균)", judgment: "적합", remarks: "Aseptic 무균충전 무결성 확인" },
          ],
          summary:
            "‘웰빙 차음료 품질결과보고서’ 실험 데이터에 따르면 액상차는 보존료를 사용하지 않는 순수 추출 음료 특성상 입을 대고 마신 직후(180~320 CFU)부터 상온에서 4시간 경과 시 3,100 CFU, 8시간 56,000 CFU, 24시간 경과 시 3,600만 CFU/ml로 기하급수적으로 폭증합니다. 본 현품의 일반세균수(2,800만 CFU)는 개봉 후 입을 대고 섭취한 뒤 상온에 24시간 이상 방치했을 때의 전형적인 미생물 증식 지표와 정확히 일치합니다.",
          includePrinciple: true,
          principleText:
            "※ 액상차 세균 증식 메커니즘: 합성보존료 무첨가 웰빙 차음료는 구강 접촉 시 타액 속 아밀라아제 효소 및 구강 상재균이 내용액으로 유입되며, 곡물 원료의 풍부한 영양원과 결합하여 상온에서 급격한 미생물 증식(24시간 내 수천만 배 증식) 및 곰팡이 피막(물곰팡이)을 형성합니다.",
        },
        catalaseTest: { skipped: true, resultJudgement: "", reactionDetail: "", includePrinciple: false, principleText: "" },
        additionalTests: [],
      },
      manufacturingProcess: {
        skipped: false,
        processFlow: "원료 추출 → 3단 카트리지 마이크로 여과 → UHT 초고온 순간살균(135℃, 30초) → 무균 클린룸(Class 100) PET 무균 충전(Aseptic) → 캡 체결 및 전수 비전 검사",
        processSteps: [
          "원료 추출 및 배합",
          "UHT 초고온 무균 살균 (135℃)",
          "Aseptic Class 100 무균 챔버 충전",
          "멸균 캡 체결 및 기밀도 검사",
          "외박스 포장",
        ],
        filtrationAnalysis: "3단 마이크로 카트리지 필터(최종 0.45㎛ 제균 필터)를 거쳐 미생물 및 미세 입자를 100% 차단함.",
        cleaningAnalysis: "PET 용기 및 캡은 과산화수소(H2O2) 가스 멸균 후 무균수로 린싱되어 무균 챔버 내로 투입됨.",
        criticalControlPoint: "UHT 살균 온도 모니터링(CCP-1B) 및 무균 충전실 양압 제어(CCP-2P).",
        highlightedStep: "UHT 초고온 무균 살균 및 무균 PET 충전 공정",
      },
      lotHistory: {
        skipped: false,
        productionLogNote: "외주 생산 당일 UHT 살균온도(135.2℃) 및 무균 챔버 무균도 전수 정상 유지 확인. 특이사항 없음.",
        qualityTestRecord: "완제품 미생물 무균 배양 시험(일반세균 0, 진균 0) 적합 판정 출하.",
        priorClaimsCount: "동일 Lot 생산량 180,000병 중 미개봉 변질 접수 0건.",
        retainedSampleCheck: "공장 보관 60병 검사 결과 미개봉 상태에서 미생물 불검출 및 곰팡이 0건으로 완벽한 무균 상태 유지.",
        retainedSamplePhotos: [],
      },
      rootCauseAndActions: {
        skipped: false,
        rootCause:
          "본 제품은 합성보존료를 첨가하지 않은 순수 액상차로, 소비자가 제품을 개봉하여 입을 대고 음용하는 과정에서 구강 내 상재균과 타액 영양원이 병 내로 유입되었고, 이후 상온(차량 내부)에 장시간 방치됨에 따라 잔여 산소와 반응하여 호기성 진균(물곰팡이) 및 일반세균이 기하급수적으로 증식(2,800만 CFU/ml)하여 발생한 '개봉 후 음용 취급상 변질'로 최종 판정됨.",
        preventiveMeasuresSkipped: false,
        preventiveMeasures:
          "1. [용기 라벨 음용 및 보관 주의문구 강조] 제품 라벨의 '개봉 후에는 반드시 밀봉하여 냉장(0~10℃) 보관하시고 빨리 드시기 바랍니다' 문구를 눈에 잘 띄는 고대비 굵은 글씨로 개선.\n2. [소비자 안심 상담 가이드] 차음료의 무보존료 특성과 개봉 후 시간 경과에 따른 세균 증식 데이터(24시간 내 수천만 CFU 증식)를 소비자에게 친절히 설명하여 오해 해소.",
      },
      conclusion: {
        summaryPoints: [
          "가. 회수 현품 분석 결과, 캡 안전링이 이미 분리된 개봉 음용품으로, 입을 댄 후 상온 방치 시 흔히 나타나는 호기성 물곰팡이(진균) 증식으로 확인되었습니다.",
          "나. 당사 동일 Lot 보관품 60병은 무균 시험 결과 세균수 0 CFU/ml로 완벽한 무균 상태를 유지하고 있어 제조 공정상의 오염이 아님을 입증하였습니다.",
          "다. 합성보존료가 들어있지 않은 웰빙 차음료 특성상 개봉 후에는 냉장 보관하시고 가급적 빠른 시간 내 드셔야 함을 안내해 드립니다.",
        ],
        apologyText:
          "개봉 후 보관 중 발생한 변질 현상으로 고객님께 염려와 불편을 끼쳐드려 송구합니다. 보존료가 들어가지 않는 신선한 차음료의 올바른 음용 가이드를 더욱 널리 알리고 품질 관리에 만전을 기하겠습니다.",
        closingRemarks: "2026년 6월 21일\n광동제약주식회사 식품품질경영팀",
      },
      attachments: { attachment1Photos: [], attachment2Photos: [], attachment3Photos: [] },
    },
  },

  // 12. [외주-PET] 분리배출 에코 라벨 타공부 유통 충격 라벨 터짐
  {
    id: "preset-oem-pet-label-tear",
    name: "12. [외주-PET] 분리배출 에코 라벨 타공부 유통 충격 라벨 터짐",
    description: "페트 제품 친환경 분리배출 절취선 타공 개선 후 물류 상하차 및 적재 충격으로 인한 라벨 터짐/찢어짐",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
    category: "외주-PET 제품",
    scope: "oem",
    subCategory: "packaging",
    isBuiltin: true,
    data: {
      title: "“페트(PET) 제품 (500ml)” 분리배출 라벨 타공부 터짐 클레임 조사 보고의 건.",
      docNumber: "광동 QM 2026-OEM-P02",
      customerClaim: {
        receivedAt: "2026-06-15",
        sampleReceivedDate: "2026-06-17",
        customerName: "최동훈",
        maskCustomerName: false,
        channel: "고객상담센터 (유선 접수)",
        claimDetails:
          "마트에서 페트 제품(500ml)을 구매하려는데 용기 라벨 측면의 점선 부분이 길게 찢어져서 라벨이 너덜거리고 있어 진열 상품 관리 및 포장 불량으로 문의함.",
        customerPhotos: [],
      },
      productInfo: {
        productName: "페트(PET) 제품 (500ml)",
        lotNumber: "LOT-OEM-26F02-M1",
        manufactureDate: "2026-06-02",
        expiryDate: "2027-06-01",
        manufacturer: "외주 수탁제조사 음료 포장라인",
        packageType: "500ml PET (분리배출 에코 타공 수축라벨)",
      },
      analysisResults: {
        visualInspection: {
          skipped: false,
          sampleCondition:
            "PET 용기 및 내용물(음료)은 누액이나 파손 없이 온전함. 병 외면에 부착된 수축 라벨의 분리배출 절취선(타공선, Perforation)을 따라 약 6cm가량 종방향으로 찢어져 벌어져 있음.",
          foreignObjectAppearance: "라벨 자체의 물리적 찢어짐 외 이물이나 오염 물질은 없음.",
          includePrinciple: false,
          principleText: "",
        },
        magnifierInspection: {
          skipped: false,
          magnification: "20x 확대경",
          result:
            "라벨 타공부(절취선 점선 홀)의 연결 브릿지(Bridge) 부위가 외부 가압 및 쓸림 마찰력에 의해 인장 파단된 흔적 확인. 라벨 원단의 두께 및 인쇄 상태는 정상 규격임.",
          includePrinciple: true,
          principleText:
            "※ 라벨 절취선 인장 강도 원리: 분리배출 편의성을 높이기 위한 마블 인터널스 난수 프로모션 타공선은 소비자의 손가락 힘으로는 쉽게 뜯어져야 하는 반면, 박스 운송 중의 전단응력(진동, 마찰)에는 버텨야 하는 상충되는 임계 강도를 가집니다.",
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
        processFlow: "용기 충전 → 스팀 터널 라벨 수축 부착 → 외박스 카토닝(24입/20입) → 팔레타이징 랩핑 및 출하",
        processSteps: ["스팀 수축 터널 통과", "라벨 비전 검사기", "자동 박스 패킹", "물류 상차"],
        filtrationAnalysis: "해당 없음 (외포장 결함).",
        cleaningAnalysis: "해당 없음.",
        criticalControlPoint: "스팀 터널 수축 온도(균일 수축률 유지) 및 라벨 공급사 타공 펀칭 압력 관리.",
        highlightedStep: "수축 라벨 스팀 터널 및 박스 적재 공정",
      },
      lotHistory: {
        skipped: false,
        productionLogNote: "분리배출 타공 개선 라벨 적용 초기 로트로, 90만 개 선적용 테스트 기간 생산분임.",
        qualityTestRecord: "스팀 수축 후 라벨 접착 및 외관 검사 합격.",
        priorClaimsCount: "동일 Lot 내 유통 중 라벨 터짐 2건 접수 확인.",
        retainedSampleCheck: "공장 보관 완제품 48병 점검 결과 라벨 터짐 없음.",
        retainedSamplePhotos: [],
      },
      rootCauseAndActions: {
        skipped: false,
        rootCause:
          "소비자의 친환경 투명 페트병 분리배출 용이성을 확대하기 위해 라벨 절취선 타공(Perforation) 간격을 개선하는 과정에서, 물류 유통 단계(팔레트 적재 및 차량 운송 진동, 박스 간 마찰 압력)에서 라벨 연결 브릿지가 견디는 인장 강도를 초과하여 외력 충격에 의해 국소적으로 터진 현상으로 분석됨.",
        preventiveMeasuresSkipped: false,
        preventiveMeasures:
          "1. [PET 몰드 및 타공 패턴 전면 최적화] 페트 제품 몰드 규격에 대해 외주 협조전 상신 후 타공 브릿지 간격을 1.2mm에서 1.5mm로 보강하는 패턴 개선안 전면 적용.\n2. [외주 제조사 물류 포장 충격 완화] 완제품 외박스 적재 시 단 높이 관리 및 스트레치 필름 랩핑 장력을 최적화하여 마찰 방지.",
      },
      conclusion: {
        summaryPoints: [
          "가. 내용물(음료)의 품질에는 이상이 없으며, 친환경 에코 절취선 부위가 운송 충격으로 인해 국소적으로 터진 포장 결함임을 확인하였습니다.",
          "나. 소비자의 분리배출 편의성을 유지하면서도 운반 충격에 터지지 않도록 타공 패턴과 몰드 설계를 즉시 개선 보강하였습니다.",
        ],
        apologyText:
          "제품 외관 포장 불량으로 불편을 겪으신 고객님께 진심으로 사과드립니다. 친환경 포장의 내구성을 한층 강화하여 완벽한 외관의 제품이 공급되도록 조치하겠습니다.",
        closingRemarks: "2026년 6월 17일\n광동제약주식회사 식품품질경영팀",
      },
      attachments: { attachment1Photos: [], attachment2Photos: [], attachment3Photos: [] },
    },
  },

  // 13. [외주-PET] 용기 네크/바닥 크랙 및 공급사 성형 핀홀 누액
  {
    id: "preset-oem-pet-crack-pinhole",
    name: "13. [외주-PET] 용기 네크/바닥 크랙 및 공급사 성형 핀홀 누액",
    description: "유통 중 외부 충격으로 인한 네크(Neck) 크랙 또는 블로우 몰딩 성형 불량 핀홀(Pin-hole) 가압 미세 누액",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-300",
    category: "외주-PET 제품",
    scope: "oem",
    subCategory: "packaging",
    isBuiltin: true,
    data: {
      title: "“페트(PET) 제품 (500ml)” PET 용기 핀홀/크랙에 의한 미세 누액 클레임 조사 보고의 건.",
      docNumber: "광동 QM 2026-OEM-P03",
      customerClaim: {
        receivedAt: "2026-06-12",
        sampleReceivedDate: "2026-06-14",
        customerName: "정우진",
        maskCustomerName: false,
        channel: "고객상담센터 (유선 접수)",
        claimDetails:
          "20입 박스로 주문한 페트 제품을 개봉해보니 박스 바닥이 축축하게 젖어 있고, 1병에서 병 목(네크) 부위가 찌그러지며 음료가 조금씩 새어 나와 박스 전체가 오염되었다고 접수함.",
        customerPhotos: [],
      },
      productInfo: {
        productName: "페트(PET) 제품 (500ml)",
        lotNumber: "LOT-OEM-26E25-O1",
        manufactureDate: "2026-05-25",
        expiryDate: "2027-05-24",
        manufacturer: "외주 OEM 수탁사 무균 블로우-충전 라인",
        packageType: "500ml PET 용기",
      },
      analysisResults: {
        visualInspection: {
          skipped: false,
          sampleCondition:
            "회수된 현품의 액량 약 420ml로 일부 누액됨. PET 용기 상단 넥크(Neck) 라운드 부위에 약 2mm 크기의 미세 크랙(Crack) 및 눌림 자국 확인됨. 몸통을 손으로 가압 시 크랙 부위에서 기포와 함께 미세 분무 형태로 액이 분출됨.",
          foreignObjectAppearance: "외력에 의한 플라스틱 크랙으로 내부 이물은 없음.",
          includePrinciple: false,
          principleText: "",
        },
        magnifierInspection: {
          skipped: false,
          magnification: "30x 확대 관찰",
          result:
            "크랙 파단면이 외부에서 내부 방향으로 압축 굴곡된 형태를 나타내며, 프리폼 블로우 성형 시 수지 두께 편차가 아닌 외력 타격에 의한 기계적 피로 균열로 확인됨.",
          includePrinciple: true,
          principleText:
            "※ PET 누액 부위 감식 원리(가압 수침 시험): 밀폐 용기에 0.5kgf/cm² 내압을 가한 후 수조에 침지하여 기포 발생 위치를 정밀 추적함으로써, 캡 체결 불량인지, 용기 공급사의 블로우 성형 핀홀인지, 유통 중 타격 크랙인지를 판정합니다.",
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
        processFlow: "프리폼 공급 → 블로우 몰딩 성형 → 용기 내압 누설 검사 → 무균 충전 → 캡 체결 → 포장",
        processSteps: ["프리폼 예열 및 연신 블로우", "공병 누설(Leak) 전수 테스터", "음료 충전", "캡핑 및 외박스 포장"],
        filtrationAnalysis: "해당 없음.",
        cleaningAnalysis: "해당 없음.",
        criticalControlPoint: "블로우 몰딩 공병 핀홀/리크 검사기(Air Leak Tester) 100% 가동.",
        highlightedStep: "블로우 몰딩 및 공병 리크 전수 검사 공정",
      },
      lotHistory: {
        skipped: false,
        productionLogNote: "생산 중 인라인 공병 에어 리크 테스터 정상 작동 기록 확인. 누설 불량률 0.02%로 정상 배출됨.",
        qualityTestRecord: "출하 품질검사 내압 기밀성 시험 적합.",
        priorClaimsCount: "동일 Lot 내 택배 파손/누액 1건 접수 확인.",
        retainedSampleCheck: "공장 보관 50병 가압 침지 시험 결과 핀홀 및 누액 0건 정상 확인.",
        retainedSamplePhotos: [],
      },
      rootCauseAndActions: {
        skipped: false,
        rootCause:
          "공장 생산 단계에서는 전수 에어 리크 테스터를 통과한 정상 제품이었으나, 택배 및 물류 배송 과정에서 외부 박스가 낙하하거나 중량물이 상부에 집중 적재되면서 취약 부위인 PET 넥크(Neck) 라운드부에 모서리 타격 충격이 가해져 미세 크랙(Crack)이 발생하고 음료가 누액된 것으로 판정됨.",
        preventiveMeasuresSkipped: false,
        preventiveMeasures:
          "1. [PET 프리폼 공급사 넥크 두께 보강] 공급사 협조를 통해 넥크 곡면부 수지 두께 기준을 0.05mm 상향하여 내충격성 보강.\n2. [물류 택배 포장 완충 가이드] 온라인 배송용 박스에 '던짐 금지 / 취급주의' 라벨링 부착 및 완충재 규격 점검.",
      },
      conclusion: {
        summaryPoints: [
          "가. 용기 넥크 부위의 물리적 크랙 파단면 및 타격 흔적으로 볼 때, 유통 배송 중 강한 외부 충격에 의해 발생한 파손 누액으로 판정되었습니다.",
          "나. 공장 동일 Lot 보관품 전수 가압 시험 결과 누액은 전혀 발생하지 않아 성형 불량이 아님을 입증하였습니다.",
        ],
        apologyText:
          "배송 중 발생한 용기 파손과 누액으로 고객님께 큰 불편을 끼쳐드려 깊이 사과드립니다. 용기 내충격 강도를 더욱 강화하고 택배 물류 포장 기준을 철저히 보완하겠습니다.",
        closingRemarks: "2026년 6월 14일\n광동제약주식회사 식품품질경영팀",
      },
      attachments: { attachment1Photos: [], attachment2Photos: [], attachment3Photos: [] },
    },
  },

  // 14. [외주-병] 병 제품 오버캡 시계방향(역방향) 개봉에 따른 나사선 붕괴 헛돎
  {
    id: "preset-oem-bottle-overcap-thread",
    name: "14. [외주-병] 병 제품 오버캡 시계방향(역방향) 개봉에 따른 나사선 붕괴 헛돎",
    description: "오버캡 이중구조 제품에서 개봉 방향(반시계)을 거꾸로(시계방향) 비틀어 내부 알루미늄 캡 나사선이 붕괴되어 헛도는 결함",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    category: "외주-병 제품",
    scope: "oem",
    subCategory: "cap",
    isBuiltin: true,
    data: {
      title: "“병 제품 (100ml)” 오버캡 헛돎 및 개봉 불가 클레임 조사 보고의 건.",
      docNumber: "광동 QM 2026-OEM-B01",
      customerClaim: {
        receivedAt: "2026-06-11",
        sampleReceivedDate: "2026-06-13",
        customerName: "윤상철",
        maskCustomerName: false,
        channel: "고객상담센터 (유선 접수)",
        claimDetails:
          "약국에서 병 제품을 구매하여 뚜껑을 열려고 돌렸는데 뚜껑이 헛돌기만 하고 열리지 않으며, 뚜껑 안쪽에서 딸깍거리는 소리만 나고 내용물을 마실 수 없다고 불만 제기함.",
        customerPhotos: [],
      },
      productInfo: {
        productName: "병 제품 (100ml)",
        lotNumber: "LOT-OEM-26E10-G1",
        manufactureDate: "2026-05-10",
        expiryDate: "2028-05-09",
        manufacturer: "외주 수탁사 드링크 유리병 라인",
        packageType: "100ml 갈색 유리병 (플라스틱 오버캡 + 내부 알루미늄 캡)",
      },
      analysisResults: {
        visualInspection: {
          skipped: false,
          sampleCondition:
            "회수된 현품 잔여량 100ml 완제품 미개봉 상태 유지. 상단 플라스틱 골드 오버캡을 좌우로 회전 시 무한 헛돎 현상 발생 확인. 오버캡 강제 탈거 후 내부 확인 실시.",
          foreignObjectAppearance: "내부 캡 분리 조사 결과, 내부 알루미늄 캡의 스크류 나사선(Thread)이 하방으로 짓눌려 뭉개진 나사선 붕괴 상태 관찰됨.",
          includePrinciple: false,
          principleText: "",
        },
        magnifierInspection: {
          skipped: false,
          magnification: "20x 확대 관찰",
          result:
            "내부 알루미늄 캡의 나사산 궤적이 정상적인 오픈 방향(반시계 방향)이 아닌, 닫는 방향(시계 방향)으로 강하게 가압 회전되면서 유리병 나사산 턱에 부딪혀 나사산 골이 완전히 뭉개지고 펴진 흔적 확인.",
          includePrinciple: true,
          principleText:
            "※ 오버캡 헛돎 메커니즘 분석 원리: 오버캡 제품은 플라스틱 외장 캡이 내부 알루미늄 캡을 감싸고 있어 내부 캡이 보이지 않으므로, 소비자가 개봉 방향(반시계)을 오인하여 시계 방향(역방향)으로 강하게 힘을 줄 경우 캡 나사선이 병 나사산 턱을 타고 넘어가며 영구 변형(나사선 붕괴)되어 양방향 헛돎이 발생합니다.",
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
        processFlow: "유리병 세척 → 음료 충전 → 알루미늄 이너캡 체결(ROPP) → 플라스틱 오버캡 조립 가압 → 비전 검사",
        processSteps: ["이너 알루미늄 캡핑", "오버캡 조립기 가동", "캡핑 토크 및 높이 전수 검사", "카토닝"],
        filtrationAnalysis: "해당 없음.",
        cleaningAnalysis: "해당 없음.",
        criticalControlPoint: "이너캡 롤링 압력 및 오버캡 압착 깊이 제어.",
        highlightedStep: "오버캡 조립 및 캡핑 토크 검사 공정",
      },
      lotHistory: {
        skipped: false,
        productionLogNote: "생산 당시 오버캡 조립 설비 토크 및 결합 깊이 정상 범위 유지 확인.",
        qualityTestRecord: "개봉 토크(Open Torque: 8~12 kgf·cm) 기준 규격 적합 출하.",
        priorClaimsCount: "동일 Lot 내 캡 헛돎 문의 1건 접수.",
        retainedSampleCheck: "공장 보관 완제품 30병 개봉 시험 결과 100% 정상 개봉(반시계 방향 회전 시 9.2 kgf·cm에서 매끄럽게 개봉).",
        retainedSamplePhotos: [],
      },
      rootCauseAndActions: {
        skipped: false,
        rootCause:
          "오버캡 제품의 특성상 내부 캡 나사선이 외부에서 보이지 않는 구조적 취약점이 있어, 소비자가 개봉 시 오픈 방향(반시계 방향)을 혼동하여 시계 방향(잠금 방향)으로 과도한 토크를 가하여 회전시킴으로써 내부 알루미늄 캡의 연질 나사선이 유리병 나사산 턱에 걸려 붕괴(마모 및 펴짐)되어 발생한 '역방향 개봉에 의한 나사선 붕괴 헛돎'으로 규명됨.",
        preventiveMeasuresSkipped: false,
        preventiveMeasures:
          "1. [오버캡 상단 오픈 방향 표시 시인성 강화] 오버캡 상단면에 반시계 방향 오픈(OPEN ◀) 화살표 각인 및 음각 텍스트 크기를 확대하여 직관적 개봉 유도.\n2. [내부 알루미늄 캡 강도 개선] 외주 캡 제조업체와 협의하여 내부 캡 알루미늄 합금 두께 및 나사선 성형 롤러 압력을 상향 조정하여 역방향 토크 내성 강화.",
      },
      conclusion: {
        summaryPoints: [
          "가. 현품의 내부 알루미늄 캡을 분해 감식한 결과, 시계 방향(잠금 방향)으로 강하게 비틀어 열려 나사선이 파손된 역방향 개봉 흔적이 확인되었습니다.",
          "나. 공장 동일 Lot 보관품 30병 전수 개봉 시험 결과 100% 정상적으로 부드럽게 개봉되어 설비 결함이 아님을 입증하였습니다.",
        ],
        apologyText:
          "제품 개봉 시 뚜껑 헛돎으로 인해 큰 불편과 답답함을 겪으셨을 고객님께 진심으로 사과드립니다. 누구나 쉽게 올바른 방향으로 개봉할 수 있도록 오버캡 상단 표기를 즉시 개선하겠습니다.",
        closingRemarks: "2026년 6월 13일\n광동제약주식회사 식품품질경영팀",
      },
      attachments: { attachment1Photos: [], attachment2Photos: [], attachment3Photos: [] },
    },
  },

  // 15. [외주-병] 병간 충돌 외력 타격점(Hitted mark) 파손 및 유리이물
  {
    id: "preset-oem-bottle-glass-break",
    name: "15. [외주-병] 병간 충돌 외력 타격점(Hitted mark) 파손 및 유리이물",
    description: "외주 생산 드링크 병 제품 유통 중 병끼리 충돌하거나 박스 모서리 충격으로 인한 타격점 발생 파손 (식품 이물보고 대상)",
    badgeColor: "bg-red-100 text-red-800 border-red-300",
    category: "외주-병 제품",
    scope: "oem",
    subCategory: "breakage",
    isBuiltin: true,
    data: {
      title: "“외주 생산 드링크 병제품” 유통 중 충격 파손 및 유리 파편 조사 보고의 건.",
      docNumber: "광동 QM 2026-OEM-B02",
      customerClaim: {
        receivedAt: "2026-06-05",
        sampleReceivedDate: "2026-06-07",
        customerName: "한지민",
        maskCustomerName: false,
        channel: "고객상담센터 (유선 접수)",
        claimDetails:
          "박스 제품을 구매하여 마시려던 중 병 바닥 안쪽에 반짝거리는 유리 조각이 들어있는 것을 보고 음용을 중단함. 섭취 피해는 없음.",
        customerPhotos: [],
      },
      productInfo: {
        productName: "외주 드링크 병제품 100ml",
        lotNumber: "LOT-OEM-26E01-B2",
        manufactureDate: "2026-05-01",
        expiryDate: "2027-04-30",
        manufacturer: "외주 드링크 전문 수탁공장",
        packageType: "100ml 갈색 유리병",
      },
      analysisResults: {
        visualInspection: {
          skipped: false,
          sampleCondition:
            "병 외면 하단 코너부에 쌀알 크기의 국소적 타격점(Hitted mark) 관찰되며, 병 내부에서 3.5mm 길이의 유리 파편 1점 확인됨.",
          foreignObjectAppearance: "콘코이달 조개껍질형 파단면과 원호형 물결무늬(Ripple marks)를 가진 투명 갈색 유리 조각.",
          includePrinciple: false,
          principleText: "",
        },
        magnifierInspection: {
          skipped: false,
          magnification: "30x 확대 관찰",
          result: "타격점 중심으로 균열선이 방사상으로 뻗어나간 전형적인 외부 충격 타격 파손으로 감식됨.",
          includePrinciple: true,
          principleText: "※ 유리 파손 감식 원리: 타격점(Hitted mark) 및 원호형 물결무늬 유무를 통해 제조 공정 결함이 아닌 유통 물류 중 외력 충돌임을 입증합니다.",
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
        processFlow: "도치 세병 → 충전 → 캡핑 → FBI 바닥 검사 → 포장",
        processSteps: ["세병", "충전", "캡핑", "FBI 검사", "카토닝"],
        filtrationAnalysis: "3㎛ 필터 여과로 배관 내 파편 유입 원천 불가.",
        cleaningAnalysis: "고압 세척으로 공병 이물 제거.",
        criticalControlPoint: "FBI 검사기 바닥 이물 전수 감지.",
        highlightedStep: "FBI 바닥 검사 및 외박스 패킹",
      },
      lotHistory: {
        skipped: false,
        productionLogNote: "외주 생산 일지 확인 결과 공병 깨짐 사고 없음.",
        qualityTestRecord: "완제품 검사 적합.",
        priorClaimsCount: "0건.",
        retainedSampleCheck: "보관품 50병 파손 0건 정상 확인.",
        retainedSamplePhotos: [],
      },
      rootCauseAndActions: {
        skipped: false,
        rootCause: "유통 및 운송 중 외부 충격으로 인한 타격 파손으로 판정됨. (식품위생법 제46조 이물보고 완료)",
        preventiveMeasuresSkipped: false,
        preventiveMeasures: "외주사 포장 완충성 보강 및 공병 입고 샘플링 검사 기준 강화.",
      },
      conclusion: {
        summaryPoints: [
          "가. 병 외면의 뚜렷한 타격점(Hitted mark)으로 보아 유통 중 외력 충격에 의해 발생한 파편임을 확인하였습니다.",
          "나. 신속히 식품위생법에 따른 이물 보고 절차를 준수하였습니다.",
        ],
        apologyText: "제품 파손으로 심려를 끼쳐드려 깊이 사과드립니다.",
        closingRemarks: "2026년 6월 7일\n광동제약주식회사 식품품질경영팀",
      },
      attachments: { attachment1Photos: [], attachment2Photos: [], attachment3Photos: [] },
    },
  },

  // 16. [외주-병] 병 제품 온장고(50~60℃) 2주일 초과 장기보관 단백질 변성 응고
  {
    id: "preset-oem-bottle-soymilk-coagulation",
    name: "16. [외주-병] 병 제품 온장고(50~60℃) 2주일 초과 장기보관 단백질 변성 응고",
    description: "편의점/약국 온장고(50~60℃) 기준치(2주일)를 초과하여 장기 보관함에 따른 대두 단백질 열변성 응고 덩어리 분리",
    badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-300",
    category: "외주-병 제품",
    scope: "oem",
    subCategory: "spoilage",
    isBuiltin: true,
    data: {
      title: "“병 제품 (두유류 190ml)” 온장고 장기보관에 따른 단백질 응고 침전 조사 보고의 건.",
      docNumber: "광동 QM 2026-OEM-B03",
      customerClaim: {
        receivedAt: "2026-06-03",
        sampleReceivedDate: "2026-06-05",
        customerName: "강민재",
        maskCustomerName: false,
        channel: "고객상담센터 (유선 접수)",
        claimDetails:
          "편의점 온장고에서 따뜻한 두유를 꺼내 마시려는데 병 바닥에 순두부처럼 몽글몽글한 덩어리가 엉겨 붙어 있고 걸쭉하게 굳어 있어 상한 것이 아닌지 의심되어 접수함.",
        customerPhotos: [],
      },
      productInfo: {
        productName: "병 제품 (두유류 190ml)",
        lotNumber: "LOT-OEM-26D18-S1",
        manufactureDate: "2026-04-18",
        expiryDate: "2026-10-17",
        manufacturer: "식품 수탁 가공공장",
        packageType: "190ml 유리병 (크라운 또는 스크류 캡)",
      },
      analysisResults: {
        visualInspection: {
          skipped: false,
          sampleCondition:
            "회수된 현품 잔여량 약 160ml. 병 바닥 및 하부에 연갈색 젤리상 및 순두부 형태의 단백질 응고 덩어리 다수 관찰됨. 캡 밀봉 상태는 정상 유지 중.",
          foreignObjectAppearance: "대두 단백질 및 유지방이 고온에서 결합 응집된 겔(Gel) 형태의 유기물 덩어리로 이물질 아님.",
          includePrinciple: false,
          principleText: "",
        },
        magnifierInspection: {
          skipped: false,
          magnification: "20x 확대 관찰",
          result: "곰팡이나 부패 미생물 집락이 아닌, 대두 단백질 글리시닌(Glycinin) 성분의 열변성 응집체로 확인.",
          includePrinciple: false,
          principleText: "",
        },
        opticalMicroscope: { skipped: true, magnification: "", result: "", includePrinciple: false, principleText: "" },
        ftirAnalysis: { skipped: true, summary: "", matchedMaterial: "", similarity: "", includePrinciple: false, principleText: "" },
        xrfAnalysis: { skipped: true, elementsRatio: "", summary: "", includePrinciple: false, principleText: "" },
        physicochemicalAnalysis: {
          skipped: false,
          testDate: "2026-06-05",
          sampleClass: "두유류 (현품 vs 미개봉 상온 보관품)",
          items: [
            { id: "pc-s1", name: "산도 및 pH", unit: "-", standard: "기준치 pH 6.6 ± 0.3", controlValue: "pH 6.6", sampleValue: "pH 6.5 (정상)", judgment: "적합", remarks: "미생물에 의한 산패 아님" },
            { id: "pc-s2", name: "일반세균수", unit: "CFU/ml", standard: "음성 (0 CFU/ml)", controlValue: "0 CFU/ml", sampleValue: "0 CFU/ml (무균 유지)", judgment: "적합", remarks: "가열 살균 무결성 확인" },
            { id: "pc-s3", name: "고온 가용성 시험", unit: "-", standard: "열변성 단백질 응집 반응", controlValue: "음성 (용해 유지)", sampleValue: "온장 장기 노출 시 단백질 가교 결합 확인", judgment: "적합", remarks: "두유 고유 단백질 열변성 규명" },
          ],
          summary:
            "두유 제품 라벨 표기사항에 '온장상태(50~60℃)에 2주일 이상 보관하지 마시고...'라고 명시되어 있듯이, 유통 매장 온장고에서 2주일 이상 고온에 연속 노출될 경우 대두 단백질의 3차원 분자 구조가 풀리며 상호 엉겨붙어 순두부상 응고물이 석출됩니다. 본 검체는 미생물 시험 결과 세균수 0으로 완벽한 무균 상태를 유지하여 부패가 아닌 순수 열변성 물리현상입니다.",
          includePrinciple: true,
          principleText:
            "※ 두유 단백질 열변성 원리: 대두의 주 단백질인 글리시닌(Glycinin)과 콩기름 유화 분자는 50~60℃ 온장고에서 장기 보관(14일 초과) 시 열역학적 유화 안정성이 파괴되면서 소수성 결합을 통해 거대 고분자 덩어리(응고 침전)를 형성합니다.",
        },
        catalaseTest: { skipped: true, resultJudgement: "", reactionDetail: "", includePrinciple: false, principleText: "" },
        additionalTests: [],
      },
      manufacturingProcess: {
        skipped: false,
        processFlow: "대두 마쇄 및 착즙 → 배합 → 균질화(Homogenizing) → 초고온 멸균 → 병 충전 및 살균",
        processSteps: ["착즙", "고압 균질기", "UHT 멸균", "병 충전", "포장"],
        filtrationAnalysis: "정밀 여과망 적용.",
        cleaningAnalysis: "공병 세척 철저.",
        criticalControlPoint: "고압 균질 압력(단백질 미세 분산) 관리.",
        highlightedStep: "균질화 및 가열 멸균 공정",
      },
      lotHistory: {
        skipped: false,
        productionLogNote: "외주사 생산 일지 및 균질 압력 정상 확인.",
        qualityTestRecord: "성적서 적합.",
        priorClaimsCount: "동절기 온장고 장기보관 관련 유사 클레임 1건 접수 확인.",
        retainedSampleCheck: "상온 보관품 전수 균일 액상 유지 중 (응고 0건).",
        retainedSamplePhotos: [],
      },
      rootCauseAndActions: {
        skipped: false,
        rootCause:
          "유통 판매처(편의점 등)의 온장 쇼케이스(50~60℃)에서 권장 보관 기간인 '2주일(14일)'을 초과하여 장기간 가온 노출됨에 따라 대두 단백질이 물리화학적으로 열변성되어 젤상으로 엉겨붙은 것으로, 부패나 변질이 아닌 온장 보관 수칙 미준수에 기인한 현상임.",
        preventiveMeasuresSkipped: false,
        preventiveMeasures:
          "1. [유통처 온장고 보관 기한 스티커 배포] 편의점 및 약국 대상 '온장고 14일 초과 보관 금지' 안내문 및 선입선출 회전 관리 캠페인 시행.\n2. [표시사항 시인성 개선] 라벨의 온장 보관 주의 문구를 강조 표기하도록 외주사와 협의.",
      },
      conclusion: {
        summaryPoints: [
          "가. 현품의 미생물 검사 결과 세균수 0 CFU/ml로 부패가 아니며, 온장고 2주 이상 장기 보관에 따른 대두 단백질 열변성 응고물임을 확인하였습니다.",
          "나. 라벨 표기사항에 명시된 '온장고 2주일 이내 음용' 수칙 준수가 필요함을 안내해 드립니다.",
        ],
        apologyText:
          "온장고 보관 중 발생한 덩어리 현상으로 불편과 우려를 끼쳐드려 사과드립니다. 제품의 품질 안전성을 입증해 드리며 판매처 온장 관리를 더욱 강화하겠습니다.",
        closingRemarks: "2026년 6월 5일\n광동제약주식회사 식품품질경영팀",
      },
      attachments: { attachment1Photos: [], attachment2Photos: [], attachment3Photos: [] },
    },
  },

  // 17. [외주-젤리] 젤리 제품 3대 결함 (검은 탄화물 / 데포지터 전분 / 젤리꼬리 갈변)
  {
    id: "preset-oem-jelly-foreign-3types",
    name: "17. [외주-젤리] 젤리 제품 3대 결함 (검은 탄화물 / 데포지터 전분 / 젤리꼬리 갈변)",
    description: "원료 고온 교반 시 검은 탄화물, 데포지터 노즐 액떨어짐 비타민C 산화 젤리꼬리(갈변), 전분판 트레이 진동 흰색 전분 덩어리",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
    category: "외주-젤리류 제품",
    scope: "oem",
    subCategory: "foreign",
    isBuiltin: true,
    data: {
      title: "“젤리 제품 (48g)” 젤리 성형 결함(탄화물·전분·젤리꼬리) 클레임 조사 보고의 건.",
      docNumber: "광동 QM 2026-OEM-J01",
      customerClaim: {
        receivedAt: "2026-05-28",
        sampleReceivedDate: "2026-05-30",
        customerName: "신유나",
        maskCustomerName: false,
        channel: "고객상담센터 (온라인 접수)",
        claimDetails:
          "젤리 제품 1봉을 개봉하여 먹던 중 노란색 젤리 표면에 검은 점 같은 이물이 박혀 있는 1개와 흰색 가루 덩어리가 묻어 있는 1개를 발견하고 위생 상태 확인을 요청함.",
        customerPhotos: [],
      },
      productInfo: {
        productName: "젤리/스틱 제품 (48g)",
        lotNumber: "LOT-OEM-26E15-J2",
        manufactureDate: "2026-05-15",
        expiryDate: "2027-05-14",
        manufacturer: "외주 젤리 전문 수탁제조사",
        packageType: "48g 스탠딩 지퍼백 파우치",
      },
      analysisResults: {
        visualInspection: {
          skipped: false,
          sampleCondition:
            "회수된 젤리 검체 2개 확인. ① 첫 번째 젤리: 상단 어깨 부위에 약 0.8mm 크기의 흑색 미세 알갱이(탄화물) 내포됨. ② 두 번째 젤리: 꼬리 부위가 길게 늘어지며 짙은 갈색으로 착색된 젤리꼬리 및 표면에 1.5mm 백색 불투명 덩어리 부착됨.",
          foreignObjectAppearance: "외부에서 혼입된 금속이나 벌레가 아니며, 젤리 제조 공정에서 발생하는 3대 전형적 성형 부산물(탄화물, 젤리꼬리, 옥수수 전분 덩어리)로 확인.",
          includePrinciple: false,
          principleText: "",
        },
        magnifierInspection: {
          skipped: false,
          magnification: "30x 확대경",
          result:
            "① 흑색 알갱이: 원료 배합 시 당액이 솥 벽면에서 열에 의해 탄화된 설탕 탄화물(Caramelized Carbon)로 판정. ② 백색 덩어리: 젤리 성형용 전분 트레이에서 수분을 흡수해 굳어진 옥수수 전분 덩어리(Starch Lump)로 판정.",
          includePrinciple: true,
          principleText:
            "※ 젤리 이물 감식 특수성: 젤리 제품은 투명한 제형 특성상 미세 탄화물이나 비타민C 산화 갈변 꼬리가 눈에 뚜렷이 띄며, 성형 직후에는 색상이 옅어 비전 카메라로 100% 선별하기 어려운 제조상 고유 난제가 존재합니다.",
        },
        opticalMicroscope: { skipped: true, magnification: "", result: "", includePrinciple: false, principleText: "" },
        ftirAnalysis: { skipped: true, summary: "", matchedMaterial: "", similarity: "", includePrinciple: false, principleText: "" },
        xrfAnalysis: { skipped: true, elementsRatio: "", summary: "", includePrinciple: false, principleText: "" },
        physicochemicalAnalysis: {
          skipped: false,
          testDate: "2026-05-30",
          sampleClass: "젤리 이물 성분 감별",
          items: [
            { id: "pc-j1", name: "요오드 전분 반응 (백색 덩어리)", unit: "-", standard: "청남색 정색 반응", controlValue: "양성 (원료 전분)", sampleValue: "선명한 청남색 정색 반응", judgment: "적합", remarks: "식용 옥수수 전분 100% 규명" },
            { id: "pc-j2", name: "탄화물 가용성 및 연소 시험", unit: "-", standard: "유기 당류 탄화물", controlValue: "불검출", sampleValue: "설탕/물엿 열탄화 입자로 무독성", judgment: "적합", remarks: "배합 탱크 탄화물 판정" },
            { id: "pc-j3", name: "금속 검출 반응 (Fe, SUS)", unit: "-", standard: "불검출", controlValue: "불검출", sampleValue: "불검출 (비금속 유기물)", judgment: "적합", remarks: "금속 이물 원천 배제" },
          ],
          summary: "검출된 물질은 제조 공정 부자재인 식용 옥수수 전분 및 당액 탄화물로, 인체에 유해한 외부 이물이나 중금속이 아님을 과학적으로 규명하였습니다.",
          includePrinciple: false,
          principleText: "",
        },
        catalaseTest: { skipped: true, resultJudgement: "", reactionDetail: "", includePrinciple: false, principleText: "" },
        additionalTests: [],
      },
      manufacturingProcess: {
        skipped: false,
        processFlow: "원료 배합 및 농축 → 100 Mesh 여과 → 모굴(Mogul) 전분판 성형(데포지터 노즐 충전) → 건조실 큐어링 → 전분 분리 및 오일 코팅 → 비전 선별 및 포장",
        processSteps: ["배합 및 농축", "데포지터 사출 충전", "전분 트레이 건조", "전분 탈착 및 오일링", "선별 포장"],
        filtrationAnalysis: "100 Mesh 여과망을 통과하나 미세 탄화물 극소량 잔존 가능.",
        cleaningAnalysis: "모굴 트레이 전분 건조 상태 관리.",
        criticalControlPoint: "배합 솥 CIP 세척 주기 관리 및 데포지터 노즐 액떨어짐 방지 에어컷 장치.",
        highlightedStep: "데포지터 충전 노즐 및 모굴 전분 분리 공정",
      },
      lotHistory: {
        skipped: false,
        productionLogNote: "생산 당일 모굴 라인 전분 수분율 11.8% 정상 관리 기록 확인.",
        qualityTestRecord: "금속검출기(Fe 1.0mm, SUS 1.5mm) 전수 통과 적합.",
        priorClaimsCount: "동일 Lot 젤리꼬리 1건 접수 확인.",
        retainedSampleCheck: "보관품 20봉(약 400개 젤리) 육안 전수 검사 결과 특이 이물 없음.",
        retainedSamplePhotos: [],
      },
      rootCauseAndActions: {
        skipped: false,
        rootCause:
          "1) 탄화물: 배합 농축 솥 가열 표면에서 미세 당액이 국소 고온으로 탄화되어 필터를 극미량 통과하여 젤리 내부에 포집됨.\n2) 전분 덩어리: 젤리 성형 트레이의 전분판에 데포지터 액상 젤리가 떨어지는 순간 전분이 수분을 머금고 뭉쳐진 식용 전분 덩어리임.\n3) 젤리꼬리: 노즐 컷팅 시 비타민C가 함유된 젤리액이 늘어져 건조 중 산화 갈변된 제조 부산물로 규명됨.",
        preventiveMeasuresSkipped: false,
        preventiveMeasures:
          "1. [배합 솥 CIP 및 마이크로 필터 교체] 농축 배합 솥 세척 주기를 24시간에서 12시간으로 단축하고 탄화물 필터망(150 Mesh) 상향 교체.\n2. [데포지터 노즐 에어컷 압력 개선] 사출 시 액 늘어짐을 방지하는 석션(Suction) 압력을 보정하여 젤리꼬리 발생 원천 억제.\n3. [광학 비전 선별기 감도 상향] 갈변 젤리 및 이물 선별 컬러 비전 카메라의 판정 감도를 정밀 세팅.",
      },
      conclusion: {
        summaryPoints: [
          "가. 검출된 이물은 외부 유입물이 아닌 제조 공정 중 발생한 무독성 당액 탄화물 및 식용 옥수수 전분 덩어리로 인체에 유해하지 않음을 확인하였습니다.",
          "나. 젤리 제조 수탁공장의 배합 솥 세척 주기를 단축하고 노즐 액떨어짐 방지 설비를 즉시 보강하였습니다.",
        ],
        apologyText:
          "젤리 취식 중 불쾌감과 염려를 겪으신 고객님께 진심으로 사과드립니다. 젤리 성형 선별 설비를 대폭 보강하여 깨끗하고 품질 높은 젤리만을 전해드리겠습니다.",
        closingRemarks: "2026년 5월 30일\n광동제약주식회사 식품품질경영팀",
      },
      attachments: { attachment1Photos: [], attachment2Photos: [], attachment3Photos: [] },
    },
  },

  // 18. [외주-젤리] 하절기 고온 유통/보관에 따른 젤리 연화 및 녹아 뭉침
  {
    id: "preset-oem-jelly-melting",
    name: "18. [외주-젤리] 하절기 고온 유통/보관에 따른 젤리 연화 및 녹아 뭉침",
    description: "여름철 상온 초과 고온(30℃ 이상 차량/직사광선) 노출로 젤라틴/펙틴 겔 융해 및 낱개 젤리가 한 덩어리로 엉겨붙음",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    category: "외주-젤리류 제품",
    scope: "oem",
    subCategory: "spoilage",
    isBuiltin: true,
    data: {
      title: "“젤리 제품 (48g)” 하절기 고온 보관에 의한 녹아 뭉침 클레임 조사 보고의 건.",
      docNumber: "광동 QM 2026-OEM-J02",
      customerClaim: {
        receivedAt: "2026-06-25",
        sampleReceivedDate: "2026-06-27",
        customerName: "오세훈",
        maskCustomerName: false,
        channel: "고객상담센터 (유선 접수)",
        claimDetails:
          "여름철에 편의점에서 구매한 젤리 제품을 뜯어보니 개별 모양이 다 사라지고 누렇게 녹아 한 덩어리로 끈적하게 달라붙어 있어 먹을 수가 없다고 환불 및 개선을 요구함.",
        customerPhotos: [],
      },
      productInfo: {
        productName: "젤리/스틱 제품 (48g)",
        lotNumber: "LOT-OEM-26F12-J1",
        manufactureDate: "2026-06-12",
        expiryDate: "2027-06-11",
        manufacturer: "외주 젤리 전문 수탁사",
        packageType: "스탠딩 파우치",
      },
      analysisResults: {
        visualInspection: {
          skipped: false,
          sampleCondition:
            "파우치 내부의 약 12개 낱개 젤리가 고온 열풍에 노출된 듯 융해되어 바닥면에 한 덩어리(Block)로 엉겨붙어 굳어 있음. 젤리의 병 모양 형태가 소실됨.",
          foreignObjectAppearance: "외관상 융해 뭉침 외 곰팡이나 이물 등 부패 징후는 없음.",
          includePrinciple: false,
          principleText: "",
        },
        magnifierInspection: {
          skipped: false,
          magnification: "20x 확대경",
          result: "젤라틴 겔(Gel) 망상 구조가 상온 이상의 고온(약 38℃ 이상)에 장시간 노출되어 졸(Sol) 상태로 융해된 후 재응고된 전형적 열변형 상태 확인.",
          includePrinciple: true,
          principleText:
            "※ 젤리 융해 메커니즘 원리: 젤라틴 및 펙틴 겔화제는 융점이 약 32~35℃ 내외로, 직사광선이나 하절기 밀폐 차량(내부 온도 50℃ 육박)에 노출될 경우 열에 의해 분자간 결합이 해리되어 젤리가 녹아내려 한 덩어리로 뭉쳐집니다.",
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
        processFlow: "배합 → 성형 → 건조 큐어링(수분 16% 제어) → 오일 코팅 → 자동 포장",
        processSteps: ["배합", "성형", "건조실", "포장"],
        filtrationAnalysis: "해당 없음.",
        cleaningAnalysis: "해당 없음.",
        criticalControlPoint: "건조실 수분율 및 포장실 온도(20℃ 이하) 관리.",
        highlightedStep: "건조실 수분율 제어 및 포장실 온습도 관리",
      },
      lotHistory: {
        skipped: false,
        productionLogNote: "생산 및 출하 시 젤리 경도 및 수분율 정상 규격 확인.",
        qualityTestRecord: "적합 출하.",
        priorClaimsCount: "하절기 보관 온도 관련 2건 접수 확인.",
        retainedSampleCheck: "항온항습실(22℃) 보관품 확인 결과 낱개 분리도 100% 정상 유지 중.",
        retainedSamplePhotos: [],
      },
      rootCauseAndActions: {
        skipped: false,
        rootCause:
          "공장 출하 당시에는 정상적인 경도를 유지하였으나, 하절기 유통 배송 차량 또는 소비단계(직사광선 차내 보관 등)에서 35℃ 이상의 고온에 장시간 노출됨에 따라 젤라틴 겔이 융해되어 낱개 젤리가 하나로 뭉쳐진 '유통·보관 중 고온 노출에 의한 열변형'으로 판정됨.",
        preventiveMeasuresSkipped: false,
        preventiveMeasures:
          "1. [하절기 유통 물류 온도 관리 지침 배포] 하절기(6~8월) 유통 물류센터 및 판매점 진열 시 직사광선 회피 및 실내 25℃ 이하 냉방 진열 권고문 발송.\n2. [파우치 후면 보관방법 강조 표기] '직사광선 및 고온 다습한 곳을 피해 서늘한 곳에 보관' 경고 문구 디자인 시인성 상향.",
      },
      conclusion: {
        summaryPoints: [
          "가. 현품 검사 결과 곰팡이나 이물이 아니며, 하절기 35℃ 이상의 고온에 노출되어 젤리가 녹아 엉겨붙은 열변형 현상임을 확인하였습니다.",
          "나. 22℃ 항온실 보관품은 완벽한 낱개 형태를 유지하고 있어 제조 결함이 아님을 입증하였습니다.",
        ],
        apologyText:
          "여름철 제품 상태로 인해 실망을 끼쳐드려 대단히 죄송합니다. 하절기 유통 매장 보관 온도 가이드를 더욱 엄격히 전파하여 신선한 품질을 지키겠습니다.",
        closingRemarks: "2026년 6월 27일\n광동제약주식회사 식품품질경영팀",
      },
      attachments: { attachment1Photos: [], attachment2Photos: [], attachment3Photos: [] },
    },
  },

  // 19. [외주-CAN] 캔 엔드 탭(End Tab) 리벳 체결 불량 및 사각 개봉 파손
  {
    id: "preset-oem-can-tab-break",
    name: "19. [외주-CAN] 캔 엔드 탭(End Tab) 리벳 체결 불량 및 사각 개봉 파손",
    description: "캔 뚜껑 개봉 시 탭(고리) 리벳 체결 강도 불량 또는 소비자가 측면으로 비틀어 당겨 개봉구 파열 전 탭만 부러지는 결함",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    category: "외주-CAN 제품",
    scope: "oem",
    subCategory: "packaging",
    isBuiltin: true,
    data: {
      title: "“캔 제품 (240ml)” 캔 엔드 탭(End Tab) 파손 및 개봉 불가 클레임 조사 보고의 건.",
      docNumber: "광동 QM 2026-OEM-C01",
      customerClaim: {
        receivedAt: "2026-06-08",
        sampleReceivedDate: "2026-06-10",
        customerName: "임재현",
        maskCustomerName: false,
        channel: "고객상담센터 (유선 접수)",
        claimDetails:
          "자판기에서 캔 제품을 뽑아 개봉하려고 손잡이 고리를 들어 올리는 순간, 뚜껑은 열리지 않고 손잡이 탭만 뚝 부러져 나가 캔을 개봉할 수 없게 되었다고 손가락 긁힘 불안과 함께 항의함.",
        customerPhotos: [],
      },
      productInfo: {
        productName: "캔 제품 (240ml)",
        lotNumber: "LOT-OEM-26E20-C3",
        manufactureDate: "2026-05-20",
        expiryDate: "2028-05-19",
        manufacturer: "외주 CAN 전문 음료 수탁사",
        packageType: "240ml 알루미늄 CAN (SOT 캔 엔드)",
      },
      analysisResults: {
        visualInspection: {
          skipped: false,
          sampleCondition:
            "240ml 알루미늄 캔 미개봉 상태 유지. 캔 상단 엔드(End) 중앙의 알루미늄 리벳(Rivet) 부위에서 당김 탭(End Tab)이 탈락 분리되어 있으며, 음료 배출구 스코어 라인(Score Line)은 파열되지 않고 그대로 닫혀 있음.",
          foreignObjectAppearance: "분리된 탭의 리벳 체결 홀 주변에 비틀림 전단 응력 파단 자국 관찰됨.",
          includePrinciple: false,
          principleText: "",
        },
        magnifierInspection: {
          skipped: false,
          magnification: "30x 확대 관찰",
          result:
            "CAN end 제조 공정(Score → Tab 부착 → Tab nose wipe down)에서 리벳 체결부의 플랜지 확장 압력이 정상 범위(기준치 대비 92%) 수준이었으나, 소비자가 탭을 수직 정방향(0°)이 아닌 측면 약 35° 사각 방향으로 비틀어 당기면서 응력이 리벳 한쪽에만 집중되어 스코어가 찢어지기 전 탭 목 부위가 전단 파단된 흔적 확인.",
          includePrinciple: true,
          principleText:
            "※ 캔 엔드 탭 파괴 분석 원리: 캔 개봉은 탭을 들어 올릴 때 지렛대 원리(Leverage)로 노즈(Nose)가 스코어 라인(Score line)의 잔류 두께(약 30~35㎛)를 먼저 뚫어야 합니다. 탭 체결 리벳 강도와 스코어 파열 잔류압의 균형을 계측하여 설비 체결 편차인지 사각 개봉인지를 감식합니다.",
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
        processFlow: "CAN 바디 세척 → 음료 충전 → 시머(Seamer) 캔 엔드 밀봉 이중권철(Double Seaming) → 살균 및 건조 → 포장",
        processSteps: [
          "캔 엔드 공급(Bubble/Button/Score/Tab부착)",
          "내용액 충전",
          "시머 이중권철 체결",
          "권철 치수 전수 검사",
          "포장",
        ],
        filtrationAnalysis: "해당 없음.",
        cleaningAnalysis: "해당 없음.",
        criticalControlPoint: "캔 엔드 공급사 탭 인장 강도(Tab Pop and Tear Strength) 시험 성적서 관리.",
        highlightedStep: "CAN 엔드 공급 및 시밍(Seaming) 공정",
      },
      lotHistory: {
        skipped: false,
        productionLogNote: "외주사 생산 시밍 일지 확인 결과 권철 두께 및 기밀도 전수 정상.",
        qualityTestRecord: "캔 엔드 탭 개봉 시험 합격 출하.",
        priorClaimsCount: "0건.",
        retainedSampleCheck: "공장 보관 40캔 전수 개봉 시험 결과 100% 정상 개봉(평균 Pop 힘 1.8 kgf, Tear 힘 3.2 kgf로 완벽 개봉).",
        retainedSamplePhotos: [],
      },
      rootCauseAndActions: {
        skipped: false,
        rootCause:
          "CAN 엔드 공급사의 고속 프레스 공정 중 리벳 코킹(Caulking) 압력 편차가 미세하게 존재하는 상태에서, 소비자가 탭을 수직 정방향이 아닌 측면 사각 방향으로 강하게 비틀어 당김으로써 스코어 라인이 찢어지기 전 탭 결합부가 집중 하중을 견디지 못하고 파손된 복합적 원인으로 분석됨.",
        preventiveMeasuresSkipped: false,
        preventiveMeasures:
          "1. [캔 엔드 공급사 리벳 체결 강도 기준 상향] 캔 뚜껑 공급 협력사에 시정조치 요구(CAR)를 발행하여 탭 체결 리벳 압착 강도를 기존 4.5kgf에서 5.5kgf 이상으로 관리 기준 상향.\n2. [스코어 잔류 두께 편차 관리] 개봉구 스코어 나이프 마모도를 상시 모니터링하여 미개봉 파손 원천 예방.",
      },
      conclusion: {
        summaryPoints: [
          "가. 캔 뚜껑의 스코어 라인이 열리기 전 탭 결합 부위가 먼저 분리된 탭 파손 결함임을 확인하였습니다.",
          "나. 캔 엔드 제조 협력사와 긴밀히 협력하여 리벳 체결 강도를 대폭 상향 조정하고 스코어 가공 공정을 철저히 점검하였습니다.",
        ],
        apologyText:
          "음료 개봉 시 탭이 부러져 다치실 뻔한 불안과 불편을 겪으신 고객님께 진심으로 사과드립니다. 캔 뚜껑 부품 품질 관리를 철저히 강화하여 안심하고 드실 수 있도록 하겠습니다.",
        closingRemarks: "2026년 6월 10일\n광동제약주식회사 식품품질경영팀",
      },
      attachments: { attachment1Photos: [], attachment2Photos: [], attachment3Photos: [] },
    },
  },

  // 20. [외주-포/스틱] 스틱/포 제품 실링부 액묻음 핀홀 누액 및 포 터짐
  {
    id: "preset-oem-pouch-pinhole-leak",
    name: "20. [외주-파우치] 스틱/포 제품 실링부 액묻음 핀홀 누액 및 포 터짐",
    description: "고속 액상 충전 중 실링바에 내용액 비말이 묻어 열접착 불량(핀홀) 발생 및 택배 유통 압축 충격에 의한 포 터짐 누액",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-300",
    category: "외주-포/파우치 제품",
    scope: "oem",
    subCategory: "packaging",
    isBuiltin: true,
    data: {
      title: "“스틱/포 제품 (10ml)” 실링 핀홀에 의한 누액 클레임 조사 보고의 건.",
      docNumber: "광동 QM 2026-OEM-S01",
      customerClaim: {
        receivedAt: "2026-06-02",
        sampleReceivedDate: "2026-06-04",
        customerName: "서지은",
        maskCustomerName: false,
        channel: "고객상담센터 (유선 접수)",
        claimDetails:
          "선물용으로 포장된 스틱 세트 박스를 개봉하였는데 박스 모서리 부분이 축축하게 젖어 있고 내부 스틱 1개가 터져서 온 박스에 내용액이 끈적하게 묻어 있었다고 교환 및 조사를 요청함.",
        customerPhotos: [],
      },
      productInfo: {
        productName: "파우치/스틱 제품 (10ml)",
        lotNumber: "LOT-OEM-26E05-N1",
        manufactureDate: "2026-05-05",
        expiryDate: "2028-05-04",
        manufacturer: "외주 건강기능식품 파우치/스틱 전문 수탁사",
        packageType: "10ml 알루미늄 박 3중 복합지 스틱포",
      },
      analysisResults: {
        visualInspection: {
          skipped: false,
          sampleCondition:
            "회수된 1포 검체 확인 결과, 상단 열접착 실링 라인(가로 씰) 우측 모서리 경계부에 약 0.5mm 크기의 미세 핀홀(Pin-hole) 및 찢어짐 흔적 관찰됨. 주변 포 외면에 끈적한 진액 누출 자국 확인.",
          foreignObjectAppearance: "진액이 실링 틈새로 미세 누출되어 외부 박스를 오염시킨 것으로 이물질은 없음.",
          includePrinciple: false,
          principleText: "",
        },
        magnifierInspection: {
          skipped: false,
          magnification: "30x 확대 관찰",
          result:
            "실링바 압착 부위에 내용물 진액 성분이 미세하게 끼여들어 알루미늄 복합지 내면의 PE 실란트 수지가 완전 융착되지 못하고 들뜬 '액물림(Liquid Contamination on Seal)' 현상 및 이로 인한 미세 통로(핀홀) 확인.",
          includePrinciple: true,
          principleText:
            "※ 스틱포 액물림 핀홀 발생 메커니즘: 점도가 높은 한방 농축액을 고속(분당 수십 포)으로 충전할 때 노즐 끝에서 튄 미세 비말이 열접착 부위에 묻으면, 순간적인 고온 가압 시 수분이 기화되면서 수지 융착을 방해하여 눈에 보이지 않는 핀홀(Pin-hole)을 형성합니다.",
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
        processFlow: "원료 추출 및 농축 → 마이크로 여과 → UHT 살균 → 스틱 충전 및 4면 실링 → 카토닝 외박스 포장",
        processSteps: [
          "한방 원료 농축",
          "살균 및 냉각",
          "고속 다열 스틱포 충전",
          "실링바 고온 가압",
          "외박스 포장",
        ],
        filtrationAnalysis: "고점도 농축액 여과망 통과.",
        cleaningAnalysis: "충전 노즐 안티드립(Anti-drip) 세척.",
        criticalControlPoint: "스틱포 충전 노즐 컷팅 타이밍 및 실링 온도/압력 제어.",
        highlightedStep: "스틱포 충전 및 수평/수직 실링 공정",
      },
      lotHistory: {
        skipped: false,
        productionLogNote: "외주 생산 일지 확인 결과 실링 온도 185℃ 정상 유지 확인.",
        qualityTestRecord: "감압 챔버 누설 시험(-40 kPa) 샘플링 적합.",
        priorClaimsCount: "택배 배송 누액 1건 접수 확인.",
        retainedSampleCheck: "공장 보관 완제품 60포 감압 누설 시험 결과 누액 0건 정상 확인.",
        retainedSamplePhotos: [],
      },
      rootCauseAndActions: {
        skipped: false,
        rootCause:
          "고점도 농축액 충전 중 노즐 컷팅 시 미세 비말이 상단 실링 부위에 묻어 국소적인 열접착 불완전(액물림 핀홀)이 형성되었고, 이후 택배 물류 유통 중 외부 박스가 가압 충격을 받으면서 취약한 핀홀 틈새로 진액이 분출 누액된 것으로 분석됨.",
        preventiveMeasuresSkipped: false,
        preventiveMeasures:
          "1. [충전 노즐 썩백(Suck-back) 기능 강화] 노즐 끝단의 액 잔여 방울을 빨아들이는 썩백 압력을 상향 조정하여 실링부 비말 튐 원천 차단.\n2. [실링바 패턴 개선 및 클리닝 주기 단축] 실링바 표면에 잔류액 배출 홈을 추가하고 4시간 주기 실링바 브러시 세척 의무화.\n3. [수침 감압 누설 검사 샘플링 수량 2배 확대] 공정 중 핀홀 검출력을 극대화하도록 관리 강화.",
      },
      conclusion: {
        summaryPoints: [
          "가. 스틱포 상단 실링부에 충전액 비말이 묻어 발생한 미세 핀홀을 통해 배송 충격 시 누액이 발생한 것으로 규명되었습니다.",
          "나. 외주 제조사와 협의하여 노즐 썩백 압력 상향 및 실링바 클리닝 주기를 즉시 단축 조치하였습니다.",
        ],
        apologyText:
          "소중한 분께 드릴 선물 제품이 파손 및 누액되어 큰 실망과 불편을 끼쳐드린 점 머리 숙여 깊이 사과드립니다. 스틱포 밀봉 무결성 검사를 획기적으로 강화하여 신뢰를 되찾겠습니다.",
        closingRemarks: "2026년 6월 4일\n광동제약주식회사 식품품질경영팀",
      },
      attachments: { attachment1Photos: [], attachment2Photos: [], attachment3Photos: [] },
    },
  },
];
