const STORAGE_KEY = "moi-style-profile-v1";
const ANALYSIS_CLIENT_KEY = "moi-style-analysis-client-v1";
const APP_VERSION = window.MOI_CONFIG?.appVersion?.trim() || "0.2.11";
const MIN_SPLASH_MS = 2000;
const splashStartedAt = performance.now();

const faceShapes = {
  oval: {
    label: "계란형",
    hair: "소프트 레이어드 C컬",
    fringe: "시스루뱅 또는 자연스러운 사이드뱅",
    tip: "전체 균형이 좋아 길이보다 원하는 무드를 우선해도 좋아요.",
    avoid: "한쪽만 지나치게 무거운 비대칭 볼륨"
  },
  round: {
    label: "둥근형",
    hair: "페이스라인 롱 레이어드",
    fringe: "가볍게 흐르는 사이드뱅",
    tip: "정수리 볼륨과 턱 아래로 이어지는 선이 얼굴을 길고 가볍게 보여줘요.",
    avoid: "볼 옆에서 끝나는 무거운 일자 단발"
  },
  square: {
    label: "각진형",
    hair: "소프트 웨이브 레이어드",
    fringe: "턱선으로 이어지는 커튼뱅",
    tip: "관자와 턱선 주변에 부드러운 곡선을 더하면 윤곽이 자연스러워져요.",
    avoid: "턱선과 정확히 맞닿는 각진 원랭스"
  },
  long: {
    label: "긴형",
    hair: "미디엄 C컬 보브",
    fringe: "눈썹선의 가벼운 풀뱅",
    tip: "옆 볼륨과 이마를 살짝 덮는 앞머리가 세로 비율을 편안하게 맞춰줘요.",
    avoid: "정수리만 높인 긴 생머리"
  },
  heart: {
    label: "하트형",
    hair: "턱선 볼륨 보브",
    fringe: "얇고 긴 사이드뱅",
    tip: "턱 주변에 볼륨을 더하고 이마는 가볍게 열어 전체 비율을 맞춰보세요.",
    avoid: "윗부분만 풍성한 짧은 레이어"
  },
  unknown: {
    label: "얼굴형 모름 · 범용",
    hair: "얼굴선을 가볍게 잇는 소프트 레이어드",
    fringe: "시스루뱅 또는 자연스러운 사이드뱅",
    tip: "얼굴형을 특정하지 않고 대부분에게 안정적인 균형을 만드는 추천이에요.",
    avoid: "얼굴 옆을 완전히 가리는 무거운 실루엣",
    isUnknown: true
  }
};

const personalColors = {
  spring: {
    label: "봄 웜",
    title: "햇살을 머금은 듯\n생기 있는 균형.",
    summary: "맑고 따뜻한 색을 얼굴 가까이에 두면 피부의 생기가 또렷해져요.",
    palette: ["#f3b284", "#f6d18b", "#ef8d73", "#9eb77a"],
    hairColor: "허니 베이지 브라운",
    hairAlt: ["밀크 브라운", "피치 브라운", "골든 카키"],
    brow: ["라이트 웜 브라운", "#8a6048"],
    lens: ["허니 브라운", "#9d7458"],
    lip: ["로지 코랄", "#d96f62"],
    shadow: ["샴페인 피치", "#d9a17c"],
    nail: ["살구 코랄", "#e38b6d"],
    best: ["아이보리", "피치", "애플 그린"],
    outfit: "아이보리 니트 + 라이트 데님",
    avoid: "탁한 차콜이나 푸른 기가 강한 버건디"
  },
  summer: {
    label: "여름 쿨",
    title: "안개처럼 맑고\n부드러운 온도.",
    summary: "푸른 기가 살짝 감도는 가벼운 색이 피부 결을 섬세하게 정돈해 보여요.",
    palette: ["#c69aab", "#b9b8d5", "#9cb5c5", "#eee7ec"],
    hairColor: "애쉬 로즈 브라운",
    hairAlt: ["밀크 애쉬", "소프트 코코아", "라벤더 브라운"],
    brow: ["그레이시 브라운", "#796c6d"],
    lens: ["뮤트 그레이", "#8d929c"],
    lip: ["로즈 모브", "#b96478"],
    shadow: ["라벤더 토프", "#aa93aa"],
    nail: ["밀키 라일락", "#b59bb8"],
    best: ["소프트 화이트", "라일락", "블루 그레이"],
    outfit: "라일락 셔츠 + 그레이 슬랙스",
    avoid: "노란 기가 강한 카멜이나 형광 오렌지"
  },
  autumn: {
    label: "가을 웜",
    title: "차분한 깊이와\n편안한 존재감.",
    summary: "자연에서 온 듯한 깊고 따뜻한 색이 이목구비를 안정감 있게 살려줘요.",
    palette: ["#a85d3f", "#c18a4d", "#747a54", "#d9b989"],
    hairColor: "딥 초콜릿 브라운",
    hairAlt: ["올리브 브라운", "시나몬 브라운", "다크 카키"],
    brow: ["내추럴 브라운", "#715442"],
    lens: ["올리브 브라운", "#77735b"],
    lip: ["브릭 로즈", "#a95042"],
    shadow: ["카멜 브론즈", "#a87851"],
    nail: ["테라코타", "#a75b45"],
    best: ["크림", "카멜", "포레스트 그린"],
    outfit: "카멜 재킷 + 크림 팬츠",
    avoid: "차갑고 옅은 파스텔이나 새하얀 화이트"
  },
  winter: {
    label: "겨울 쿨",
    title: "선명한 대비와\n도회적인 리듬.",
    summary: "깨끗한 대비와 선명한 컬러가 얼굴의 또렷한 인상을 가장 멋지게 보여줘요.",
    palette: ["#9c2450", "#26345d", "#f2f1f3", "#4b3e63"],
    hairColor: "블루 블랙",
    hairAlt: ["다크 애쉬", "플럼 브라운", "쿨 에스프레소"],
    brow: ["다크 그레이", "#4d494e"],
    lens: ["딥 그레이", "#666d7a"],
    lip: ["체리 베리", "#a82f57"],
    shadow: ["플럼 토프", "#80627c"],
    nail: ["딥 와인", "#76243f"],
    best: ["퓨어 화이트", "네이비", "마젠타"],
    outfit: "화이트 셔츠 + 네이비 팬츠",
    avoid: "누렇게 바랜 베이지나 흐릿한 웜 파스텔"
  },
  unknown: {
    label: "퍼스널컬러 모름 · 뉴트럴",
    title: "무난한 온도와\n부드러운 균형.",
    summary: "퍼스널컬러를 확정하지 않고 웜·쿨 부담이 적은 뉴트럴 팔레트로 시작해요.",
    palette: ["#efe4d9", "#c9b8a8", "#8d8077", "#e8b6a2"],
    hairColor: "뉴트럴 브라운",
    hairAlt: ["소프트 코코아", "밀크 브라운", "로즈 베이지"],
    brow: ["뉴트럴 브라운", "#74645a"],
    lens: ["소프트 브라운", "#867368"],
    lip: ["말린 장미 베이지", "#bd766d"],
    shadow: ["토프 베이지", "#a89284"],
    nail: ["밀키 로즈", "#d3a397"],
    best: ["소프트 아이보리", "토프", "더스티 로즈"],
    outfit: "아이보리 셔츠 + 토프 팬츠",
    avoid: "형광에 가까운 고채도 컬러나 얼굴을 누르는 과한 블랙",
    isUnknown: true
  }
};

const moods = {
  clean: {
    label: "클린",
    english: "Clean & Clear",
    accent: "선을 정돈하고 한 가지 컬러 포인트",
    makeup: "결을 살린 눈썹과 얇은 베이스, 맑은 립",
    piece: "구조적인 셔츠",
    detail: "작은 실버 또는 골드 이어링"
  },
  lovely: {
    label: "러블리",
    english: "Soft & Lovely",
    accent: "둥근 실루엣과 은은한 혈색",
    makeup: "볼 중앙의 블러셔와 촉촉한 그러데이션 립",
    piece: "부드러운 카디건",
    detail: "작은 펄 또는 리본 포인트"
  },
  chic: {
    label: "시크",
    english: "Modern & Chic",
    accent: "날렵한 선과 한 단계 깊은 포인트",
    makeup: "정돈된 브로우와 눈꼬리 음영, 선명한 립",
    piece: "직선적인 재킷",
    detail: "볼드한 메탈 액세서리"
  },
  natural: {
    label: "내추럴",
    english: "Easy & Natural",
    accent: "힘을 뺀 소재와 자연스러운 결",
    makeup: "얇은 피부 표현과 베이지 음영, 편안한 립",
    piece: "텍스처가 있는 니트",
    detail: "레더 또는 우드 소재 포인트"
  }
};

const styleTargets = {
  female: {
    label: "여성 기준",
    hint: "메이크업·헤어·의상",
    summary: "메이크업 컬러, 헤어 디테일, 의상 실루엣을 조금 더 섬세하게 맞춰요.",
    title: "여성 스타일 기준",
    beautyLabel: "메이크업",
    beautyTitle: "뷰티 팔레트",
    beautyDescription: "메이크업 컬러를 한 팔레트로 정리했어요",
    nearShopQuery: "퍼스널 컬러 헤어 메이크업",
    shoppingSuffix: "여성 코디",
    careMakeupTitle: "메이크업 제품",
    careNailTitle: "네일 · 페디",
    shopLabel: "메이크업·네일숍"
  },
  male: {
    label: "남성 기준",
    hint: "헤어·그루밍·핏",
    summary: "헤어 실루엣, 피부 톤 정리, 옷의 핏과 소재를 중심으로 맞춰요.",
    title: "남성 스타일 기준",
    beautyLabel: "그루밍",
    beautyTitle: "그루밍 팔레트",
    beautyDescription: "피부 톤, 눈썹, 립밤, 손 관리까지 실용적으로 정리했어요",
    nearShopQuery: "남자 퍼스널 컬러 헤어 그루밍",
    shoppingSuffix: "남성 코디",
    careMakeupTitle: "그루밍 제품",
    careNailTitle: "손 · 발 정리",
    shopLabel: "헤어·그루밍숍",
    hairByFace: {
      oval: "소프트 리프컷 또는 가벼운 가르마",
      round: "상단 볼륨을 살린 가르마·리젠트",
      square: "모서리를 부드럽게 덜어낸 텍스처 크롭",
      long: "옆 볼륨을 남긴 미디엄 가르마",
      heart: "이마를 과하게 가리지 않는 댄디 리프",
      unknown: "자연스러운 가르마 또는 소프트 리프컷"
    },
    fringeByFace: {
      oval: "가볍게 넘기는 앞머리",
      round: "이마를 살짝 여는 사이드 파트",
      square: "각을 누그러뜨리는 텍스처 앞머리",
      long: "이마 일부를 덮는 자연스러운 뱅",
      heart: "윗볼륨을 낮춘 사이드뱅",
      unknown: "얼굴선을 가볍게 여는 사이드 파트"
    },
    hairTipByFace: {
      oval: "균형이 좋아 짧은 길이와 미디엄 모두 잘 맞아요. 오늘 무드에 맞춰 질감만 정리해도 충분해요.",
      round: "윗부분에 높이를 만들고 옆 라인은 너무 둥글게 남기지 않으면 얼굴이 더 길고 가벼워 보여요.",
      square: "옆머리와 턱선 주변의 각을 딱딱하게 세우기보다, 질감으로 부드럽게 풀어주는 편이 좋아요.",
      long: "정수리만 높이는 스타일보다 옆 볼륨을 조금 남겨 세로 비율을 편안하게 맞춰보세요.",
      heart: "윗부분만 과하게 풍성해지지 않게 하고, 이마와 턱선의 균형을 함께 보는 게 좋아요.",
      unknown: "얼굴형을 특정하지 않고도 실패 확률이 낮은 자연스러운 가르마와 적당한 질감을 추천해요."
    },
    hairAvoidByFace: {
      oval: "정수리만 과하게 세운 날카로운 볼륨",
      round: "옆 볼륨이 둥글게 퍼지는 무거운 투블럭",
      square: "턱선 각을 더 세게 보이게 하는 딱 끊긴 라인",
      long: "세로감을 더 키우는 높은 포마드",
      heart: "윗부분만 큰 볼륨과 짧은 옆 라인",
      unknown: "얼굴 옆을 완전히 누르거나 가리는 극단적인 실루엣"
    },
    outfitByColor: {
      spring: "아이보리 오버셔츠 + 라이트 데님",
      summer: "스카이 블루 셔츠 + 그레이 슬랙스",
      autumn: "카멜 니트 폴로 + 크림 치노",
      winter: "화이트 티셔츠 + 네이비 재킷",
      unknown: "화이트 셔츠 + 토프 치노"
    },
    pieceByMood: {
      clean: "옥스퍼드 셔츠",
      lovely: "부드러운 니트",
      chic: "테일러드 재킷",
      natural: "텍스처 니트 또는 오버셔츠"
    },
    detailByMood: {
      clean: "얇은 시계와 깨끗한 스니커즈",
      lovely: "라운드 안경이나 부드러운 니트 짜임",
      chic: "블랙 벨트와 메탈 워치",
      natural: "레더 또는 스웨이드 소품"
    },
    beautyByMood: {
      clean: "정돈된 눈썹과 얇은 톤 보정, 무색 립밤",
      lovely: "피부 결을 살린 보습과 부드러운 브라운 브로우",
      chic: "선명한 눈썹 라인과 번들거림 없는 세미매트 피부",
      natural: "수분감 있는 피부와 자연스러운 립밤, 손 정리"
    }
  },
  neutral: {
    label: "상관없음",
    hint: "젠더리스 균형",
    summary: "성별 표현을 강하게 타지 않는 헤어, 그루밍, 옷의 균형으로 추천해요.",
    title: "젠더리스 기준",
    beautyLabel: "뷰티·그루밍",
    beautyTitle: "뷰티·그루밍 팔레트",
    beautyDescription: "컬러와 결 정리를 부담 없이 쓸 수 있게 정리했어요",
    nearShopQuery: "퍼스널 컬러 헤어 스타일링",
    shoppingSuffix: "유니섹스 코디",
    careMakeupTitle: "뷰티·그루밍 제품",
    careNailTitle: "손 · 발 정리",
    shopLabel: "헤어·스타일링숍",
    outfitByColor: {
      spring: "아이보리 셔츠 + 라이트 데님",
      summer: "소프트 블루 셔츠 + 그레이 팬츠",
      autumn: "카멜 니트 + 크림 팬츠",
      winter: "화이트 셔츠 + 네이비 팬츠",
      unknown: "아이보리 셔츠 + 토프 팬츠"
    },
    hairByFace: {
      oval: "자연스러운 레이어 또는 가벼운 가르마",
      round: "상단 볼륨과 열린 얼굴선의 레이어",
      square: "각을 부드럽게 푸는 텍스처 레이어",
      long: "옆 볼륨을 살린 미디엄 실루엣",
      heart: "윗볼륨을 낮춘 소프트 레이어",
      unknown: "자연스러운 레이어 또는 가벼운 가르마"
    },
    fringeByFace: {
      oval: "가볍게 흐르는 앞머리/가르마",
      round: "이마를 살짝 여는 사이드 라인",
      square: "윤곽을 부드럽게 잇는 텍스처 라인",
      long: "세로감을 낮추는 가벼운 앞선",
      heart: "윗부분을 가볍게 정리한 사이드 라인",
      unknown: "얼굴선을 가볍게 여는 사이드 라인"
    },
    pieceByMood: {
      clean: "구조적인 셔츠",
      lovely: "부드러운 니트",
      chic: "직선적인 재킷",
      natural: "텍스처가 있는 니트"
    },
    beautyByMood: {
      clean: "정돈된 눈썹과 얇은 톤 정리, 맑은 립 케어",
      lovely: "보습감 있는 피부와 부드러운 혈색, 과하지 않은 결",
      chic: "선명한 브로우와 세미매트 피부, 차분한 립밤",
      natural: "수분감 있는 피부와 자연스러운 립 케어, 손 정리"
    }
  }
};

