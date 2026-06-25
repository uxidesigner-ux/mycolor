# MOI — 데일리 퍼스널 스타일리스트

사진 또는 직접 선택으로 얼굴형, 퍼스널 컬러, 원하는 무드를 확인하고 헤어·메이크업·옷·관리 주기를 한 번에 추천하는 모바일 우선 MVP입니다.

## 실행

별도 패키지 설치가 필요하지 않습니다. Node.js 20 이상에서 실행하세요.

```bash
npm run dev
```

브라우저에서 `http://localhost:4173`을 열면 됩니다.

## 명령

```bash
npm run check    # JavaScript 문법 검사
npm run build    # dist/ 배포 산출물 생성
npm run preview  # dist/ 기준 미리보기
npm run verify   # 커밋·배포 전 전체 검사
```

사진 분석 UX를 실제 사진 전송 없이 확인하려면 다음 명령을 사용합니다.

```bash
npm run dev:photo
```

실제 배포된 Worker를 로컬에서 연결해 확인하려면 endpoint를 지정해 실행합니다.

```bash
MOI_ANALYSIS_ENDPOINT="https://<worker-name>.<account>.workers.dev/analyze" npm run dev
```

## 사진 분석 구조

브라우저는 사진을 최대 1440px JPEG로 다시 그려 EXIF 위치정보를 제거한 뒤, 사용자가 동의한 경우에만 분석 API로 전송합니다. 분석 API는 사진을 저장하지 않고 OpenAI Responses API의 이미지 입력과 Structured Outputs를 사용해 다음 항목만 반환합니다.

- 사진 품질과 분석 가능 여부
- 얼굴형 후보와 판단 근거·신뢰도
- 퍼스널 컬러 후보와 판단 근거·신뢰도
- 언더톤과 대비 단서

인종, 건강, 감정, 성별 정체성, 매력도 등 민감하거나 스타일 추천에 불필요한 특성은 분석하지 않습니다. AI 결과는 확정 진단이 아니라 사용자가 수정 가능한 첫 제안으로 표시됩니다.

Worker는 Cloudflare Rate Limiting binding이 있는 경우 익명 client id 기준으로 1분당 20회까지만 분석을 허용합니다. client id는 브라우저 localStorage에 생성되는 무작위 값이며, 사진이나 개인 식별 정보는 저장하지 않습니다.

### Cloudflare Worker 배포

GitHub Pages에는 API 키를 안전하게 저장할 수 없으므로 `worker/`를 별도의 Cloudflare Worker로 배포합니다.

```bash
npx wrangler@4 login
npx wrangler@4 secret put OPENAI_API_KEY --config worker/wrangler.jsonc
npm run deploy:worker
```

배포 후 출력된 Worker 주소에 `/analyze`를 붙여 GitHub 저장소 변수로 등록하고 Pages를 다시 배포합니다.

```bash
gh variable set MOI_ANALYSIS_ENDPOINT --repo uxidesigner-ux/mycolor --body "https://<worker-name>.<account>.workers.dev/analyze"
gh workflow run pages.yml --repo uxidesigner-ux/mycolor
```

빌드 시 `MOI_ANALYSIS_ENDPOINT`가 있으면 배포용 `config.js`에 공개 API 주소가 자동 주입되고 사진 분석 CTA가 활성화됩니다. 임시로 끄려면 Repository variable `MOI_PHOTO_ANALYSIS_ENABLED=false`를 등록하세요. OpenAI 비밀 키는 Worker secret에만 저장되고 GitHub Pages나 저장소에는 들어가지 않습니다. OpenAI 모델은 `worker/wrangler.jsonc`의 `OPENAI_MODEL`로 변경할 수 있습니다.

### 모바일에서 배포 준비

로컬 Cloudflare OAuth 대신 GitHub Actions로 배포할 수도 있습니다. 저장소의 **Settings → Secrets and variables → Actions**에 아래 Repository secrets 3개를 등록합니다.

- `CLOUDFLARE_API_TOKEN`: Cloudflare의 **Edit Cloudflare Workers** 템플릿으로 생성한 API 토큰
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare Workers 대시보드에 표시되는 Account ID
- `OPENAI_API_KEY`: OpenAI API 프로젝트 키

`Deploy photo analysis Worker` 워크플로가 Worker 배포와 OpenAI secret 등록을 함께 처리합니다. 값은 로그나 정적 사이트에 노출되지 않습니다.

## Git 커밋·푸시 환경

처음 한 번 아래 명령을 실행하면 저장소 전용 Git hooks가 활성화됩니다.

```bash
npm run setup:git
```

- 커밋 전: JavaScript 문법 검사
- 푸시 전: 문법 검사와 프로덕션 빌드
- Pull Request: GitHub Actions에서 동일한 검사 수행
- `main` 푸시: `dist/`를 빌드해 GitHub Pages로 배포

원격 저장소가 아직 없다면 GitHub에서 빈 저장소를 만든 뒤 연결합니다.

```bash
git remote add origin https://github.com/<username>/<repository>.git
git push -u origin main
```

GitHub 저장소의 **Settings → Pages → Source**를 **GitHub Actions**로 지정하면 `main` 푸시 후 자동 배포됩니다.

## MVP에 포함된 기능

- 닉네임 입력, 결과 화면에서 활동 지역 설정
- 사진 업로드, 로컬 압축·메타데이터 제거, 분석 동의
- OpenAI 기반 사진 분석, 근거·신뢰도 확인 및 직접 수정
- 얼굴형, 퍼스널 컬러, 스타일 무드 선택
- 입력 조합에 따라 달라지는 헤어·뷰티·옷 추천
- 헤어, 화장품, 네일·페디 관리 주기 안내
- 네이버 지도 주변 숍 검색 연결
- 네이버 쇼핑 제품 검색 연결
- 브라우저 로컬 저장 및 결과 다시 보기
- Web Share API 기반 결과 공유

현재 진단은 직접 선택 또는 사진 분석 제안을 사용자가 확정하는 방식으로 동작합니다. 로그인, 예약·결제, 실제 상품·매장 데이터 연동은 이후 단계의 기능입니다.
