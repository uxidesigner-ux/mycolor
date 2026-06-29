# Worklog

## 2026-06-25 KST — 작업 로그 규칙 추가

- 요청: 앞으로 모든 작업 과정을 항상 로그로 남기기.
- 조치:
  - 프로젝트 루트에 `AGENTS.md`를 추가해 Codex 작업 규칙으로 “항상 `WORKLOG.md`에 기록”을 명시.
  - 프로젝트 루트에 `WORKLOG.md`를 추가하고 첫 로그를 기록.
- 파일:
  - `AGENTS.md`
  - `WORKLOG.md`
- 검증:
  - 기존 작업트리는 요청 전 깨끗한 상태였고, 이번 요청으로 위 2개 파일만 새로 추가됨.
- 남은 일:
  - 사용자가 원하면 이 로그 규칙 파일들을 커밋/푸시.

## 2026-06-25 KST — v0.1.1 스플래시 및 버전 표기 추가

- 요청: 모든 작업에 `x.x.x` 버전을 기록하고, 웹앱 진입 시 최소 2초 스플래시 화면을 표시하며 하단에 버전을 표기. 중앙 로고는 임시로 현재 MOI 로고 사용.
- 버전:
  - `0.1.0` → `0.1.1`
- 조치:
  - `package.json` 버전을 `0.1.1`로 업데이트.
  - `config.js`에 `window.MOI_CONFIG.appVersion` 추가.
  - `scripts/build.mjs`가 production `dist/config.js`에 `appVersion`을 항상 주입하도록 변경.
  - `scripts/check-version.mjs`를 추가해 `package.json`과 `config.js` 버전 동기화 및 `x.x.x` 형식을 검사.
  - `index.html`에 스플래시 화면 마크업 추가.
  - `styles.css`에 프리미엄 톤의 스플래시 화면, 로딩 바, 하단 버전 스타일 추가.
  - `app.js`에 최소 2초 유지 후 스플래시를 닫는 로직 추가.
  - `AGENTS.md`에 버전 관리 규칙 추가.
- 파일:
  - `AGENTS.md`
  - `WORKLOG.md`
  - `package.json`
  - `config.js`
  - `scripts/build.mjs`
  - `scripts/check-version.mjs`
  - `index.html`
  - `styles.css`
  - `app.js`
- 검증:
  - `npm run verify` 통과.
  - `scripts/check-version.mjs`에서 `Version verified: 0.1.1` 확인.
  - production `dist/config.js`에 `appVersion: "0.1.1"` 주입 확인.
  - 로컬 브라우저 모바일 viewport에서 진입 즉시 스플래시 표시, 1초 후 유지, 약 2.5초 후 랜딩 전환 및 `v0.1.1` 표기 확인.
- 남은 일:
  - 사용자가 원하면 변경사항 커밋/푸시.

## 2026-06-25 KST — v0.1.1 변경사항 커밋/푸시

- 요청: 현재 스플래시/버전/작업 로그 변경사항을 커밋하고 원격 브랜치에 푸시.
- 버전:
  - `0.1.1`
- 커밋 범위:
  - 스플래시 화면 및 최소 2초 로딩 처리.
  - 앱 버전 단일 기준 및 `x.x.x` 검사.
  - 작업 로그/버전 기록 규칙.
  - 이번 작업 로그.
- 예정 검증:
  - `git diff --check`
  - `npm run verify`
- 커밋/푸시:
  - 대상 브랜치: `codex/photo-style-analysis`
  - 커밋 메시지: `feat: add versioned splash screen`

## 2026-06-25 KST — Impeccable `/critique` 모바일 랜딩 리뷰

- 요청: Impeccable `/critique`로 현재 화면을 시니어 UX 디자이너 관점에서 리뷰. 관점은 mental model, information hierarchy, cognitive load, CTA priority, accessibility, mobile usability.
- 버전:
  - `0.1.1`
- 타깃:
  - 모바일 랜딩 화면 `/`
  - 소스 기준 `index.html`
  - slug `index-html`
- 조치:
  - `PRODUCT.md`, `DESIGN.md`, Impeccable `critique`/`product` reference를 로드.
  - 로컬 dev 서버에서 390×844 모바일 viewport로 스플래시 후 랜딩 화면 관찰.
  - CTA 클릭 후 사진 분석 가이드 진입 화면을 확인해 랜딩 CTA 기대와 다음 단계 일치 여부 점검.
  - Impeccable detector 실행.
  - Codex Browser의 읽기 전용 제약으로 overlay injection preflight가 실패했음을 기록.
  - critique snapshot 저장.
- 주요 결과:
  - Design Health Score: `30/40`.
  - P1 이슈 2개: 첫 화면 mental model 설명 부족, 신뢰 microcopy 가시성/대비 부족.
  - P2 이슈: 첫 viewport에서 proof가 아래로 밀림, numbered editorial marker 반복, focus/작은 텍스트 접근성 보완 필요.
- 검증/증거:
  - `node .agents/skills/impeccable/scripts/detect.mjs --json index.html`
  - detector 결과: dynamic hidden image `broken-image` warning 2건, numbered-section-markers advisory 1건.
  - contrast sample: `#938980` on `#f7f3ed` ≈ `3.10:1`, `#887e75` on `#f7f3ed` ≈ `3.59:1`.
  - snapshot: `.impeccable/critique/2026-06-25T01-06-13Z__index-html.md`
- 남은 일:
  - 사용자가 우선순위를 선택하면 `$impeccable clarify`, `$impeccable audit`, `$impeccable layout`, `$impeccable quieter` 중 적절한 개선 작업으로 이어가기.

## 2026-06-25 KST — v0.1.2 모바일 랜딩 UX 개선

- 요청: 이전 Impeccable critique 제안대로 mental model, 정보 위계, CTA 신뢰도, 접근성, 모바일 사용성을 개선.
- 버전:
  - `0.1.1` → `0.1.2`
- 적용한 Impeccable 흐름:
  - `clarify`: 첫 화면에서 “AI가 제안하고, 내가 확정한다”는 제품 계약을 명확히 표현.
  - `layout`: CTA 주변에 신뢰 정보와 3단계 흐름을 배치해 첫 viewport에서 이해 가능하게 조정.
  - `polish`: focus-visible, 파일 업로드 접근성, detector warning, 모바일 overflow를 정리.
- 조치:
  - 랜딩 hero eyebrow/description을 실제 사용 흐름 중심으로 재작성.
  - CTA 아래 trust row 추가: `30초 안에 완료`, `사진 저장 안 함`, `결과 직접 수정 가능`.
  - hero flow 추가: `사진 선택 → AI 제안 확인 → 내가 확정`.
  - promise strip과 feature card의 `01/02/03` 장식형 숫자를 semantic label로 교체.
  - 분석 화면의 사진 가이드/로딩/리뷰 라벨도 숫자 scaffold 대신 의미 라벨로 정리.
  - dynamic image에 1px placeholder `src`를 추가해 hidden-stage broken image warning 제거.
  - 파일 input의 `hidden` 속성을 제거하고 시각적으로 숨겨 키보드 포커스 가능하게 변경.
  - 전체 interactive element에 `:focus-visible` ring 추가.
  - 핵심 microcopy 대비를 높이기 위해 `--muted-strong` 토큰 추가 및 placeholder 대비 개선.
  - quiz progress bar를 `width` transition에서 `transform: scaleX()` transition으로 변경.
  - 모바일 390px에서 hero visual 장식으로 생기던 horizontal overflow를 정리.
  - `package.json`, `config.js`, `app.js`, splash fallback version을 `0.1.2`로 동기화.
  - `DESIGN.md`의 hero typography max를 `6rem`으로 조정해 Impeccable typography ceiling에 맞춤.
- 파일:
  - `DESIGN.md`
  - `WORKLOG.md`
  - `package.json`
  - `config.js`
  - `app.js`
  - `index.html`
  - `styles.css`
- 검증:
  - `node .agents/skills/impeccable/scripts/critique-storage.mjs latest index-html`로 이전 critique snapshot 확인.
  - `node .agents/skills/impeccable/scripts/detect.mjs --json index.html` 결과 `[]`.
  - `node .agents/skills/impeccable/scripts/detect.mjs --json styles.css`의 warning/error 필터 결과 `[]`.
  - `npm run check` 통과, `Version verified: 0.1.2` 확인.
  - `npm run verify` 통과.
  - 로컬 브라우저 390×844 모바일 viewport 확인:
    - 스플래시 종료 후 trust row와 hero flow가 첫 화면 안에 표시됨.
    - CTA 클릭 시 분석 가이드 화면으로 이동.
    - 파일 input `hidden=false`, `tabIndex=0` 확인.
    - horizontal scroll width `390`으로 viewport와 일치.
- 커밋/푸시:
  - 대상 브랜치: `codex/photo-style-analysis`
  - 예정 커밋 메시지: `feat: clarify mobile landing experience`

## 2026-06-25 KST — v0.1.2 PR 배포 진행 준비

- 요청: 커밋/푸시 후 이어서 진행.
- 버전:
  - `0.1.2`
- 현재 상태 확인:
  - 로컬 작업트리: clean.
  - 현재 브랜치: `codex/photo-style-analysis`.
  - 원격 추적 브랜치: `origin/codex/photo-style-analysis`.
  - PR: `#2 [codex] add photo style analysis flow`.
  - PR 상태: `OPEN`, `Draft`, merge state `CLEAN`.
  - PR 체크: `Product checks / verify` 성공.
- 배포 흐름 확인:
  - `.github/workflows/pages.yml`은 `main` push 시 `npm run verify` 후 `dist`를 GitHub Pages artifact로 배포.
  - `.github/workflows/worker.yml`은 `main` push 시 Worker 관련 파일 변경이 있을 때 Cloudflare Worker 배포.
- 진행 계획:
  - 이번 로그를 커밋/푸시.
  - PR을 Ready 상태로 전환.
  - merge 가능하면 `main`으로 merge.
  - GitHub Pages 배포 실행/결과와 확인 가능한 URL을 최종 보고.
- 검증:
  - `git status -sb`
  - `gh pr view 2 --repo uxidesigner-ux/mycolor --json ...`
  - `.github/workflows/*.yml` 배포 조건 확인.
- 커밋/푸시:
  - 대상 브랜치: `codex/photo-style-analysis`
  - 예정 커밋 메시지: `chore: log deployment continuation`

## 2026-06-25 KST — v0.1.2 PR merge 및 Pages 배포 확인

- 요청: 이어서 진행.
- 버전:
  - `0.1.2`
- 진행:
  - PR `#2 [codex] add photo style analysis flow`를 Draft에서 Ready for review로 전환.
  - PR 체크 `Product checks / verify` 재실행 및 성공 확인.
  - PR `#2`를 `main`으로 merge.
  - merge commit: `93e7a61593eef7ca516238a3d3cc2c4360300290`.
  - GitHub Pages workflow `Deploy MOI to GitHub Pages` 실행 및 성공 확인.
  - production URL 응답 확인:
    - `https://uxidesigner-ux.github.io/mycolor/` → HTTP `200`
    - `https://uxidesigner-ux.github.io/mycolor/config.js` → HTTP `200`
    - `https://uxidesigner-ux.github.io/mycolor/manifest.webmanifest` → HTTP `200`
  - production HTML에서 `v0.1.2` 표기 확인.
  - production `config.js`에서 `appVersion: "0.1.2"` 및 `analysisEndpoint` 확인.
