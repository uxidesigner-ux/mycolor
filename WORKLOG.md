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
