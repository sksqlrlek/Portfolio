// 프로젝트 상세 페이지 내용. 모든 프로젝트를 같은 순서(한눈에 보기 → 01 분석 → … → 05 배포 → 트러블슈팅 → 회고)로 정리합니다.
// 출처: MyCrewSoft·Cinema Talk는 포트폴리오 PDF 본문, NO.BLACK은 저장소 README.
// 문자열의 <b>, <code>, <a href="#project/..."> 는 그대로 HTML로 표시됩니다.
//
// 블록 종류(t): p, h3, point, figure, gallery, table, bullets, steps, code, fold, reqs, feats, scenario, note

const prList = (repo) => `https://github.com/${repo}/pulls?q=is%3Apr+author%3Asksqlrlek`;

const crew = {
  id: 'crew',
  name: 'MyCrewSoft',
  badge: { type: 'main', text: '메인 프로젝트' },
  meta: ['2026.05 — 2026.06 · 8주', '4인 팀 · 교육과정 프로젝트'],
  lead: '<b>AA(애플리케이션 아키텍트)</b>로 공통 API 응답·전역 예외 처리·계층 규칙을 설계하고 협업 가이드를 배포해, 4인 팀의 개발 기준을 세운 통합 그룹웨어입니다.',
  actions: [
    { label: 'GitHub 저장소', href: 'https://github.com/myCrewSoft' },
    { label: '백엔드 PR 72', href: prList('myCrewSoft/mycrew-backend'), title: '내가 작성한 백엔드 PR' },
    { label: '프론트엔드 PR 64', href: prList('myCrewSoft/mycrew-frontend'), title: '내가 작성한 프론트엔드 PR' },
  ],
  shot: { src: '/assets/crew-dashboard.webp', w: 1090, h: 726, url: 'mycrewsoft / dashboard', alt: 'MyCrewSoft 대시보드 화면', caption: '대시보드 · 직원별로 배치를 저장하는 12종 위젯' },
  quote: '통합 그룹웨어 — 대덕인재개발원 풀스택 과정 팀 프로젝트, 10개 이상 도메인',
  stages: ['an', 'de', 'dv', 'te'],
  glance: {
    tiles: [
      { label: '기간', value: '2026.05 – 06', sub: '8주' },
      { label: '인원', value: '4인 팀', sub: '교육과정 프로젝트' },
      { label: '내 역할', value: 'AA · 풀스택', sub: '공통 아키텍처 설계', strong: true },
      { label: '규모', value: '10개+ 도메인', sub: '회의·결재·메신저 등' },
    ],
    chainLabel: '핵심 결과',
    chain: ['화상회의 녹취', 'Whisper STT', 'LLM 회의록', '전자결재 기안'],
    chainNote: '회의가 끝나면 회의록 초안과 결재 기안까지 자동으로 이어지고, 담당자가 검토한 뒤 확정합니다.',
    did: [
      { stage: 'de', mark: 'AA', text: '공통 API 응답·예외 처리·계층 규칙과 협업 가이드' },
      { stage: 'dv', mark: '01', text: '화상회의 → AI 회의록 → 전자결재 자동화' },
      { stage: 'dv', mark: '02', text: 'SSE 실시간 알림과 WebSocket 메신저' },
      { stage: 'dv', mark: '03', text: '대시보드 12종 위젯, 6개 도메인 통합검색' },
    ],
    stack: [
      ['Frontend', [['react', 'React'], ['typescript', 'TypeScript'], ['tailwindcss', 'Tailwind CSS'], ['vitejs', 'Vite']]],
      ['Backend', [['java', 'Java 21'], ['spring', 'Spring Boot'], ['spring', 'Spring Security'], ['', 'MyBatis'], ['', 'JWT']]],
      ['Data', [['oracle', 'Oracle'], ['redis', 'Redis']]],
      ['실시간', [['', 'WebSocket(STOMP)'], ['', 'SSE'], ['', 'LiveKit']]],
      ['협업', [['github', 'GitHub'], ['', 'Redmine']]],
    ],
  },
  sections: [
    {
      id: 'analysis', stage: 'an', title: '요구사항을 행위자와 기능으로 정리했습니다',
      blocks: [
        { t: 'p', html: '요구사항을 행위자·기능 단위의 유스케이스로 정리한 뒤, 핵심 흐름은 시퀀스 다이어그램으로 이어서 설계했습니다.' },
        { t: 'figure', src: '/assets/portfolio-files/crew-use-case.png', w: 648, h: 312, alt: 'MyCrewSoft 유스케이스 다이어그램', caption: '유스케이스 다이어그램' },
      ],
    },
    {
      id: 'design', stage: 'de', title: '구조와 데이터를 먼저 그렸습니다',
      blocks: [
        { t: 'p', html: 'React SPA → Spring Boot → Oracle·Redis의 3계층으로 나누고, 도메인끼리 강하게 묶이지 않도록 Spring Event 기반 비동기 구조를 택했습니다. HTTP와 WebSocket 모두에 JWT 인증을 적용했습니다.' },
        { t: 'figure', src: '/assets/portfolio-content/crew-architecture.svg', w: 1040, h: 660, alt: 'MyCrewSoft 시스템 아키텍처', caption: '시스템 아키텍처' },
        { t: 'table', rows: [
          ['클라이언트', 'React · TypeScript — LiveKit Client SDK, EventSource, Axios'],
          ['서버', 'Spring Boot · Java 21 — Controller → Service → MyBatis Mapper, Spring Security, Spring Event'],
          ['데이터', 'Oracle DB · Redis — JSON CLOB, MERGE, Refresh Token, TTL'],
          ['외부 연동', 'LiveKit Cloud, OpenAI Whisper, LLM, 공공 API, Google OAuth'],
        ] },
        { t: 'h3', text: '회의 도메인 ERD' },
        { t: 'point', text: '설계 포인트 · 3NF 정규화 · 1:N 관계 · ID 인덱스' },
        { t: 'figure', src: '/assets/portfolio-files/crew-erd.png', w: 1237, h: 757, alt: 'MyCrewSoft 회의 도메인 ERD', caption: 'ERD · 회의·화상회의 도메인' },
        { t: 'table', rows: [
          ['TB_MTNG', '통합 회의 관리 (오프라인·온라인)'],
          ['TB_MTNG_PTCPT', '회의 참여자 관리'],
          ['TB_MTNG_MOM', '회의록 관리 (결재 테이블과 논리 FK)'],
          ['TB_MTNG_MOM_HIST', '회의록 수정 이력'],
          ['TB_VIDEO_CONF', '화상회의 관리'],
          ['TB_VIDEO_RCRDG', '화상회의 녹취록'],
        ] },
        { t: 'fold', title: '설계 산출물 더 보기', sub: '시퀀스 다이어그램 · 화면설계서 4장 · API 명세', blocks: [
          { t: 'gallery', items: [
            { src: '/assets/portfolio-files/crew-sequence.png', w: 1279, h: 569, alt: '화상회의 생성 시퀀스 다이어그램', caption: '시퀀스 · 화상회의 생성' },
            { src: '/assets/portfolio-files/crew-wireframe-1.png', w: 1149, h: 842, alt: '화면설계서 1', caption: '화면설계서 1' },
            { src: '/assets/portfolio-files/crew-wireframe-2.png', w: 942, h: 851, alt: '화면설계서 2', caption: '화면설계서 2' },
            { src: '/assets/portfolio-files/crew-wireframe-3.png', w: 1099, h: 855, alt: '화면설계서 3', caption: '화면설계서 3' },
            { src: '/assets/portfolio-files/crew-wireframe-4.png', w: 960, h: 747, alt: '화면설계서 4', caption: '화면설계서 4' },
          ] },
          { t: 'table', head: ['Method', 'Endpoint', '설명'], rows: [
            ['POST', '<code>/api/meetings</code>', '회의 생성'],
            ['GET', '<code>/api/meetings/{mtngId}/minutes</code>', '회의록 조회 (AI 자동 생성)'],
            ['PUT', '<code>/api/meetings/{mtngId}/minutes</code>', 'AI 생성 회의록 수정'],
            ['POST', '<code>/api/dashboard/widgets/{type}</code>', '위젯별 독립 데이터 조회'],
            ['POST', '<code>/api/search?keyword=</code>', '6개 도메인 통합검색'],
            ['PUT', '<code>/api/notifications/subscribe</code>', 'SSE 실시간 알림 구독'],
            ['DEL', '<code>/api/reservations/{id}</code>', '회의실 예약 취소'],
          ] },
        ] },
      ],
    },
    {
      id: 'build', stage: 'dv', title: 'AA로 공통 기준을 세우고, 회의록 자동화를 구현했습니다',
      blocks: [
        { t: 'h3', text: '팀 공통 아키텍처' },
        { t: 'bullets', items: [
          '<b>공통 API 응답 형식</b>과 <b>전역 예외 처리</b>를 먼저 정해 4명이 같은 형태로 응답·에러를 다루게 했습니다.',
          'DTO·VO·Mapper 계층 기준과 feature 브랜치·커밋 규칙을 <b>AA 협업 가이드</b>로 정리해 배포했습니다.',
        ] },
        { t: 'h3', text: 'AI 회의록 → 전자결재 파이프라인' },
        { t: 'steps', items: [
          { title: '음성 캡처', desc: 'LiveKit 화상회의 오디오' },
          { title: 'Whisper STT', desc: '5초 단위 자막 변환' },
          { title: '대화 로그', desc: '발언자·시간 단위 누적' },
          { title: 'LLM 회의록', desc: '로그 근거 HTML 생성' },
          { title: '@Async 후처리', desc: '저장 후 알림 전송' },
        ] },
        { t: 'p', html: 'AI가 회의에서 나오지 않은 내용을 지어내지 않도록 프롬프트를 <code>[ROLE]</code> <code>[RULES]</code> <code>[REFERENCE]</code> <code>[OUTPUT FORMAT]</code>으로 나누고 대화 로그만 근거로 쓰게 했습니다. 결과는 HTML과 서명 토큰으로 고정해 전자결재 문서로 바로 넘기고, AI 초안은 담당자가 검토한 뒤 결재로 넘어갑니다.' },
        { t: 'code', file: 'ChatGptController.java · LLM 회의록 스트리밍', code: `Flux<String> origin = chatClient.prompt()
    .user(aiMessage)
    .stream()
    .content()
    .delayElements(Duration.ofMillis(20));
return origin
    .takeUntil(chunk -> apiSupportManager.shouldStop(requestId))
    .onErrorResume(ex -> {
        log.warn("Stream aborted: {}", ex.getMessage());
        return Flux.empty(); })
    .doFinally(signalType -> apiSupportManager.clear(requestId));
// LLM 응답을 SSE로 스트리밍하고, 중단 요청 시 안전하게 종료` },
        { t: 'h3', text: '이벤트 기반 연동' },
        { t: 'p', html: '프로젝트를 만들면 DB 커밋이 끝난 뒤 전용 메신저 채팅방이 자동으로 생기고, 방 ID가 프로젝트에 기록됩니다. <code>AFTER_COMMIT</code>으로 분리해 롤백 때 채팅방만 남는 문제를 막고, 프로젝트 서비스는 이벤트 발행만 맡겨 도메인 간 결합을 낮췄습니다. 같은 방식으로 SSE 실시간 알림을 만들었습니다.' },
        { t: 'code', file: 'MessengerEventListener.java', code: `@Component
@RequiredArgsConstructor
public class MessengerEventListener {
    private final MsngrService msngrService;
    private final ProjectService projectService;

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void MessengerEventListener(ProjectCreatedEvent event) {
        try {
            // 메신저 방 자동 생성
            Long chtrmId = msngrService.createProjectChtrm(...);
            // 생성된 방 ID를 프로젝트 테이블에 업데이트
            projectService.updateProjectChtrmId(event.getProjId(), chtrmId);
        } catch (Exception e) {
            log.error("메신저 채팅방 자동 생성 실패", e);
        }
    }
}` },
        { t: 'fold', title: 'WebSocket 인증', sub: 'HTTP 보안 필터가 닿지 않는 STOMP 연결에 별도 인증 흐름 설계', blocks: [
          { t: 'p', html: 'STOMP 연결(CONNECT) 시점에 Authorization 헤더의 JWT를 검증하고 사원 ID를 Principal로 등록합니다. 이후 SEND·SUBSCRIBE에서는 다시 인증하지 않고 사원 ID를 씁니다. <code>StompHeaderAccessor.wrap()</code>은 새 객체를 만들어 원본 메시지에 반영되지 않아, 기존 객체를 돌려주는 <code>MessageHeaderAccessor.getAccessor()</code>를 썼습니다.' },
          { t: 'code', file: 'StompChannelInterceptor.java', code: `@Override
public Message<?> preSend(Message<?> message, MessageChannel channel) {
    StompHeaderAccessor accessor =
            MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
    // 최초 WebSocket 연결(CONNECT) 요청에서만 JWT 인증 수행
    if (accessor != null && StompCommand.CONNECT.equals(accessor.getCommand())) {
        String authHeader = accessor.getFirstNativeHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new CustomException(ErrorCode.WS_UNAUTHORIZED);
        }
        String token = authHeader.substring(7);
        jwtTokenProvider.validateToken(token);
        // 검증된 토큰에서 사원 ID를 추출해 WebSocket 사용자 정보로 등록
        Long empId = jwtTokenProvider.getEmpId(token);
        accessor.setUser(() -> String.valueOf(empId));
    }
    return message;
}` },
        ] },
        { t: 'fold', title: '대시보드 위젯 설계', sub: '직원별 배치 저장 · 위젯별 독립 API · 역할별 기본 배치', blocks: [
          { t: 'feats', items: [
            { title: '직원별 JSON CLOB 레이아웃 저장', html: '위젯 배치를 JSON CLOB으로 저장해 직원마다 독립적인 레이아웃을 유지합니다. 위젯을 추가해도 테이블 스키마는 바꾸지 않고 JSON 구조만 확장합니다.' },
            { title: '위젯별 독립 API', html: '12종 위젯을 각각 독립 엔드포인트로 나눠, 한 위젯에 오류가 나도 다른 위젯에 영향을 주지 않고 프론트에서 병렬로 불러옵니다.' },
            { title: '역할별 기본 레이아웃을 코드로 관리', html: '처음 접속한 사용자의 기본 배치를 DB가 아닌 Java 코드에서 역할별로 정의해, 초기 데이터 없이도 역할에 맞는 위젯이 만들어집니다.' },
          ] },
        ] },
        { t: 'fold', title: '화면 ↔ 코드 · 회의실 중복 예약 차단', sub: 'Client → Controller → Service → Mapper → DB', blocks: [
          { t: 'p', html: '같은 회의실의 같은 시간대 예약을 쿼리 단계에서 막습니다. <code>BEGIN_DT &lt; 요청종료 AND END_DT &gt; 요청시작</code>으로 구간 겹침을 판정하되 등호를 빼서 9~10시, 10~11시처럼 맞붙는 예약은 허용하고, 수정할 때는 본인 예약을 제외합니다. 겹치면 INSERT 없이 바로 예외를 돌려 화면에 안내합니다.' },
          { t: 'gallery', items: [
            { src: '/assets/portfolio-content/crew-reservation.webp', w: 824, h: 349, alt: '회의실 예약 화면', caption: '회의실 예약 화면' },
            { src: '/assets/portfolio-content/crew-reservation-tsx.webp', w: 820, h: 501, alt: 'ReservationPage.tsx 코드', caption: 'ReservationPage.tsx' },
            { src: '/assets/portfolio-content/crew-reservation-query.webp', w: 502, h: 144, alt: '중복 예약 확인 쿼리', caption: '중복 예약 확인 쿼리' },
          ] },
        ] },
      ],
    },
    {
      id: 'test', stage: 'te', title: '핵심 시나리오로 흐름을 확인했습니다',
      blocks: [
        { t: 'scenario', items: [
          { title: '화상회의 입장', desc: '진행 방식(온라인·오프라인·혼합), 참여자, 회의실을 정하고 입장합니다.', img: { src: '/assets/portfolio-content/crew-step-1.webp', w: 619, h: 518, alt: '화상회의 입장 화면' } },
          { title: '회의 진행', desc: '발언이 5초 단위로 Whisper STT를 거쳐 자막이 되고 대화 로그로 쌓입니다.', img: { src: '/assets/portfolio-content/crew-step-2.webp', w: 1476, h: 864, alt: '화상회의 진행 화면' } },
          { title: '회의록 자동 생성', desc: '회의를 끝내면 쌓인 대화 로그를 근거로 LLM이 회의록을 비동기로 만듭니다.', img: { src: '/assets/portfolio-content/crew-step-3.webp', w: 1007, h: 733, alt: '회의록 자동 생성 화면' } },
          { title: '전자결재 상신', desc: '참여자가 검토 후 결재를 요청하면 기안이 만들어지고, 승인되면 회의록이 확정됩니다.', img: { src: '/assets/portfolio-content/crew-step-4.webp', w: 1172, h: 667, alt: '전자결재 상신 화면' } },
        ] },
        { t: 'note', html: '프론트엔드 연동 테스트 중 통합검색 요청이 폭주하는 것을 발견해 <a href="#project/crew/case-02">트러블슈팅 CASE 02</a>에서 해결했습니다.' },
      ],
    },
    {
      id: 'deploy', stage: 'dp',
      handoff: { html: '배포와 운영 과정은 실제 운영 중인 <b>NO.BLACK</b> 상세에 정리했습니다.', label: 'NO.BLACK 배포 과정 보기 →', href: '#project/noblack/deploy' },
    },
  ],
  cases: [
    {
      id: 'case-01', stage: 'de', stageText: '설계 단계 문제',
      title: '화상회의 중심으로 설계해, 오프라인 회의는 회의록과 결재를 쓸 수 없었다',
      found: '구현을 마친 뒤 현직 개발자에게 실제 업무 프로세스를 듣고, 오프라인 회의도 회의록을 써서 결재받아야 하고 화상회의도 회의실에서 하는 경우가 많다는 것을 알았습니다.',
      cause: '구현 기술(LiveKit)을 기준으로 설계하면서 \'회의\'라는 상위 도메인 자체가 빠져 있었습니다.',
      fix: [
        '<code>TB_MTNG</code>를 상위 도메인으로 신설하고 <code>MTNG_TYPE_CD</code>로 온라인·오프라인·혼합 구분',
        '회의록을 <code>TB_VIDEO_MOM</code>에서 <code>TB_MTNG_MOM</code>으로 옮겨 <code>MTNG_ID</code> 기준으로 관리',
        '참석자 명단과 입퇴장 로그를 분리',
      ],
      result: '모든 회의 방식이 같은 회의록·결재 흐름을 사용',
      learned: '"이 기능이 다른 진행 방식에서도 재사용될 수 있는가?"를 설계 단계에서 먼저 묻게 되었습니다.',
      image: { src: '/assets/portfolio-content/crew-case-1.webp', w: 1322, h: 1190, alt: '회의 도메인 재설계 자료', caption: '회의 도메인 재설계' },
    },
    {
      id: 'case-02', stage: 'te', stageText: '테스트 중 발견',
      title: '검색어 한 단어에 대형 검색 쿼리가 10번 넘게 실행됐다',
      found: '프론트엔드 연동 테스트 중 입력할수록 화면이 미세하게 버벅였고, 백엔드 콘솔에 같은 통합검색 SQL 로그가 순간적으로 몰려 찍혔습니다.',
      cause: '자모 하나를 입력할 때마다 API를 호출해 LIKE 검색이 연달아 실행되고 있었습니다.',
      fix: '<code>useEffect</code>와 <code>setTimeout</code>으로 250ms 디바운싱을 넣어, 입력이 끝난 뒤 한 번만 요청합니다.',
      result: 'API 호출 80% 이상 감소', resultNote: '크롬 Network 탭 실측',
      learned: 'LIKE 검색이 연쇄적으로 테이블 전체를 읽는 부담을 미리 막는 것처럼, 서버와 DB 자원까지 고려해 설계하게 되었습니다.',
      image: { src: '/assets/portfolio-content/crew-case-2.webp', w: 1275, h: 1234, alt: '통합검색 요청 비교 자료', caption: '통합검색 요청 비교' },
    },
    {
      id: 'case-03', stage: 'dv', stageText: '개발 단계 문제', collapsed: true, short: '회의 종료 API 타임아웃',
      title: '화상회의를 끝내면 회의 종료 API가 타임아웃됐다',
      cause: 'Whisper STT, LLM 회의록, 결재 기안 생성이 DB 트랜잭션 안에서 동기로 실행되고 있었습니다.',
      fix: '<code>MeetingEndedEvent</code>를 발행하고 <code>@TransactionalEventListener(AFTER_COMMIT)</code>와 <code>@Async</code>로 커밋 이후 비동기 처리했습니다.',
      result: '회의 종료와 후속 자동화가 서로 영향을 주지 않음',
    },
    {
      id: 'case-04', stage: 'dv', stageText: '개발 단계 문제', collapsed: true, short: 'STOMP 송신자 식별',
      title: '실시간 메신저에서 메시지를 보낸 사람을 식별하지 못했다',
      cause: 'Spring Security 필터는 HTTP에만 적용되고 STOMP 메시지 흐름에는 적용되지 않았습니다.',
      fix: '<code>ChannelInterceptor</code>에서 CONNECT 시 JWT를 검증해 Principal을 넣었습니다. <code>wrap()</code> 대신 <code>getAccessor()</code>를 써야 원본 메시지에 반영됐습니다.',
      result: 'SEND·SUBSCRIBE에서 사원 ID를 다시 인증 없이 사용',
    },
  ],
  retro: [
    '구현 기술이 아니라 <b>실제 업무 흐름</b>을 기준으로 도메인을 먼저 설계해야 한다는 걸 배웠습니다.',
    '기능이 동작하는 데서 끝내지 않고, 서버와 DB 자원까지 <b>측정해서 확인</b>하는 습관이 생겼습니다.',
  ],
};

