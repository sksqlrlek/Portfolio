// Pretendard 정적 글꼴 동적 서브셋(페이지에 나온 글자 조각만 내려받음).
// 가변 글꼴은 윈도에서 본문이 가늘고 흐리게 보여 정적 글꼴을 씁니다. 쓰는 굵기(500~900)만 남기는 처리는 vite.config.js에 있습니다.
import 'pretendard/dist/web/static/pretendard-dynamic-subset.css';
import './site.css';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Contact, Home } from './home';
import { ProjectDetail } from './detail';
import { details, legacyAnchors } from './project-details';
import { Header, NAV, ViewContext, scrollToId, settleScroll } from './nav';
import { profile } from './site-data';

const HOME_IDS = ['home', 'projects', 'trouble', 'skills', 'career', 'contact'];

// 주소 규칙
//   #projects, #trouble …        홈의 해당 섹션
//   #project/<id>                 프로젝트 상세
//   #project/<id>/<단계·사례>      상세의 해당 위치 (예: #project/crew/case-03)
export function parseRoute(hash) {
  let raw = hash.replace(/^#/, '');
  try { raw = decodeURIComponent(raw); } catch { /* 잘못된 주소는 그대로 둡니다. */ }
  const [head = '', id, sub] = raw.split('/');
  if (head === 'project' && details[id]) {
    let anchor = sub || null;
    if (anchor && legacyAnchors[id]?.[anchor]) anchor = legacyAnchors[id][anchor];
    if (anchor && /^\d+$/.test(anchor)) anchor = null;
    return { view: 'detail', id, anchor };
  }
  if (head.startsWith('work-')) return { view: 'home', anchor: 'projects' };
  return { view: 'home', anchor: HOME_IDS.includes(head) ? head : null };
}

function App() {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));
  const [active, setActive] = useState('home');
  const cameFrom = useRef(null);

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    const onHash = () => setRoute((prev) => {
      cameFrom.current = prev.view === 'detail' ? `detail:${prev.id}` : 'home';
      return parseRoute(window.location.hash);
    });
    // 다른 화면으로 가는 링크를 누르면 지금 스크롤 위치를 기록합니다. 뒤로가기로 돌아오면 그 자리로 돌려놓습니다.
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (!e.target.closest?.('a[href^="#"]')) return;
      window.history.replaceState({ ...(window.history.state || {}), scrollY: window.scrollY }, '');
    };
    window.addEventListener('hashchange', onHash);
    document.addEventListener('click', onClick);
    return () => { window.removeEventListener('hashchange', onHash); document.removeEventListener('click', onClick); };
  }, []);

  useLayoutEffect(() => {
    const state = window.history.state || {};
    if (typeof state.scrollY === 'number') {
      const y = state.scrollY;
      settleScroll(() => window.scrollTo(0, y));
      window.history.replaceState({ ...state, scrollY: undefined }, '');
    } else if (route.view === 'home') {
      if (route.anchor && document.getElementById(route.anchor)) settleScroll(() => scrollToId(route.anchor, false));
      else window.scrollTo(0, 0);
    } else if (!route.anchor) {
      window.scrollTo(0, 0);
      document.getElementById('detail-title')?.focus({ preventScroll: true });
    }
    document.title = route.view === 'detail'
      ? `${details[route.id].name} | ${profile.name} 포트폴리오`
      : `${profile.name} | 풀스택 개발자 포트폴리오`;
  }, [route]);

  // 메뉴에 지금 보고 있는 섹션 표시
  useEffect(() => {
    if (route.view !== 'home') { setActive('projects'); return undefined; }
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [route.view]);

  // 홈에서 들어왔으면 뒤로가기로 돌아가 원래 위치를 복원하고, 아니면 프로젝트 목록으로 이동합니다.
  const goBack = useCallback(() => {
    if (cameFrom.current === 'home') window.history.back();
    else window.location.hash = '#projects';
  }, []);

  return (
    <ViewContext.Provider value={route.view}>
      <a className="skip-link" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main').focus(); }}>본문으로 바로가기</a>
      <Header view={route.view} active={active} />
      <main id="main" tabIndex={-1}>
        {route.view === 'home'
          ? <Home />
          : <ProjectDetail key={route.id} id={route.id} anchor={route.anchor} onBack={goBack} />}
      </main>
      <Contact />
    </ViewContext.Provider>
  );
}

createRoot(document.getElementById('root')).render(<App />);
