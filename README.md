# 한재훈 개발자 포트폴리오

React + Vite 정적 포트폴리오(OCI: https://jaehoon93.duckdns.org/). 홈은 실제 개발자 소개 사이트의 구도(첫 화면 이름·소개 | 오른쪽 경험 목록, 프로젝트 카드 → 상세 페이지)를 따르고, 색과 흐름은 원본 PDF에서 가져왔습니다.

- 색은 개발 단계에만 씁니다: 분석 coral · 설계 gold · 개발 green · 테스트 blue · 배포 lavender
- 홈 순서: 소개 → 프로젝트(MyCrewSoft 메인, NO.BLACK, Cinema Talk) → 문제 해결 → 기술 → 경력·자격증 → 연락
- 프로젝트 상세는 모두 같은 순서입니다: 한눈에 보기 → 01 분석 → 02 설계 → 03 개발 → 04 테스트 → 05 배포 → 트러블슈팅 → 회고
- 휴대폰에서는 홈 상단에 섹션 탭, 상세 상단에 단계 바가 고정됩니다.

## VS Code에서 시작

Node.js 22 LTS를 설치하고 압축을 푼 폴더를 VS Code로 엽니다.

```powershell
npm.cmd ci
npm.cmd run dev
```

터미널에 표시되는 로컬 주소를 엽니다. `npm ci`는 잠금 파일에 기록한 의존성을 설치하고, `npm run dev`는 개발 서버를 실행합니다.

## 수정 위치

- `src/site-data.js`: 홈 문구 — 첫 화면, 프로젝트 카드, 문제 해결 목록, 기술, 경력, 자격증, 연락처
- `src/project-details.js`: 프로젝트 상세 본문(MyCrewSoft·NO.BLACK·Cinema Talk). 단계별 블록(문단·그림·표·코드·접기 등)으로 적습니다.
- `src/home.jsx`, `src/detail.jsx`: 홈과 상세 화면
- `src/nav.jsx`: 헤더 메뉴, 휴대폰 탭, 연락하기 메뉴, 섹션 이동
- `src/main.jsx`: 해시 주소 처리와 뒤로가기 시 스크롤 복원
- `src/site.css`: 색상·글꼴·반응형 레이아웃
- `public/assets/`: 사진·프로젝트 이미지·설계 자료, `public/assets/tech/`: 기술 로고(devicon, MIT)
- `public/og-image.png`: 링크 미리보기 이미지(1200×630). 메타 태그는 `index.html`에 있습니다.
- `docs/CONTENT.md`: 자료 출처
- `docs/DEPLOYMENT.md`: OCI 배포 가이드

## 기능

- 주소: `#projects`처럼 홈 섹션, `#project/crew`처럼 상세, `#project/crew/design`·`#project/crew/case-03`처럼 상세 안의 단계·사례로 바로 갈 수 있습니다. 접힌 사례도 자동으로 펼쳐집니다. 예전 주소(`#project/crew/16` 같은 PDF 쪽 번호)는 해당 단계로 연결합니다.
- 같은 화면 안의 메뉴·목차 이동은 방문 기록을 쌓지 않아, 뒤로가기 한 번이면 이전 화면으로 돌아가고 홈의 스크롤 위치도 복원됩니다.
- 글꼴은 Pretendard 정적 글꼴 동적 서브셋(`pretendard` 패키지, 굵기 500~900)이라 페이지에 쓰인 글자 조각만 내려받습니다. 가변 글꼴은 윈도에서 본문이 가늘고 흐리게 보여 쓰지 않고, 본문 굵기는 500입니다. 쓰지 않는 굵기와 옛 형식(woff) 파일은 `vite.config.js`에서 빌드할 때 뺍니다.
- 브라우저 점검: `npm run build && npm run preview` 후 `PORTFOLIO_URL=http://127.0.0.1:4173 node scripts/smoke-portfolio-ui.mjs` (Playwright 필요. CI에서는 Docker 이미지에 대해 자동 실행)

## 빌드

```powershell
npm.cmd run build
npm.cmd run preview
```

`dist`가 완성된 정적 사이트입니다. Spring/DB/Node 상시 프로세스는 필요 없습니다.

코드와 함께 제공하는 이미지·PDF는 사용자 프로젝트 자료이며, 원본 권리는 각 권리자에게 있습니다. 한글 본문 글꼴은 `pretendard` 패키지의 Pretendard 정적 글꼴 동적 서브셋으로, 빌드 결과에 함께 들어가 외부 CDN 없이 제공됩니다. 글꼴 라이선스는 `public/assets/fonts/Pretendard-LICENSE.txt`에서 확인할 수 있습니다.

## ChatGPT Sites 운영 버전 10 내보내기

- 기준 커밋은 `bef785d78deed63e16f42851158728249ebf88ff`입니다. 운영 버전의 소스와 정적 파일을 원본 경로에 담았습니다. 이 README에 안내를 추가했고, 별도 의존성 문서와 이력서용 글꼴 사본을 포함했습니다.
- 빌드에는 Node.js 22 LTS와 함께 설치되는 npm을 사용할 수 있습니다. `npm ci`는 잠금 파일에 기록된 React 19.3.1, React DOM 19.3.1, Vite 6.4.5와 하위 의존성을 설치합니다.
- ZIP을 풀고 `jaehun-portfolio` 폴더를 VS Code에서 엽니다. macOS·Linux·Git Bash에서는 위의 `npm.cmd` 대신 `npm`을 사용하면 됩니다.

### 다른 서버에서 제공하기

```sh
npm ci
npm run build
```

정적 호스팅에서는 `dist/` 안의 내용을 도메인의 웹 루트 `/`에서 제공하세요. `/assets/`, `/resume.html`, `/downloads/` 경로를 그대로 제공하면 이미지, 글꼴, PDF, 이력서와 기존 다운로드 파일을 열 수 있습니다. `/#project/crew/16` 같은 주소의 `#` 뒤 부분은 브라우저에서 처리합니다. GitHub 저장소에 소스를 보관하고 OCI에서 호스팅하는 경우에도 동일합니다. `/Portfolio/` 같은 하위 경로에 올리려면 경로 조정이 필요합니다.

### Docker로 확인하기

위 빌드 명령을 실행한 폴더에서 아래 명령을 실행한 뒤 브라우저에서 `http://localhost:8080/`을 엽니다.

```sh
docker compose up -d --build
```

기존 Dockerfile은 완성된 `dist/`를 Nginx 이미지에 복사합니다. OCI로 이미지를 옮길 때는 서버와 이미지의 아키텍처를 맞추세요. x86 인스턴스는 `linux/amd64`, Ampere A1 인스턴스는 `linux/arm64`입니다. OCI 이전 절차는 [배포 가이드](docs/DEPLOYMENT.md)를 참고하세요.

### 내보내기 검증

`npm ci`와 `npm run build`를 실행했습니다. 생성된 HTML·CSS·JavaScript 및 정적 리소스 77개를 운영 사이트의 파일과 SHA-256으로 비교해 모두 일치함을 확인했습니다. 빌드 결과를 별도 로컬 주소에서 열어 첫 화면, MyCrewSoft 상세와 ERD 목차 이동, 도면 확대, 이력서 링크와 인쇄 버튼 표시도 확인했습니다.

[외부 서비스와 ChatGPT Sites 의존성](docs/EXTERNAL-DEPENDENCIES.md)에 CDN 글꼴, 외부 링크, 플랫폼 설정과 선택적 글꼴 자체 호스팅 방법을 정리했습니다.


## 동일 저장소에서 OCI와 GitHub Pages를 서로 다른 화면으로 운영

- [OCI 개발자 소개 사이트](https://jaehoon93.duckdns.org/): 기존 React/Vite 코드와 Docker CI/CD로 배포
- [GitHub Pages PDF 포트폴리오](https://sksqlrlek.github.io/Portfolio/): `legacy-pdf/index.html` 및 `portfolio.pdf`를 정적 게시
- 자세한 구성 및 PDF 교체 방법은 [두 사이트 배포 가이드](docs/DUAL-DEPLOYMENT.md)를 참고하세요.
