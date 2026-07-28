import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  ArrowDown, ArrowRight, ArrowUpRight, Award, BookOpen, Code2,
  ExternalLink, Github, GraduationCap, Linkedin, Mail, Menu, Play, X,
} from 'lucide-react'
import { featuredProducts, links, projects, publications, skillGroups } from './data'

const RouterContext = createContext(null)

function Link({ to, children, onClick, ...props }) {
  const { navigate } = useContext(RouterContext)
  const follow = event => {
    onClick?.(event)
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    navigate(to)
  }
  return <a href={to} onClick={follow} {...props}>{children}</a>
}

function NavLink({ to, end = false, children, onClick }) {
  const { pathname } = useContext(RouterContext)
  const active = end ? pathname === to : pathname.startsWith(to)
  return <Link to={to} className={active ? 'active' : ''} onClick={onClick}>{children}</Link>
}

function ScrollToTop({ pathname }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

function Header() {
  const [open, setOpen] = useState(false)
  const nav = [
    ['/', 'Home'],
    ['/projects', 'Projects'],
    ['/publications', 'Publications'],
    ['/about', 'About'],
  ]
  return (
    <header className="site-header">
      <Link className="brand" to="/" onClick={() => setOpen(false)}>SR<span>.</span></Link>
      <nav className={open ? 'primary-nav open' : 'primary-nav'} aria-label="Primary navigation">
        <div className="nav-tabs">
          {nav.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
        </div>
        <a className="contact-pill" href={links.mail}>Let’s talk <ArrowUpRight size={15}/></a>
      </nav>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
        {open ? <X/> : <Menu/>}
      </button>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <span className="eyebrow">Have an ambitious problem?</span>
        <h2>Let’s build something<br/><em>that matters.</em></h2>
        <a className="big-mail" href={links.mail}>sonjoy209164@gmail.com <ArrowUpRight/></a>
      </div>
      <div className="footer-meta">
        <span>© {new Date().getFullYear()} Sonjoy Roy</span>
        <div>
          <a href={links.github} target="_blank" rel="noreferrer"><Github/> GitHub</a>
          <a href={links.linkedin} target="_blank" rel="noreferrer"><Linkedin/> LinkedIn</a>
          <a href={links.youtube} target="_blank" rel="noreferrer"><Play/> YouTube</a>
        </div>
      </div>
    </footer>
  )
}

function PageIntro({ label, title, copy, count }) {
  return (
    <section className="page-intro shell">
      <div>
        <span className="eyebrow">{label}</span>
        <h1>{title}</h1>
      </div>
      <div className="intro-aside">
        {count && <strong>{count}</strong>}
        <p>{copy}</p>
      </div>
    </section>
  )
}

function Home() {
  return (
    <>
      <section className="home-hero shell">
        <div className="hero-copy">
          <span className="eyebrow live"><i/> Software engineer · AI builder</span>
          <h1>I build systems<br/>that <em>think,</em><br/>scale & ship.</h1>
          <p>Full-stack engineer working at the intersection of AI, product engineering, and computer vision—turning ambitious ideas into reliable software.</p>
          <div className="hero-actions">
            <Link className="button dark" to="/projects">Explore my work <ArrowRight/></Link>
            <a className="text-action" href={links.cv} download>Download CV <ArrowDown/></a>
          </div>
        </div>
        <div className="portrait-stage">
          <div className="portrait-rings"/>
          <div className="portrait-card">
            <img src="/sonjoy-roy.png" alt="Sonjoy Roy"/>
            <span className="portrait-note">DINAJPUR → DHAKA<br/>BUILDING WHAT’S NEXT</span>
          </div>
          <div className="portrait-code">01 / ENGINEER</div>
        </div>
      </section>

      <div className="ticker">
        <div>
          {[...Array(2)].flatMap((_, n) => ['FULL-STACK SYSTEMS','COMPUTER VISION','AI / RAG','MOBILE PRODUCTS','RESEARCH'].map(x => <React.Fragment key={`${n}-${x}`}><span>{x}</span><b>✳</b></React.Fragment>))}
        </div>
      </div>

      <section className="shell section-block">
        <div className="section-head">
          <div><span className="eyebrow">Selected products / 2024—26</span><h2>Built for the<br/><em>real world.</em></h2></div>
          <Link className="round-link" to="/projects" aria-label="See all projects"><ArrowUpRight/></Link>
        </div>
        <div className="feature-grid">
          {featuredProducts.map(product => (
            <article className={`feature-card ${product.tone}`} key={product.name}>
              <div className="feature-meta"><span>{product.number}</span><span>{product.label}</span></div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="chips">{product.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
              {product.link ? <a href={product.link} target="_blank" rel="noreferrer">Visit product <ArrowUpRight/></a> : <span className="quiet-link">Case study coming soon</span>}
            </article>
          ))}
        </div>
      </section>

      <section className="proof-band">
        <div className="shell">
          <div className="proof-heading"><span className="eyebrow">Watch the work</span><h2>Code becomes<br/><em>working proof.</em></h2></div>
          <div className="proof-grid">
            <VideoTile image="https://i.ytimg.com/vi/3Y4PNtZx-vk/maxresdefault.jpg" href="https://www.youtube.com/watch?v=3Y4PNtZx-vk" title="All time Tracking" label="Product demo"/>
            <VideoTile image="https://i.ytimg.com/vi/NxLjAFeIc8g/maxresdefault.jpg" href="https://youtu.be/NxLjAFeIc8g" title="Waiter Calling" label="Computer vision"/>
          </div>
        </div>
      </section>

      <section className="home-about shell section-block">
        <div><span className="eyebrow">At a glance</span><h2>Curious by nature.<br/><em>Rigorous by practice.</em></h2></div>
        <div>
          <p>Software Engineer at <strong>CodeMarshal IT Systems</strong> and CSE student at KUET. I care about the parts of good software that users don’t always see: resilient pipelines, clean boundaries, secure flows, and trustworthy details.</p>
          <div className="stats">
            <div><strong>3.65</strong><span>CGPA · CSE, KUET</span></div>
            <div><strong>250+</strong><span>Problems solved</span></div>
            <div><strong>34</strong><span>Public repositories</span></div>
          </div>
          <Link className="text-action" to="/about">More about me <ArrowRight/></Link>
        </div>
      </section>
    </>
  )
}

function VideoTile({ image, href, title, label }) {
  return (
    <a className="video-tile" href={href} target="_blank" rel="noreferrer">
      <img src={image} alt={`${title} video thumbnail`} loading="lazy"/>
      <span className="play-button"><Play fill="currentColor"/></span>
      <div><small>{label}</small><h3>{title}</h3></div>
    </a>
  )
}

function MediaTile({ item, project }) {
  return (
    <a className="media-tile" href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
      <img src={item.image} alt={item.label} loading="lazy"/>
      {item.video && <span className="mini-play"><Play fill="currentColor"/></span>}
      <small>{item.label}</small>
    </a>
  )
}

function ProjectRow({ project, number }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <article className="project-row">
      <div className="project-index">{String(number).padStart(2, '0')}</div>
      <div className="project-body">
        <div className="project-heading">
          <div>
            <h2>{project.title} <span>— {project.subtitle}</span></h2>
            <div className="project-meta">
              <span>{project.year}</span>
              <i/>
              <a href={project.url} target="_blank" rel="noreferrer">{project.urlLabel} <ExternalLink/></a>
            </div>
          </div>
          <a className="project-open" href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}><ArrowUpRight/></a>
        </div>
        <div className="chips project-chips">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        {project.media.length > 0 ? (
          <div className={`media-grid media-${Math.min(project.media.length, 3)}`}>
            {project.media.map((item, i) => <MediaTile item={item} project={project.title} key={`${project.id}-${i}`}/>)}
          </div>
        ) : (
          <div className="code-placeholder">
            <Code2/><span>{project.tags.slice(0, 3).join('  /  ')}</span><b>{project.title.slice(0, 2).toUpperCase()}</b>
          </div>
        )}
        <p className={expanded ? 'project-description expanded' : 'project-description'}>{project.description}</p>
        <button className="see-more" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
          {expanded ? 'Show less' : 'See more'}
        </button>
      </div>
    </article>
  )
}

function Projects() {
  const categories = ['All', 'AI & vision', 'Full stack', 'Mobile & systems']
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? projects : projects.filter(project => project.category === filter)
  return (
    <>
      <PageIntro label="Project archive / Product work" title={<>Work, clearly<br/><em>documented.</em></>} count={projects.length} copy="A closer look at the systems, applications, packages, and experiments I have designed and built."/>
      <main className="projects-shell shell">
        <div className="filter-bar" role="group" aria-label="Filter projects">
          {categories.map(category => <button className={filter === category ? 'active' : ''} onClick={() => setFilter(category)} key={category}>{category}</button>)}
        </div>
        <div className="project-list">
          {filtered.map((project, index) => <ProjectRow project={project} number={projects.indexOf(project) + 1} key={project.id}/>)}
        </div>
      </main>
    </>
  )
}

function Publications() {
  return (
    <>
      <PageIntro label="Research / Publications" title={<>Ideas tested<br/><em>with evidence.</em></>} count="03" copy="Research spanning medical image segmentation, Bangla language understanding, and trustworthy visual retrieval."/>
      <main className="shell research-page">
        <div className="publication-list">
          {publications.map((publication, index) => {
            const inner = <>
              <span className="publication-number">0{index + 1}</span>
              <div>
                <div className="publication-badges"><span>{publication.year}</span><span className={publication.status === 'Published' ? 'published' : ''}>{publication.status}</span></div>
                <h2>{publication.title}</h2>
                <p>{publication.venue}</p>
                <small>{publication.meta}</small>
              </div>
              {publication.href ? <ArrowUpRight/> : <BookOpen/>}
            </>
            return publication.href
              ? <a className="publication-row" href={publication.href} target="_blank" rel="noreferrer" key={publication.title}>{inner}</a>
              : <article className="publication-row" key={publication.title}>{inner}</article>
          })}
        </div>
        <div className="research-note">
          <BookOpen/>
          <div><span className="eyebrow">Research direction</span><h3>From perception to trustworthy decisions.</h3><p>I’m interested in systems that interpret complex information—images, language, and documents—while keeping their output grounded, auditable, and useful.</p></div>
        </div>
      </main>
    </>
  )
}

function About() {
  return (
    <>
      <PageIntro label="About / Experience" title={<>Engineer.<br/><em>Researcher.</em><br/>Builder.</>} copy="I enjoy taking difficult technical ideas all the way from exploration to dependable, user-facing products."/>
      <main className="shell about-page">
        <section className="about-profile">
          <div className="about-photo"><img src="/sonjoy-roy.png" alt="Sonjoy Roy"/></div>
          <div className="about-story">
            <span className="eyebrow">Hello, I’m Sonjoy</span>
            <h2>I turn technical depth into software people can actually use.</h2>
            <p>I’m a Software Engineer at CodeMarshal IT Systems and a Computer Science & Engineering student at Khulna University of Engineering & Technology. My work moves between full-stack product development, AI systems, computer vision, and applied research.</p>
            <p>I’m especially drawn to engineering challenges involving asynchronous systems, secure authentication, reliable data flows, and models that must behave responsibly outside a notebook.</p>
            <div className="about-actions"><a className="button dark" href={links.cv} download>Download CV <ArrowDown/></a><a className="text-action" href={links.mail}>Email me <Mail/></a></div>
          </div>
        </section>

        <section className="timeline-section">
          <div className="subsection-title"><span className="eyebrow">Experience & education</span><h2>The path so far.</h2></div>
          <div className="timeline">
            <article><div className="timeline-icon"><Code2/></div><div><span>October 2025 — Present</span><h3>Software Engineer</h3><p>CodeMarshal IT Systems · Dhaka</p></div></article>
            <article><div className="timeline-icon"><GraduationCap/></div><div><span>2020 — Present</span><h3>B.Sc. in Computer Science & Engineering</h3><p>Khulna University of Engineering & Technology · CGPA 3.65</p></div></article>
            <article><div className="timeline-icon"><Award/></div><div><span>Recognition</span><h3>Dean’s Award</h3><p>Faculty of Electrical & Electronic Engineering, KUET · Awarded for excellent academic results</p></div></article>
          </div>
        </section>

        <section className="skills-section">
          <div className="subsection-title"><span className="eyebrow">Toolkit</span><h2>What I work with.</h2></div>
          <div className="skills-list">
            {skillGroups.map(([group, values]) => <div key={group}><h3>{group}</h3><p>{values}</p></div>)}
          </div>
        </section>
      </main>
    </>
  )
}

function NotFound() {
  return <main className="not-found shell"><span className="eyebrow">404 / Not found</span><h1>This page took a wrong turn.</h1><Link className="button dark" to="/">Return home <ArrowRight/></Link></main>
}

export default function App() {
  const [pathname, setPathname] = useState(window.location.pathname)
  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])
  const router = useMemo(() => ({
    pathname,
    navigate(to) {
      if (window.location.pathname === to) return
      window.history.pushState({}, '', to)
      setPathname(to)
    },
  }), [pathname])
  const page = pathname === '/' ? <Home/>
    : pathname === '/projects' ? <Projects/>
    : pathname === '/publications' ? <Publications/>
    : pathname === '/about' ? <About/>
    : <NotFound/>

  return (
    <RouterContext.Provider value={router}>
      <ScrollToTop pathname={pathname}/>
      <Header/>
      {page}
      <Footer/>
    </RouterContext.Provider>
  )
}
