import React, {useEffect, useState} from 'react';
import {doc, getDoc, setDoc, deleteDoc, serverTimestamp, collection, getDocs} from 'firebase/firestore';
import {ArrowUpRight, ArrowRight, Check, LifeBuoy, HandHeart, Clock, FileText, Scale, Globe, MessagesSquare, ShieldAlert, Users, Trash2, RefreshCw, Printer} from 'lucide-react';
import {db} from './firebase';
import {skills, availability, firstSteps, deadlines, reportTo, legalHelp, worldwide, guidelines} from './content';

// Internal links use the SPA router; external links open in a new tab.
export function Link({to, go, className, children, ...rest}) {
  const external = /^(https?:|mailto:)/.test(to);
  return <a className={className} href={to}
    target={to.startsWith('http') ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}
    onClick={external ? undefined : e => {
      e.preventDefault();
      const [path, hash] = to.split('#');
      go(path || '/');
      if (hash) setTimeout(() => document.getElementById(hash)?.scrollIntoView(), 0);
    }} {...rest}>{children}</a>;
}

function ResourceList({items, label}) {
  return <ul className="link-list" aria-label={label}>{items.map(([title, desc, url]) =>
    <li key={url}><a href={url} target="_blank" rel="noreferrer"><span>{title}</span><ArrowUpRight size={17}/></a><p>{desc}</p></li>)}</ul>;
}

