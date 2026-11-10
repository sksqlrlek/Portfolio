# Portfolio → OCI my-free-server: Docker CI/CD

## 배포 대상 (반드시 구분)

| 서비스 | OCI 인스턴스 | 공인 IP | 저장소 |
| --- | --- | --- | --- |
| NO.BLACK | NO.BLACK | 168.107.49.54 | sksqlrlek/noblack |
| **개발자 Portfolio** | **my-free-server** | **158.180.71.120** | **sksqlrlek/Portfolio** |

**이 프로젝트의 OCI 배포 명령은 오직 158.180.71.120의 ubuntu 사용자에게만 전송합니다.** NO.BLACK 서버, 도커 컨테이너 및 데이터베이스는 수정하지 않습니다.

## 아키텍처

- PR: GitHub Actions → React/Vite 포함 Docker 이미지 빌드 → Nginx HTTP 스모크 테스트.
- main push: 동일 빌드/테스트 → 커밋 SHA로 태그 → Docker image tar.gz를 Actions Artifact로 저장.
- GHCR(선택): `GHCR_PUBLISH_TOKEN`이 존재할 때 이미지 태그 `ghcr.io/sksqlrlek/jaehun-portfolio-web:<SHA>`와 `latest`를 게시합니다. 현재 기본 `GITHUB_TOKEN` 방식은 GHCR에서 `denied`로 실패한 이력이 있어 사용하지 않습니다.
- OCI 배포(SSH 키/호스트키/변수 준비 후 자동): 검증한 이미지 아카이브를 SCP로 **my-free-server**에 전달 → `docker load` → `docker compose up -d` → 로컬 HTTP 검증 → 실패 시 이전 컨테이너 이미지로 복구를 시도합니다.
- HTTPS(선택, 도메인 연결 후): 포트 80/443에서 별도 Caddy 컨테이너가 TLS 인증서를 자동 발급·갱신하고 web 컨테이너에 프록시합니다.

서버가 1 OCPU/1GB이므로 npm 빌드 및 Docker 이미지 **빌드는 GitHub runner에서만 수행**합니다. OCI에서는 이미지 로드와 실행만 수행합니다.

## GitHub에 필요한 설정

Repository → **Settings → Secrets and variables → Actions**:

| 종류 | 키 | 값 / 역할 |
| --- | --- | --- |
| Secret | `OCI_SSH_PRIVATE_KEY` | ubuntu 계정의 authorized_keys에 등록한 배포 키의 **개인키** (이 채팅에 보내지 마세요) |
| Secret | `OCI_SSH_KNOWN_HOSTS` (또는 기존 `OCI_KNOWN_HOSTS`) | **검증한** 158.180.71.120 SSH 서버 공개 호스트키의 known_hosts 한 줄 |
| Variable | `OCI_DEPLOY_ENABLED` (또는 기존 `PORTFOLIO_OCI_DEPLOY_ENABLED`) | 모든 연결·권한 준비 후 `true` |
| Secret (선택) | `GHCR_PUBLISH_TOKEN` | GHCR 패키지 쓰기 권한을 갖는 별도 GitHub 토큰 (없어도 OCI의 직접 배포는 가능) |
| Variable (선택) | `PORTFOLIO_PUBLIC_URL` | 인증서 발급 후 확인할 `https://...` 실제 포트폴리오 주소 |

SSH의 사용자명은 `ubuntu`로 고정, 대상 공인 IP는 워크플로에서 **158.180.71.120**으로 고정합니다.

### SSH 키 안전하게 준비하기

예전에 `oci-portfolio` 키로 **my-free-server**에 접속했던 경우 그 배포용 키를 재사용할 수 있습니다. GitHub Secret에는 **개인키 원문**을 저장하고 파일을 Git 저장소에 올리지 마세요.

호스트키는 이미 신뢰할 수 있게 접속한 서버에서 `ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub`의 지문을 확인하고, 내 PC에서 `ssh-keyscan -t ed25519 158.180.71.120` 결과가 그 키와 일치하는지 대조한 뒤 Secret `OCI_SSH_KNOWN_HOSTS`에 저장합니다. **검증 없이 ssh-keyscan 결과를 신뢰하거나 StrictHostKeyChecking을 해제하지 마세요.**

`OCI_DEPLOY_ENABLED` 또는 `PORTFOLIO_OCI_DEPLOY_ENABLED`를 지정하지 않으면 Docker CI는 통과해도 OCI 배포 Job은 건너뜁니다. 이것은 서버에 배포가 완료되었다는 의미가 아닙니다.

## 서버 최초 준비 (my-free-server만)

GitHub에는 SSH 키가 연결되어 있어도 OCI 서버에 Docker와 Compose가 설치되어 있어야 합니다. 기존 배포 키로 다음 환경을 확인합니다.

