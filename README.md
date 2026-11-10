# 한재훈 개발자 포트폴리오

React + Vite 정적 포트폴리오. 첫 화면에는 이름과 개발자 소개를 담고, 대표 작업은 MyCrewSoft, NO.BLACK, Cinema Talk 순서로 배치했습니다. 색상과 분위기는 원본 PDF를 기준으로 했습니다. 데스크톱은 왼쪽 목차와 표지형 소개를 사용하고, 모바일에서는 상단 메뉴와 한 열 구성을 사용합니다.

## VS Code에서 시작

Node.js 22 LTS를 설치하고 압축을 푼 폴더를 VS Code로 엽니다.

```powershell
npm.cmd ci
npm.cmd run dev
```

터미널에 표시되는 로컬 주소를 엽니다. `npm ci`는 잠금 파일에 기록한 의존성을 설치하고, `npm run dev`는 개발 서버를 실행합니다.

## 수정 위치

- `src/data.js`: 프로젝트 소개, 역할, 기술과 링크
- `src/main.jsx`: 첫 화면과 해시 주소 처리
- `src/portfolio-reader.jsx`: 프로젝트별 목차, 상세 읽기 화면과 원본 PDF 뷰어
- `src/portfolio-content.jsx`와 `src/content/`: 원본 내용을 옮긴 웹 본문. HTML 파일 이름은 PDF 쪽 번호입니다.
- `src/portfolio-pages.js`: 원본 PDF 쪽수와 개별 자료 연결
- `src/noblack-readme.js`: NO.BLACK README의 웹 표시용 내용
- `src/style.css`: 색상·폰트·반응형 레이아웃
- `public/resume.html`: 공개용 이력서와 인쇄/PDF 저장
- `public/assets/`: 프로필·프로젝트 원본 이미지·포트폴리오 PDF
- `docs/CONTENT.md`: 자료 출처와 확인할 사항
- `docs/DEPLOYMENT.md`: OCI 배포 가이드

## 기능

각 프로젝트 카드에서 상세 페이지로 이동합니다. 설명은 웹 본문, API 명세는 표, 코드 예시는 복사 가능한 코드 블록으로 읽을 수 있습니다. 목차에서 특정 항목으로 이동한 주소(예: `#project/crew/16`)를 공유할 수 있습니다. 원본 27쪽은 `#portfolio`에서 읽고 확대할 수 있습니다.

## 빌드

```powershell
npm.cmd run build
npm.cmd run preview
```

`dist`가 완성된 정적 사이트입니다. Spring/DB/Node 상시 프로세스는 필요 없습니다. 이력서의 인쇄 버튼은 브라우저 인쇄창에서 PDF로 저장할 수 있게 합니다.

`PortfolioContent`는 PDF 쪽 번호에 대응하는 웹 본문과 원본 PDF 링크를 표시합니다. `PortfolioSheet`는 원본 자료 화면의 확대와 고해상도 이미지를 처리합니다. NO.BLACK은 README의 문서 순서와 본문을 사용합니다.

코드와 함께 제공하는 이미지·PDF는 사용자 프로젝트 자료이며, 원본 권리는 각 권리자에게 있습니다. 포트폴리오의 한글 본문은 로컬에 포함한 Pretendard Variable을 사용합니다. 글꼴 라이선스는 `public/assets/fonts/Pretendard-LICENSE.txt`에서 확인할 수 있습니다.

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
