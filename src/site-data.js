// 홈 화면에 쓰는 내용을 모아 둔 파일입니다. 문구를 바꾸려면 여기만 수정하면 됩니다.
// 이미지 경로는 public/ 기준이고, 굵게 표시할 부분은 <b>, 코드 표기는 <code>를 씁니다.

export const profile = {
  name: '한재훈',
  role: 'Full-stack Developer · Java·Spring + React',
  email: 'sksqlrlek@gmail.com',
  github: 'https://github.com/sksqlrlek',
  photo: '/assets/profile-photo.jpg',
};

// 개발 단계와 색. 사이트 전체에서 같은 의미로만 씁니다.
export const stageOrder = ['an', 'de', 'dv', 'te', 'dp'];
export const stages = {
  an: { label: '분석', en: 'ANALYZE' },
  de: { label: '설계', en: 'DESIGN' },
  dv: { label: '개발', en: 'BUILD' },
  te: { label: '테스트', en: 'TEST' },
  dp: { label: '배포', en: 'DEPLOY' },
};

export const hero = {
  headline: ['문제의 원인을 끝까지 파고들고,', '분석·설계부터 직접', '하는 개발자입니다'],
  intro: '6년간 비영리 단체 팀장으로 일하며 <b>반복되는 불편을 시스템으로 풀고 싶어</b> 개발자가 되었습니다. Java·Spring을 중심으로 요구사항 분석부터 배포까지 경험했고, 트랜잭션 경계·인증 흐름·외부 API 예외까지 함께 고민합니다.',
  // 첫 화면 오른쪽 목록: 흐름 순서의 근거. 누르면 해당 프로젝트 상세의 그 단계로 이동합니다.
  proofs: [
    { stage: 'an', icon: 'doc', title: '문서와 ERD를 먼저 씁니다', stageText: '분석 · 설계', project: 'MyCrewSoft', desc: '요구사항 정의·유스케이스부터 ERD 3종, 화면설계서 8장까지 직접 작성', href: '#project/crew/analysis' },
    { stage: 'dv', icon: 'code', title: '팀의 공통 구조를 설계합니다', stageText: '개발', project: 'MyCrewSoft', desc: 'AA로 공통 API 응답·전역 예외 처리·계층 규칙과 Git 협업 가이드 정리', href: '#project/crew/build' },
    { stage: 'te', icon: 'check', title: '근거로 완료를 확인합니다', stageText: '테스트', project: 'NO.BLACK', desc: 'Playwright·JUnit·MockMvc로 화면 조작부터 트랜잭션·CSRF까지 검사', href: '#project/noblack/test' },
    { stage: 'dp', icon: 'cloud', title: '실서비스를 운영합니다', stageText: '배포 · 운영', project: 'NO.BLACK', desc: 'GitHub Actions 검사를 통과하면 GHCR → OCI 자동 배포, NO.BLACK 운영 중', href: '#project/noblack/deploy' },
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
    image: { src: '/assets/crew-dashboard.webp', w: 1090, h: 726, alt: 'MyCrewSoft 대시보드 화면', url: 'mycrewsoft / dashboard' },
    lead: '<b>AA로 공통 API 응답·전역 예외 처리·계층 규칙을 설계</b>하고, 협업 가이드를 배포해 4인 팀의 개발 기준을 세웠습니다.',
    points: [
      '화상회의 녹취 → STT → LLM 회의록 → 전자결재 기안까지 자동 연결',
      'Spring Event·AFTER_COMMIT으로 메신저·알림을 느슨하게 연결',
      '대시보드 12종 위젯, 6개 도메인 통합검색, WebSocket 메신저',
    ],
    stages: ['an', 'de', 'dv', 'te'],
    tech: [['java', 'Java 21'], ['spring', 'Spring Boot'], ['', 'MyBatis'], ['oracle', 'Oracle'], ['react', 'React'], ['', 'LiveKit']],
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
    period: '2026.08 —',
    name: 'NO.BLACK',
    sub: '침구 브랜드 쇼케이스 + 관리자 CMS',
    image: { src: '/assets/noblack-room.webp', w: 1319, h: 774, alt: 'NO.BLACK 나만의 방 운영 화면', url: 'oooooo.kr/room' },
    lead: '더플라에서 NO.BLACK으로 브랜드를 바꾸며 받은 <b>실제 의뢰</b>입니다. 요구사항 정리부터 설계·개발·테스트·배포·운영까지 혼자 맡았습니다.',
    points: [
      '고객은 퇴근길 게임 → 나만의 방 → 제품 → 오늘의집 구매로 이동',
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
    meta: '팀 프로젝트 · TA',
    period: '2026.02 — 03',
    name: 'Cinema Talk',
    sub: '영화 커뮤니티',
    image: { src: '/assets/cinema.webp', w: 1078, h: 937, alt: 'Cinema Talk 메인 화면', url: 'cinema-talk' },
    lead: '프레임워크 없이 FrontController·Action·Properties 매핑으로 Servlet 기반 MVC 구조를 직접 구현했습니다. 선호 장르 기반 추천, TMDB 데이터 수집, 관리자 통계를 만들었습니다.',
    stages: ['an', 'de', 'dv', 'te'],
    tech: [['java', 'Java 21'], ['', 'Servlet/JSP'], ['', 'MyBatis'], ['oracle', 'Oracle']],
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
  { project: 'NO.BLACK', stage: 'te', stageText: '테스트로 재발 방지', title: '늦게 끝난 이전 API 응답이 현재 화면을 덮어썼다', summary: '분류·페이지 전환 뒤 이전 요청 결과가 남음 → <code>AbortController</code>와 요청 키로 <b>마지막 선택의 결과만 표시</b>', href: '#project/noblack/case-01' },
];

// 기술: 로고 파일 이름(public/assets/tech/<이름>.svg), 표시 이름. 로고가 없으면 이름만 씁니다.
export const mainSkills = [
  { logo: 'java', name: 'Java 21', used: '세 프로젝트 모두' },
  { logo: 'spring', name: 'Spring Boot', used: 'MyCrewSoft · NO.BLACK' },
  { logo: '', mark: 'MB', name: 'MyBatis', used: 'MyCrewSoft · Cinema Talk' },
  { logo: 'oracle', name: 'Oracle', used: 'MyCrewSoft · Cinema Talk' },
  { logo: 'react', name: 'React', used: 'MyCrewSoft · NO.BLACK' },
  { logo: 'typescript', name: 'TypeScript', used: 'MyCrewSoft · NO.BLACK' },
];

export const skillGroups = [
  ['BACKEND', [['spring', 'Spring Security'], ['', 'JPA'], ['', 'Servlet/JSP'], ['', 'JWT']]],
  ['FRONTEND', [['javascript', 'JavaScript'], ['html5', 'HTML5'], ['css3', 'CSS3'], ['jquery', 'jQuery'], ['tailwindcss', 'Tailwind']]],
  ['DATA', [['postgresql', 'PostgreSQL'], ['redis', 'Redis'], ['', 'Flyway']]],
  ['DEVOPS · TEST', [['docker', 'Docker'], ['githubactions', 'GitHub Actions'], ['', 'OCI'], ['playwright', 'Playwright'], ['junit', 'JUnit']]],
  ['설계 · 협업', [['', 'ERD'], ['', '유스케이스'], ['', '화면설계서'], ['git', 'Git'], ['notion', 'Notion'], ['figma', 'Figma']]],
];

export const career = [
  { when: '2025.12 — 2026.07', title: '대덕인재개발원', sub: '풀스택 개발자 양성과정', desc: '전자정부 프레임워크 & React(AWS) 기반 과정. Java·Spring·Oracle·React와 분석·설계·구현·테스트를 배우고 Cinema Talk(TA)·MyCrewSoft(AA)를 진행했습니다.' },
  { when: '2019.01 — 2024.12', title: '제자들선교회', sub: '팀장 · 6년', desc: '강의·행정·행사 기획과 진행, 온라인 송출과 홍보 콘텐츠 제작을 맡았습니다. 참여자 간 일정과 역할을 조율하며 협업을 이끌었습니다.' },
  { when: '2012.03 — 2018.02', title: '한밭대학교', sub: '산업경영공학과 학사' },
];

export const certs = [
  { date: '2026.03', name: 'SQL 개발자(SQLD)', result: '최종합격', by: '한국데이터베이스진흥센터' },
  { date: '2025.09', name: '정보처리기사', result: '필기합격', by: '한국산업인력공단' },
  { date: '2014.12', name: '정보처리기능사', result: '최종합격', by: '한국산업인력공단' },
  { date: '2012.12', name: '정보기술자격(ITQ) 한글파워포인트 A등급', result: '최종합격', by: '한국생산성본부(KPC)' },
  { date: '2012.12', name: '정보기술자격(ITQ) 한글엑셀 A등급', result: '최종합격', by: '한국생산성본부(KPC)' },
  { date: '2012.04', name: '1종 보통 운전면허', result: '최종합격', by: '경찰청(운전면허시험관리단)' },
  { date: '2010.02', name: '워드프로세서 1급', result: '최종합격', by: '대한상공회의소' },
];
