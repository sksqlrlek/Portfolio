import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { details, detailOrder } from './project-details';
import { stageOrder, stages } from './site-data';
import { CodeBlock, Ext, Icon, Rich, StageDots, TechChip } from './ui';
import { settleScroll } from './nav';

const stageNo = (key) => String(stageOrder.indexOf(key) + 1).padStart(2, '0');

// 접힌 <details> 안에 있는 대상이면 펼친 뒤, 대상 위치로 이동합니다.
function revealAndScroll(target, smooth) {
  let parent = target.parentElement;
  while (parent) {
    if (parent.tagName === 'DETAILS' && !parent.open) parent.open = true;
    parent = parent.parentElement;
  }
  target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
  target.focus({ preventScroll: true });
}

function useLightbox() {
  const [item, setItem] = useState(null);
  const returnFocus = useRef(null);
  const open = useCallback((next, trigger) => { returnFocus.current = trigger; setItem(next); }, []);
  const close = useCallback(() => { setItem(null); returnFocus.current?.focus(); }, []);
  useEffect(() => {
    if (!item) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [item, close]);
  const node = item && (
    <div className="lbx" role="dialog" aria-modal="true" aria-label={item.alt} onClick={close}>
      <button type="button" className="lbx-close" onClick={close} autoFocus><Icon name="close" size={18} /> 닫기</button>
      <img src={item.src} alt={item.alt} onClick={(e) => e.stopPropagation()} />
    </div>
  );
  return [open, node];
}

function Zoomable({ img, onZoom, className = '' }) {
  return (
    <button type="button" className={`zoom ${className}`} onClick={(e) => onZoom(img, e.currentTarget)} aria-label={`${img.alt} 크게 보기`}>
      <img src={img.src} alt={img.alt} width={img.w} height={img.h} loading="lazy" decoding="async" />
      <span className="zoom-hint" aria-hidden="true">크게 보기 ⤢</span>
    </button>
  );
}

function Block({ b, onZoom }) {
  switch (b.t) {
    case 'p': return <Rich as="p" className="d-p" html={b.html} />;
    case 'h3': return <h3 className="d-h3">{b.text}</h3>;
    case 'point': return <p className="d-point">{b.text}</p>;
    case 'figure': return (
      <figure className="d-fig">
        <Zoomable img={b} onZoom={onZoom} />
        <figcaption>{b.caption}</figcaption>
      </figure>
    );
    case 'gallery': return (
      <div className="d-gallery">
        {b.items.map((img) => <figure key={img.src}><Zoomable img={img} onZoom={onZoom} /><figcaption>{img.caption}</figcaption></figure>)}
      </div>
    );
    case 'table': return (
      <div className="d-table" role="region" aria-label="표" tabIndex={0}>
        <table>
          {b.head && <thead><tr>{b.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>}
          <tbody>
            {b.rows.map((row) => (
              <tr key={row.join('|')}>
                <th scope="row">{row[0]}</th>
                {row.slice(1).map((cell, i) => <Rich key={i} as="td" html={cell} />)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    case 'bullets': return <ul className="d-bullets">{b.items.map((html) => <Rich key={html} as="li" html={html} />)}</ul>;
    case 'steps': return (
      <ol className="d-steps">
        {b.items.map((s, i) => <li key={s.title}><span className="no">{String(i + 1).padStart(2, '0')}</span><b>{s.title}</b><span>{s.desc}</span></li>)}
      </ol>
    );
    case 'code': return <CodeBlock file={b.file} code={b.code} />;
    case 'fold': return (
      <details className="d-fold">
        <summary><span><b>{b.title}</b><small>{b.sub}</small></span><span className="fold-state" aria-hidden="true" /></summary>
        <div className="d-fold-body">{b.blocks.map((inner, i) => <Block key={i} b={inner} onZoom={onZoom} />)}</div>
      </details>
    );
    case 'reqs': return (
      <ul className="d-reqs">
        {b.items.map((r) => <li key={r.title}><span className="tag">{r.tag}</span><b>{r.title}</b><span>{r.desc}</span></li>)}
      </ul>
    );
    case 'feats': return (
      <ol className="d-feats">
        {b.items.map((f, i) => <li key={f.title}><span className="no">{String(i + 1).padStart(2, '0')}</span><div><b>{f.title}</b><Rich as="p" html={f.html} /></div></li>)}
      </ol>
    );
    case 'scenario': return (
      <ol className="d-scen">
        {b.items.map((s, i) => (
          <li key={s.title}>
            <div><span className="no">STEP {i + 1}</span><b>{s.title}</b><p>{s.desc}</p></div>
            {s.img && <Zoomable img={s.img} onZoom={onZoom} className="scen-img" />}
          </li>
        ))}
      </ol>
    );
    case 'note': return <Rich as="p" className="d-note" html={b.html} />;
    default: return null;
  }
}

function Glance({ g }) {
  return (
    <div className="glance">
      <dl className="g-tiles">
        {g.tiles.map((t) => <div key={t.label} className={t.strong ? 'strong' : undefined}><dt>{t.label}</dt><dd><b>{t.value}</b><span>{t.sub}</span></dd></div>)}
      </dl>
      <div className="g-block">
        <span className="g-label">{g.chainLabel}</span>
        <ol className="chain">{g.chain.map((c) => <li key={c}>{c}</li>)}</ol>
        <p>{g.chainNote}</p>
      </div>
      <div className="g-cols">
        <div className="g-block">
          <span className="g-label">내가 맡은 일</span>
          <ul className="did">{g.did.map((d) => <li key={d.text} className={`s-${d.stage}`}><span aria-hidden="true">{d.mark}</span>{d.text}</li>)}</ul>
        </div>
        <div className="g-block">
          <span className="g-label">사용 기술</span>
          <dl className="stk">
            {g.stack.map(([group, items]) => (
              <div key={group}><dt>{group}</dt><dd><ul className="tks">{items.map(([logo, name]) => <li key={name}><TechChip logo={logo} name={name} /></li>)}</ul></dd></div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

function CaseCard({ c, index, onZoom }) {
  const fix = Array.isArray(c.fix) ? <ul>{c.fix.map((f) => <Rich key={f} as="li" html={f} />)}</ul> : <Rich html={c.fix} />;
  return (
    <article className={`case s-${c.stage}`} id={c.id} tabIndex={-1} aria-labelledby={`${c.id}-title`}>
      <div className="case-h"><span className="case-n">CASE {String(index + 1).padStart(2, '0')}</span><span className="case-st">{c.stageText}</span></div>
      <h4 id={`${c.id}-title`}>{c.title}</h4>
      <dl>
        {c.found && <div><dt>발견 계기</dt><dd>{c.found}</dd></div>}
        <div><dt>원인</dt><dd>{c.cause}</dd></div>
        <div><dt>해결</dt><dd>{fix}</dd></div>
        {c.check && <div><dt>확인</dt><dd><Rich html={c.check} /></dd></div>}
        {c.learned && <div><dt>배운 점</dt><dd>{c.learned}</dd></div>}
      </dl>
      {c.result && <p className="res"><span>RESULT</span><b>{c.result}</b>{c.resultNote && <small>{c.resultNote}</small>}</p>}
      {c.image && <figure className="case-fig"><Zoomable img={c.image} onZoom={onZoom} /><figcaption>{c.image.caption}</figcaption></figure>}
    </article>
  );
}

export function ProjectDetail({ id, anchor, onBack }) {
  const p = details[id];
  const [active, setActive] = useState('overview');
  const [openZoom, lightbox] = useLightbox();
  const root = useRef(null);
  const barRef = useRef(null);

  const toc = useMemo(() => {
    const items = [{ id: 'overview', label: '한눈에 보기', stage: 'ink' }];
    p.sections.forEach((s) => items.push({ id: s.id, label: `${stageNo(s.stage)} ${stages[s.stage].label}`, stage: s.stage, handoff: !!s.handoff }));
    if (p.cases.length) items.push({ id: 'trouble', label: '트러블슈팅', stage: 'ink' });
    if (p.retro) items.push({ id: 'retro', label: '회고', stage: 'ink' });
    return items;
  }, [p]);

  const jumpTo = useCallback((target, smooth = true) => {
    const el = document.getElementById(target);
    if (!el) return;
    revealAndScroll(el, smooth);
    // 같은 페이지 안 이동은 방문 기록을 쌓지 않습니다. 뒤로가기 한 번이면 이전 화면으로 돌아갑니다.
    window.history.replaceState(window.history.state, '', `#project/${id}/${target}`);
  }, [id]);

  // 주소에 단계·사례가 있으면 그 위치로 바로 이동합니다(접힌 사례는 펼침).
  useLayoutEffect(() => {
    if (!anchor) return;
    const el = document.getElementById(anchor);
    if (el) settleScroll(() => revealAndScroll(el, false));
  }, [id, anchor]);

  // 지금 읽는 단계 표시
  useEffect(() => {
    const sections = toc.map((t) => document.getElementById(t.id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [toc]);

  // 휴대폰 단계 바: 지금 단계가 보이도록 가로 스크롤을 맞춥니다.
  useEffect(() => {
    const chip = barRef.current?.querySelector('[aria-current="location"]');
    if (chip && barRef.current.scrollWidth > barRef.current.clientWidth) {
      barRef.current.scrollTo({ left: chip.offsetLeft - 16, behavior: 'smooth' });
    }
  }, [active]);

  // 본문 안의 같은 프로젝트 링크(#project/<id>/...)는 페이지 안 이동으로 처리합니다.
  const onClickInside = useCallback((e) => {
    const a = e.target.closest('a[href^="#project/"]');
    if (!a) return;
    const [, pid, sub] = a.getAttribute('href').slice(1).split('/');
    if (pid === id && sub) { e.preventDefault(); jumpTo(sub); }
  }, [id, jumpTo]);

  const tocLinks = (cls) => toc.map((t) => (
    <li key={t.id}>
      <a href={`#project/${id}/${t.id}`} className={`${cls} s-${t.stage}${t.handoff ? ' dim' : ''}`} aria-current={active === t.id ? 'location' : undefined}
        onClick={(e) => { e.preventDefault(); jumpTo(t.id); }}>
        {t.label}{t.handoff && <small>NO.BLACK</small>}
      </a>
    </li>
  ));

  const index = detailOrder.indexOf(id);
  const prev = details[detailOrder[index - 1]];
  const next = details[detailOrder[index + 1]];
  const caseList = p.cases.filter((c) => !c.collapsed);
  const moreCases = p.cases.filter((c) => c.collapsed);

  return (
    <div className="detail" ref={root} onClick={onClickInside}>
      <nav className="stagebar" aria-label={`${p.name} 단계 목차`}><ol ref={barRef}>{tocLinks('sb')}</ol></nav>
      <div className="wrap d-grid">
        <article className="d-main" aria-labelledby="detail-title">
          <button type="button" className="back" onClick={onBack}><span aria-hidden="true">‹</span> 프로젝트 목록</button>
          <div className="d-meta">
            {p.badge && <span className={`badge badge-${p.badge.type}`}>{p.badge.text}</span>}
            {p.meta.map((m) => <span key={m}>{m}</span>)}
          </div>
          <h1 id="detail-title" tabIndex={-1}>{p.name}</h1>
          <Rich as="p" className="d-lead" html={p.lead} />
          <div className="d-actions">
            {p.actions.map((a) => <Ext key={a.label} href={a.href} title={a.title} className={`btn ${a.primary ? 'btn-coral' : 'btn-line'}`}>{a.label}</Ext>)}
            {p.repoNote && <p className="repo-note">{p.repoNote}</p>}
          </div>
          <figure className="d-shot">
            <div className="browser"><div className="browser-bar" aria-hidden="true"><i /><i /><i /><span>{p.shot.url}</span></div>
              <img src={p.shot.src} alt={p.shot.alt} width={p.shot.w} height={p.shot.h} /></div>
            <figcaption>{p.shot.caption}</figcaption>
          </figure>
          <blockquote>{p.quote}</blockquote>
          <StageDots done={p.stages} className="fd-box" />

          <section className="d-sec" id="overview" tabIndex={-1} aria-labelledby="overview-title">
            <h2 id="overview-title">한눈에 보기</h2>
            <Glance g={p.glance} />
          </section>

          {p.sections.map((s) => (
            <section key={s.id} className={`d-sec s-${s.stage}`} id={s.id} tabIndex={-1} aria-labelledby={`${s.id}-title`}>
              <p className="stage-tag">{stageNo(s.stage)} {stages[s.stage].label}</p>
              {s.handoff ? (
                <div className="handoff">
                  <Rich as="p" html={s.handoff.html} id={`${s.id}-title`} />
                  <a href={s.handoff.href}>{s.handoff.label}</a>
                </div>
              ) : (
                <>
                  <h2 id={`${s.id}-title`}>{s.title}</h2>
                  {s.blocks.map((b, i) => <Block key={i} b={b} onZoom={openZoom} />)}
                </>
              )}
            </section>
          ))}

          {p.cases.length > 0 && (
            <section className="d-sec" id="trouble" tabIndex={-1} aria-labelledby="trouble-title">
              <h2 id="trouble-title">트러블슈팅</h2>
              {caseList.map((c) => <CaseCard key={c.id} c={c} index={p.cases.indexOf(c)} onZoom={openZoom} />)}
              {moreCases.length > 0 && (
                <details className="more-cases">
                  <summary>사례 {moreCases.length}개 더 보기 — {moreCases.map((c) => c.short || c.title).join(' · ')}</summary>
                  {moreCases.map((c) => <CaseCard key={c.id} c={c} index={p.cases.indexOf(c)} onZoom={openZoom} />)}
                </details>
              )}
            </section>
          )}

          {p.retro && (
            <section className="d-sec" id="retro" tabIndex={-1} aria-labelledby="retro-title">
              <h2 id="retro-title">회고</h2>
              <ul className="d-bullets">{p.retro.map((r) => <Rich key={r} as="li" html={r} />)}</ul>
            </section>
          )}

          <nav className="pn" aria-label="다른 프로젝트">
            {prev ? <a href={`#project/${prev.id}`}><small>← 이전 프로젝트</small><b>{prev.name}</b></a> : <a href="#projects"><small>← 목록으로</small><b>전체 프로젝트</b></a>}
            {next ? <a href={`#project/${next.id}`}><small>다음 프로젝트 →</small><b>{next.name}</b></a> : <a href="#projects"><small>목록으로 →</small><b>전체 프로젝트</b></a>}
          </nav>
        </article>

        <aside className="toc" aria-label={`${p.name} 목차`}>
          <p className="toc-title">목차</p>
          <ol>{tocLinks('toc-a')}</ol>
          <p className="toc-flow"><i aria-hidden="true" />모든 프로젝트를 같은 순서(분석 → 배포)로 정리했습니다.</p>
        </aside>
      </div>
      {lightbox}
    </div>
  );
}
