---
name: MOI
description: 사진과 선택을 바탕으로 매일의 스타일 기준을 정리하는 화이트/그레이 기반 퍼스널 스타일리스트
colors:
  ink: "#111111"
  muted: "#666666"
  muted-strong: "#444444"
  white: "#ffffff"
  surface-soft: "#fafafa"
  surface: "#f7f7f7"
  surface-mid: "#f2f2f2"
  line: "#e8e8e8"
  line-strong: "#d8d8d8"
typography:
  ui:
    fontFamily: "Noto Sans KR, -apple-system, BlinkMacSystemFont, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
  title:
    fontFamily: "Noto Sans KR, -apple-system, BlinkMacSystemFont, sans-serif"
    fontWeight: 800
    lineHeight: 1.16
    letterSpacing: "-0.04em"
rounded:
  sm: "8px"
  md: "14px"
  lg: "18px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    height: "52px"
  button-secondary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    borderColor: "{colors.line-strong}"
    rounded: "{rounded.pill}"
    height: "52px"
  surface-card:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    borderColor: "{colors.line}"
    rounded: "{rounded.lg}"
    shadow: "none"
  text-field:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    borderColor: "{colors.line}"
    rounded: "{rounded.md}"
---

# Design System: MOI v0.2.5

## 1. Overview

**Creative North Star: “Clean Beauty Tool”**

MOI는 감성적인 랜딩보다 매일 바로 쓰는 스타일 추천 도구에 가까워졌다. 새 시각 시스템은 화해처럼 흰 배경, 옅은 회색 구획, 얇은 경계선, 둥근 리스트/카드, 검정에 가까운 핵심 액션으로 신뢰감을 만든다.

프리미엄은 장식적인 붉은 색, 세리프 타입, 큰 그림자에서 나오지 않는다. 사용자가 빠르게 읽고 선택하고 결과를 이해할 수 있는 선명한 UI 구조에서 나온다.

## 2. Colors

MOI의 제품 UI는 화이트/그레이/블랙 중심이다.

- **Ink `#111111`**: 주요 텍스트, 기본 CTA, 현재 선택 상태, 핵심 아이콘.
- **Muted `#666666`**: 보조 설명과 안내 문장.
- **Muted Strong `#444444`**: 중요하지만 primary는 아닌 라벨.
- **White `#ffffff`**: 전체 배경과 주요 입력 표면.
- **Soft Surface `#fafafa`**: 카드, 섹션, 안내 박스.
- **Surface `#f7f7f7` / Mid `#f2f2f2`**: 탭 배경, 선택 전/후 레벨 차이.
- **Line `#e8e8e8` / Strong Line `#d8d8d8`**: 구획선과 컴포넌트 경계.

### Rules

- UI chrome에는 붉은색/코랄을 쓰지 않는다.
- 포인트는 거의 검정색 하나로 해결한다.
- 회색은 중요도에 따라 `#fafafa → #f7f7f7 → #f2f2f2 → #e8e8e8 → #666`로 단계화한다.
- 퍼스널컬러 팔레트 스와치는 추천 데이터이므로 유지하되, UI 전체 톤을 깨지 않도록 작고 낮은 채도로 보여준다.

## 3. Typography

제품 UI 전체는 산세리프 하나로 통일한다.

- **Family:** `Noto Sans KR`, Apple/system fallback.
- **Title:** 700–800 weight, `-0.03em` to `-0.04em`, 짧고 단단하게.
- **Body:** 14–16px, line-height 1.6–1.75.
- **Label:** 작은 uppercase 대신 한국어 중심의 짧은 라벨. 과한 tracking을 피한다.

### Rules

- 버튼, 탭, 입력, 카드 제목 모두 산세리프를 쓴다.
- 세리프/이탤릭 장식은 사용하지 않는다.
- 정보형 화면에서는 감성 문장보다 행동 가능한 문장을 우선한다.

## 4. Components

### Navigation: Hub + Sheet flows

v0.2.3부터 화면 멘탈모델은 "허브 + 시트, 결과는 장소"로 통일한다.

