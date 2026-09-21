import { StandardPhrase } from "../types";

export const OEM_STANDARD_PHRASES: StandardPhrase[] = [
  // =========================================================================
  // [11] 외주-PET 차류 개봉 후 상온 방치 세균 증식 및 물곰팡이 변질
  // =========================================================================
  {
    id: "oem-phrase-pet-mold-principle",
    fieldKey: "principle_physicochemical",
    category: "oem_pet",
    presetId: "preset-oem-pet-spoilage-mold",
    title: "액상차 개봉 후 미생물 기하급수적 증식 원리",
    content:
      "합성보존료가 첨가되지 않은 웰빙 액상차는 입을 대고 마시는 순간 구강 내 침(아밀라아제 효소 및 구강 세균)이 유입됩니다. 상온 방치 시 4시간 만에 3,100 CFU, 24시간 경과 시 3,600만 CFU/ml로 세균이 폭증하며 공기 중의 호기성 진균이 자라나 물곰팡이(진균 피막)를 형성합니다.",
  },
  {
    id: "oem-phrase-pet-mold-sample",
    fieldKey: "sampleCondition",
    category: "oem_pet",
    presetId: "preset-oem-pet-spoilage-mold",
    title: "외관: 개봉 음용 흔적 및 액면 물곰팡이(진균 피막) 부유",
    content:
      "캡 밀폐 안전링이 완전히 절단 분리된 개봉 음용 상태로, 액면 상부에 약 15mm 크기의 흰색 및 황갈색 솜털 모양 진균 군집(물곰팡이 Biofilm)이 형성되어 있음. 캡 나사산 부위에 타액 건조 잔류흔 관찰됨.",
  },
  {
    id: "oem-phrase-pet-mold-cause",
    fieldKey: "rootCause",
    category: "oem_pet",
    presetId: "preset-oem-pet-spoilage-mold",
    title: "원인: 개봉 후 음용 취급상 호기성 물곰팡이 2차 증식",
    content:
      "무보존료 액상차 특성상 개봉 후 직접 음용 과정에서 타액과 구강 상재균이 유입되었고, 이후 상온에 장시간 방치됨에 따라 잔여 산소와 결합하여 호기성 진균(물곰팡이) 및 일반세균이 기하급수적으로 증식(2,800만 CFU/ml)한 '개봉 후 취급상 변질'로 최종 규명됨.",
  },

  // =========================================================================
  // [12] 외주-PET 분리배출 에코 라벨 타공부 유통 충격 라벨 터짐
  // =========================================================================
  {
    id: "oem-phrase-pet-label-principle",
    fieldKey: "principle_magnifier",
    category: "oem_pet",
    presetId: "preset-oem-pet-label-tear",
    title: "라벨 절취선 타공(Perforation) 인장 강도 원리",
    content:
      "친환경 투명 페트 분리배출을 위한 에코 절취선은 소비자의 손가락 힘으로는 쉽게 뜯어져야 하고, 동시에 박스 적재 운반 중의 진동과 마찰 전단응력에는 견뎌야 하는 상충되는 임계 인장 강도를 요구합니다.",
  },
  {
    id: "oem-phrase-pet-label-cause",
    fieldKey: "rootCause",
    category: "oem_pet",
    presetId: "preset-oem-pet-label-tear",
    title: "원인: 분리배출 타공 개선 후 물류 유통 마찰 충격에 의한 찢어짐",
    content:
      "분리배출 편의성을 위해 타공 간격을 개선한 초기 제품군에서, 물류 팔레트 적재 및 차량 운송 중 박스 간 진동 마찰 압력이 타공 브릿지의 한계 인장력을 초과하여 절취선을 따라 국소적으로 터진 현상으로 분석됨. (음료 품질 이상 없음)",
  },

  // =========================================================================
  // [13] 외주-PET 용기 네크/바닥 크랙 및 공급사 성형 핀홀 누액
  // =========================================================================
  {
    id: "oem-phrase-pet-leak-principle",
    fieldKey: "principle_magnifier",
    category: "oem_pet",
    presetId: "preset-oem-pet-crack-pinhole",
    title: "가압 수침 검사를 통한 용기 크랙/핀홀 감식 원리",
    content:
      "용기 내부에 0.5kgf/cm² 공압을 가한 후 수조에 침지하여 발생하는 기포의 위치와 파단면 형태를 정밀 관찰함으로써, 캡 체결 불량인지, 블로우 몰딩 성형 핀홀인지, 유통 낙하 타격 크랙인지를 판정합니다.",
  },
  {
    id: "oem-phrase-pet-leak-cause",
    fieldKey: "rootCause",
    category: "oem_pet",
    presetId: "preset-oem-pet-crack-pinhole",
    title: "원인: 택배 물류 유통 중 취약 부위(Neck) 집중 충격에 의한 크랙 누액",
    content:
      "공장 전수 에어 리크 테스터를 통과한 정상 출하품이었으나, 택배 배송 중 외박스 낙하 충격 또는 상부 집중 하중으로 인해 PET 병의 취약 부위인 넥크(Neck) 라운드부에 모서리 타격이 가해져 미세 크랙이 발생하고 음료가 누액된 것으로 판정됨.",
  },

  // =========================================================================
  // [14] 외주-병 병 제품 오버캡 시계방향(역방향) 개봉에 따른 나사선 붕괴 헛돎
  // =========================================================================
  {
    id: "oem-phrase-bottle-overcap-principle",
    fieldKey: "principle_magnifier",
    category: "oem_bottle",
    presetId: "preset-oem-bottle-overcap-thread",
    title: "오버캡 이중구조 역방향 개봉 나사선 붕괴 원리",
    content:
      "오버캡 제품은 플라스틱 외장 캡 내부에 연질 알루미늄 캡이 감싸여 있어 내부가 보이지 않습니다. 소비자가 개봉 방향(반시계)을 오인하여 시계 방향(잠금 방향)으로 강하게 비틀 경우, 캡 나사선이 병 나사산 턱을 타고 넘어가며 영구 변형(나사선 뭉개짐)되어 헛돌게 됩니다.",
  },
  {
    id: "oem-phrase-bottle-overcap-cause",
    fieldKey: "rootCause",
    category: "oem_bottle",
    presetId: "preset-oem-bottle-overcap-thread",
    title: "원인: 시계방향(잠금방향) 역방향 무리한 회전에 따른 알루미늄 나사선 붕괴",
    content:
      "개봉 시 반시계 방향이 아닌 시계 방향으로 과도한 토크를 가하여 회전시킴으로써 내부 알루미늄 캡의 연질 나사선이 유리병 나사산 턱에 부딪혀 뭉개지고 펴져 발생한 '역방향 개봉에 의한 나사선 붕괴 헛돎'으로 규명됨.",
  },

  // =========================================================================
  // [16] 외주-병 병 제품 온장고(50~60℃) 2주일 초과 장기보관 단백질 변성 응고
  // =========================================================================
  {
    id: "oem-phrase-soymilk-principle",
    fieldKey: "principle_physicochemical",
    category: "oem_bottle",
    presetId: "preset-oem-bottle-soymilk-coagulation",
    title: "대두 단백질 고온 장기 노출 열변성 응고 원리",
    content:
      "두유의 주성분인 대두 단백질 글리시닌(Glycinin)은 50~60℃ 온장 상태에서 14일(2주일) 이상 연속 보관될 경우 유화 안정성이 깨지면서 단백질 분자 간 소수성 가교 결합을 통해 순두부/젤리 형태의 덩어리(응고 침전)로 분리됩니다. 이는 부패가 아닌 단백질 고유의 열역학적 열변성 현상입니다.",
  },
  {
    id: "oem-phrase-soymilk-cause",
    fieldKey: "rootCause",
    category: "oem_bottle",
    presetId: "preset-oem-bottle-soymilk-coagulation",
    title: "원인: 편의점 온장고 권장 보관 기한(2주일) 초과 장기 가온에 의한 단백질 변성",
    content:
      "판매처 온장고(50~60℃)에서 제품 라벨에 고지된 권장 보관 기한(2주일 이내)을 초과하여 장기간 가온 진열됨에 따라 대두 단백질이 물리화학적으로 열변성되어 순두부상으로 엉겨붙은 것으로, 미생물 시험 결과 완전 무균(0 CFU) 상태를 유지하여 변질이 아닌 온장 보관 수칙 미준수에 기인함.",
  },

  // =========================================================================
  // [17] 외주-젤리 젤리 제품 3대 결함 (검은 탄화물 / 데포지터 전분 / 젤리꼬리 갈변)
  // =========================================================================
  {
    id: "oem-phrase-jelly-foreign-principle",
    fieldKey: "principle_magnifier",
    category: "oem_jelly",
    presetId: "preset-oem-jelly-foreign-3types",
    title: "젤리 3대 성형 부산물(탄화물·전분·젤리꼬리) 감식 원리",
    content:
      "젤리 제품은 투명한 젤리 제형 특성상 미세 탄화물(솥 벽면 설탕 탄화), 데포지터 노즐 액떨어짐 비타민 원료 산화 갈변(젤리꼬리), 성형 트레이의 옥수수 전분 덩어리가 눈에 뚜렷이 띄며, 요오드 반응 및 연소 시험을 통해 무해한 제조 부산물임을 판별합니다.",
  },
  {
    id: "oem-phrase-jelly-foreign-cause",
    fieldKey: "rootCause",
    category: "oem_jelly",
    presetId: "preset-oem-jelly-foreign-3types",
    title: "원인: 배합 솥 미세 탄화물 및 노즐 비타민C 산화 갈변 제조 부산물",
    content:
      "검출된 물질은 외부 오염물이나 금속이 아니며, 농축 솥 표면의 미세 당액 탄화물, 데포지터 노즐 액떨어짐 비타민C 산화 갈변 꼬리, 성형 트레이 옥수수 전분 덩어리로 인체에 무해한 제조 공정 고유 부산물로 최종 판정됨.",
  },

  // =========================================================================
  // [18] 외주-젤리 하절기 고온 유통/보관에 따른 젤리 연화 및 녹아 뭉침
  // =========================================================================
  {
    id: "oem-phrase-jelly-melting-cause",
    fieldKey: "rootCause",
    category: "oem_jelly",
    presetId: "preset-oem-jelly-melting",
    title: "원인: 하절기 상온 초과 고온(35℃ 이상) 노출에 의한 젤라틴 겔 융해 뭉침",
    content:
      "젤라틴 및 펙틴 겔화제의 융점(32~35℃)을 초과하는 여름철 직사광선 또는 밀폐 차량 내 고온 환경에 장시간 노출됨에 따라 젤리가 녹아 한 덩어리로 엉겨붙은 '유통·소비 단계 고온 노출에 의한 열변형'으로 판정됨.",
  },

  // =========================================================================
  // [19] 외주-CAN 캔 엔드 탭(End Tab) 리벳 체결 불량 및 사각 개봉 파손
  // =========================================================================
  {
    id: "oem-phrase-can-tab-principle",
    fieldKey: "principle_magnifier",
    category: "oem_can",
    presetId: "preset-oem-can-tab-break",
    title: "캔 엔드 탭 지렛대 원리 및 리벳 체결 강도 감식 원리",
    content:
      "캔 탭 개봉은 지렛대 원리로 노즈(Nose)가 캔 뚜껑의 스코어 라인 잔류 두께(30~35㎛)를 먼저 뚫어야 합니다. 탭 체결 리벳 코킹 강도와 스코어 파열 하중의 균형을 계측하여 공급사 체결 편차인지 사각 비틀림 개봉인지를 규명합니다.",
  },
  {
    id: "oem-phrase-can-tab-cause",
    fieldKey: "rootCause",
    category: "oem_can",
    presetId: "preset-oem-can-tab-break",
    title: "원인: 캔 엔드 리벳 체결 편차 및 측면 사각 개봉 비틀림 복합 파손",
    content:
      "캔 엔드 공급사의 리벳 압착 강도 편차가 존재하는 상태에서 소비자가 탭을 수직이 아닌 측면 사각 방향으로 비틀어 당김으로써 스코어가 찢어지기 전 탭 결합부가 집중 전단 응력을 견디지 못하고 파손된 건으로 분석됨.",
  },

  // =========================================================================
  // [20] 외주-포/스틱 스틱포 실링부 액묻음 핀홀 누액 및 포 터짐
  // =========================================================================
  {
    id: "oem-phrase-pouch-leak-cause",
    fieldKey: "rootCause",
    category: "oem_pouch",
    presetId: "preset-oem-pouch-pinhole-leak",
    title: "원인: 고속 충전 시 실링부 내용액 비말 묻음(액물림 핀홀) 및 물류 충격 누액",
    content:
      "고점도 한방 농축액 충전 노즐 컷팅 시 미세 비말이 열접착 부위에 묻어 실란트 융착 불량(액물림 핀홀)이 형성되었고, 이후 택배 배송 중 외부 압축 하중을 받아 취약 부위로 진액이 누액된 것으로 분석됨.",
  },
];