const targetVisuals = {
  male: {
    face: {
      oval: [{ id: "614810", alt: "자연스러운 가르마와 정돈된 남성 헤어 참고 사진", credit: "Pexels" }],
      round: [{ id: "220453", alt: "상단 볼륨을 살린 남성 헤어 참고 사진", credit: "Pexels" }],
      square: [{ id: "91227", alt: "텍스처가 살아 있는 짧은 남성 헤어 참고 사진", credit: "Pexels" }],
      long: [{ id: "2379004", alt: "미디엄 길이의 남성 헤어 참고 사진", credit: "Pexels" }],
      heart: [{ id: "1681010", alt: "이마를 자연스럽게 여는 남성 헤어 참고 사진", credit: "Pexels" }],
      unknown: [{ id: "614810", alt: "실패 확률이 낮은 자연스러운 남성 헤어 참고 사진", credit: "Pexels" }]
    },
    hairColor: {
      spring: [{ id: "614810", alt: "밝고 따뜻한 브라운 남성 헤어 컬러 참고 사진", credit: "Pexels" }],
      summer: [{ id: "220453", alt: "차분한 쿨 브라운 남성 헤어 컬러 참고 사진", credit: "Pexels" }],
      autumn: [{ id: "2379004", alt: "깊은 브라운 남성 헤어 컬러 참고 사진", credit: "Pexels" }],
      winter: [{ id: "91227", alt: "다크 브라운과 블랙 남성 헤어 컬러 참고 사진", credit: "Pexels" }],
      unknown: [{ id: "1681010", alt: "뉴트럴 브라운 남성 헤어 컬러 참고 사진", credit: "Pexels" }]
    },
    beauty: {
      spring: [{ id: "3764013", alt: "깔끔한 남성 스킨케어와 그루밍 참고 사진", credit: "Pexels" }],
      summer: [{ id: "3777931", alt: "차분한 남성 그루밍 제품 참고 사진", credit: "Pexels" }],
      autumn: [{ id: "3757957", alt: "브라운 톤 남성 그루밍 무드 참고 사진", credit: "Pexels" }],
      winter: [{ id: "3814446", alt: "선명하고 정돈된 남성 그루밍 참고 사진", credit: "Pexels" }],
      unknown: [{ id: "3764013", alt: "기본 남성 그루밍 제품 참고 사진", credit: "Pexels" }]
    },
    nail: {
      spring: [{ id: "3757957", alt: "깨끗한 손 관리와 그루밍 참고 사진", credit: "Pexels" }],
      summer: [{ id: "3764013", alt: "차분한 핸드케어 참고 사진", credit: "Pexels" }],
      autumn: [{ id: "3777931", alt: "단정한 손 관리 참고 사진", credit: "Pexels" }],
      winter: [{ id: "3814446", alt: "깔끔한 손 정리 참고 사진", credit: "Pexels" }],
      unknown: [{ id: "3757957", alt: "기본 손 관리 참고 사진", credit: "Pexels" }]
    },
    outfit: {
      spring: [{ id: "1043474", alt: "아이보리 셔츠와 라이트 데님 남성 착장 참고 사진", credit: "Pexels" }],
      summer: [{ id: "1222271", alt: "블루 셔츠와 차분한 남성 착장 참고 사진", credit: "Pexels" }],
      autumn: [{ id: "769749", alt: "카멜과 브라운 계열 남성 착장 참고 사진", credit: "Pexels" }],
      winter: [{ id: "428340", alt: "화이트와 네이비 중심 남성 착장 참고 사진", credit: "Pexels" }],
      unknown: [{ id: "1043473", alt: "화이트 셔츠와 뉴트럴 팬츠 남성 착장 참고 사진", credit: "Pexels" }]
    },
    mood: {
      clean: [{ id: "1043474", alt: "정돈된 셔츠 중심의 남성 클린 무드 참고 사진", credit: "Pexels" }],
      lovely: [{ id: "775358", alt: "부드러운 니트 중심의 남성 소프트 무드 참고 사진", credit: "Pexels" }],
      chic: [{ id: "428340", alt: "재킷과 셔츠 중심의 남성 시크 무드 참고 사진", credit: "Pexels" }],
      natural: [{ id: "1222271", alt: "편안한 소재 중심의 남성 내추럴 무드 참고 사진", credit: "Pexels" }]
    },
    service: {
      salon: [{ id: "1704488", alt: "남성 헤어숍 스타일링 참고 사진", credit: "Pexels" }],
      beautyShop: [{ id: "3764013", alt: "남성 그루밍 제품과 관리 참고 사진", credit: "Pexels" }],
      shopping: [{ id: "1043474", alt: "남성 셔츠와 재킷 착장 참고 사진", credit: "Pexels" }],
      caution: [{ id: "2923156", alt: "과하지 않은 남성 뉴트럴 착장 참고 사진", credit: "Pexels" }]
    },
    care: {
      haircut: [{ id: "1704488", alt: "남성 헤어 커트 주기 참고 사진", credit: "Pexels" }],
      roots: [{ id: "2379004", alt: "남성 헤어 컬러 리터치 참고 사진", credit: "Pexels" }],
      treatment: [{ id: "614810", alt: "남성 모발 관리 참고 사진", credit: "Pexels" }],
      makeup: [{ id: "3764013", alt: "남성 그루밍 제품 관리 참고 사진", credit: "Pexels" }],
      colorCheck: [{ id: "3777931", alt: "남성 컬러 팔레트 점검 참고 사진", credit: "Pexels" }],
      nail: [{ id: "3757957", alt: "남성 손 관리 참고 사진", credit: "Pexels" }]
    }
  }
};

const labels = {
  today: ["오늘 바로 하기", "헤어·뷰티·그루밍·옷 핵심만 먼저 보여드려요"],
  hair: ["헤어 추천", "얼굴형과 퍼스널컬러를 함께 반영했어요"],
  beauty: ["뷰티 팔레트", "메이크업 컬러를 한 팔레트로 정리했어요"],
  wear: ["오늘의 옷", "잘 받는 색과 원하는 무드의 교집합이에요"],
  care: ["관리 주기", "스타일이 흐트러지기 전 관리 시점이에요"]
};

const curatedVisuals = {
  face: {
    oval: [{ id: "18367694", alt: "긴 레이어드 헤어가 자연스럽게 얼굴선을 감싸는 참고 사진", credit: "Pexels" }],
    round: [{ id: "18367682", alt: "얼굴선을 길게 이어주는 롱 레이어드 헤어 참고 사진", credit: "Pexels" }],
    square: [{ id: "30661046", alt: "부드러운 웨이브와 레이어로 윤곽을 완화한 헤어 참고 사진", credit: "Pexels" }],
    long: [{ id: "15868761", alt: "옆 볼륨을 살린 미디엄 헤어 스타일 참고 사진", credit: "Pexels" }],
    heart: [{ id: "15868761", alt: "턱선 주변 볼륨을 살린 보브 스타일 참고 사진", credit: "Pexels" }],
    unknown: [{ id: "18367694", alt: "대부분의 얼굴형에 안정적인 소프트 레이어드 참고 사진", credit: "Pexels" }]
  },
  hairColor: {
    spring: [{ id: "18367682", alt: "따뜻한 브라운 계열 헤어 컬러 참고 사진", credit: "Pexels" }],
    summer: [{ id: "33744990", alt: "차분한 쿨 브라운 계열 헤어 컬러 참고 사진", credit: "Pexels" }],
    autumn: [{ id: "15868761", alt: "깊은 브라운 계열 헤어 컬러 참고 사진", credit: "Pexels" }],
    winter: [{ id: "30661046", alt: "다크 브라운과 블랙 계열 헤어 컬러 참고 사진", credit: "Pexels" }],
    unknown: [{ id: "18367694", alt: "뉴트럴 브라운 헤어 컬러 참고 사진", credit: "Pexels" }]
  },
  beauty: {
    spring: [{ id: "4938507", alt: "맑은 피치와 코랄 메이크업 제품 참고 사진", credit: "Pexels" }],
    summer: [{ id: "6593792", alt: "부드러운 로즈와 모브 메이크업 팔레트 참고 사진", credit: "Pexels" }],
    autumn: [{ id: "11883768", alt: "브릭과 브라운 계열 메이크업 제품 참고 사진", credit: "Pexels" }],
    winter: [{ id: "7290708", alt: "선명한 레드 립 메이크업 참고 사진", credit: "Pexels" }],
    unknown: [{ id: "4938507", alt: "뉴트럴 로즈 베이지 메이크업 참고 사진", credit: "Pexels" }]
  },
  nail: {
    spring: [{ id: "16041438", alt: "밝고 깨끗한 네일 관리 참고 사진", credit: "Pexels" }],
    summer: [{ id: "17471377", alt: "부드러운 그라데이션 네일 참고 사진", credit: "Pexels" }],
    autumn: [{ id: "14267565", alt: "차분한 네일 케어 참고 사진", credit: "Pexels" }],
    winter: [{ id: "4677851", alt: "정돈된 네일 트리트먼트 참고 사진", credit: "Pexels" }],
    unknown: [{ id: "19239100", alt: "기본 매니큐어 관리 참고 사진", credit: "Pexels" }]
  },
  outfit: {
    spring: [{ id: "9099444", alt: "아이보리 상의와 라이트 데님 무드의 착장 참고 사진", credit: "Pexels" }],
    summer: [{ id: "9164745", alt: "라일락 계열 상의와 차분한 팬츠 착장 참고 사진", credit: "Pexels" }],
    autumn: [{ id: "9968535", alt: "카멜과 크림 계열의 따뜻한 착장 참고 사진", credit: "Pexels" }],
    winter: [{ id: "13900420", alt: "화이트 셔츠와 네이비 팬츠 무드의 착장 참고 사진", credit: "Pexels" }],
    unknown: [{ id: "1006989", alt: "화이트 셔츠와 뉴트럴 팬츠 착장 참고 사진", credit: "Pexels" }]
  },
  mood: {
    clean: [{ id: "17281873", alt: "정돈된 화이트 셔츠 중심의 클린 무드 참고 사진", credit: "Pexels" }],
    lovely: [{ id: "12812231", alt: "부드러운 카디건 중심의 러블리 무드 참고 사진", credit: "Pexels" }],
    chic: [{ id: "13900420", alt: "셔츠와 수트 팬츠의 시크한 무드 참고 사진", credit: "Pexels" }],
    natural: [{ id: "12029974", alt: "편안한 카디건과 자연스러운 소재감 참고 사진", credit: "Pexels" }]
  },
  service: {
    salon: [{ id: "30661046", alt: "헤어 살롱에서 스타일링을 받는 참고 사진", credit: "Pexels" }],
    beautyShop: [{ id: "6593792", alt: "메이크업 팔레트와 뷰티 도구 참고 사진", credit: "Pexels" }],
    shopping: [{ id: "17281873", alt: "화이트 셔츠가 걸린 의류 매장 참고 사진", credit: "Pexels" }],
    caution: [{ id: "15221657", alt: "과하지 않은 뉴트럴 착장 참고 사진", credit: "Pexels" }]
  },
  care: {
    haircut: [{ id: "30661046", alt: "미용실에서 커트를 준비하는 참고 사진", credit: "Pexels" }],
    roots: [{ id: "15868761", alt: "염색과 헤어 컬러 상담을 떠올리는 참고 사진", credit: "Pexels" }],
    treatment: [{ id: "18367694", alt: "정돈된 모발 관리 참고 사진", credit: "Pexels" }],
    makeup: [{ id: "11883768", alt: "메이크업 제품 교체 주기 참고 사진", credit: "Pexels" }],
    colorCheck: [{ id: "4938507", alt: "컬러 팔레트 점검을 떠올리는 메이크업 제품 참고 사진", credit: "Pexels" }],
    nail: [{ id: "19239100", alt: "네일과 페디 관리 주기 참고 사진", credit: "Pexels" }]
  }
};