- 발견한 이슈:
  - `Deploy photo analysis Worker` workflow는 실패.
  - 원인: GitHub Actions 환경에 `OPENAI_API_KEY` secret 값이 비어 있어 Cloudflare Wrangler action이 `Value for secret OPENAI_API_KEY not found in environment.`로 중단.
  - 영향: 웹앱/Pages 배포는 정상. 사진 AI 분석 API는 GitHub secret 설정 전까지 production에서 서버 설정 오류가 날 수 있음.
- 검증:
  - `gh pr ready 2 --repo uxidesigner-ux/mycolor`
  - `gh pr merge 2 --repo uxidesigner-ux/mycolor --merge`
  - `gh run list --repo uxidesigner-ux/mycolor --branch main --limit 3`
  - `gh run view 28147715509 --repo uxidesigner-ux/mycolor --json ...`
  - `gh run view 28147715391 --repo uxidesigner-ux/mycolor --log-failed`
  - `curl -L https://uxidesigner-ux.github.io/mycolor/`
- 커밋/푸시:
  - 대상: `main`
  - 예정 커밋 메시지: `chore: log production deployment result`

## 2026-06-25 KST — v0.1.2 Impeccable `/audit`

- 요청: `/audit`.
- 버전:
  - `0.1.2`
- 범위:
  - 현재 `main` 소스와 production URL `https://uxidesigner-ux.github.io/mycolor/`.
  - Impeccable `audit` 기준의 Accessibility, Performance, Theming, Responsive Design, Anti-patterns 점검.
- 조치:
  - Impeccable `audit` 및 `product` reference 확인.
  - `PRODUCT.md`, `DESIGN.md`, `index.html`, `styles.css`, `app.js`, `worker/src/index.js` 점검.
  - production URL, 정적 asset, Worker endpoint HTTP 응답 확인.
  - 로컬 검증과 production 브라우저 확인 실행.
  - 모바일 390×844에서 landing 접근성/대비/touch target 측정.
  - 320×720, 390×844, 768×1024, 1280×800 responsive metrics 측정.
  - 직접 선택 → 퀴즈 → 결과 경로를 production 브라우저에서 확인.
- 검증/증거:
  - `npm run verify` 통과.
  - `node .agents/skills/impeccable/scripts/detect.mjs --json index.html styles.css app.js worker/src/index.js` 실행.
  - production static asset HTTP `200` 확인:
    - `/`, `styles.css`, `app.js`, `config.js`, `icon.svg`.
  - Worker `OPTIONS /analyze` → HTTP `204`.
  - Worker `POST /analyze` → HTTP `503`, message: `분석 서버 설정이 완료되지 않았어요.`
  - 390×844 모바일 landing:
    - `scrollWidth=390`.
    - 직접 선택 경로 정상.
    - console error/warning 없음.
    - 작은 touch target 후보: `MOI 홈` 79×30, `내 스타일` 72×40, `직접 선택할게요` 81×34.
  - 1280×800 desktop:
    - decorative orbit overflow로 `scrollWidth=1306`.
  - GitHub Actions:
    - Pages deploy 최신 run 성공.
    - Worker deploy run 실패 유지, 원인 `OPENAI_API_KEY` secret 미설정.
- 주요 감사 결과:
  - Audit Health Score: `13/20` 수준으로 산정.
  - P0: production 사진 분석 API가 `OPENAI_API_KEY` secret 미설정으로 동작하지 않음.
  - P1: Worker가 유료 OpenAI endpoint 앞단에서 rate limit / abuse protection 없이 설계되어 있음.
  - P2: 작은 touch target, category tab active state의 ARIA 부재, desktop decorative overflow, 디자인 토큰 drift, feTurbulence noise anti-pattern.
- 남은 일:
  - 사용자가 지시하면 P0/P1부터 `$impeccable harden`, `$impeccable adapt`, `$impeccable polish` 순서로 개선.

## 2026-06-25 KST — v0.1.3 도구형 UX 및 결과 요약 개선

- 요청: 홈, 직접 선택 플로우, 사진 분석 준비 중 처리, 결과 화면의 멘탈모델/사용성 개선.
- 버전:
  - `0.1.2` → `0.1.3`
- 작업 중 느려진 원인:
  - 모바일 390px 브라우저 검증에서 스플래시 최소 2초 대기 시간이 반복됨.
  - Codex 내장 브라우저 세션이 중간 중단으로 끊겨 재연결이 필요했음.
  - 이번 범위가 홈 CTA, 직접 선택, 사진 분석 상태, 결과 요약, 지역 입력, 지도/공유 링크까지 이어지는 플로우 검증이어서 단순 정적 수정보다 확인 단계가 많았음.
- 조치:
  - 홈 H1/서브카피를 기능 중심으로 재작성하고, 기본 CTA를 `사진 없이 직접 선택`으로 조정.
  - 사진 분석 endpoint/enable flag가 준비되지 않은 production 상태에서는 사진 CTA를 `사진 분석 준비 중` 베타 상태로 표시하고, 클릭 시 에러 화면 대신 안내 토스트를 표시.
  - `MOI_PHOTO_ANALYSIS_ENABLED` 배포 변수를 추가해 사진 분석 활성화 여부를 endpoint와 별도로 제어.
  - 직접 선택 1단계에서 활동 지역 입력을 제거하고 닉네임만 필수로 변경.
  - 얼굴형/퍼스널컬러에 `잘 모르겠어요` 선택지를 추가하고, 결과에서는 범용 얼굴형 추천/뉴트럴 팔레트로 자연스럽게 처리.
  - 퍼스널컬러 도움말을 기본 노출 아코디언 형태로 강화.
  - 결과 상단에 `내 기준`, `오늘 바로 하기`, `피하면 좋은 것` 3개 요약 카드를 추가.
  - 결과 태그의 라벨/대비를 강화하고, 탭 `aria-pressed` 상태를 갱신하도록 개선.
  - 주변 숍 지도 링크는 지역이 없으면 결과 화면의 `활동 지역 설정` 카드로 포커스 이동 후 입력받도록 변경.
  - 지역 입력 후 네이버 지도 검색 링크가 지역 기준으로 열리도록 검증.
  - Web Share 실패 시 클립보드 복사를 우선 시도하도록 공유 fallback을 보강.
- 파일:
  - `.github/workflows/pages.yml`
  - `WORKLOG.md`
  - `app.js`
  - `config.js`
  - `index.html`
  - `package.json`
  - `scripts/build.mjs`
  - `styles.css`
- 검증:
  - `npm run check` 통과, `Version verified: 0.1.3` 확인.
  - `npm run build` 통과, production config에서 `Photo analysis enabled: no` 확인.
  - `npm run verify` 통과.
  - `git diff --check` 통과.
  - 모바일 390×844 로컬 preview:
    - 홈 CTA가 첫 화면 안에 표시됨.
    - 사진 CTA 클릭 시 분석/에러 화면으로 빠지지 않고 안내 토스트 표시.
    - 직접 선택 → 닉네임 → 얼굴형 모름 → 퍼스널컬러 모름 → 무드 선택 → 결과 도달.
    - 결과 첫 진입에서 요약 카드 3개 표시.
    - 지역 없이 결과 생성 가능.
    - 지도 버튼 클릭 시 지역 입력 카드로 포커스 이동 및 안내 토스트 표시.
    - 지역 저장 후 네이버 지도 검색 URL 열림.
    - 저장된 결과 `#result` 재진입 시 유지.
    - 탭 전환 시 `aria-pressed`와 콘텐츠 갱신 확인.
    - 네이버 쇼핑 링크 href 유지 확인.
  - Impeccable detector 실행:
    - 빌드/기능 차단 이슈는 없음.
    - 기존 CSS literal 색상/반경 및 이번 선택 상태 색상에 대한 design-system advisory 다수 확인.
- 남은 일:
  - 사진 분석을 실제 production에서 켜려면 GitHub Actions 변수 `MOI_PHOTO_ANALYSIS_ENABLED=true`와 Worker `OPENAI_API_KEY` secret 설정이 필요.
  - 디자인 토큰 정합성을 더 엄격하게 맞추려면 `DESIGN.md` 팔레트/반경 스케일 업데이트 또는 CSS tokenization 후속 작업 권장.

## 2026-06-25 KST — v0.1.4 화이트/그레이 기반 UI 리디자인

- 요청: 현재 UI가 날카롭고 붉으스레해 무겁게 느껴지므로, 화해 스타일을 참고해 전체를 화이트와 옅은 그레이톤으로 바꾸고 포인트만 블랙에 가깝게 처리.
- 버전:
  - `0.1.3` → `0.1.4`
- 레퍼런스 확인:
  - `https://www.hwahae.co.kr/` 메인 구조 확인.
  - 공개 CSS에서 반복되는 색상 축 확인: `#fff`, `#fafafa`, `#f7f7f7`, `#f2f2f2`, `#e8e8e8`, `#d8d8d8`, `#111`, `#666`, `#999`.
- 조치:
  - `package.json`, `config.js`, `app.js`, 스플래시 표기를 `0.1.4`로 동기화.
  - `DESIGN.md`를 v0.1.4 디자인 시스템으로 재작성.
  - 전역 토큰을 화이트/쿨그레이/블랙 중심으로 변경.
  - UI 폰트를 산세리프 중심으로 통일하고 세리프/이탤릭 장식 사용을 제거.
  - 기존 코랄/크림/따뜻한 종이톤을 UI chrome에서 제거.
  - CTA, 선택 상태, 활성 탭, 강조 결과 카드만 `#111111` 중심으로 처리.
  - 카드/탭/입력/추천/결과/사진 분석 화면을 그림자 없는 옅은 회색 surface와 얇은 border 중심으로 재스킨.
  - 기존 장식 오브젝트, orbit, portrait art, floating note, warm illustration을 숨김 처리해 화면을 가볍게 정리.
  - 앱 아이콘과 manifest theme/background color를 화이트/블랙 톤으로 변경.
  - 로컬 데모 사진 캔버스 기본색도 회색톤으로 정리.
- 파일:
  - `DESIGN.md`
  - `WORKLOG.md`
  - `app.js`
  - `config.js`
  - `icon.svg`
  - `index.html`
  - `manifest.webmanifest`
  - `package.json`
  - `styles.css`
- 검증:
  - `npm run check` 통과, `Version verified: 0.1.4` 확인.
  - `npm run build` 통과.
  - `npm run verify` 통과.
  - `git diff --check` 통과.
  - 모바일 390×844 로컬 preview 확인:
    - body background `rgb(255,255,255)`.
    - hero card background `rgb(250,250,250)`.
    - primary CTA background `rgb(17,17,17)`.
    - CTA 첫 화면 노출 및 `scrollWidth=390`.
    - 직접 선택 → 모름 선택 → 결과 생성 정상.
    - 결과 summary/result hero background `rgb(250,250,250)`.
    - 강조 카드/활성 탭 background `rgb(17,17,17)`.
  - 브라우저 console error/warning 없음.
  - Impeccable detector:
    - 빌드 차단 이슈는 없음.
    - 기존 CSS fallback에 남은 레거시 색상/반경 literal 때문에 design-system advisory가 다수 남음. 실제 화면은 v0.1.4 cascade가 우선 적용됨.
- 남은 일:
  - detector advisory까지 줄이려면 `styles.css`를 override 방식이 아니라 레거시 규칙 제거/토큰 치환 방식으로 한 번 더 정리하는 후속 작업 권장.

## 2026-06-25 KST — v0.1.4 UI 리디자인 커밋/푸시

- 요청: v0.1.4 화이트/그레이 UI 리디자인 작업을 커밋하고 원격 `main` 브랜치에 푸시.
- 버전:
  - `0.1.4`