- **라우트(별도 화면)는 둘뿐:** `#home`(허브)과 `#result`(완성된 리포트). 둘만 전체 화면 전환을 한다.
- **작업은 시트로 처리한다:** 사진 분석·직접 선택·시작 선택은 모두 홈 위에서 아래로 슬라이드되는 바텀시트로 연다. 시트가 열리면 허브는 살짝 scale-down 되어 뒤에 남는다(iOS depth).
- **완료 계약(모든 메뉴 동일):** 작업을 마치면 시트가 아래로 슬라이드 아웃되며 `#result`로 라우팅된다. 시트를 닫거나 드래그/Esc/백드롭으로 dismiss하면 결과 없이 허브로 돌아온다.
- **사진 분석은 large detent 시트**로 내부 스테이지(가이드→미리보기→로딩→검토)를 진행하고, **직접 선택은 시트 내부 단계 전환**(한 번에 한 질문)으로 진행한다.
- 시트 상단에는 grabber 바와 도달 가능한 상단 컨트롤(뒤로/닫기)을 둔다.
- 결과 안의 공유·지역·수정·근거는 `#result` 위에 보조 시트로 연다.
- 하단 내비는 좌측에 축소한 `홈 · 저장` 클러스터, 우측에 `+`(시작 선택 시트)만 둔다.

### Functional Home

- 스플래시 이후 첫 화면은 설득용 랜딩이 아니라 즉시 실행 화면이다.
- 모바일에서는 상단 앱바, 카드 그리드, 하단 floating 내비를 가진 앱 홈 구조로 시작한다.
- 데스크톱에서도 별도 랜딩 컬럼보다 모바일 앱 홈 자체를 중앙에 두어, 실제 사용 화면과 웹 진입 화면의 멘탈모델을 맞춘다.
- 홈에는 선택지를 두 개만 둔다: `사진 등록`(가장 큰 카드)과 `사진 없이 직접 선택`. 설득형 정보 카드나 모드 칩으로 화면을 늘리지 않는다.
- 홈의 문장은 최소화하고, 사용자가 이미 서비스를 알고 들어왔다는 전제로 기능 동작을 우선한다.

### Buttons

- Primary는 검정 배경 pill 버튼.
- Secondary는 흰 배경, 회색 경계선, 검정 텍스트.
- Disabled는 opacity만 낮추지 말고 주변 안내 문장으로 이유를 설명한다.

### Cards

- 기본 배경은 `#fafafa` 또는 `#ffffff`.
- 그림자는 사용하지 않는다.
- 경계선과 radius로만 구획한다.
- 카드 radius는 `18px` 안팎. 과하게 둥근 32px+ 카드 금지.

### Tabs

- 탭 그룹은 옅은 회색 pill container.
- 활성 탭만 검정 배경/흰 글자.
- `aria-pressed`로 현재 상태를 함께 전달한다.

### Selection Cards

- 선택 전: 흰 배경 + 옅은 경계선.
- 선택 후: `#f2f2f2` 배경 + 검정 경계선 + 체크 표시.
- 색상만으로 선택 상태를 전달하지 않는다.

### Result

- 결과 첫 화면은 요약 카드 3개가 우선이다.
- “내 기준 / 오늘 바로 하기 / 피하면 좋은 것”의 정보 레벨을 회색 면과 검정 emphasis 카드로 구분한다.
- 지도/쇼핑 링크는 검정 텍스트와 옅은 회색 pill로 처리한다.

### Result Visuals

v0.2.4부터 결과 화면은 텍스트 추천만 나열하지 않고, 모든 추천 항목에 compact photo reference를 함께 둔다.

- 사진은 추천의 "증거"가 아니라 사용자가 실루엣·색감·무드를 빠르게 이해하기 위한 레퍼런스다.
- 첫 화면 요약에는 작은 이미지 스트립을 두고, 탭별 추천 카드에는 1장의 대표 이미지를 둔다.
- 이미지를 탭하면 바텀시트 갤러리로 열어 같은 추천의 참고 이미지를 크게 볼 수 있다.
- 결과 화면의 핵심은 여전히 추천 문장과 CTA다. 이미지는 카드 안에서 높이를 제한하고, 텍스트 위계를 압도하지 않는다.
- 외부 이미지가 실패해도 추천 텍스트와 CTA는 그대로 읽혀야 한다.

### Recommendation Target

v0.2.5부터 결과는 `여성 기준 / 남성 기준 / 상관없음` 추천 기준을 반영한다.

