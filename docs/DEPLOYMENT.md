# OCI 배포

대상은 my-free-server입니다. 현재 NO.BLACK 서버를 변경하지 않습니다. 이 작업에서는 OCI에 접속하거나 배포하지 않았습니다.

## 가장 간단한 방식: dist 파일 업로드

1. PC의 VS Code에서 `npm.cmd ci`와 `npm.cmd run build` 실행.
2. 생성된 dist 폴더 안의 파일을 my-free-server 웹 루트에 업로드.
3. Nginx 웹 루트를 해당 폴더로 설정. 참고 설정은 deploy/nginx.conf.
4. DNS의 A 레코드를 my-free-server 공인 IP에 연결. OCI 방화벽과 Ubuntu 방화벽의 HTTP/HTTPS 허용 확인.
5. 실제 도메인을 정한 뒤 인증서를 구성. 이 저장소의 Nginx 예시는 HTTP이며 HTTPS 인증서는 포함하지 않습니다.

서버 기존 서비스와 포트 사용 상태를 먼저 확인하세요. NO.BLACK 도메인/DNS를 변경할 필요가 없습니다.

## Docker 방식

PC 또는 CI에서 빌드하고 이미지 생성:

```sh
npm ci
npm run build
docker build -t jaehun-portfolio:1 .
docker save -o jaehun-portfolio.tar jaehun-portfolio:1
```

이미지 tar를 my-free-server로 복사한 뒤:

```sh
docker load -i jaehun-portfolio.tar
docker run -d --name jaehun-portfolio --restart unless-stopped --memory=128m -p 8080:80 jaehun-portfolio:1
```

8080 포트 사용 여부를 확인하고 실행합니다. 이 명령은 기존 컨테이너를 제거하지 않습니다. 운영에서는 도메인 앞단의 Nginx/Caddy로 HTTPS를 적용하고 8080은 필요에 따라 내부로 제한합니다. 서버와 같은 linux/amd64 아키텍처 이미지로 빌드해야 합니다.

Dockerfile은 이미 빌드된 dist를 복사합니다. 서버에서 npm 빌드를 실행할 필요가 없습니다.

## 공개 전 확인

- 이메일은 포트폴리오 PDF와 같은 sksqlrlek@gmail.com으로 통일했습니다.
- 원본 포트폴리오 PDF는 기존 자료 그대로이며 NO.BLACK이 포함되지 않습니다.
- NO.BLACK은 운영 사이트(https://oooooo.kr/)를 연결했습니다. 저장소는 비공개라 링크 대신 안내 문구를 둡니다.
- 정보처리기사는 이력서에 적힌 필기 합격만 반영했습니다.
- NO.BLACK CMS 내용은 첨부 README 기준입니다. 실제 운영 배포 여부와 본인이 설명 가능한 기여 범위를 최종 확인하세요.
