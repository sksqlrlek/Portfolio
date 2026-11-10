import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { crewRoleSummary, email, noblackSummary, projects } from './data';
import { NoblackReader, PortfolioReader } from './portfolio-reader';
import { PortfolioContent } from './portfolio-content';
import { chapters, pageTitles } from './portfolio-pages';
import './style.css';

const github = 'https://github.com/sksqlrlek';
function ExternalLink({ href, children, className }) {
  return <a href={href} className={className} target="_blank" rel="noreferrer">{children} <span aria-hidden="true">↗</span></a>;
}

function Header() {
  return (
    <header className="site-rail">
      <div className="rail-inner">
        <a className="brand" href="#home" aria-label="한재훈 포트폴리오 첫 화면"><span className="brand-symbol">jh<span>.</span></span><span className="brand-word">HAN JAEHUN</span></a>
        <nav className="site-nav" aria-label="주 메뉴">
          <p className="rail-label">INDEX</p>
          <a href="#home"><span aria-hidden="true">00</span> 첫 화면</a>
          <a href="#projects" data-tone="fern"><span aria-hidden="true">01</span> 프로젝트</a>
          <a href="#about" data-tone="coral"><span aria-hidden="true">02</span> 소개</a>
          <a href="#skills" data-tone="gold"><span aria-hidden="true">03</span> 기술·과정</a>
          <a href="#portfolio" data-tone="lavender" className="rail-original"><span aria-hidden="true">04</span> 원본 전체</a>
          <a href="#contact" className="rail-contact"><span aria-hidden="true">05</span> 연락처</a>
        </nav>
        <div className="rail-footer">
          <div className="rail-profile"><img src="/assets/profile.png" alt="" width="35" height="35" /><span><span aria-hidden="true">$ </span>whoami<strong>Han Jaehun</strong></span></div>
          <a className="top-resume" href="/resume.html">이력서 <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="name">
      <div className="frame hero-inner">
        <div className="cover-meta eyebrow">
          <p className="hero-label"><i aria-hidden="true" /> JAVA · SPRING / DEVELOPER PORTFOLIO</p>
          <span>한재훈 · 대전</span>
        </div>
        <h1 id="name" aria-label="한재훈, Han Jaehun">
          <span className="masthead-line">Han</span>{' '}
          <span className="masthead-line">Jaehun<span className="masthead-period">.</span></span>
        </h1>
        <div className="cover-summary">
          <div className="hero-intro">
            <p className="hero-role"><span>화면에서 서버까지,</span> 서비스의 흐름을 설계합니다.</p>
            <p className="hero-description">Java·Spring 기반 백엔드 / 풀스택 개발자</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#projects">대표 작업 <span aria-hidden="true">↓</span></a>
              <a className="button cover-resume" href="#portfolio">원본 27쪽 보기</a>
              <ExternalLink className="text-link" href={github}>GitHub</ExternalLink>
            </div>
          </div>
          <dl className="profile-facts" aria-label="프로필 요약">
            <div><dt>주력 기술</dt><dd>Java · Spring Boot</dd></div>
            <div><dt>팀 프로젝트</dt><dd>MyCrewSoft · 그룹웨어 AA</dd></div>
            <div><dt>개인 프로젝트</dt><dd>NO.BLACK · 브랜드 웹사이트</dd></div>
            <div><dt>학력·자격</dt><dd>한밭대학교 산업경영공학과 · SQLD · 정보처리기능사</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function WindowDots() {
  return <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>;
}

function ProjectTags({ tags }) {
  return <ul className="project-tags" aria-label="사용 기술">{tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>;
}

function ProjectImage({ image, alt, label, caption }) {
  return (
    <figure className="project-media">
      <div className="project-media-frame">
        <div className="project-media-bar"><WindowDots /><span>{label}</span></div>
        <img src={`/assets/${image}`} alt={alt} loading="lazy" />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function WorkIndex() {
  const [cinema, crew, noblack] = projects;

  return (
    <section className="frame section work-section" id="projects" data-tone="fern" aria-labelledby="work-title">
      <div className="section-heading work-heading">
        <div><p className="eyebrow">01 / SELECTED WORK</p><h2 id="work-title">대표 작업</h2></div>
      </div>

      <article className="featured-work work-crew" data-tone="fern" id="work-crew" aria-labelledby="crew-title">
        <header className="case-header">
          <div className="featured-copy">
            <p className="eyebrow project-kicker"><span>팀 프로젝트</span> 그룹웨어 · 2026.05–06</p>
            <h3 id="crew-title">{crew.name}</h3>
            <p className="case-lead">{crewRoleSummary}</p>
          </div>
          <div className="project-actions">
            <a className="button button-dark" href="#project/crew">설계·구현 보기 <span aria-hidden="true">→</span></a>
            <ExternalLink className="text-link" href={crew.repo}>GitHub</ExternalLink>
          </div>
        </header>
        <dl className="case-metrics" aria-label="MyCrewSoft 협업 및 구현 범위">
          <div><dt>팀 개발</dt><dd>4<span>인</span></dd></div>
          <div><dt>대시보드 위젯</dt><dd>12<span>종</span></dd></div>
          <div><dt>통합검색 도메인</dt><dd>6<span>개</span></dd></div>
        </dl>
        <div className="case-preview">
          <ProjectImage image={crew.image} alt="MyCrewSoft 그룹웨어의 실제 대시보드" label="MyCrewSoft / Dashboard" caption="MyCrewSoft 실제 대시보드" />
        </div>
        <dl className="case-notes" aria-label="MyCrewSoft 주요 작업">
          <div><dt>공통 설계</dt><dd>백엔드 공통 아키텍처와 팀 협업 가이드</dd></div>
          <div><dt>회의 자동화</dt><dd>LiveKit 녹취부터 AI 회의록·전자결재 기안까지</dd></div>
          <div><dt>실시간 기능</dt><dd>이벤트 기반 SSE 알림과 WebSocket 메신저</dd></div>
        </dl>
        <ProjectTags tags={crew.tags} />
      </article>

      <article className="featured-work work-noblack" data-tone="copper" id="work-noblack" aria-labelledby="noblack-title">
        <div className="noblack-feature">
          <header className="featured-copy noblack-heading">
            <p className="eyebrow project-kicker"><span>실제 의뢰</span> 브랜드 웹사이트 · 1인 개발</p>
            <h3 id="noblack-title">{noblack.name}</h3>
          </header>
          <ProjectImage image={noblack.image} alt="NO.BLACK의 실제 픽셀룸. 침구가 놓인 방과 게임 인터페이스" label="NO.BLACK / MY ROOM" caption={<ExternalLink className="text-link" href={noblack.roomUrl}>실제 MY ROOM 체험</ExternalLink>} />
          <div className="noblack-copy">
            <div className="project-actions">
              <ExternalLink className="button button-accent" href={noblack.liveUrl}>배포 사이트 열기</ExternalLink>
              <a className="text-link" href="#project/noblack">개발 내용 보기 <span aria-hidden="true">→</span></a>
            </div>
            <p className="project-summary">{noblackSummary}</p>
            <ProjectTags tags={noblack.tags} />
          </div>
        </div>
      </article>

      <article className="featured-work work-cinema" data-tone="lavender" id="work-cinema" aria-labelledby="cinema-title">
        <div className="featured-grid">
          <div className="featured-copy">
            <p className="eyebrow project-kicker"><span>팀 프로젝트</span> 영화 커뮤니티</p>
            <h3 id="cinema-title">{cinema.name}</h3>
            <p className="project-role">풀스택 / TA · 2026.02–2026.03</p>
            <p className="project-summary">FrontController와 Action 인터페이스로 MVC 패턴 직접 구현</p>
            <ProjectTags tags={cinema.tags} />
            <div className="project-actions"><a className="button button-dark" href="#project/cinema">Cinema Talk 자료 보기 <span aria-hidden="true">→</span></a></div>
          </div>
          <ProjectImage image={cinema.image} alt="Cinema Talk 영화 커뮤니티 화면" label="Cinema Talk" caption="Cinema Talk 실제 화면" />
        </div>
      </article>
    </section>
  );
}

function Skills() {
  return (
    <section className="section skills-section" id="skills" data-tone="gold" aria-labelledby="skills-title">
      <div className="frame">
        <div className="section-heading"><div><p className="eyebrow">03 / TECH STACK &amp; PROCESS</p><h2 id="skills-title">기술 스택과 개발 과정</h2></div></div>
        <PortfolioContent page={4} />
        <PortfolioContent page={5} />
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="frame section about-section" id="about" data-tone="coral" aria-labelledby="about-title">
      <div className="section-heading"><div><p className="eyebrow">02 / ABOUT ME</p><h2 id="about-title">소개</h2></div><a className="text-link" href="/resume.html">이력서 보기 <span aria-hidden="true">↗</span></a></div>
      <PortfolioContent page={3} />
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <footer id="contact" className="contact-section">
      <div className="frame contact-inner">
        <div><p className="eyebrow">05 / CONTACT</p><h2>연락처</h2><a className="email" href={`mailto:${email}`}>{email}</a> <button className="copy-button" type="button" onClick={copyEmail}>{copied ? '복사 완료' : '복사'}</button><span className="sr-only" role="status">{copied ? '이메일 주소를 복사했습니다.' : ''}</span></div>
        <div className="contact-links"><ExternalLink href={github}>GitHub</ExternalLink><a href="/resume.html">이력서 ↗</a><a href="#home">맨 위로 ↑</a></div>
      </div>
    </footer>
  );
}

function readRoute(hash) {
  const [name, key, page] = hash.slice(1).split('/');
  if (name === 'portfolio') {
    return { view: 'portfolio', target: pageTitles[Number(key)] ? `portfolio-page-${Number(key)}` : 'reader-start' };
  }
  if (name === 'project') {
    const project = projects.find((item) => item.id === key);
    if (project?.id === 'noblack') return { view: 'noblack', project, target: page ? `noblack-section-${page}` : 'reader-start' };
    if (project) {
      const chapter = chapters.find((item) => item.id === project.id);
      return { view: project.id, project, target: chapter.pages.includes(Number(page)) ? `portfolio-page-${Number(page)}` : 'reader-start' };
    }
  }
  return { view: 'home', target: hash.slice(1) || 'home' };
}

function App() {
  const [hash, setHash] = useState(() => window.location.hash);
  const { view, target, project } = readRoute(hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const destination = document.getElementById(target) ?? document.getElementById('reader-start');
    if (!destination) return;
    destination.scrollIntoView({ behavior: 'instant' });
    if (view !== 'home') destination.focus({ preventScroll: true });
  }, [hash, target, view]);

  return (
    <>
      <a className="skip-link" href="#main" onClick={(event) => {
        event.preventDefault();
        document.getElementById('main').focus();
      }}>본문으로 바로가기</a>
      <div className="portfolio-layout">
        <Header />
        <div className="portfolio-content">
          <main id="main" tabIndex={-1}>
            {view === 'home' && <><Hero /><WorkIndex /><About /><Skills /></>}
            {view === 'portfolio' && <PortfolioReader key="portfolio" full />}
            {view === 'noblack' && <NoblackReader project={project} />}
            {project && view !== 'noblack' && <PortfolioReader key={project.id} project={project} />}
          </main>
          <Contact />
        </div>
      </div>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
