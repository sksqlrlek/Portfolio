# Han Jaehun — Developer Portfolio

React 19 + Vite 기반 개인 포트폴리오입니다. 이전 PDF 포트폴리오와 프로젝트 자산은 유지했습니다.

## 구성
- Intro / About
- MyCrewSoft: AA · 그룹웨어 공통 아키텍처, 통합 검색, 대시보드
- NO.BLACK: 실제 브랜드 의뢰 프로젝트, React·Spring Boot·PostgreSQL·Docker
- Cinema Talk: JSP·MyBatis·Oracle 기반 MVC 웹 프로젝트
- Tech & Process / Contact

**참고:** 주어진 chatgpt.site 페이지에서 원본 코드를 직접 다운로드할 수 없어, 이전에 합의한 디자인 설명과 프로젝트 자료를 바탕으로 별도 구현했습니다. NO.BLACK 픽셀룸은 정확한 스크린샷이 아닌 SVG 재구성 이미지입니다.

## 로컬 실행
Node.js 22.12 이상을 준비하고 VS Code에서 저장소 루트 터미널을 엽니다.

    npm install
    npm run dev

http://localhost:5173 에서 확인합니다.

    npm run build
    npm run preview

Vite 빌드 결과물은 dist 폴더에 생성됩니다.

## GitHub Pages
main 브랜치 push 시 .github/workflows/pages.yml이 빌드·배포됩니다. 처음에는 GitHub 저장소 Settings > Pages > Build and deployment > Source를 GitHub Actions로 바꿔야 합니다.

## Docker
    docker build -t jaehun-portfolio .
    docker run --rm -p 8781:80 --name jaehun-portfolio jaehun-portfolio

http://localhost:8781 에서 확인합니다. OCI 서버에 실제 자동배포하려면 기존 NO.BLACK 리버스 프록시, 도메인, 인증정보를 검증한 다음 별도 CD 설정이 필요합니다.

## 구조
- src/App.jsx: 화면과 상호작용
- src/styles.css: 스타일 및 모바일 반응형
- public/assets: 프로젝트 이미지
- Dockerfile: Vite 빌드 + Nginx
- nginx.conf: 정적 파일과 캐시 정책
- .github/workflows/pages.yml: GitHub Pages 배포

## 검토 사항
- NO.BLACK 실 운영 주소: https://oooooo.kr/ (사용자 제공 주소; 외부 접속 확인 전)
- NO.BLACK 현재 픽셀룸 컨셉 이미지는 실제 운영 스크린샷으로 교체
- NO.BLACK GitHub 저장소가 비공개라면 외부에서 접근할 수 없음
- 모든 프로젝트 문구와 실제 구현 범위 대조
