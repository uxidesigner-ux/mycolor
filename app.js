const STORAGE_KEY = "moi-style-profile-v1";

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
  }
};

const moods = {
  clean: {
    label: "클린",
    english: "Clean & Clear",
    accent: "선을 정돈하고 컬러는 한 곳에만",
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

const labels = {
  today: ["Today’s edit", "오늘 바로 적용할 세 가지"],
  hair: ["Hair direction", "얼굴형과 퍼스널 컬러를 함께 반영했어요"],
  beauty: ["Beauty palette", "메이크업 컬러를 한 팔레트로 정리했어요"],
  wear: ["Daily wear", "잘 받는 색과 원하는 무드의 교집합이에요"],
  care: ["Care rhythm", "스타일이 흐트러지기 전 관리 시점이에요"]
};

const state = {
  name: "",
  area: "",
  faceShape: "",
  personalColor: "",
  mood: ""
};

let currentStep = 0;
let currentCategory = "today";
let toastTimer;

const screens = [...document.querySelectorAll("[data-screen]")];
const steps = [...document.querySelectorAll(".quiz-step")];
const nextButton = document.querySelector("#quiz-next");
const progressLabel = document.querySelector("#progress-label");
const progressBar = document.querySelector("#progress-bar");
const nameInput = document.querySelector("#name-input");
const areaInput = document.querySelector("#area-input");
const savedReportButton = document.querySelector("#saved-report-button");
const recommendationContent = document.querySelector("#recommendation-content");

function readSavedProfile() {
  try {
    const profile = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!profile || !faceShapes[profile.faceShape] || !personalColors[profile.personalColor] || !moods[profile.mood]) return false;
    Object.assign(state, profile);
    savedReportButton.hidden = false;
    return true;
  } catch {
    return false;
  }
}

function showScreen(name) {
  screens.forEach((screen) => screen.classList.toggle("is-active", screen.dataset.screen === name));
  window.scrollTo({ top: 0, behavior: "instant" });
  history.replaceState(null, "", name === "home" ? "#home" : `#${name}`);
}

function beginQuiz({ reset = false } = {}) {
  if (reset) {
    Object.keys(state).forEach((key) => { state[key] = ""; });
  }
  nameInput.value = state.name;
  areaInput.value = state.area;
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
  if (currentStep === 0) return state.name.trim().length > 0 && state.area.trim().length > 0;
  if (currentStep === 1) return Boolean(state.faceShape);
  if (currentStep === 2) return Boolean(state.personalColor);
  return Boolean(state.mood);
}

function refreshStep() {
  steps.forEach((step, index) => { step.hidden = index !== currentStep; });
  progressLabel.textContent = `${currentStep + 1} / ${steps.length}`;
  progressBar.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
  nextButton.textContent = currentStep === steps.length - 1 ? "나의 스타일 리포트 보기" : "다음";
  nextButton.disabled = !isStepComplete();
  document.querySelector("#quiz-back").setAttribute("aria-label", currentStep === 0 ? "홈으로" : "이전 단계");
}

function completeProfile() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  savedReportButton.hidden = false;
  currentCategory = "today";
  document.querySelectorAll(".category-tab").forEach((tab) => tab.classList.toggle("is-active", tab.dataset.category === "today"));
  renderResultHeader();
  renderCategory("today");
  showScreen("result");
}

function renderResultHeader() {
  const color = personalColors[state.personalColor];
  document.querySelector("#result-name").textContent = state.name.trim();
  document.querySelector("#direction-title").innerHTML = color.title.replace("\n", "<br />");
  document.querySelector("#profile-tags").innerHTML = [faceShapes[state.faceShape].label, color.label, moods[state.mood].label]
    .map((tag) => `<span>${tag}</span>`).join("");
  document.querySelector("#result-palette").innerHTML = color.palette.map((hex) => `<i style="background:${hex}"></i>`).join("");
}

function searchLink(query) {
  return `https://search.shopping.naver.com/search/all?query=${encodeURIComponent(query)}`;
}

