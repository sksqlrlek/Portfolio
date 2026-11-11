# 포트폴리오 자료 구성

| 자료 | 사이트에서 보는 위치 |
| --- | --- |
| 이력서 | 홈 첫 화면 소개, 경력·교육, 자격증 7개 (`src/site-data.js`) |
| 포트폴리오 PDF 3–5쪽 | 첫 화면의 성향 문구와 '분석부터 배포까지' 근거 목록 |
| 포트폴리오 PDF 6–13쪽 | Cinema Talk 상세 — 01 분석 ~ 04 테스트 (`src/project-details.js`) |
| 포트폴리오 PDF 14–26쪽 | MyCrewSoft 상세 — 01 분석 ~ 04 테스트, 트러블슈팅, 회고 |
| NO.BLACK 저장소 `README.md` | NO.BLACK 상세 — 01 분석 ~ 05 배포, 트러블슈팅 |

상세 페이지는 PDF 쪽 순서가 아니라 개발 단계 순서로 다시 묶었습니다. ERD, 유스케이스, 시퀀스, 화면설계서, 아키텍처 그림은 `public/assets/`의 원본을 쓰고, 누르면 크게 열립니다.

## 확인할 사항

- MyCrewSoft의 `MessengerEventListener` 코드 발췌는 PDF 22쪽에 있던 오타(`class` 대신 `void`, 괄호 누락)를 바로잡아 표시합니다. 실제 코드와 다르면 `src/project-details.js`에서 고쳐 주세요.
- '내 PR' 링크의 개수(백엔드 72 · 프론트엔드 64 · Cinema Talk 19)는 2026-11-11 GitHub 기준입니다.
- NO.BLACK 저장소는 비공개라 상세에 '비공개' 안내만 둡니다.
- 연락처 이메일은 PDF와 같은 `sksqlrlek@gmail.com`으로 통일했습니다.
- 예전 화면에서 쓰던 `public/assets/portfolio-pages/`(PDF 쪽 이미지), `public/resume.html`, `public/assets/noblack-readme.md`는 지금 사이트에서 링크하지 않지만 지우지 않고 남겨 두었습니다.
