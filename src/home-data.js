// 홈 화면에 쓰는 내용만 모아둔 파일입니다. 문구를 바꾸고 싶으면 여기만 수정하세요.
// 이미지 경로는 public/assets/ 기준입니다.
export const proofs = [
  ['실서비스 배포 1건', 'NO.BLACK · 실제 고객 의뢰'],
  ['설계 산출물 직접 작성', 'ERD 3종 · 유스케이스 · 시퀀스 · 화면설계서'],
  ['검색 API 호출 80% 이상 절감', '250ms 디바운싱, 크롬 Network 탭으로 실측'],
];

export const stages = [
  { id: 'analysis', name: '분석', tone: 'coral', lead: '무엇을 만들지 먼저 정의합니다.',
    outputs: ['요구사항 정의서', '유스케이스 다이어그램', '기능 목록표', '단위 업무 정의서'],
    shots: [['MyCrewSoft 유스케이스', 'portfolio-files/crew-use-case.png']] },
  { id: 'design', name: '설계', tone: 'gold', lead: '구조와 데이터를 그림으로 남깁니다.',
    outputs: ['ERD', '시스템 아키텍처', '화면설계서', 'API 명세서'],
    shots: [['MyCrewSoft ERD', 'portfolio-files/crew-erd.png'], ['MyCrewSoft 시퀀스', 'portfolio-files/crew-sequence.png'],
      ['MyCrewSoft 화면설계서', 'portfolio-files/crew-wireframe-1.png'], ['MyCrewSoft 아키텍처', 'portfolio-content/crew-architecture.svg']] },
  { id: 'build', name: '개발', tone: 'fern', lead: '백엔드와 프론트엔드를 함께 구현합니다.',
    outputs: ['Git 브랜치 전략 적용', 'PR · 코드 리뷰', '커밋 컨벤션 준수'],
    shots: [['MyCrewSoft 대시보드', 'crew-dashboard.webp'], ['Cinema Talk 메인', 'cinema.webp']] },
  { id: 'test', name: '테스트', tone: 'sage', lead: '만든 기능이 맞게 동작하는지 확인합니다.',
    outputs: ['단위 테스트 코드', '통합 테스트 코드', '버그 리포트 · 수정 내역'], shots: [] },
  { id: 'deploy', name: '배포', tone: 'lavender', lead: '직접 배포하고 운영합니다.',
    outputs: ['Docker Compose · Caddy(HTTPS) 배포 구성', 'GitHub Actions 검사 후 GHCR·OCI 자동 배포', 'NO.BLACK 실서비스 운영', '이 포트폴리오 사이트도 직접 배포'],
    shots: [['NO.BLACK 배포 구성', 'noblack-diagrams/deployment.svg'], ['NO.BLACK 픽셀룸', 'noblack-room.webp']] },
];

export const cards = [
  { id: 'crew', tone: 'fern', name: 'MyCrewSoft', kind: '팀 프로젝트 · 그룹웨어 · 2026.05–06',
    role: 'AA로 백엔드 공통 아키텍처를 설계하고, 협업 가이드를 작성·배포해 4인 팀의 개발 기준을 정리했습니다.',
    result: 'LiveKit 녹취 → Whisper STT → LLM 회의록 → 전자결재 기안까지 자동 연결', image: 'crew-dashboard.webp',
    alt: 'MyCrewSoft 그룹웨어 대시보드', done: ['분석', '설계', '개발', '테스트'],
    tags: ['Java 21', 'Spring Boot', 'Spring Security', 'React', 'LiveKit'], detail: '#project/crew' },
  { id: 'noblack', tone: 'copper', name: 'NO.BLACK', kind: '실제 의뢰 · 브랜드 웹사이트 · 1인 개발',
    role: '침구 브랜드의 의뢰로 혼자 설계·개발·배포한 픽셀룸 쇼케이스입니다.',
    result: '고객은 오늘의집에서 구매하고, 운영자는 CMS에서 상품과 안내를 직접 관리', image: 'noblack-room.webp',
    alt: 'NO.BLACK 픽셀룸 화면', done: ['설계', '개발', '배포'],
    tags: ['React', 'TypeScript', 'Spring Boot', 'PostgreSQL', 'Docker'], detail: '#project/noblack',
    live: 'https://oooooo.kr/', room: 'https://oooooo.kr/room' },
  { id: 'cinema', tone: 'lavender', name: 'Cinema Talk', kind: '팀 프로젝트 · 영화 커뮤니티 · 2026.02–03',
    role: '프레임워크 없이 FrontController와 Action 인터페이스로 MVC 패턴을 직접 구현했습니다.',
    result: 'TMDB 데이터 멀티스레드 수집과 선호 장르 기반 추천', image: 'cinema.webp',
    alt: 'Cinema Talk 영화 커뮤니티 화면', done: ['분석', '설계', '개발'],
    tags: ['Java 21', 'Servlet/JSP', 'MyBatis', 'Oracle DB'], detail: '#project/cinema' },
];

