import { useState } from 'react';

// public/assets 아래의 실제 프로젝트 자료를 Vite base 경로에 맞춰 불러옵니다.
const asset = (filename) => import.meta.env.BASE_URL + 'assets/' + filename;

const STACKS = [
  {
    title: 'Backend',
    skills: ['Java 21', 'Spring Boot', 'Spring Security', 'REST API', 'MyBatis', 'JPA / JDBC', 'JWT / Redis', 'SSE / STOMP']
  },
  {
    title: 'Frontend',
    skills: ['React', 'JavaScript', 'TypeScript', 'Vite', 'JSP', 'HTML / CSS', 'Responsive UI']
  },
  {
    title: 'Database & DevOps',
    skills: ['PostgreSQL', 'Oracle DB', 'Flyway', 'Docker / Compose', 'GitHub Actions', 'OCI', 'Caddy / Nginx']
  },
  {
    title: 'Design & Collaboration',
    skills: ['요구사항 정의', 'ERD', 'API 명세', '공통 아키텍처', 'Git / PR', 'Swagger', 'Playwright']
  }
];

function OutArrow({ className = '' }) {
  return <svg className={className} width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M4 16 16 4M6 4h10v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

function ArrowRight() {
  return <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M3 10h13m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

function Tag({ children, muted = false }) {
  return <span className={'tag' + (muted ? ' tag-muted' : '')}>{children}</span>;
}

function SectionHeading({ number, eyebrow, title, description }) {
  return <div className="section-heading">
    <div className="section-heading-top">
      <span className="mono section-kicker">{number} / {eyebrow}</span>
      <span className="hairline" aria-hidden="true" />
    </div>
    <h2>{title}</h2>
    {description && <p>{description}</p>}
  </div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const nav = [
    ['#about', 'About'],
    ['#work', 'Work'],
    ['#skills', 'Skills'],
    ['#contact', 'Contact']
  ];
  return <header className="site-header">
    <a className="brand" href="#top" aria-label="맨 위로 이동"><span className="brand-mark">H<span>.</span>J</span><span className="brand-name">HAN JAEHUN<span> / PORTFOLIO</span></span></a>
    <button className="mobile-menu-toggle" type="button" aria-expanded={open} aria-label={open ? '메뉴 닫기' : '메뉴 열기'} onClick={() => setOpen(!open)}>
      <span></span><span></span>
    </button>
    <nav className={'nav' + (open ? ' nav-open' : '')} aria-label="기본 메뉴">
      {nav.map(([href, name]) => <a href={href} key={href} onClick={() => setOpen(false)}>{name}</a>)}
      <a className="nav-resume" href="https://github.com/sksqlrlek/Portfolio/blob/main/portfolio.pdf" target="_blank" rel="noopener noreferrer">Portfolio PDF <OutArrow /></a>
    </nav>
  </header>;
}

function Intro() {
  return <section className="hero" id="top" aria-labelledby="hero-title">
    <div className="hero-main">
      <div className="hero-headline">
        <div className="hero-eyebrow mono"><span className="status-dot" /> FULL-STACK DEVELOPER <span className="eyebrow-dash">—</span> PORTFOLIO 2026</div>
        <h1 id="hero-title"><span>Han.</span><span className="last-name">Jaehun<span className="hero-period">.</span></span></h1>
        <div className="hero-bottomline">
          <p className="hero-statement">서비스의 흐름을 이해하고,<br /><strong>안정적인 구현을 고민하는 개발자.</strong></p>
          <p className="hero-summary">기능 하나보다 서비스 전체를 봅니다. 요구사항 분석과 설계, 프론트엔드와 백엔드 구현, 테스트와 배포까지 흐름을 연결하며 문제의 원인을 끝까지 추적합니다.</p>
        </div>
      </div>
      <aside className="hero-side">
        <div className="side-top mono">BUILDING SERVICE FLOW <span>↗</span></div>
        <div className="hero-side-content">
          <div className="side-label mono">01 / CORE STACK</div>
          <div className="core-skills"><span>JAVA</span><span>SPRING BOOT</span><span>REACT</span><span>SQL</span><span>DOCKER</span></div>
          <div className="side-divider"></div>
          <div className="side-label mono">02 / FEATURED WORK</div>
          <a href="#mycrew" className="featured-link"><span>MyCrewSoft</span><OutArrow /></a>
          <a href="#noblack" className="featured-link"><span>NO.BLACK</span><OutArrow /></a>
          <a href="#cinema" className="featured-link"><span>Cinema Talk</span><OutArrow /></a>
        </div>
        <div className="side-footer mono">SCROLL TO EXPLORE <span>↓</span></div>
      </aside>
    </div>
    <div className="hero-ticker" aria-hidden="true"><span>ANALYSIS</span><i>✳</i><span>ARCHITECTURE</span><i>✳</i><span>DEVELOPMENT</span><i>✳</i><span>TESTING</span><i>✳</i><span>DEPLOYMENT</span><i>✳</i></div>
  </section>;
}

function About() {
  return <section className="about section-pad" id="about">
    <SectionHeading number="01" eyebrow="ABOUT ME" title={<>기능을 넘어서, <em>흐름을</em> 봅니다.</>} description="보이는 화면과 보이지 않는 시스템을 함께 생각하는 풀스택 개발자입니다." />
    <div className="about-grid">
      <div className="about-quote">
        <div className="mono quote-label">MY APPROACH</div>
        <p>“작동하는 코드에서 멈추지 않고,<br />왜 이렇게 동작하는지까지<br /><strong>설명할 수 있는 개발.</strong>”</p>
        <span className="quote-asterisk" aria-hidden="true">✳</span>
      </div>
      <div className="about-points">
        <article className="about-point"><span className="mono">01</span><div><h3>문제의 원인을 추적합니다.</h3><p>로그, 쿼리, API 요청과 응답을 따라가며 증상보다 근본 원인을 해결하려고 합니다.</p></div></article>
        <article className="about-point"><span className="mono">02</span><div><h3>공통 구조와 협업을 중요하게 생각합니다.</h3><p>그룹웨어 프로젝트에서 AA 역할로 인증, 공통 응답, 예외 처리와 개발 규칙을 정리했습니다.</p></div></article>
        <article className="about-point"><span className="mono">03</span><div><h3>실제 서비스를 끝까지 만듭니다.</h3><p>브랜드 의뢰 기반 NO.BLACK을 기획부터 구현, 데이터베이스, 컨테이너 배포까지 연결했습니다.</p></div></article>
      </div>
    </div>
  </section>;
}

function DetailToggle({ open, onClick, children, light = false }) {
  return <div className={'detail-shell' + (light ? ' detail-light' : '')}>
    <button type="button" className="detail-toggle" aria-expanded={open} onClick={onClick}>
      <span>{open ? '기술 및 구현 포인트 접기' : '기술 및 구현 포인트 자세히 보기'}</span><span aria-hidden="true">{open ? '−' : '+'}</span>
    </button>
    {open && <div className="detail-content">{children}</div>}
  </div>;
}

function Projects() {
  const [opened, setOpened] = useState(null);
  const toggle = (id) => setOpened(opened === id ? null : id);

  return <div id="work">
    <section className="work-intro section-pad">
      <SectionHeading number="02" eyebrow="SELECTED WORK" title={<>선택한 기술보다, <em>만들어낸 경험.</em></>} description="팀 프로젝트의 공통 아키텍처부터 실제 의뢰를 받은 웹 서비스까지, 서로 다른 문제를 다루었습니다." />
      <div className="work-count"><span className="mono">FEATURED PROJECTS</span><strong>03<span> / 03</span></strong></div>
    </section>

    <section id="mycrew" className="project project-mycrew" aria-labelledby="mycrew-title">
      <div className="project-topline"><span className="mono">PROJECT 01 <span>—</span> TEAM PROJECT</span><span className="mono">AA · FULL-STACK</span></div>
      <div className="project-mycrew-grid">
        <div className="project-info">
          <div className="project-index mono">01 / GROUPWARE PLATFORM</div>
          <h3 id="mycrew-title" className="project-title">MyCrew<span>Soft.</span></h3>
          <p className="project-lead">AA로 백엔드 공통 아키텍처를 설계하고, 팀원들과 통합 그룹웨어의 핵심 기능을 구현했습니다.</p>
          <p className="project-desc">프로젝트·업무·일정·회의·메신저·전자결재를 연결하는 서비스입니다. Spring Security/JWT 기반 인증 구조, 공통 API 응답과 예외 처리 등을 정리해 일관된 개발 기준을 만들었습니다.</p>
          <div className="metric-grid">
            <div><strong>04</strong><span>TEAM MEMBERS</span></div>
            <div><strong>12</strong><span>DASHBOARD WIDGETS</span></div>
            <div><strong>06</strong><span>SEARCH DOMAINS</span></div>
          </div>
          <div className="tags"><Tag>Java / Spring Boot</Tag><Tag>React</Tag><Tag>Oracle</Tag><Tag>JWT · SSE · STOMP</Tag></div>
          <DetailToggle open={opened === 'mycrew'} onClick={() => toggle('mycrew')}>
            <div className="detail-columns"><div><h4>담당 및 설계</h4><p>공통 응답(ApiResponse), 전역 예외 처리, 인증/인가 구조, Git 전략 및 코드 컨벤션, 팀 코드 리뷰.</p></div><div><h4>주요 기능</h4><p>사용자별 대시보드 위젯, 6개 도메인 통합 검색, LiveKit 회의와 STT/LLM 회의록·전자결재 연계.</p></div></div>
          </DetailToggle>
        </div>
        <div className="project-visual mycrew-visual">
          <div className="browser-bar"><span className="browser-dots"><i></i><i></i><i></i></span><span>mycrewsoft / dashboard</span><span>↗</span></div>
          <img className="project-screenshot" src={asset('--mqpxf3sw.png')} alt="MyCrewSoft 프로젝트 소개 화면" loading="lazy" />
          <div className="visual-bottom"><span className="mono">SYSTEM OVERVIEW</span><span>01 — 03</span></div>
        </div>
      </div>
      <div className="project-bottom"><span>ANALYSIS → ARCHITECTURE → IMPLEMENTATION</span><a href={asset('mycrew-architecture.svg')} target="_blank" rel="noopener noreferrer">아키텍처 보기 <OutArrow /></a></div>
    </section>

    <section id="noblack" className="project project-noblack" aria-labelledby="noblack-title">
      <div className="project-topline"><span className="mono">PROJECT 02 <span>—</span> REAL CLIENT PROJECT</span><span className="mono">DESIGN · DEVELOPMENT · DEPLOYMENT</span></div>
      <div className="noblack-grid">
        <div className="noblack-art">
          <div className="arcade-window">
            <div className="arcade-header"><span className="arcade-dot"></span><span>NO.BLACK / MY ROOM</span><span>● ONLINE</span></div>
            <img src={asset('noblack-room.svg')} alt="NO.BLACK의 픽셀룸 화면을 재구성한 일러스트" loading="lazy" />
            <div className="arcade-footer"><span>◀　▶　 DOT / REAL</span><span>PRESS START　↗</span></div>
          </div>
          <span className="art-caption mono">PIXEL-ROOM MOTIF · CODE-BASED PREVIEW</span>
        </div>
        <div className="noblack-content">
          <div className="project-index mono">02 / BRAND EXPERIENCE</div>
          <h3 id="noblack-title" className="project-title">NO<span>.</span>BLACK</h3>
          <p className="noblack-label">실제 브랜드 의뢰 기반 웹 서비스 구축</p>
          <p className="project-lead">침구 브랜드의 정체성을 게임처럼 탐험하는 웹사이트.</p>
          <p className="project-desc">이커머스 브랜드 대표의 의뢰를 받아 브랜드 소개와 제품 홍보를 위한 웹사이트를 제작했습니다. 구매는 오늘의집 판매 페이지로 연결하고, 홈페이지는 브랜드 경험과 제품 탐색에 집중하도록 설계했습니다.</p>
          <div className="noblack-actions">
            <a className="button button-cream" href="https://oooooo.kr/" target="_blank" rel="noopener noreferrer">배포 사이트 열기 <OutArrow /></a>
            <a className="button button-outline" href="https://github.com/sksqlrlek/noblack" target="_blank" rel="noopener noreferrer">GitHub <OutArrow /></a>
          </div>
          <div className="tags"><Tag muted>React / TypeScript</Tag><Tag muted>Spring Boot</Tag><Tag muted>PostgreSQL</Tag><Tag muted>Docker / OCI</Tag></div>
          <DetailToggle open={opened === 'noblack'} onClick={() => toggle('noblack')} light>
            <div className="detail-columns"><div><h4>서비스 구조</h4><p>React 화면·게임, 관리자 CMS, Spring API, PostgreSQL 게시 콘텐츠 및 외부 판매 링크 관리.</p></div><div><h4>운영과 배포</h4><p>Docker Compose, HTTPS, OCI와 GitHub Actions 기반 CI/CD. 관리자 입력 콘텐츠와 파일 업로드는 서비스 데이터로 분리.</p></div></div>
          </DetailToggle>
        </div>
      </div>
      <div className="project-bottom"><span>BRAND STORY → INTERACTION → OPERATIONS</span><span>LIVE SERVICE</span></div>
    </section>

    <section id="cinema" className="project project-cinema" aria-labelledby="cinema-title">
      <div className="project-topline"><span className="mono">PROJECT 03 <span>—</span> WEB APPLICATION</span><span className="mono">FULL-STACK</span></div>
      <div className="cinema-grid">
        <div className="cinema-info">
          <div className="project-index mono">03 / MOVIE COMMUNITY</div>
          <h3 id="cinema-title" className="project-title">Cinema<br /><i>Talk.</i></h3>
          <p className="project-lead">MVC 구조와 데이터 흐름을 바탕으로 구현한 영화 커뮤니티 웹 서비스.</p>
          <p className="project-desc">JSP, MyBatis, Oracle을 활용해 사용자 요청부터 Controller·Service·Mapper와 데이터베이스까지 이어지는 웹 서비스의 기본 구조를 구현했습니다. 영화 추천과 관리자 통계 기능을 다루었습니다.</p>
          <div className="tags"><Tag>Java / JSP</Tag><Tag>MyBatis</Tag><Tag>Oracle DB</Tag><Tag>MVC</Tag></div>
          <DetailToggle open={opened === 'cinema'} onClick={() => toggle('cinema')}>
            <div className="detail-columns"><div><h4>핵심 구현</h4><p>영화 검색·추천, 사용자 기능, 관리자 통계 및 MVC 계층별 역할 분리.</p></div><div><h4>학습 포인트</h4><p>HTTP 요청 처리, SQL 매핑, 관계형 데이터 모델과 화면–서버 간 데이터 전달 흐름.</p></div></div>
          </DetailToggle>
        </div>
        <div className="cinema-visual">
          <div className="cinema-frame"><div className="cinema-top mono"><span>CINEMA TALK</span><span>● ● ●</span></div><img src={asset('--mqot093c.png')} alt="Cinema Talk 프로젝트의 주요 화면" loading="lazy" /><div className="cinema-subtitle mono">PROJECT SCREENSHOT / 2026</div></div>
          <span className="cinema-accent" aria-hidden="true">03</span>
        </div>
      </div>
      <div className="project-bottom"><span>SPRING MVC · JSP · DATABASE</span><a href={asset('-1-erd-mqnxcqaq.png')} target="_blank" rel="noopener noreferrer">ERD 보기 <OutArrow /></a></div>
    </section>
  </div>;
}

function Skills() {
  const [current, setCurrent] = useState(0);
  return <section className="skills-section section-pad" id="skills">
    <SectionHeading number="03" eyebrow="TECH & PROCESS" title={<>기술을 연결하는 <em>개발 과정.</em></>} description="프레임워크 사용을 넘어 설계 의도와 서비스 운영까지 생각합니다." />
    <div className="skills-layout">
      <div className="skills-tabs" role="tablist" aria-label="기술 분류">
        {STACKS.map((group, index) => <button key={group.title} role="tab" aria-selected={current === index} onClick={() => setCurrent(index)} className={current === index ? 'active' : ''}><span className="mono">0{index+1}</span><strong>{group.title}</strong><span aria-hidden="true">{current === index ? '↗' : '+'}</span></button>)}
      </div>
      <div role="tabpanel" className="skills-panel">
        <div className="mono">SELECTED TOOLKIT / {String(current + 1).padStart(2, '0')}</div>
        <h3>{STACKS[current].title}</h3>
        <div className="skills-cloud">{STACKS[current].skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
        <p>프로젝트에서 실제로 사용하거나 설계·테스트에 활용한 주요 기술과 활동입니다.</p>
      </div>
    </div>
    <div className="process-line"><span className="mono">HOW I WORK</span><div><b>01</b> 요구사항 분석</div><ArrowRight /><div><b>02</b> 설계</div><ArrowRight /><div><b>03</b> 구현</div><ArrowRight /><div><b>04</b> 검증 · 배포</div></div>
  </section>;
}

function Contact() {
  return <footer id="contact" className="contact">
    <div className="contact-top mono"><span>04 / CONTACT</span><span>LET'S BUILD SOMETHING MEANINGFUL</span></div>
    <div className="contact-main">
      <div><p className="contact-pre">기술과 사람 사이의 흐름을 연결합니다.</p><h2>Let's make<br /><em>it work.</em></h2></div>
      <a className="contact-arrow" href="mailto:sksqlrlek@gmail.com" aria-label="이메일 보내기"><OutArrow /></a>
    </div>
    <div className="contact-links"><a href="mailto:sksqlrlek@gmail.com">sksqlrlek@gmail.com <OutArrow /></a><a href="https://github.com/sksqlrlek" target="_blank" rel="noopener noreferrer">GitHub <OutArrow /></a><a href="https://github.com/sksqlrlek/Portfolio/blob/main/portfolio.pdf" target="_blank" rel="noopener noreferrer">Portfolio PDF <OutArrow /></a></div>
    <div className="contact-bottom mono"><span>© 2026 HAN JAEHUN. BUILT WITH REACT.</span><a href="#top">BACK TO TOP ↑</a></div>
  </footer>;
}

export default function App() {
  return <><Header /><main><Intro /><About /><Projects /><Skills /></main><Contact /></>;
}
