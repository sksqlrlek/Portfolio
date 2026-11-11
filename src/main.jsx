import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { email, projects } from './data';
import { NoblackReader, PortfolioReader } from './portfolio-reader';
import { chapters, pageTitles } from './portfolio-pages';
import { cards, cases, proofs, skills, stages } from './home-data';
import './style.css';
import './home.css';

const github = 'https://github.com/sksqlrlek';
const asset = (p) => `/assets/${p}`;

function Ext({ href, children, className }) {
  return <a href={href} className={className} target="_blank" rel="noreferrer">{children} <span aria-hidden="true">↗</span></a>;
}

// 상단 고정 메뉴: 왼쪽 사이드바 대신 가로 메뉴로 바꿔 본문 폭을 넓혔습니다.
function Header() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a className="topbar-brand" href="#home">한재훈</a>
        <nav className="topbar-nav" aria-label="주 메뉴">
          <a href="#about">소개</a><a href="#process">개발 과정</a><a href="#projects">프로젝트</a>
          <a href="#cases">문제 해결</a><a href="#contact">연락처</a>
        </nav>
        <a className="topbar-resume" href="/resume.html">이력서</a>
      </div>
    </header>
  );
}

// 첫 화면: 이름보다 "어떤 개발자인지"를 가장 크게 보여줍니다.
function Hero() {
  return (
    <section className="h-hero" id="home" aria-labelledby="hero-title">
      <div className="h-wrap">
        <p className="h-hero-name">신입 풀스택 개발자 한재훈</p>
        <h1 id="hero-title">문제의 원인을 끝까지 파고들고, 분석·설계부터 직접 하는 개발자</h1>
        <p className="h-hero-sub">요구사항 분석, ERD·화면 설계, 구현, 테스트, 배포까지 한 사이클을 직접 해 봤습니다.</p>
        <div className="h-hero-actions">
          <Ext className="h-btn h-btn-main" href={projects[2].liveUrl}>NO.BLACK 라이브 보기</Ext>
          <a className="h-btn h-btn-line" href="#project/crew">MyCrewSoft 설계·구현</a>
          <a className="h-btn h-btn-line" href="/resume.html">이력서</a>
        </div>
        <ul className="h-proofs" aria-label="핵심 근거">
          {proofs.map(([t, d]) => <li key={t}><strong>{t}</strong><span>{d}</span></li>)}
        </ul>
      </div>
    </section>
  );
}

