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

# Design System: MOI v0.1.7

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

## 5. Do / Don’t

### Do

- 흰 배경과 회색 레이어로 구조를 만든다.
- 검정은 CTA, 선택, 현재 상태에만 집중적으로 사용한다.
- 모바일에서 첫 화면 CTA와 핵심 결과가 바로 보이게 한다.
- 사용자가 모르는 항목을 선택해도 막히지 않게 한다.

### Don’t

- 코랄/붉은 배경을 UI 포인트로 쓰지 않는다.
- 세리프 디스플레이 타입으로 감성 랜딩처럼 보이게 하지 않는다.
- 큰 그림자, 글래스모피즘, 장식용 일러스트를 쓰지 않는다.
- 병원/관공서처럼 차갑고 규정적인 톤으로 가지 않는다.
