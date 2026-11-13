// 홈 화면에 쓰는 내용을 모아 둔 파일입니다. 문구를 바꾸려면 여기만 수정하면 됩니다.
// 이미지 경로는 public/ 기준이고, 굵게 표시할 부분은 <b>, 코드 표기는 <code>를 씁니다.

export const profile = {
  name: '한재훈',
  role: '풀스택 개발자 · Java·Spring + React',
  email: 'sksqlrlek@gmail.com',
  github: 'https://github.com/sksqlrlek',
  photo: '/assets/profile-photo.jpg',
};

// 개발 단계와 색. 사이트 전체에서 label의 한글 단계명을 공통으로 씁니다.
export const stageOrder = ['an', 'de', 'dv', 'te', 'dp'];
export const stages = {
  an: { label: '분석' },
  de: { label: '설계' },
  dv: { label: '개발' },
  te: { label: '테스트' },
  dp: { label: '배포' },
};

export const hero = {
  headline: ['문제의 원인을 끝까지 파고들고,', '분석·설계부터 직접', '하는 개발자입니다'],
  intro: 'Java·Spring을 중심으로 사용자 요청부터 데이터 처리까지의 흐름을 이해하며 구현합니다. 기능의 완성도뿐 아니라 <b>유지보수성과 안정성</b>을 함께 고려하고, 새로운 기술을 학습해 적용한 뒤 테스트로 검증합니다. 팀의 피드백을 적극적으로 수용하고, 맡은 기능은 책임감 있게 완성합니다.',
  // 첫 화면 오른쪽 목록: 흐름 순서의 근거. 누르면 해당 프로젝트 상세의 그 단계로 이동합니다.
  proofs: [
    { stage: 'an', icon: 'doc', title: '문서와 ERD를 먼저 씁니다', stageText: '분석 · 설계', project: 'MyCrewSoft', desc: '요구사항 정의·유스케이스부터 ERD 3종, 시퀀스 다이어그램까지 직접 작성', href: '#project/crew/analysis' },
    { stage: 'dv', icon: 'code', title: '팀의 공통 구조를 설계합니다', stageText: '개발', project: 'MyCrewSoft', desc: 'AA로 19장의 협업 가이드 작성 — 공통 응답·전역 예외 처리·계층·Git 규칙', href: '#project/crew/build' },
    { stage: 'te', icon: 'check', title: '근거로 완료를 확인합니다', stageText: '테스트', project: 'N°BLACK', desc: 'Playwright·JUnit·MockMvc로 화면 조작부터 트랜잭션·CSRF까지 검사', href: '#project/noblack/test' },
    { stage: 'dp', icon: 'cloud', title: '실서비스를 운영합니다', stageText: '배포 · 운영', project: 'N°BLACK', desc: 'GitHub Actions 검사를 통과하면 GHCR → OCI 자동 배포, N°BLACK 운영 중', href: '#project/noblack/deploy' },
  ],
};

// PR 수는 2026-11-11 GitHub 기준입니다.
const prList = (repo) => `https://github.com/${repo}/pulls?q=is%3Apr+author%3Asksqlrlek`;
// 저장소가 여러 개인 조직은 조직 전체 PR 검색으로 연결합니다(로그인 없이 열림).
const orgPrs = (org) => `https://github.com/search?q=org%3A${org}+author%3Asksqlrlek+is%3Apr&type=pullrequests`;

