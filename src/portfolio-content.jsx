import React, { useState } from 'react';
import { pageTitles, pdfUrl } from './portfolio-pages';

const sections = import.meta.glob('./content/*.html', { eager: true, query: '?raw', import: 'default' });

const diagrams = {
  7: { file: 'portfolio-content/cinema-architecture.svg', title: '전체 시스템 아키텍처', width: 1040, height: 660 },
  8: { file: 'portfolio-files/cinema-erd.png', title: '전체 ERD', width: 1453, height: 750 },
  15: { file: 'portfolio-content/crew-architecture.svg', title: '전체 시스템 아키텍처', width: 1040, height: 660 },
  16: { file: 'portfolio-files/crew-erd.png', title: '전체 ERD', width: 1237, height: 757 },
};

function DiagramViewer({ id, diagram }) {
  const [zoomed, setZoomed] = useState(false);
  const url = `/assets/${diagram.file}`;

  return (
    <figure className="diagram-viewer">
      <figcaption className="diagram-toolbar">
        <div>
          <strong>{diagram.title}</strong>
          {zoomed && <p>도면 안을 스크롤해 자세히 볼 수 있습니다.</p>}
        </div>
        <div className="diagram-actions">
          <button type="button" aria-controls={id} aria-expanded={zoomed} onClick={() => setZoomed(!zoomed)}>
            <span aria-hidden="true">{zoomed ? '−' : '+'}</span> {zoomed ? '화면에 맞추기' : '도면 확대'}
          </button>
          <a className="text-link" href={url} target="_blank" rel="noreferrer">원본 열기 <span aria-hidden="true">↗</span></a>
        </div>
      </figcaption>
      <div className={`diagram-canvas${zoomed ? ' diagram-canvas-zoomed' : ''}`} id={id} tabIndex={zoomed ? 0 : undefined} role={zoomed ? 'region' : undefined} aria-label={zoomed ? `${diagram.title} 확대 영역` : undefined}>
        <img src={url} alt={diagram.title} width={diagram.width} height={diagram.height} loading="lazy" decoding="async" />
      </div>
    </figure>
  );
}

export function PortfolioContent({ page }) {
  const id = `portfolio-page-${page}`;
  const isOverview = page === 6 || page === 14;
  const title = isOverview ? '프로젝트 개요' : pageTitles[page];
  const diagram = diagrams[page];
  const notes = sections[`./content/${page}-notes.html`];

  return (
    <section className={`web-chapter${isOverview ? ' project-overview' : ''}`} id={id} tabIndex={-1} aria-labelledby={`${id}-title`}>
      <header className="web-chapter-heading">
        <div>
          <p className="eyebrow">PORTFOLIO / {String(page).padStart(2, '0')}</p>
          <h3 id={`${id}-title`}>{title}</h3>
        </div>
        <a className="text-link source-page" href={`${pdfUrl}#page=${page}`} target="_blank" rel="noreferrer">PDF {page}쪽 <span aria-hidden="true">↗</span></a>
      </header>
      <div className="chapter-prose" dangerouslySetInnerHTML={{ __html: sections[`./content/${page}.html`] }} />
      {diagram && <DiagramViewer id={`${id}-diagram`} diagram={diagram} />}
      {notes && <div className="chapter-prose architecture-detail" dangerouslySetInnerHTML={{ __html: notes }} />}
    </section>
  );
}