- 성별을 사용자의 정체성으로 단정하지 않고, 추천 문구·상품군·관리 기준을 맞추는 **추천 기준**으로 다룬다.
- 직접 선택 첫 단계에서 닉네임 아래에 추천 기준을 노출하되, 기본값은 `상관없음`으로 둬서 진행을 막지 않는다.
- 사진 분석은 이미지에서 성별을 추정하지 않는다. 분석 검토 화면에서 사용자가 원하는 추천 기준을 직접 확정한다.
- 여성 기준은 기존 메이크업·헤어·의상 중심 결과를 유지한다.
- 남성 기준은 헤어 실루엣, 그루밍, 핏, 손 관리, 남성 스타일 이미지 레퍼런스로 결과 언어를 바꾼다.
- 상관없음은 젠더리스/뉴트럴 표현을 사용하고, 뷰티와 그루밍 사이에서 부담이 적은 행동으로 안내한다.
- 결과 태그, 요약 카드, 공유 문구, 분석 기준 시트에 추천 기준을 함께 표시해 “왜 이 추천이 나왔는지”를 명확히 한다.

### Mobile Interaction

- 모바일 입력 필드는 iOS 포커스 확대를 막기 위해 항상 16px 이상으로 둔다.
- 포커스 상태는 높이/두께 변화 없이 outline 또는 box-shadow로만 표현한다.
- 하단 토스트와 floating feedback은 `env(safe-area-inset-bottom)`을 고려해 브라우저 툴바와 겹치지 않게 둔다.

### Toast / Feedback

- 토스트는 “저장했어요”, “복사했어요” 같은 짧은 상태 피드백에만 사용한다.
- 긴 설명이나 판단 근거는 토스트가 아니라 카드 내부 안내문으로 제공한다.
- 모바일 토스트는 화면 중앙을 가리지 않고 하단 safe-area 위에 짧게 표시한다.

### Liquid Glass Chrome

v0.2.2부터 chrome(헤더, 하단 floating 내비, 모드 칩, 아이콘/보조 버튼, 바텀시트)은 iOS 26 스타일의 반투명 "Liquid Glass" 표면을 쓴다.

- 표면은 `rgba(255,255,255,0.6~0.82)` tint에 `backdrop-filter: blur(22~30px) saturate(180~200%)`를 더해 뒤 콘텐츠를 흐리게 비춘다. `-webkit-backdrop-filter`를 항상 함께 둔다.
- 경계는 흰 hairline(`rgba(255,255,255,0.7)`)과 상단 inset highlight(`inset 0 1px 0 rgba(255,255,255,0.72)`)로 유리의 specular edge를 만든다.
- glass 가 굴절할 수 있도록 홈 캔버스 배경에 아주 옅은 ambient tint(블루/웜 6~12% alpha)를 깐다. 전체 톤은 여전히 화이트 기반 클린.
- 강조(현재 선택, primary CTA, 중앙 FAB)는 ink 한 색으로 유지하되 상단 gloss highlight만 더한다. glass 위에서 대비를 만드는 anchor 역할.
- glass 토큰은 `styles.css`의 `--glass-*` 변수로 관리한다. literal 값을 새로 흩뿌리지 않는다.
- `backdrop-filter` 미지원 또는 `prefers-reduced-transparency: reduce`에서는 불투명 흰 surface로 폴백해 가독성을 보장한다.

### Bottom Sheets / iOS-like Motion

- 안내, 확인, 공유, 지역 입력처럼 현재 화면 맥락에서 끝나는 작업은 새 화면보다 바텀시트를 우선한다.
- 바텀시트는 grabber, 명확한 닫기 버튼, backdrop 닫기, Esc 닫기를 모두 지원한다.
- iPhone에서는 medium/large detent처럼 콘텐츠 길이에 따라 높이가 달라지고 내부만 스크롤된다.
- 전환은 iOS식 spring 감각을 참고하되, 과한 bounce보다 “살짝 붙는” 물리감만 사용한다.
- `prefers-reduced-motion`에서는 sheet/화면 scale/슬라이드 모션을 거의 즉시 처리한다.

## 5. Do / Don’t

### Do

- 흰 배경과 회색 레이어로 구조를 만든다.
- 검정은 CTA, 선택, 현재 상태에만 집중적으로 사용한다.
- 모바일에서 첫 화면 CTA와 핵심 결과가 바로 보이게 한다.
- 사용자가 모르는 항목을 선택해도 막히지 않게 한다.

### Don’t

- 코랄/붉은 배경을 UI 포인트로 쓰지 않는다.
- 세리프 디스플레이 타입으로 감성 랜딩처럼 보이게 하지 않는다.
- glass는 chrome(헤더/내비/칩/버튼/시트)에만 쓰고, 콘텐츠 가독성을 해치는 진한 색 유리나 과한 그림자·장식 일러스트로 번지지 않게 한다.
- 병원/관공서처럼 차갑고 규정적인 톤으로 가지 않는다.