export const projects = [
  {
    id: 'crew',
    layout: 'feature',
    badge: { type: 'main', text: '메인 프로젝트' },
    meta: '팀 프로젝트 · 4인 · AA',
    period: '2026.05 — 06',
    name: 'MyCrewSoft',
    sub: 'Spring Boot · React 통합 그룹웨어',
    image: { src: '/assets/crew-dashboard.webp', w: 1680, h: 980, alt: 'MyCrewSoft 대시보드 화면', url: 'mycrewsoft / dashboard' },
    lead: '<b>AA로 공통 API 응답·전역 예외 처리·계층 규칙을 설계</b>하고, 협업 가이드를 배포해 4인 팀의 개발 기준을 세웠습니다.',
    points: [
      '화상회의 녹취 → STT → LLM 회의록 → 전자결재 기안까지 자동 연결',
      'Spring Event·AFTER_COMMIT으로 메신저·알림을 느슨하게 연결',
      '알림·AI 회의록은 @Async로 메인 트랜잭션과 분리',
      '대시보드 11종 위젯, 6개 도메인 통합검색, WebSocket 메신저',
    ],
    stages: ['an', 'de', 'dv', 'te'],
    tech: [['java', 'Java 21'], ['spring', 'Spring Boot'], ['mybatis', 'MyBatis'], ['oracle', 'Oracle'], ['react', 'React'], ['', 'LiveKit']],
    links: [
      { label: 'GitHub', href: 'https://github.com/myCrewSoft' },
      { label: '내 PR 136개', href: orgPrs('myCrewSoft'), title: '백엔드 72개 · 프론트엔드 64개' },
    ],
  },
  {
    id: 'noblack',
    layout: 'feature',
    reverse: true,
    badge: { type: 'live', text: '운영 중인 실서비스' },
    meta: '실제 브랜드 의뢰 · 1인',
    period: '2026.09 — 11',
    name: 'N°BLACK',
    sub: '침구 브랜드 쇼케이스 + 관리자 CMS',
    image: { src: '/assets/noblack-room.webp', w: 1319, h: 774, alt: 'N°BLACK 나만의 방 운영 화면', url: 'oooooo.kr/room' },
    lead: '침구 브랜드 N°BLACK의 <b>실제 의뢰</b>입니다. 대표와 회의하며 요구사항을 정하고, 설계부터 테스트·배포까지 1인으로 개발했습니다.',
    points: [
      '퇴근길 게임 → 나만의 방 → 제품 → 오늘의집 구매로 이어지는 게임형 화면',
      '화면 비율별 방 카메라, 키보드·조이스틱·터치 조작, 모바일 전용 제품 화면',
      '초안·게시본을 나눈 CMS, 동시 수정 시 409 Conflict로 최신 내용 보호',
      'GitHub Actions 검사를 통과하면 GHCR → OCI 자동 배포',
    ],
    stages: ['an', 'de', 'dv', 'te', 'dp'],
    tech: [['react', 'React 19'], ['typescript', 'TypeScript'], ['spring', 'Spring Boot'], ['postgresql', 'PostgreSQL'], ['docker', 'Docker'], ['githubactions', 'GitHub Actions']],
    live: 'https://oooooo.kr/',
  },
  {
    id: 'cinema',
    layout: 'compact',
    meta: '팀 프로젝트 · 5인',
    period: '2026.02 — 03',
    name: 'Cinema Talk',
    sub: '영화 커뮤니티',
    image: { src: '/assets/cinema.webp', w: 1078, h: 937, alt: 'Cinema Talk 메인 화면', url: 'cinema-talk' },
    lead: '프레임워크 없이 Servlet으로 만든 MVC 구조에서 개발하며 요청·데이터 흐름을 직접 익혔습니다. 선호 장르 기반 추천과 관리자 통계·영화 관리 기능을 만들었습니다.',
    stages: ['an', 'de', 'dv', 'te'],
    tech: [['java', 'Java 21'], ['', 'Servlet/JSP'], ['mybatis', 'MyBatis'], ['oracle', 'Oracle']],
    links: [
      { label: 'GitHub', href: 'https://github.com/TaeSeungJeon/Cinema_Talk' },
      { label: '내 PR 19개', href: prList('TaeSeungJeon/Cinema_Talk') },
    ],
  },
];