~~~bash
ssh ubuntu@158.180.71.120
docker --version
docker compose version
docker ps
curl --version
~~~

Docker가 없다면 [Docker 공식 Ubuntu 설치 가이드](https://docs.docker.com/engine/install/ubuntu/)에 따라 설치합니다. `ubuntu` 사용자가 sudo 없이 `docker ps`와 `docker compose`를 실행할 수 있어야 합니다. **docker 그룹은 호스트의 root급 권한이므로 배포 키와 계정을 별도로 보호하세요.**

자동 배포 시 서버에는 `/home/ubuntu/portfolio` 폴더가 생깁니다. Docker Compose의 웹 서비스명은 `web`, 컨테이너 이름은 `jaehun-portfolio-web`, 바인딩은 **127.0.0.1:8781 → 컨테이너 80**입니다. 서버 외부에서 8781로 직접 접근하지 못하게 설계했습니다.

확인 명령:

~~~bash
docker ps --filter name=jaehun-portfolio-web
curl -f http://127.0.0.1:8781/
cd ~/portfolio && docker compose --env-file .env -f compose.yaml ps
~~~

HTTP 체크에 실패하면 `remote-deploy.sh`가 이전 이미지로 롤백을 시도하고 Actions 배포 Job을 실패 처리합니다. 이전 배포 이미지가 없으면 최초 배포 실패를 알리고 컨테이너를 제거합니다.

## HTTPS 연결 (도메인/방화벽 준비 후)

Caddy는 초기 자동 배포로 **자동 기동하지 않습니다.** 서버의 80/443 포트가 이미 사용 중인지 확인한 뒤 기동합니다. 사용 중인 서비스를 덮어쓰지 않습니다.

1. 포트폴리오에 쓸 도메인의 **DNS A 레코드**를 `158.180.71.120`으로 연결합니다.
2. OCI 서브넷 보안 목록/NSG와 서버 방화벽에서 인바운드 TCP 80, 443을 허용합니다.
3. 서버에서 다른 프로세스가 80/443을 사용하지 않는지 `sudo ss -ltnp | grep -E ':(80|443) '`로 확인합니다.
4. 최초 정상적인 `web` 배포 이후 **my-free-server**에서 실행합니다.

~~~bash
cd ~/portfolio
printf 'PORTFOLIO_DOMAIN=portfolio.example.com\n' > .env.https
chmod 600 .env.https
docker compose --env-file .env --env-file .env.https \
  -f compose.yaml -f compose.https.yaml up -d
~~~

`portfolio.example.com`은 예시이며 반드시 **실제 사용할 도메인**으로 바꿔야 합니다. Caddy는 DNS 및 외부 포트가 정상이라면 HTTPS 인증서를 발급하고 `web:80`으로 프록시합니다. 이후 main push 시 웹 컨테이너만 교체되고 프록시는 유지됩니다. HTTPS가 실제로 동작한 뒤 선택 변수 `PORTFOLIO_PUBLIC_URL`을 실제 주소로 설정하면 Actions 배포 마지막에 외부 접속을 검증합니다.

## 운영·롤백

- 이미지 태그는 커밋 SHA로 고정해 동일 배포의 식별성을 유지합니다.
- `~/portfolio/deployed-commit`에 마지막 성공 배포 SHA를 기록합니다.
- 장애 발생 시 `~/portfolio/.env.previous` 파일을 참조하여 이전 Docker 이미지를 다시 띄울 수 있습니다.
- GitHub Actions가 업로드한 이미지 아카이브는 서버 배포 성공 후 삭제합니다. 이미지는 Docker 저장소에 남으며 서버 용량은 주기적으로 점검해야 합니다.
- `docker compose down -v`를 무작정 실행하지 마세요. HTTPS용 Caddy 인증서 볼륨을 지울 수 있습니다.
- 인스턴스 도메인·보안 설정과 OCI 접근 권한 없이 **HTTPS 운영 완료라고 간주하지 마세요.**

## CI/CD 검증 기준

1. PR의 `Build, smoke test, package image` Job 성공.
2. main Push의 빌드 Job과 Docker 아카이브 Artifact 업로드 성공.
3. GHCR 선택 게시: 별도 publishing token이 설정된 경우 이미지 태그 및 push 로그 확인.
4. `OCI_DEPLOY_ENABLED=true` (또는 `PORTFOLIO_OCI_DEPLOY_ENABLED=true`) 후 `Deploy to my-free-server` Job 성공.
5. OCI 컨테이너와 포트 8781 확인.
6. DNS/TLS 준비 후 브라우저 및 GitHub Actions의 HTTPS 검사 성공.

GitHub Pages는 OCI와 독립적인 기존 별도 배포 경로입니다.