function mapLink(query) {
  return `https://map.naver.com/p/search/${encodeURIComponent(`${state.area} ${query}`)}`;
}

function arrowIcon() {
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>';
}

function renderHeading(category) {
  const [title, description] = labels[category];
  return `<div class="content-heading"><h2>${title}</h2><p>${description}</p></div>`;
}

function renderToday() {
  const face = faceShapes[state.faceShape];
  const color = personalColors[state.personalColor];
  const mood = moods[state.mood];
  return `${renderHeading("today")}
    <article class="today-lead">
      <div class="today-lead-copy">
        <span class="card-kicker">${mood.english.toUpperCase()}</span>
        <h3>${color.outfit}</h3>
        <p>${color.summary} 오늘은 ${mood.accent}에 집중해 보세요.</p>
      </div>
      <div class="today-look" aria-hidden="true"></div>
    </article>
    <div class="recommendation-grid">
      <article class="recommendation-card">
        <div class="card-topline"><span class="card-icon">⌁</span><span class="card-label">HAIR</span></div>
        <h3>${face.hair}</h3>
        <p>${face.tip}</p>
        <div class="chip-row"><span class="chip">${color.hairColor}</span><span class="chip">${face.fringe}</span></div>
      </article>
      <article class="recommendation-card">
        <div class="card-topline"><span class="card-icon">◒</span><span class="card-label">BEAUTY</span></div>
        <h3>${color.lip[0]} 포인트</h3>
        <p>${mood.makeup} 조합으로 전체 인상을 연결해 보세요.</p>
        <div class="chip-row"><span class="chip">${color.brow[0]}</span><span class="chip">${color.shadow[0]}</span></div>
      </article>
      <article class="recommendation-card full">
        <div class="card-topline"><span class="card-icon">⌖</span><span class="card-label">NEAR ${state.area.toUpperCase()}</span></div>
        <h3>내 스타일을 잘 아는 가까운 숍</h3>
        <p>${state.area} 주변의 퍼스널 컬러 전문 헤어·메이크업 숍을 지도에서 바로 살펴보세요.</p>
        <a class="action-link" href="${mapLink("퍼스널 컬러 헤어 메이크업")}" target="_blank" rel="noreferrer">주변 숍 찾아보기 ${arrowIcon()}</a>
      </article>
    </div>`;
}

function renderHair() {
  const face = faceShapes[state.faceShape];
  const color = personalColors[state.personalColor];
  return `${renderHeading("hair")}
    <div class="recommendation-grid">
      <article class="recommendation-card full">
        <div class="card-topline"><span class="card-icon">⌁</span><span class="card-label">BEST CUT</span></div>
        <h3>${face.hair}</h3>
        <p>${face.tip}</p>
        <ul class="detail-list">
          <li><span>앞머리</span><strong>${face.fringe}</strong></li>
          <li><span>피하면 좋은 것</span><strong>${face.avoid}</strong></li>
          <li><span>미용실에서</span><strong>“얼굴선을 따라 가볍게 연결되는 레이어를 살려주세요.”</strong></li>
        </ul>
      </article>
      <article class="recommendation-card">
        <div class="card-topline"><span class="card-icon">●</span><span class="card-label">COLOR</span></div>
        <h3>${color.hairColor}</h3>
        <p>${color.label}의 피부 온도와 자연스럽게 어우러지면서 인상을 환하게 만드는 컬러예요.</p>
        <div class="chip-row">${color.hairAlt.map((item) => `<span class="chip">${item}</span>`).join("")}</div>
      </article>
      <article class="recommendation-card">
        <div class="card-topline"><span class="card-icon">⌖</span><span class="card-label">SALON</span></div>
        <h3>${state.area} 헤어숍 찾기</h3>
        <p>상담 전 이 리포트의 헤어스타일과 컬러 이름을 함께 보여주면 더 정확해요.</p>
        <a class="action-link" href="${mapLink(`${color.hairColor} 미용실`)}" target="_blank" rel="noreferrer">지도에서 보기 ${arrowIcon()}</a>
      </article>
    </div>`;
}

