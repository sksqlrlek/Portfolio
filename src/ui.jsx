import React, { useCallback, useEffect, useRef, useState } from 'react';
import { stageOrder, stages } from './site-data';

// 데이터 파일에 직접 쓴 짧은 HTML(<b>, <code>, 내부 링크)을 표시합니다. 외부 입력은 넣지 않습니다.
export function Rich({ html, as: Tag = 'span', ...rest }) {
  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function Ext({ href, children, className, title }) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer" title={title}>
      {children}<span className="ext" aria-hidden="true">↗</span><span className="sr-only">(새 탭)</span>
    </a>
  );
}

export function TechChip({ logo, name }) {
  return (
    <span className="tk">
      {logo && <img src={`/assets/tech/${logo}.svg`} alt="" width="16" height="16" loading="lazy" />}
      {name}
    </span>
  );
}

export function TechList({ items, className = '' }) {
  return (
    <ul className={`tks ${className}`} aria-label="사용 기술">
      {items.map(([logo, name]) => <li key={name}><TechChip logo={logo} name={name} /></li>)}
    </ul>
  );
}

// 맡은 단계 표시: 색 점 + 글자. 맡지 않은 단계는 빈 점과 '(맡지 않음)' 설명을 함께 둡니다.
export function StageDots({ done, label = '맡은 단계', className = '' }) {
  return (
    <div className={`fd ${className}`}>
      <span className="fd-label">{label}</span>
      <ul>
        {stageOrder.map((key) => {
          const on = done.includes(key);
          return (
            <li key={key} className={`s-${key}${on ? '' : ' off'}`}>
              {stages[key].label}{!on && <span className="sr-only"> (맡지 않음)</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const ICONS = {
  doc: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></>,
  code: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16" />,
  check: <><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.7 2.7L16 9.8" /></>,
  cloud: <><path d="M7 18a4 4 0 0 1-.6-7.96A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z" /><path d="M12 12v6M9.5 14.5L12 12l2.5 2.5" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  copy: <><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></>,
  close: <path d="M6 6l12 12M18 6L6 18" />,
};

export function Icon({ name, size = 22 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {ICONS[name]}
    </svg>
  );
}

export function useCopy(text) {
  const [copied, setCopied] = useState(false);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // 클립보드를 쓸 수 없는 환경에서는 메일 앱을 엽니다.
      window.location.href = `mailto:${text}`;
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }, [text]);
  return [copied, copy];
}

// 코드 블록: 주석, 문자열, 어노테이션, 키워드, 타입 이름만 가볍게 색을 입힙니다.
const KEYWORDS = new Set(['public', 'private', 'protected', 'final', 'return', 'if', 'else', 'throw', 'new', 'class', 'void', 'try', 'catch', 'static', 'extends', 'implements', 'null', 'this', 'for', 'while']);
const TOKEN = /("(?:[^"\\]|\\.)*")|(@[A-Za-z]+)|\b([A-Za-z_][A-Za-z0-9_]*)\b/g;

function highlightLine(line, lineIndex) {
  const out = [];
  let rest = line;
  let comment = null;
  const slash = line.search(/\/\/|<%--/);
  if (slash >= 0 && !/"[^"]*$/.test(line.slice(0, slash))) {
    rest = line.slice(0, slash);
    comment = line.slice(slash);
  }
  let last = 0;
  let match;
  TOKEN.lastIndex = 0;
  while ((match = TOKEN.exec(rest))) {
    if (match.index > last) out.push(rest.slice(last, match.index));
    const [text, str, anno, word] = match;
    let cls = null;
    if (str) cls = 'c-str';
    else if (anno) cls = 'c-anno';
    else if (KEYWORDS.has(word)) cls = 'c-key';
    else if (/^[A-Z][a-z]/.test(word)) cls = 'c-type';
    out.push(cls ? <span key={`${lineIndex}-${match.index}`} className={cls}>{text}</span> : text);
    last = match.index + text.length;
  }
  if (last < rest.length) out.push(rest.slice(last));
  if (comment) out.push(<span key={`${lineIndex}-c`} className="c-com">{comment}</span>);
  return out;
}

export function CodeBlock({ file, code }) {
  const lines = code.split('\n');
  return (
    <figure className="code">
      <figcaption><span className="dots" aria-hidden="true"><i /><i /><i /></span>{file}</figcaption>
      <pre tabIndex={0} aria-label={`${file} 코드`}><code>{lines.map((line, i) => <React.Fragment key={i}>{highlightLine(line, i)}{i < lines.length - 1 ? '\n' : ''}</React.Fragment>)}</code></pre>
    </figure>
  );
}
