import React, { useState } from 'react';
import { chapters, pageAttachments, pageTitles, pdfUrl, sheetUrl } from './portfolio-pages';
import { noblackSections } from './noblack-readme';
import { PortfolioContent } from './portfolio-content';
import { crewRoleSummary, noblackSummary } from './data';

function NewTab({ href, children, className = 'text-link' }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children} <span aria-hidden="true">↗</span></a>;
}

export function PortfolioSheet({ page, first = false }) {
  const [zoomed, setZoomed] = useState(false);
  const id = `portfolio-page-${page}`;
  const title = pageTitles[page];
  const attachments = pageAttachments[page];

  return (
    <section className="portfolio-sheet" id={id} tabIndex={-1} aria-labelledby={`${id}-title`}>
      <div className="sheet-heading">
        <div><p className="eyebrow">원본 PDF · {String(page).padStart(2, '0')} / 27</p><h3 id={`${id}-title`}>{title}</h3></div>
        <div className="sheet-tools">
          <button className="sheet-zoom" type="button" onClick={() => setZoomed(!zoomed)} aria-expanded={zoomed} aria-controls={`${id}-image`}>{zoomed ? '화면에 맞추기' : '확대'}</button>
          <NewTab href={sheetUrl(page)}>새 탭에서 확대</NewTab>
        </div>
      </div>
      {attachments && <ul className="sheet-attachments" aria-label="개별 설계 산출물">{attachments.map(([label, path]) => <li key={path}><NewTab href={`/assets/portfolio-files/${path}`}>{label}</NewTab></li>)}</ul>}
      <div id={`${id}-image`} className={`sheet-image${zoomed ? ' sheet-zoomed' : ''}`} tabIndex={zoomed ? 0 : undefined} role={zoomed ? 'region' : undefined} aria-label={zoomed ? `${title} 확대 이미지` : undefined}>
        <img src={sheetUrl(page)} alt={`원본 포트폴리오 ${page}쪽 · ${title}`} width="2560" height="1440" loading={first ? 'eager' : 'lazy'} decoding="async" />
      </div>
    </section>
  );
}

function ReaderIntro({ title, kicker, children, actions, backHref, image, imageAlt, dark = false }) {
  return (
    <header className={`reader-intro${image ? ' reader-featured' : ''}${dark ? ' reader-featured-dark' : ''}`} id="reader-start" tabIndex={-1}>
      <div className="reader-intro-copy">
        <a className="text-link reader-back" href={backHref}><span aria-hidden="true">←</span> 포트폴리오 홈</a>
        <p className="eyebrow">{kicker}</p>
        <h1 id="reader-title">{title}</h1>
        {children}
        {actions && <div className="project-actions">{actions}</div>}
      </div>
      {image && <figure className="reader-featured-image"><img src={`/assets/${image}`} alt={imageAlt} /></figure>}
    </header>
  );
}

function ReaderIndex({ label, prefix, entries }) {
  return (
    <nav className="reader-index" aria-label={label}>
      <h2>목차</h2>
      <ol>{entries.map(({ id, title, number, tone }) => {
        const href = `${prefix}/${id}`;
        return <li key={id} data-tone={tone}><a href={href} aria-current={window.location.hash === href ? 'location' : undefined}>{number && <span aria-hidden="true">{number}</span>} {title}</a></li>;
      })}</ol>
    </nav>
  );
}

const chapterTones = {
  intro: 'coral',
  about: 'coral',
  process: 'gold',
  cinema: 'lavender',
  crew: 'fern',
  closing: 'sage',
};

const projectIntro = {
  cinema: { role: '풀스택 / TA · 2026.02–2026.03', alt: 'Cinema Talk 영화 커뮤니티 화면' },
  crew: { role: '풀스택 / AA · 2026.05–2026.06', alt: 'MyCrewSoft 그룹웨어 실제 대시보드', summary: crewRoleSummary },
};