- 커밋 범위:
  - 화이트/그레이/블랙 중심 UI 리디자인.
  - v0.1.4 버전 동기화.
  - 디자인 시스템 문서 갱신.
  - 앱 아이콘/manifest/splash 톤 변경.
  - 이번 작업 로그.
- 예정 검증:
  - `npm run verify`
  - `git diff --check`
- 커밋/푸시:
  - 대상 브랜치: `main`
  - 예정 커밋 메시지: `style: refresh monochrome product UI`

## 2026-06-25 KST — v0.1.5 사진 분석 실사용 연결

- 요청: 사진을 등록하면 AI가 분석해서 기존 결과처럼 맞춤형 제안을 만들 수 있게 기능 구현.
- 버전:
  - `0.1.4` → `0.1.5`
- 조치:
  - Worker 기본 모델을 `gpt-5.4-mini`로 조정하고 OpenAI Responses API 이미지 입력 + Structured Outputs 계약을 유지.
  - Worker schema의 얼굴형/퍼스널컬러 불확실 값을 앱과 같은 `unknown`으로 맞추고, 기존 `uncertain` 응답도 `unknown`으로 fallback되게 정규화.
  - Worker에 Cloudflare Rate Limiting binding `ANALYSIS_RATE_LIMITER`를 추가해 익명 client id 기준 1분 20회 제한을 적용.
  - 앱에서 사진 분석 요청 시 localStorage 기반 익명 client id를 함께 보내도록 변경.
  - 사진 분석 결과가 불확실하거나 누락돼도 리뷰 화면에서 `잘 모르겠어요/뉴트럴` 선택으로 막히지 않게 처리.
  - 기본 `config.js`는 사진 분석 OFF로 안전화하고, 로컬 `npm run dev:photo`에서만 mock 분석을 켜도록 dev server가 `/config.js`를 동적 제공.
  - production build는 `MOI_ANALYSIS_ENDPOINT`가 있으면 사진 분석 CTA를 자동 활성화하고, `MOI_PHOTO_ANALYSIS_ENABLED=false`로만 명시 비활성화 가능하게 변경.
  - README의 사진 분석/배포/현재 기능 설명을 실제 구현 상태에 맞게 갱신.
  - 디자인 문서와 CSS 주석 버전을 v0.1.5로 갱신.
- 파일:
  - `DESIGN.md`
  - `README.md`
  - `WORKLOG.md`
  - `app.js`
  - `config.js`
  - `index.html`
  - `package.json`
  - `scripts/build.mjs`
  - `scripts/serve.mjs`
  - `scripts/test-worker.mjs`
  - `styles.css`
  - `worker/src/index.js`
  - `worker/wrangler.jsonc`
- 검증:
  - `npm run check` 통과, `Version verified: 0.1.5` 확인.
  - `npm run test:worker` 통과.
  - `npm run build` 통과.
  - `npm run verify` 통과.
  - `MOI_ANALYSIS_ENDPOINT='https://example.workers.dev/analyze' npm run build`에서 endpoint 주입 및 `photoAnalysisEnabled: true` 확인.
  - `npm run dev:photo`에서 동적 `/config.js`가 `/api/analyze`, `photoAnalysisEnabled: true`, `demoMode: true`, `appVersion: 0.1.5` 반환 확인.
  - `npm run dev:photo` mock `/api/analyze` POST 응답 확인.
  - `npx wrangler@4 deploy --config worker/wrangler.jsonc --dry-run` 통과, `ANALYSIS_RATE_LIMITER (20 requests/60s)` binding 인식 확인.
  - `git diff --check` 통과.
  - 원격 저장소 변수 확인: `MOI_ANALYSIS_ENDPOINT=https://moi-style-analysis.uxidesigner-mycolor.workers.dev/analyze` 등록됨.
  - 실제 Worker `OPTIONS /analyze`는 204 및 CORS 정상.
  - 실제 Worker `POST /analyze`는 503 `분석 서버 설정이 완료되지 않았어요.` 반환.
- 남은 일:
  - 현재 로컬/저장소 secret 조회 결과 `OPENAI_API_KEY`, `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`가 없어 실제 OpenAI 분석 호출은 아직 켤 수 없음.
  - GitHub Actions secrets 또는 Cloudflare Worker secret에 `OPENAI_API_KEY`를 등록한 뒤 Worker를 재배포하면 실제 사진 분석이 동작할 준비가 됨.
  - 커밋/푸시 결과는 아래 `v0.1.5 사진 분석 기능 커밋/푸시` 로그에서 이어서 기록.

## 2026-06-25 KST — v0.1.5 사진 분석 기능 커밋/푸시

- 요청: v0.1.5 사진 분석 기능 변경사항을 커밋하고 원격 저장소에 푸시.
- 버전:
  - `0.1.5`
- 커밋 범위:
  - OpenAI Responses API 기반 사진 분석 Worker 보강.
  - Cloudflare Rate Limiting binding 추가.
  - 앱 사진 분석 요청/결과 fallback 연결.
  - production endpoint 주입 시 사진 분석 자동 활성화.
  - 로컬 `dev:photo` mock 분석 설정 정리.
  - README, 디자인 문서, 작업 로그 갱신.
- 검증:
  - `npm run verify` 통과.
  - `git diff --check` 통과.
- 커밋/푸시:
  - 대상 브랜치: `main`
  - 예정 커밋 메시지: `feat: enable photo style analysis`

## 2026-06-25 KST — OpenAI API key 위치 안내

- 요청: `OPENAI_API_KEY` secret 등록에 필요한 키가 어디 있는지 확인.
- 버전:
  - `0.1.5`
- 조치:
  - 이전에 열어둔 `gh secret set OPENAI_API_KEY` 대기 프롬프트를 종료해 잘못된 입력을 방지.
  - OpenAI 공식 quickstart 기준으로 API key 생성 위치를 확인.
- 안내:
  - OpenAI Platform의 API keys 화면에서 새 secret key를 생성해야 함.
  - ChatGPT Plus/Pro 구독과 OpenAI API key/billing은 별도임.
  - key는 채팅에 붙여넣지 말고 GitHub CLI secret 입력 프롬프트나 GitHub Secrets UI에 직접 등록해야 함.
- 검증:
  - secret 값은 조회/기록하지 않음.

## 2026-06-25 KST — 모바일 secret 입력 방식 안내

- 요청: 모바일 환경이라 `gh secret set` 터미널 프롬프트에 OpenAI API key를 입력할 수 없음.
- 버전:
  - `0.1.5`
- 조치:
  - 대기 중이던 `gh secret set OPENAI_API_KEY` 프롬프트를 종료.
  - 모바일에서는 GitHub 웹 UI의 Actions secrets 화면에서 직접 등록하는 방식으로 안내.
- 안내:
  - Secret name: `OPENAI_API_KEY`
  - Secret value: 사용자가 OpenAI Platform에서 생성한 API key
  - 등록 후 Worker workflow 재실행 필요.
- 검증:
  - secret 값은 채팅/로그에 입력하거나 기록하지 않음.

## 2026-06-25 KST — Worker 재배포 실패 원인 확인

- 요청: 사용자가 `OPENAI_API_KEY`를 GitHub Actions secret에 등록했다고 알려 Worker 재배포 진행.
- 버전:
  - `0.1.5`
- 조치:
  - `gh secret list --repo uxidesigner-ux/mycolor`로 `OPENAI_API_KEY` 등록 이름만 확인.
  - `gh workflow run worker.yml --repo uxidesigner-ux/mycolor --ref main`으로 Worker 배포 workflow 실행.
  - 실행 run `28171607167` 상태 확인.
- 결과:
  - `OPENAI_API_KEY`는 등록됨.
  - Worker workflow는 실패.
  - 실패 원인: 비대화형 GitHub Actions 환경에서 Wrangler가 `CLOUDFLARE_API_TOKEN` 환경 변수를 찾지 못함.
  - 현재 repo secrets 목록에는 `OPENAI_API_KEY`만 표시됨.
- 남은 일:
  - GitHub Actions secrets에 `CLOUDFLARE_API_TOKEN`과 `CLOUDFLARE_ACCOUNT_ID`를 추가 등록해야 Worker 배포 재시도 가능.
  - secret 값은 조회/기록하지 않음.

## 2026-06-25 KST — v0.1.6 Cloudflare secret 등록 및 Worker schema 수정

- 요청: Cloudflare API token/Account ID 생성 방법을 모르겠으니 대신 처리.
- 버전:
  - `0.1.5` → `0.1.6`
- 조치:
  - 로컬 Wrangler 로그인 상태 확인: `uxidesigner@gmail.com` 계정 OAuth 로그인 및 Account ID 조회 가능.
  - Cloudflare 문서 확인 결과, 완전한 장기 API token 자동 생성은 Dashboard에서 초기 token 생성 권한이 필요함.
  - 현재 로그인된 Wrangler OAuth token이 `CLOUDFLARE_API_TOKEN` 환경 변수로 동작하는지 테스트.
  - 임시 해결로 GitHub Actions secrets에 `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` 등록.
  - Worker workflow `28172341205` 실행 및 성공 확인.
  - 실제 Worker 호출 시 기존 503은 해소됐으나 OpenAI 400으로 502 응답 발생.
  - 원인 추정: Structured Outputs strict schema subset에서 `minimum`, `maximum`, `maxItems` 제약이 거부됨.
  - Worker JSON Schema에서 해당 제약을 제거하고, Worker 후처리에서 점수 clamp 및 evidence 길이 제한을 수행하도록 변경.
  - 테스트에 schema subset 보호 assertion 추가.
  - 앱/설정/스플래시/디자인 문서 버전을 `0.1.6`으로 동기화.
- 파일:
  - `DESIGN.md`
  - `WORKLOG.md`
  - `app.js`
  - `config.js`
  - `index.html`
  - `package.json`
  - `scripts/test-worker.mjs`
  - `styles.css`
  - `worker/src/index.js`
- 검증:
  - `npm run verify` 통과, `Version verified: 0.1.6` 확인.
  - `git diff --check` 통과.
- 남은 일:
  - v0.1.6 커밋/푸시 후 Pages/Worker 재배포 및 실제 `/analyze` 재검증 필요.
  - 현재 등록한 Cloudflare token은 로컬 OAuth 기반 임시 성격이므로, 장기 운영에는 Dashboard에서 전용 `Edit Cloudflare Workers` API token으로 교체 권장.
  - secret 값은 조회/기록하지 않음.

## 2026-06-25 KST — v0.1.7 OpenAI quota 상태 처리

- 요청 흐름: Cloudflare secrets 등록 및 Worker 재배포 후 실제 사진 분석 동작 확인.
- 버전:
  - `0.1.6` → `0.1.7`
- 확인 결과:
  - Pages/Worker 배포는 성공.
  - 실제 Worker는 `OPENAI_API_KEY`를 받아 OpenAI API까지 호출함.
  - 더미 PNG 테스트는 OpenAI `invalid_value`로 거부됨.
  - 유효한 JPG 테스트에서 OpenAI `insufficient_quota` 응답 확인.
  - 결론: Cloudflare/Worker/API key 연결은 완료됐고, 남은 차단 조건은 OpenAI 계정의 API billing/credit/quota 설정.
- 조치:
  - Worker가 `insufficient_quota`를 일반 rate limit으로 오해하지 않고 “OpenAI 사용량 설정 필요” 메시지로 반환하도록 수정.
  - 유효하지 않은 이미지 데이터는 400과 “사진 파일을 읽지 못했어요” 메시지로 반환하도록 수정.
  - Worker contract test에 `insufficient_quota` 매핑 검증 추가.
  - 앱/설정/스플래시/디자인 문서 버전을 `0.1.7`로 동기화.
