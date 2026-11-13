// 프로젝트 상세 페이지 내용. 모든 프로젝트를 같은 순서(한눈에 보기 → 01 분석 → … → 05 배포 → 트러블슈팅 → 회고)로 정리합니다.
// 출처: MyCrewSoft·Cinema Talk는 포트폴리오 PDF 본문, N°BLACK은 저장소 README.
// 문자열의 <b>, <code>, <a href="#project/..."> 는 그대로 HTML로 표시됩니다.
//
// 블록 종류(t): p, h3, point, figure, gallery, table, bullets, steps, code, fold, reqs, feats, scenario, note

const prList = (repo) => `https://github.com/${repo}/pulls?q=is%3Apr+author%3Asksqlrlek`;
// 저장소가 여러 개인 조직은 조직 전체 PR 검색으로 연결합니다(로그인 없이 열림).
const orgPrs = (org) => `https://github.com/search?q=org%3A${org}+author%3Asksqlrlek+is%3Apr&type=pullrequests`;

const crew = {
  id: 'crew',
  name: 'MyCrewSoft',
  badge: { type: 'main', text: '메인 프로젝트' },
  meta: ['2026.05 — 2026.06 · 8주', '4인 팀 · 교육과정 프로젝트'],
  lead: '회의·메신저·일정·결재를 한곳에 모은 <b>통합 그룹웨어</b>입니다. 화상회의가 끝나면 AI가 회의록 초안을 만들고, 담당자 검토를 거쳐 전자결재로 이어집니다.',
  actions: [
    { label: '내 PR 136개', href: orgPrs('myCrewSoft'), title: '내가 작성한 PR (백엔드 72 · 프론트엔드 64)' },
  ],
  shot: { src: '/assets/crew-dashboard.webp', w: 1680, h: 980, url: 'mycrewsoft / dashboard', alt: 'MyCrewSoft 대시보드. 근태·전자결재·업무·메신저·오늘 일정·알림·오늘 회의·프로젝트 진행 위젯이 격자로 배치된 화면', caption: '대시보드 · 직원별로 배치를 저장하는 11종 위젯' },
  screens: [
    { src: '/assets/portfolio-content/crew-meetings.webp', w: 1600, h: 1000, url: 'mycrewsoft / meeting / history', alt: 'MyCrewSoft 지난 회의 목록. 회의마다 진행 방식(온라인·오프라인·혼합), 참여자 수, 회의록 상태, 녹취록 여부가 표시됨', caption: '회의 목록 · 회의록 상태와 녹취록' },
    { src: '/assets/portfolio-content/crew-calendar.webp', w: 1600, h: 1000, url: 'mycrewsoft / calendar', alt: 'MyCrewSoft 6월 일정 캘린더. 부서 회의, 프로젝트 기간, 업무, 화상회의, 공휴일이 분류별 색으로 표시됨', caption: '일정 캘린더 · 회의·업무 일정 자동 반영' },
    { src: '/assets/portfolio-files/crew-wireframe-3.png', w: 1099, h: 855, url: 'mycrewsoft / admin / holidays', alt: 'MyCrewSoft 관리자 공휴일 API 연동 화면', caption: '관리자 · 공휴일 API 연동' },
    { src: '/assets/portfolio-files/crew-wireframe-4.png', w: 960, h: 747, url: 'mycrewsoft / admin / schedule-categories', alt: 'MyCrewSoft 관리자 일정 분류 관리 화면', caption: '관리자 · 일정 분류 관리' },
  ],
  quote: '통합 그룹웨어 — 대덕인재개발원 풀스택 과정 팀 프로젝트',
  stages: ['an', 'de', 'dv', 'te'],
  glance: {
    tiles: [
      { label: '기간', value: '2026.05 – 06', sub: '8주' },
      { label: '인원', value: '4인 팀', sub: '교육과정 프로젝트' },
      { label: '내 역할', value: 'AA · 풀스택', sub: '공통 아키텍처 설계', strong: true },
      { label: '맡은 도메인', value: '11개', sub: '회의·메신저·일정·대시보드 등' },
    ],
    chainLabel: '핵심 결과',
    chain: ['화상회의 녹취', 'Whisper STT', 'LLM 회의록', '전자결재 기안'],
    did: [
      { stage: 'de', mark: 'AA', text: '공통 API 응답·예외 처리·계층 규칙과 협업 가이드' },
      { stage: 'dv', mark: '01', text: '화상회의 → AI 회의록 → 전자결재 자동화' },
      { stage: 'dv', mark: '02', text: 'SSE 실시간 알림과 WebSocket 메신저' },
      { stage: 'dv', mark: '03', text: '대시보드 11종 위젯, 6개 도메인 통합검색' },
    ],
    stack: [
      ['프론트엔드', [['react', 'React'], ['typescript', 'TypeScript'], ['tailwindcss', 'Tailwind CSS'], ['vitejs', 'Vite']]],
      ['백엔드', [['java', 'Java 21'], ['spring', 'Spring Boot'], ['spring', 'Spring Security'], ['mybatis', 'MyBatis'], ['jwt', 'JWT']]],
      ['데이터', [['oracle', 'Oracle'], ['redis', 'Redis']]],
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
        { t: 'figure', src: '/assets/portfolio-content/crew-architecture.png', w: 1323, h: 839, alt: 'MyCrewSoft 시스템 아키텍처', caption: '시스템 아키텍처' },
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
        { t: 'fold', title: '설계 산출물 더 보기', sub: '시퀀스 다이어그램 · 화면 정의서 · 요구사항 정의서 · 용어 사전 · API 명세', blocks: [
          { t: 'gallery', items: [
            { src: '/assets/portfolio-files/crew-sequence.png', w: 1279, h: 569, alt: '화상회의 생성 시퀀스 다이어그램', caption: '시퀀스 · 화상회의 생성' },
            { src: '/assets/portfolio-files/crew-screen-definition.webp', w: 1795, h: 876, alt: 'MyCrewSoft 메신저 화면 정의서', caption: '화면 정의서' },
            { src: '/assets/portfolio-files/crew-requirements-definition.webp', w: 1659, h: 948, alt: 'MyCrewSoft 로그인·로그아웃 요구사항 정의서', caption: '요구사항 정의서' },
            { src: '/assets/portfolio-files/crew-glossary.webp', w: 1659, h: 948, alt: 'MyCrewSoft 직책·직급 및 등록·수정 정보 용어 사전', caption: '용어 사전' },
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
        { t: 'p', html: '맡은 도메인: 회의·화상회의·회의실·예약, 메신저·알림, 일정·공휴일·업무(업무를 만들면 일정에 자동 추가), 대시보드·통합검색' },
        { t: 'h3', text: '팀 공통 아키텍처 — AA 협업 가이드' },
        { t: 'bullets', items: [
          '개발을 시작하기 전, 4명이 같은 방식으로 코드를 쓰도록 <b>19장의 AA 협업 가이드</b>를 만들어 노션으로 배포했습니다.',
          '규칙만 적지 않고, 팀원이 그대로 가져다 쓸 <b>공통 코드와 사용 예</b>를 함께 담았습니다.',
          '<a href="https://app.notion.com/p/AA-35c7a001faab80e6b56fe82e9d0f0e16" target="_blank" rel="noreferrer">AA 협업 가이드 원문 보기 ↗</a>',
        ] },
        { t: 'table', head: ['구분', '가이드로 정한 기준'], rows: [
          ['응답 형식', '모든 API는 <code>ApiResponse&lt;T&gt;</code>로 반환합니다. 성공 여부·메시지·데이터·에러 코드·페이지 정보를 같은 모양으로 담고, 실패 응답은 전역 예외 처리에서만 만듭니다.'],
          ['예외 처리', 'Service는 <code>throw new CustomException(ErrorCode.XXX)</code>만 하고, Controller의 try-catch는 금지했습니다. 에러 코드는 <code>{도메인}_{번호}</code>(예: <code>USER_001</code>)로 이름을 붙입니다.'],
          ['계층 규칙', 'Controller는 요청 검증과 응답, Service는 비즈니스 로직과 트랜잭션, Mapper는 SQL만 맡습니다. 계층마다 <b>하면 안 되는 일</b>도 함께 적었습니다.'],
          ['VO ↔ DTO', 'MapStruct 변환기는 <code>~DtoMapper</code>로 이름 붙여, MyBatis Mapper(SQL)와 헷갈리지 않게 했습니다.'],
          ['협업 규칙', '<code>feature/*</code> → <code>develop</code>으로만 PR을 올리고, 2명 이상 승인 후 PL·AA가 병합합니다. 커밋은 <code>feat:</code>·<code>fix:</code> 같은 타입으로 시작합니다.'],
        ] },
        { t: 'code', file: '팀원 사용법 — 가이드에 실은 예시', code: `// Controller: 응답은 항상 ApiResponse로 감쌉니다
return ResponseEntity.ok(ApiResponse.success(userService.getUser(id)));

// Service: 규칙에 어긋나면 ErrorCode로 던지기만 합니다
if (user == null) throw new CustomException(ErrorCode.USER_NOT_FOUND);

// → 전역 예외 처리가 모든 API에서 같은 모양으로 응답합니다
// { "success": false, "message": "존재하지 않는 사용자입니다.", "errorCode": "USER_001" }` },
        { t: 'fold', title: '가이드 목차 19장', sub: '백엔드 공통 · 보안 · 프론트엔드 · 협업', blocks: [
          { t: 'table', rows: [
            ['백엔드 공통', '기술 스택, 패키지 구조, 공통 설정, 공통 컴포넌트, 유틸리티 클래스, 커스텀 검증 어노테이션, MapStruct(VO ↔ DTO), 도메인 서비스 레이어 작성'],
            ['보안', 'Security & JWT, 인터셉터 & CORS, <code>@PreAuthorize</code> 사용 기준'],
            ['프론트엔드', '프론트엔드 공통, OpenAPI TypeScript 타입 자동 생성, React Router & Layout'],
            ['협업', '코드 컨벤션, Git 브랜치 전략, API 명세서, Swagger, 완성 체크리스트'],
          ] },
        ] },
        { t: 'h3', text: 'AI 회의록 → 전자결재 파이프라인' },
        { t: 'steps', items: [
          { title: '음성 캡처', desc: 'LiveKit 화상회의 오디오' },
          { title: 'Whisper STT', desc: '5초 단위 자막 변환' },
          { title: '대화 로그', desc: '발언자·시간 단위 누적' },
          { title: 'LLM 회의록', desc: '로그 근거 HTML 생성' },
          { title: '@Async 후처리', desc: '저장 후 알림 전송' },
        ] },
        { t: 'bullets', items: [
          'AI가 회의에서 나오지 않은 내용을 지어내지 않도록 프롬프트를 <code>[ROLE]</code> <code>[RULES]</code> <code>[REFERENCE]</code> <code>[OUTPUT FORMAT]</code>으로 나누고 대화 로그만 근거로 쓰게 했습니다.',
          '결과는 HTML과 서명 토큰으로 고정해 전자결재 문서로 바로 넘기고, AI 초안은 담당자가 검토한 뒤 결재로 넘어갑니다.',
        ] },
        { t: 'fold', title: '코드 보기 · LLM 회의록 스트리밍', sub: '중단 요청 시 스트림을 안전하게 끝내는 처리', blocks: [
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
        ] },
        { t: 'fold', title: '이벤트 기반 연동', sub: 'AFTER_COMMIT으로 채팅방 자동 생성 · 참여자 동기화 · 실시간 알림', blocks: [
          { t: 'bullets', items: [
            '프로젝트를 만들면 DB 커밋이 끝난 뒤 전용 메신저 채팅방이 자동으로 생기고, 방 ID가 프로젝트에 기록됩니다.',
            '참여자를 추가·제외할 때도 이벤트로 채팅방 참여자를 맞춥니다.',
            '<code>AFTER_COMMIT</code>으로 분리해 롤백 때 채팅방만 남는 문제를 막고, 프로젝트 서비스는 이벤트 발행만 맡겨 도메인 간 결합을 낮췄습니다.',
            '같은 방식으로 SSE 실시간 알림을 만들었고, 알림 리스너는 <code>@Async</code>를 더해 커밋 후 별도 스레드에서 처리합니다.',
          ] },
          { t: 'code', file: 'MessengerEventListener.java', code: `@Slf4j
  @Component
  @RequiredArgsConstructor
  public class MessengerEventListener {

      private final MsngrService msngrService;
      private final ProjectService projectService;

      @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
      public void handleProjectCreated(ProjectCreatedEvent event) {
          try {
              Long chtrmId = msngrService.createProjectChtrm(
                  event.getProjId(),
                  event.getProjNm(),
                  event.getCrtrId(),
                  event.getEmpIds()
              );

              projectService.updateProjectChtrmId(
                  event.getProjId(),
                  chtrmId
              );

          } catch (Exception e) {
              log.error(
                  "프로젝트 메신저 채팅방 자동 생성 실패. projId={}, projNm={}",
                  event.getProjId(),
                  event.getProjNm(),
                  e
              );
          }
      }

      // (생략) handleProjectMembersAdded · handleProjectMemberRemoved
      // 참여자 추가·제외도 AFTER_COMMIT 이후 채팅방 참여자에 반영
  }` },
        ] },
        { t: 'fold', title: 'WebSocket 인증', sub: 'HTTP 보안 필터가 닿지 않는 STOMP 연결에 별도 인증 흐름 설계', blocks: [
          { t: 'bullets', items: [
            'STOMP 연결(CONNECT) 시점에 Authorization 헤더의 JWT를 검증하고 사원 ID를 Principal로 등록합니다.',
            '이후 SEND·SUBSCRIBE에서는 다시 인증하지 않고 사원 ID를 씁니다.',
            '<code>StompHeaderAccessor.wrap()</code>은 새 객체를 만들어 원본 메시지에 반영되지 않아, 기존 객체를 돌려주는 <code>MessageHeaderAccessor.getAccessor()</code>를 썼습니다.',
          ] },
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
            { title: '위젯별 독립 API', html: '11종 위젯을 각각 독립 엔드포인트로 나눠, 한 위젯에 오류가 나도 다른 위젯에 영향을 주지 않고 프론트에서 병렬로 불러옵니다.' },
            { title: '역할별 기본 레이아웃을 코드로 관리', html: '처음 접속한 사용자의 기본 배치를 DB가 아닌 Java 코드에서 역할별로 정의해, 초기 데이터 없이도 역할에 맞는 위젯이 만들어집니다.' },
          ] },
        ] },
        { t: 'fold', title: '화면 ↔ 코드 · 회의실 중복 예약 차단', sub: 'Client → Controller → Service → Mapper → DB', blocks: [
          { t: 'bullets', items: [
            '같은 회의실의 같은 시간대 예약을 쿼리 단계에서 막습니다.',
            '<code>BEGIN_DT &lt; 요청종료 AND END_DT &gt; 요청시작</code>으로 구간 겹침을 판정하되 등호를 빼서 9~10시, 10~11시처럼 맞붙는 예약은 허용하고, 수정할 때는 본인 예약을 제외합니다.',
            '겹치면 INSERT 없이 바로 예외를 돌려 화면에 안내합니다.',
          ] },
          { t: 'gallery', items: [
            { src: '/assets/portfolio-content/crew-reservation-tsx.webp', w: 820, h: 501, alt: '회의실별 시간대 예약 현황 화면', caption: '회의실 예약 화면' },
            { src: '/assets/portfolio-content/crew-reservation.webp', w: 824, h: 349, alt: '겹치는 예약 수를 세는 MyBatis 쿼리 countOverlappingRsrv', caption: '중복 예약 확인 쿼리' },
            { src: '/assets/portfolio-content/crew-reservation-query.webp', w: 502, h: 144, alt: '선택한 시간대에 이미 예약이 있다는 안내 문구', caption: '겹칠 때 화면 안내' },
          ] },
        ] },
      ],
    },
    {
      id: 'test', stage: 'te', title: '회의 예약부터 결재까지 자동화 흐름을 확인했습니다',
      blocks: [
        { t: 'scenario', items: [
          { title: '회의 예약', desc: '제목·일정과 진행 방식(화상회의·회의실 사용), 참여자를 정해 회의를 예약합니다.', img: { src: '/assets/portfolio-content/crew-step-1.webp', w: 619, h: 518, alt: '회의 예약 화면' } },
          { title: '회의 진행', desc: '발언이 5초 단위로 Whisper STT를 거쳐 자막이 되고 대화 로그로 쌓입니다.', img: { src: '/assets/portfolio-content/crew-step-2.webp', w: 1600, h: 1000, alt: '참여자 3명이 있는 화상회의 화면. 말하는 사람 테두리가 강조되고, 하단에 STT 자막 세 줄이 쌓임' } },
          { title: '회의록 자동 생성', desc: '회의를 끝내면 쌓인 대화 로그를 근거로 LLM이 회의록을 비동기로 만듭니다.', img: { src: '/assets/portfolio-content/crew-step-3.webp', w: 1200, h: 1306, alt: '자동 생성된 회의록. 결재란, 회의 정보 표, 회의 목적, 안건별 논의 내용, 결정 사항, 담당자·기한이 있는 액션 아이템으로 구성됨' } },
          { title: '전자결재 상신', desc: '참여자가 검토 후 결재를 요청하면 기안이 만들어지고, 승인되면 회의록이 확정됩니다.', img: { src: '/assets/portfolio-content/crew-step-4.webp', w: 1300, h: 870, alt: '회의록 결재 문서 상세. 첫 결재자는 승인해 결재란에 도장이 찍혔고, 두 번째 결재자는 결재 중' } },
        ] },
      ],
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
      image: { src: '/assets/portfolio-content/crew-case-1.webp', w: 1322, h: 1190, alt: '회의 도메인 재설계 자료', caption: '회의 도메인 재설계' },
    },
    {
      id: 'case-02', stage: 'te', stageText: '테스트 중 발견',
      title: '검색어 한 단어에 대형 검색 쿼리가 10번 넘게 실행됐다',
      found: '프론트엔드 연동 테스트 중 입력할수록 화면이 미세하게 버벅였고, 백엔드 콘솔에 같은 통합검색 SQL 로그가 순간적으로 몰려 찍혔습니다.',
      cause: '자모 하나를 입력할 때마다 API를 호출해 LIKE 검색이 연달아 실행되고 있었습니다.',
      fix: '<code>useEffect</code>와 <code>setTimeout</code>으로 250ms 디바운싱을 넣어, 입력이 끝난 뒤 한 번만 요청합니다.',
      result: 'API 호출 80% 이상 감소', resultNote: '크롬 Network 탭 실측',
      image: { src: '/assets/portfolio-content/crew-case-2.webp', w: 1275, h: 1234, alt: '통합검색 요청 비교 자료', caption: '통합검색 요청 비교' },
    },
    {
      id: 'case-03', stage: 'dv', stageText: '개발 단계 문제', collapsed: true, short: '회의 종료 API 타임아웃',
      title: '화상회의를 끝내면 회의 종료 API가 타임아웃됐다',
      cause: 'Whisper STT, LLM 회의록, 결재 기안 생성이 DB 트랜잭션 안에서 동기로 실행되고 있었습니다.',
      fix: '<code>MeetingEndedEvent</code>를 발행하고 <code>@TransactionalEventListener(AFTER_COMMIT)</code>와 <code>@Async</code>로 커밋 이후 비동기 처리했습니다.',
      result: '회의 종료와 후속 자동화가 서로 영향을 주지 않음',
    },
  ],
  retro: [
    '<b>배운 점</b> — 화상회의(LiveKit)를 중심으로 설계했다가, 오프라인 회의는 회의록·결재를 쓸 수 없다는 걸 구현 뒤에야 알았습니다. 기술이 아니라 <b>"회의"라는 실제 업무</b>를 상위 도메인으로 두고 설계해야 한다는 걸 <code>TB_MTNG</code> 재설계로 배웠습니다.',
    '<b>배운 점</b> — AA로 공통 응답·예외 규칙을 정할 때, 규칙만 적어서는 지켜지지 않았습니다. 팀원이 그대로 가져다 쓸 <b>공통 코드와 사용 예</b>를 함께 줘야 네 명의 코드가 같은 방식으로 맞춰진다는 걸 알게 됐습니다.',
    '<b>배운 점</b> — 회의 종료 API 안에서 STT·LLM·결재 기안까지 처리하다 타임아웃이 났습니다. 오래 걸리는 외부 API 호출은 트랜잭션 밖으로 빼서, 핵심 처리와 후속 자동화를 분리해야 한다는 걸 배웠습니다.',
    '<b>다음 과제</b> — 통합검색은 디바운싱으로 호출 수를 줄였지만, 6개 도메인을 <code>LIKE</code>로 훑는 검색 비용은 그대로입니다. 인덱스나 전문 검색 도입을 검토하고 싶습니다.',
  ],
};

const noblack = {
  id: 'noblack',
  name: 'N°BLACK',
  badge: { type: 'live', text: '운영 중인 실서비스' },
  meta: ['2026.09 — 11', '1인 개발 · 실제 브랜드 의뢰'],
  lead: '침구 브랜드 <b>N°BLACK</b>의 사이트입니다. 고객은 게임처럼 둘러보며 제품을 고르고, 운영자는 코드 없이 CMS로 제품·안내를 고쳐 게시합니다.',
  actions: [{ label: '배포 사이트 열기', href: 'https://oooooo.kr/', primary: true }],
  repoNote: '고객 의뢰 프로젝트라 저장소는 비공개입니다.',
  shot: { src: '/assets/noblack-screens/live-room.webp', w: 1600, h: 1000, url: 'oooooo.kr/room', alt: 'N°BLACK 나만의 방(MY ROOM). 픽셀 아트 침실에서 캐릭터를 움직여 휴식·즐거움·음악 퀘스트를 진행하는 화면', caption: 'MY ROOM · 방을 둘러보며 퀘스트를 진행' },
  screens: [
    { src: '/assets/noblack-screens/live-home.webp', w: 1600, h: 1000, url: 'oooooo.kr', alt: 'N°BLACK 홈의 퇴근길 게임. 밤거리 픽셀 아트에서 캐릭터가 오른쪽으로 걸어 집으로 가는 화면', caption: 'HOME · 퇴근길 게임(WAY HOME)' },
    { src: '/assets/noblack-screens/live-items.webp', w: 1600, h: 1000, url: 'oooooo.kr/item-book', alt: 'N°BLACK ITEMS 전체 제품 목록. 분류 탭과 제품 카드 격자', caption: 'ITEMS · 분류별 전체 제품 목록' },
  ],
  quote: '게임처럼 둘러보는 침구 브랜드 사이트 + 운영자가 직접 관리하는 CMS',
  stages: ['an', 'de', 'dv', 'te', 'dp'],
  glance: {
    tiles: [
      { label: '기간', value: '2026.09 — 11', sub: '3개월 · 개발 완료' },
      { label: '인원', value: '1인', sub: 'AI 도구 활용' },
      { label: '내 역할', value: '풀스택', sub: '요구사항부터 배포까지', strong: true },
      { label: '서비스', value: 'oooooo.kr', sub: 'OCI 서버 · 자동 배포' },
    ],
    chainLabel: '고객이 둘러보는 흐름',
    chain: ['퇴근길 게임', '나만의 방', '제품 카탈로그', '오늘의집에서 구매'],
    did: [
      { stage: 'an', mark: '01', text: '대표와 회의하며 요구사항과 수정 사항 정리' },
      { stage: 'de', mark: '02', text: 'PostgreSQL 데이터 구조와 초안·게시 흐름 설계' },
      { stage: 'dv', mark: '03', text: 'React 게임형 화면과 Spring 관리자 CMS 구현' },
      { stage: 'te', mark: '04', text: 'Playwright·JUnit 자동 검사와 CI/CD 배포' },
    ],
    credits: [
      ['대표', '브랜드 콘셉트 · 요구사항 · 원본 제품 사진'],
      ['직접', '방·게임 이미지(원본 사진을 바탕으로 AI로 제작)와 그 밖의 개발 전부'],
    ],
    stack: [
      ['프론트엔드', [['react', 'React 19'], ['typescript', 'TypeScript'], ['vitejs', 'Vite'], ['', 'Canvas API']]],
      ['백엔드', [['java', 'Java 21'], ['spring', 'Spring Boot'], ['spring', 'Spring Security']]],
      ['데이터', [['postgresql', 'PostgreSQL'], ['flyway', 'Flyway']]],
      ['테스트', [['playwright', 'Playwright'], ['junit', 'JUnit']]],
      ['배포', [['docker', 'Docker'], ['githubactions', 'GitHub Actions'], ['', 'OCI · Caddy']]],
    ],
  },
  sections: [
    {
      id: 'analysis', stage: 'an', title: '대표와 회의하며 무엇을 만들지 정했습니다',
      blocks: [
        { t: 'p', html: '회의에서 나온 요구를 세 갈래로 정리했습니다.' },
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
          '<b>운영 구조</b> — 브라우저 요청은 Caddy가 받아 화면 파일을 주고, <code>/api</code> 요청만 Spring Boot로 넘깁니다. Vite는 개발 환경에서만 씁니다.',
        ] },
        { t: 'figure', src: '/assets/noblack-diagrams/architecture.png', w: 1656, h: 1000, alt: '운영 환경: 사용자 브라우저가 HTTPS로 Caddy에 요청하고, Caddy가 /api 요청을 Spring Boot API(Spring Security → Controller → Service)로 넘기며 Service가 Repository·PostgreSQL과 MediaStorage를 사용. 아래 점선 영역의 개발 환경에는 Vite가 따로 있고, 빌드한 정적 파일은 운영에서 Caddy가 제공', caption: '서비스 구조 · 운영 흐름과 개발 환경 분리' },
        { t: 'p', html: '제품마다 상세 항목이 달라, 본문은 <b>JSONB</b>로 유연하게 저장하고 식별자·게시 상태·버전처럼 정합성이 중요한 값은 별도 컬럼으로 뒀습니다. JSONB는 요청 DTO의 <code>@Valid</code> 검증과 DB의 <code>CHECK (jsonb_typeof(payload) = \'object\')</code>로 두 번 검사합니다.' },
        { t: 'fold', title: '핵심 데이터 관계', sub: '콘텐츠 · 버전 · 파일 테이블', blocks: [
          { t: 'figure', src: '/assets/noblack-diagrams/erd.png', w: 1656, h: 1216, alt: '제품·안내 글은 여러 버전(product_revision, guide_article_revision)을 갖고, 버전별 이미지·디자인 이미지·첨부는 공용 파일 media_file을 참조하는 관계도', caption: '핵심 데이터 관계 · 콘텐츠 · 버전 · 파일' },
          { t: 'table', rows: [
            ['product · guide_article', '고유 코드, 상태, 공개 리비전 ID, 동시 수정 버전'],
            ['*_revision', '제목·분류·검색 정보와 JSONB 본문을 버전별로 저장'],
            ['media_file', '이미지·파일의 사용 위치를 버전에 연결'],
            ['admin_audit_log', '관리자 변경 이력'],
            ['outbound_click', '판매 링크 이동 API의 클릭 기록'],
          ] },
        ] },
        { t: 'h3', text: 'CMS 게시 흐름' },
        { t: 'p', html: '제품을 저장할 때마다 고객 화면이 바뀌면 작성 중인 문구가 노출될 수 있어, 초안과 게시본을 나눴습니다. 고객은 <code>published_revision_id</code>가 가리키는 게시본만 읽습니다.' },
        { t: 'figure', src: '/assets/noblack-diagrams/cms-publish.png', w: 1656, h: 1036, alt: '관리자 편집이나 과거 버전 복원은 초안으로 저장되고, 미리보기 뒤 게시 검증·리비전 확정·공개 포인터 전환을 하나의 트랜잭션으로 처리해 고객 API는 게시된 버전만 반환하는 흐름', caption: '초안에서 고객 공개까지' },
        { t: 'fold', title: '설계 선택', sub: '필요한 곳에만 추상화를 뒀습니다', blocks: [
          { t: 'table', rows: [
            ['파일 저장', '<code>MediaStorage</code> 인터페이스와 <code>LocalMediaStorage</code> 구현을 나눠, 업무 로직이 저장 방식에 묶이지 않게 했습니다. 지금은 로컬 저장소만 씁니다.'],
            ['화면 조작', '입력 처리(<code>useArcadeController</code>)와 화면별 동작(<code>SceneController</code> 인터페이스)을 나눠, 화면을 추가해도 조작 코드는 그대로 둡니다.'],
            ['게시 처리', '제품·안내의 게시 검증·리비전 확정·공개 전환을 <code>ContentService.publish</code> 한 곳의 트랜잭션에서 처리해, 콘텐츠 종류마다 규칙이 갈라지지 않게 했습니다.'],
          ] },
        ] },
      ],
    },
    {
      id: 'build', stage: 'dv', title: '게임형 화면과 운영 CMS를 함께 구현했습니다',
      blocks: [
        { t: 'h3', text: '프론트엔드 — 게임형 화면' },
        { t: 'feats', items: [
          { title: '키보드·조이스틱·터치를 하나의 조작 흐름으로', html: '<code>useArcadeController</code>가 메뉴와 콘텐츠 영역을 나눠 방향 입력과 포커스를 관리하고, 화면 전환 뒤 이전 위치로 포커스를 되돌립니다. 동작 줄이기 설정이면 오프닝을 건너뜁니다.' },
          { title: '화면 비율에 맞춘 방 카메라', html: '<code>roomCamera</code>가 화면 비율에 따라 넓은·좁은·세로 모드를 고르고 1~2배 확대를 지원합니다. 캐릭터가 안전 영역을 벗어날 때만 카메라가 따라갑니다. 계산은 React 밖 순수 함수로 분리해 테스트했습니다.' },
          { title: '모바일 전용 제품 화면', html: 'PC의 좌우 분할 화면을 휴대폰에 그대로 줄이면 제품 이미지와 정보가 작아져 읽기 어려웠습니다. 그래서 <code>useMobileViewport</code>로 좁은 화면을 판별해 이미지·정보·구매 버튼을 세로 흐름으로 다시 배치하고, 게임·실제·사용 이미지 전환은 그대로 유지했습니다.' },
        ] },
        { t: 'figure', src: '/assets/noblack-screens/pc-mobile.webp', w: 2474, h: 900, alt: '같은 차렵이불 상세 화면 세 장. 왼쪽 PC는 아케이드 프레임 안에 정보 표와 큰 제품 이미지가 나란히 있고, 가운데 모바일은 게임 뷰(픽셀 연출 이미지), 오른쪽 모바일은 사용 뷰(침실 사진)로 같은 자리에서 이미지만 바뀜', caption: 'PC 아케이드 화면(왼쪽)과 모바일 전용 화면 · 게임 뷰(가운데)와 사용 뷰(오른쪽) — 운영 사이트 캡처' },
        { t: 'h3', text: '백엔드 — 운영 CMS' },
        { t: 'feats', items: [
          { title: '초안과 게시본을 분리한 CMS', html: '편집·복원은 항상 새 초안 리비전으로 저장합니다. 게시하면 그 리비전을 확정(<code>is_draft = false</code>)하고 <code>published_revision_id</code>를 바꾼 뒤, 변경 내역을 <code>admin_audit_log</code>에 남깁니다.' },
          { title: '동시 수정 충돌 방지', html: '<code>SELECT … FOR UPDATE</code>로 행을 잠근 뒤 요청에 담긴 버전과 비교하고, 갱신도 <code>WHERE version = :version</code> 조건으로 한 번 더 확인합니다. 관리자가 읽은 버전이 이미 바뀌었으면 <code>409 Conflict</code>를 돌려줘, 오래된 편집이 최신 내용을 덮지 못하게 했습니다.' },
          { title: '관리자 보안과 파일 검증', html: 'Spring Security 세션 인증, Argon2id 비밀번호 해시, CSRF 토큰, 연속 실패 잠금을 적용했습니다. 업로드 파일은 실제 형식과 크기를 검사하고, 사용 중인 파일은 지울 수 없게 했습니다.' },
        ] },
        { t: 'gallery', items: [
          { src: '/assets/noblack-screens/admin-edit.webp', w: 1440, h: 900, alt: '관리자 제품 편집 화면. 왼쪽에 제품명·분류·소개 입력란, 오른쪽에 고객 모바일 화면과 같은 실시간 미리보기', caption: '제품 편집 — 왼쪽에서 입력하면 오른쪽 미리보기에 바로 반영' },
          { src: '/assets/noblack-screens/admin-publish.webp', w: 1440, h: 900, alt: '게시 전 확인 창. 고객에게 보일 화면을 미리 보여주고 편집으로 돌아가기와 게시 확정 버튼을 둠', caption: '게시 전 확인 — 고객에게 보일 화면을 확인한 뒤 게시' },
        ] },
        { t: 'fold', title: '주요 API', sub: '공개 조회 · 관리자 · 판매 링크', blocks: [
          { t: 'table', head: ['구분', '경로', '역할'], rows: [
            ['공개 조회', '<code>GET /api/products/**</code>, <code>/api/guides/**</code>', '게시된 제품·안내 조회'],
            ['관리자 인증', '<code>/api/admin/login</code>, <code>/api/admin/me</code>, <code>/api/admin/logout</code>', '세션 로그인·확인·로그아웃'],
            ['관리자 콘텐츠', '<code>/api/admin/products/**</code>, <code>/api/admin/guides/**</code>', '초안·게시·순서·버전 관리'],
            ['관리자 파일', '<code>/api/admin/media/**</code>', '업로드·사용 위치·삭제'],
            ['판매 링크', '<code>GET /api/outbound/product/{code}</code>', '오늘의집 상품 주소 검증 후 이동'],
          ] },
        ] },
      ],
    },
    {
      id: 'test', stage: 'te', title: '콘텐츠 공개·동시 수정·파일 삭제의 안전성을 검증했습니다',
      blocks: [
        { t: 'p', html: '운영하며 생길 수 있는 문제를 먼저 정하고, 그 문제를 시나리오로 만든 테스트 코드를 작성했습니다. PR마다 CI가 운영과 같은 PostgreSQL을 테스트용으로 띄워 자동으로 실행하고, 하나라도 실패하면 배포를 멈춥니다.' },
        { t: 'checks', items: [
          {
            title: '수정 중인 내용이 고객에게 먼저 보이지 않는다',
            situation: '제품을 게시한 뒤, 관리자가 초안을 고쳐 저장합니다.',
            expect: '고객용 API는 계속 기존 게시 내용을 돌려주고, 다시 게시해야 바뀐 내용이 보입니다.',
            how: '게시 → 초안 수정 → 고객 API 조회 → 재게시 → 다시 조회 순서로 응답을 비교합니다.',
            proof: '초안과 공개 버전을 나눈 설계가 실제로 지켜짐',
          },
          {
            title: '같은 버전으로 동시에 게시하면 하나만 성공한다',
            situation: '두 관리자가 같은 버전을 보고 동시에 게시합니다.',
            expect: '한 요청은 <code>200</code>, 다른 요청은 <code>409 Conflict</code>를 받고, 게시 버전은 하나만 생깁니다.',
            how: '두 스레드에서 게시 요청을 동시에 보내 응답 코드를 확인하고, DB에 생긴 게시 버전 수를 셉니다.',
            proof: '동시 요청의 중복 처리와 수정 충돌까지 고려함',
          },
          {
            title: '제품이 쓰는 이미지는 지울 수 없다',
            situation: '관리자가 파일 관리에서 이미지를 삭제합니다.',
            expect: '제품이 참조 중인 파일은 삭제가 거부되고, 어디에서도 쓰지 않는 파일만 지워집니다.',
            how: '참조 중인 파일과 쓰지 않는 파일에 각각 삭제를 요청해 결과와 남은 파일을 확인합니다.',
            proof: '파일 삭제로 고객 화면의 제품 이미지가 깨지는 상황을 막음',
          },
        ] },
      ],
    },
    {
      id: 'deploy', stage: 'dp', title: '검사를 통과하면 자동으로 배포됩니다',
      blocks: [
        { t: 'figure', src: '/assets/noblack-diagrams/deployment.png', w: 1656, h: 768, alt: 'Pull Request와 main push를 GitHub Actions가 민감 파일·프론트엔드·백엔드로 검사하고, main push가 통과하면 Docker 이미지를 GHCR에 올려 OCI에서 컨테이너를 교체하고 Caddy가 제공하는 흐름', caption: 'GitHub Actions 검사 → GHCR → OCI' },
        { t: 'bullets', items: [
          '<b>노출 최소화</b> — DB와 백엔드는 외부 포트를 열지 않고 Caddy만 웹 포트를 엽니다. DB도 마이그레이션 계정과 웹 실행 계정을 나눴습니다.',
          '<b>작은 서버에 맞춤</b> — OCI 1GB 메모리에 맞춰 컨테이너·JVM·DB 메모리 한도를 정했습니다.',
        ] },
      ],
    },
  ],
  cases: [
    {
      id: 'case-01', stage: 'de', stageText: '설계 단계 문제',
      title: '게임형 첫 화면에 집중하다 보니, 제품을 고르고 사러 가는 길이 멀어졌다',
      found: '대표의 요청으로 아케이드 게임 경험을 사이트의 첫 흐름으로 두었습니다. 실제 사이트를 점검해 보니 게임 조작은 잘 동작했지만, 구매하려는 사람은 게임을 지나야 제품에 닿았고 제품 상세에서도 구매 영역을 찾기 어려웠습니다.',
      cause: '게임 경험을 중심으로 화면을 설계하면서, 브랜드를 체험하려는 사람과 제품을 바로 사려는 사람의 목적을 나누지 않았습니다.',
      fix: [
        '<b>체험 동선</b>: MY ROOM 퀘스트를 마치면 침대·소파에 ITEM 태그가 나타나고, 누르면 그 자리에 놓인 제품 목록이 뜨고, 고르면 바로 제품 상세로 이동. 새로 게시한 제품도 분류에 따라 자동으로 태그에 들어감',
        '<b>바로 구매 동선</b>: 어느 화면에서나 ITEMS 메뉴로 제품 목록 → 상세 → 오늘의집 구매까지 이동. 오프닝은 건너뛰기 가능',
        '<b>상세 화면 역할 분리</b>: 게임 뷰는 브랜드 연출, 실제·사용 뷰는 구매 판단용으로 나누고, 모바일은 구매 버튼을 하단에 고정',
      ],
      result: '게임으로 둘러보는 동선과 바로 사는 동선을 함께 제공', resultNote: '대표가 원한 게임형 첫 경험은 유지',
      image: { src: '/assets/noblack-screens/flow-paths.webp', w: 1800, h: 900, alt: '두 동선이 같은 제품 상세로 모이는 그림. 위는 MY ROOM에서 침대 ITEM 태그를 눌러 연 제품 목록, 아래는 ITEMS 메뉴의 전체 제품 목록이고, 둘 다 화살표로 오른쪽의 차렵이불 상세(오늘의집 상품 보기 버튼)로 이어짐', caption: '체험 동선과 바로 구매 동선이 같은 제품 상세로 모임 — 실제 화면 캡처' },
    },
    {
      id: 'case-02', stage: 'dp', stageText: '운영 중 발견',
      title: '정상 JPG가 업로드되지 않아, 해상도와 용량을 따로 확인하고 자동 최적화로 해결했다',
      found: '관리자 화면에서 제품 JPG를 올리자 "입력값의 형식과 길이를 확인해 주세요" 오류가 났습니다. JPG를 지원하지 않는 줄 알았지만, 실제 파일과 업로드 검증 코드를 확인하니 다른 원인이 있었습니다.',
      cause: 'JPG는 이미 지원하고 있었습니다. 파일은 약 3.94MB로 용량 제한(5MB) 안이었지만, 해상도가 5792×4344px(약 2,516만 픽셀)로 서버의 1,000만 픽셀 제한을 넘었습니다. 용량과 해상도는 서로 다른 제한인데, 실패 원인이 공통 오류 메시지로만 표시돼 원인을 알기 어려웠습니다.',
      fix: [
        '<b>실패 원인 안내</b>: 업로드 전에 실제 파일 형식·용량·해상도를 확인하고, 넘은 제한과 해결 방법을 구체적으로 표시',
        '<b>크기를 줄여 업로드</b>: 버튼 하나로 가로·세로 비율을 유지하며 해상도를 줄이고, 필요하면 압축 품질도 조정해 두 제한을 모두 맞춘 사본을 업로드',
        '<b>원본과 이미지 특성 보존</b>: PC의 원본 파일은 그대로 두고, PNG·WebP의 투명 배경을 유지하며, 만든 사본은 서버에서 다시 검증',
      ],
      result: '3.94MB → 1.04MB(약 74% 감소), 3651×2738px로 줄여 업로드 성공', resultNote: '관련 브라우저 검사 61개 통과',
      image: { src: '/assets/noblack-screens/upload-optimize.webp', w: 1700, h: 830, alt: '관리자 파일함의 업로드 흐름 두 단계. 1단계는 일반 업로드 시 이미지가 5792×4344px로 1,000만 픽셀을 넘었다는 빨간 안내, 2단계는 크기를 줄여 업로드 후 3651×2738px로 줄여 업로드했고 원본은 변경되지 않았다는 초록 안내', caption: '제한 초과 안내 → 크기를 줄여 업로드 — 실제 파일과 같은 해상도·용량의 시험 이미지로 재현한 관리자 화면' },
    },
  ],
  retro: [
    '<b>배운 점</b> — 의뢰인의 요구와 사용자의 목적이 부딪힐 때, 한쪽을 고르기보다 <b>목적별로 길을 나눠 둘 다 충족하는 설계</b>를 제안할 수 있게 됐습니다.',
    '<b>배운 점</b> — 실서비스에서는 운영자의 작은 실수도 바로 고객 화면에 드러나, 기능을 만들 때 <b>실수를 막는 장치를 처음부터 함께</b> 설계해야 한다는 걸 배웠습니다. 초안과 게시본 분리, 동시 수정 감지, 사용 중인 파일 보호가 그렇게 만든 장치입니다.',
    '<b>배운 점</b> — 좋은 오류 메시지는 실패를 전하는 데서 그치지 않고, <b>무엇이 왜 안 되고 어떻게 하면 되는지</b>까지 담아야 한다는 걸 알게 됐습니다.',
  ],
};