const state = {
  name: "",
  area: "",
  styleTarget: "neutral",
  faceShape: "",
  personalColor: "",
  mood: "",
  analysisSource: "manual",
  analysisConfidence: 0,
  analysisSummary: ""
};

let currentStep = 0;
let currentCategory = "today";
let toastTimer;
let selectedPhoto = null;
let analysisResult = null;
let loadingStepTimer = null;
let sheetActionHandlers = new Map();
let lastFocusedBeforeSheet = null;
let sheetDrag = null;
const visualGalleryRegistry = new Map();

const splashScreen = document.querySelector("#splash-screen");
const splashVersion = document.querySelector("#splash-version");
const startVersion = document.querySelector("#start-version");
const screens = [...document.querySelectorAll("[data-screen]")];
const steps = [...document.querySelectorAll(".quiz-step")];
const nextButton = document.querySelector("#quiz-next");
const progressLabel = document.querySelector("#progress-label");
const progressBar = document.querySelector("#progress-bar");
const nameInput = document.querySelector("#name-input");
const savedReportButton = document.querySelector("#saved-report-button");
const savedReportInlineButton = document.querySelector("#saved-report-inline-button");
const recommendationContent = document.querySelector("#recommendation-content");
const homePhotoCard = document.querySelector(".home-photo-card");
const homePhotoStatus = document.querySelector("#home-photo-status");
const homePhotoTitle = document.querySelector("#home-photo-title");
const homePhotoDescription = document.querySelector("#home-photo-description");
const photoInput = document.querySelector("#photo-input");
const photoDropzone = document.querySelector("#photo-dropzone");
const photoUnavailableCard = document.querySelector("#photo-unavailable-card");
const photoAvailabilityNote = document.querySelector("#photo-availability-note");
const photoPreviewImage = document.querySelector("#photo-preview-image");
const loadingPhotoImage = document.querySelector("#loading-photo-image");
const analysisConsent = document.querySelector("#analysis-consent");
const analyzePhotoButton = document.querySelector("#analyze-photo-button");
const analysisNameInput = document.querySelector("#analysis-name-input");
const analysisCompleteButton = document.querySelector("#analysis-complete-button");
const analysisCompleteReason = document.querySelector("#analysis-complete-reason");
const quizNextReason = document.querySelector("#quiz-next-reason");
const resultSummaryGrid = document.querySelector("#result-summary-grid");
const areaSettingCard = document.querySelector("#area-setting-card");
const resultAreaInput = document.querySelector("#result-area-input");
const saveAreaButton = document.querySelector("#save-area-button");
const bottomSheet = document.querySelector("#bottom-sheet");
const sheetPanel = document.querySelector("#bottom-sheet-panel");
const sheetBackdrop = document.querySelector("#sheet-backdrop");
const sheetGrabber = document.querySelector("#sheet-grabber");
const sheetClose = document.querySelector("#sheet-close");
const sheetKicker = document.querySelector("#sheet-kicker");
const sheetTitle = document.querySelector("#sheet-title");
const sheetDescription = document.querySelector("#sheet-description");
const sheetBody = document.querySelector("#sheet-body");
const sheetActions = document.querySelector("#sheet-actions");
const validImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const analysisEndpoint = window.MOI_CONFIG?.analysisEndpoint?.trim() || "";
const photoAnalysisAvailable = Boolean(analysisEndpoint) && window.MOI_CONFIG?.photoAnalysisEnabled === true;
const demoMode = Boolean(window.MOI_CONFIG?.demoMode);

function hideSplash() {
  if (!splashScreen) return;
  splashScreen.classList.add("is-hidden");
  splashScreen.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-splashing");
  window.setTimeout(() => splashScreen.remove(), 460);
}

function scheduleSplashDismiss() {
  if (splashVersion) splashVersion.textContent = `v${APP_VERSION}`;
  if (startVersion) startVersion.textContent = `v${APP_VERSION}`;
  if (!splashScreen) {
    document.body.classList.remove("is-splashing");
    return;
  }
  const elapsed = performance.now() - splashStartedAt;
  window.setTimeout(hideSplash, Math.max(0, MIN_SPLASH_MS - elapsed));
}