- 파일:
  - `DESIGN.md`
  - `WORKLOG.md`
  - `app.js`
  - `config.js`
  - `index.html`
  - `package.json`
  - `scripts/test-worker.mjs`
  - `styles.css`
  - `worker/src/index.js`
- 검증:
  - `npm run verify` 통과, `Version verified: 0.1.7` 확인.
  - `git diff --check` 통과.
- 남은 일:
  - OpenAI Platform Billing에서 API credits/결제 한도 설정 후 실제 얼굴 사진으로 `/analyze` 재검증 필요.

## 2026-06-25 KST — v0.1.7 배포 및 실제 Worker 상태 확인

- 요청 흐름: Cloudflare secret 등록 후 사진 분석 가능 상태까지 점검.
- 버전:
  - `0.1.7`
- 커밋/푸시:
  - `cdc37b7 fix: align photo analysis schema`
  - `4da3e8a chore: log photo analysis api errors`
  - `32bb567 fix: handle photo analysis quota errors`
- 배포 결과:
  - Worker workflow `28172545152` 성공.
  - Worker workflow `28172689853` 성공.
  - Worker workflow `28172950237` 성공.
  - Pages workflow `28172950123` 성공.
- 실제 확인:
  - 공개 config: `appVersion: "0.1.7"`, `photoAnalysisEnabled: true`, endpoint 설정 확인.
  - Worker `/analyze`는 더 이상 `OPENAI_API_KEY` 미설정 503을 반환하지 않음.
  - 유효한 JPG 요청에서 OpenAI `insufficient_quota`를 확인했고, Worker가 503과 “OpenAI 사용량 설정 필요” 메시지를 반환함.
- 남은 일:
  - OpenAI Platform에서 API billing/credit/quota를 활성화해야 실제 AI 분석 완료 응답을 받을 수 있음.
  - 장기 운영 전 Cloudflare GitHub secret의 임시 OAuth token을 전용 `Edit Cloudflare Workers` API token으로 교체 권장.

## 2026-06-25 KST — 모바일 UI 디테일 개선 제안 점검

- 요청 흐름: 모바일 결과 화면에서 토스트가 어색하고, 인풋 포커스 시 화면이 확대되는 문제 제보. 구현 전 전체 UI 디테일 제안 요청.
- 버전:
  - 현재 앱 버전 `0.1.7`, 제안 단계라 버전 변경 없음.
- 확인한 내용:
  - 첨부 모바일 스크린샷 기준으로 토스트가 긴 안내문을 담으면서 결과 콘텐츠와 브라우저 하단 툴바를 가림.
  - `styles.css`에서 지역 입력 필드가 `font-size: 14px`로 지정되어 iOS 포커스 자동 확대 가능성이 큼.
  - 토스트, 입력 필드, safe-area, 카드 라운드/색상 값에서 디자인 시스템 토큰과 다른 값들이 남아 있어 화면별 감각이 흔들림.
  - Impeccable product register와 `PRODUCT.md`/`DESIGN.md` 기준으로 모바일 제품 UI 관점의 개선 우선순위를 정리함.
- 실행:
  - `rg`로 toast/input/focus/result/safe-area 관련 코드 위치 확인.
  - Impeccable context 로드.
  - `node /Users/nike/.agents/skills/impeccable/scripts/detect.mjs --json index.html app.js styles.css` 실행.
- 결과:
  - 기능 오류보다는 디자인 시스템 drift advisory가 다수 확인됨.
  - 다음 작업 후보: `v0.1.8` 모바일 interaction polish로 toast 재설계, iOS input zoom 방지, bottom safe-area 보정, 모바일 카드/CTA 리듬 정리.

## 2026-06-25 KST — v0.1.8 모바일 interaction polish 구현

- 요청 흐름: 제안한 모바일 UI 디테일 개선안을 실제 구현.
- 버전:
  - `0.1.7` → `0.1.8`
- 조치:
  - 토스트를 긴 설명용 말풍선에서 짧은 상태 피드백용 스낵바로 정리.
  - 긴 분석 요약을 토스트에 그대로 노출하지 않고 “추천 기준을 확인했어요.”처럼 짧은 피드백으로 변경.
  - 모바일 토스트 위치를 `env(safe-area-inset-bottom)` 기반으로 보정하고, 하단 브라우저 툴바와 겹치지 않도록 92px 여유를 둠.
  - iOS 입력 포커스 확대 방지를 위해 `input`, `textarea`, `select` 기본 폰트 크기와 지역 입력 필드를 16px 이상으로 통일.
  - 입력 포커스 상태는 크기 변화 없이 border/background/box-shadow만 변경되도록 정리.
  - 모바일 hover transform을 비활성화해 터치 환경에서 불필요한 흔들림을 줄임.
  - 홈 기본 CTA가 `manual-start-button` 스타일에 덮여 검정 배경 위 검정 텍스트처럼 보이는 문제를 수정.
  - 결과 화면의 영문 키커 일부를 한국어 우선 문구로 정리.
  - `DESIGN.md`에 모바일 입력/토스트/safe-area 피드백 원칙 추가.
- 파일:
  - `DESIGN.md`
  - `WORKLOG.md`
  - `app.js`
  - `config.js`
  - `index.html`
  - `package.json`
  - `styles.css`
- 검증:
  - `npm run verify` 통과, `Version verified: 0.1.8` 확인.
  - `git diff --check` 통과.
  - 로컬 preview `http://localhost:4173`에서 HTTP 200 확인.
  - 모바일 390px Playwright/Chrome 계산값 확인:
    - 홈 CTA 텍스트: 흰색 / 배경 검정 정상.
    - 결과 화면 활성 상태 정상.
    - 토스트 문구: “추천 기준을 확인했어요.”
    - 토스트 하단 여유: 92px.
    - 토스트 radius: 14px, shadow 없음.
    - 지역 입력 font-size: 16px, height: 52px.
- 참고:
  - Impeccable detector는 기존 CSS literal color/radius drift 81건을 advisory로 계속 보고함. 대부분 과거 스타일 잔재 및 추천 컬러 팔레트 관련 값이며, 별도 디자인 토큰 정리 작업으로 분리하는 것이 좋음.

## 2026-06-26 KST — v0.1.9 바텀시트 중심 iOS-like 인터랙션 구현

- 요청 흐름: `v0.1.8` 커밋/푸시 후, 바텀시트를 최대한 활용하고 iOS 전환/탄성 애니메이션을 참고해 인터랙션 개선.
- 버전:
  - `0.1.8` → `0.1.9`
- 선행 작업:
  - `v0.1.8` 변경분 커밋/푸시 완료.
  - 커밋: `7748873 fix: polish mobile interaction details`
- 참고한 원칙:
  - Apple HIG Sheets: 현재 맥락과 가까운 scoped task는 sheet가 적합함.
  - Apple UIKit sheet detent 개념: medium/large 높이와 grabber, drag-dismiss, progressive disclosure를 참고.
  - Apple motion/spring 가이드: 연속성과 물리감은 주되 과한 bounce는 피하고 부드러운 감속을 사용.
- 조치:
  - 공통 bottom sheet 컴포넌트 추가.
  - sheet backdrop, grabber, 닫기 버튼, Esc 닫기, drag-down 닫기 지원.
  - sheet open 시 배경 화면이 살짝 scale-down 되어 iOS식 depth를 느끼도록 처리.
  - 사진 분석 준비 중 안내를 토스트에서 바텀시트로 변경.
  - 퍼스널컬러 힌트를 inline toggle 대신 바텀시트로 제공.
  - 결과의 “분석 기준 보기”를 바텀시트로 제공하고, 사진 분석 근거가 있으면 큰 sheet로 표시.
  - 프로필 수정 액션을 바텀시트 선택지로 변경.
  - 주변 숍 지도 링크 클릭 시 지역이 없으면 바텀시트에서 지역 입력 후 지도 열기로 연결.
  - 결과 공유를 바텀시트로 변경하고, 네이티브 공유/링크 복사 액션을 제공.
  - sheet 내부 입력 필드도 16px 이상으로 유지해 iOS 포커스 확대를 방지.
  - `prefers-reduced-motion`에서 scale/slide 모션을 비활성화.
- 파일:
  - `DESIGN.md`
  - `WORKLOG.md`
  - `app.js`
  - `config.js`
  - `index.html`
  - `package.json`
  - `styles.css`
- 검증:
  - `npm run verify` 통과, `Version verified: 0.1.9` 확인.
  - `git diff --check` 통과.
  - Impeccable detector: bounce warning 0건 확인. 기존 literal color/radius drift 81건은 별도 토큰 정리 대상으로 유지.
  - 로컬 preview 모바일 390px 확인:
    - 사진 분석 준비 중 sheet open 정상.
    - 결과 공유 sheet open 정상.
    - 주변 숍 지역 입력 sheet open 정상.
    - sheet 지역 입력 font-size 16px, height 54px 확인.
    - sheet open 시 body scale 상태 확인.

## 2026-06-26 KST — v0.2.0 기능 실행 중심 홈 개편

- 요청 흐름: 기존 홈 화면은 보관하고, 스플래시 후 첫 화면을 “이미 알고 들어온 사용자” 기준의 즉시 실행 화면으로 개선.
- 버전:
  - `0.1.9` → `0.2.0`
- 보관:
  - 기존 설명형 홈의 복구 기준을 `archive/home-v0.1.9.md`에 기록.
  - 원본 홈은 커밋 `c00b158 feat: add bottom sheet interactions`의 `index.html` / `styles.css`에서 복구 가능.
- 조치:
  - 홈에서 설명형 hero, 결과 미리보기, promise strip, feature card 섹션을 제거.
  - 모바일 첫 화면은 큰 `사진 등록` 카드가 중심이 되도록 변경.
  - 사진 등록 카드 클릭 시 production/photo-enabled 상태에서는 바로 `#analysis`로 이동하며 파일 선택 창을 열도록 연결.
  - `사진 없이 직접 선택`, `저장된 스타일 보기`는 보조 액션 영역으로 이동.
  - 모바일에서는 좌측 설명을 숨기고 기능 실행 화면만 노출.
  - 데스크톱에서는 좌측에 서비스 요약만 간단히 두고, 우측에 모바일 시작 화면을 그대로 표시.
  - 저장된 스타일 헤더 버튼은 모바일 홈 집중도를 위해 숨기고, 홈 내부 보조 액션으로만 노출.
  - 새 홈 스타일의 과한 radius/letter-spacing을 디자인 토큰 기준으로 조정.
  - `DESIGN.md`에 Functional Home 원칙 추가.
- 파일:
  - `DESIGN.md`
  - `WORKLOG.md`
  - `app.js`
  - `archive/home-v0.1.9.md`
  - `config.js`
  - `index.html`
  - `package.json`
  - `styles.css`
- 검증:
  - `npm run verify` 통과, `Version verified: 0.2.0` 확인.
  - `git diff --check` 통과.
  - `npm run dev:photo` 로컬 mock photo-enabled 상태에서 모바일 390px / 데스크톱 1280px 캡처 확인.
  - 모바일 390px 확인:
    - `사진 등록` 카드가 첫 화면 중심.
    - 좌측 설명 영역 `display: none`.
    - 큰 사진 등록 카드 클릭 시 file chooser open 확인.
    - 클릭 후 `#analysis` 이동 및 analysis guide 활성화 확인.
  - 데스크톱 1280px 확인:
    - 좌측 서비스 요약 노출.
    - 우측 모바일 시작 화면 430px 폭으로 노출.
  - Impeccable detector: 기존 literal color/radius drift 81건 유지. 새 홈으로 인한 추가 drift는 제거.

