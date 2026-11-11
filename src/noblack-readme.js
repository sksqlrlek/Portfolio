// NO.BLACK 상세 페이지 본문. README 내용을 상세 페이지 형식으로 다시 구성했습니다.
export const noblackSections = [
 {
  "id": "overview",
  "number": "01",
  "title": "프로젝트 개요",
  "html": "<p class=\"point-lead\"><strong>게임처럼 탐색하는 침구 브랜드 웹사이트</strong>와, 운영자가 직접 관리하는 콘텐츠 관리 시스템(CMS)입니다.</p><ul class=\"point-list\"><li>고객은 오프닝, 퇴근길 게임, 나만의 방, 제품 카탈로그를 거쳐 제품을 확인하고 오늘의집 판매 페이지로 이동합니다.</li><li>운영자는 코드를 수정하지 않고 제품, 이미지, 안내를 편집하고 게시합니다.</li><li>작성 중인 초안이 고객에게 노출되거나, 다른 관리자의 수정을 덮어쓰는 일을 막습니다.</li></ul><table><thead><tr><th>항목</th><th>내용</th></tr></thead><tbody><tr><td>개발 기간</td><td>2026년 8월경 ~ 진행 중</td></tr><tr><td>개발 인원</td><td>1명 · AI 도구 활용</td></tr><tr><td>담당 범위</td><td>프론트엔드 · 백엔드 · DB · 배포 구성</td></tr><tr><td>협업 방식</td><td>NO.BLACK 대표와 회의하며 요구사항과 수정 사항을 확인하고 반영</td></tr></tbody></table><p>AI 도구는 개발과 문서 정리에 활용했습니다.</p>"
 },
 {
  "id": "core",
  "number": "02",
  "title": "핵심 구현",
  "html": "<div class=\"content-point\"><h4>초안과 게시본을 분리한 CMS</h4><p>고객은 <code>published_revision_id</code>가 가리키는 게시본만 읽습니다. 게시 검증, 리비전 확정, 공개 포인터 변경, 감사 기록은 하나의 트랜잭션으로 처리합니다.</p></div><div class=\"content-point\"><h4>동시 수정 충돌 방지</h4><p>관리자가 읽은 <code>expectedVersion</code>과 현재 버전이 다르면 <code>409 Conflict</code>를 반환합니다. 행 잠금과 버전 조건으로 오래된 편집 내용이 최신 내용을 덮어쓰지 못하게 했습니다.</p></div><div class=\"content-point\"><h4>관리자 보안과 파일 검증</h4><p>Spring Security 세션 인증, Argon2id 비밀번호 해시, CSRF 토큰, 연속 실패 잠금을 적용했습니다. 업로드 파일은 실제 형식과 크기를 검사하고, 사용 중인 파일의 삭제는 막습니다.</p></div><div class=\"content-point\"><h4>자동 검사와 배포</h4><p>GitHub Actions 검사를 통과하면 이미지를 GHCR에 게시하고 OCI 서버의 컨테이너를 교체합니다.</p></div>"
 },
 {
  "id": "structure",
  "number": "03",
  "title": "전체 구조",
  "html": "<figure class=\"readme-diagram\"><img src=\"/assets/noblack-diagrams/architecture.svg\" alt=\"전체 구조\" loading=\"lazy\"><figcaption><a href=\"/assets/noblack-diagrams/architecture.svg\" target=\"_blank\" rel=\"noreferrer\">전체 구조 크게 보기 ↗</a></figcaption></figure><ul class=\"point-list\"><li>프론트엔드: 화면 조립 → 상태·조작 훅 → API 읽기·응답 변환 → 표시 컴포넌트로 역할을 나눴습니다.</li><li>백엔드: Controller(HTTP 입출력) → Service(업무 규칙·트랜잭션) → Repository(DB 접근) 계층과 생성자 주입을 사용합니다.</li><li>Caddy가 빌드된 React 파일과 HTTPS를 담당합니다. 공개 API는 게시된 콘텐츠만 조회하고, 관리자 API의 접근 권한은 서버에서 검사합니다.</li></ul><table><thead><tr><th>영역</th><th>기술</th></tr></thead><tbody><tr><td>Frontend</td><td>React 19, TypeScript, React Router, Vite, Canvas API</td></tr><tr><td>Backend</td><td>Java 21, Spring Boot, Spring Security, Spring Data JPA, Maven</td></tr><tr><td>Database</td><td>PostgreSQL 18, Flyway(V1~V9 스키마 변경 관리)</td></tr><tr><td>테스트</td><td>Playwright, JUnit, Spring Boot Test, MockMvc</td></tr><tr><td>배포</td><td>Docker Compose, Caddy, GitHub Actions, GHCR, OCI</td></tr></tbody></table>"
 },
 {
  "id": "cms",
  "number": "04",
  "title": "CMS 게시 흐름",
  "html": "<p class=\"point-lead\">제품을 저장할 때마다 고객 화면이 바뀌면 <strong>작성 중인 문구가 노출</strong>될 수 있어, 초안과 게시본을 나눴습니다.</p><figure class=\"readme-diagram\"><img src=\"/assets/noblack-diagrams/cms-publish.svg\" alt=\"CMS 게시 흐름\" loading=\"lazy\"><figcaption><a href=\"/assets/noblack-diagrams/cms-publish.svg\" target=\"_blank\" rel=\"noreferrer\">CMS 게시 흐름 크게 보기 ↗</a></figcaption></figure><ul class=\"point-list\"><li>확정된 본문과 파일 연결은 DB 트리거로 직접 변경을 제한합니다.</li><li>숨김·휴지통은 공개 조회를 중단하고, 복구한 콘텐츠는 숨김 상태 또는 새 초안으로 처리합니다.</li><li>구현: <code>ContentService</code>, <code>ContentRepository</code></li></ul>"
 },
 {
  "id": "data",
  "number": "05",
  "title": "데이터 설계",
  "html": "<figure class=\"readme-diagram\"><img src=\"/assets/noblack-diagrams/erd.svg\" alt=\"데이터 구조 ERD\" loading=\"lazy\"><figcaption><a href=\"/assets/noblack-diagrams/erd.svg\" target=\"_blank\" rel=\"noreferrer\">데이터 구조 ERD 크게 보기 ↗</a></figcaption></figure><ul class=\"point-list\"><li><code>product</code>, <code>guide_article</code>: 고유 코드, 상태, 공개 리비전 ID, 동시 수정 버전을 관리합니다.</li><li><code>product_revision</code>, <code>guide_article_revision</code>: 제목, 분류, 검색 정보, JSONB 본문을 버전별로 저장합니다.</li><li><code>media_file</code>과 참조 테이블: 이미지·파일의 사용 위치를 버전에 연결합니다.</li><li><code>admin_user</code>, <code>admin_audit_log</code>, <code>outbound_click</code>: 관리자 계정, 변경 감사 이력, 판매 링크 클릭 기록을 저장합니다.</li><li>제품마다 테이블이나 화면을 추가하지 않고 소개·특징·사이즈·기본 정보의 공통 구조를 사용합니다.</li></ul>"
 },
 {
  "id": "patterns",
  "number": "06",
  "title": "설계 패턴 검토",
  "html": "<p class=\"point-lead\">패턴을 쓰기 위해 쓰지 않고, <strong>이 프로젝트에 필요한지 검토</strong>해 적용 범위를 정했습니다.</p><table><thead><tr><th>패턴</th><th>적용·검토 내용</th></tr></thead><tbody><tr><td>싱글톤</td><td>Spring Bean의 기본 singleton scope로 서비스·저장소 객체를 관리합니다. 직접 만든 전역 singleton 클래스는 없습니다.</td></tr><tr><td>브리지</td><td>키보드·조이스틱 입력과 화면별 동작을 <code>SceneController</code> 인터페이스와 React ref로 연결해 조작부와 구현체를 분리했습니다.</td></tr><tr><td>팩토리 메서드</td><td>객체 생성은 Spring DI와 명시적 생성으로 충분해 상속 기반 계층은 도입하지 않았습니다.</td></tr><tr><td>템플릿 메서드</td><td>제품·안내의 게시 순서를 <code>ContentService.publish</code>에서 공유합니다. 상속으로 단계를 교체하는 구조는 도입하지 않았습니다.</td></tr></tbody></table><p>파일 저장은 <code>MediaStorage</code> 인터페이스와 <code>LocalMediaStorage</code> 구현을 분리해, 다른 저장소가 필요할 때 교체할 수 있게 했습니다.</p>"
 },
 {
  "id": "cases",
  "number": "07",
  "title": "문제 해결",
  "html": "<div class=\"h-casegrid\"><article class=\"h-case\" data-tone=\"coral\"><h3>느린 화면 전환 뒤 포커스가 튀는 문제</h3><dl><div><dt>원인</dt><dd>예약된 메뉴 포커스 복원이 사용자의 새 선택을 덮어썼습니다.</dd></div><div><dt>해결</dt><dd>진입 시 포커스를 기록하고, 복원 직전에 현재 포커스와 비교합니다.</dd></div><div><dt>확인</dt><dd><code>useArcadeController</code>, <code>catalog-entry.spec.ts</code></dd></div></dl></article><article class=\"h-case\" data-tone=\"gold\"><h3>방의 퀘스트 표시가 화면마다 어긋나는 문제</h3><dl><div><dt>원인</dt><dd>숨긴 설명의 너비와 버튼 중심 정렬이 사물 좌표에 영향을 줬습니다.</dd></div><div><dt>해결</dt><dd>원본 이미지의 비율 좌표, 꼬리 끝 기준, 상자 높이를 분리했습니다.</dd></div><div><dt>확인</dt><dd><code>room.ts</code>, <code>room-markers.spec.ts</code></dd></div></dl></article><article class=\"h-case\" data-tone=\"fern\"><h3>개발 중 504 Outdated Optimize Dep 오류</h3><dl><div><dt>원인</dt><dd>개발 서버와 프록시 검증 서버가 의존성 캐시를 공유했습니다.</dd></div><div><dt>해결</dt><dd>앱은 모드·API 대상별로, 테스트는 실행별로 캐시를 분리했습니다.</dd></div><div><dt>확인</dt><dd><code>vite.config.ts</code>, <code>dev-api-proxy.spec.ts</code></dd></div></dl></article><article class=\"h-case\" data-tone=\"lavender\"><h3>이전 API 응답이 현재 화면을 덮어쓰는 문제</h3><dl><div><dt>원인</dt><dd>분류·페이지를 바꾼 뒤 늦게 끝난 요청의 결과가 화면에 남을 수 있었습니다.</dd></div><div><dt>해결</dt><dd><code>AbortController</code>와 요청 키로 이전 결과를 버리고, 로딩·빈 목록·오류를 구분합니다.</dd></div><div><dt>확인</dt><dd><code>usePublicContent</code>, <code>public-content.spec.ts</code></dd></div></dl></article></div>"
 },
 {
  "id": "deploy",
  "number": "08",
  "title": "배포와 운영",
  "html": "<figure class=\"readme-diagram\"><img src=\"/assets/noblack-diagrams/deployment.svg\" alt=\"배포 흐름\" loading=\"lazy\"><figcaption><a href=\"/assets/noblack-diagrams/deployment.svg\" target=\"_blank\" rel=\"noreferrer\">배포 흐름 크게 보기 ↗</a></figcaption></figure><ul class=\"point-list\"><li>PR과 <code>main</code> push에서 검사를 실행하고, 통과하면 프론트·백엔드 이미지를 커밋 SHA와 <code>latest</code> 태그로 GHCR에 게시한 뒤 OCI 서버의 컨테이너를 교체합니다.</li><li>운영 구성에서 DB와 백엔드는 외부 포트를 공개하지 않고, Caddy가 웹 포트와 TLS를 담당합니다.</li><li>DB 마이그레이션 계정과 웹 런타임 계정을 분리했고, OCI 1GB 메모리 환경에 맞춰 컨테이너·JVM·DB 메모리를 설정했습니다.</li></ul>"
 },
 {
  "id": "test",
  "number": "09",
  "title": "테스트 범위",
  "html": "<table><thead><tr><th>구분</th><th>검사 대상</th></tr></thead><tbody><tr><td>프론트엔드 정적 검사</td><td>TypeScript strict 타입 검사, Vite 프로덕션 빌드</td></tr><tr><td>Playwright</td><td>게임·방·메뉴 조작, URL·포커스 복귀, PC/모바일 배치, 관리자 편집·게시·파일 관리</td></tr><tr><td>백엔드 단위 검사</td><td>계정·비밀번호 정책, 판매 URL 정책, 파일 검증</td></tr><tr><td>DB 통합 검사</td><td>PostgreSQL 제약·트랜잭션, 인증·CSRF·세션, CMS 게시·동시 수정, 파일 참조</td></tr><tr><td>CI</td><td>민감 파일 추적 검사, 프론트·백엔드 검사, 런타임 의존성 취약점 검사</td></tr></tbody></table><p>이 결과만으로 운영 데이터, 외부 주문·결제, 실제 모바일 기기, 서버 부하까지 검증했다고 볼 수는 없습니다.</p>"
 },
 {
  "id": "api",
  "number": "10",
  "title": "주요 API",
  "html": "<table><thead><tr><th>구분</th><th>경로</th><th>역할</th></tr></thead><tbody><tr><td>제품</td><td><code>GET /api/products</code>, <code>/api/products/{code}</code></td><td>게시 제품 목록·단건 조회</td></tr><tr><td>안내</td><td><code>GET /api/guides</code>, <code>/api/guides/{type}/{code}</code></td><td>공지·설명서·QNA 조회</td></tr><tr><td>관리자 인증</td><td><code>/api/admin/csrf</code>, <code>/login</code>, <code>/me</code>, <code>/logout</code></td><td>CSRF·로그인·세션 확인</td></tr><tr><td>관리자 콘텐츠</td><td><code>/api/admin/products/**</code>, <code>/api/admin/guides/**</code></td><td>초안·게시·순서·이력 관리</td></tr><tr><td>관리자 파일</td><td><code>/api/admin/media/**</code></td><td>업로드·사용 위치·삭제 관리</td></tr><tr><td>판매 링크 이동</td><td><code>GET /api/outbound/product/{code}</code></td><td>판매 URL 검증, 클릭 기록 후 302 이동</td></tr></tbody></table><p>로컬 실행 방법과 전체 API 명세는 위의 “README 원문”에서 볼 수 있습니다.</p>"
 }
];
