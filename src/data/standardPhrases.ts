import { StandardPhrase } from "../types";
import { OEM_STANDARD_PHRASES } from "./oemStandardPhrases";

export type { StandardPhrase };

export const DEFAULT_STANDARD_PHRASES: StandardPhrase[] = [
  ...OEM_STANDARD_PHRASES,
  // =========================================================================
  // [1] 시험법 및 검사 원리 (광동제약 자사 병 제품 공정/분석 원리)
  // =========================================================================
  {
    id: "principle-vis-kd-1",
    fieldKey: "principle_visual",
    category: "test_principle",
    title: "현품 외관 및 이물 정밀 육안 검사 원리",
    content:
      "공인 표준 광원(D65 기준) 하에서 시료의 외형 성상, 잔여량, 캡 실링 상태, 이물질의 물리적 형상(규격, 색상, 유연성)을 관능 및 비파괴 방식으로 정밀 육안 검사합니다.",
  },
  {
    id: "principle-glass-ripple-1",
    fieldKey: "principle_magnifier",
    category: "bottle_glass",
    presetId: "preset-bottle-glass-breakage",
    title: "타격점(Hitted mark) 및 원호형 물결무늬 파선 감식 원리",
    content:
      "유리병 외면에 외부 물리적 충격이 가해지면 외력 집중 부위에 국소적 '타격점(Hitted mark)'이 발생하며, 파괴 진행 선상에 중심부로부터 동심원을 그리는 원호 형태의 물결무늬(Ripple marks / 콘코이달 조개껍질 단면)가 형성됩니다. 이를 통해 공병 제조상 기포/불용성이물 결함인지 유통 중 외력 파손인지를 과학적으로 판별합니다.",
  },
  {
    id: "principle-glass-melt-1",
    fieldKey: "principle_microscope",
    category: "bottle_glass",
    presetId: "preset-bottle-glass-breakage",
    title: "유리 파편 단면 용융 여부 현미경 검사 원리",
    content:
      "광학 현미경으로 파편의 가장자리를 고배율 관찰하여 단면이 열에 의해 둥글게 융착된 '제병 공정 흡착 유리'인지, 상온에서 날카롭게 깨진 '유통 충격 취성 파단면(Brittle Fracture)'인지를 명확히 규명합니다.",
  },
  {
    id: "principle-vacuum-gauge-1",
    fieldKey: "principle_physicochemical",
    category: "bottle_mold",
    presetId: "preset-bottle-mold-vacuum-loss",
    title: "내압 진공도 측정 및 진공 파괴 감식 원리",
    content:
      "당사 병 제품(유리병 음료 등)은 100℃ 이상 고온 충전 및 밀봉 후 급속 냉각되어 병 내부가 강력한 음압(-30 kPa 이하)을 유지합니다. 캡 충격이나 미세 개봉으로 진공이 파괴되면 내압이 0 kPa(대기압)로 상승하여 외부 호기성 미생물(곰팡이)이 인입되는 원리를 이용합니다.",
  },
  {
    id: "principle-catalase-heat-1",
    fieldKey: "principle_catalase",
    category: "bottle_insect",
    presetId: "preset-bottle-insect-catalase",
    title: "카탈라아제(Catalase) 효소 열변성 판별 원리",
    content:
      "곤충 및 생체 조직에 존재하는 카탈라아제 효소는 100℃ 이상의 제조 살균 열처리를 거치면 단백질이 비가역적으로 변성되어 3% H2O2 반응 시 기포가 전혀 발생하지 않습니다(음성). 반면 개봉 후 유입된 생체 곤충은 활성 효소가 보존되어 산소 기포를 격렬히 분출(양성)하므로 가열 공정 전·후 혼입을 절대적으로 입증합니다.",
  },
  {
    id: "principle-hot-dissolve-1",
    fieldKey: "principle_physicochemical",
    category: "bottle_sediment",
    presetId: "preset-bottle-precipitate-caramelization",
    title: "90℃ 고온수 교반을 통한 탄화 침전물 감별 원리",
    content:
      "생약 농축액의 고유 침전물은 90℃ 고온수에서 교반 시 쉽게 재용해·분산됩니다. 반면 약국/편의점 온장고에서 60℃ 이상 장기 노출되어 당성분이 열분해된 캐러멜화(Caramelization) 탄화 침전물은 90℃ 고온수 및 1시간 물리적 교반에도 완전히 녹지 않는 불용성 특성을 나타냅니다.",
  },
  {
    id: "principle-ftir-cap-1",
    fieldKey: "principle_ftir",
    category: "bottle_plastic_ftir",
    presetId: "preset-bottle-cap-plastic-ftir",
    title: "FT-IR 캡 라이너 라이브러리 스펙트럼 대조 원리",
    content:
      "시료에 적외선을 조사하여 분자 결합 고유의 흡수 스펙트럼(Fingerprint)을 측정하고, 당사 캡 플라스틱 라이너 표준 스펙트럼과 대조하여 99% 이상의 신뢰도로 재질 동일성을 확증합니다.",
  },
  {
    id: "principle-case-impression-1",
    fieldKey: "principle_magnifier",
    category: "bottle_shortage",
    presetId: "preset-bottle-shortage-weight-checker",
    title: "10입 케이스 바닥 10구 원형 압흔(눌림 자국) 감식 원리",
    content:
      "10입 박스에 유리병이 장입되면 병의 자중(약 220g x 10)에 의해 바닥 골판지에 원형 병 바닥 압흔이 영구히 형성됩니다. 빈 공간 바닥에 원형 압흔이 선명히 존재하면 공장에서 10병 정상 장입 출하 후 유통 과정에서 1병이 인출되었음을 물리적으로 증명합니다.",
  },
  {
    id: "principle-fill-tolerance-1",
    fieldKey: "principle_physicochemical",
    category: "bottle_fill",
    presetId: "preset-bottle-fill-volume-fbi",
    title: "식품등의 표시기준 내용량 허용오차(4.5mL) 법적 원리",
    content:
      "'식품등의 표시·광고에 관한 법률 시행규칙' 상 내용량 허용오차는 50mL 초과 100mL 이하 기준 ±4.5mL입니다. 병 제품 100mL 규격의 경우 95.5mL 이상이면 법적 적합이며, 고속 충전 시 발생하는 순간 기포(Foam)와 병 유리 두께 편차로 인한 액면 차이는 정상 품질입니다.",
  },

  // =========================================================================
  // [2] 1. 파손 및 유리이물 (식품 이물보고 대상)
  // =========================================================================
  {
    id: "phrase-glass-sample-1",
    fieldKey: "sampleCondition",
    category: "bottle_glass",
    presetId: "preset-bottle-glass-breakage",
    title: "외관: 타격점 및 원호형 물결무늬 파편",
    content:
      "회수된 유리병 동체부 측면에 외부 충격에 의한 타격점(Hitted mark)이 뚜렷이 형성되어 있으며, 내부에서 길이 4.2mm의 날카로운 유리 파편이 발견됨. 파편 표면에서 타격점 중심 동심원형 물결무늬(Ripple marks) 관찰됨.",
  },
  {
    id: "phrase-glass-mag-1",
    fieldKey: "magnifierResult",
    category: "bottle_glass",
    presetId: "preset-bottle-glass-breakage",
    title: "확대경: 외력 충격 취성 파단면 확인",
    content:
      "20~40배 확대경 검사 결과, 파선이 타격점으로부터 내부로 관통하여 진행된 외부 충격 파손임이 확인됨. 공병 성형 시 발생하는 기포, 불용성 이물 등의 공급자 원자재 결함 흔적은 관찰되지 않음.",
  },
  {
    id: "phrase-glass-cause-1",
    fieldKey: "rootCause",
    category: "bottle_glass",
    presetId: "preset-bottle-glass-breakage",
    title: "원인: 유통 중 병간 충돌 또는 박스 운반 충격 파손",
    content:
      "유리 파편 표면의 명확한 타격점(Hitted mark)과 원호 형태 물결무늬로 볼 때, 당사 공정 불량이 아니며 유통 취급 과정(10입 케이스 내 병끼리 부딪힘 또는 100입 외박스 운반 중 낙하·충격)에서 발생한 외력 파손 조각으로 최종 판정됨. (식품위생법상 '식품 이물보고 대상'으로 규정 준수 조치 완료)",
  },
  {
    id: "phrase-glass-act-1",
    fieldKey: "preventiveAction",
    category: "bottle_glass",
    presetId: "preset-bottle-glass-breakage",
    title: "대책: 공병 공급사 관리 및 물류 완충 간지 보강",
    content:
      "1) 공병 공급사 수입 검사(기포, 불용성이물, 내압 강도) 샘플링 기준 강화(AQL 0.65 적용).\n2) 10입 케이스 내부 간지 완충력 보강 및 물류 파렛트 적재 높이 제한 기준 엄수.\n3) 식품 이물보고 대상 신속 회수 및 행정관청 전산 보고 절차 준수.",
  },

  // =========================================================================
  // [3] 2. 캡 불량 (스와빙오일 탄화 이물)
  // =========================================================================
  {
    id: "phrase-swab-sample-1",
    fieldKey: "sampleCondition",
    category: "bottle_cap_oil",
    presetId: "preset-bottle-cap-swabbing-oil",
    title: "외관: 캡 라이너 접촉부 흑색 탄화 반점",
    content:
      "캡 내부 흰색 실링 라이너 원주부(병구와 밀착되는 접촉면)에 직경 0.2~0.5mm 크기의 흑색 미세 반점 4점이 열융착 상태로 흡착되어 있음.",
  },
  {
    id: "phrase-swab-mic-1",
    fieldKey: "microscopeResult",
    category: "bottle_cap_oil",
    presetId: "preset-bottle-cap-swabbing-oil",
    title: "현미경: 스와빙 오일(Swabbing Oil) 고온 탄화물",
    content:
      "200배 광학 현미경 관찰 결과, 세포 조직이나 곰팡이 균사는 전혀 없으며 비결정질 유기 탄화물로 판명됨. 캡 성형 공정 중 펀치 윤활유로 사용하는 스와빙 오일(Swabbing Oil)의 고온 탄화물 성상과 일치.",
  },
  {
    id: "phrase-swab-cause-1",
    fieldKey: "rootCause",
    category: "bottle_cap_oil",
    presetId: "preset-bottle-cap-swabbing-oil",
    title: "원인: 캡 성형 공정 중 윤활유 탄화 (공급사 부자재 불량)",
    content:
      "캡 공급업체의 프레스 성형 공정에서 금형에 도포되는 펀치 윤활용 스와빙 오일(Swabbing Oil)이 국소 고온 조건에서 탄화되어 캡 라이너 수지에 압착 잔류된 협력사 원자재 불량 건으로 최종 판정됨.",
  },
  {
    id: "phrase-swab-act-1",
    fieldKey: "preventiveAction",
    category: "bottle_cap_oil",
    presetId: "preset-bottle-cap-swabbing-oil",
    title: "대책: 캡 제조사 시정요구(CAR) 및 에어 블로워 압력 상향",
    content:
      "1) 캡 제조업체에 스와빙 오일 정량 도포 제어 및 금형 정기 세척 주기 단축을 요구하는 공식 시정조치(CAR) 발행.\n2) 당사 캡 공급 라인 에어 집진 린서 노즐 분사 압력을 상향하여 라이너 잔류물 세정 강화.",
  },

  // =========================================================================
  // [4] 3. 기밀해제에 따른 곰팡이 변질 (캡 미세회전/내압 0kPa)
  // =========================================================================
  {
    id: "phrase-mold-sample-1",
    fieldKey: "sampleCondition",
    category: "bottle_mold",
    presetId: "preset-bottle-mold-vacuum-loss",
    title: "외관: 캡 미세회전 및 표면 곰팡이 군집",
    content:
      "외관상 캡이 닫혀 있으나 살짝 돌아가 기밀이 해제된 상태 확인. 병 상부 잔류액 표면에 직경 약 15mm의 흑갈색 부유성 곰팡이 균사체 덩어리가 관찰되며 산패취 동반됨.",
  },
  {
    id: "phrase-mold-vacuum-1",
    fieldKey: "physicochemicalSummary",
    category: "bottle_mold",
    presetId: "preset-bottle-mold-vacuum-loss",
    title: "내압 진공도: 정상 -30 kPa vs 현품 0 kPa (기밀 해제)",
    content:
      "진공 게이지 직결 측정 결과, 정상 공장 보관품은 -30 kPa의 강력한 음압 진공을 유지하고 있으나 현품은 0 kPa(대기압)로 확인되어 외부 공기가 지속 유입되었음이 과학적으로 입증됨.",
  },
  {
    id: "phrase-mold-mic-1",
    fieldKey: "microscopeResult",
    category: "bottle_mold",
    presetId: "preset-bottle-mold-vacuum-loss",
    title: "현미경: 호기성 진균류(Aspergillus / Penicillium) 균사",
    content:
      "200배 고배율 현미경 검사 결과 다수의 포자낭과 격벽 구조를 갖는 진균류 균사체 확인. 밀폐 진공 상태에서는 자랄 수 없으며 공기(산소)가 통하여 증식한 전형적인 호기성 곰팡이임.",
  },
  {
    id: "phrase-mold-cause-1",
    fieldKey: "rootCause",
    category: "bottle_mold",
    presetId: "preset-bottle-mold-vacuum-loss",
    title: "원인: 유통/보관 중 캡 미세회전 또는 충격에 의한 기밀해제",
    content:
      "당사 평택공장은 105℃ 가열 살균 및 자동 진공 검사기(Acoustic Vacuum Tester) 100% 합격 출하되었으나, 유통 단계(온장고 고온 노출, 외박스 충격 또는 눈에 보이지 않게 캡을 살짝 돌려놓은 미세 개봉)에서 기밀이 해제(내압 0 kPa)되어 공기 중 호기성 곰팡이가 인입·증식한 것으로 최종 판정됨.",
  },
  {
    id: "phrase-mold-act-1",
    fieldKey: "preventiveAction",
    category: "bottle_mold",
    presetId: "preset-bottle-mold-vacuum-loss",
    title: "대책: ROPP 캡 체결 토크 관리 및 온장고 보관 가이드 배포",
    content:
      "1) ROPP 캡퍼 롤러 가압력을 상향하여 비틀림 회전 저항 토크 기준 강화.\n2) 전국 유통처 대상 온장고 적정 온도(60℃ 이하) 및 14일 이내 판매 권장 가이드라인 지속 홍보.",
  },

  // =========================================================================
  // [5] 4. 벌레 혼입 클레임 (카탈라아제 시험 & 식품이물보고)
  // =========================================================================
  {
    id: "phrase-insect-sample-1",
    fieldKey: "sampleCondition",
    category: "bottle_insect",
    presetId: "preset-bottle-insect-catalase",
    title: "외관: 성충 파리 개체 수거 및 형태 관찰",
    content:
      "잔여액 내에서 약 6mm 크기의 검정파리과 성충 1개체 수거됨. 날개 막 구조와 다리가 온전하게 보존되어 있으며 외형적 압착 손상은 없음.",
  },
  {
    id: "phrase-insect-cat-1",
    fieldKey: "catalaseResult",
    category: "bottle_insect",
    presetId: "preset-bottle-insect-catalase",
    title: "카탈라아제 강양성: 가열 살균 미노출(개봉 후 유입 입증)",
    content:
      "수거된 곤충에 3% H2O2 적하 시 격렬한 산소 기포 다량 발생(강양성 확인). 105℃ 가열 살균 공정을 거쳤다면 체내 카탈라아제가 비가역적 열변성되어 기포가 전혀 생기지 않으므로, 본 시료는 가열 살균을 전혀 거치지 않은 비가열 생체 곤충임이 과학적으로 확증됨.",
  },
  {
    id: "phrase-insect-cause-1",
    fieldKey: "rootCause",
    category: "bottle_insect",
    presetId: "preset-bottle-insect-catalase",
    title: "원인: 카탈라아제 양성 판정 및 개봉 후 외부 유입",
    content:
      "당사 제조 공정은 3㎛ 마이크로 여과망과 105℃ 열처리 살균 공정을 거치므로 성충 곤충이 원형 그대로 통과하는 것은 물리적으로 불가능하며, 카탈라아제 효소 활성(양성) 결과 본 곤충은 살균 공정을 거치지 않았음이 입증됨. 따라서 제품 개봉 후 취식 대기 중 외부에서 날아들어 유입된 것으로 최종 판정됨. (식품위생법상 이물보고 절차 완료)",
  },
  {
    id: "phrase-insect-act-1",
    fieldKey: "preventiveAction",
    category: "bottle_insect",
    presetId: "preset-bottle-insect-catalase",
    title: "대책: 식품 이물보고 이행 및 공장 방충 3중 차단망 점검",
    content:
      "1) 식품위생법 제46조에 따른 행정관청 신속 보고 및 현품 조사 협조 완결.\n2) 평택공장 충전 클린룸 2중 에어커튼 풍속 상향 및 포충등 트랩 일일 점검 강화.\n3) 소비자 대상 개봉 즉시 음용 가이드 홍보.",
  },

  // =========================================================================
  // [6] 5. 생약 침전 vs 온장고 장기보관 탄화 (Caramelization)
  // =========================================================================
  {
    id: "phrase-sedi-sample-1",
    fieldKey: "sampleCondition",
    category: "bottle_sediment",
    presetId: "preset-bottle-precipitate-caramelization",
    title: "외관: 바닥 암갈색 응집 침전물 관찰",
    content:
      "용기 하단부에 흑갈색 침전물이 응집되어 있으며, 용기를 흔들었을 때 일부는 분산되나 바닥면에 끈적하게 눌어붙은 탄화 과립 잔류물이 관찰됨.",
  },
  {
    id: "phrase-sedi-dissolve-1",
    fieldKey: "physicochemicalSummary",
    category: "bottle_sediment",
    presetId: "preset-bottle-precipitate-caramelization",
    title: "용해 시험: 90℃ 고온수 교반 시 불용성 (온장고 탄화 확증)",
    content:
      "침전물을 분리하여 90℃ 고온수 및 1시간 마그네틱 바 교반 테스트를 실시한 결과, 정상 생약 침전물과 달리 완전히 녹지 않는 불용성 탄화물로 확인되어 온장고 고온 장기 노출에 의한 캐러멜화 탄화로 확증됨.",
  },
  {
    id: "phrase-sedi-cause-1",
    fieldKey: "rootCause",
    category: "bottle_sediment",
    presetId: "preset-bottle-precipitate-caramelization",
    title: "원인: 온장고 고온(60℃ 이상) 장기보관에 따른 당성분 캐러멜화",
    content:
      "본 제품은 대추, 숙지황 등 생약 고유 농축액을 함유하여 라벨에 '원료 성분에 의해 간혹 침전물이 생길 수 있으나 변질이 아니오니 안심하시고 잘 흔들어 드십시오'라고 명시되어 있음. 현품의 침전물은 유통처 온장고에서 권장 보관 온도 및 기간(60℃ 이하, 2주 이내)을 초과하여 장기 노출됨에 따라 당성분이 열분해되어 발생한 캐러멜화(Caramelization) 탄화 침전물로 판정됨.",
  },
  {
    id: "phrase-sedi-act-1",
    fieldKey: "preventiveAction",
    category: "bottle_sediment",
    presetId: "preset-bottle-precipitate-caramelization",
    title: "대책: 온장고 60℃ 이하 14일 권장 캠페인 및 안심 문구 강조",
    content:
      "1) 전국 약국/유통점 대상 '온장고 적정보관(60℃ 이하, 14일 이내 판매)' 권장 캠페인 스티커 배포.\n2) 라벨의 '침전물 안심 흔들어 드십시오' 안내 문구 가독성 개선.",
  },

  // =========================================================================
  // [7] 6. 캡 플라스틱 파편 혼입 (FT-IR 99.5% 일치)
  // =========================================================================
  {
    id: "phrase-cap-plastic-sample-1",
    fieldKey: "sampleCondition",
    category: "bottle_plastic_ftir",
    presetId: "preset-bottle-cap-plastic-ftir",
    title: "외관: 3.1mm 반투명 백색 수지 파편",
    content:
      "길이 약 3.1mm, 두께 0.4mm의 얇은 필름형 백색 플라스틱 파편 수거됨. 끝단이 사출 금형에서 뜯겨나간 버(Burr) 형상을 나타냄.",
  },
  {
    id: "phrase-cap-plastic-ftir-1",
    fieldKey: "ftirSummary",
    category: "bottle_plastic_ftir",
    presetId: "preset-bottle-cap-plastic-ftir",
    title: "FT-IR: 캡 플라스틱 라이너 스펙트럼과 99.5% 일치",
    content:
      "FT-IR 적외선 분광분석 결과, 이물의 적외선 흡수 스펙트럼이 당사 28mm 알루미늄 캡 내부 플라스틱 라이너(Cap Plastic Liner, HDPE/EVA)와 99.5% 완벽히 일치함을 확인.",
  },
  {
    id: "phrase-cap-plastic-cause-1",
    fieldKey: "rootCause",
    category: "bottle_plastic_ftir",
    presetId: "preset-bottle-cap-plastic-ftir",
    title: "원인: 캡 공급업체 사출 성형 버(Burr) 잔류 (협력사 불량)",
    content:
      "당사 배관의 3㎛ 정밀 여과 시스템상 조제액을 통한 유입은 불가능함. FT-IR 분석 결과 캡 플라스틱 라이너와 99.5% 일치하므로, 캡 공급업체의 사출 성형 공정 중 커팅 나이프 마모로 인해 미세 플라스틱 버(Burr)가 캡에 잔류 부착되어 입고된 공급자 부자재 결함으로 최종 규명됨.",
  },
  {
    id: "phrase-cap-plastic-act-1",
    fieldKey: "preventiveAction",
    category: "bottle_plastic_ftir",
    presetId: "preset-bottle-cap-plastic-ftir",
    title: "대책: 캡 협력사 펀칭 커터 교체 주기 단축 및 에어 린서 보강",
    content:
      "1) 캡 제조 협력사에 사출 펀칭 커터 교체 주기를 50% 단축하고 사출 비전 검사 감도를 상향하도록 시정조치 요구.\n2) 당사 캡 공급 라인 에어 린서 풍속 및 집진 필터 관리 기준 상향.",
  },

  // =========================================================================
  // [8] 7. 수량 부족 (10입 케이스 1병 부족 & 중량선별기 검증)
  // =========================================================================
  {
    id: "phrase-short-sample-1",
    fieldKey: "sampleCondition",
    category: "bottle_shortage",
    presetId: "preset-bottle-shortage-weight-checker",
    title: "외관: 케이스 바닥면 10개 원형 압흔(눌림 자국) 선명",
    content:
      "고객 반납 10입 종이 케이스 내부를 확인한 결과, 비어있던 1개 구역을 포함하여 바닥면 10개 전 구역에 유리병 바닥 널링(Knurling)에 의한 원형 압흔 자국이 선명히 압인되어 있음.",
  },
  {
    id: "phrase-short-weight-1",
    fieldKey: "productionLogNote",
    category: "bottle_shortage",
    presetId: "preset-bottle-shortage-weight-checker",
    title: "설비: 인카토너 자동 중량선별기(Weight Checker) 100% 검증",
    content:
      "당사 카토너 라인 중량선별기는 기준 중량 2,230g ± 35g으로 가동되며 1병(약 220g) 부족 시 100% 자동 에어 리젝트 배출되므로 제조 공정 상 9병 출하는 물리적으로 불가능함.",
  },
  {
    id: "phrase-short-cause-1",
    fieldKey: "rootCause",
    category: "bottle_shortage",
    presetId: "preset-bottle-shortage-weight-checker",
    title: "원인: 공장 10병 정상 출하 후 유통 취급 과정 1병 인출",
    content:
      "인카토너 직후 초정밀 자동 중량선별기 100% 전수 인터록 검증 및 회수 케이스 바닥면 10구 전 구역에 선명히 잔존하는 원형 압흔 자국으로 볼 때, 공장 출하 시에는 10병이 완벽히 장입 출하된 후 유통 매장 진열 또는 취급 중 1병이 임의 인출된 것으로 최종 판정됨.",
  },
  {
    id: "phrase-short-act-1",
    fieldKey: "preventiveAction",
    category: "bottle_shortage",
    presetId: "preset-bottle-shortage-weight-checker",
    title: "대책: 케이스 봉함 핫멜트 접착력 강화 및 매장 취급 협조",
    content:
      "1) 10입 케이스 날개 핫멜트 접착 면적을 넓혀 외부 임의 개봉 시 케이스 파손 흔적이 남도록 봉인력 강화.\n2) 유통 매장 대상 묶음 제품 임의 낱개 판매 방지 협조 공문 배포.",
  },

  // =========================================================================
  // [9] 8. 충전량 부족 및 누액 (FBI 액위 검사 & 표시기준 허용오차)
  // =========================================================================
  {
    id: "phrase-fill-sample-1",
    fieldKey: "sampleCondition",
    category: "bottle_fill",
    presetId: "preset-bottle-fill-volume-fbi",
    title: "외관: 미개봉 상태 액면 높이 편차",
    content:
      "미개봉 현품 수거 완료. 캡 실링 기밀도 양호하며 외부 누액 흔적 없음. 육안상 표준선 대비 약 3mm 낮은 액위 관찰됨.",
  },
  {
    id: "phrase-fill-measure-1",
    fieldKey: "physicochemicalSummary",
    category: "bottle_fill",
    presetId: "preset-bottle-fill-volume-fbi",
    title: "계량: 실측 97.4 mL (법적 허용오차 4.5mL 적합 범위 내)",
    content:
      "정밀 천칭 실측 결과 내용량 97.4 mL로 확인됨. '식품등의 표시기준' 상 100mL 기준 법적 허용오차는 ±4.5mL(95.5mL 이상)이므로 법적 규격을 완벽히 충족하는 정상 적합 제품임.",
  },
  {
    id: "phrase-fill-cause-1",
    fieldKey: "rootCause",
    category: "bottle_fill",
    presetId: "preset-bottle-fill-volume-fbi",
    title: "원인: 고속 충전 거품 및 병 두께 편차 (법적 기준 이내 적합)",
    content:
      "실측 계량 결과 97.4 mL로 법적 기준(95.5mL 이상)을 완벽히 만족함. 고속 충전 밸브의 순간 거품 발생 편차 및 유리병 두께 편차로 액면이 다소 낮아 보였을 뿐 내용량에는 이상이 없는 정상 적합품임.",
  },
  {
    id: "phrase-fill-act-1",
    fieldKey: "preventiveAction",
    category: "bottle_fill",
    presetId: "preset-bottle-fill-volume-fbi",
    title: "대책: 충전 노즐 소포망 점검 및 FBI C라인 센서 튜닝",
    content:
      "1) 충전 노즐 소포망의 미세 파손 여부를 일일 점검하여 액면 편차 최소화.\n2) FBI 액위 광학 센서의 마진을 엄격히 튜닝하여 정량 관리 강화.",
  },

  // =========================================================================
  // [10] 9. 포장 불량 - 라벨 이상 (무라벨/접착제 마찰 전사)
  // =========================================================================
  {
    id: "phrase-label-sample-1",
    fieldKey: "sampleCondition",
    category: "bottle_label",
    presetId: "preset-bottle-label-defect",
    title: "외관: 라벨 뒤집힘 및 병 외벽 접착제(풀칠 자국) 전사",
    content:
      "라벨 끝단이 접혀 있으며 반대편 유리병 외벽에 라벨 접착제(풀칠 자국) 흔적이 지저분하게 묻어 있음 확인.",
  },
  {
    id: "phrase-label-cause-1",
    fieldKey: "rootCause",
    category: "bottle_label",
    presetId: "preset-bottle-label-defect",
    title: "원인: 컨베이어 일시 정지로 인한 병 간 마찰 풀칠 전사",
    content:
      "라벨링 이후 후단 포장 설비 일시 정지로 컨베이어 상에서 병 제품들이 서로 맞닿아 정체되는 과정에서 미건조된 라벨 접착제가 인접 병에 비벼지며 전사 부착된 것으로 확인됨.",
  },
  {
    id: "phrase-label-act-1",
    fieldKey: "preventiveAction",
    category: "bottle_label",
    presetId: "preset-bottle-label-defect",
    title: "대책: B/C라인 무라벨 점 감지 센서 교체 및 감속 인터록",
    content:
      "1) B/C라인 무라벨 센서를 '면 감지'에서 정밀 '점 감지' 광학 방식으로 전면 교체하고 브라켓을 '간격 조절식'으로 개선 완료.\n2) 라벨러 후단 정체 시 자동 감속 인터록 로직 구축.",
  },

  // =========================================================================
  // [11] 10. 포장 불량 - 10입 케이스 소비기한 미인쇄 & 핫멜트 부착
  // =========================================================================
  {
    id: "phrase-hotmelt-sample-1",
    fieldKey: "sampleCondition",
    category: "bottle_hotmelt",
    presetId: "preset-bottle-packaging-inkjet-hotmelt",
    title: "외관: 10입 박스 날인 누락 및 병 외면 굳은 핫멜트 수지",
    content:
      "10입 외박스 상단 소비기한 인쇄란 공란 확인. 내부 병 어깨 부위에 반투명 백색의 탄성 고무상 접착제 덩어리(핫멜트) 부착 확인.",
  },
  {
    id: "phrase-hotmelt-cause-1",
    fieldKey: "rootCause",
    category: "bottle_hotmelt",
    presetId: "preset-bottle-packaging-inkjet-hotmelt",
    title: "원인: 외박스 잉크젯 노즐 일시 막힘 및 카토너 핫멜트 타이밍 오류",
    content:
      "개별 병 라벨에는 정상 소비기한이 100% 인쇄되었으나, 10입 케이스 잉크젯 프린터 노즐의 일시적 잉크 건조 막힘으로 외박스 인쇄가 누락됨. 병 외면 부착물은 인카토너 접지 과정에서 묻은 무독성 포장용 핫멜트 접착제임.",
  },
  {
    id: "phrase-hotmelt-act-1",
    fieldKey: "preventiveAction",
    category: "bottle_hotmelt",
    presetId: "preset-bottle-packaging-inkjet-hotmelt",
    title: "대책: 잉크젯 프린터 신형 교체, 외박스 비전 카메라 연동",
    content:
      "1) 10입 케이스 노후 잉크젯 프린터를 신형으로 교체하고 외박스 인쇄 누락 감지 비전 카메라 신설 연동.\n2) 인카토너 핫멜트 분사 노즐 각도 재세팅으로 병 접촉 원천 차단.",
  },

  // =========================================================================
  // [12] 보관품 및 공통 조사 문구
  // =========================================================================
  {
    id: "phrase-retained-common-1",
    fieldKey: "retainedSampleCheck",
    category: "general",
    title: "보관품: 동일 Lot 공장 보관품 전수 정상",
    content:
      "당사 공장 보관품(동일 Lot 50병)을 무작위 추출하여 정밀 투시 및 성상, 진공도, 이물 검사를 실시한 결과 일체의 변질이나 이물 혼입 없이 100% 정상 품질을 유지하고 있음을 확증하였습니다.",
  },
  {
    id: "phrase-apology-common-1",
    fieldKey: "apologyText",
    category: "general",
    title: "안내: 정중한 고객 안심 및 사과 문구",
    content:
      "저희 광동제약 제품을 믿고 이용해 주신 고객님께 심려와 불편을 끼쳐드려 진심으로 사과드립니다. 고객님의 소중한 지적을 겸허히 수용하여 원부자재 입고부터 최종 유통까지 더욱 철저한 품질 관리를 실천하겠습니다.",
  },
];