## 2026-06-26 KST — v0.2.0 Cloudflare CI token 재등록 점검

- 요청 흐름: 이전에 임시 연결이라고 표시했던 Cloudflare GitHub Actions token을 다시 점검하고 장기 운영용 token 교체를 진행.
- 버전:
  - `0.2.0` 유지. 제품 코드 변경 없이 인증/배포 연결 상태만 점검.
- 확인:
  - 로컬 Wrangler 로그인 상태는 `uxidesigner@gmail.com` Cloudflare 계정 OAuth로 유지됨.
  - Cloudflare Worker `moi-style-analysis` 존재 확인.
  - Worker secret 목록에 `OPENAI_API_KEY` 등록 확인. secret 값은 조회/기록하지 않음.
  - GitHub Actions secrets 이름 `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`, `OPENAI_API_KEY` 존재 확인. secret 값은 조회/기록하지 않음.
  - Repository variable `MOI_ANALYSIS_ENDPOINT=https://moi-style-analysis.uxidesigner-mycolor.workers.dev/analyze` 유지 확인.
- 조치:
  - Cloudflare API token 자동 생성을 시도하기 전 권한 확인.
  - 현재 Cloudflare API 실행 권한으로는 token permission group 접근이 `Unauthorized to access requested resource`로 차단됨.
  - Cloudflare Dashboard `https://dash.cloudflare.com/profile/api-tokens`를 인앱 브라우저에 열었으나 로그인 화면에서 사용자 인증 필요.
  - 기존 GitHub Actions `CLOUDFLARE_API_TOKEN`의 유효성을 확인하기 위해 Worker workflow를 수동 실행.
- 검증:
  - Worker workflow run `28209221230` 실행.
  - 결과: 실패.
  - 실패 지점: `Deploy Worker and OpenAI secret` 단계의 `wrangler secret bulk`.
  - 실패 원인: Cloudflare API 인증 실패.
    - `Authentication error [code: 10000]`
    - `Invalid access token [code: 9109]`
- 결론:
  - 기존 GitHub Actions의 `CLOUDFLARE_API_TOKEN`은 더 이상 유효하지 않음.
  - 장기 운영용 전용 Cloudflare API token을 Dashboard에서 새로 생성한 뒤 GitHub secret `CLOUDFLARE_API_TOKEN`으로 교체해야 함.
- 다음 단계:
  - Cloudflare Dashboard 로그인.
  - `Edit Cloudflare Workers` 템플릿 또는 동등 권한의 custom token 생성.
  - 생성된 token secret을 GitHub Actions secret `CLOUDFLARE_API_TOKEN`에 재등록.
  - Worker workflow 재실행 및 성공 확인.

## 2026-06-26 KST — v0.2.0 Cloudflare CI token 교체 완료

- 요청 흐름: 사용자가 Cloudflare Dashboard에서 새 API token을 생성하고 복사 완료를 알림.
- 버전:
  - `0.2.0` 유지. 제품 코드 변경 없이 Cloudflare/GitHub Actions 인증 연결만 교체.
- 보안 처리:
  - Cloudflare token 값은 채팅/로그/터미널 출력에 기록하지 않음.
  - 클립보드에서 읽은 token은 Cloudflare `/user/tokens/verify`로 active 상태만 확인.
  - GitHub secret 등록 후 시스템 클립보드를 비움.
  - 인앱 브라우저 URL의 token query를 제거하고 `https://dash.cloudflare.com/profile/api-tokens`로 정리.
- 조치:
  - 새 token 검증 성공:
    - `success: true`
    - `status: active`
  - GitHub Actions secret `CLOUDFLARE_API_TOKEN` 교체.
  - secret 목록에서 `CLOUDFLARE_API_TOKEN` 갱신 시각이 `2026-06-26T00:34:50Z`로 바뀐 것 확인.
  - Worker workflow 수동 실행.
- 검증:
  - Worker workflow run `28209452088` 성공.
  - `Deploy Worker and OpenAI secret` 단계 성공.
  - Worker CORS preflight 확인:
    - `OPTIONS https://moi-style-analysis.uxidesigner-mycolor.workers.dev/analyze`
    - HTTP `204`
    - `access-control-allow-origin: https://uxidesigner-ux.github.io`
  - 공개 앱 config 확인:
    - `analysisEndpoint: https://moi-style-analysis.uxidesigner-mycolor.workers.dev/analyze`
    - `photoAnalysisEnabled: true`
    - `appVersion: 0.2.0`
  - Wrangler version list에서 `2026-06-26T00:35:18Z` Secret Change 및 `2026-06-26T00:35:21Z` Worker upload 확인.
- 결론:
  - 임시/무효화된 Cloudflare GitHub Actions token 문제가 해결됨.
  - 현재 GitHub Actions에서 Worker secret 업로드 및 Worker 재배포가 정상 동작함.

## 2026-06-26 KST — v0.2.0 직접 선택 및 주요 기능 QA

- 요청 흐름: 사용자가 “사진 없이 직접 선택”이 동작하지 않는다고 제보하고 전체 기능 체크 요청.
- 버전:
  - `0.2.0` 유지. 진단/QA 단계로 제품 코드 수정 없음.
- 확인 환경:
  - 공개 URL: `https://uxidesigner-ux.github.io/mycolor/`
  - 모바일 뷰포트: `390 × 844`
  - 로컬 mock photo 서버: `npm run dev:photo`, `http://localhost:4173`
- 정적 검증:
  - `npm run check` 통과.
  - `npm run verify` 통과.
  - 공개 config 확인:
    - `analysisEndpoint: https://moi-style-analysis.uxidesigner-mycolor.workers.dev/analyze`
    - `photoAnalysisEnabled: true`
    - `appVersion: 0.2.0`
- 직접 선택 QA:
  - 공개 URL 데스크톱에서 `사진 없이 직접 선택` 클릭 시 `#quiz` 이동 정상.
  - 공개 URL 모바일 390px에서 버튼이 첫 화면 안에 있고, 버튼 중앙을 가리는 레이어 없음.
  - 공개 URL 모바일 390px에서 `사진 없이 직접 선택` 클릭 시 `quiz-screen` 이동 정상.
  - 닉네임 입력 → 얼굴형 `잘 모르겠어요` → 퍼스널컬러 `잘 모르겠어요` → 무드 선택 → 결과 생성 정상.
  - 지역 입력 없이도 결과 생성 정상.
  - 결과 화면 요약 카드 3개 정상 노출:
    - `내 기준`
    - `오늘 바로 하기`
    - `피하면 좋은 것`
- 결과 기능 QA:
  - 결과 탭 `오늘 / 헤어 / 뷰티 / 옷 / 관리` 전환 정상.
  - `aria-pressed` 현재 탭 상태 정상 변경.
  - 네이버 쇼핑 링크:
    - 뷰티 탭 `추천 립 검색` 링크 정상 생성.
    - 옷 탭 `비슷한 옷 찾아보기` 링크 정상 생성.
  - 주변 숍 지도:
    - 지역이 없을 때 `주변 숍 찾아보기` 클릭 시 지역 입력 바텀시트 정상 노출.
    - 결과 화면 지역 입력 `서울 성수동` 저장 정상.
    - 지역 저장 후 `지역 변경` 상태 및 안내 문구 정상 반영.
  - 공유:
    - `결과 공유하기` 클릭 시 공유 바텀시트 정상 노출.
    - 네이티브 공유 가능 환경에서 `공유 시트 열기`, `링크 복사`, `닫기` 액션 정상 노출.
  - 저장된 스타일:
    - 저장된 프로필이 있을 때 홈의 `저장된 스타일 보기` 버튼 정상 노출.
    - 클릭 시 `#result` 이동 및 저장 결과 렌더링 정상.
  - 프로필 수정:
    - `수정` 클릭 시 기준 수정 바텀시트 정상 노출.
- 사진 분석 QA:
  - 공개 Worker CORS preflight 정상.
  - 개인정보 없는 단순 얼굴 일러스트 JPEG로 실제 Worker `/analyze` 호출 시 HTTP `200` 및 구조화 분석 JSON 반환 확인.
  - 1×1 테스트 PNG는 OpenAI가 유효 이미지로 읽지 못해 Worker가 HTTP `400`과 “사진 파일을 읽지 못했어요” 메시지로 정상 매핑.
  - 로컬 mock photo 플로우:
    - 홈 사진 카드 클릭 → `analysis-screen` guide 이동 정상.
    - `로컬 예시 사진으로 흐름 확인` → preview 이동 정상.
    - 동의 체크 후 분석 버튼 활성화 정상.
    - mock 분석 → review 이동 정상.
    - review에서 얼굴형/퍼스널컬러 제안 선택 상태 정상.
    - 무드 선택 후 `내가 확인한 기준으로 추천 보기` 활성화 정상.
    - 사진 분석 결과 생성 및 결과 화면 이동 정상.
- 발견 사항:
  - 현재 재현 환경에서는 `사진 없이 직접 선택` 기능 오류를 재현하지 못함.
  - GitHub Pages가 HTML/CSS/JS에 `cache-control: max-age=600`을 내려주므로, 배포 직후 모바일 브라우저가 10분가량 오래된 asset을 섞어 읽으면 일시적으로 동작이 어긋나 보일 가능성이 있음.
  - 장기적으로는 `app.js`, `styles.css`, `config.js`에 version query 또는 hashed asset 경로를 붙여 배포 직후 캐시 혼선을 줄이는 개선이 권장됨.

## 2026-06-26 KST — v0.2.1 RoutDiary 참고 홈 배치 개편

- 요청 흐름: `https://routdiary.vercel.app` 화면 배치를 참고해 MOI 홈 화면을 다시 정리. 스플래시 동작은 현재 구조 유지.
- 버전:
  - `0.2.0` → `0.2.1`
- 참고 화면 관찰:
  - 웹/모바일 모두 430px 안팎의 모바일 앱 캔버스를 중심으로 사용.
  - 상단 앱바, pill 형태 정렬/필터 칩, 2열 카드 그리드, 하단 floating nav와 주요 + 액션이 핵심 구조.
  - 설명형 랜딩보다 “앱 홈에 바로 들어온 느낌”을 줌.
- 조치:
  - 기존 좌측 설명 + 우측 모바일 화면 분할 홈을 제거하고, 단일 모바일 앱 홈 구조로 재배치.
  - 홈 구조를 `상단 앱바 → 시작 방식 칩 → 2열 카드 그리드 → 하단 floating nav`로 변경.
  - 가장 큰 카드는 `사진 등록`으로 유지해 즉시 사용 가능성을 우선.
  - `사진 없이 직접 선택`은 카드와 하단 nav에서 모두 접근 가능하게 반복 배치.
  - 저장된 스타일은 저장 데이터가 있을 때 하단 nav에 노출되도록 유지.
  - 데스크톱에서도 모바일 앱 캔버스를 중앙에 두고 양옆은 옅은 그레이 배경으로 처리.
  - 스플래시 구조와 최소 2초 로딩 동작은 변경하지 않음.
  - 배포 직후 모바일 캐시 혼선을 줄이기 위해 `styles.css`, `config.js`, `app.js` 로드에 `?v=0.2.1` query를 추가.
  - `DESIGN.md` Functional Home 원칙을 새 앱 홈 구조에 맞게 업데이트.
