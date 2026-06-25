---
name: MOI
description: 사진과 선택을 바탕으로 매일의 스타일 기준을 정리하는 프리미엄 퍼스널 스타일리스트
colors:
  ink: "#241f1b"
  muted: "#756d66"
  paper: "#f7f3ed"
  paper-deep: "#eee7dd"
  white: "#fffdf9"
  coral: "#ef8f6d"
  coral-deep: "#d96f4b"
  sage: "#9baa8c"
typography:
  display:
    fontFamily: "DM Serif Display, Times New Roman, serif"
    fontSize: "clamp(3.125rem, 5.5vw, 4.75rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  hero:
    fontFamily: "DM Serif Display, Times New Roman, serif"
    fontSize: "clamp(4rem, 7.2vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Noto Sans KR, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.9
  label:
    fontFamily: "Noto Sans KR, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    letterSpacing: "0.16em"
rounded:
  sharp: "3px"
  soft: "12px"
  card: "16px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "18px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.sharp}"
    padding: "0 25px"
    height: "54px"
  button-primary-hover:
    backgroundColor: "#3a332d"
    textColor: "{colors.white}"
    rounded: "{rounded.sharp}"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.sharp}"
    padding: "9px 0 6px"
  surface-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "24px"
  text-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "14px 16px"
---

# Design System: MOI

## 1. Overview

**Creative North Star: "The Private Atelier"**

MOI의 시각 시스템은 프라이빗 아틀리에처럼 작동한다. 사용자는 차가운 진단실에 들어오는 것이 아니라, 조용하고 감각적인 개인 스타일리스트에게 자신의 기준을 정리받는다. 화면은 고급스럽되 과시하지 않고, 정보는 친절하되 설득하지 않는다.

이 시스템은 따뜻한 종이 톤, 깊은 잉크 컬러, 절제된 코랄 포인트, 세리프 디스플레이 타입으로 프리미엄한 감도를 만든다. 단, 제품 UI이기 때문에 장식은 흐름을 방해하면 안 된다. 사진 업로드, 동의, AI 제안 확인, 직접 수정, 추천 확인이 자연스럽게 이어지는 것이 가장 중요하다.

SaaS 대시보드 같은 보라/파랑 그라데이션, 병원·관공서 같은 차가운 표정, “AI가 외모를 판정한다”는 인상은 모두 금지한다. MOI는 사용자를 평가하지 않고, 스타일 선택을 조용히 정리해주는 도구다.

**Key Characteristics:**

- 모바일 우선의 단일 흐름
- 프리미엄하지만 부드러운 편집숍 톤
- AI 결과를 verdict가 아니라 suggestion으로 보여주는 언어
- 낮은 채도의 따뜻한 배경과 희소한 코랄 포인트
- 세리프는 히어로와 감성적 제목에만, 실제 조작 UI는 산세리프로 명확하게

## 2. Colors

MOI의 팔레트는 따뜻한 편집지 위에 잉크로 정리하고, 코랄을 생기 있는 확신으로 아주 적게 얹는 구조다.

### Primary

- **Atelier Ink** (`#241f1b`): 본문 텍스트, 주요 CTA, 브랜드 마크의 기준색. 차갑지 않은 거의 검정으로 프리미엄한 밀도를 만든다.
- **Quiet Coral** (`#ef8f6d`): 구분선, 작은 강조, 팔레트 단서에 사용한다. 넓은 면적보다 “발견되는 포인트”로 쓸 때 가장 좋다.
- **Deep Coral** (`#d96f4b`): 중요한 감정적 강조와 선택 상태에 사용한다. 버튼 전체 배경으로 남발하지 않는다.

### Secondary

- **Soft Sage** (`#9baa8c`): 자연스러운 관리·케어·밸런스의 보조 단서. 코랄보다 차분한 역할이 필요할 때 쓴다.

### Neutral