const cinema = {
  id: 'cinema',
  name: 'Cinema Talk',
  meta: ['2026.02 — 2026.03', '5인 팀 · 교육과정 프로젝트'],
  lead: '영화 정보와 커뮤니티를 한곳에 모은 서비스입니다. <b>Spring 없이 Servlet으로 MVC 구조를 만들어</b>, 프레임워크가 대신해 주던 요청 처리 흐름을 직접 다뤄 본 프로젝트입니다.',
  actions: [
    { label: 'GitHub 저장소', href: 'https://github.com/TaeSeungJeon/Cinema_Talk' },
    { label: '내 PR 19', href: prList('TaeSeungJeon/Cinema_Talk'), title: '내가 작성한 PR' },
  ],
  shot: { src: '/assets/cinema.webp', w: 1078, h: 937, url: 'cinema-talk', alt: 'Cinema Talk 메인 화면', caption: '메인 화면 · 추천 영화와 커뮤니티' },
  quote: '영화 정보 · 커뮤니티 — 대덕인재개발원 풀스택 과정 팀 프로젝트',
  stages: ['an', 'de', 'dv', 'te'],
  glance: {
    tiles: [
      { label: '기간', value: '2026.02 – 03', sub: '대덕인재개발원' },
      { label: '인원', value: '5인 팀', sub: '교육과정 프로젝트' },
      { label: '내 역할', value: '풀스택', sub: '추천 · 관리자 통계·영화 관리', strong: true },
      { label: '구조', value: 'Servlet MVC', sub: '프레임워크 없이 만든 팀 구조' },
    ],
    chainLabel: '사용자 흐름',
    chain: ['회원가입', '선호 장르 설정', '영화 탐색', '상세 · 좋아요'],
    did: [
      { stage: 'dv', mark: '01', text: '선호 장르 기반 추천과 홈 화면 추천·현재 상영작' },
      { stage: 'dv', mark: '02', text: '관리자 통계 대시보드(기간 비교·방문자 추이)' },
      { stage: 'dv', mark: '03', text: '관리자 영화 관리(장르·출연진·제작진 수정)' },
    ],
    stack: [
      ['백엔드', [['java', 'Java 21'], ['', 'Servlet/JSP'], ['mybatis', 'MyBatis 3.5'], ['maven', 'Maven']]],
      ['프론트엔드', [['', 'JSTL'], ['jquery', 'jQuery'], ['chartjs', 'Chart.js']]],
      ['데이터', [['oracle', 'Oracle']]],
      ['서버', [['tomcat', 'Tomcat 10']]],
    ],
  },
  sections: [
    {
      id: 'analysis', stage: 'an', title: '만들 기능을 네 갈래로 나눴습니다',
      blocks: [
        { t: 'p', html: '영화 정보와 커뮤니티를 한 서비스로 묶기 위해, 기능을 데이터 수집·추천·커뮤니티·관리 네 갈래로 나눠 정리했습니다.' },
        { t: 'reqs', items: [
          { tag: '영화 정보', title: 'TMDB 데이터 배치 수집', desc: '배치 프로그램을 실행해 영화·배우·제작진 데이터를 Oracle DB에 적재' },
          { tag: '추천', title: '취향과 인기를 함께 반영', desc: '선호 장르·인기 점수·장르별 섹션으로 첫 화면 구성' },
          { tag: '커뮤니티', title: '게시판과 좋아요', desc: '게시글 등록·목록, 영화 좋아요 이력 저장' },
          { tag: '관리자', title: '통계 대시보드', desc: 'Chart.js로 서비스 현황을 보는 관리자 화면' },
        ] },
      ],
    },
    {
      id: 'design', stage: 'de', title: 'MVC 흐름과 데이터를 먼저 그렸습니다',
      blocks: [
        { t: 'bullets', items: [
          'JSP · Servlet · MyBatis 3계층입니다.',
          '팀은 Spring MVC 없이 MVC 구조를 직접 만들기로 했습니다. 프레임워크가 내부에서 하는 일을 이해하는 것이 목적이었습니다.',
        ] },
        { t: 'figure', src: '/assets/portfolio-content/cinema-architecture.png', w: 1308, h: 831, alt: 'Cinema Talk 시스템 아키텍처', caption: '시스템 아키텍처' },
        { t: 'table', rows: [
          ['클라이언트', 'Browser(JSP) — JSTL, jQuery, 세션 인증, AJAX'],
          ['서버', 'Java 21 · Servlet MVC — FrontController, Action, Service, MyBatis DAO'],
          ['데이터', 'Oracle DB · 파일 저장소 — MyBatis MERGE, ROWNUM 페이지네이션, 첨부파일'],
          ['외부 연동', 'TMDB API(영화·배우·제작진 수집), Gmail SMTP(임시 비밀번호 발송)'],
        ] },
        { t: 'h3', text: '팀 공통 구조 — FrontController 요청 흐름' },
        { t: 'bullets', items: [
          '모든 <code>.do</code> 요청을 하나의 서블릿이 받아 Properties 파일에서 클래스명을 찾고, Reflection으로 인스턴스를 만들어 실행합니다.',
          '새 기능을 추가할 때 Java 코드를 고치지 않고 properties 파일에 한 줄만 더하면 됩니다.',
        ] },
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
        { t: 'h3', text: 'ERD' },
        { t: 'point', text: '설계 포인트 · 역할 기반 분리 · 복합 PK' },
        { t: 'figure', src: '/assets/portfolio-files/cinema-erd.png', w: 1453, h: 750, alt: 'Cinema Talk ERD', caption: 'ERD · 영화·인물·회원 취향' },
        { t: 'table', rows: [
          ['MOVIE', '영화 관리'],
          ['MOVIE_CREW · MOVIE_CAST', '영화 제작진·출연진 관리'],
          ['PERSON', '인물 관리'],
          ['MOVIE_GENRE · GENRE', '영화 장르와 전체 장르 관리'],
          ['MEMBER_GENRE', '회원 선호 장르 관리'],
          ['MEMBER_MOVIE_RECOMMEND', '좋아요 관리'],
        ] },
        { t: 'fold', title: 'URL 명세 · 구현 화면', sub: '.do 방식 URL 7개 · 구현 화면 4장', blocks: [
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
            { src: '/assets/portfolio-content/cinema-home.webp', w: 1078, h: 699, alt: 'Cinema Talk 홈 화면. 위쪽은 추천 영화 3편을 넘겨 보는 큰 배너(파묘), 아래쪽은 포스터를 좌우로 넘겨 보는 현재 상영작 목록', caption: '홈 · 추천 영화 배너와 현재 상영작' },
            { src: '/assets/portfolio-content/cinema-recommend.webp', w: 1600, h: 878, alt: 'Cinema Talk 영화 추천 목록. 회원 취향 추천, 지금 뜨는 콘텐츠, 장르별 추천 줄이 이어짐', caption: '영화 추천 목록' },
            { src: '/assets/portfolio-files/cinema-wireframe-2.png', w: 1283, h: 888, alt: 'Cinema Talk 관리자 통계 대시보드 화면', caption: '관리자 · 통계 대시보드' },
            { src: '/assets/portfolio-files/cinema-wireframe-3.png', w: 1210, h: 898, alt: 'Cinema Talk 관리자 영화 정보 관리 화면', caption: '관리자 · 영화 정보 관리' },
          ] },
        ] },
      ],
    },
    {
      id: 'build', stage: 'dv', title: '프레임워크 없는 구조 위에서 추천을 만들었습니다',
      blocks: [
        { t: 'h3', text: '선호 장르 기반 추천' },
        { t: 'feats', items: [
          { title: '선호 장르 추천', html: '로그인 여부와 선호 장르 설정 여부로 3단계 분기합니다. 선호 장르가 있으면 해당 장르 영화를 <code>DBMS_RANDOM</code>으로 섞어 매번 다른 결과를 보여줍니다.' },
          { title: '인기 영화 추천', html: '평점 20% + 회원 추천수 80% 가중치로 점수를 매겨 상위 60개를 고른 뒤 섞어, 인기 편향 없이 다양한 영화를 노출합니다.' },
          { title: '장르별 섹션', html: '장르별 인기 상위 100개 중 20개를 고르고 <code>ROW_NUMBER() OVER (PARTITION BY movieId)</code>로 중복을 없앤 뒤, <code>LinkedHashMap</code>으로 장르 순서를 지켜 묶습니다.' },
        ] },
        { t: 'h3', text: '관리자 통계와 영화 관리' },
        { t: 'feats', items: [
          { title: '직전 기간과 비교하는 통계', html: '7·30·90·365일 또는 직접 고른 기간의 신규 회원·게시글·투표 참여·문의 수를, 같은 길이의 직전 기간과 비교해 증감률로 보여줍니다. 방문자 추이는 <code>DAILY_VISIT</code> 테이블을 만들어 일별로 쌓고 Chart.js로 그립니다.' },
          { title: '기간을 바꿔도 차트가 겹치지 않게', html: 'AJAX로 기간을 바꿀 때마다 차트가 중복 생성되던 문제를, 기존 차트를 <code>destroy()</code>한 뒤 다시 그리도록 고쳤습니다. 선택한 기간은 서버와 맞춰 새로고침 뒤에도 유지됩니다.' },
          { title: '영화 수정을 한 트랜잭션으로', html: '기본 정보와 함께 장르·출연진·제작진(중간 테이블)을 바꿀 때, 차이를 비교하는 대신 전부 지우고 다시 넣는 방식으로 단순화했습니다. 이 과정을 하나의 <code>SqlSession</code>에서 처리해 실패하면 모두 롤백합니다.' },
        ] },
        { t: 'fold', title: '화면 ↔ 코드 · 카드 뒤집기와 장르 색상', sub: 'JSP → FrontController → Action → Service → DAO', blocks: [
          { t: 'bullets', items: [
            '추천 화면을 요청하면 Action이 <code>likeRecList</code>, <code>popularRecList</code>, <code>genreSections</code>를 request scope에 담아 JSP로 넘깁니다.',
            '<code>movieCard.jsp</code>를 <code>jsp:include</code>로 분리해 카드를 재사용했고, 마우스를 올리면 카드가 뒤집히며 장르별 색상 pill이 붙습니다.',
          ] },
          { t: 'figure', src: '/assets/portfolio-content/cinema-code-screen.webp', w: 1077, h: 289, alt: '추천 목록에서 카드 하나가 뒤집혀 영화 정보가 보이는 화면', caption: '카드 뒤집기 · 마우스를 올리면 영화 정보 표시' },
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
      id: 'test', stage: 'te', title: '가입부터 추천·좋아요까지 이어지는 흐름을 확인했습니다',
      blocks: [
        { t: 'scenario', items: [
          { title: '회원가입', desc: '아이디 중복 확인과 BCrypt 암호화를 서버에서 처리합니다.', img: { src: '/assets/portfolio-content/cinema-step-1.webp', w: 787, h: 621, alt: '회원가입 화면' } },
          { title: '선호 장르 설정', desc: '가입 직후 장르를 고르면 MEMBER_GENRE에 저장되어 추천의 기준이 됩니다.', img: { src: '/assets/portfolio-content/cinema-step-2.webp', w: 750, h: 599, alt: '선호 장르 설정 화면' } },
          { title: '영화 탐색', desc: '추천 목록에서 카드를 뒤집어 미리 본 뒤 상세로 들어갑니다.', img: { src: '/assets/portfolio-content/cinema-step-3.webp', w: 408, h: 443, alt: '영화 탐색 화면' } },
          { title: '영화 상세', desc: '출연진·감독과 줄거리를 보고, 좋아요를 누르면 MEMBER_MOVIE_RECOMMEND에 이력이 남습니다.', img: { src: '/assets/portfolio-content/cinema-step-4.webp', w: 879, h: 746, alt: '영화 상세 화면' } },
        ] },
      ],
    },
  ],
  cases: [],
  retro: [
    '<b>배운 점</b> — 프레임워크 없이 요청이 FrontController → Action → Service → DAO로 흐르는 과정을 직접 따라가 보며, 이후 Spring의 DispatcherServlet·핸들러 매핑이 무엇을 대신해 주는지 이해하고 쓰게 됐습니다.',
  ],
};

export const details = { crew, noblack, cinema };
export const detailOrder = ['crew', 'noblack', 'cinema'];

// 예전 주소(#project/crew/16 같은 PDF 쪽 번호, N°BLACK README 절 이름)를 새 단계로 연결합니다.
export const legacyAnchors = {
  crew: { 14: 'overview', 15: 'design', 16: 'design', 17: 'analysis', 18: 'design', 19: 'build', 20: 'build', 21: 'build', 22: 'build', 23: 'build', 24: 'test', 25: 'case-01', 26: 'case-02' },
  cinema: { 6: 'overview', 7: 'design', 8: 'design', 9: 'design', 10: 'build', 11: 'build', 12: 'build', 13: 'test' },
  noblack: { core: 'build', structure: 'design', cms: 'design', data: 'design', patterns: 'design', cases: 'trouble', api: 'build' },
};