- 파일:
  - `DESIGN.md`
  - `WORKLOG.md`
  - `app.js`
  - `config.js`
  - `index.html`
  - `package.json`
  - `styles.css`
- 검증:
  - `npm run check` 통과, `Version verified: 0.2.1` 확인.
  - `git diff --check` 통과.
  - `npm run verify` 통과.
  - 로컬 `npm run dev:photo` 모바일 390px 확인:
    - 새 홈 앱바, 모드 칩, 2열 카드 그리드 노출 정상.
    - 하단 floating nav가 viewport 안에 고정 노출되는지 확인.
    - `+` 버튼이 390px 화면 안에서 잘리지 않는지 확인.
    - 직접 선택 카드 클릭 시 `#quiz` 이동 정상.
    - 하단 nav 직접 선택 클릭 시 `#quiz` 이동 정상.
  - 로컬 데스크톱 1280px 확인:
    - 모바일 앱 캔버스가 화면 중앙에 정렬됨.
    - 하단 floating nav가 앱 캔버스 중심에 정렬됨.
  - `npm run preview` production artifact 확인:
    - `styles.css?v=0.2.1`, `config.js?v=0.2.1`, `app.js?v=0.2.1` 로드 확인.
    - `dist/config.js`에 `appVersion: 0.2.1` 확인.
    - 사진 분석 endpoint가 없는 production preview에서도 직접 선택 카드 클릭 시 `#quiz` 이동 정상.

## 2026-06-26 KST — v0.2.1 홈 개편 커밋/푸시

- 요청: v0.2.1 RoutDiary 참고 홈 배치 개편 변경사항을 커밋하고 원격 `main`에 푸시.
- 버전:
  - `0.2.1`
- 커밋 범위:
  - 단일 모바일 앱 홈 구조(앱바 → 모드 칩 → 2열 카드 그리드 → 하단 floating nav)로 재배치.
  - `styles.css`/`config.js`/`app.js` 로드에 `?v=0.2.1` 캐시버스팅 query 추가.
  - `DESIGN.md` Functional Home 원칙 갱신, 버전 `0.2.1` 동기화.
  - 이번 작업 로그.
- 검증:
  - `git diff --check` 통과.
  - `npm run verify` 통과, `Version verified: 0.2.1`, `Worker analysis contract verified`, build OK.
- 커밋/푸시:
  - 대상 브랜치: `main`
  - 커밋 메시지: `feat: rework home into app-style layout`

## 2026-06-26 KST — v0.2.2 Liquid Glass chrome 적용

- 요청: RoutDiary 참고로 홈 화면을 동일 레이아웃(반응형이되 앱스럽게)으로 구성하고, 내비바·헤더·기능성 버튼류에 동일한 "리퀴드 글라스" UI 스타일 적용.
- 버전:
  - `0.2.1` → `0.2.2`
- 디자인 방향 전환:
  - 기존 `DESIGN.md`의 "글래스모피즘 금지" 규칙과 충돌하므로, chrome 한정 Liquid Glass 표면을 공식 디자인 시스템으로 채택하고 문서를 갱신함.
- 조치:
  - `styles.css` 끝에 토큰 기반 `--glass-*` 레이어를 cascade로 추가(기존 버전별 override 패턴과 동일).
  - 적용 대상: 홈 sticky 앱바, 하단 floating 내비, 모드 칩(필터 pill), 원형 아이콘 버튼, 정보 카드(frosted), 카드 badge, 내부 화면 공유 헤더(`site-header` sticky glass), `header-link`, `secondary-button`, `primary-button`(gloss), 바텀시트 패널, `sheet-close`.
  - 표면: `rgba(255,255,255,.6~.82)` tint + `backdrop-filter: blur(22~30px) saturate(180~200%)` + `-webkit-` 동반, 흰 hairline border, 상단 inset highlight.
  - glass 굴절을 살리기 위해 홈 캔버스/데스크톱 양옆에 아주 옅은 ambient tint(블루·웜 6~12% alpha) 배경 추가. 전체 톤은 화이트 클린 유지.
  - 강조(활성 칩, primary CTA, 중앙 FAB)는 ink accent + gloss로 유지해 glass 위 대비 anchor 역할.
  - RoutDiary 헤더의 버전 표기 대응으로 홈 앱바에 glass 버전 pill 추가(`#start-version`, `app.js`가 `APP_VERSION`으로 채움).
  - 접근성 폴백: `@supports not (backdrop-filter)` 및 `prefers-reduced-transparency: reduce`에서 불투명 흰 surface로 처리.
  - `styles.css`/`config.js`/`app.js` 로드 query를 `?v=0.2.2`로 갱신, 스플래시/`package.json`/`config.js`/`app.js` 버전 동기화.
- 파일:
  - `.gitignore` (로컬 `.claude/` 미리보기 설정 제외)
  - `DESIGN.md`
  - `WORKLOG.md`
  - `app.js`
  - `config.js`
  - `index.html`
  - `package.json`
  - `styles.css`
- 검증:
  - `git diff --check` 통과.
  - `npm run verify` 통과, `Configured app version: 0.2.2`, `Worker analysis contract verified`, build OK.
  - 로컬 `npm run dev:photo` 미리보기 캡처 확인:
    - 모바일 375px: 글라스 앱바 + `v0.2.2` pill, 글라스 모드 칩, frosted 정보 카드, 하단 글라스 내비 + FAB 정상 렌더. 상단 ambient tint로 투명감 확인.
    - 데스크톱: 모바일 앱 캔버스 중앙 정렬 + 양옆 ambient 배경, 글라스 chrome 일관 적용 확인.
- 남은 일:
  - 사용자가 지시하면 커밋/푸시 후 Pages 배포(직전 v0.2.1 배포에 이어짐).

## 2026-06-26 KST — v0.2.3 허브 + 시트 플로우 내비게이션 개편

- 요청: 버튼 클릭 시 화면이 모바일 프레임을 벗어나는 문제를, 작업을 바텀시트(아래서 슬라이드 인)로 담는 방식으로 개선. 단 마지막 결과 화면은 시트가 슬라이드 아웃되며 별도 라우팅. 모든 메뉴 동일 적용. 내비 연결 정리. 홈은 사진 등록/직접 선택 2개만. 내비는 홈·저장만 좌측 축소 배치, 우측 + 유지. 구현 전 멘탈모델·UX 분석/제안 선행.
- 버전:
  - `0.2.2` → `0.2.3`
- 선행(분석·제안):
  - 현재 패러다임 혼재 진단: `showScreen`이 4개 화면을 풀스크린 교체하는데 앱 캔버스 프레임은 홈에만 있어 플로우 진입 시 프레임 이탈. 시트 인프라(`openBottomSheet`)는 보조 동작에만 사용.
  - 제안 모델 "허브 + 시트, 결과는 장소"를 다이어그램으로 제시하고, 두 결정 확인:
    - 사진 분석 플로우 → 큰 바텀시트(내부 스테이지).
    - 직접 선택 플로우 → 시트 내부 단계 전환.
- 조치:
  - `app.js` 내비게이션 코어를 디스패처로 교체: `home`/`result`=라우트 베이스, `analysis`/`quiz`=홈 위 시트 오버레이(`presentFlow`/`dismissFlow`). 기존 호출부 대부분 무변경(완료 시 `showScreen("result")`가 시트 슬라이드 아웃 후 결과로 라우팅).
  - `body.is-flow-open`/`is-flow-in`으로 시트 슬라이드 + 허브 scale-down(iOS depth). `prefers-reduced-motion`에서 모션 비활성.
  - `analysis`/`quiz` 화면을 fixed 바텀시트(둥근 상단·grabber·스티키 상단바·내부 스크롤)로 presentation. 백드롭 클릭/Esc로 dismiss.
  - 시작 선택 시트(`openStartChooserSheet`) 추가, 하단 `+`에 연결(사진 등록 / 직접 선택).
  - 홈 단순화: 모드 칩·정보 카드 2개 제거 → `사진 등록`/`직접 선택` 2개만 풀폭 스택.
  - 하단 내비 재구성: 좌측 `홈·저장` 글라스 클러스터 + 우측 `+` FAB. `직접` 항목 제거.
  - 결과에서 홈 복귀를 위해 상단 브랜드(MOI) 탭을 `#home` 라우팅에 연결.
  - 버그 수정: `.landing-screen.start-screen`이 무조건 `display:grid`라 비활성 홈이 결과 화면 위로 쌓이던 문제 → `:not(.is-active)` 숨김 규칙 추가(결과 라우팅이 정상 상단 노출되도록).
  - v0.2.2에서 누락된 하단 `config.js`/`app.js` 로드 쿼리를 `?v=0.2.3`으로 정정, 전 버전 표기 동기화.
- 파일:
  - `DESIGN.md`, `WORKLOG.md`, `app.js`, `config.js`, `index.html`, `package.json`, `styles.css`
- 검증:
  - `git diff --check` 통과. `npm run verify` 통과(`Configured app version: 0.2.3`, Worker contract verified, build OK). 콘솔 오류 0건.
  - 로컬 `npm run dev:photo` 모바일 375px 미리보기:
    - 홈: 카드 2개 + 좌측 `홈`(저장은 저장 후 노출) + 우측 `+` 확인.
    - `직접 선택` 탭 → 퀴즈가 홈 위로 시트 슬라이드업(홈 뒤 scale-down), 내부 1/4 단계 진행 확인.
    - 닉네임→얼굴형→컬러→무드 완료 → `is-flow-in` 해제(슬라이드 아웃) → `#result` 라우팅 → 결과 상단(`resultTop:64`) 정상 렌더 확인.
    - `+` → 시작 선택 시트(사진 등록/직접 선택) 정상.
- 남은 일:
  - 사용자가 지시하면 커밋/푸시 후 Pages 배포.
  - (후속 권장) 사진 분석 large-detent 시트의 로딩/촬영 단계 높이 미세 조정, 결과 화면도 앱 캔버스 폭으로 맞추는 정리.

## 2026-06-26 KST — v0.2.4 결과 화면 이미지 레퍼런스 시스템

- 요청: 결과 화면에 추천 글만 나열하지 않고 헤어, 의상, 메이크업 등 결과 화면에 출력되는 모든 항목/유형에 사진을 함께 보여주도록 즉시 진행.
- 버전:
  - `0.2.3` → `0.2.4`
- 리서치/판단:
  - 외부 이미지 API를 즉시 붙이면 키/서버/라이선스/품질/속도 리스크가 커서 1차는 "정적 큐레이션 이미지 매핑"으로 결정.
  - 결과 화면의 멘탈모델은 커머스 피드가 아니라 개인 스타일 리포트이므로, 이미지가 추천 문장을 압도하지 않도록 compact thumbnail + tap-to-sheet gallery로 설계.
  - Pexels CDN 이미지 URL을 일부 실제 요청해 200 응답 확인 후 사용.
- 조치:
  - `app.js`에 `curatedVisuals` registry 추가:
    - 얼굴형별 헤어 이미지(`oval`, `round`, `square`, `long`, `heart`, `unknown`)
    - 퍼스널컬러별 헤어컬러/뷰티/네일/의상 이미지(`spring`, `summer`, `autumn`, `winter`, `unknown`)
    - 무드별 의상 이미지(`clean`, `lovely`, `chic`, `natural`)
    - 숍/쇼핑/주의/관리 주기 이미지
  - `renderVisualFigure`, `renderSummaryVisuals`, `openVisualGallery` 공통 유틸 추가.
  - 결과 요약 카드 3개에 이미지 스트립 추가.
  - `오늘`, `헤어`, `뷰티`, `옷`, `관리` 탭의 모든 추천 카드/관리 항목에 대표 이미지 추가.
  - 이미지 클릭 시 바텀시트 갤러리로 크게 확인 가능하도록 전역 `[data-visual-gallery]` click 처리 추가.
  - `styles.css`에 v0.2.4 visual recommendation system 추가:
    - 카드 이미지 크롭, label overlay, focus-visible, reduced-motion, 모바일 높이 조정.
    - 관리 주기 리스트는 각 항목별 정사각 썸네일로 재구성.
  - `DESIGN.md`에 Result Visuals 규칙 추가.
