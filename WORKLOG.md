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