function normalizeText(value, maxLength = 48) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value) {
  return normalizeText(String(value ?? ""), 500)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function pexelsImageUrl(id, { width = 900, height = 1100 } = {}) {
  const photoId = encodeURIComponent(id);
  return `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=${width}&h=${height}&fit=crop`;
}

function getVisualGroup(group, key, fallback = "unknown") {
  const collection = curatedVisuals[group] || {};
  return collection[key] || collection[fallback] || [];
}

function currentStyleTargetKey() {
  return styleTargets[state.styleTarget] ? state.styleTarget : "neutral";
}

function currentStyleTarget() {
  return styleTargets[currentStyleTargetKey()];
}

function getStyleVisualGroup(group, key, fallback = "unknown") {
  const targetCollection = targetVisuals[currentStyleTargetKey()]?.[group] || {};
  return targetCollection[key] || targetCollection[fallback] || getVisualGroup(group, key, fallback);
}

function getServiceVisual(key) {
  return targetVisuals[currentStyleTargetKey()]?.service?.[key] || curatedVisuals.service[key];
}

function getCareVisual(key) {
  return targetVisuals[currentStyleTargetKey()]?.care?.[key] || curatedVisuals.care[key];
}

function styleValue(target, group, key, fallback) {
  return target?.[group]?.[key] || fallback;
}

function styleGuide() {
  const target = currentStyleTarget();
  const face = faceShapes[state.faceShape] || faceShapes.unknown;
  const color = personalColors[state.personalColor] || personalColors.unknown;
  const mood = moods[state.mood] || moods.natural;
  const faceKey = faceShapes[state.faceShape] ? state.faceShape : "unknown";
  const colorKey = personalColors[state.personalColor] ? state.personalColor : "unknown";
  const moodKey = moods[state.mood] ? state.mood : "natural";
  return {
    target,
    face,
    color,
    mood,
    hair: styleValue(target, "hairByFace", faceKey, face.hair),
    fringe: styleValue(target, "fringeByFace", faceKey, face.fringe),
    hairTip: styleValue(target, "hairTipByFace", faceKey, face.tip),
    hairAvoid: styleValue(target, "hairAvoidByFace", faceKey, face.avoid),
    outfit: styleValue(target, "outfitByColor", colorKey, color.outfit),
    moodPiece: styleValue(target, "pieceByMood", moodKey, mood.piece),
    moodDetail: styleValue(target, "detailByMood", moodKey, mood.detail),
    beautyAction: styleValue(target, "beautyByMood", moodKey, mood.makeup)
  };
}

function beautyRowsForTarget(color) {
  if (currentStyleTargetKey() === "male") {
    return [
      ["아이브로우", color.brow],
      ["피부 톤", ["얇은 톤 보정", color.shadow[1]]],
      ["립 케어", ["무색 또는 로지 립밤", color.lip[1]]],
      ["향·핸드", ["가벼운 우디/머스크", color.nail[1]]],
      ["손 정리", ["짧고 깨끗한 손톱", color.nail[1]]]
    ];
  }
  if (currentStyleTargetKey() === "neutral") {
    return [
      ["아이브로우", color.brow],
      ["피부 톤", ["얇은 베이스 또는 톤 보정", color.shadow[1]]],
      ["립", ["부담 없는 립밤/틴트", color.lip[1]]],
      ["음영", color.shadow],
      ["손 정리", ["깔끔한 핸드 케어", color.nail[1]]]
    ];
  }
  return [
    ["아이브로우", color.brow],
    ["컬러 렌즈", color.lens],
    ["립", color.lip],
    ["아이 섀도", color.shadow],
    ["네일", color.nail]
  ];
}

function registerVisualGallery(key, visuals) {
  const normalized = Array.isArray(visuals) ? visuals.filter(Boolean) : [visuals].filter(Boolean);
  visualGalleryRegistry.set(key, normalized);
  return key;
}

function renderVisualFigure(key, visuals, {
  className = "",
  label = "참고 이미지",
  eager = false,
  width = 900,
  height = 1100
} = {}) {
  const normalized = Array.isArray(visuals) ? visuals.filter(Boolean) : [visuals].filter(Boolean);
  const [visual] = normalized;
  if (!visual?.id) return "";
  const galleryKey = registerVisualGallery(key, normalized);
  const src = pexelsImageUrl(visual.id, { width, height });
  const loading = eager ? "eager" : "lazy";
  return `
    <button class="visual-figure ${className}" type="button" data-visual-gallery="${escapeHtml(galleryKey)}" aria-label="${escapeHtml(label)} 참고 이미지 보기">
      <img src="${src}" alt="${escapeHtml(visual.alt || label)}" width="${width}" height="${height}" loading="${loading}" decoding="async" />
      <span class="visual-figure-label">${escapeHtml(label)}</span>
    </button>
  `;
}

function renderSummaryVisuals(key, visuals, label) {
  const normalized = Array.isArray(visuals) ? visuals.filter(Boolean) : [visuals].filter(Boolean);
  if (!normalized.length) return "";
  const galleryKey = registerVisualGallery(key, normalized);
  return `
    <button class="summary-visual-strip" type="button" data-visual-gallery="${escapeHtml(galleryKey)}" aria-label="${escapeHtml(label)} 참고 이미지 보기">
      ${normalized.slice(0, 3).map((visual, index) => `
        <img src="${pexelsImageUrl(visual.id, { width: 360, height: 420 })}" alt="${escapeHtml(visual.alt || label)}" width="360" height="420" loading="${index === 0 ? "eager" : "lazy"}" decoding="async" />
      `).join("")}
    </button>
  `;
}

function openVisualGallery(key) {
  const visuals = visualGalleryRegistry.get(key);
  if (!visuals?.length) return;
  openBottomSheet({
    kicker: "참고 이미지",
    title: "이런 느낌으로 보면 좋아요.",
    description: "사진은 추천을 이해하기 위한 무드 레퍼런스예요. 같은 스타일을 그대로 따라 하기보다, 실루엣과 색감의 방향만 참고해 주세요.",
    detent: "large",
    body: `
      <div class="visual-gallery-grid">
        ${visuals.map((visual) => `
          <figure class="visual-gallery-card">
            <img src="${pexelsImageUrl(visual.id, { width: 900, height: 1100 })}" alt="${escapeHtml(visual.alt || "스타일 참고 이미지")}" width="900" height="1100" loading="lazy" decoding="async" />
            <figcaption>${escapeHtml(visual.alt || "스타일 참고 이미지")}<span>${escapeHtml(visual.credit || "Reference")}</span></figcaption>
          </figure>
        `).join("")}
      </div>
    `,
    actions: [
      { label: "닫기", handler: () => closeBottomSheet() }
    ]
  });
}

function normalizeAnalysisChoice(value, choices) {
  const candidate = normalizeText(value, 24);
  if (choices[candidate]) return candidate;
  return "unknown";
}

function closeBottomSheet({ restoreFocus = true } = {}) {
  if (!bottomSheet || bottomSheet.hidden) return;
  bottomSheet.classList.remove("is-open");
  document.body.classList.remove("is-sheet-open");
  sheetPanel?.style.removeProperty("--sheet-drag-y");
  window.setTimeout(() => {
    if (!bottomSheet.classList.contains("is-open")) {
      bottomSheet.hidden = true;
      sheetActionHandlers = new Map();
      if (restoreFocus) lastFocusedBeforeSheet?.focus?.();
      lastFocusedBeforeSheet = null;
    }
  }, 260);
}

function renderSheetActions(actions = []) {
  sheetActionHandlers = new Map();
  sheetActions.innerHTML = actions.map((action, index) => {
    const id = `sheet-action-${index}`;
    sheetActionHandlers.set(id, action.handler);
    const variant = action.variant || "secondary";
    return `<button class="sheet-action ${variant}" type="button" data-sheet-action="${id}">${escapeHtml(action.label)}</button>`;
  }).join("");
}

function openBottomSheet({
  kicker = "MOI",
  title,
  description = "",
  body = "",
  actions = [],
  detent = "medium",
  onOpen
}) {
  if (!bottomSheet || !sheetPanel) return;
  lastFocusedBeforeSheet = document.activeElement;
  sheetKicker.textContent = kicker;
  sheetTitle.textContent = title;
  sheetDescription.textContent = description;
  sheetDescription.hidden = !description;
  sheetBody.innerHTML = body;
  renderSheetActions(actions);
  bottomSheet.hidden = false;
  bottomSheet.classList.toggle("is-large", detent === "large");
  bottomSheet.classList.toggle("is-medium", detent !== "large");
  sheetPanel.style.removeProperty("--sheet-drag-y");
  requestAnimationFrame(() => {
    document.body.classList.add("is-sheet-open");
    bottomSheet.classList.add("is-open");
    sheetPanel.focus({ preventScroll: true });
    onOpen?.();
  });
}

function beginSheetDrag(event) {
  if (!bottomSheet?.classList.contains("is-open")) return;
  event.preventDefault();
  sheetDrag = { startY: event.clientY, currentY: event.clientY };
  try {
    sheetPanel.setPointerCapture?.(event.pointerId);
  } catch {
    // Some browser surfaces only allow capture on the original pointer target.
  }
  sheetPanel.classList.add("is-dragging");
}

function moveSheetDrag(event) {
  if (!sheetDrag) return;
  sheetDrag.currentY = event.clientY;
  const delta = Math.max(0, sheetDrag.currentY - sheetDrag.startY);
  sheetPanel.style.setProperty("--sheet-drag-y", `${Math.min(delta, 180)}px`);
}

function endSheetDrag() {
  if (!sheetDrag) return;
  const delta = Math.max(0, sheetDrag.currentY - sheetDrag.startY);
  sheetDrag = null;
  sheetPanel.classList.remove("is-dragging");
  if (delta > 82) {
    closeBottomSheet();
    return;
  }
  sheetPanel.style.setProperty("--sheet-drag-y", "0px");
  window.setTimeout(() => sheetPanel.style.removeProperty("--sheet-drag-y"), 220);
}

function createFallbackClientId() {
  const bytes = new Uint8Array(12);
  if (globalThis.crypto?.getRandomValues) {
    globalThis.crypto.getRandomValues(bytes);
    return `client_${[...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("")}`;
  }
  return `client_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 14)}`;
}

function getAnalysisClientId() {
  try {
    const existing = localStorage.getItem(ANALYSIS_CLIENT_KEY);
    if (/^[A-Za-z0-9_-]{12,64}$/.test(existing || "")) return existing;
    const next = globalThis.crypto?.randomUUID?.().replace(/-/g, "_") || createFallbackClientId();
    localStorage.setItem(ANALYSIS_CLIENT_KEY, next);
    return next;
  } catch {
    return createFallbackClientId();
  }
}

function normalizeProfile(profile) {
  if (!profile || typeof profile !== "object") return null;
  const normalized = {
    ...state,
    ...profile,
    name: normalizeText(profile.name, 12),
	    area: normalizeText(profile.area, 24),
	    styleTarget: styleTargets[profile.styleTarget] ? profile.styleTarget : "neutral",
	    faceShape: faceShapes[profile.faceShape] ? profile.faceShape : "unknown",
    personalColor: personalColors[profile.personalColor] ? profile.personalColor : "unknown",
    mood: moods[profile.mood] ? profile.mood : "",
    analysisSource: profile.analysisSource === "photo" ? "photo" : "manual",
    analysisConfidence: Number(profile.analysisConfidence || 0),
    analysisSummary: normalizeText(profile.analysisSummary, 160)
  };
  return normalized.name && normalized.mood ? normalized : null;
}

function revealSavedEntryPoints() {
  savedReportButton.hidden = false;
  if (savedReportInlineButton) savedReportInlineButton.hidden = false;
}

function readSavedProfile() {
  try {
    const profile = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const normalized = normalizeProfile(profile);
    if (!normalized) return false;
    Object.assign(state, normalized);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    revealSavedEntryPoints();
    return true;
  } catch {
    return false;
  }
}

const SCREEN_KIND = { home: "base", result: "base", analysis: "flow", quiz: "flow" };
const motionOK = !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
let activeFlow = null;
let flowDismissTimer = 0;

function syncHash(name) {
  history.replaceState(null, "", name === "home" ? "#home" : `#${name}`);
}

// Each screen scrolls inside the device frame (not the window). Scroll the
// active screen's own scroll container back to the top.
function scrollActiveTop(behavior = "auto") {
  const targets = [
    document.querySelector(".analysis-screen.is-active .analysis-shell"),
    document.querySelector(".quiz-screen.is-active .quiz-shell"),
    document.querySelector("#home-screen.is-active .start-mobile-app"),
    document.querySelector(".result-screen.is-active"),
  ];
  for (const target of targets) {
    target?.scrollTo?.({ top: 0, behavior });
  }
}

function setBase(name) {
  screens.forEach((screen) => {
    if (SCREEN_KIND[screen.dataset.screen] === "base") {
      screen.classList.toggle("is-active", screen.dataset.screen === name);
    }
  });
  scrollActiveTop();
  syncHash(name);
}

function presentFlow(name) {
  window.clearTimeout(flowDismissTimer);
  activeFlow = name;
  screens.forEach((screen) => {
    if (SCREEN_KIND[screen.dataset.screen] === "flow") {
      screen.classList.toggle("is-active", screen.dataset.screen === name);
    }
  });
  document.body.classList.add("is-flow-open");
  syncHash(name);
  requestAnimationFrame(() => document.body.classList.add("is-flow-in"));
}

function dismissFlow({ to = "home" } = {}) {
  const leaving = activeFlow;
  if (to) setBase(to);
  document.body.classList.remove("is-flow-in");
  const finalize = () => {
    if (leaving) document.querySelector(`[data-screen="${leaving}"]`)?.classList.remove("is-active");
    activeFlow = null;
    document.body.classList.remove("is-flow-open");
  };
  if (motionOK) flowDismissTimer = window.setTimeout(finalize, 320);
  else finalize();
}

// Navigation contract: home/result are routed base screens; analysis/quiz are
// presented as bottom-sheet flows over the hub. Completing a flow (showScreen
// to a base while a flow is open) slides the sheet out and routes to that base.
function showScreen(name) {
  if (SCREEN_KIND[name] === "flow") return presentFlow(name);
  if (activeFlow) return dismissFlow({ to: name });
  setBase(name);
}

function showAnalysisStage(name) {
  document.querySelectorAll("[data-analysis-stage]").forEach((stage) => {
    const active = stage.dataset.analysisStage === name;
    stage.hidden = !active;
    stage.classList.toggle("is-active", active);
  });
  document.querySelector("#analysis-back").setAttribute("aria-label", name === "guide" ? "홈으로" : "이전 단계");
  scrollActiveTop("smooth");
}

function syncPhotoAvailability() {
  if (photoUnavailableCard) photoUnavailableCard.hidden = photoAnalysisAvailable;

  if (photoAnalysisAvailable) {
    homePhotoCard?.classList.remove("is-unavailable");
    homePhotoCard?.removeAttribute("aria-describedby");
    if (homePhotoStatus) homePhotoStatus.textContent = "사진으로 시작";
    if (homePhotoTitle) homePhotoTitle.textContent = "사진 등록";
    if (homePhotoDescription) homePhotoDescription.textContent = "얼굴이 잘 보이는 사진 한 장을 선택하세요.";
    if (photoAvailabilityNote) photoAvailabilityNote.hidden = true;
    return;
  }

  document.querySelectorAll(".photo-start-button").forEach((button) => {
    button.setAttribute("aria-describedby", "photo-availability-note");
  });
  homePhotoCard?.classList.add("is-unavailable");
  if (homePhotoStatus) homePhotoStatus.textContent = "직접 선택 가능";
  if (homePhotoTitle) homePhotoTitle.textContent = "사진 분석 준비 중";
  if (homePhotoDescription) homePhotoDescription.textContent = "지금은 사진 없이 같은 리포트를 만들 수 있어요.";
}

function showPhotoUnavailableNotice() {
  if (photoAvailabilityNote) photoAvailabilityNote.hidden = false;
  if (photoUnavailableCard) photoUnavailableCard.hidden = false;
  openBottomSheet({
    kicker: "사진 분석 베타",
    title: "사진 분석은 준비 중이에요.",
    description: "지금은 사진 없이 직접 선택해도 같은 형식의 스타일 리포트를 만들 수 있습니다.",
    body: `
      <div class="sheet-info-list">
        <p><strong>결과 형식은 같아요.</strong><span>얼굴형, 퍼스널컬러, 추천 기준, 무드로 헤어·뷰티·그루밍·옷 추천을 받을 수 있어요.</span></p>
        <p><strong>나중에 사진 분석으로 이어갈 수 있어요.</strong><span>분석 서버가 준비되면 같은 화면에서 바로 사용할 수 있게 열어둘게요.</span></p>
      </div>
    `,
    actions: [
      { label: "사진 없이 직접 선택", variant: "primary", handler: () => { closeBottomSheet({ restoreFocus: false }); beginQuiz({ reset: true }); } },
      { label: "조금 더 둘러보기", handler: () => closeBottomSheet() }
    ]
  });
}

function beginPhotoFlow({ pickImmediately = false } = {}) {
  if (!photoAnalysisAvailable) {
    showPhotoUnavailableNotice();
    return;
  }
  selectedPhoto = null;
  analysisResult = null;
  photoInput.value = "";
  analysisConsent.checked = false;
  analyzePhotoButton.disabled = true;
  showAnalysisStage("guide");
  showScreen("analysis");
  if (pickImmediately) {
    photoInput.click();
  }
}

function resetStateForManual() {
  Object.assign(state, {
	    name: "",
	    area: "",
	    styleTarget: "neutral",
	    faceShape: "",
    personalColor: "",
    mood: "",
    analysisSource: "manual",
    analysisConfidence: 0,
    analysisSummary: ""
  });
}

function loadImageElement(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);
    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("사진을 열지 못했어요."));
    };
    image.src = objectUrl;
  });
}

