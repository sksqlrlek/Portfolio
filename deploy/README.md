# Portfolio OCI 배포 준비

## 인스턴스 구분

| 서비스 | OCI 인스턴스 | 공인 IP | 저장소 |
| --- | --- | --- | --- |
| NO.BLACK | NO.BLACK | 168.107.49.54 | sksqlrlek/noblack |
| 개발자 Portfolio | my-free-server | **158.180.71.120** | **sksqlrlek/Portfolio** |

서로 다른 OCI 인스턴스입니다. 이 저장소의 배포 단계에서는 NO.BLACK 서버에 접근하지 않습니다.

## 구현 상태

1. GitHub Actions가 React + Vite 앱의 Docker 이미지를 빌드합니다.
2. 빌드 컨테이너의 Nginx에 HTTP 스모크 테스트를 수행합니다.
3. GHCR 자동 게시 단계는 **기본 비활성화**입니다. GitHub 기본 GITHUB_TOKEN을 이용한 게시가 `denied` 오류로 실패해, 권한을 확인한 후 활성화해야 합니다.
4. 이 폴더의 Compose 파일은 실제 OCI에서 아직 실행하지 않았습니다.
5. OCI에서 자동 pull/restart하는 CD 단계도 아직 없습니다.

## GHCR 게시 활성화에 필요한 값

GitHub 저장소 Settings → Secrets and variables → Actions:
- Repository secret: `GHCR_PUBLISH_TOKEN` — 패키지 게시 권한(write:packages)이 있는 GitHub PAT. 공개 채팅/파일에 토큰을 넣지 않습니다.
- Repository variable: `GHCR_PUBLISH_ENABLED` — 검증 후 `true`로 설정합니다.

워크플로는 `main` push 시 GHCR의
`ghcr.io/sksqlrlek/jaehun-portfolio-web:latest`
및 커밋 SHA 태그를 게시하도록 구성되어 있습니다.

GHCR Package가 비공개 상태이면 OCI에서 Pull할 때 별도 `read:packages` 인증이 필요합니다. 공개 사이트용 이미지는 GHCR 패키지 설정에서 Public으로 전환할 수도 있습니다.

## OCI 서버에서 수행할 작업 (미실행)

**작업 대상: my-free-server (158.180.71.120)만.**

- SSH/Bastion 인증 정상화
- `docker compose version` 확인 및 Docker 설치 여부 확인
- `/home/ubuntu/portfolio/`에 `deploy/compose.yaml` 배치 (실제 로그인 사용자와 경로를 확인한 뒤 결정)
- GHCR 이미지 Pull 및 Compose 컨테이너 실행
- 기존 Nginx/Caddy/웹 서버 포트 80·443 사용 상태 확인
- 기존 웹 서버가 `127.0.0.1:8781`로 프록시하도록 설정하거나, 별도 도메인이 있으면 HTTPS 라우팅
- 배포 자동 갱신과 롤백 절차 구성, 외부 접속 확인

Compose는 안전하게 로컬 인터페이스 `127.0.0.1:8781:80`만 열도록 했습니다. 따라서 별도 프록시가 없는 상태에서는 공인 IP로 이 포트에 접속할 수 없습니다. 아직 서버의 기존 컨테이너/네트워크/설정을 변경하지 않았습니다.

메모리가 1GB이므로 OCI 서버에서 `npm install`, `vite build`, `docker build`를 수행하지 않고 GitHub Actions에서 미리 완성한 이미지만 내려받는 것을 권장합니다.
