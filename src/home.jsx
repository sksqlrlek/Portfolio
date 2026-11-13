import React from 'react';
import * as siteData from './site-data';
import { keepDots } from './text';
import { Ext, Icon, Rich, StageDots, TechChip, TechList, useCopy } from './ui';
import { SectionLink } from './nav';

// 가운뎃점에서 어색하게 줄이 바뀌지 않도록 정리한 문구를 씁니다(text.js).
const { career, certs, hero, mainSkills, profile, projects, skillGroups, stageOrder, stages, troubles } = keepDots(siteData);

function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-name">
      <div className="wrap">
        <div className="hero-in">
          <div className="hero-copy">
            <div className="id">
              <img className="avatar" src={profile.photo} alt={`${profile.name} 사진`} width="354" height="472" />
              <div>
                <h1 className="name" id="hero-name">{profile.name}<span className="dot" aria-hidden="true">.</span></h1>
                <p className="role">{profile.role}</p>
              </div>
            </div>
            <p className="headline">{hero.headline[0]}<br /><em>{hero.headline[1]}</em> {hero.headline[2]}</p>
            <Rich as="p" className="intro" html={hero.intro} />
            <div className="cta">
              <SectionLink to="projects" className="btn btn-dark">프로젝트 살펴보기 <span aria-hidden="true">↓</span></SectionLink>
              <Ext href={profile.github} className="btn btn-line">GitHub</Ext>
            </div>
          </div>
          <div className="hero-proof">
            <p className="proof-label">분석부터 배포까지, 직접 해 본 일</p>
            <ul className="proofs">
              {hero.proofs.map((item) => (
                <li key={item.title} className={`s-${item.stage}`}>
                  <a href={item.href}>
                    <span className="ic"><Icon name={item.icon} /></span>
                    <span className="pf-body">
                      <span className="pf-title">{item.title} <span className="pf-stage">{item.stageText}</span></span>
                      <span className="pf-desc">{item.desc}</span>
                      <span className="pf-project">{item.project} 상세에서 보기</span>
                    </span>
                    <span className="go" aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="hero-bar">
          <ul className="legend" aria-label="개발 단계 색">
            {stageOrder.map((key) => <li key={key} className={`s-${key}`}>{stages[key].label}</li>)}
          </ul>
          <SectionLink to="contact" className="hero-contact">연락하기 <span aria-hidden="true">↓</span></SectionLink>
        </div>
      </div>
    </section>
  );
}

function Browser({ image, href, label }) {
  return (
    <a className="browser" href={href} aria-label={label}>
      <span className="browser-bar" aria-hidden="true"><i /><i /><i /><span>{image.url}</span></span>
      <img src={image.src} alt={image.alt} width={image.w} height={image.h} loading="lazy" decoding="async" />
    </a>
  );
}

function ProjectLinks({ p }) {
  return (
    <div className="acts">
      {p.live && <Ext href={p.live} className="btn btn-coral btn-sm">배포 사이트 열기</Ext>}
      <a className="btn btn-dark btn-sm" href={`#project/${p.id}`}>상세 보기 <span aria-hidden="true">→</span></a>
      {p.links?.map((l) => <Ext key={l.label} href={l.href} title={l.title} className="btn btn-line btn-sm">{l.label}</Ext>)}
    </div>
  );
}

function FeatureCard({ p }) {
  return (
    <article className={`feat${p.reverse ? ' rev' : ''}`} aria-labelledby={`card-${p.id}`}>
      <Browser image={p.image} href={`#project/${p.id}`} label={`${p.name} 상세 보기`} />
      <div className="feat-body">
        <div className="toprow">
          <span className={`badge badge-${p.badge.type}`}>{p.badge.text}</span>
          <span className="meta">{p.meta}</span>
          <span className="period">{p.period}</span>
        </div>
        <h3 id={`card-${p.id}`}>{p.name}</h3>
        <p className="sub">{p.sub}</p>
        <Rich as="p" className="lead" html={p.lead} />
        <ul className="points">{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
        <StageDots done={p.stages} />
        <TechList items={p.tech} />
        <ProjectLinks p={p} />
      </div>
    </article>
  );
}

function CompactCard({ p }) {
  return (
    <article className="mini" aria-labelledby={`card-${p.id}`}>
      <Browser image={p.image} href={`#project/${p.id}`} label={`${p.name} 상세 보기`} />
      <div>
        <div className="toprow"><span className="meta">{p.meta}</span><span className="period">{p.period}</span></div>
        <h3 id={`card-${p.id}`}>{p.name}<small>{p.sub}</small></h3>
        <Rich as="p" className="lead" html={p.lead} />
        <StageDots done={p.stages} />
        <TechList items={p.tech} />
        <ProjectLinks p={p} />
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section className="sec sec-cream" id="projects" aria-labelledby="projects-title">
      <div className="wrap">
        <div className="sec-h">
          <p className="kicker">프로젝트</p>
          <h2 id="projects-title">직접 설계하고 만든 프로젝트</h2>
          <p>팀 프로젝트에서는 공통 구조를 정하는 AA를, 실제 의뢰에서는 분석부터 운영까지 혼자 맡았습니다.</p>
        </div>
        {projects.map((p) => (p.layout === 'feature' ? <FeatureCard key={p.id} p={p} /> : <CompactCard key={p.id} p={p} />))}
      </div>
    </section>
  );
}

function Troubles() {
  return (
    <section className="sec" id="trouble" aria-labelledby="trouble-title">
      <div className="wrap">
        <div className="sec-h">
          <p className="kicker">문제 해결</p>
          <h2 id="trouble-title">원인을 끝까지 추적한 기록</h2>
          <p>증상에서 멈추지 않고 원인을 찾아, 같은 문제가 다시 생기지 않게 바꾼 사례입니다. 어느 단계의 문제였는지도 함께 적었습니다.</p>
        </div>
        <ul className="tlist">
          {troubles.map((t) => (
            <li key={t.href}>
              <a className="trow" href={t.href}>
                <span className="t-meta"><span className="t-proj">{t.project}</span><span className={`t-st s-${t.stage}`}>{t.stageText}</span></span>
                <span className="t-body"><span className="t-title">{t.title}</span><Rich className="t-sum" html={t.summary} /></span>
                <span className="go" aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="stack" id="skills" aria-labelledby="skills-title">
      <div className="wrap">
        <div className="stack-top">
          <div>
            <p className="kicker">사용 기술</p>
            <h2 id="skills-title">주력 기술</h2>
            <p>세 프로젝트에서 직접 쓴 기술입니다. 아래 기술은 프로젝트에 따라 함께 썼습니다.</p>
          </div>
          <ul className="mains">
            {mainSkills.map((s) => (
              <li key={s.name}>
                <span className="lg" aria-hidden="true">{s.logo ? <img src={`/assets/tech/${s.logo}.svg`} alt="" width="28" height="28" /> : <i>{s.mark}</i>}</span>
                <span><b>{s.name}</b><small>{s.used}</small></span>
              </li>
            ))}
          </ul>
        </div>
        <div className="more">
          {skillGroups.map(([group, items]) => (
            <div key={group}>
              <h3>{group}</h3>
              <ul className="tks">{items.map(([logo, name]) => <li key={name}><TechChip logo={logo} name={name} /></li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Career() {
  return (
    <section className="sec sec-cream" id="career" aria-labelledby="career-title">
      <div className="wrap">
        <div className="sec-h"><p className="kicker">경력 · 교육</p><h2 id="career-title">배우고 일하며 쌓아 온 경험</h2></div>
        <ol className="tl">
          {career.map((c) => (
            <li key={c.title}>
              <span className="when">{c.when}</span>
              <div><h3>{c.title}<small>{c.sub}</small></h3>{c.desc && <p>{c.desc}</p>}</div>
            </li>
          ))}
        </ol>
        <div className="certs">
          <h3>자격증 <span>{certs.length}개</span></h3>
          <ul>
            {certs.map((c) => (
              <li key={c.name}>
                <span className="d">{c.date}</span>
                <b>{c.name}<span className={c.result === '최종합격' ? 'pass' : 'part'}>{c.result}</span></b>
                <span className="by">{c.by}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [copied, copy] = useCopy(profile.email);
  return (
    <footer className="contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="contact-in">
          <div><h2 id="contact-title">함께 일할 기회를<br />기다리고 있습니다</h2><p className="sub">메일이나 GitHub로 편하게 연락 주세요.</p></div>
          <div>
            <div className="crow"><span>이메일</span><a href={`mailto:${profile.email}`}>{profile.email}</a><button type="button" onClick={copy}>{copied ? '복사됨' : '복사'}</button></div>
            <div className="crow"><span>깃허브</span><Ext href={profile.github}>github.com/sksqlrlek</Ext></div>
            <p className="sr-only" role="status">{copied ? '이메일 주소를 복사했습니다.' : ''}</p>
          </div>
        </div>
        <div className="foot"><span><i className="bar" aria-hidden="true" />{profile.name} · 풀스택 개발자 포트폴리오</span></div>
      </div>
    </footer>
  );
}

export function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Troubles />
      <Skills />
      <Career />
    </>
  );
}