async function preparePhoto(file) {
  if (!validImageTypes.has(file.type)) throw new Error("JPG, PNG, WEBP 사진만 사용할 수 있어요.");
  if (file.size > 8 * 1024 * 1024) throw new Error("사진 크기는 8MB 이하로 선택해 주세요.");

  const source = "createImageBitmap" in window
    ? await createImageBitmap(file, { imageOrientation: "from-image" })
    : await loadImageElement(file);
  const originalWidth = source.width || source.naturalWidth;
  const originalHeight = source.height || source.naturalHeight;

  if (Math.min(originalWidth, originalHeight) < 480) {
    if (typeof source.close === "function") source.close();
    throw new Error("얼굴을 살펴보기에는 사진이 너무 작아요. 더 선명한 사진을 선택해 주세요.");
  }

  const maxSide = 1440;
  const scale = Math.min(1, maxSide / Math.max(originalWidth, originalHeight));
  const width = Math.round(originalWidth * scale);
  const height = Math.round(originalHeight * scale);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { alpha: false });
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  context.drawImage(source, 0, 0, width, height);
  if (typeof source.close === "function") source.close();

  return {
    dataUrl: canvas.toDataURL("image/jpeg", 0.86),
    width,
    height,
    name: file.name.replace(/[^a-zA-Z0-9가-힣._-]/g, "_")
  };
}

async function handlePhoto(file) {
  if (!file) return;
  try {
    setSelectedPhoto(await preparePhoto(file));
  } catch (error) {
    showToast(error.message || "사진을 불러오지 못했어요.");
    photoInput.value = "";
  }
}

function setSelectedPhoto(photo) {
  selectedPhoto = photo;
  photoPreviewImage.src = selectedPhoto.dataUrl;
  loadingPhotoImage.src = selectedPhoto.dataUrl;
  document.querySelector("#photo-file-caption").textContent = `${selectedPhoto.name} · ${selectedPhoto.width} × ${selectedPhoto.height}`;
  analysisConsent.checked = false;
  analyzePhotoButton.disabled = true;
  showAnalysisStage("preview");
}

function createDemoPhoto() {
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 800;
  const context = canvas.getContext("2d");
  const background = context.createLinearGradient(0, 0, 600, 800);
  background.addColorStop(0, "#f7f7f7");
  background.addColorStop(1, "#e8e8e8");
  context.fillStyle = background;
  context.fillRect(0, 0, 600, 800);
  context.fillStyle = "#222222";
  context.beginPath();
  context.ellipse(300, 315, 155, 205, 0, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "#cfcfcf";
  context.beginPath();
  context.ellipse(300, 335, 110, 155, 0, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "#ffffff";
  context.beginPath();
  context.ellipse(300, 735, 235, 260, 0, 0, Math.PI * 2);
  context.fill();
  return { dataUrl: canvas.toDataURL("image/jpeg", .86), width: 600, height: 800, name: "demo-portrait.jpg" };
}

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function startLoadingProgress() {
  let activeIndex = 0;
  const items = [...document.querySelectorAll("[data-loading-step]")];
  items.forEach((item, index) => {
    item.classList.toggle("is-active", index === 0);
    item.classList.remove("is-done");
  });
  clearInterval(loadingStepTimer);
  loadingStepTimer = setInterval(() => {
    if (activeIndex >= items.length - 1) return;
    items[activeIndex].classList.remove("is-active");
    items[activeIndex].classList.add("is-done");
    activeIndex += 1;
    items[activeIndex].classList.add("is-active");
  }, 1400);
}

function stopLoadingProgress() {
  clearInterval(loadingStepTimer);
  loadingStepTimer = null;
}

function showAnalysisError(title, message) {
  stopLoadingProgress();
  document.querySelector("#analysis-error-title").textContent = title;
  document.querySelector("#analysis-error-message").textContent = message;
  showAnalysisStage("error");
}

async function requestPhotoAnalysis() {
  if (!selectedPhoto || !analysisConsent.checked) return;
  if (!photoAnalysisAvailable) {
    showPhotoUnavailableNotice();
    showAnalysisStage("guide");
    return;
  }

  showAnalysisStage("loading");
  startLoadingProgress();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 40000);

  try {
    const [response] = await Promise.all([
      fetch(analysisEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: selectedPhoto.dataUrl, clientId: getAnalysisClientId() }),
        signal: controller.signal
      }),
      delay(2200)
    ]);
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.message || "분석 서버가 잠시 쉬고 있어요.");
    if (!payload.imageUsable) {
      showAnalysisError("이 사진에서는 단서를 충분히 찾지 못했어요.", payload.quality?.notes || "조금 더 밝고 정면에 가까운 사진으로 다시 시도해 주세요.");
      return;
    }

    const normalizedFaceShape = normalizeAnalysisChoice(payload.faceShape, faceShapes);
    const normalizedPersonalColor = normalizeAnalysisChoice(payload.personalColor, personalColors);
    analysisResult = { ...payload, faceShape: normalizedFaceShape, personalColor: normalizedPersonalColor };
    state.faceShape = normalizedFaceShape;
    state.personalColor = normalizedPersonalColor;
    state.mood = "";
    state.analysisSource = "photo";
    state.analysisConfidence = Math.round((Number(payload.faceConfidence || 0) + Number(payload.colorConfidence || 0)) / 2);
    state.analysisSummary = payload.summary || "사진에서 확인한 스타일 단서를 정리했어요.";
    renderAnalysisReview();
    showAnalysisStage("review");
  } catch (error) {
    const message = error.name === "AbortError"
      ? "분석 시간이 길어졌어요. 잠시 후 다시 시도해 주세요."
      : error.message || "분석 중 문제가 생겼어요.";
    showAnalysisError("잠시 멈췄어요.", message);
  } finally {
    clearTimeout(timeout);
    stopLoadingProgress();
  }
}

function optionMarkup(items, suggested) {
  return Object.entries(items).map(([value, item]) => {
    const helper = item.summary || item.tip || "";
    return `<button type="button" data-value="${value}" class="${value === suggested ? "is-suggested" : ""}"><strong>${item.label}</strong><small>${helper.slice(0, 18)}</small></button>`;
  }).join("");
}

function renderEvidence(elementId, evidence, fallback) {
  const list = document.querySelector(elementId);
  list.replaceChildren();
  const items = Array.isArray(evidence) && evidence.length ? evidence.slice(0, 3) : [fallback];
  items.forEach((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    list.append(item);
  });
}

function renderAnalysisReview() {
  if (!styleTargets[state.styleTarget]) state.styleTarget = "neutral";
  document.querySelector("#review-face-options").innerHTML = optionMarkup(faceShapes, analysisResult?.faceShape);
  document.querySelector("#review-color-options").innerHTML = optionMarkup(personalColors, analysisResult?.personalColor);
  document.querySelector("#analysis-confidence").textContent = `${state.analysisConfidence}%`;
  document.querySelector("#analysis-summary").textContent = state.analysisSummary;
  renderEvidence("#face-evidence", analysisResult?.faceEvidence, "사진 속 얼굴 윤곽을 기준으로 살펴봤어요.");
  renderEvidence("#color-evidence", analysisResult?.colorEvidence, "사진의 빛과 피부 대비를 함께 살펴봤어요.");

  const accuracyNote = document.querySelector("#color-accuracy-note");
  const lowConfidence = Number(analysisResult?.colorConfidence || 0) < 65;
  accuracyNote.textContent = lowConfidence
    ? "사진의 조명 영향이 커서 컬러 판단의 확신이 낮아요. 평소 잘 받는 색을 떠올리며 직접 선택해 주세요."
    : "사진 기반의 예상 결과예요. 조명과 카메라 보정에 따라 실제 진단과 다를 수 있어요.";
  accuracyNote.classList.toggle("is-warning", lowConfidence);

  analysisNameInput.value = state.name || "";
  refreshReviewSelections();
  updateAnalysisCompleteButton();
}

