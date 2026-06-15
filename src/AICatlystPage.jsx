import { useEffect, useState } from 'react'
import { motion, MotionConfig, useScroll, useSpring } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  Check,
  CircleDollarSign,
  Compass,
  Database,
  Gauge,
  Layers3,
  LockKeyhole,
  Menu,
  Network,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
  X,
} from 'lucide-react'
import './AICatlystPage.css'

const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`
const assessmentEmail = 'mailto:khalid@aicatlyst.com?subject=AI%20Catlyst%20Expert%20Assessment%20Request'

const triad = [
  {
    icon: Building2,
    number: '01',
    title: 'Business Leaders',
    summary: 'Commercial direction, risk control and measurable growth.',
    text: 'Experienced business leaders who understand market volatility, cost structures, capital discipline and the commercial realities behind transformation.',
  },
  {
    icon: Workflow,
    number: '02',
    title: 'Solution Transformers',
    summary: 'Process redesign, integration and delivery excellence.',
    text: 'Transformation specialists who map processes, manage implementation risks and integrate new capabilities without unnecessary operational disruption.',
  },
  {
    icon: Network,
    number: '03',
    title: 'Next-Generation Technologists',
    summary: 'Practical AI, intelligent data and scalable systems.',
    text: 'Technologists who turn emerging capabilities into secure, useful and commercially relevant systems designed for long-term value.',
  },
]

const solutions = [
  {
    icon: Sparkles,
    name: 'Agent Wysdm',
    category: 'AI Agents Marketplace',
    text: 'Purpose-built digital workers that support complex operational tasks, including reconciliation, data validation, workflow coordination and compliance tracking.',
    capabilities: ['Reconciliation', 'Validation', 'Compliance tracking'],
  },
  {
    icon: Layers3,
    name: 'AIC QkLern',
    category: 'Adaptive Learning Platform',
    text: 'Personalised learning journeys designed to support students, employees, institutional onboarding and accelerated subject-matter development.',
    capabilities: ['Adaptive journeys', 'Onboarding', 'Knowledge development'],
  },
  {
    icon: Database,
    name: 'AIC Data Access',
    category: 'Secure Data Intelligence',
    text: 'A secure ingestion and access layer that transforms fragmented organisational information into searchable, decision-ready intelligence.',
    capabilities: ['Secure ingestion', 'Searchable knowledge', 'Decision intelligence'],
  },
]

const outcomes = [
  ['Reduce operational friction', Workflow],
  ['Improve decision-making', Search],
  ['Strengthen resilience', ShieldCheck],
  ['Unlock scalable growth', Gauge],
]

const engagementPath = [
  {
    icon: Compass,
    stage: 'Discover',
    title: 'Find the operational constraint',
    text: 'Surface the workflow, decision or data gap that is limiting resilience, efficiency or growth.',
  },
  {
    icon: Target,
    stage: 'Prioritise',
    title: 'Choose the move worth funding',
    text: 'Compare commercial value, readiness, risk and implementation effort before committing resources.',
  },
  {
    icon: Workflow,
    stage: 'Transform',
    title: 'Redesign the operating path',
    text: 'Align people, process, systems, controls and suitable AI capability around the target outcome.',
  },
  {
    icon: Rocket,
    stage: 'Deploy',
    title: 'Build a controlled route to value',
    text: 'Deliver in practical stages with visible ownership, risk management and operational feedback.',
  },
]

const triggers = [
  ['Growth is increasing operational complexity faster than capability.', CircleDollarSign],
  ['Teams are experimenting with AI without a shared commercial direction.', Sparkles],
  ['Critical decisions depend on fragmented data and manual reconciliation.', Database],
  ['A transformation programme needs stronger delivery control and adoption.', ShieldCheck],
]

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] } },
}

const cardReveal = {
  hidden: { opacity: 0, y: 34, scale: 0.98 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, delay: Math.min(index * 0.08, 0.3), ease: [0.16, 1, 0.3, 1] },
  }),
}

const viewport = { once: true, amount: 0.18 }

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function AICatlystPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progressScale = useSpring(scrollYProgress, { stiffness: 100, damping: 24, restDelta: 0.001 })

  useEffect(() => {
    const originalTitle = document.title
    const description = document.querySelector('meta[name="description"]')
    const originalDescription = description?.content
    const metadata = [
      ['meta', 'property', 'og:title', 'AI Catlyst | Applied AI and Business Transformation'],
      ['meta', 'property', 'og:description', 'AI Catlyst combines commercial strategy, transformation expertise and applied AI to help organisations improve efficiency, resilience and profitable growth.'],
      ['meta', 'property', 'og:image', `${window.location.origin}${assetPath('ai-catlyst-logo.png')}`],
      ['meta', 'name', 'twitter:card', 'summary_large_image'],
      ['link', 'rel', 'canonical', `${window.location.origin}/ai-catlyst/`],
    ]
    const addedMetadata = metadata.map(([tag, attribute, key, content]) => {
      const element = document.createElement(tag)
      element.setAttribute(attribute, key)
      if (tag === 'link') element.setAttribute('href', content)
      else element.setAttribute('content', content)
      document.head.appendChild(element)
      return element
    })
    document.title = 'AI Catlyst | Applied AI and Business Transformation'
    if (description) {
      description.content = 'AI Catlyst combines commercial strategy, transformation expertise and applied AI to help organisations improve efficiency, resilience and profitable growth.'
    }
    document.body.classList.add('ai-catlyst-active')
    return () => {
      document.title = originalTitle
      if (description && originalDescription) description.content = originalDescription
      addedMetadata.forEach((element) => element.remove())
      document.body.classList.remove('ai-catlyst-active')
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="aic-page">
      <motion.div className="aic-scroll-progress" style={{ scaleX: progressScale }} aria-hidden="true" />
      <header className="aic-header">
        <a className="aic-header-brand" href="#ai-catlyst" aria-label="AI Catlyst home">
          <img src={assetPath('ai-catlyst-mark.png')} alt="AI Catlyst" />
        </a>
        <nav aria-label="AI Catlyst navigation">
          <button type="button" onClick={() => scrollToSection('aic-solutions')}>Solutions</button>
          <button type="button" onClick={() => scrollToSection('aic-contact')}>Assessment</button>
          <a href="#home">KMC Group</a>
        </nav>
        <a className="aic-header-cta" href={assessmentEmail}>Book an assessment <ArrowRight size={15} /></a>
        <button className="aic-menu-button" type="button" aria-label="Open AI Catlyst menu" onClick={() => setMenuOpen(true)}><Menu size={21} /></button>
        {menuOpen && <div className="aic-mobile-menu">
          <button type="button" aria-label="Close AI Catlyst menu" onClick={() => setMenuOpen(false)}><X size={21} /></button>
          <a className="aic-header-brand" href="#ai-catlyst" onClick={() => setMenuOpen(false)}><img src={assetPath('ai-catlyst-mark.png')} alt="AI Catlyst" /></a>
          <button type="button" onClick={() => { scrollToSection('aic-solutions'); setMenuOpen(false) }}>Solutions</button>
          <button type="button" onClick={() => { scrollToSection('aic-contact'); setMenuOpen(false) }}>Assessment</button>
          <a href="#home">KMC Group</a>
          <a className="aic-header-cta" href={assessmentEmail}>Book an assessment <ArrowRight size={15} /></a>
        </div>}
      </header>
      <section className="aic-hero">
        <div className="aic-grid" aria-hidden="true" />
        <div className="aic-aurora" aria-hidden="true" />
        <div className="aic-orbit aic-orbit-one" aria-hidden="true" />
        <div className="aic-orbit aic-orbit-two" aria-hidden="true" />
        <div className="aic-particles" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <div className="wrapper aic-hero-inner">
          <motion.div className="aic-hero-copy" initial="hidden" animate="visible" variants={reveal}>
            <div className="aic-parent-line">
              <span>A Knight&apos;s Move Consulting Group Company</span>
              <span>Operational Strategy • Transformation • Applied AI</span>
            </div>
            <p className="aic-eyebrow">Strategy. Transformation. Applied AI.</p>
            <h1>Crisis-Proof Strategy. Exceptional Delivery. <span>Exponential Bottom-Line Growth.</span></h1>
            <p className="aic-lead">We combine commercial strategy, transformation expertise and practical AI solutions to help organisations build resilient operations, reduce inefficiency and unlock profitable growth.</p>
            <div className="aic-actions">
              <a className="aic-button" href={assessmentEmail}>Book a Free Expert Assessment <ArrowRight size={17} /></a>
              <button className="aic-text-button" type="button" onClick={() => scrollToSection('aic-solutions')}>Explore Our Solutions <ArrowRight size={16} /></button>
            </div>
            <p className="aic-trust"><Check size={15} /> Built around your business expertise, existing systems and operational priorities.</p>
          </motion.div>
          <motion.div className="aic-hero-visual" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.12 }}>
            <div className="aic-neural-net">
              <div className="aic-nn-header"><span>Neural Architecture</span><strong>Applied AI</strong></div>
              <svg className="aic-nn-svg" viewBox="0 0 504 288" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="nn-ga" gradientUnits="userSpaceOnUse" x1="72" y1="0" x2="432" y2="0">
                    <stop offset="0%" stopColor="#3ab4ff" /><stop offset="100%" stopColor="#a06be8" />
                  </linearGradient>
                  <linearGradient id="nn-gb" gradientUnits="userSpaceOnUse" x1="72" y1="0" x2="432" y2="0">
                    <stop offset="0%" stopColor="#9b5ce0" /><stop offset="100%" stopColor="#3ab4ff" />
                  </linearGradient>
                  <linearGradient id="nn-gc" gradientUnits="userSpaceOnUse" x1="72" y1="0" x2="432" y2="0">
                    <stop offset="0%" stopColor="#3ab4ff" /><stop offset="100%" stopColor="#c470f5" />
                  </linearGradient>
                  <filter id="nn-glow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                <text x="72" y="12" fill="#4a6080" fontSize="8" textAnchor="middle" letterSpacing="1.5">INPUT</text>
                <text x="192" y="12" fill="#4a6080" fontSize="8" textAnchor="middle" letterSpacing="1.5">HIDDEN</text>
                <text x="312" y="12" fill="#4a6080" fontSize="8" textAnchor="middle" letterSpacing="1.5">HIDDEN</text>
                <text x="432" y="12" fill="#4a6080" fontSize="8" textAnchor="middle" letterSpacing="1.5">OUTPUT</text>
                {[54,110,166,222].flatMap((y1,i1) => [38,94,150,206,262].map((y2,i2) => <line key={`l01-${i1}-${i2}`} x1="72" y1={y1} x2="192" y2={y2} stroke="rgba(80,140,255,0.09)" strokeWidth="1" />))}
                {[38,94,150,206,262].flatMap((y1,i1) => [38,94,150,206,262].map((y2,i2) => <line key={`l12-${i1}-${i2}`} x1="192" y1={y1} x2="312" y2={y2} stroke="rgba(80,140,255,0.09)" strokeWidth="1" />))}
                {[38,94,150,206,262].flatMap((y1,i1) => [82,154,226].map((y2,i2) => <line key={`l23-${i1}-${i2}`} x1="312" y1={y1} x2="432" y2={y2} stroke="rgba(80,140,255,0.09)" strokeWidth="1" />))}
                <path d="M 72,54 L 192,94 L 312,150 L 432,154" stroke="url(#nn-ga)" strokeWidth="2" pathLength="1" strokeDasharray="0.07 0.93" className="aic-nn-signal aic-nn-signal-a" />
                <path d="M 72,166 L 192,206 L 312,94 L 432,82" stroke="url(#nn-gb)" strokeWidth="2" pathLength="1" strokeDasharray="0.07 0.93" className="aic-nn-signal aic-nn-signal-b" />
                <path d="M 72,110 L 192,150 L 312,206 L 432,226" stroke="url(#nn-gc)" strokeWidth="2" pathLength="1" strokeDasharray="0.07 0.93" className="aic-nn-signal aic-nn-signal-c" />
                {[54,110,166,222].map((y,i) => <circle key={`n0-${i}`} cx="72" cy={y} r="7" fill="#0c1f45" stroke={i<3?'#3ab4ff':'#253d6a'} strokeWidth="1.5" filter={i<3?'url(#nn-glow)':undefined} />)}
                {[38,94,150,206,262].map((y,i) => <circle key={`n1-${i}`} cx="192" cy={y} r="6.5" fill="#0c1f45" stroke={[1,2,3].includes(i)?'#6a9ee8':'#253d6a'} strokeWidth="1.5" filter={[1,2,3].includes(i)?'url(#nn-glow)':undefined} />)}
                {[38,94,150,206,262].map((y,i) => <circle key={`n2-${i}`} cx="312" cy={y} r="6.5" fill="#0c1f45" stroke={[1,2,3].includes(i)?'#8a6de8':'#253d6a'} strokeWidth="1.5" filter={[1,2,3].includes(i)?'url(#nn-glow)':undefined} />)}
                {[82,154,226].map((y,i) => <circle key={`n3-${i}`} cx="432" cy={y} r="8" fill="#0c1f45" stroke="#a06be8" strokeWidth="2" filter="url(#nn-glow)" />)}
              </svg>
              <div className="aic-nn-tags">
                <span>Data <b>Ingested</b></span>
                <span>Patterns <b>Recognised</b></span>
                <span>Outcomes <b>Generated</b></span>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="wrapper aic-hero-rail" aria-label="AI Catlyst delivery principles">
          <span>Commercially grounded</span>
          <span>Expert partnered</span>
          <span>Risk controlled</span>
          <span>Outcome validated</span>
        </div>
      </section>

      <section className="aic-section wrapper aic-value" aria-labelledby="aic-value-title">
        <div className="aic-section-intro">
          <p className="aic-eyebrow">Built for operational value</p>
          <h2 id="aic-value-title">AI Built Around Real Business Outcomes</h2>
          <p>AI Catlyst helps organisations identify where strategy, process transformation and applied AI can create measurable operational and commercial value. We work alongside your internal experts to redesign inefficient workflows, integrate suitable technology and create scalable solutions grounded in real business needs.</p>
        </div>
        <div className="aic-outcomes">
          {outcomes.map(([label, Icon], index) => (
            <motion.article key={label} custom={index} variants={cardReveal} initial="hidden" whileInView="visible" viewport={viewport}>
              <span>0{index + 1}</span>
              <Icon size={21} />
              <h3>{label}</h3>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="aic-section aic-triad-section">
        <div className="wrapper">
          <div className="aic-section-intro centered">
            <p className="aic-eyebrow">Architecture of execution</p>
            <h2>The Core Triad</h2>
            <p>Commercial judgement, controlled transformation and practical technology capability working as one delivery system.</p>
          </div>
          <div className="aic-triad">
            {triad.map(({ icon: Icon, number, title, summary, text }, index) => (
              <motion.article className="aic-triad-card" key={title} custom={index} variants={cardReveal} initial="hidden" whileInView="visible" viewport={viewport}>
                <div className="aic-card-top"><Icon size={24} /><span>{number}</span></div>
                <h3>{title}</h3>
                <strong>{summary}</strong>
                <p>{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="aic-section wrapper aic-path-section">
        <div className="aic-section-intro">
          <p className="aic-eyebrow">From pressure to progress</p>
          <h2>A Clear Route From Business Constraint to Operational Value</h2>
          <p>Every engagement follows a disciplined path that keeps the commercial objective visible while reducing implementation risk.</p>
        </div>
        <ol className="aic-path">
          {engagementPath.map(({ icon: Icon, stage, title, text }, index) => (
            <motion.li key={stage} custom={index} variants={cardReveal} initial="hidden" whileInView="visible" viewport={viewport}>
              <div className="aic-path-number">0{index + 1}</div>
              <Icon size={22} />
              <span>{stage}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      <section className="aic-section wrapper aic-partnership">
        <div className="aic-partnership-copy">
          <p className="aic-eyebrow">Expert-driven partnership</p>
          <h2>Sector-Agnostic by Design. Expert-Driven by Partnership.</h2>
          <p>We do not claim to understand your organisation better than the people running it. Your team brings the industry knowledge, customer understanding and operational context. We bring commercial strategy, transformation architecture and applied AI expertise.</p>
          <p>Together, we design solutions around genuine operational priorities rather than forcing generic technology into complex environments.</p>
        </div>
        <ol className="aic-partnership-flow" aria-label="AI Catlyst partnership model">
          <li><Users size={21} /><span>Your Domain Expertise</span></li>
          <li><Workflow size={21} /><span>Our Transformation Capability</span></li>
          <li><Gauge size={21} /><span>Measurable Business Outcomes</span></li>
        </ol>
      </section>

      <section className="aic-section aic-trigger-section">
        <div className="wrapper aic-trigger-layout">
          <div>
            <p className="aic-eyebrow">When to engage AI Catlyst</p>
            <h2>Start When the Business Problem Is Clear but the Right Move Is Not.</h2>
            <a className="aic-inline-link" href={assessmentEmail}>Discuss the current constraint <ArrowRight size={16} /></a>
          </div>
          <div className="aic-triggers">
            {triggers.map(([text, Icon], index) => (
              <motion.article key={text} custom={index} variants={cardReveal} initial="hidden" whileInView="visible" viewport={viewport}><span>0{index + 1}</span><Icon size={20} /><p>{text}</p></motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="aic-section aic-solutions-section" id="aic-solutions">
        <div className="wrapper">
          <div className="aic-section-intro">
            <p className="aic-eyebrow">Consultation-led solutions</p>
            <h2>Applied AI Solutions</h2>
            <p>Purpose-built capabilities tailored to the operating environment, systems and controls around them.</p>
          </div>
          <div className="aic-solutions">
            {solutions.map(({ icon: Icon, name, category, text, capabilities }, index) => (
              <motion.article className="aic-solution-card" key={name} custom={index} variants={cardReveal} initial="hidden" whileInView="visible" viewport={viewport}>
                <div className="aic-solution-visual" aria-hidden="true">
                  <Icon size={34} />
                  <span>0{index + 1}</span>
                  <div className="aic-solution-lines"><i /><i /><i /></div>
                </div>
                <p className="aic-category">{category}</p>
                <h3>{name}</h3>
                <p>{text}</p>
                <ul>{capabilities.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul>
                <a href={`mailto:khalid@aicatlyst.com?subject=${encodeURIComponent(`Discuss ${name}`)}`}>Discuss This Solution <ArrowRight size={15} /></a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="aic-section wrapper">
        <div className="aic-assurance">
          <div className="aic-assurance-icon"><LockKeyhole size={30} /></div>
          <div>
            <p className="aic-eyebrow">Controlled deployment</p>
            <h2>Deployment Tailored to Your Operational Rhythm</h2>
            <p>Every engagement begins with discovery, risk assessment and implementation planning. Our team works around your current systems, security requirements and operational priorities to reduce disruption and create a controlled path to value.</p>
            <small>Selected solutions may begin with a focused implementation sprint based on scope and technical readiness.</small>
          </div>
        </div>
      </section>

      <section className="aic-section wrapper aic-evidence">
        <div>
          <p className="aic-eyebrow">Evidence shared responsibly</p>
          <h2>Relevant Evidence, Shared in Context</h2>
        </div>
        <div>
          <p>Because client environments and deployment details may be confidential, relevant case studies are shared during the discovery process. Once we understand your operating environment, we can present examples aligned with your challenges, scale and objectives.</p>
          <a className="aic-inline-link" href="mailto:khalid@aicatlyst.com?subject=AI%20Catlyst%20Relevant%20Case%20Study%20Request">Request a Relevant Case Study <ArrowRight size={16} /></a>
        </div>
      </section>

      <section className="aic-section wrapper aic-decision-section">
        <div className="aic-section-intro centered">
          <p className="aic-eyebrow">What the first conversation produces</p>
          <h2>Clarity Before Commitment</h2>
          <p>The assessment is designed to give decision-makers a sharper view of the opportunity, constraints and practical next move.</p>
        </div>
        <div className="aic-decision-grid">
          <motion.article custom={0} variants={cardReveal} initial="hidden" whileInView="visible" viewport={viewport}><strong>01</strong><h3>Opportunity focus</h3><p>Identify the operational challenge with the strongest commercial relevance.</p></motion.article>
          <motion.article custom={1} variants={cardReveal} initial="hidden" whileInView="visible" viewport={viewport}><strong>02</strong><h3>Readiness view</h3><p>Understand the process, data, system and governance conditions around it.</p></motion.article>
          <motion.article custom={2} variants={cardReveal} initial="hidden" whileInView="visible" viewport={viewport}><strong>03</strong><h3>Practical next move</h3><p>Define whether to investigate, redesign, pilot or prepare for deployment.</p></motion.article>
        </div>
      </section>

      <section className="aic-section wrapper" id="aic-contact">
        <div className="aic-contact">
          <div>
            <p className="aic-eyebrow">Start With a Focused Conversation</p>
            <h2>Identify Where AI Can Create Real Operational Value</h2>
            <p>Speak with our business, transformation and technology experts to assess bottlenecks, evaluate suitable opportunities and define a practical deployment roadmap.</p>
          </div>
          <div className="aic-contact-action">
            <a className="aic-button" href={assessmentEmail}>Book a Free Expert Assessment <ArrowRight size={17} /></a>
            <a href="mailto:khalid@aicatlyst.com">khalid@aicatlyst.com</a>
            <span>No generic sales pitch. Start with the operating challenge.</span>
          </div>
        </div>
      </section>

      <div className="aic-legal wrapper">
        <span>© 2026 AI Catlyst Ltd. All rights reserved.</span>
        <a href="#home">A Knight&apos;s Move Consulting Group Company</a>
        <span>Designed by <a href="https://levatahq.com" target="_blank" rel="noreferrer">Levata</a></span>
      </div>
      </div>
    </MotionConfig>
  )
}

export default AICatlystPage