export function Home({brand, go, Art}) {
  return <>
    <section className="hero wrap">
      <div className="hero-copy">
        <p className="eyebrow"><span className="dot"/>{brand.eyebrow}</p>
        <h1>{brand.title[0]}<br/><em>{brand.title[1]}</em></h1>
        <p className="lead">{brand.description}</p>
        <div className="hero-actions">
          <Link className="button" to="/help" go={go}>My rights were violated <ArrowRight size={18}/></Link>
          <Link className="button outline" to="/volunteer" go={go}>I want to help <HandHeart size={18}/></Link>
        </div>
        <p className="launch-label"><span className="dot"/>{brand.label}</p>
      </div>
      <Art/>
    </section>

    <section className="wrap doors" aria-label="Start here">
      <article className="door">
        <LifeBuoy size={30}/>
        <p className="eyebrow">If it happened to you</p>
        <h2>Get help</h2>
        <ul>
          <li><Check size={16}/> What to do in the first days</li>
          <li><Check size={16}/> Deadlines you can’t afford to miss</li>
          <li><Check size={16}/> Where to report it and who can help</li>
        </ul>
        <Link className="button" to="/help" go={go}>Start the guide <ArrowRight size={17}/></Link>
      </article>
      <article className="door dark">
        <HandHeart size={30}/>
        <p className="eyebrow">If you want to help</p>
        <h2>Give help</h2>
        <ul>
          <li><Check size={16}/> Volunteer your skills or your time</li>
          <li><Check size={16}/> Show up at city meetings and in court</li>
          <li><Check size={16}/> Start a chapter where you live</li>
        </ul>
        <Link className="button light" to="/volunteer" go={go}>Volunteer <ArrowRight size={17}/></Link>
      </article>
    </section>

    <section id="about" className="about wrap">
      <div className="section-heading"><p className="eyebrow">01 / Why CRACAN</p><h2>{brand.heading}</h2><p>{brand.about}</p></div>
      <div className="pillars">{brand.pillars.map(([title, text], i) => <article key={title}><span className="number">0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>

    <section id="resources" className="resource-section"><div className="wrap">
      <div className="row-heading"><div><p className="eyebrow">02 / A place to start</p><h2>Useful connections.</h2></div><span className="muted">Explore. Save. Come back.</span></div>
      <div className="resource-grid">{brand.resources.map(([id, title, desc, url]) =>
        <Link key={id} className="resource-link" to={url} go={go}><span className="resource-top"><span className="tag">{url.startsWith('http') ? 'Partner resource' : url.startsWith('mailto') ? 'Connect' : 'CRACAN'}</span><ArrowUpRight size={23}/></span><h3>{title}</h3><p>{desc}</p></Link>)}</div>
    </div></section>

    <section id="community" className="wrap community">
      <div>
        <p className="eyebrow">03 / Community</p>
        <h2>Talk with people who get it.</h2>
        <p>A place to share what you’re going through, learn from people who’ve been there, find others in your city, and plan action together.</p>
      </div>
      <div className="community-card">
        <MessagesSquare size={30}/>
        {brand.community
          ? <><h3>The community space is open</h3><p>Read the guidelines, then come say hello.</p><a className="button" href={brand.community} target="_blank" rel="noreferrer">Join the community <ArrowUpRight size={17}/></a></>
          : <><h3>Opening soon</h3><p>Volunteers and members get the first invite. Sign up now and we’ll reach out when it opens.</p><Link className="button" to="/volunteer" go={go}>Get the first invite <ArrowRight size={17}/></Link></>}
        <Link className="text-button" to="/guidelines" go={go}>Read the community guidelines <ArrowRight size={16}/></Link>
      </div>
    </section>

    <section className="wrap founder">
      <p className="eyebrow">04 / Where this started</p>
      <blockquote>
        <p>“I started CRACAN after my own civil rights were violated. I learned how hard it is to find straight answers, the right people, and the deadlines that matter, often while you’re still hurting. Nobody should have to figure that out alone. This is the place I wish I’d had.”</p>
        <footer>Jonathan Jackson, founder</footer>
      </blockquote>
    </section>

    <section id="roadmap" className="wrap roadmap">
      <div><p className="eyebrow">05 / Looking ahead</p><h2>A beginning.<br/>Not the finished story.</h2><p>We’re starting in Oakland and building a network that can reach anywhere.</p></div>
      <ol>{brand.roadmap.map(([item, status], i) => <li key={item}><span>{i === 0 ? <Check size={17}/> : '0' + (i + 1)}</span><div>{item}<small>{status}</small></div></li>)}</ol>
    </section>
  </>;
}

export function Help({brand, go}) {
  return <div className="wrap guide">
    <header className="guide-head">
      <p className="eyebrow"><LifeBuoy size={15}/> Get help</p>
      <h1>Your rights were violated. Here’s what to do next.</h1>
      <p className="lead">General information to help you act quickly and find the right people. It isn’t legal advice, and every situation is different, so talk to a lawyer about your own case.</p>
      <div className="emergency" role="note"><ShieldAlert size={22}/><p><strong>In danger right now?</strong> Call 911 in the U.S., or your local emergency number. CRACAN is not an emergency service.</p></div>
      <nav className="guide-toc" aria-label="On this page">
        <a href="#first-steps">1. First steps</a><a href="#deadlines">2. Deadlines</a><a href="#report">3. Where to report</a><a href="#lawyer">4. Find legal help</a><a href="#worldwide">5. Outside the U.S.</a>
      </nav>
    </header>

    <section id="first-steps" className="guide-section">
      <div className="guide-label"><span>01</span><FileText size={22}/></div>
      <div>
        <h2>First steps: write it down and save everything</h2>
        <p>Memories fade and records disappear. Do these as soon as you can. Keep your notes and files on your own device; don’t send them to CRACAN.</p>
        <ol className="checklist">{firstSteps.map(s => <li key={s}><Check size={17}/><span>{s}</span></li>)}</ol>
        <button className="text-button" onClick={() => window.print()}><Printer size={16}/> Print this checklist</button>
      </div>
    </section>

    <section id="deadlines" className="guide-section">
      <div className="guide-label"><span>02</span><Clock size={22}/></div>
      <div>
        <h2>Deadlines you can’t afford to miss</h2>
        <p>Many people lose strong cases only because they filed too late. These are common time limits in California and under federal law. There are exceptions, and some can be shorter, so confirm yours with a lawyer right away.</p>
        <div className="deadlines">{deadlines.map(([what, when, detail, src, url]) =>
          <article key={what}><strong className="deadline">{when}</strong><h3>{what}</h3><p>{detail}</p><a href={url} target="_blank" rel="noreferrer">{src} <ArrowUpRight size={14}/></a></article>)}</div>
      </div>
    </section>

    <section id="report" className="guide-section">
      <div className="guide-label"><span>03</span><Scale size={22}/></div>
      <div>
        <h2>Where to report it</h2>
        <p>Reporting creates an official record and can lead to investigations or policy changes. It usually does <em>not</em> stop the clock on lawsuit deadlines.</p>
        <ResourceList items={reportTo} label="Where to report"/>
      </div>
    </section>

    <section id="lawyer" className="guide-section">
      <div className="guide-label"><span>04</span><Users size={22}/></div>
      <div>
        <h2>Find legal help</h2>
        <p>Many civil rights lawyers offer a free first consultation, and some take cases with no upfront fee. If you’re representing yourself, the court help centers below are free.</p>
        <ResourceList items={legalHelp} label="Legal help"/>
      </div>
    </section>

    <section id="worldwide" className="guide-section">
      <div className="guide-label"><span>05</span><Globe size={22}/></div>
      <div>
        <h2>Outside the United States</h2>
        <p>We’re building guides country by country. Until yours is ready, start here. If you know the system where you live, <Link to="/volunteer" go={go}>volunteer as a researcher</Link> and help us write it.</p>
        <ResourceList items={worldwide} label="International resources"/>
      </div>
    </section>

    <section className="join">
      <div><p className="eyebrow">You don’t have to do this alone</p><h2>Connect with people who’ve been there.</h2><p>Join the CRACAN community to share experiences, find support, and take action together.</p></div>
      <Link className="button light" to="/#community" go={go}>See the community <ArrowRight size={17}/></Link>
    </section>
    <p className="notice">{brand.notice} Links to other organizations are resources, not claims of partnership. Information last reviewed November 2026.</p>
  </div>;
}

const blankVolunteer = user => ({name: user?.displayName || '', location: '', skills: [], availability: 'events', languages: '', note: ''});

export function Volunteer({brand, go, user, ready, busy: authBusy, login}) {
  const [form, setForm] = useState(null), [exists, setExists] = useState(false), [busy, setBusy] = useState(false), [status, setStatus] = useState(''), [err, setErr] = useState('');
  useEffect(() => {
    let current = true; setForm(null); setExists(false); setStatus(''); setErr('');
    if (user) getDoc(doc(db, 'volunteers', user.uid)).then(s => {
      if (!current) return;
      if (s.exists()) {const {name, location, skills, availability, languages, note} = s.data(); setForm({name, location, skills, availability, languages, note}); setExists(true);}
      else setForm(blankVolunteer(user));
    }).catch(() => current && setErr('Your sign-up could not load. Please refresh and try again.'));
    return () => {current = false;};
  }, [user]);
  const set = patch => {setForm({...form, ...patch}); setStatus('');};
  const toggleSkill = id => set({skills: form.skills.includes(id) ? form.skills.filter(s => s !== id) : [...form.skills, id]});
  async function save(e) {
    e.preventDefault(); setErr(''); setStatus('');
    if (!form.skills.length) {setErr('Choose at least one way you’d like to help.'); return;}
    setBusy(true);
    try {
      await setDoc(doc(db, 'volunteers', user.uid), {
        name: form.name.trim(), email: user.email, location: form.location.trim(), skills: form.skills,
        availability: form.availability, languages: form.languages.trim(), note: form.note.trim(), updatedAt: serverTimestamp(),
      });
      setExists(true); setStatus(exists ? 'Your sign-up was updated.' : 'Thank you for signing up! We’ll be in touch by email.');
    } catch {setErr('Your sign-up could not be saved. Please try again.');}
    finally {setBusy(false);}
  }
  async function withdraw() {
    if (!window.confirm('Withdraw your volunteer sign-up? This deletes what you entered here.')) return;
    setBusy(true); setErr('');
    try {await deleteDoc(doc(db, 'volunteers', user.uid)); setExists(false); setForm(blankVolunteer(user)); setStatus('Your sign-up was withdrawn.');}
    catch {setErr('Could not withdraw your sign-up. Please try again.');}
    finally {setBusy(false);}
  }
  return <div className="wrap guide">
    <header className="guide-head">
      <p className="eyebrow"><HandHeart size={15}/> Volunteer</p>
      <h1>Bring what you’ve got. We’ll find a way to use it.</h1>
      <p className="lead">CRACAN runs on people. Whether you’ve been through a rights violation yourself or just want to stand with your neighbors, there’s a place for you, anywhere in the world.</p>
    </header>
    <section className="skill-grid" aria-label="Ways to help">{skills.map(([id, title, desc]) => <article key={id}><h3>{title}</h3><p>{desc}</p></article>)}</section>

    <section className="volunteer-form" id="sign-up">
      <h2>{exists ? 'Your volunteer sign-up' : 'Sign up to volunteer'}</h2>
      {!ready ? <p role="status">Loading…</p>
        : !user ? <div className="gate"><p>Sign in with Google so we can keep your sign-up private and reach you by email. Only you and CRACAN organizers can see what you enter.</p><button className="button" disabled={authBusy} onClick={() => login('/volunteer')}>Continue with Google <ArrowRight size={18}/></button></div>
        : !form ? (err ? <p role="alert" className="alert">{err}</p> : <p role="status">Loading your sign-up…</p>)
        : <form onSubmit={save}>
          <div className="field-row">
            <div><label htmlFor="v-name">Your name</label><input id="v-name" required maxLength={100} autoComplete="name" value={form.name} onChange={e => set({name: e.target.value})}/></div>
            <div><label htmlFor="v-location">City and country</label><input id="v-location" required maxLength={120} placeholder="Oakland, USA" value={form.location} onChange={e => set({location: e.target.value})}/></div>
          </div>
          <p className="hint">We’ll contact you at <strong>{user.email}</strong>.</p>
          <fieldset><legend>How would you like to help?</legend>
            <div className="chips">{skills.map(([id, title]) => <label key={id} className={'chip' + (form.skills.includes(id) ? ' on' : '')}><input type="checkbox" checked={form.skills.includes(id)} onChange={() => toggleSkill(id)}/>{title}</label>)}</div>
          </fieldset>
          <fieldset><legend>How much time do you have?</legend>
            <div className="chips">{availability.map(([id, title]) => <label key={id} className={'chip' + (form.availability === id ? ' on' : '')}><input type="radio" name="availability" checked={form.availability === id} onChange={() => set({availability: id})}/>{title}</label>)}</div>
          </fieldset>
          <label htmlFor="v-languages">Languages you speak <span className="optional">optional</span></label>
          <input id="v-languages" maxLength={120} placeholder="English, Spanish…" value={form.languages} onChange={e => set({languages: e.target.value})}/>
          <label htmlFor="v-note">Anything else we should know? <span className="optional">optional</span></label>
          <textarea id="v-note" rows={4} maxLength={500} placeholder="Experience, ideas, or a chapter you’d like to start…" value={form.note} onChange={e => set({note: e.target.value})}/>
          <p className="hint">Please don’t include details about a legal case, evidence, or information about children.</p>
          {err && <p role="alert" className="alert">{err}</p>}
          <div className="form-actions">
            <button className="button" type="submit" disabled={busy}>{busy ? 'Saving…' : exists ? 'Update my sign-up' : 'Sign me up'} <Check size={16}/></button>
            <span role="status">{status}</span>
          </div>
          {exists && <button type="button" className="text-button clear-data" disabled={busy} onClick={withdraw}>Withdraw my sign-up</button>}
        </form>}
    </section>
    <p className="notice">By signing up you agree to our <Link to="/guidelines" go={go}>community guidelines</Link>. See our <Link to="/privacy" go={go}>privacy page</Link> for how we handle your information. Prefer email? Write to <a href={'mailto:' + brand.contact}>{brand.contact}</a>.</p>
  </div>;
}

export function Guidelines({brand, go}) {
  return <section className="wrap legal">
    <p className="eyebrow">Community</p>
    <h1>Community guidelines</h1>
    <p>CRACAN brings together people who’ve been hurt and people who want to help. These guidelines keep that space safe, useful and worth coming back to. They apply on this site, in our community spaces, and at CRACAN events.</p>
    <ol className="guidelines">{guidelines.map(([title, text]) => <li key={title}><h2>{title}</h2><p>{text}</p></li>)}</ol>
    <h2>Report a concern</h2>
    <p>Email <a href={'mailto:' + brand.contact}>{brand.contact}</a>. Describe what happened and where, without sharing anyone’s private information. If someone is in danger, call 911 or your local emergency number first.</p>
    <Link className="button" to="/" go={go}>Back to home <ArrowRight size={17}/></Link>
  </section>;
}

const skillName = Object.fromEntries(skills.map(([id, title]) => [id, title]));
const availabilityName = Object.fromEntries(availability);

export function VolunteerAdmin() {
  const [rows, setRows] = useState(null), [busy, setBusy] = useState(false), [err, setErr] = useState('');
  async function load() {
    setBusy(true); setErr('');
    try {const snap = await getDocs(collection(db, 'volunteers')); setRows(snap.docs.map(d => ({id: d.id, ...d.data()})).sort((a, b) => (b.updatedAt?.toMillis?.() || 0) - (a.updatedAt?.toMillis?.() || 0)));}
    catch {setErr('Could not load volunteers.');}
    finally {setBusy(false);}
  }
  async function remove(r) {
    if (!window.confirm(`Delete ${r.name || 'this person'}'s volunteer sign-up?`)) return;
    setBusy(true);
    try {await deleteDoc(doc(db, 'volunteers', r.id)); setRows(rows.filter(x => x.id !== r.id));}
    catch {setErr('Could not delete that sign-up.');}
    finally {setBusy(false);}
  }
  useEffect(() => {load();}, []);
  return <section className="admin-panel">
    <div className="saved-heading"><h2><HandHeart size={20}/> Admin: volunteers</h2><span>{rows ? rows.length + ' signed up' : '…'}</span>
      {rows?.length > 0 && <a className="text-button" href={'mailto:?bcc=' + rows.map(r => r.email).join(',')}>Email all</a>}
      <button className="icon-button" aria-label="Refresh volunteers" disabled={busy} onClick={load}><RefreshCw size={18}/></button></div>
    {err && <p role="alert" className="alert">{err}</p>}
    {rows && rows.length === 0 && <p className="muted">No volunteers yet.</p>}
    {rows && rows.length > 0 && <div className="volunteer-cards">{rows.map(r => <article key={r.id} className="resource">
      <div>
        <strong>{r.name}</strong> · <span className="muted">{r.location}</span>
        <p><a href={'mailto:' + r.email}>{r.email}</a></p>
        <p>{(r.skills || []).map(s => skillName[s] || s).join(', ')} · {availabilityName[r.availability]}</p>
        {r.languages && <p>Languages: {r.languages}</p>}
        {r.note && <p className="note">“{r.note}”</p>}
        <p className="muted">Updated {r.updatedAt?.toDate?.().toLocaleDateString() || '—'}</p>
      </div>
      <button className="icon-button" aria-label={'Delete sign-up from ' + r.name} disabled={busy} onClick={() => remove(r)}><Trash2 size={16}/></button>
    </article>)}</div>}
  </section>;
}