// 개발 전 과정: 단계를 고르면 그 단계에서 실제로 만든 산출물을 보여줍니다.
function Process() {
  const [active, setActive] = useState(1);
  const [zoom, setZoom] = useState(null);
  const stage = stages[active];

  useEffect(() => {
    if (!zoom) return undefined;
    const onKey = (e) => e.key === 'Escape' && setZoom(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoom]);

  return (
    <section className="h-section" id="process" aria-labelledby="process-title">
      <div className="h-wrap">
        <h2 id="process-title">분석부터 배포까지, 직접 해 본 과정</h2>
        <p className="h-lead">단계를 눌러 그 단계에서 만든 결과물을 확인하세요. 그림을 누르면 크게 볼 수 있습니다.</p>
        <div className="h-stagebar" role="group" aria-label="개발 단계">
          {stages.map((s, i) => (
            <button key={s.id} type="button" data-tone={s.tone} aria-pressed={i === active} onClick={() => setActive(i)}>
              <span aria-hidden="true">{i + 1}</span>{s.name}
            </button>
          ))}
        </div>
        <div className="h-stagepanel" data-tone={stage.tone}>
          <div className="h-stagetext">
            <h3>{stage.name}</h3>
            <p>{stage.lead}</p>
            <ul>{stage.outputs.map((o) => <li key={o}>{o}</li>)}</ul>
          </div>
          <div className="h-shots">
            {stage.shots.length === 0 && <p className="h-empty">테스트 코드는 GitHub 저장소에서 확인할 수 있습니다.</p>}
            {stage.shots.map(([label, path]) => (
              <button key={path} type="button" className={`h-shot${path.endsWith('.svg') ? ' h-shot-wide' : ''}`} onClick={() => setZoom([label, path])}>
                <img src={asset(path)} alt={label} loading="lazy" /><span>{label}<em>확대 보기</em></span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {zoom && (
        <div className="h-lightbox" role="dialog" aria-modal="true" aria-label={zoom[0]} onClick={() => setZoom(null)}>
          <button type="button" className="h-lightbox-close" autoFocus onClick={() => setZoom(null)}>닫기</button>
          <img src={asset(zoom[1])} alt={zoom[0]} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}

// 프로젝트 3개를 같은 틀로 통일: 한 일 → 결과 → 참여 단계 → 링크
function Projects() {
  return (
    <section className="h-section h-alt" id="projects" aria-labelledby="projects-title">
      <div className="h-wrap">
        <h2 id="projects-title">프로젝트</h2>
        <div className="h-cards">
          {cards.map((c) => (
            <article key={c.id} className="h-card" data-tone={c.tone}>
              <img src={asset(c.image)} alt={c.alt} loading="lazy" />
              <div className="h-card-body">
                <p className="h-kind">{c.kind}</p>
                <h3>{c.name}</h3>
                <p>{c.role}</p>
                <p className="h-result">{c.result}</p>
                <p className="h-done" aria-label="참여한 단계">{['분석', '설계', '개발', '테스트', '배포'].map((n) => <span key={n} data-on={c.done.includes(n)}>{n}</span>)}</p>
                <ul className="h-tags" aria-label="사용 기술">{c.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                <div className="h-actions">
                  {c.live && <Ext className="h-btn h-btn-main" href={c.live}>배포 사이트</Ext>}
                  {c.room && <Ext className="h-btn h-btn-line" href={c.room}>MY ROOM 체험</Ext>}
                  <a className="h-btn h-btn-line" href={c.detail}>설계·개발 내용</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// 문제 해결 기록: 문제 → 원인 → 해결 → 결과 순서로 같은 틀에 담았습니다.
function Cases() {
  return (
    <section className="h-section" id="cases" aria-labelledby="cases-title">
      <div className="h-wrap">
        <h2 id="cases-title">원인을 끝까지 파고든 기록</h2>
        <div className="h-casegrid">
          {cases.map((c) => (
            <article key={c.title} className="h-case" data-tone={c.tone}>
              <p className="h-kind">{c.where}</p>
              <h3>{c.title}</h3>
              <dl>
                <div><dt>문제</dt><dd>{c.problem}</dd></div>
                <div><dt>원인</dt><dd>{c.cause}</dd></div>
                <div><dt>해결</dt><dd>{c.fix}</dd></div>
                <div><dt>결과</dt><dd>{c.result}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="h-section h-alt" id="about" aria-labelledby="about-title">
      <div className="h-wrap h-about">
        <img src={asset('profile.png')} alt="한재훈 프로필 사진" width="220" height="280" loading="lazy" />
        <div>
          <h2 id="about-title">소개</h2>
          <p className="h-lead">6년간 비영리 단체에서 기획과 행정을 하며, 반복되는 불편은 시스템으로 풀 수 있다고 느껴 개발자가 되었습니다. Java·Spring부터 JSP·React까지 서버와 화면을 함께 다룹니다.</p>
          <dl className="h-skills">
            {skills.map(([g, items]) => <div key={g}><dt>{g}</dt><dd>{items.join(' · ')}</dd></div>)}
          </dl>
          <p className="h-cert">SQL 개발자(SQLD) · 정보처리기사 필기 합격 · 대덕인재개발원 풀스택 과정 수료</p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return undefined;
    const t = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(t);
  }, [copied]);
  async function copyEmail() {
    try { await navigator.clipboard.writeText(email); setCopied(true); } catch { window.location.href = `mailto:${email}`; }
  }
  return (
    <footer id="contact" className="h-contact">
      <div className="h-wrap">
        <h2>함께 일하고 싶으시면 연락 주세요</h2>
        <p><a className="h-email" href={`mailto:${email}`}>{email}</a> <button type="button" className="h-copy" onClick={copyEmail}>{copied ? '복사 완료' : '복사'}</button><span className="sr-only" role="status">{copied ? '이메일 주소를 복사했습니다.' : ''}</span></p>
        <p className="h-links"><Ext href={github}>GitHub</Ext><a href="/resume.html">이력서</a><a href="#home">맨 위로</a></p>
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
            {view === 'home' && <><Hero /><About /><Process /><Projects /><Cases /></>}
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