// '문제 해결' 목록. 누르면 해당 프로젝트 상세의 그 사례로 바로 이동합니다.
export const troubles = [
  { project: 'MyCrewSoft', stage: 'de', stageText: '설계 단계 문제', title: '화상회의 중심으로 설계해, 오프라인 회의는 회의록·결재를 쓸 수 없었다', summary: "'회의' 상위 도메인이 빠진 것이 원인 → <code>TB_MTNG</code>를 신설해 <b>온라인·오프라인·혼합 회의를 하나의 흐름으로 통합</b>", href: '#project/crew/case-01' },
  { project: 'MyCrewSoft', stage: 'te', stageText: '테스트 중 발견', title: '검색어 한 단어에 대형 검색 쿼리가 10번 넘게 실행됐다', summary: '자모마다 API를 호출한 것이 원인 → 250ms 디바운싱으로 <b>API 호출 80% 이상 감소</b> (Network 탭 실측)', href: '#project/crew/case-02' },
  { project: 'MyCrewSoft', stage: 'dv', stageText: '개발 단계 문제', title: '화상회의를 끝내면 회의 종료 API가 타임아웃됐다', summary: '외부 AI API 호출이 트랜잭션 안에서 동기 실행 → <code>AFTER_COMMIT</code> + <code>@Async</code>로 <b>종료 처리와 후속 자동화 분리</b>', href: '#project/crew/case-03' },
  { project: 'N°BLACK', stage: 'de', stageText: '설계 단계 문제', title: '게임형 첫 화면에 집중하다 보니, 제품을 고르고 사러 가는 길이 멀어졌다', summary: '브랜드 체험과 바로 구매하려는 목적을 나누지 않은 것이 원인 → MY ROOM과 ITEMS에서 <b>같은 제품 상세로 이어지는 두 동선 제공</b>', href: '#project/noblack/case-01' },
];

// 기술: 로고 파일 이름(public/assets/tech/<이름>.svg), 표시 이름. 로고가 없으면 이름만 씁니다.
export const mainSkills = [
  { logo: 'java', name: 'Java 21', used: '세 프로젝트 모두' },
  { logo: 'spring', name: 'Spring Boot', used: 'MyCrewSoft · N°BLACK' },
  { logo: 'mybatis', name: 'MyBatis', used: 'MyCrewSoft · Cinema Talk' },
  { logo: 'oracle', name: 'Oracle', used: 'MyCrewSoft · Cinema Talk' },
  { logo: 'react', name: 'React', used: 'MyCrewSoft · N°BLACK' },
  { logo: 'typescript', name: 'TypeScript', used: 'MyCrewSoft · N°BLACK' },
];

export const skillGroups = [
  ['백엔드', [['spring', 'Spring Security'], ['hibernate', 'JPA (Hibernate)'], ['', 'Servlet/JSP'], ['jwt', 'JWT']]],
  ['프론트엔드', [['javascript', 'JavaScript'], ['html5', 'HTML5'], ['css3', 'CSS3'], ['jquery', 'jQuery'], ['tailwindcss', 'Tailwind']]],
  ['데이터', [['postgresql', 'PostgreSQL'], ['redis', 'Redis'], ['flyway', 'Flyway']]],
  ['배포 · 운영 · 테스트', [['docker', 'Docker'], ['githubactions', 'GitHub Actions'], ['', 'OCI'], ['playwright', 'Playwright'], ['junit', 'JUnit']]],
  ['설계 · 협업', [['', 'ERD'], ['', '유스케이스'], ['', '시퀀스 다이어그램'], ['github', 'GitHub'], ['notion', 'Notion'], ['figma', 'Figma']]],
];

export const career = [
  { when: '2025.12 — 2026.07', title: '대덕인재개발원', sub: '풀스택 개발자 양성과정', desc: '전자정부 프레임워크 & React(AWS) 기반 과정. Java·Spring·Oracle·React와 분석·설계·구현·테스트를 배우고 Cinema Talk·MyCrewSoft(AA)를 진행했습니다.' },
  { when: '2019.01 — 2024.12', title: '제자들선교회', sub: '비개발 직무 · 기획·운영 팀장 · 6년', desc: '강의·행정·행사 기획과 진행, 온라인 송출과 홍보 콘텐츠 제작을 맡았습니다. 참여자 간 일정과 역할을 조율하며 협업을 이끌었습니다.' },
  { when: '2012.03 — 2018.02', title: '한밭대학교', sub: '산업경영공학과 학사' },
];

export const certs = [
  { date: '2026.03', name: 'SQL 개발자(SQLD)', result: '최종합격', by: '한국데이터베이스진흥센터' },
  { date: '2025.09', name: '정보처리기사', result: '필기합격', by: '한국산업인력공단' },
  { date: '2014.12', name: '정보처리기능사', result: '최종합격', by: '한국산업인력공단' },
];
