import React, { useRef, useState } from 'react';

// 화면 목록만 전달하면 같은 브라우저 틀에서 마우스·터치·키보드로 넘겨 봅니다.
export function ProjectScreens({ items, name, onZoom }) {
  const [active, setActive] = useState(0);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef(null);
  const current = items[active];
  const moveTo = (index) => setActive(Math.max(0, Math.min(items.length - 1, index)));

  const startDrag = (e) => {
    if (!e.isPrimary || e.button !== 0) return;
    if (e.pointerType === 'mouse') {
      e.preventDefault();
      e.currentTarget.focus({ preventScroll: true });
    }
    drag.current = { id: e.pointerId, x: e.clientX, width: e.currentTarget.clientWidth };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const moveDrag = (e) => {
    const start = drag.current;
    if (!start || start.id !== e.pointerId) return;
    let distance = Math.max(-start.width, Math.min(start.width, e.clientX - start.x));
    // 처음과 마지막 화면에서는 저항감을 주고, 범위 밖으로 넘어가지 않습니다.
    if ((active === 0 && distance > 0) || (active === items.length - 1 && distance < 0)) distance /= 3;
    setOffset(distance);
  };

  const finishDrag = (e, cancelled = false) => {
    const start = drag.current;
    if (!start || start.id !== e.pointerId) return;
    drag.current = null;
    const distance = e.clientX - start.x;
    if (!cancelled && Math.abs(distance) >= Math.min(80, start.width * .15)) {
      moveTo(active + (distance < 0 ? 1 : -1));
    }
    setOffset(0);
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    const destinations = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: items.length - 1 };
    if (destinations[e.key] === undefined) return;
    e.preventDefault();
    moveTo(destinations[e.key]);
  };

  return (
    <figure className="d-shot project-screens" aria-label={`${name} 구현 화면`}>
      <div className="browser">
        <div className="browser-bar" aria-hidden="true"><i /><i /><i /><span>{current.url}</span></div>
        <div
          className={`project-screens-viewport${dragging ? ' is-dragging' : ''}`}
          role="group" tabIndex={0} aria-label="구현 화면. 좌우 방향키 또는 드래그로 화면 이동"
          onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={finishDrag}
          onPointerCancel={(e) => finishDrag(e, true)} onLostPointerCapture={(e) => finishDrag(e, true)}
          onKeyDown={onKeyDown} onDragStart={(e) => e.preventDefault()}
        >
          <div className="project-screens-track" style={{ transform: `translateX(calc(${-active * 100}% + ${offset}px))` }}>
            {items.map((item, index) => (
              <div className="project-screen" key={item.src} role="group" aria-roledescription="슬라이드" aria-label={`${index + 1} / ${items.length}`} aria-hidden={index !== active}>
                <img src={item.src} alt={item.alt} width={item.w} height={item.h} draggable={false} loading={index === 0 ? 'eager' : 'lazy'} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption>
        <div className="project-screens-caption" aria-live="polite" aria-atomic="true"><span>{current.caption}</span><span>{active + 1} / {items.length}</span></div>
        <div className="project-screens-controls">
          <button type="button" className="project-screens-arrow" onClick={() => moveTo(active - 1)} disabled={active === 0} aria-label="이전 화면"><span aria-hidden="true">‹</span></button>
          <div className="project-screens-dots">
            {items.map((item, index) => <button key={item.src} type="button" onClick={() => moveTo(index)} aria-label={`${index + 1}. ${item.caption} 보기`} aria-pressed={index === active}><span /></button>)}
          </div>
          <button type="button" className="project-screens-arrow" onClick={() => moveTo(active + 1)} disabled={active === items.length - 1} aria-label="다음 화면"><span aria-hidden="true">›</span></button>
          <button type="button" className="project-screens-zoom" onClick={(e) => onZoom(current, e.currentTarget)}>크게 보기 ⤢</button>
        </div>
        <p className="project-screens-hint">좌우로 드래그해 다른 화면을 살펴보세요.</p>
      </figcaption>
    </figure>
  );
}