function beautyRow(label, item) {
  return `<li><span>${label}</span><strong class="color-swatch-line"><i style="background:${item[1]}"></i>${item[0]}</strong></li>`;
}

function renderBeauty() {
  const color = personalColors[state.personalColor];
  const mood = moods[state.mood];
  return `${renderHeading("beauty")}
    <div class="recommendation-grid">
      <article class="recommendation-card full">
        <div class="card-topline"><span class="card-icon">◒</span><span class="card-label">MY PALETTE</span></div>
        <h3>${color.label} × ${mood.label}</h3>
        <p>${mood.makeup}이 오늘의 핵심이에요.</p>
        <ul class="detail-list">
          ${beautyRow("아이브로우", color.brow)}
          ${beautyRow("컬러 렌즈", color.lens)}
          ${beautyRow("립", color.lip)}
          ${beautyRow("아이 섀도", color.shadow)}
          ${beautyRow("네일", color.nail)}
        </ul>
      </article>
      <article class="recommendation-card">
        <div class="card-topline"><span class="card-icon">＋</span><span class="card-label">SHOPPING</span></div>
        <h3>내 컬러 제품 모아보기</h3>
        <p>색상명으로 여러 브랜드의 제품을 비교해 보세요. 발색은 피부색과 화면에 따라 달라질 수 있어요.</p>
        <a class="action-link" href="${searchLink(`${color.label} ${color.lip[0]} 립`)}" target="_blank" rel="noreferrer">추천 립 검색 ${arrowIcon()}</a>
      </article>
      <article class="recommendation-card">
        <div class="card-topline"><span class="card-icon">⌖</span><span class="card-label">BEAUTY SHOP</span></div>
        <h3>뷰티 전문가 만나기</h3>
        <p>중요한 날이라면 ${state.area} 주변 메이크업·네일숍에서 내 팔레트로 상담해 보세요.</p>
        <a class="action-link" href="${mapLink("메이크업 네일샵")}" target="_blank" rel="noreferrer">주변 숍 보기 ${arrowIcon()}</a>
      </article>
    </div>`;
}

function renderWear() {
  const color = personalColors[state.personalColor];
  const mood = moods[state.mood];
  return `${renderHeading("wear")}
    <article class="today-lead">
      <div class="today-lead-copy">
        <span class="card-kicker">TODAY’S LOOK</span>
        <h3>${color.outfit}</h3>
        <p>${mood.piece}를 중심으로 ${mood.detail}을 더해 ${mood.label} 무드를 완성해 보세요.</p>
      </div>
      <div class="today-look" aria-hidden="true"></div>
    </article>
    <div class="recommendation-grid">
      <article class="recommendation-card">
        <div class="card-topline"><span class="card-icon">◇</span><span class="card-label">BEST COLORS</span></div>
        <h3>${color.best.join(" · ")}</h3>
        <p>상의, 스카프처럼 얼굴 가까이에 배치하면 가장 효과적이에요.</p>
        <div class="chip-row">${color.palette.map((hex, index) => `<span class="chip color-swatch-line"><i style="background:${hex}"></i>${color.best[index] ?? "포인트"}</span>`).join("")}</div>
      </article>
      <article class="recommendation-card">
        <div class="card-topline"><span class="card-icon">×</span><span class="card-label">SKIP TODAY</span></div>
        <h3>이 조합은 잠시 쉬기</h3>
        <p>${color.avoid}. 입어야 한다면 얼굴에서 멀리 두고 베스트 컬러를 액세서리로 보완하세요.</p>
      </article>
      <article class="recommendation-card full">
        <div class="card-topline"><span class="card-icon">＋</span><span class="card-label">FIND THE LOOK</span></div>
        <h3>오늘의 착장 쇼핑하기</h3>
        <p>추천은 특정 판매처의 광고가 아닌 스타일 검색 링크예요. 소재와 핏을 꼭 함께 확인하세요.</p>
        <a class="action-link" href="${searchLink(`${color.outfit} ${mood.piece}`)}" target="_blank" rel="noreferrer">비슷한 옷 찾아보기 ${arrowIcon()}</a>
      </article>
    </div>`;
}