function refreshReviewSelections() {
  document.querySelectorAll("[data-review-group]").forEach((group) => {
    const selectedValue = state[group.dataset.reviewGroup];
    group.querySelectorAll("button[data-value]").forEach((button) => {
      const selected = button.dataset.value === selectedValue;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  });
}

function updateAnalysisCompleteButton() {
  state.name = analysisNameInput.value;
  if (!styleTargets[state.styleTarget]) state.styleTarget = "neutral";
  const missing = [];
  if (!state.name.trim()) missing.push("닉네임");
  if (!faceShapes[state.faceShape]) missing.push("얼굴형");
  if (!personalColors[state.personalColor]) missing.push("퍼스널컬러");
  if (!moods[state.mood]) missing.push("무드");
  analysisCompleteButton.disabled = !(
    !missing.length &&
    faceShapes[state.faceShape] &&
    personalColors[state.personalColor] &&
    moods[state.mood]
  );
  if (analysisCompleteReason) {
    analysisCompleteReason.textContent = missing.length
      ? `${missing.join(", ")}을 선택하면 추천을 볼 수 있어요.`
      : "지역은 주변 숍을 볼 때 입력해도 괜찮아요.";
  }
}

function beginQuiz({ reset = false } = {}) {
  if (reset) {
    resetStateForManual();
  }
  if (!styleTargets[state.styleTarget]) state.styleTarget = "neutral";
  nameInput.value = state.name;
  currentStep = 0;
  refreshChoices();
  refreshStep();
  showScreen("quiz");
}

function refreshChoices() {
  document.querySelectorAll("[data-choice-group]").forEach((group) => {
    const value = state[group.dataset.choiceGroup];
    group.querySelectorAll(".choice-card").forEach((button) => {
      const selected = button.dataset.value === value;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  });
}

function isStepComplete() {
  if (currentStep === 0) return state.name.trim().length > 0;
  if (currentStep === 1) return Boolean(state.faceShape);
  if (currentStep === 2) return Boolean(state.personalColor);
  return Boolean(state.mood);
}

function stepReason() {
  if (currentStep === 0 && !state.name.trim()) return "닉네임을 입력하면 다음으로 갈 수 있어요.";
  if (currentStep === 1 && !state.faceShape) return "얼굴형을 모르겠다면 ‘잘 모르겠어요’를 선택해도 괜찮아요.";
  if (currentStep === 2 && !state.personalColor) return "퍼스널컬러를 모르겠다면 ‘잘 모르겠어요’를 선택해도 괜찮아요.";
  if (currentStep === 3 && !state.mood) return "오늘 원하는 무드를 선택하면 리포트를 만들 수 있어요.";
  return currentStep === 0
    ? "활동 지역은 주변 숍을 볼 때 나중에 입력해요."
    : "좋아요. 다음 단계로 이어갈 수 있어요.";
}

function refreshStep() {
  steps.forEach((step, index) => { step.hidden = index !== currentStep; });
  progressLabel.textContent = `${currentStep + 1} / ${steps.length}`;
  progressBar.style.transform = `scaleX(${(currentStep + 1) / steps.length})`;
  nextButton.textContent = currentStep === steps.length - 1 ? "나의 스타일 리포트 보기" : "다음";
  nextButton.disabled = !isStepComplete();
  if (quizNextReason) quizNextReason.textContent = stepReason();
  document.querySelector("#quiz-back").setAttribute("aria-label", currentStep === 0 ? "홈으로" : "이전 단계");
}

function completeProfile() {
  if (!styleTargets[state.styleTarget]) state.styleTarget = "neutral";
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  revealSavedEntryPoints();
  currentCategory = "today";
  updateCategoryTabs("today");
  renderResultHeader();
  renderCategory("today");
  showScreen("result");
}

function renderResultHeader() {
  const { face, color, mood, target } = styleGuide();
  document.querySelector("#result-name").textContent = state.name.trim() || "모이";
  document.querySelector("#direction-title").innerHTML = color.title.replace("\n", "<br />");
  document.querySelector("#profile-tags").innerHTML = [
    { label: target.label, hint: "추천 기준" },
    { label: face.label, hint: face.isUnknown ? "범용 추천" : "얼굴형" },
    { label: color.label, hint: color.isUnknown ? "기본 추천" : "퍼스널컬러" },
    { label: mood.label, hint: "무드" }
  ].map((tag) => `<span><small>${tag.hint}</small>${tag.label}</span>`).join("");
  document.querySelector("#result-palette").innerHTML = color.palette.map((hex) => `<i style="background:${hex}"></i>`).join("");
  document.querySelector("#analysis-origin-note").hidden = state.analysisSource !== "photo";
  document.querySelector(".result-footer > p").textContent = state.analysisSource === "photo"
    ? "사진에서 찾은 단서를 내가 확인한 뒤 만든 스타일 가이드예요."
    : "추천은 선택한 프로필을 바탕으로 만든 스타일 가이드예요.";
  renderResultSummary();
  renderAreaSetting();
}

function searchLink(query) {
  return `https://search.shopping.naver.com/search/all?query=${encodeURIComponent(query)}`;
}

function mapLink(query) {
  return `https://map.naver.com/p/search/${encodeURIComponent(`${areaLabel()} ${query}`.trim())}`;
}

function arrowIcon() {
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>';
}

function areaLabel() {
  return state.area?.trim() || "";
}

function renderResultSummary() {
  if (!resultSummaryGrid) return;
  const { face, color, mood, target, hair, hairAvoid, outfit, beautyAction } = styleGuide();
  const faceNote = face.isUnknown ? "얼굴형을 특정하지 않은 범용 추천" : face.label;
  const colorNote = color.isUnknown ? "무난한 뉴트럴 팔레트" : color.label;
  const faceVisuals = getStyleVisualGroup("face", state.faceShape);
  const beautyVisuals = getStyleVisualGroup("beauty", state.personalColor);
  const outfitVisuals = getStyleVisualGroup("outfit", state.personalColor);
  const moodVisuals = getStyleVisualGroup("mood", state.mood, "natural");
  resultSummaryGrid.innerHTML = `
    <article class="summary-card">
      <span class="summary-label">내 기준 · ${target.label}</span>
      <h2>${faceNote}</h2>
      <p>${colorNote} · ${mood.label} · ${target.hint}</p>
      ${renderSummaryVisuals("summary-profile", [faceVisuals[0], beautyVisuals[0], moodVisuals[0]], "내 기준")}
    </article>
    <article class="summary-card emphasis">
      <span class="summary-label">오늘 바로 하기</span>
      <ul>
        <li><strong>헤어</strong><span>${hair}</span></li>
        <li><strong>${target.beautyLabel}</strong><span>${beautyAction}</span></li>
        <li><strong>옷</strong><span>${outfit}</span></li>
      </ul>
      ${renderSummaryVisuals("summary-action", [faceVisuals[0], beautyVisuals[0], outfitVisuals[0]], "오늘 바로 하기")}
    </article>
    <article class="summary-card caution">
      <span class="summary-label">피하면 좋은 것</span>
      <ul>
        <li><strong>컬러</strong><span>${color.avoid}</span></li>
        <li><strong>헤어</strong><span>${hairAvoid}</span></li>
      </ul>
      ${renderSummaryVisuals("summary-caution", [getServiceVisual("caution")?.[0]], "피하면 좋은 것")}
    </article>
  `;
}

function renderAreaSetting() {
  if (!areaSettingCard || !resultAreaInput) return;
  const area = areaLabel();
  resultAreaInput.value = area;
  areaSettingCard.classList.toggle("has-area", Boolean(area));
  document.querySelector("#area-setting-copy").textContent = area
    ? `${area} 기준으로 주변 숍 링크를 열 수 있어요.`
    : "지역은 리포트 생성에는 필요 없고, 지도 링크를 열 때만 사용해요.";
  saveAreaButton.textContent = area ? "지역 변경" : "지역 저장";
}

function saveAreaFromResult() {
  state.area = normalizeText(resultAreaInput.value, 24);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderAreaSetting();
  renderCategory(currentCategory);
  showToast(state.area ? "활동 지역을 저장했어요." : "활동 지역을 비웠어요.");
}

function focusAreaSetting() {
  areaSettingCard?.classList.add("needs-attention");
  areaSettingCard?.scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(() => resultAreaInput?.focus(), 320);
  window.setTimeout(() => areaSettingCard?.classList.remove("needs-attention"), 1600);
}

function openMapSearch(query) {
  if (!areaLabel()) {
    openAreaSheet(query);
    return;
  }
  window.open(mapLink(query), "_blank", "noopener,noreferrer");
}

function openAreaSheet(query = "") {
  const currentArea = areaLabel();
  openBottomSheet({
    kicker: "주변 숍",
    title: "활동 지역을 알려주세요.",
    description: "지도 링크를 열 때만 사용하고, 리포트 생성에는 필요하지 않아요.",
    body: `
      <label class="sheet-field" for="sheet-area-input">
        <span>활동 지역</span>
        <input id="sheet-area-input" type="text" maxlength="24" placeholder="예: 서울 성수동" autocomplete="address-level2" value="${escapeHtml(currentArea)}" />
      </label>
      <p class="sheet-subcopy">입력 후 바로 주변 숍 검색으로 이어갈게요.</p>
    `,
    actions: [
      {
        label: query ? "저장하고 지도 열기" : "지역 저장",
        variant: "primary",
        handler: () => {
          const input = document.querySelector("#sheet-area-input");
          state.area = normalizeText(input?.value, 24);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
          renderAreaSetting();
          renderCategory(currentCategory);
          if (!state.area) {
            showToast("활동 지역을 입력해 주세요.");
            input?.focus();
            return;
          }
          closeBottomSheet({ restoreFocus: false });
          showToast("활동 지역을 저장했어요.");
          if (query) window.open(mapLink(query), "_blank", "noopener,noreferrer");
        }
      },
      { label: "나중에 할게요", handler: () => closeBottomSheet() }
    ],
    onOpen: () => window.setTimeout(() => document.querySelector("#sheet-area-input")?.focus({ preventScroll: true }), 180)
  });
}

function updateCategoryTabs(category) {
  document.querySelectorAll(".category-tab").forEach((tab) => {
    const selected = tab.dataset.category === category;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-pressed", String(selected));
  });
}

function renderHeading(category) {
  const [baseTitle, baseDescription] = labels[category];
  const target = currentStyleTarget();
  const title = category === "beauty" ? target.beautyTitle : baseTitle;
  const description = category === "beauty" ? target.beautyDescription : baseDescription;
  return `<div class="content-heading"><h2>${title}</h2><p>${description}</p></div>`;
}

function renderToday() {
  const { color, mood, target, hair, hairTip, fringe, outfit, beautyAction } = styleGuide();
  const area = areaLabel();
  const faceVisuals = getStyleVisualGroup("face", state.faceShape);
  const beautyVisuals = getStyleVisualGroup("beauty", state.personalColor);
  const outfitVisuals = getStyleVisualGroup("outfit", state.personalColor);
  return `${renderHeading("today")}
    <article class="today-lead">
      <div class="today-lead-copy">
        <span class="card-kicker">${mood.english.toUpperCase()}</span>
        <h3>${outfit}</h3>
        <p>${color.summary} ${target.summary}</p>
      </div>
      <div class="today-look today-look-photo">
        ${renderVisualFigure("today-outfit", outfitVisuals, { className: "today-visual", label: "오늘의 착장", eager: true, width: 900, height: 1100 })}
      </div>
    </article>
    <div class="recommendation-grid">
      <article class="recommendation-card has-visual">
        ${renderVisualFigure("today-hair", faceVisuals, { className: "recommendation-visual", label: "헤어 참고" })}
        <div class="card-topline"><span class="card-icon">⌁</span><span class="card-label">HAIR</span></div>
        <h3>${hair}</h3>
        <p>${hairTip}</p>
        <div class="chip-row"><span class="chip">${color.hairColor}</span><span class="chip">${fringe}</span></div>
      </article>
      <article class="recommendation-card has-visual">
        ${renderVisualFigure("today-beauty", beautyVisuals, { className: "recommendation-visual", label: `${target.beautyLabel} 참고` })}
        <div class="card-topline"><span class="card-icon">◒</span><span class="card-label">${target.beautyLabel.toUpperCase()}</span></div>
        <h3>${target.beautyLabel} 포인트</h3>
        <p>${beautyAction} 조합으로 전체 인상을 연결해 보세요.</p>
        <div class="chip-row"><span class="chip">${color.brow[0]}</span><span class="chip">${color.shadow[0]}</span></div>
      </article>
      <article class="recommendation-card full has-visual">
        ${renderVisualFigure("today-nearby", getServiceVisual("salon"), { className: "recommendation-visual wide", label: "주변 숍 참고" })}
        <div class="card-topline"><span class="card-icon">⌖</span><span class="card-label">${area ? `NEAR ${area.toUpperCase()}` : "NEARBY"}</span></div>
        <h3>내 스타일을 잘 아는 가까운 숍</h3>
        <p>${area ? `${area} 주변의` : "활동 지역을 설정하면"} ${target.shopLabel}을 지도에서 바로 살펴볼 수 있어요.</p>
        <button class="action-link map-action-button" type="button" data-map-query="${target.nearShopQuery}">주변 숍 찾아보기 ${arrowIcon()}</button>
      </article>
    </div>`;
}

function renderHair() {
  const { color, hair, fringe, hairTip, hairAvoid } = styleGuide();
  const area = areaLabel();
  const faceVisuals = getStyleVisualGroup("face", state.faceShape);
  const hairColorVisuals = getStyleVisualGroup("hairColor", state.personalColor);
  return `${renderHeading("hair")}
    <div class="recommendation-grid">
      <article class="recommendation-card full has-visual">
        ${renderVisualFigure("hair-cut", faceVisuals, { className: "recommendation-visual wide", label: "추천 컷 참고", eager: true })}
        <div class="card-topline"><span class="card-icon">⌁</span><span class="card-label">BEST CUT</span></div>
        <h3>${hair}</h3>
        <p>${hairTip}</p>
        <ul class="detail-list">
          <li><span>앞머리/가르마</span><strong>${fringe}</strong></li>
          <li><span>피하면 좋은 것</span><strong>${hairAvoid}</strong></li>
          <li><span>미용실에서</span><strong>“얼굴선을 따라 가볍게 연결되는 질감과 볼륨을 살려주세요.”</strong></li>
        </ul>
      </article>
      <article class="recommendation-card has-visual">
        ${renderVisualFigure("hair-color", hairColorVisuals, { className: "recommendation-visual", label: "헤어 컬러 참고" })}
        <div class="card-topline"><span class="card-icon">●</span><span class="card-label">COLOR</span></div>
        <h3>${color.hairColor}</h3>
        <p>${color.label}의 피부 온도와 자연스럽게 어우러지면서 인상을 환하게 만드는 컬러예요.</p>
        <div class="chip-row">${color.hairAlt.map((item) => `<span class="chip">${item}</span>`).join("")}</div>
      </article>
      <article class="recommendation-card has-visual">
        ${renderVisualFigure("hair-salon", getServiceVisual("salon"), { className: "recommendation-visual", label: "헤어숍 참고" })}
        <div class="card-topline"><span class="card-icon">⌖</span><span class="card-label">SALON</span></div>
        <h3>${area ? `${area} 헤어숍 찾기` : "헤어숍 찾기"}</h3>
        <p>상담 전 이 리포트의 헤어스타일과 컬러 이름을 함께 보여주면 더 정확해요.</p>
        <button class="action-link map-action-button" type="button" data-map-query="${color.hairColor} 미용실">지도에서 보기 ${arrowIcon()}</button>
      </article>
    </div>`;
}

function beautyRow(label, item) {
  return `<li><span>${label}</span><strong class="color-swatch-line"><i style="background:${item[1]}"></i>${item[0]}</strong></li>`;
}

function renderBeauty() {
  const { color, mood, target, beautyAction } = styleGuide();
  const area = areaLabel();
  const beautyVisuals = getStyleVisualGroup("beauty", state.personalColor);
  const nailVisuals = getStyleVisualGroup("nail", state.personalColor);
  return `${renderHeading("beauty")}
    <div class="recommendation-grid">
      <article class="recommendation-card full has-visual">
        ${renderVisualFigure("beauty-palette", [beautyVisuals[0], nailVisuals[0]], { className: "recommendation-visual wide", label: `${target.beautyTitle} 참고`, eager: true })}
        <div class="card-topline"><span class="card-icon">◒</span><span class="card-label">MY ${target.beautyLabel.toUpperCase()}</span></div>
        <h3>${color.label} × ${mood.label}</h3>
        <p>오늘은 ${beautyAction}에 집중해 보세요.</p>
        <ul class="detail-list">
          ${beautyRowsForTarget(color).map(([label, item]) => beautyRow(label, item)).join("")}
        </ul>
      </article>
      <article class="recommendation-card has-visual">
        ${renderVisualFigure("beauty-shopping", beautyVisuals, { className: "recommendation-visual", label: "제품 참고" })}
        <div class="card-topline"><span class="card-icon">＋</span><span class="card-label">SHOPPING</span></div>
        <h3>내 컬러 제품 모아보기</h3>
        <p>색상명으로 여러 브랜드의 제품을 비교해 보세요. 발색은 피부색과 화면에 따라 달라질 수 있어요.</p>
        <a class="action-link" href="${searchLink(`${color.label} ${target.beautyLabel} ${currentStyleTargetKey() === "male" ? "립밤 톤업" : color.lip[0]}`)}" target="_blank" rel="noreferrer">추천 제품 검색 ${arrowIcon()}</a>
      </article>
      <article class="recommendation-card has-visual">
        ${renderVisualFigure("beauty-shop", [getServiceVisual("beautyShop")?.[0], nailVisuals[0]], { className: "recommendation-visual", label: `${target.shopLabel} 참고` })}
        <div class="card-topline"><span class="card-icon">⌖</span><span class="card-label">SHOP</span></div>
        <h3>전문가 만나기</h3>
        <p>중요한 날이라면 ${area ? `${area} 주변` : "활동 지역 주변"} ${target.shopLabel}에서 내 팔레트로 상담해 보세요.</p>
        <button class="action-link map-action-button" type="button" data-map-query="${target.nearShopQuery}">주변 숍 보기 ${arrowIcon()}</button>
      </article>
    </div>`;
}

function renderWear() {
  const { color, mood, target, outfit, moodPiece, moodDetail } = styleGuide();
  const outfitVisuals = getStyleVisualGroup("outfit", state.personalColor);
  const moodVisuals = getStyleVisualGroup("mood", state.mood, "natural");
  return `${renderHeading("wear")}
    <article class="today-lead">
      <div class="today-lead-copy">
        <span class="card-kicker">TODAY’S LOOK</span>
        <h3>${outfit}</h3>
        <p>${moodPiece}를 중심으로 ${moodDetail}을 더해 ${mood.label} 무드를 완성해 보세요.</p>
      </div>
      <div class="today-look today-look-photo">
        ${renderVisualFigure("wear-look", outfitVisuals, { className: "today-visual", label: "오늘의 옷", eager: true, width: 900, height: 1100 })}
      </div>
    </article>
    <div class="recommendation-grid">
      <article class="recommendation-card has-visual">
        ${renderVisualFigure("wear-best-colors", moodVisuals, { className: "recommendation-visual", label: "베스트 컬러 참고" })}
        <div class="card-topline"><span class="card-icon">◇</span><span class="card-label">BEST COLORS</span></div>
        <h3>${color.best.join(" · ")}</h3>
        <p>셔츠, 이너, 니트처럼 얼굴 가까이에 배치하면 가장 효과적이에요.</p>
        <div class="chip-row">${color.palette.map((hex, index) => `<span class="chip color-swatch-line"><i style="background:${hex}"></i>${color.best[index] ?? "포인트"}</span>`).join("")}</div>
      </article>
      <article class="recommendation-card has-visual">
        ${renderVisualFigure("wear-caution", getServiceVisual("caution"), { className: "recommendation-visual", label: "피할 조합 참고" })}
        <div class="card-topline"><span class="card-icon">×</span><span class="card-label">SKIP TODAY</span></div>
        <h3>이 조합은 잠시 쉬기</h3>
        <p>${color.avoid}. 입어야 한다면 얼굴에서 멀리 두고 베스트 컬러를 액세서리로 보완하세요.</p>
      </article>
      <article class="recommendation-card full has-visual">
        ${renderVisualFigure("wear-shopping", [outfitVisuals[0], getServiceVisual("shopping")?.[0]], { className: "recommendation-visual wide", label: "비슷한 옷 참고" })}
        <div class="card-topline"><span class="card-icon">＋</span><span class="card-label">FIND THE LOOK</span></div>
        <h3>오늘의 착장 쇼핑하기</h3>
        <p>추천은 특정 판매처의 광고가 아닌 스타일 검색 링크예요. 소재와 핏을 꼭 함께 확인하세요.</p>
        <a class="action-link" href="${searchLink(`${outfit} ${moodPiece} ${target.shoppingSuffix}`)}" target="_blank" rel="noreferrer">비슷한 옷 찾아보기 ${arrowIcon()}</a>
      </article>
    </div>`;
}

function renderCareItem(key, number, title, description, badge) {
  return `
    <div class="schedule-item has-visual">
      ${renderVisualFigure(`care-${key}`, getCareVisual(key), { className: "schedule-visual", label: title, width: 520, height: 520 })}
      <span class="schedule-number">${number}</span>
      <div><h3>${title}</h3><p>${description}</p></div>
      <span class="schedule-badge">${badge}</span>
    </div>
  `;
}

function renderCare() {
  const target = currentStyleTarget();
  return `${renderHeading("care")}
    <article class="recommendation-card full has-visual">
      ${renderVisualFigure("care-overview", [getCareVisual("haircut")?.[0], getCareVisual("makeup")?.[0], getCareVisual("nail")?.[0]], { className: "recommendation-visual wide", label: "관리 주기 참고", eager: true })}
      <div class="card-topline"><span class="card-icon">↻</span><span class="card-label">CARE CYCLE</span></div>
      <h3>잊기 쉬운 관리 주기</h3>
      <p>개인의 모발 성장 속도와 제품 사용 기간에 맞춰 조금씩 조정해 주세요.</p>
      <div class="schedule-list">
        ${renderCareItem("haircut", "01", "헤어 커트", "실루엣과 끝선이 무거워지기 전에 정리", "6–8주")}
        ${renderCareItem("roots", "02", "뿌리 염색", "전체 염색보다 손상을 줄이는 리터치 중심", "4–6주")}
        ${renderCareItem("treatment", "03", "펌 또는 클리닉", "컬이 느슨해지고 모발 끝이 건조해질 때", "3–4개월")}
        ${renderCareItem("makeup", "04", target.careMakeupTitle, "냄새와 제형이 변했다면 기간 전이라도 교체", "개봉 후 6–12개월")}
        ${renderCareItem("colorCheck", "05", "퍼스널 컬러 점검", "헤어 컬러나 피부 톤 변화가 클 때 다시 확인", "필요할 때")}
        ${renderCareItem("nail", "06", target.careNailTitle, "들뜸, 갈라짐, 건조함이 생기기 전에 정리하고 휴식", "2–6주")}
      </div>
    </article>`;
}

const renderers = { today: renderToday, hair: renderHair, beauty: renderBeauty, wear: renderWear, care: renderCare };

function renderCategory(category) {
  currentCategory = category;
  recommendationContent.innerHTML = renderers[category]();
  recommendationContent.style.animation = "none";
  requestAnimationFrame(() => { recommendationContent.style.animation = ""; });
}

function showToast(message, { duration = 2400 } = {}) {
  const toast = document.querySelector("#toast");
  const normalizedMessage = normalizeText(message, 90);
  const safeMessage = normalizedMessage.length > 48 ? `${normalizedMessage.slice(0, 47)}…` : normalizedMessage;
  if (!safeMessage) return;
  toast.textContent = safeMessage;
  toast.classList.toggle("is-long", safeMessage.length > 26);
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), duration);
}

function profileSummaryItems() {
  const { face, color, mood, target } = styleGuide();
  return [
    ["추천 기준", target.label],
    ["얼굴형", face.label],
    ["퍼스널컬러", color.label],
    ["무드", mood.label]
  ];
}

function openAnalysisNoteSheet() {
  const items = profileSummaryItems().map(([label, value]) => `
    <span class="sheet-chip"><small>${escapeHtml(label)}</small>${escapeHtml(value)}</span>
  `).join("");
  const summary = state.analysisSource === "photo"
    ? (analysisResult?.summary || state.analysisSummary || "사진에서 확인한 단서를 바탕으로 추천을 만들었어요.")
    : "직접 선택한 기준을 바탕으로 추천을 만들었어요.";
  const evidence = analysisResult
    ? `
      <div class="sheet-info-list compact">
        <p><strong>얼굴형 단서</strong><span>${escapeHtml((analysisResult.faceEvidence || []).join(" · ") || "선택한 얼굴형 기준을 사용했어요.")}</span></p>
        <p><strong>컬러 단서</strong><span>${escapeHtml((analysisResult.colorEvidence || []).join(" · ") || "선택한 퍼스널컬러 기준을 사용했어요.")}</span></p>
      </div>
    `
    : "";

  openBottomSheet({
    kicker: "추천 기준",
    title: "이 기준으로 추천했어요.",
    description: summary,
    body: `<div class="sheet-chip-row">${items}</div>${evidence}`,
    detent: analysisResult ? "large" : "medium",
    actions: [
      {
        label: "기준 수정하기",
        variant: "primary",
        handler: () => {
          closeBottomSheet({ restoreFocus: false });
          if (state.analysisSource === "photo" && analysisResult) {
            renderAnalysisReview();
            showAnalysisStage("review");
            showScreen("analysis");
          } else {
            beginQuiz();
          }
        }
      },
      { label: "닫기", handler: () => closeBottomSheet() }
    ]
  });
}

function openEditProfileSheet() {
  const canReviewPhoto = state.analysisSource === "photo" && analysisResult;
  openBottomSheet({
    kicker: "수정",
    title: "어떤 방식으로 다시 볼까요?",
    description: "결과를 버리지 않고, 필요한 기준만 다시 조정할 수 있어요.",
    body: `
      <div class="sheet-info-list">
        <p><strong>직접 선택으로 수정</strong><span>닉네임, 추천 기준, 얼굴형, 퍼스널컬러, 무드를 차례로 다시 고릅니다.</span></p>
        ${canReviewPhoto ? "<p><strong>사진 분석 기준 확인</strong><span>AI가 제안한 얼굴형과 컬러를 다시 확인하고 수정합니다.</span></p>" : ""}
      </div>
    `,
    actions: [
      ...(canReviewPhoto ? [{
        label: "사진 분석 기준 확인",
        variant: "primary",
        handler: () => {
          closeBottomSheet({ restoreFocus: false });
          renderAnalysisReview();
          showAnalysisStage("review");
          showScreen("analysis");
        }
      }] : []),
      { label: canReviewPhoto ? "직접 선택으로 수정" : "기준 다시 선택", variant: canReviewPhoto ? "secondary" : "primary", handler: () => { closeBottomSheet({ restoreFocus: false }); beginQuiz(); } },
      { label: "닫기", handler: () => closeBottomSheet() }
    ]
  });
}

function sharePayload() {
  const { color, face, mood, target } = styleGuide();
  const text = `나의 MOI 스타일: ${target.label} · ${color.label} · ${face.label} · ${mood.label}`;
  return { text, shareText: `${text}\n${window.location.href}` };
}

async function copyShareText() {
  const { shareText } = sharePayload();
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(shareText);
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = shareText;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    if (!copied) throw new Error("copy failed");
  }
  showToast("스타일 결과 링크를 복사했어요.");
}

function openShareSheet() {
  const { text } = sharePayload();
  const nativeShareAvailable = Boolean(navigator.share);
  openBottomSheet({
    kicker: "공유",
    title: "스타일 결과를 공유할까요?",
    description: text,
    body: `
      <div class="sheet-share-preview">
        <span>MOI</span>
        <strong>${escapeHtml(text)}</strong>
        <small>${escapeHtml(window.location.href)}</small>
      </div>
    `,
    actions: [
      ...(nativeShareAvailable ? [{
        label: "공유 시트 열기",
        variant: "primary",
        handler: async () => {
          try {
            await navigator.share({ title: "나의 MOI 스타일", text, url: window.location.href });
            closeBottomSheet({ restoreFocus: false });
          } catch (error) {
            if (error.name !== "AbortError") showToast("공유하지 못했어요.");
          }
        }
      }] : []),
      { label: "링크 복사", variant: nativeShareAvailable ? "secondary" : "primary", handler: async () => { await copyShareText(); closeBottomSheet({ restoreFocus: false }); } },
      { label: "닫기", handler: () => closeBottomSheet() }
    ]
  });
}

// --- Header actions: Google login (identity-only), refresh, share ----------
const GOOGLE_CLIENT_ID = window.MOI_CONFIG?.googleClientId?.trim() || "";
const AUTH_KEY = "moi-auth-v1";
const authButton = document.querySelector("#auth-button");
const authLabel = document.querySelector("#auth-label");
const authAvatar = document.querySelector("#auth-avatar");
const AUTH_AVATAR_DEFAULT = authAvatar ? authAvatar.innerHTML : "";
let authUser = null;
let googleTokenClient = null;

function renderAuth() {
  if (!authButton) return;
  if (authUser) {
    const name = authUser.name || authUser.email || "로그인됨";
    if (authLabel) authLabel.textContent = name;
    authButton.classList.add("is-authed");
    authButton.setAttribute("aria-label", `${name} · 계정 메뉴`);
    if (authAvatar) {
      const pic = typeof authUser.picture === "string" && authUser.picture.startsWith("https://") ? authUser.picture : "";
      authAvatar.innerHTML = pic
        ? `<img src="${escapeHtml(pic)}" alt="" referrerpolicy="no-referrer" />`
        : `<span class="auth-initial">${escapeHtml((name.trim()[0] || "?").toUpperCase())}</span>`;
    }
  } else {
    if (authLabel) authLabel.textContent = "로그인";
    authButton.classList.remove("is-authed");
    authButton.setAttribute("aria-label", "구글 계정으로 로그인");
    if (authAvatar) authAvatar.innerHTML = AUTH_AVATAR_DEFAULT;
  }
}

function setAuthUser(user) {
  authUser = user;
  try {
    if (user) localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    else localStorage.removeItem(AUTH_KEY);
  } catch {}
  renderAuth();
}

async function fetchGoogleProfile(accessToken) {
  try {
    const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

function initGoogleAuth() {
  try {
    const saved = JSON.parse(localStorage.getItem(AUTH_KEY));
    if (saved?.email) authUser = saved;
  } catch {}
  renderAuth();
  if (!GOOGLE_CLIENT_ID) return;
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.defer = true;
  script.onload = () => {
    if (!window.google?.accounts?.oauth2) return;
    googleTokenClient = google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: "openid email profile",
      callback: async (response) => {
        if (response.error || !response.access_token) {
          showToast("로그인을 취소했어요.");
          return;
        }
        const info = await fetchGoogleProfile(response.access_token);
        if (!info?.email) {
          showToast("프로필을 불러오지 못했어요.");
          return;
        }
        setAuthUser({ name: info.name, email: info.email, picture: info.picture, sub: info.sub });
        showToast(`${info.name || info.email}님 환영해요.`);
      }
    });
  };
  script.onerror = () => showToast("구글 로그인을 불러오지 못했어요.");
  document.head.appendChild(script);
}

function openAccountSheet() {
  openBottomSheet({
    kicker: "계정",
    title: authUser?.name || "내 계정",
    description: authUser?.email || "",
    body: `
      <div class="sheet-account">
        ${authUser?.picture ? `<img src="${escapeHtml(authUser.picture)}" alt="" referrerpolicy="no-referrer" />` : ""}
        <div><strong>${escapeHtml(authUser?.name || "")}</strong><small>${escapeHtml(authUser?.email || "")}</small></div>
      </div>
    `,
    actions: [
      { label: "로그아웃", variant: "primary", handler: () => { setAuthUser(null); closeBottomSheet({ restoreFocus: false }); showToast("로그아웃했어요."); } },
      { label: "닫기", handler: () => closeBottomSheet() }
    ]
  });
}

function handleAuthClick() {
  if (authUser) return openAccountSheet();
  if (!GOOGLE_CLIENT_ID) {
    showToast("구글 로그인 설정(Client ID)이 아직 없어요.");
    return;
  }
  if (googleTokenClient) googleTokenClient.requestAccessToken();
  else showToast("구글 로그인을 불러오는 중이에요.");
}

function isProfileShareable() {
  return Boolean(state.name && (state.faceShape || state.personalColor || state.mood));
}

function openAppShareSheet() {
  const text = "MOI — 얼굴형·퍼스널컬러로 오늘의 스타일을 정리하는 데일리 스타일리스트";
  const url = window.location.href;
  const nativeShareAvailable = Boolean(navigator.share);
  openBottomSheet({
    kicker: "공유",
    title: "MOI를 공유할까요?",
    description: text,
    body: `<div class="sheet-share-preview"><span>MOI</span><strong>${escapeHtml(text)}</strong><small>${escapeHtml(url)}</small></div>`,
    actions: [
      ...(nativeShareAvailable ? [{
        label: "공유 시트 열기",
        variant: "primary",
        handler: async () => {
          try {
            await navigator.share({ title: "MOI", text, url });
            closeBottomSheet({ restoreFocus: false });
          } catch (error) {
            if (error.name !== "AbortError") showToast("공유하지 못했어요.");
          }
        }
      }] : []),
      { label: "링크 복사", variant: nativeShareAvailable ? "secondary" : "primary", handler: async () => {
        try {
          if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(url);
          closeBottomSheet({ restoreFocus: false });
          showToast("앱 링크를 복사했어요.");
        } catch { showToast("복사하지 못했어요."); }
      } },
      { label: "닫기", handler: () => closeBottomSheet() }
    ]
  });
}

authButton?.addEventListener("click", handleAuthClick);
document.querySelector("#refresh-button")?.addEventListener("click", () => window.location.reload());
document.querySelector("#share-button")?.addEventListener("click", () => {
  isProfileShareable() ? openShareSheet() : openAppShareSheet();
});
initGoogleAuth();

document.querySelectorAll(".photo-start-button").forEach((button) => {
  button.addEventListener("click", () => beginPhotoFlow({ pickImmediately: button.dataset.pickImmediately === "true" }));
});
document.querySelectorAll(".manual-start-button").forEach((button) => button.addEventListener("click", () => beginQuiz({ reset: true })));

function openStartChooserSheet() {
  openBottomSheet({
    kicker: "새 스타일",
    title: "어떻게 시작할까요?",
    description: "사진으로 분석하거나, 직접 골라 같은 형식의 리포트를 만들 수 있어요.",
    body: `
      <div class="sheet-info-list">
        <p><strong>사진 등록</strong><span>얼굴이 잘 보이는 사진 한 장으로 윤곽과 색감 단서를 읽어요.</span></p>
        <p><strong>사진 없이 직접 선택</strong><span>닉네임, 얼굴형, 컬러, 무드만 골라도 같은 추천을 받아요.</span></p>
      </div>
    `,
    actions: [
      { label: "사진 등록", variant: "primary", handler: () => { closeBottomSheet({ restoreFocus: false }); beginPhotoFlow({ pickImmediately: true }); } },
      { label: "사진 없이 직접 선택", handler: () => { closeBottomSheet({ restoreFocus: false }); beginQuiz({ reset: true }); } }
    ]
  });
}
document.querySelectorAll(".start-chooser-button").forEach((button) => button.addEventListener("click", openStartChooserSheet));
document.querySelector(".brand")?.addEventListener("click", (event) => {
  event.preventDefault();
  showScreen("home");
});

[document.querySelector("#analysis-screen"), document.querySelector("#quiz-screen")].forEach((flow) => {
  flow?.addEventListener("click", (event) => {
    if (event.target === flow) dismissFlow({ to: "home" });
  });
});
document.querySelector("#demo-photo-button").hidden = !demoMode;
document.querySelector("#demo-photo-button").addEventListener("click", () => setSelectedPhoto(createDemoPhoto()));
function openSavedReport() {
  renderResultHeader();
  renderCategory(currentCategory);
  showScreen("result");
}
savedReportButton.addEventListener("click", openSavedReport);
savedReportInlineButton?.addEventListener("click", openSavedReport);

photoInput.addEventListener("change", (event) => handlePhoto(event.target.files?.[0]));
photoDropzone.addEventListener("dragover", (event) => {
  event.preventDefault();
  photoDropzone.classList.add("is-dragging");
});
photoDropzone.addEventListener("dragleave", () => photoDropzone.classList.remove("is-dragging"));
photoDropzone.addEventListener("drop", (event) => {
  event.preventDefault();
  photoDropzone.classList.remove("is-dragging");
  handlePhoto(event.dataTransfer?.files?.[0]);
});
analysisConsent.addEventListener("change", () => {
  analyzePhotoButton.disabled = !analysisConsent.checked;
});
analyzePhotoButton.addEventListener("click", requestPhotoAnalysis);
document.querySelector("#replace-photo-button").addEventListener("click", () => {
  photoInput.value = "";
  photoInput.click();
});
document.querySelector("#analysis-retry-button").addEventListener("click", () => {
  photoInput.value = "";
  photoInput.click();
});
document.querySelector("#analysis-back").addEventListener("click", () => {
  const activeStage = document.querySelector("[data-analysis-stage]:not([hidden])")?.dataset.analysisStage;
  if (activeStage === "guide") return showScreen("home");
  if (activeStage === "preview") return showAnalysisStage("guide");
  if (activeStage === "review") return showAnalysisStage("preview");
  showAnalysisStage("guide");
});

document.querySelectorAll("[data-review-group]").forEach((group) => {
  group.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-value]");
    if (!button) return;
    state[group.dataset.reviewGroup] = button.dataset.value;
    refreshReviewSelections();
    updateAnalysisCompleteButton();
  });
});
analysisNameInput.addEventListener("input", updateAnalysisCompleteButton);
analysisCompleteButton.addEventListener("click", () => {
  updateAnalysisCompleteButton();
  if (analysisCompleteButton.disabled) return;
  state.analysisSource = "photo";
  selectedPhoto = null;
  photoPreviewImage.removeAttribute("src");
  loadingPhotoImage.removeAttribute("src");
  completeProfile();
});

