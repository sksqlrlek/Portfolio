# Portfolio 저장소 한 곳에서 두 사이트 배포하기

## 주소와 표시 화면

| 서비스 | 주소 | 배포 산출물 |
| --- | --- | --- |
| OCI | https://jaehoon93.duckdns.org/ | React/Vite 개발자 소개 사이트 |
| GitHub Pages | https://sksqlrlek.github.io/Portfolio/ | 기존 PDF 전체 화면 |

하나의 `main` 브랜치에서 **배포 파이프라인만 분리**합니다.

- `.github/workflows/docker-image.yml`: 기존대로 `Dockerfile`을 이용해 React/Vite를 빌드하고, Chromium으로 화면을 검사한 후 `main`에만 OCI 배포합니다.
- `.github/workflows/pages.yml`: React를 빌드하지 않고 `legacy-pdf/index.html`과 저장소 최상위의 `portfolio.pdf`만 GitHub Pages에 게시합니다.
- `.github/workflows/pages-legacy-check.yml`: PR에서 PDF 화면의 파일과 빌드 산출물을 검증합니다.

## PDF 화면의 원본

`legacy-pdf/index.html`은 2026-06-25 커밋 `f8e40bea1d5f4e94247c45a567b9657b5e66208e`에 있던 **기존 전체 화면 PDF iframe 디자인**입니다. PDF 파일은 현재 저장소 루트의 `portfolio.pdf`를 재사용합니다.

다음 두 파일이 GitHub Pages 배포의 전부입니다.

```text
Portfolio/
├── index.html                 # OCI React 진입점
├── src/                       # OCI React 소스
├── portfolio.pdf              # GitHub Pages PDF
├── legacy-pdf/
│   └── index.html             # GitHub Pages 전용 PDF 화면
├── Dockerfile                 # OCI 전용
└── .github/workflows/
    ├── docker-image.yml       # OCI
    ├── pages.yml              # GitHub Pages
    └── pages-legacy-check.yml # PR에서 PDF 검증
```

## 변경과 배포

- React 소개 사이트를 수정하려면 `src/`, `index.html`, `public/`을 수정해 PR을 만들고 `main`에 병합합니다.
- PDF를 갱신하려면 저장소 최상위의 `portfolio.pdf`를 교체해 PR을 만들고 `main`에 병합합니다.
- PDF 화면 자체를 수정하려면 `legacy-pdf/index.html`을 변경합니다.
- `main` 병합 시 두 워크플로가 모두 실행되더라도, 각 주소는 위에서 정한 **자신의 파일**만 배포합니다. 따라서 React를 수정했다고 PDF 화면이 React로 바뀌지 않습니다.
- PDF는 브라우저 내장 PDF 뷰어를 사용하므로 화면 표시 및 다운로드 방식은 브라우저에 따라 다를 수 있습니다.

## 로컬에서 GitHub Pages 내용 검증

```bash
bash scripts/build-pages-pdf.sh
```

생성되는 `dist/index.html`과 `dist/portfolio.pdf`는 **PDF 화면**을 위한 결과물입니다. OCI Docker 이미지는 별도 환경에서 React를 새로 빌드하며 이 `dist` 폴더를 사용하지 않습니다.

## 롤백과 운영 주의

이 설정 변경은 `Dockerfile`, `deploy/compose.yaml`, Caddy 또는 OCI 서버를 수정하지 않습니다. 전환 후 PDF 화면이 기대와 다르면 이 PR의 Pages 워크플로 변경을 되돌릴 수 있습니다. Git 히스토리에는 이전 버전이 남습니다.