- **Warm Paper** (`#f7f3ed`): 전체 배경. 따뜻하지만 병원식 흰색이나 SaaS식 회색 배경으로 가지 않게 하는 기본 표면이다.
- **Layered Paper** (`#eee7dd`): 섹션 분리, 약한 배경 레이어, 입력 전 상태에 사용한다.
- **Soft White** (`#fffdf9`): 카드, 드롭존, 입력 focus 표면처럼 내용이 올라오는 영역에 사용한다.
- **Muted Cocoa** (`#756d66`): 보조 설명 텍스트. 작은 글씨에서 대비가 낮아지지 않도록 배경에 따라 더 어둡게 조정한다.

### Named Rules

**The Rare Coral Rule.** 코랄은 한 화면의 10% 이하로 사용한다. 많이 쓰면 프리미엄이 아니라 뷰티 커머스 프로모션처럼 보인다.

**The No SaaS Gradient Rule.** 보라색·파란색 그라데이션, 네온 액센트, 카드형 메트릭 장식은 사용하지 않는다.

## 3. Typography

**Display Font:** DM Serif Display with Times New Roman fallback
**Body Font:** Noto Sans KR with Apple/system fallbacks
**Label/Mono Font:** Noto Sans KR

**Character:** 세리프는 스타일리스트의 감각과 프리미엄한 편집감을 만든다. 산세리프는 실제 선택, 입력, 상태 안내를 명확하게 만든다.

### Hierarchy

- **Hero** (400, `clamp(4rem, 7.6vw, 7rem)`, `0.96`): 랜딩과 분석 주요 장면의 감성적 선언에만 사용한다. letter-spacing은 `-0.04em`보다 더 조이지 않는다.
- **Display** (400, `clamp(3.125rem, 5.5vw, 4.75rem)`, `1.02`): 섹션 제목과 결과 히어로에 사용한다.
- **Title** (400–600, `1.5rem–2.125rem`, `1.2–1.35`): 카드 제목, 분석 단계 제목, 추천 묶음 제목에 사용한다.
- **Body** (400, `0.875rem–0.9375rem`, `1.7–1.9`): 설명 문장과 근거에 사용한다. 긴 설명은 65–75ch를 넘기지 않는다.
- **Label** (600–700, `0.625rem–0.75rem`, `0.12em–0.2em`): 짧은 상태 라벨과 eyebrow에 사용한다. 모든 섹션에 반복하지 않는다.

### Named Rules

**The Serif Has a Job Rule.** 버튼, 입력, 탭, 상태 라벨에는 세리프를 쓰지 않는다. 조작 요소는 항상 산세리프가 맡는다.

**The No Diagnostic Voice Rule.** “진단”, “판정”, “등급”처럼 사용자를 대상화하는 단어보다 “제안”, “단서”, “기준”, “확인”을 우선한다.

## 4. Elevation

MOI는 평평한 제품 UI 위에 일부 아틀리에 오브젝트만 떠 있는 하이브리드 시스템이다. 기본 폼과 추천 영역은 선과 배경 레이어로 구조를 만들고, 히어로 카드·플로팅 노트·프리뷰처럼 감각을 보여주는 요소에만 부드러운 그림자를 사용한다.

### Shadow Vocabulary

- **Atelier Ambient** (`0 24px 70px rgba(55, 42, 31, 0.13)`): 히어로 카드처럼 브랜드 무드를 만드는 큰 오브젝트에만 사용한다.
- **Floating Note** (`0 14px 40px rgba(55, 42, 31, 0.12)`): 작고 가벼운 추천 노트, 보조 정보 카드에 사용한다.
- **No Shadow Default**: 폼, 탭, 일반 추천 카드에는 그림자보다 배경 대비와 선을 우선한다.

### Named Rules

**The No Ghost Card Rule.** 1px border와 큰 blur shadow를 동시에 남발하지 않는다. 카드가 필요하면 선명한 구조 또는 명확한 그림자 중 하나를 선택한다.

## 5. Components

### Buttons

- **Shape:** 거의 각진 `3px` radius. 프리미엄 편집숍 같은 단정함을 유지한다.
- **Primary:** `Atelier Ink` 배경, `Soft White` 텍스트, `54px` 높이, 넉넉한 좌우 패딩. 핵심 진행 CTA에만 사용한다.
- **Hover / Focus:** hover는 살짝 어두워지고 `translateY(-2px)` 정도로만 반응한다. focus-visible은 명확한 outline을 추가해야 한다.
- **Secondary / Link:** 직접 선택, 사진 교체 같은 낮은 우선순위 액션은 투명 배경과 얇은 밑줄로 처리한다.