- 파일:
  - `DESIGN.md`, `WORKLOG.md`, `app.js`, `config.js`, `index.html`, `package.json`, `styles.css`
- 검증:
  - `git diff --check` 통과.
  - `npm run check` 통과(`Version verified: 0.2.4`).
  - `npm run verify` 통과(`Configured app version: 0.2.4`, Worker contract verified, build OK). 테스트 중 OpenAI quota 429는 기존 계약 검증 케이스로 처리됨.
  - 로컬 `npm run dev:photo` 재시작 후 확인:
    - `/config.js`가 `appVersion: "0.2.4"` 반환.
    - 저장된 스타일로 결과 화면 진입 성공.
    - 결과 첫 화면: 요약 이미지 스트립 3개, 오늘 탭 이미지 4개 확인.
    - 탭별 이미지 수: 헤어 3개, 뷰티 3개, 옷 4개, 관리 7개(관리 주기 6개 포함).
    - 이미지 클릭 시 바텀시트 갤러리 정상 오픈, 갤러리 카드 3개 확인.
    - 외부 Pexels 이미지 17/17 로드, 깨진 외부 이미지 0개, 브라우저 콘솔 error 0개.
  - Impeccable detector:
    - 기존 레거시 CSS advisory는 남아 있음.
    - 새 v0.2.4 visual block(`styles.css` 3992 이후)은 advisory 0개 확인.

## 2026-06-26 KST — v0.2.5 추천 기준별 결과 분기

- 요청: 남자인지 여자인지 구분해서 결과를 보여주되, 멘탈모델과 UX 사고를 반영.
- 버전:
  - `0.2.4` → `0.2.5`
- UX 판단:
  - 사진에서 성별을 자동 판별/단정하는 구조는 사용자가 불쾌하거나 틀렸다고 느끼기 쉽고, 정체성 판단처럼 보일 수 있어 피함.
  - 대신 `여성 기준 / 남성 기준 / 상관없음`을 **추천 기준**으로 설계. 성별 정체성을 묻는 항목이 아니라 추천 문구, 상품군, 관리 기준, 이미지 레퍼런스를 맞추는 필터로 설명.
  - 직접 선택 첫 단계에 넣되 기본값은 `상관없음`으로 둬서 기존 “닉네임만 필수” 흐름을 깨지 않음.
  - 사진 분석 플로우는 분석 검토 화면에서 사용자가 추천 기준을 직접 확정하도록 구성.
- 조치:
  - `app.js`에 `styleTarget` 상태와 `styleTargets` 데이터 추가.
  - 기존 저장 프로필에 `styleTarget`이 없으면 `neutral`로 마이그레이션하는 fallback 추가.
  - `styleGuide()` 레이어 추가:
    - 여성 기준: 기존 메이크업·헤어·의상 중심 유지.
    - 남성 기준: 헤어 실루엣, 그루밍, 핏, 손 관리 중심으로 문구와 추천값 교체.
    - 상관없음: 젠더리스/뉴트럴 헤어·뷰티·그루밍 문구 사용.
  - 남성 기준용 `targetVisuals` 이미지 매핑 추가:
    - 얼굴형별 헤어, 헤어 컬러, 그루밍, 손 관리, 의상, 무드, 숍, 관리 주기.
  - 결과 태그, 요약 카드, 오늘/헤어/뷰티/옷/관리 탭, 공유 문구, 분석 기준 시트에 추천 기준 반영.
  - 직접 선택 첫 단계에 추천 기준 카드 3개 추가.
  - 사진 분석 검토 화면에 추천 기준 카드 3개 추가.
  - `styles.css`에 v0.2.5 추천 기준 선택 UI 스타일 추가.
  - `DESIGN.md`에 Recommendation Target 원칙 추가.
- 파일:
  - `DESIGN.md`, `WORKLOG.md`, `app.js`, `config.js`, `index.html`, `package.json`, `styles.css`
- 검증:
  - `npm run check` 통과(`Version verified: 0.2.5`).
  - `npm run verify` 통과(`Configured app version: 0.2.5`, Worker contract verified, build OK). 테스트 중 OpenAI quota 429는 기존 계약 검증 케이스로 처리됨.
  - 로컬 `npm run dev:photo` + Chrome 모바일 390px 자동화:
    - 직접 선택 1단계: 추천 기준 카드 3개 노출, 기본 선택 `neutral`, 닉네임 없을 때 다음 버튼 disabled 확인.
    - 저장 프로필 결과 렌더:
      - `male` → 결과 태그 `남성 기준`, 뷰티 탭 제목 `그루밍 팔레트`, 그루밍 문구/이미지 3개 확인.
      - `female` → 결과 태그 `여성 기준`, 뷰티 탭 제목 `뷰티 팔레트`, 메이크업 문구/이미지 3개 확인.
      - `neutral` → 결과 태그 `상관없음`, 뷰티 탭 제목 `뷰티·그루밍 팔레트`, 중립 문구/이미지 3개 확인.
    - 직접 선택 전체 완료 경로: 닉네임 → 남성 기준 → 얼굴형 모름 → 컬러 모름 → 내추럴 → `#result` 진입, localStorage `styleTarget:"male"` 저장 확인.
    - 사진 분석 mock 경로: demo photo → 분석 검토 → 남성 기준 선택 → 결과 진입, 사진 분석 안내 카드 노출 및 `styleTarget:"male"` 저장 확인.
    - 남성 기준 전체 탭 이미지:
      - 오늘 4개, 헤어 3개, 뷰티 3개, 옷 4개, 관리 7개.
      - 깨진 이미지 0개, 브라우저 콘솔 error 0건.
  - Impeccable detector:
    - 기존 레거시 CSS advisory 89건은 남아 있음.
    - 새 v0.2.5 추천 기준 UI 블록(`styles.css` 4200 이후)은 advisory 0건 확인.

## 2026-06-29 KST — v0.2.6 데스크톱 디바이스 프레임 셸 재구축

- 요청: 데스크톱에서 RoutineDiary 레이아웃처럼 왼쪽 서비스 소개 + 오른쪽 모바일 프레임 구성으로, 모든 기능이 프레임 안에서만 동작하도록. 기존엔 소개가 위·프레임이 아래로 쌓이고 바텀시트가 프레임보다 크게 동작하는 등 견고하지 않았다. 화면 크기별 분석 + 개선 방향 제안 후 진행.
- 버전:
  - `0.2.5` → `0.2.6`
- 선행(분석·제안):
  - 근본 원인 진단: 지속되는 프레임 컨테이너 부재. 4개 화면(home/analysis/quiz/result)이 각자 다른 width 로직을 가진 `<main>` 직속 형제이고, 오버레이(플로우 시트·바텀시트)는 프레임이 아니라 뷰포트 기준으로 떠 있었다.
    - 홈: v0.2.2의 2단 데스크톱 그리드(`styles.css:2317`)를 v0.2.3 cascade(`:3164`)가 단일 컬럼으로 덮어써 소개가 위·프레임이 아래로 쌓임.
    - 분석/퀴즈: `position:fixed; inset:0` 뷰포트 오버레이(468px 중앙)라 우측 프레임과 무관하게 화면 중앙에서 슬라이드업.
    - 결과: `width:min(100%,960px)` 별개 풀폭 레이아웃 → 폰 프레임 이탈.
    - 바텀시트: `position:fixed` 640px 뷰포트 하단 → 프레임보다 큼.
    - 죽은 규칙(`.start-phone*`)·혼재 브레이크포인트로 취약.
  - 제안: "단일 디바이스 프레임 셸". 두 결정 확정 — (1) 프레임 셸 재구축, (2) 왼쪽 소개 항상 고정.
- 조치:
  - `index.html` 구조 재편:
    - `main.app-shell`(데스크톱 2단 grid / 모바일 단일).
    - `.start-explainer`를 `#home-screen` 밖 지속 `aside.app-aside`로 이동.
    - `.site-header`를 프레임 안으로 이동(프레임 상단 chrome). 모든 화면 + 토스트 + 바텀시트를 `.device-frame > .device-stage` 안으로 이동.
    - 홈 floating 내비를 `.start-mobile-app`(스크롤러) 밖, `#home-screen` 직속으로 이동해 프레임 하단에 고정.
  - `styles.css` 끝에 v0.2.6 "Device frame shell" 블록 추가(레이아웃 권한). 상위 스코프로 기존 충돌 규칙을 cascade로 정정:
    - `.app-shell` 2단/단일, `.app-aside` 타이포, `.device-frame`(404px·둥근 모서리·내부 height) , `.device-stage`(overflow:hidden, 화면·오버레이 클립).
    - base 화면 absolute fill + 내부 스크롤. 홈은 비스크롤 래퍼 + 내부 앱 스크롤 + 내비 고정. result 960px → 프레임 폭.
    - 플로우 시트/바텀시트/토스트/홈 내비를 `position:absolute`로 프레임 기준 재배치.
    - 프레임은 항상 좁으므로(~404px) 결과 요약·분석 다단 그리드를 프레임 안에서 항상 단일/모바일 레이아웃으로 강제(데스크톱 cramping 방지).
    - 단일 브레이크포인트(860px)로 데스크톱 2단 ↔ 모바일 풀스크린 전환.
  - `app.js`: `window.scrollTo` → `scrollActiveTop()`(활성 화면의 프레임 내부 스크롤 컨테이너 top) 헬퍼로 교체.
  - `DESIGN.md`에 App Shell(Device Frame) 원칙 추가, Functional Home 데스크톱 설명 갱신.
- 파일:
  - `DESIGN.md`, `WORKLOG.md`, `app.js`, `config.js`, `index.html`, `package.json`, `styles.css`
- 검증:
  - `git diff --check` 통과.
  - `npm run check` 통과(`Version verified: 0.2.6`).
  - `npm run verify` 통과(`Configured app version: 0.2.6`, Worker contract verified, build OK). test:worker의 OpenAI 429는 기존 계약 검증 케이스.
  - Playwright(Chromium) 자동 캡처:
    - 데스크톱 1280×860: 홈 = 왼쪽 소개 + 오른쪽 폰 프레임, 홈 내비 프레임 하단 고정.
    - 데스크톱: 직접 선택 → 퀴즈 시트가 프레임 안에서 슬라이드업·클립(프레임 초과 없음), 홈 뒤 scale-down.
    - 데스크톱: `+` 시작 선택 바텀시트도 프레임 안에서 클립.
    - 데스크톱: 퀴즈 완료 → 결과가 프레임 안에서 렌더·내부 스크롤(헤더 고정), 요약 그리드 단일 컬럼으로 정리.
    - 모바일 390×844: 프레임 풀스크린, 소개 숨김, 내비 고정.
    - 콘솔 error 0건(외부 Pexels 이미지 차단 로그는 샌드박스 네트워크 제약).

## 2026-06-29 KST — v0.2.7 헤더 액션: 구글 로그인 + 새로고침 + 공유