nameInput.addEventListener("input", (event) => {
  state.name = event.target.value;
  refreshStep();
});

document.querySelectorAll("[data-choice-group]").forEach((group) => {
  group.addEventListener("click", (event) => {
    const button = event.target.closest(".choice-card");
    if (!button) return;
    state[group.dataset.choiceGroup] = button.dataset.value;
    refreshChoices();
    refreshStep();
  });
});

nextButton.addEventListener("click", () => {
  if (!isStepComplete()) return;
  if (currentStep < steps.length - 1) {
    currentStep += 1;
    refreshStep();
    scrollActiveTop("smooth");
  } else {
    completeProfile();
  }
});

document.querySelector("#quiz-back").addEventListener("click", () => {
  if (currentStep === 0) return showScreen("home");
  currentStep -= 1;
  refreshStep();
});
document.querySelector("#quiz-close").addEventListener("click", () => showScreen("home"));
document.querySelector("#color-help").addEventListener("click", () => {
  openBottomSheet({
    kicker: "퍼스널컬러 힌트",
    title: "모르면 뉴트럴로 시작해도 괜찮아요.",
    description: "정확한 진단보다 오늘 바로 실패 확률을 낮추는 기준을 먼저 잡는 흐름이에요.",
    body: `
      <div class="sheet-info-list">
        <p><strong>웜이 편하다면</strong><span>아이보리, 베이지, 코랄, 브라운이 얼굴 가까이 왔을 때 편안한지 봐주세요.</span></p>
        <p><strong>쿨이 편하다면</strong><span>화이트, 그레이, 로즈, 블루 계열이 더 맑아 보이는지 확인해 주세요.</span></p>
        <p><strong>확신이 없다면</strong><span>‘잘 모르겠어요’를 선택하면 무난한 뉴트럴 팔레트로 추천합니다.</span></p>
      </div>
    `,
    actions: [
      { label: "알겠어요", variant: "primary", handler: () => closeBottomSheet() }
    ]
  });
});
document.querySelector("#edit-profile").addEventListener("click", openEditProfileSheet);
document.querySelector("#view-analysis-note").addEventListener("click", openAnalysisNoteSheet);