const noblack = {
  id: 'noblack',
  name: 'NO.BLACK',
  badge: { type: 'live', text: '운영 중인 실서비스' },
  meta: ['2026.08 —', '1인 개발 · 실제 브랜드 의뢰'],
  lead: '<b>실제 브랜드 의뢰</b>로, 더플라에서 NO.BLACK으로 바뀌는 침구 브랜드의 쇼케이스 사이트와 관리자 CMS를 요구사항 정리부터 배포·운영까지 혼자 맡았습니다.',
  actions: [{ label: '배포 사이트 열기', href: 'https://oooooo.kr/', primary: true }],
  repoNote: '고객 의뢰 프로젝트라 저장소는 비공개입니다.',
  shot: { src: '/assets/noblack-room.webp', w: 1319, h: 774, url: 'oooooo.kr/room', alt: 'NO.BLACK 나만의 방 운영 화면', caption: '운영 중인 실제 화면 · 나만의 방(MY ROOM)' },
  quote: '게임처럼 둘러보는 침구 브랜드 사이트 + 운영자가 직접 관리하는 CMS',
  stages: ['an', 'de', 'dv', 'te', 'dp'],
  glance: {
    tiles: [
      { label: '기간', value: '2026.08 —', sub: '현재 운영 중' },
      { label: '인원', value: '1인', sub: 'AI 도구 활용' },
      { label: '내 역할', value: '1인 풀스택', sub: '요구사항 정리 → 운영', strong: true },
      { label: '서비스', value: 'oooooo.kr', sub: '실서비스 배포' },
    ],
    chainLabel: '고객이 지나가는 흐름',
    chain: ['퇴근길 게임', '나만의 방', '제품 카탈로그', '오늘의집에서 구매'],
    chainNote: '운영자는 코드를 고치지 않고 CMS에서 제품·이미지·안내를 편집하고 게시합니다.',
    did: [
      { stage: 'an', mark: '01', text: '대표와 회의하며 요구사항과 수정 사항 정리' },
      { stage: 'de', mark: '02', text: 'PostgreSQL 데이터 구조와 초안·게시 흐름 설계' },
      { stage: 'dv', mark: '03', text: 'React 화면과 Spring 관리자 CMS 구현' },
      { stage: 'te', mark: '04', text: 'Playwright·JUnit 자동 검사와 CI/CD 배포·운영' },
    ],
    stack: [
      ['Frontend', [['react', 'React 19'], ['typescript', 'TypeScript'], ['vitejs', 'Vite'], ['', 'Canvas API']]],
      ['Backend', [['java', 'Java 21'], ['spring', 'Spring Boot'], ['spring', 'Spring Security'], ['', 'JPA'], ['maven', 'Maven']]],
      ['Data', [['postgresql', 'PostgreSQL'], ['', 'Flyway']]],
      ['Test', [['playwright', 'Playwright'], ['junit', 'JUnit'], ['', 'MockMvc']]],
      ['Deploy', [['docker', 'Docker'], ['githubactions', 'GitHub Actions'], ['', 'GHCR'], ['', 'OCI'], ['', 'Caddy']]],
    ],
  },
  sections: [
    {
      id: 'analysis', stage: 'an', title: '대표와 회의하며 무엇을 만들지 정했습니다',
      blocks: [
        { t: 'p', html: 'NO.BLACK 대표와 회의하며 요구사항과 수정 사항을 확인하고 반영했습니다. 정리한 요구는 세 갈래였습니다.' },
        { t: 'reqs', items: [
          { tag: '고객', title: '게임처럼 둘러보고 구매로', desc: '오프닝 → 퇴근길 게임 → 나만의 방 → 제품 카탈로그를 거쳐 오늘의집 판매 페이지로 이동' },
          { tag: '운영자', title: '코드 없이 직접 관리', desc: '제품·이미지·안내를 직접 편집하고 게시' },
          { tag: '지켜야 할 조건', title: '초안 노출·덮어쓰기 방지', desc: '작성 중인 초안이 고객에게 보이거나, 다른 관리자의 수정을 덮어쓰지 않게' },
        ] },
      ],
    },
    {
      id: 'design', stage: 'de', title: '구조와 데이터, 게시 흐름을 먼저 정했습니다',
      blocks: [
        { t: 'bullets', items: [
          '<b>프론트엔드</b> — 화면 조립 → 상태·조작 훅 → API 읽기·응답 변환 → 표시 컴포넌트로 역할을 나눴습니다.',
          '<b>백엔드</b> — Controller(HTTP 입출력) → Service(업무 규칙·트랜잭션) → Repository(DB 접근) 계층과 생성자 주입을 씁니다.',
          '<b>운영 구조</b> — Caddy가 화면 파일과 HTTPS를 맡고, 공개 API는 게시된 콘텐츠만 조회합니다.',
        ] },
        { t: 'figure', src: '/assets/noblack-diagrams/architecture.svg', w: 2206, h: 198, alt: 'NO.BLACK 전체 구조', caption: '전체 구조' },
        { t: 'h3', text: '데이터 설계' },
        { t: 'figure', src: '/assets/noblack-diagrams/erd.svg', w: 1544, h: 670, alt: 'NO.BLACK ERD', caption: 'ERD · 버전 관리 구조' },
        { t: 'table', rows: [
          ['product · guide_article', '고유 코드, 상태, 공개 리비전 ID, 동시 수정 버전'],
          ['*_revision', '제목·분류·검색 정보와 JSONB 본문을 버전별로 저장'],
          ['media_file', '이미지·파일의 사용 위치를 버전에 연결'],
          ['admin_audit_log', '관리자 변경 이력과 판매 링크 클릭 기록'],
        ] },
        { t: 'h3', text: 'CMS 게시 흐름' },
        { t: 'p', html: '제품을 저장할 때마다 고객 화면이 바뀌면 작성 중인 문구가 노출될 수 있어, 초안과 게시본을 나눴습니다. 고객은 <code>published_revision_id</code>가 가리키는 게시본만 읽습니다.' },
        { t: 'figure', src: '/assets/noblack-diagrams/cms-publish.svg', w: 1562, h: 174, alt: 'CMS 초안에서 게시까지의 흐름', caption: '초안 → 게시 흐름' },
        { t: 'fold', title: '설계 패턴 검토', sub: '쓸 곳과 쓰지 않을 곳을 나눈 근거', blocks: [
          { t: 'table', rows: [
            ['싱글톤', 'Spring Bean 기본 scope로 서비스·저장소를 관리. 직접 만든 전역 싱글톤은 없음'],
            ['브리지', '키보드·조이스틱 입력과 화면별 동작을 <code>SceneController</code> 인터페이스로 분리'],
            ['팩토리 메서드', 'Spring DI와 명시적 생성으로 충분해 상속 계층은 도입하지 않음'],
            ['템플릿 메서드', '제품·안내의 게시 순서를 <code>ContentService.publish</code>에서 공유'],
          ] },
          { t: 'p', html: '파일 저장은 <code>MediaStorage</code> 인터페이스와 <code>LocalMediaStorage</code> 구현을 나눠, 다른 저장소로 바꿀 수 있게 했습니다.' },
        ] },
      ],
    },
    {
      id: 'build', stage: 'dv', title: '게시·동시 수정·보안을 구현했습니다',
      blocks: [
        { t: 'feats', items: [
          { title: '초안과 게시본을 분리한 CMS', html: '게시 검증, 리비전 확정, 공개 포인터 변경, 감사 기록을 하나의 트랜잭션으로 처리합니다.' },
          { title: '동시 수정 충돌 방지', html: '관리자가 읽은 <code>expectedVersion</code>과 현재 버전이 다르면 <code>409 Conflict</code>를 돌려줍니다. 행 잠금과 버전 조건으로 오래된 편집이 최신 내용을 덮지 못하게 했습니다.' },
          { title: '관리자 보안과 파일 검증', html: 'Spring Security 세션 인증, Argon2id 비밀번호 해시, CSRF 토큰, 연속 실패 잠금을 적용했습니다. 업로드 파일은 실제 형식과 크기를 검사하고, 사용 중인 파일은 지울 수 없게 했습니다.' },
        ] },
        { t: 'fold', title: '주요 API', sub: '공개 조회 · 관리자 인증 · 콘텐츠 · 파일 · 판매 링크', blocks: [
          { t: 'table', head: ['구분', '경로', '역할'], rows: [
            ['제품', '<code>GET /api/products</code>, <code>/api/products/{code}</code>', '게시 제품 목록·단건 조회'],
            ['안내', '<code>GET /api/guides</code>, <code>/api/guides/{type}/{code}</code>', '공지·설명서·QNA 조회'],
            ['관리자 인증', '<code>/api/admin/csrf</code>, <code>/login</code>, <code>/me</code>, <code>/logout</code>', 'CSRF·로그인·세션 확인'],
            ['관리자 콘텐츠', '<code>/api/admin/products/**</code>, <code>/api/admin/guides/**</code>', '초안·게시·순서·이력 관리'],
            ['관리자 파일', '<code>/api/admin/media/**</code>', '업로드·사용 위치·삭제 관리'],
            ['판매 링크 이동', '<code>GET /api/outbound/product/{code}</code>', '판매 URL 검증, 클릭 기록 후 302 이동'],
          ] },
        ] },
      ],
    },
    {
      id: 'test', stage: 'te', title: '검사 범위를 정하고 자동으로 확인합니다',
      blocks: [
        { t: 'table', rows: [
          ['Playwright', '게임·방·메뉴 조작, URL·포커스 복귀, PC·모바일 배치, 관리자 편집·게시·파일 관리'],
          ['백엔드 단위', '계정·비밀번호 정책, 판매 URL 정책, 파일 검증'],
          ['DB 통합', 'PostgreSQL 제약·트랜잭션, 인증·CSRF·세션, CMS 게시·동시 수정, 파일 참조'],
          ['정적 검사 · CI', 'TypeScript strict 검사, 프로덕션 빌드, 민감 파일·의존성 취약점 검사'],
        ] },
        { t: 'note', html: '이 검사만으로 운영 데이터, 외부 주문·결제, 실제 모바일 기기, 서버 부하까지 확인한 것은 아니어서 범위를 따로 적어 두었습니다.' },
      ],
    },
    {
      id: 'deploy', stage: 'dp', title: '검사를 통과하면 자동으로 배포됩니다',
      blocks: [
        { t: 'figure', src: '/assets/noblack-diagrams/deployment.svg', w: 1372, h: 94, alt: 'GitHub Actions에서 GHCR을 거쳐 OCI로 배포하는 흐름', caption: 'GitHub Actions → GHCR → OCI' },
        { t: 'bullets', items: [
          'PR과 <code>main</code> push마다 검사하고, 통과하면 프론트·백엔드 이미지를 커밋 SHA 태그로 GHCR에 올린 뒤 OCI 서버의 컨테이너를 교체합니다.',
          'DB와 백엔드는 외부 포트를 열지 않고, Caddy가 웹 포트와 HTTPS 인증서를 맡습니다.',
          'DB 마이그레이션 계정과 웹 실행 계정을 나눴고, OCI 1GB 메모리에 맞춰 컨테이너·JVM·DB 메모리를 설정했습니다.',
        ] },
      ],
    },
  ],
  cases: [
    { id: 'case-01', stage: 'te', stageText: '테스트로 재발 방지', title: '늦게 끝난 이전 API 응답이 현재 화면을 덮어썼다', cause: '분류나 페이지를 바꾼 뒤, 늦게 끝난 이전 요청의 결과가 화면에 남을 수 있었습니다.', fix: '<code>AbortController</code>와 요청 키로 이전 결과를 버리고, 로딩·빈 목록·오류 상태를 나눴습니다.', check: '<code>usePublicContent</code> · <code>public-content.spec.ts</code>' },
    { id: 'case-02', stage: 'te', stageText: '테스트로 재발 방지', title: '느린 화면 전환 뒤 포커스가 엉뚱한 메뉴로 튀었다', cause: '예약해 둔 메뉴 포커스 복원이 사용자의 새 선택을 덮어썼습니다.', fix: '진입할 때 포커스를 기록하고, 복원 직전에 현재 포커스와 비교합니다.', check: '<code>useArcadeController</code> · <code>catalog-entry.spec.ts</code>' },
    { id: 'case-03', stage: 'te', stageText: '테스트로 재발 방지', collapsed: true, short: '퀘스트 표시 어긋남', title: '방의 퀘스트 표시가 화면 크기마다 어긋났다', cause: '숨긴 설명의 너비와 버튼 중심 정렬이 사물 좌표에 영향을 줬습니다.', fix: '원본 이미지의 비율 좌표, 꼬리 끝 기준, 상자 높이를 분리했습니다.', check: '<code>room.ts</code> · <code>room-markers.spec.ts</code>' },
    { id: 'case-04', stage: 'te', stageText: '테스트로 재발 방지', collapsed: true, short: '504 Outdated Optimize Dep', title: '개발 중 504 Outdated Optimize Dep 오류가 났다', cause: '개발 서버와 프록시 검증 서버가 의존성 캐시를 함께 쓰고 있었습니다.', fix: '앱은 모드·API 대상별로, 테스트는 실행별로 캐시를 분리했습니다.', check: '<code>vite.config.ts</code> · <code>dev-api-proxy.spec.ts</code>' },
  ],
};