### Chips

- **Style:** 선택지는 카드처럼 과장하지 않고, 텍스트와 약한 선/배경으로 상태를 구분한다.
- **State:** 선택 상태는 코랄이나 잉크를 사용하되 색상만으로 전달하지 않고 `aria-pressed`, 텍스트 강조, 배경 변화를 함께 사용한다.

### Cards / Containers

- **Corner Style:** 일반 정보 카드는 `12–16px` 선에서 멈춘다. 큰 원형 radius나 SaaS식 pill-card를 피한다.
- **Background:** 기본은 `Soft White`, 보조 레이어는 `Layered Paper`.
- **Shadow Strategy:** 기본은 flat. 히어로·프리뷰·플로팅 추천처럼 시각적 오브젝트에만 ambient shadow를 쓴다.
- **Border:** `rgba(36, 31, 27, 0.14)` 계열의 얇은 선을 사용한다.
- **Internal Padding:** 모바일에서는 `22–26px`, 넓은 화면에서는 `32–48px`까지 확장한다.

### Inputs / Fields

- **Style:** 따뜻한 종이 배경 위에 얇은 선, 짧은 라벨, 충분한 터치 높이를 제공한다.
- **Focus:** 배경을 `Soft White`로 밝히고 border를 `Atelier Ink`로 명확히 바꾼다.
- **Error / Disabled:** opacity만으로 끝내지 않고 짧은 설명 문장과 다시 진행할 수 있는 대안을 함께 제공한다.

### Navigation

- **Style:** 상단 브랜드와 저장된 결과 진입 버튼은 작고 조용해야 한다. 추천 결과의 탭은 카테고리 전환이라는 기능이 분명해야 하므로 label과 active 상태가 명확해야 한다.
- **Mobile Treatment:** 한 손 조작을 고려해 CTA와 탭 터치 영역은 충분히 크게 유지한다.

### Signature Component

**AI Review Card**는 MOI의 핵심 컴포넌트다. 신뢰도, 근거, 직접 수정 선택지를 한 화면에 보여주되 “AI가 판정했다”가 아니라 “AI가 먼저 읽은 단서”라는 구조를 유지한다. 신뢰도가 낮거나 사진 조건이 나쁠 때는 사용자를 탓하지 말고 더 좋은 사진 조건과 직접 선택 대안을 제공한다.

## 6. Do's and Don'ts

### Do:

- **Do** AI 분석 결과를 항상 사용자가 수정 가능한 제안으로 보여준다.
- **Do** 코랄을 희소하게 사용하고, 주요 행동·선택 상태·작은 감정적 강조에만 쓴다.
- **Do** 사진 전송, 저장 여부, 분석 한계를 짧고 명확하게 설명한다.
- **Do** 모바일 터치 영역, focus-visible, `aria-live`, reduced motion을 기본 품질로 다룬다.
- **Do** 결과 추천을 헤어·뷰티·옷·관리·제품/숍 링크까지 행동 가능한 단위로 이어준다.

### Don't:

- **Don't** SaaS 대시보드처럼 보이는 보라색/파란색 그라데이션, 카드 범벅, 메트릭 중심 히어로를 사용하지 않는다.
- **Don't** 병원, 진단센터, 관공서 같은 차갑고 규정 중심적인 인상을 만들지 않는다.
- **Don't** 사용자를 평가하거나 등급화하는 뷰티 진단 앱처럼 말하지 않는다.
- **Don't** 판매 전환만 앞세우는 뷰티 커머스 톤으로 제품/숍 링크를 밀어붙이지 않는다.
- **Don't** AI가 외모를 판정한다는 느낌, 민감 특성을 추정한다는 느낌, “정답을 내려준다”는 느낌을 만들지 않는다.
- **Don't** 카드 radius를 `24px` 이상으로 키우거나 ghost-card shadow를 남발하지 않는다.
