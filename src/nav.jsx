import React, { createContext, useContext, useEffect, useId, useRef, useState } from 'react';
import { profile } from './site-data';
import { Ext, Icon, useCopy } from './ui';

export const ViewContext = createContext('home');

export const NAV = [
  { id: 'home', label: '소개' },
  { id: 'projects', label: '프로젝트' },
  { id: 'trouble', label: '문제 해결' },
  { id: 'skills', label: '기술' },
  { id: 'career', label: '경력' },
];

const reduceMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export function scrollToId(id, smooth = true) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: smooth && !reduceMotion() ? 'smooth' : 'auto', block: 'start' });
  return true;
}

// 글꼴·이미지가 늦게 들어와 위치가 밀리면 한 번 더 맞춥니다. 그 사이 사용자가 스크롤했다면 건드리지 않습니다.
export function settleScroll(apply) {
  apply();
  let y = window.scrollY;
  const again = () => {
    if (Math.abs(window.scrollY - y) > 2) return;
    apply();
    y = window.scrollY;
  };
  document.fonts?.ready.then(() => requestAnimationFrame(again));
  setTimeout(again, 400);
  setTimeout(again, 1200);
}

// 홈 안에서의 이동은 방문 기록을 쌓지 않고 주소만 바꿉니다. 상세 화면에서 누르면 홈으로 이동합니다.
export function SectionLink({ to, children, ...rest }) {
  const view = useContext(ViewContext);
  const inPage = view === 'home' || to === 'contact';
  return (
    <a
      {...rest}
      href={`#${to}`}
      onClick={(e) => {
        if (!inPage) return;
        e.preventDefault();
        if (scrollToId(to)) window.history.replaceState(window.history.state, '', `#${to}`);
      }}
    >
      {children}
    </a>
  );
}

function ContactMenu() {
  const [open, setOpen] = useState(false);
  const [copied, copy] = useCopy(profile.email);
  const wrap = useRef(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => { if (!wrap.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); wrap.current?.querySelector('button')?.focus(); } };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    wrap.current?.querySelector('.cm-panel button')?.focus();
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <div className="cm" ref={wrap}>
      <button type="button" className="hbtn" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((v) => !v)}>
        <Icon name="mail" size={18} /> 연락하기
      </button>
      <div className="cm-panel" id={panelId} hidden={!open}>
        <p className="cm-label">이메일</p>
        <p className="cm-mail">{profile.email}</p>
        <div className="cm-row">
          <button type="button" onClick={copy}><Icon name="copy" size={16} /> {copied ? '복사됨' : '주소 복사'}</button>
          <a href={`mailto:${profile.email}`}>메일 쓰기</a>
        </div>
        <Ext href={profile.github} className="cm-gh">GitHub · sksqlrlek</Ext>
        <p className="sr-only" role="status">{copied ? '이메일 주소를 복사했습니다.' : ''}</p>
      </div>
    </div>
  );
}

export function Header({ view, active }) {
  const links = (cls) => NAV.map((n) => (
    <li key={n.id}>
      <SectionLink to={n.id} className={cls} aria-current={active === n.id ? 'true' : undefined}>{n.label}</SectionLink>
    </li>
  ));
  return (
    <header className="hd">
      <div className="wrap hd-in">
        <SectionLink to="home" className="logo" aria-label={`${profile.name} 포트폴리오 처음으로`}>
          <i aria-hidden="true" /><span>{profile.name}<em aria-hidden="true">.</em></span>
        </SectionLink>
        <nav className="nav" aria-label="주 메뉴"><ul>{links('nav-a')}</ul></nav>
        <ContactMenu />
      </div>
      {view === 'home' && <nav className="tabs" aria-label="섹션 바로가기"><ul>{links('tab-a')}</ul></nav>}
    </header>
  );
}