- 요청: 상단 우측에 새로고침·공유 버튼, 상단 좌측에 로그인(구글) 버튼 추가. 구글 로그인은 uxidesigner 계정/mycolor-500901 프로젝트로 진행. DB 필요하면 구글에서 설정.
- 버전:
  - `0.2.6` → `0.2.7`
- 범위 결정:
  - 원격 리눅스 환경에서는 사용자 구글 콘솔/Chrome 세션에 접근 불가 → OAuth 클라이언트 생성은 사용자가 수행(콘솔), 코드/연동은 내가 담당.
  - 로그인 범위 = 신원 확인만(서버 DB·백엔드 없음). GIS로 프로필(이름·이메일·사진)만 받아 표시, 세션은 localStorage. 스타일 데이터는 기존대로 기기 저장.
- 조치:
  - 프레임 헤더(`.site-header`)를 모든 화면 지속 노출 chrome으로 전환(홈 포함, 홈은 앱바 위에 슬림 유틸바).
    - 좌측: 브랜드 + `로그인` 버튼(구글 G 아이콘 → 로그인 시 아바타+이름 다크 pill, 클릭 시 계정 시트에서 로그아웃).
    - 우측: 저장(북마크, 저장 시에만) · 새로고침 · 공유 아이콘.
  - `app.js`에 Google Identity Services(`accounts.google.com/gsi/client`) 연동:
    - `initTokenClient`(scope `openid email profile`) → access token → `oauth2/v3/userinfo`로 프로필 취득 → localStorage 세션.
    - `config.googleClientId` 비어 있으면 로그인 클릭 시 설정 안내 토스트(앱은 정상 동작).
    - 새로고침 = `location.reload()`. 공유 = 결과 있으면 스타일 공유 시트, 없으면 앱 공유 시트.
  - `config.js`에 `googleClientId` 추가(웹 OAuth Client ID는 공개값이라 커밋 안전). 사용자 제공 Client ID(`283494466700-…apps.googleusercontent.com`) 적용. 승인된 JS 원본: `https://uxidesigner-ux.github.io`.
  - `styles.css` v0.2.7 블록: 헤더 클러스터/아이콘 버튼/로그인 pill/아바타/계정 시트 스타일. `[hidden]` 존중(저장 아이콘 숨김 버그 수정).
- 파일:
  - `DESIGN.md`, `WORKLOG.md`, `app.js`, `config.js`, `index.html`, `package.json`, `styles.css`
- 검증:
  - `npm run verify` 통과(`Version verified: 0.2.7`, Worker contract verified, build OK).
  - Playwright(Chromium) 캡처: 데스크톱 홈 로그아웃(좌 `G 로그인`, 우 새로고침/공유), 시뮬레이트 로그인(아바타+이름 다크 pill, 저장 아이콘 숨김 확인), 모바일. 콘솔 error 0건.
  - 주의: 실제 구글 로그인은 승인된 원본이 `github.io`라 라이브에서만 동작(샌드박스/로컬은 origin 불일치로 미동작). OAuth 동의 화면이 테스트 모드면 테스트 사용자만 로그인 가능.

## 2026-06-29 KST — v0.2.8 빌드 config에서 googleClientId 누락 수정

- 증상: 라이브에서 로그인 클릭 시 "구글 로그인 설정(Client ID)이 아직 없어요" 토스트.
- 원인: `scripts/build.mjs`가 배포용 `dist/config.js`를 새로 생성하면서 `analysisEndpoint`/`photoAnalysisEnabled`/`demoMode`/`appVersion`만 넣고 `googleClientId`를 누락 → 라이브 config.js에 Client ID 없음 → 런타임 `GOOGLE_CLIENT_ID` 빈 값.
- 버전: `0.2.7` → `0.2.8` (config.js 캐시 버스팅 위해 필수 — 기존 `config.js?v=0.2.7`이 Client ID 없이 캐시됨).
- 조치:
  - `scripts/build.mjs`: 소스 `config.js`에서 `googleClientId`를 정규식으로 읽어 production config에 포함(`process.env.MOI_GOOGLE_CLIENT_ID` 우선, 없으면 소스 값). 단일 출처 유지.
  - 전 파일 버전 0.2.8로 동기화.
- 검증: `npm run verify` 통과(`Version verified: 0.2.8`). `dist/config.js`에 `googleClientId` 포함 확인.

## 2026-06-29 KST — v0.2.9 하단 내비 잘림 수정 + 홈 개방감 개선

- 요청: 하단 내비바가 안 보이거나 반절만 보임(완성도 저하). 모든 화면에서 UI 잘림 점검·개선. 헤더 아래 "스타일 시작/버전/작은 카메라" 영역이 헤더와 떨어지고 카드와 붙음 — 작은 카메라 제거, 배경색·보더 제거로 개방감.
- 버전: `0.2.8` → `0.2.9` (config.js 캐시 버스팅 포함).
- 진단(Playwright 측정):
  - 하단 홈 내비: `#home-screen`이 옛 규칙의 `min-height:100svh`를 물려받아 스테이지보다 커져, absolute 내비가 프레임 아래로 밀려 `overflow:hidden`에 잘림(데스크톱은 완전히 안 보임, 모바일은 ~26/66px만 보임).
  - 퀴즈 시트 `다음` 버튼: 시트 콘텐츠(781px)가 시트 높이(665px)보다 커서 footer가 스크롤 영역 안에서 프레임 하단에 반쯤 잘림.
  - 결과/공유 footer: 긴 스크롤 페이지 하단에 있어 스크롤하면 완전히 보임(45px 여유, 문제 아님).
- 조치(`styles.css` v0.2.9):
  - `.device-stage > .screen.is-active`, `#home-screen.is-active`에 `min-height:0` → 모든 화면을 스테이지 높이에 고정. 내비가 프레임 안에 완전히 표시(높이별 14–15px 여유 확인).
  - 홈 개방감: `.start-mobile-app` 배경 투명·보더 0, `.start-appbar`를 sticky 글라스 바 → 정적 투명 텍스트로(헤더 바로 아래), 앱바 내 작은 카메라 버튼 제거(HTML).
  - 퀴즈 footer를 `position:sticky; bottom:0` 고정 footer로(배경+그림자) → `다음` 항상 완전 표시.
- 검증: `npm run verify` 통과(`Version verified: 0.2.9`). Playwright 데스크톱/모바일 재측정 — 홈 내비 비잘림, 퀴즈 `다음` ok, 결과 footer 스크롤 시 완전 표시. 콘솔 error 0건.

## 2026-06-29 KST — v0.2.11 시트 그래버 고정 + 내비 고정 확인

- 요청: 바텀시트 드래그 핸들(그래버)이 비어 보이고, 스크롤/드래그하면 시트 위로 올라가 사라짐. 고정 필요. 내비바도 스크롤해도 고정 위치여야 함.
- 진단: 플로우 시트(퀴즈/분석)의 그래버가 `.shell::before`로 스크롤 컨테이너 안에 있어 스크롤 시 위로 밀려 사라지고 상단이 비어 보임.
- 조치(`styles.css` v0.2.11):
  - `.shell::before` 그래버 제거, 그래버를 sticky 상단바의 absolute `::after`로 이동 → 시트 상단에 항상 고정. 상단바 `padding-top:16px`, 시트 `padding-top:4px`.
  - 내비: v0.2.9에서 이미 프레임 기준 absolute(스크롤 무관 고정)임을 측정으로 확인.
- 검증: `npm run verify` 통과(`Version verified: 0.2.11`). Playwright — 퀴즈 상단바/그래버·홈 내비 스크롤 전후 top 동일(고정).

## 2026-06-29 KST — v0.2.12 날씨 기반 추천(Open-Meteo)

- 요청: 날씨에 맞게 화장·헤어·패션 제안이 달라지도록. 멘탈모델·UX 제안 후 "Open-Meteo 적용, 제안 수용".
- 멘탈모델: 프로필 = 고정 정체성(얼굴형·컬러·기준) × 오늘의 컨텍스트(무드·날씨). 날씨는 매일-변수라 "오늘" 레이어만 모듈레이트.
- 조치(`app.js`, `styles.css` v0.2.12):
  - Open-Meteo 연동(무료·키 불필요·CORS): `geocoding-api`(활동 지역→좌표) + `forecast`(현재 기온/습도/강수/날씨코드/풍속 + 일별 최고·최저/강수확률/자외선). 백엔드·DB 없음.
  - 위치: 지오로케이션 우선(권한), 없으면 활동 지역 지오코딩. 좌표/지역+1시간 TTL localStorage 캐시.
  - "오늘" 탭 최상단에 `#today-weather` 블록: 날씨 칩(지역·기온·상태·최고/최저·습도·자외선) + 규칙 기반 조정 노트(헤어/뷰티/자외선/옷, 최대 4개).
  - 상태머신: idle(CTA "오늘 날씨에 맞춰 추천 받기")→loading→ready/denied/error. 지역 있으면 자동 로드, 없으면 CTA로 지오로케이션 요청. 새로고침 버튼.
  - 규칙: 습도≥70/강수→헤어 흐트러짐 방지, 건조→정전기 케어, 더위·습도→가벼운 베이스·지속력, 추위→보습·립밤, 자외선≥6→SPF, 기온 밴드→레이어링/통기, 비→발수.
  - 다른 탭은 미변경(날씨는 "오늘" 중심). 권한 거부·오프라인 시 기존 추천 유지.
  - `DESIGN.md`에 Weather Layer 원칙 추가.
- 검증: `npm run verify` 통과(`Version verified: 0.2.12`). Playwright — ready(캐시 시드) 시 칩+노트 4개 렌더, idle 시 CTA 노출, 콘솔 error 0건. (실제 Open-Meteo/지오로케이션은 샌드박스 네트워크 차단으로 라이브에서만 동작.)

## 2026-06-29 KST — v0.2.13 기록/저장 + 출발지·도착지 경로 날씨

- 요청: 내비 저장 옆에 "기록" 추가(조회 내용 자동 기록). "저장"은 "이 제안 저장하기" 버튼 누른 것만 날짜별. 홈에 현재 위치 오늘 날씨, 위치 조정 가능(출발지/도착지). "한 번에 전부, 도착지 선택형" 수용.
- 멘탈모델: 앱 = 집→외출 준비. 추천 = 정체성 × (무드 · 경로 날씨). 흐름 = 조회(자동 기록) → 저장(명시).
- 조치(`index.html`, `app.js`, `styles.css`):
  - 기록/저장: 내비 `홈·기록·저장`. `moi-history-v1`(자동, cap 50, 1분 내 동일 프로필 dedup) + `moi-saved-v1`(명시). 결과 footer "이 제안 저장하기" 버튼. 기록/저장 large 바텀시트 리스트, 탭 시 해당 프로필로 결과 재열기, 저장은 삭제 가능. 헤더 북마크/인라인 저장 → 저장 리스트.
  - 경로 날씨: 출발지(기본 현재 위치)/도착지(선택=활동 지역) 모델로 리팩터. `moi-route-v1`. 두 지점 fetch + `combinedWeather()`. routeSignature+1h 캐시.
  - 홈 `#home-weather` 카드 + 결과 "오늘" 칩(노트 포함). ⚙/CTA → 출발지·도착지 설정 시트. 날씨 액션 document 위임.
  - `DESIGN.md`에 Records & Route 추가.
- 검증: `npm run verify` 통과(`Version verified: 0.2.13`). Playwright: 홈 날씨 칩, 내비 3항목, 기록/저장 시트(삭제 포함), 경로 설정 시트 확인. 콘솔 error 0건.