export const cases = [
  { tone: 'coral', title: '회의 종료 API 타임아웃', where: 'MyCrewSoft',
    problem: '화상회의 종료 요청이 외부 API 응답 지연으로 타임아웃됐습니다.',
    cause: 'Whisper STT, LLM 회의록, 결재 기안 생성이 DB 트랜잭션 안에서 동기로 실행되고 있었습니다.',
    fix: 'MeetingEndedEvent를 발행하고 @TransactionalEventListener(AFTER_COMMIT)와 @Async로 커밋 이후 비동기 처리했습니다.',
    result: '회의 종료와 후속 자동화가 서로 영향을 주지 않습니다.' },
  { tone: 'gold', title: 'WebSocket에서 송신자를 모르는 문제', where: 'MyCrewSoft',
    problem: '실시간 메신저에서 메시지를 보낸 사용자를 식별하지 못했습니다.',
    cause: 'Spring Security 필터는 HTTP에만 적용되고 STOMP 메시지 흐름에는 적용되지 않았습니다.',
    fix: 'ChannelInterceptor에서 CONNECT 시 JWT를 검증하고 Principal을 주입했습니다. wrap() 대신 getAccessor()를 써야 변경이 반영됐습니다.',
    result: '이후 SEND·SUBSCRIBE에서 별도 인증 없이 사원 ID를 사용합니다.' },
  { tone: 'fern', title: '통합검색 요청 폭주', where: 'MyCrewSoft',
    problem: '검색창에 한 글자만 입력해도 대형 쿼리가 10회 이상 발생했습니다.',
    cause: '자모 입력마다 API를 호출해 서버와 DB에 불필요한 LIKE 검색이 쌓였습니다.',
    fix: '250ms 디바운싱을 적용해 입력이 끝난 뒤 한 번만 요청합니다.',
    result: '크롬 Network 탭 실측으로 API 호출이 80% 이상 줄었습니다.' },
  { tone: 'lavender', title: '화상회의 중심 설계의 한계', where: 'MyCrewSoft',
    problem: '오프라인 회의는 회의록과 결재 대상이 될 수 없는 구조였습니다.',
    cause: '구현 기술(LiveKit) 기준으로 설계해 "회의"라는 상위 도메인이 빠져 있었습니다.',
    fix: 'TB_MTNG를 상위 도메인으로 신설하고 회의록을 MTNG_ID 기준으로 재구성했습니다.',
    result: '온라인·오프라인·혼합 회의가 같은 회의록과 결재 흐름을 씁니다.' },
];

export const skills = [
  ['Backend', ['Java', 'Spring Boot', 'Spring Security', 'MyBatis', 'JPA', 'REST API']],
  ['Frontend', ['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'jQuery']],
  ['Data', ['Oracle DB', 'PostgreSQL', 'Redis', 'ERD 설계']],
  ['Infra · 협업', ['Docker', 'Git/GitHub', 'Swagger', 'Notion', 'Figma']],
];