document.querySelector(".category-tabs").addEventListener("click", (event) => {
  const tab = event.target.closest(".category-tab");
  if (!tab) return;
  updateCategoryTabs(tab.dataset.category);
  renderCategory(tab.dataset.category);
});

document.addEventListener("click", (event) => {
  const visualButton = event.target.closest("[data-visual-gallery]");
  if (!visualButton) return;
  openVisualGallery(visualButton.dataset.visualGallery);
});

recommendationContent.addEventListener("click", (event) => {
  const button = event.target.closest("[data-map-query]");
  if (!button) return;
  openMapSearch(button.dataset.mapQuery);
});

saveAreaButton?.addEventListener("click", saveAreaFromResult);
resultAreaInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    saveAreaFromResult();
  }
});

document.querySelector("#share-result").addEventListener("click", openShareSheet);

sheetBackdrop?.addEventListener("click", () => closeBottomSheet());
sheetClose?.addEventListener("click", () => closeBottomSheet());
sheetGrabber?.addEventListener("pointerdown", beginSheetDrag);
sheetPanel?.addEventListener("pointerdown", (event) => {
  if (event.target.closest(".sheet-grabber")) return;
  if (event.target === sheetPanel) beginSheetDrag(event);
});
sheetPanel?.addEventListener("pointermove", moveSheetDrag);
sheetPanel?.addEventListener("pointerup", endSheetDrag);
sheetPanel?.addEventListener("pointercancel", endSheetDrag);
sheetActions?.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-sheet-action]");
  if (!button) return;
  const handler = sheetActionHandlers.get(button.dataset.sheetAction);
  if (!handler) return;
  button.disabled = true;
  try {
    await handler();
  } finally {
    button.disabled = false;
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (bottomSheet && !bottomSheet.hidden) {
    closeBottomSheet();
  } else if (activeFlow) {
    dismissFlow({ to: "home" });
  }
});

syncPhotoAvailability();
const hasSavedProfile = readSavedProfile();
if (window.location.hash === "#result" && hasSavedProfile) {
  renderResultHeader();
  renderCategory("today");
  showScreen("result");
}

window.addEventListener("load", scheduleSplashDismiss, { once: true });