const projectIndexLabels = {
  6: '프로젝트 개요',
  11: 'FrontController 코드',
  14: '프로젝트 개요',
  21: 'STOMP 인증 인터셉터',
  22: '메신저 이벤트 리스너',
};

export function PortfolioReader({ project, full = false }) {
  const groups = full ? chapters : chapters.filter((chapter) => chapter.id === project.id);
  const title = full ? '원본 포트폴리오' : project.name;
  const prefix = full ? '#portfolio' : `#project/${project.id}`;
  const firstPage = groups[0].pages[0];
  const intro = projectIntro[project?.id];
  const entries = full
    ? groups.map((group) => ({ id: group.pages[0], title: group.title, tone: chapterTones[group.id] }))
    : groups[0].pages.map((page) => ({ id: page, title: projectIndexLabels[page] ?? pageTitles[page], number: String(page).padStart(2, '0') }));

  return (
    <div className="frame reader" data-tone={chapterTones[project?.id]}>
      <ReaderIntro
        title={title}
        kicker={full ? 'PORTFOLIO · 27 PAGES' : `PROJECT ${project.no} / ${project.id === 'crew' ? 'GROUPWARE' : 'MOVIE COMMUNITY'}`}
        backHref={full ? '#home' : `#work-${project.id}`}
        image={project?.image}
        imageAlt={intro?.alt}
        dark={!full}
        actions={<><NewTab href={`${pdfUrl}${full ? '' : `#page=${firstPage}`}`}>원본 PDF</NewTab>{project && <NewTab href={project.repo}>GitHub 저장소</NewTab>}</>}
      >
        {full ? <p>표지부터 마무리까지 27쪽을 원본 순서로 읽을 수 있습니다.</p> : <>
          {intro.summary && <p className="reader-lead">{intro.summary}</p>}
          <p className="project-role">{intro.role}</p>
        </>}
      </ReaderIntro>
      <div className={full ? undefined : 'reader-layout'}>
        <ReaderIndex label={full ? '원본 포트폴리오 목차' : `${title} 상세 목차`} prefix={prefix} entries={entries} />
        <div className="reader-article">
          {groups.map((group) => <section key={group.id} className="reader-chapter" data-tone={chapterTones[group.id]} aria-label={group.title}>
            <h2 className={full ? 'reader-chapter-title' : 'sr-only'}>{group.title} 자료</h2>
            {group.pages.map((page) => full
              ? <PortfolioSheet key={page} page={page} first={page === firstPage} />
              : <PortfolioContent key={page} page={page} />)}
          </section>)}
        </div>
      </div>
    </div>
  );
}

export function NoblackReader({ project }) {
  return (
    <div className="frame reader reader-noblack" data-tone="copper">
      <ReaderIntro
        title={project.name}
        kicker="PROJECT 03 / HOME ARCADE"
        backHref="#work-noblack"
        image={project.image}
        imageAlt="NO.BLACK 운영 사이트의 MY ROOM 실제 화면"
        dark
        actions={<><NewTab className="button button-accent" href={project.liveUrl}>배포 사이트 열기</NewTab><NewTab href={project.roomUrl}>실제 MY ROOM 체험</NewTab><NewTab href="/assets/noblack-readme.md">README 원문</NewTab><NewTab href={project.repo}>GitHub 저장소</NewTab></>}
      >
        <p>{noblackSummary}</p>
      </ReaderIntro>
      <div className="reader-layout">
        <ReaderIndex label="NO.BLACK 상세 목차" prefix="#project/noblack" entries={noblackSections} />
        <div className="reader-article">
          {noblackSections.map(({ id, title, html }) => (
            <section className="readme-section" key={id} id={`noblack-section-${id}`} tabIndex={-1} aria-labelledby={`noblack-title-${id}`}>
              <h2 id={`noblack-title-${id}`}>{title}</h2>
              <div className="readme-prose" dangerouslySetInnerHTML={{ __html: html }} />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