const cinema = {
  id: 'cinema',
  name: 'Cinema Talk',
  meta: ['2026.02 — 2026.03', '팀 프로젝트 · 교육과정'],
  lead: '프레임워크 없이 <b>FrontController·Action·Properties 매핑으로 Servlet MVC를 직접 구현</b>한 영화 정보·커뮤니티 서비스입니다. TMDB 데이터 수집, 선호 장르 기반 추천, 관리자 통계까지 만들었습니다.',
  actions: [
    { label: 'GitHub 저장소', href: 'https://github.com/TaeSeungJeon/Cinema_Talk' },
    { label: '내 PR 19', href: prList('TaeSeungJeon/Cinema_Talk'), title: '내가 작성한 PR' },
  ],
  shot: { src: '/assets/cinema.webp', w: 1078, h: 937, url: 'cinema-talk', alt: 'Cinema Talk 메인 화면', caption: '메인 화면 · 추천 영화와 커뮤니티' },
  quote: '영화 정보 · 커뮤니티 — 대덕인재개발원 풀스택 과정 팀 프로젝트',
  stages: ['an', 'de', 'dv', 'te'],
  glance: {
    tiles: [
      { label: '기간', value: '2026.02 – 03', sub: '교육과정 팀 프로젝트' },
      { label: '내 역할', value: 'TA · 풀스택', sub: 'Servlet MVC 구조 구현', strong: true },
      { label: '구조', value: 'FrontController', sub: '프레임워크 없이 MVC' },
      { label: '데이터', value: 'TMDB 수집', sub: '멀티스레드 배치' },
    ],
    chainLabel: '사용자 흐름',
    chain: ['회원가입', '선호 장르 설정', '영화 탐색', '상세 · 좋아요'],
    chainNote: '선택한 선호 장르는 MEMBER_GENRE 테이블에 저장되어 추천의 기준이 됩니다.',
    did: [
      { stage: 'dv', mark: '01', text: 'FrontController·Action·Properties 매핑으로 Servlet MVC 구현' },
      { stage: 'dv', mark: '02', text: '선호 장르 기반 추천과 장르별 섹션 구성' },
      { stage: 'dv', mark: '03', text: 'TMDB 영화·배우 데이터 수집' },
      { stage: 'dv', mark: '04', text: '관리자 통계 기능' },
    ],
    stack: [
      ['Backend', [['java', 'Java 21'], ['', 'Servlet/JSP'], ['', 'MyBatis 3.5'], ['maven', 'Maven']]],
      ['Frontend', [['', 'JSTL'], ['jquery', 'jQuery'], ['', 'Chart.js']]],
      ['Data', [['oracle', 'Oracle']]],
      ['Server', [['', 'Tomcat 10']]],
    ],
  },
  sections: [
    {
      id: 'analysis', stage: 'an', title: '만들 기능을 네 갈래로 나눴습니다',
      blocks: [
        { t: 'p', html: '영화 정보와 커뮤니티를 한 서비스로 묶기 위해, 기능을 데이터 수집·추천·커뮤니티·관리 네 갈래로 나눠 정리했습니다.' },
        { t: 'reqs', items: [
          { tag: '영화 정보', title: 'TMDB 데이터 자동 수집', desc: '영화·배우·제작진 데이터를 배치로 모아 Oracle DB에 적재' },
          { tag: '추천', title: '취향과 인기를 함께 반영', desc: '선호 장르·인기 점수·장르별 섹션으로 첫 화면 구성' },
          { tag: '커뮤니티', title: '게시판과 좋아요', desc: '게시글 등록·목록, 영화 좋아요 이력 저장' },
          { tag: '관리자', title: '통계 대시보드', desc: 'Chart.js로 서비스 현황을 보는 관리자 화면' },
        ] },
      ],
    },
    {
      id: 'design', stage: 'de', title: 'MVC 흐름과 데이터를 먼저 그렸습니다',
      blocks: [
        { t: 'p', html: 'JSP · Servlet · MyBatis 3계층입니다. FrontController가 모든 요청을 받아 Properties 파일로 커맨드를 찾고, Action 구현체를 Reflection으로 실행합니다. Spring MVC 없이 MVC를 직접 구현해 프레임워크가 내부에서 하는 일을 이해하는 데 목적을 뒀습니다.' },
        { t: 'figure', src: '/assets/portfolio-content/cinema-architecture.svg', w: 1040, h: 660, alt: 'Cinema Talk 시스템 아키텍처', caption: '시스템 아키텍처' },
        { t: 'table', rows: [
          ['클라이언트', 'Browser(JSP) — JSTL, jQuery, 세션 인증, AJAX'],
          ['서버', 'Java 21 · Servlet MVC — FrontController, Action, Service, MyBatis DAO'],
          ['데이터', 'Oracle DB · 파일 저장소 — MyBatis MERGE, ROWNUM 페이지네이션, 첨부파일'],
          ['외부 연동', 'TMDB API(영화·배우·제작진 수집), Gmail SMTP(임시 비밀번호 발송)'],
        ] },
        { t: 'h3', text: 'ERD' },
        { t: 'point', text: '설계 포인트 · 3NF 정규화 · 역할 기반 분리 · 복합 PK' },
        { t: 'figure', src: '/assets/portfolio-files/cinema-erd.png', w: 1453, h: 750, alt: 'Cinema Talk ERD', caption: 'ERD · 영화·인물·회원 취향' },
        { t: 'table', rows: [
          ['MOVIE', '영화 관리'],
          ['MOVIE_CREW · MOVIE_CAST', '영화 제작진·출연진 관리'],
          ['PERSON', '인물 관리'],
          ['MOVIE_GENRE · GENRE', '영화 장르와 전체 장르 관리'],
          ['MEMBER_GENRE', '회원 선호 장르 관리'],
          ['MEMBER_MOVIE_RECOMMEND', '좋아요 관리'],
        ] },
        { t: 'fold', title: 'URL 명세 · 화면설계서', sub: '.do 방식 URL 7개 · 화면설계서 4장', blocks: [
          { t: 'table', head: ['Method', 'Endpoint', '설명'], rows: [
            ['GET', '<code>/movieRec.do</code>', '영화 추천 목록 조회'],
            ['GET', '<code>/movieDetail.do?movieId={id}</code>', '영화 상세 조회'],
            ['POST', '<code>/loginOk.do</code>', '로그인 처리'],
            ['POST', '<code>/registerOk.do</code>', '회원가입'],
            ['POST', '<code>/boardOk.do</code>', '게시글 등록'],
            ['GET', '<code>/boardList.do</code>', '게시글 목록 조회'],
            ['POST', '<code>/pwdFindOk.do</code>', '임시 비밀번호 발급'],
          ] },
          { t: 'gallery', items: [
            { src: '/assets/portfolio-files/cinema-wireframe-1.png', w: 402, h: 403, alt: '화면설계서 1', caption: '화면설계서 1' },
            { src: '/assets/portfolio-files/cinema-wireframe-2.png', w: 1283, h: 888, alt: '화면설계서 2', caption: '화면설계서 2' },
            { src: '/assets/portfolio-files/cinema-wireframe-3.png', w: 1210, h: 898, alt: '화면설계서 3', caption: '화면설계서 3' },
            { src: '/assets/portfolio-files/cinema-wireframe-4.png', w: 576, h: 484, alt: '화면설계서 4', caption: '화면설계서 4' },
          ] },
        ] },
      ],
    },
    {
      id: 'build', stage: 'dv', title: 'MVC를 직접 구현하고 추천을 만들었습니다',
      blocks: [
        { t: 'h3', text: 'FrontController로 요청 흐름 구현' },
        { t: 'p', html: '모든 <code>.do</code> 요청을 하나의 서블릿이 받아 Properties 파일에서 클래스명을 찾고, Reflection으로 인스턴스를 만들어 실행합니다. 새 기능을 추가할 때 Java 코드를 고치지 않고 properties 파일에 한 줄만 더하면 됩니다. Spring의 DispatcherServlet이 하는 일을 직접 구현한 구조입니다.' },
        { t: 'code', file: 'FrontController.java', code: `public class FrontController extends HttpServlet {
  @Override
  protected void service(HttpServletRequest request,
                         HttpServletResponse response) {
    String command = RequestURI.substring(contextPath.length());
    String value = prop.getProperty(command);
    // 리플렉션으로 Action 생성 후 실행
    Class<?> url = Class.forName(url_2);
    action = (Action) url.getDeclaredConstructor().newInstance();
    forward = action.execute(request, response);
    if (forward.isRedirect()) {
        response.sendRedirect(forward.getPath());
    } else {
        RequestDispatcher dis =
            request.getRequestDispatcher(forward.getPath());
        dis.forward(request, response);
    }
  }
}` },
        { t: 'h3', text: '선호 장르 기반 추천' },
        { t: 'feats', items: [
          { title: '선호 장르 추천', html: '로그인 여부와 선호 장르 설정 여부로 3단계 분기합니다. 선호 장르가 있으면 해당 장르 영화를 <code>DBMS_RANDOM</code>으로 섞어 매번 다른 결과를 보여줍니다.' },
          { title: '인기 영화 추천', html: '평점 20% + 회원 추천수 80% 가중치로 점수를 매겨 상위 60개를 고른 뒤 섞어, 인기 편향 없이 다양한 영화를 노출합니다.' },
          { title: '장르별 섹션', html: '장르별 인기 상위 100개 중 20개를 고르고 <code>ROW_NUMBER() OVER (PARTITION BY movieId)</code>로 중복을 없앤 뒤, <code>LinkedHashMap</code>으로 장르 순서를 지켜 묶습니다.' },
        ] },
        { t: 'figure', src: '/assets/portfolio-content/cinema-recommend.webp', w: 1600, h: 878, alt: 'Cinema Talk 영화 추천 화면', caption: '영화 추천 화면' },
        { t: 'fold', title: '데이터 수집과 공유 자원 관리', sub: 'TMDB 멀티스레드 배치 · 싱글톤 패턴', blocks: [
          { t: 'feats', items: [
            { title: 'TMDB 멀티스레드 배치', html: '<code>ExecutorService</code>로 병렬 처리하고, 청크 단위 트랜잭션과 재시도 로직으로 영화·배우 데이터를 자동 수집합니다.' },
            { title: '싱글톤으로 공유 자원 관리', html: 'AppConfig·DBService·DAO 계층에 싱글톤을 적용해 <code>SqlSessionFactory</code>를 단일 인스턴스로 쓰고, XML 설정 로더를 스레드 안전하게 구현했습니다.' },
          ] },
        ] },
        { t: 'fold', title: '화면 ↔ 코드 · 카드 뒤집기와 장르 색상', sub: 'Client → Controller → Service → Mapper → DB', blocks: [
          { t: 'p', html: '추천 화면을 요청하면 Controller가 <code>likeRecList</code>, <code>popularRecList</code>, <code>genreSections</code>를 request scope에 담아 JSP로 넘깁니다. <code>movieCard.jsp</code>를 <code>jsp:include</code>로 분리해 카드를 재사용했고, 마우스를 올리면 카드가 뒤집히며 장르별 색상 pill이 붙습니다.' },
          { t: 'figure', src: '/assets/portfolio-content/cinema-code-screen.webp', w: 1077, h: 289, alt: '추천 결과 화면', caption: '추천 결과 화면' },
          { t: 'code', file: 'list.jsp', code: `<%-- 카드 0.5초 호버 시 3D flip --%>
.card-inner {
  transition: transform .65s cubic-bezier(.2,.8,.2,1);
  transform-style: preserve-3d;
}
.movie-card.is-flipped .card-inner { transform: rotateY(180deg); }
.card-face.back { transform: rotateY(180deg); }
<%-- 장르별 동적 pill 색상 매핑 --%>
<c:forEach var="genre" items="\${fn:split(movie.genreName, ',')}">
  <c:set var="g" value="\${fn:trim(genre)}" />
  <span class="pill genre-\${fn:replace(g,' ','-')}">\${g}</span>
</c:forEach>` },
        ] },
      ],
    },
    {
      id: 'test', stage: 'te', title: '핵심 사용자 흐름을 시나리오로 확인했습니다',
      blocks: [
        { t: 'scenario', items: [
          { title: '회원가입', desc: '아이디 중복 확인과 BCrypt 암호화를 서버에서 처리합니다.', img: { src: '/assets/portfolio-content/cinema-step-1.webp', w: 787, h: 621, alt: '회원가입 화면' } },
          { title: '선호 장르 설정', desc: '가입 직후 장르를 고르면 MEMBER_GENRE에 저장되어 추천의 기준이 됩니다.', img: { src: '/assets/portfolio-content/cinema-step-2.webp', w: 750, h: 599, alt: '선호 장르 설정 화면' } },
          { title: '영화 탐색', desc: '추천 목록에서 카드를 뒤집어 미리 본 뒤 상세로 들어갑니다.', img: { src: '/assets/portfolio-content/cinema-step-3.webp', w: 408, h: 443, alt: '영화 탐색 화면' } },
          { title: '영화 상세', desc: '출연진·감독과 줄거리를 보고, 좋아요를 누르면 MEMBER_MOVIE_RECOMMEND에 이력이 남습니다.', img: { src: '/assets/portfolio-content/cinema-step-4.webp', w: 879, h: 746, alt: '영화 상세 화면' } },
        ] },
      ],
    },
    {
      id: 'deploy', stage: 'dp',
      handoff: { html: '배포와 운영 과정은 실제 운영 중인 <b>NO.BLACK</b> 상세에 정리했습니다.', label: 'NO.BLACK 배포 과정 보기 →', href: '#project/noblack/deploy' },
    },
  ],
  cases: [],
};

export const details = { crew, noblack, cinema };
export const detailOrder = ['crew', 'noblack', 'cinema'];

// 예전 주소(#project/crew/16 같은 PDF 쪽 번호, NO.BLACK README 절 이름)를 새 단계로 연결합니다.
export const legacyAnchors = {
  crew: { 14: 'overview', 15: 'design', 16: 'design', 17: 'analysis', 18: 'design', 19: 'build', 20: 'build', 21: 'build', 22: 'build', 23: 'build', 24: 'test', 25: 'case-01', 26: 'case-02' },
  cinema: { 6: 'overview', 7: 'design', 8: 'design', 9: 'design', 10: 'build', 11: 'build', 12: 'build', 13: 'test' },
  noblack: { core: 'build', structure: 'design', cms: 'design', data: 'design', patterns: 'design', cases: 'trouble', api: 'build' },
};
