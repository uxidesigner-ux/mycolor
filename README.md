# MOI — 데일리 퍼스널 스타일리스트

얼굴형, 퍼스널 컬러, 원하는 무드를 입력하면 헤어·메이크업·옷·관리 주기를 한 번에 추천하는 모바일 우선 MVP입니다.

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

- 닉네임과 활동 지역 입력
- 얼굴형, 퍼스널 컬러, 스타일 무드 선택
- 입력 조합에 따라 달라지는 헤어·뷰티·옷 추천
- 헤어, 화장품, 네일·페디 관리 주기 안내
- 네이버 지도 주변 숍 검색 연결
- 네이버 쇼핑 제품 검색 연결
- 브라우저 로컬 저장 및 결과 다시 보기
- Web Share API 기반 결과 공유

현재 진단은 사용자의 선택을 기반으로 합니다. 사진 자동 분석, 로그인, 예약·결제, 실제 상품·매장 데이터 연동은 이후 단계의 기능입니다.
