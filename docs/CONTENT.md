# 포트폴리오 자료 구성

| 자료 | 사이트에서 보는 위치 |
| --- | --- |
| 이력서 | 홈 첫 화면 소개, 경력·교육, 개발 관련 자격증 3개 (`src/site-data.js`) |
| 포트폴리오 PDF 3–5쪽 | 첫 화면의 성향 문구와 '분석부터 배포까지' 근거 목록 |
| 포트폴리오 PDF 6–13쪽 | Cinema Talk 상세 — 01 분석 ~ 04 테스트 (`src/project-details.js`) |
| 포트폴리오 PDF 14–26쪽 | MyCrewSoft 상세 — 01 분석 ~ 04 테스트, 트러블슈팅, 회고 |
| MyCrewSoft 대시보드·회의 목록·일정 캘린더·관리자 화면 2종 | MyCrewSoft 상세 상단의 브라우저 틀 — 드래그·터치·방향키·버튼으로 다섯 화면 전환 |
| 사용자 제공 메신저 화면 정의서 | MyCrewSoft 상세 — 02 설계의 '설계 산출물 더 보기' 두 번째 이미지 |
| 사용자 제공 로그인·로그아웃 요구사항 정의서 | MyCrewSoft 상세 — 02 설계의 '설계 산출물 더 보기' 세 번째 이미지 |
| 사용자 제공 용어 사전 | MyCrewSoft 상세 — 02 설계의 '설계 산출물 더 보기' 네 번째 이미지 |
| N°BLACK 저장소 `README.md` | N°BLACK 상세 — 01 분석 ~ 05 배포, 트러블슈팅 |

상세 페이지는 PDF 쪽 순서가 아니라 개발 단계 순서로 다시 묶었습니다. ERD, 유스케이스, 시퀀스, 화면설계서, 아키텍처 그림은 `public/assets/`의 원본을 쓰고, 누르면 크게 열립니다.

MyCrewSoft의 구현 화면 네 장은 설계 산출물 목록에서 상세 상단으로 옮겼습니다. `src/project-details.js`의 `shot`과 `screens`가 화면 목록을 정의하고, `src/project-screens.jsx`가 전환·드래그·확대 버튼을 담당합니다. 설계 산출물에는 시퀀스 다이어그램·화면 정의서·요구사항 정의서·용어 사전과 API 명세를 표시합니다.

## 화면 문구 기준

- 개발 단계는 **분석 → 설계 → 개발 → 테스트 → 배포**로 통일하고, 첫 화면·프로젝트 목록·상세 목차에서 `src/site-data.js`의 `stages[key].label`을 공통으로 사용합니다.
- 화면 제목, 기술 분류, 단계·사례·결과 표시는 한글로 작성합니다. 기술명·프로젝트명·코드·주소는 원래 표기를 사용합니다.

## 확인할 사항

- 메신저 화면 정의서는 사용자가 제공한 팀 산출물입니다. `imagegen` 내장 편집 도구에 '작성자 이름만 지우고 나머지 화면·문구·표를 유지'하도록 요청한 결과를 `public/assets/portfolio-files/crew-screen-definition.webp`에 저장했습니다.
- 요구사항 정의서는 `imagegen` 내장 편집 도구에 '기존 여섯 요구사항과 ID·날짜·빈 권한 셀을 유지하고 표를 가로로 넓혀 머리글·요구사항 ID·중분류를 한 줄로 표시'하도록 요청한 결과입니다. 편집본은 `public/assets/portfolio-files/crew-requirements-definition.webp`에 저장했습니다.
- 용어 사전은 `imagegen` 내장 편집 도구에 '기존 아홉 용어와 물리명·자료형·설명을 유지하고 제목·머리글·물리명·자료형을 한 줄로 표시하며 색상을 차분한 청회색으로 통일'하도록 요청한 결과입니다. `NO`와 `TYPE`은 '번호'와 '자료형'으로 표시하고, 편집본은 `public/assets/portfolio-files/crew-glossary.webp`에 저장했습니다.
- MyCrewSoft 대시보드·회의 목록·일정 캘린더와 테스트 시나리오 2~4단계 화면은 공개 저장소(`myCrewSoft/mycrew-frontend`, `mycrew-backend`)의 최종 코드를 모의 API와 가상 인물·회의 데이터로 띄워 2026-11-13에 다시 캡처했습니다. 예전 캡처에 남아 있던 테스트 데이터(`null`, `dddd`, Whisper 무음 환각 자막 등)를 없애기 위해서입니다. 회의록은 백엔드 `MtngMomAiService`의 HTML 양식을 그대로 쓰고 LLM이 채우는 다섯 블록만 예시로 넣었습니다. 화상회의 화면은 LiveKit 서버 대신 캡처용 가짜 모듈로 띄웠고, 결재 화면의 상태 코드(`01`·`02`)는 실제 화면 표시 그대로 두었습니다. 회의 예약 화면(1단계)과 관리자 화면 2종은 개발 당시 캡처입니다.
- MyCrewSoft의 `MessengerEventListener` 코드는 실제 코드(2026-11-11 확인)에서 들여쓰기만 정리해 실었고, 참여자 추가·제외 핸들러 두 개는 생략 표시로 줄였습니다. PDF 22쪽에 있던 `@Async`는 실제 메신저 리스너에 없어 뺐고, `@Async`는 실제로 쓰는 알림·AI 회의록 처리에만 표기합니다.
- '내 PR' 링크의 개수(백엔드 72 · 프론트엔드 64 · Cinema Talk 19)는 2026-11-11 GitHub 기준입니다.
- N°BLACK 저장소는 비공개라 상세에 '비공개' 안내만 둡니다.
- 연락처 이메일은 PDF와 같은 `sksqlrlek@gmail.com`으로 통일했습니다.
- 예전 화면에서 쓰던 `public/assets/portfolio-pages/`(PDF 쪽 이미지), `public/resume.html`, `public/assets/noblack-readme.md`는 지금 사이트에서 링크하지 않지만 지우지 않고 남겨 두었습니다.