const MANAGED_PHRASES_STORAGE_KEY = "food_qc_managed_phrases_v4_kwangdong_internal";

export function loadAllPhrases(): StandardPhrase[] {
  try {
    const raw = localStorage.getItem(MANAGED_PHRASES_STORAGE_KEY);
    if (raw) {
      const parsed: StandardPhrase[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Notice: Unable to load managed phrases from storage", e);
  }
  return DEFAULT_STANDARD_PHRASES;
}

export function saveAllPhrases(phrases: StandardPhrase[]): void {
  try {
    localStorage.setItem(MANAGED_PHRASES_STORAGE_KEY, JSON.stringify(phrases));
  } catch (e) {
    console.warn("Notice: Unable to save managed phrases to storage", e);
  }
}

export function resetAllPhrasesToDefault(): StandardPhrase[] {
  try {
    localStorage.removeItem(MANAGED_PHRASES_STORAGE_KEY);
  } catch (e) {
    console.warn("Notice: Unable to reset phrases in storage", e);
  }
  return DEFAULT_STANDARD_PHRASES;
}

// Backwards compatibility aliases
export const getAllPhrases = loadAllPhrases;
export const loadCustomPhrases = loadAllPhrases;
export const saveCustomPhrases = saveAllPhrases;
export const getAllPhrasesForField = (fieldKey: string, activePresetId?: string): StandardPhrase[] => {
  const all = loadAllPhrases().filter((p) => p.fieldKey === fieldKey);
  if (!activePresetId) return all;
  // Sort phrases matching the active preset to the top
  return all.sort((a, b) => {
    if (a.presetId === activePresetId && b.presetId !== activePresetId) return -1;
    if (a.presetId !== activePresetId && b.presetId === activePresetId) return 1;
    return 0;
  });
};
export const getStandardPhrasesByField = getAllPhrasesForField;
export const getPhrasesByPreset = (presetId: string): StandardPhrase[] => {
  return loadAllPhrases().filter((p) => p.presetId === presetId);
};


