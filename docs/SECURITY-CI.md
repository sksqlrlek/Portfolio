# Portfolio CI — 민감 파일 검사

이 저장소는 React/Vite로 빌드한 정적 포트폴리오를 Docker/Nginx로 배포합니다.

## PR에서 진행하는 보안 검사

`.github/workflows/secret-scan.yml`은 PR·main push·수동 실행 시 독립된 잡을 실행합니다.

1. **민감한 파일 경로 검사** — `python3 scripts/check-sensitive-paths.py`가 Git에서 추적 중인 파일을 확인하고 `.env`, 개인키, 서비스 계정 파일 등의 커밋을 차단합니다.
2. **Gitleaks 비밀정보 검사** — Git 전체 이력을 받아 API 키, 토큰, 비밀번호 등이 코드나 Git 이력에 포함돼 있는지 패턴으로 확인합니다. 이 검사는 탐지 기반이므로 모든 종류의 비밀정보 유출을 보장해서 막지는 못합니다.

`.env.example` 등 예시 환경 파일명은 허용하지만 **내용은 Gitleaks가 검사**합니다. 임의로 예외를 추가하거나 유출을 확인하지 않고 탐지 결과를 무시하지 마세요.

## 실패했을 때

- GitHub → Portfolio → Actions → `Portfolio Secret Scan` → 실패한 단계에서 **파일 경로 또는 탐지 유형**을 확인합니다.
- 실수로 추적한 파일은 `git rm --cached <파일명>`으로 추적을 해제하고 `.gitignore`에 추가합니다.
- 이미 커밋에 들어간 실제 비밀값은 **즉시 폐기·재발급(rotate)** 해야 합니다. 현재 커밋에서 삭제하거나 `.gitignore`에 추가하는 것만으로 과거 Git 이력의 노출이 사라지지는 않습니다.
- GitHub Actions의 SSH 개인키 등은 저장소 파일이 아니라 **Settings → Secrets and variables → Actions**의 암호화된 Secret에 보관합니다.

## 운영 배포와의 관계

보안 검사 워크플로는 Docker 이미지나 OCI 서버를 변경하지 않습니다. 기존 `docker-image.yml`은 PR에서 빌드·Chromium 렌더링을 검증하고, main에서만 OCI 배포를 수행합니다.

**주의:** 보안 검사를 병합 필수 조건으로 강제하려면 GitHub 저장소의 브랜치 보호 규칙(또는 Repository Ruleset)에서 `Check tracked files and Git secrets` 상태 검사를 Required로 지정해야 합니다. 이 문서나 워크플로를 추가하는 것만으로 GitHub가 병합을 자동 차단하지는 않습니다.