function renderCare() {
  return `${renderHeading("care")}
    <article class="recommendation-card full">
      <div class="card-topline"><span class="card-icon">↻</span><span class="card-label">CARE CYCLE</span></div>
      <h3>잊기 쉬운 관리 주기</h3>
      <p>개인의 모발 성장 속도와 제품 사용 기간에 맞춰 조금씩 조정해 주세요.</p>
      <div class="schedule-list">
        <div class="schedule-item"><span class="schedule-number">01</span><div><h3>헤어 커트</h3><p>실루엣과 끝선이 무거워지기 전에 정리</p></div><span class="schedule-badge">6–8주</span></div>
        <div class="schedule-item"><span class="schedule-number">02</span><div><h3>뿌리 염색</h3><p>전체 염색보다 손상을 줄이는 리터치 중심</p></div><span class="schedule-badge">4–6주</span></div>
        <div class="schedule-item"><span class="schedule-number">03</span><div><h3>펌 또는 클리닉</h3><p>컬이 느슨해지고 모발 끝이 건조해질 때</p></div><span class="schedule-badge">3–4개월</span></div>
        <div class="schedule-item"><span class="schedule-number">04</span><div><h3>메이크업 제품</h3><p>냄새와 제형이 변했다면 기간 전이라도 교체</p></div><span class="schedule-badge">개봉 후 6–12개월</span></div>
        <div class="schedule-item"><span class="schedule-number">05</span><div><h3>퍼스널 컬러 점검</h3><p>헤어 컬러나 피부 톤 변화가 클 때 다시 확인</p></div><span class="schedule-badge">필요할 때</span></div>
        <div class="schedule-item"><span class="schedule-number">06</span><div><h3>네일 · 페디</h3><p>들뜸이나 갈라짐이 생기기 전에 제거하고 휴식</p></div><span class="schedule-badge">네일 2–3주 · 페디 4–6주</span></div>
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

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

document.querySelectorAll(".start-button").forEach((button) => button.addEventListener("click", () => beginQuiz({ reset: true })));
savedReportButton.addEventListener("click", () => {
  renderResultHeader();
  renderCategory(currentCategory);
  showScreen("result");
});

nameInput.addEventListener("input", (event) => {
  state.name = event.target.value;
  refreshStep();
});
areaInput.addEventListener("input", (event) => {
  state.area = event.target.value;
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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
  const box = document.querySelector("#color-help-box");
  box.hidden = !box.hidden;
});
document.querySelector("#edit-profile").addEventListener("click", () => beginQuiz());

document.querySelector(".category-tabs").addEventListener("click", (event) => {
  const tab = event.target.closest(".category-tab");
  if (!tab) return;
  document.querySelectorAll(".category-tab").forEach((item) => item.classList.toggle("is-active", item === tab));
  renderCategory(tab.dataset.category);
});

document.querySelector("#share-result").addEventListener("click", async () => {
  const color = personalColors[state.personalColor];
  const text = `나의 MOI 스타일: ${color.label} · ${faceShapes[state.faceShape].label} · ${moods[state.mood].label}`;
  try {
    if (navigator.share) {
      await navigator.share({ title: "나의 MOI 스타일", text, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
      showToast("스타일 결과 링크를 복사했어요.");
    }
  } catch (error) {
    if (error.name !== "AbortError") showToast("공유하지 못했어요. 잠시 후 다시 시도해 주세요.");
  }
});

const hasSavedProfile = readSavedProfile();
if (window.location.hash === "#result" && hasSavedProfile) {
  renderResultHeader();
  renderCategory("today");
  showScreen("result");
}
