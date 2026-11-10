# 외부 서비스와 ChatGPT Sites 의존성

| 항목 | 사용 범위 | 다른 서버에서의 동작 |
| --- | --- | --- |
| Google Fonts | `/resume.html`에서 Noto Sans KR 400·600·800을 불러옵니다. 스타일시트는 `fonts.googleapis.com`, 글꼴은 `fonts.gstatic.com`에서 제공합니다. | CDN 연결을 그대로 사용합니다. CDN에 연결할 수 없는 경우 원본 이력서의 대체 글꼴인 `sans-serif`가 적용됩니다. 아래 절차로 글꼴을 직접 제공할 수 있습니다. |
| GitHub | 개인 프로필, 프로젝트 저장소와 NO.BLACK 문서·코드 링크입니다. | 링크를 눌렀을 때 GitHub로 이동합니다. |
| NO.BLACK 운영 사이트 | `oooooo.kr`의 홈과 MY ROOM을 외부 탭에서 엽니다. | 대상 사이트의 공개 상태에 따라 열립니다. |
| npm 레지스트리 | `npm ci`가 빌드에 필요한 패키지를 받습니다. | 설치 시 필요합니다. 빌드된 파일은 Nginx 등으로 제공할 수 있습니다. |
| Docker Hub | Dockerfile의 `nginx:stable-alpine` 기본 이미지를 제공합니다. | 로컬에 기본 이미지가 없다면 Docker 이미지 빌드 시 가져옵니다. |
| 브라우저 기능 | 이메일 복사, 이력서 인쇄/PDF 저장, PDF 보기입니다. | 이메일 복사는 HTTPS 또는 localhost의 보안 컨텍스트에서 브라우저가 허용할 때 동작합니다. 복사에 실패하면 기존 `mailto:` 동작이 실행됩니다. 인쇄와 PDF 표시는 브라우저 기능을 사용합니다. |

포트폴리오 메인 화면의 Pretendard Variable과 라이선스는 원본 `public/assets/fonts/`에 있습니다. 이미지·도면·PDF와 원래 배포본에 들어 있던 `public/downloads/jaehun-portfolio.zip`도 원본 위치에 포함했습니다. 다운로드 폴더 안의 ZIP은 운영 사이트가 이미 제공하던 파일입니다.

## ChatGPT Sites 설정

`.openai/hosting.json`은 기존 프로젝트 ID와 배포 폴더 `dist`를 기록합니다. 일반 웹서버에서는 `dist`의 정적 파일을 직접 제공하면 됩니다. 이 버전의 포트폴리오 실행에는 ChatGPT 로그인, Sites API, 환경 변수, 데이터베이스, Workers, 연결 앱이나 MCP 서버가 필요하지 않습니다. NO.BLACK 상세 문서에 등장하는 Spring Boot, PostgreSQL, 외부 API 등은 해당 프로젝트의 기술 설명입니다.

## 선택 사항 · 이력서 글꼴을 직접 제공하기

ZIP의 `docs/optional-local-fonts/noto-sans-kr/`에는 Google Fonts가 Chromium에 제공한 Noto Sans KR의 WOFF2 파일 124개, CSS와 SIL Open Font License 고지가 있습니다. 함께 제공한 CSS는 원래 글꼴 선언을 유지하고 글꼴 URL만 같은 폴더를 기준으로 한 상대경로로 지정합니다.

1. `docs/optional-local-fonts/noto-sans-kr/` 폴더를 `public/assets/fonts/noto-sans-kr/`로 복사합니다.
2. 배포할 사본의 `public/resume.html`에서 Google Fonts의 `@import` 주소를 `/assets/fonts/noto-sans-kr/noto-sans-kr.css`로 바꿉니다.
3. `npm run build`로 다시 빌드합니다.

내보낸 원본 `public/resume.html`에는 기존 CDN 주소가 들어 있습니다.

- [원본 Google Fonts 스타일시트](https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;600;800&display=swap)
- [Noto Sans KR 라이선스 원문](https://github.com/google/fonts/blob/main/ofl/notosanskr/OFL.txt)
