import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  ArrowRight,
  BrainCircuit,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardCheck,
  Factory,
  FileDown,
  Globe2,
  HeartPulse,
  Landmark,
  Layers3,
  Menu,
  Network,
  Route,
  Truck,
  Workflow,
  X,
} from 'lucide-react'
import './App.css'
import AICatlystPage from './AICatlystPage.jsx'

const calendly = 'mailto:info@knightsmoveconsulting.com?subject=KMC%20consultation'
const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`

const ease = [0.16, 1, 0.3, 1]
const revealTransition = { duration: 0.75, ease }
const revealVariants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: revealTransition },
}
const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease } },
}

const services = [
  {
    slug: 'supply-chain',
    title: 'Supply Chain Transformation',
    eyebrow: 'CargoWise and logistics operations',
    audience: 'Operations Directors, Logistics GMs, Supply Chain Leads, CargoWise users',
    headline: 'Still manually reconciling your CargoWise data every morning?',
    subline: 'Reduce re-keying, fix CargoWise gaps and give operators cleaner shipment data.',
    icon: Truck,
    cta: 'Book a CargoWise optimisation call',
    pains: [
      'You went live on CargoWise but the team has built workarounds around the parts they do not trust.',
      'Freight costs are rising but visibility is split across systems, spreadsheets and inboxes.',
      'Shipment data is still re-keyed every morning before the operations meeting.',
      'AI is coming to logistics, but your data is not clean enough or connected enough to use it.',
    ],
    steps: [
      ['Assess and map', 'Audit CargoWise configuration, data quality and workflow gaps.'],
      ['Redesign before build', 'Redesign real operating workflows before touching configuration.'],
      ['Implement and extend', 'Configure, integrate, develop custom modules and train the team.'],
    ],
    deliverables: [
      'CargoWise health report',
      'Configuration gap analysis',
      'Workflow redesign document',
      'Custom module development',
      'AI-readiness upgrade plan',
      'Team training programme',
    ],
    proof: ['CargoWise workflow depth', 'Managed specialist capacity', 'Cleaner data for automation'],
  },
  {
    slug: 'erp',
    title: 'ERP Transformation',
    eyebrow: 'Vendor-neutral ERP selection and delivery',
    audience: 'CFOs, COOs and IT Managers evaluating or rescuing ERP programmes',
    headline: 'For CFOs and COOs choosing ERP: get an independent view before vendors shape the decision.',
    subline: 'Choose the right ERP, protect the business case and stop configuration choices from driving the process.',
    icon: Layers3,
    cta: 'Book an independent ERP review',
    pains: [
      'You have shortlisted vendors and the business cannot agree on which one is right.',
      'The implementation is already over budget, behind schedule or losing stakeholder confidence.',
      'Your team built workarounds around the last system and cannot afford to repeat the pattern.',
      'The ERP may go live in 12 months but no one has designed it with AI agents in mind.',
    ],
    steps: [
      ['Select without bias', 'Requirements, market analysis, structured RFP and weighted scoring.'],
      ['Design before configuration', 'Workflow design happens before any consultant configures the system.'],
      ['Implement AI-first', 'API-first design, clean data flows and agent-ready architecture from go-live.'],
    ],
    deliverables: [
      'Vendor-neutral selection',
      'Weighted RFP scorecard',
      'Workflow design pack',
      'Architecture recommendations',
      'Change and training plan',
      'Implementation sequencing',
    ],
    proof: ['No vendor commission', 'Workflow-led scoring', 'Adoption planned early'],
  },
  {
    slug: 'ai-strategy',
    title: 'AI Strategy & Workflow Readiness',
    eyebrow: 'Board-ready AI strategy',
    audience: 'CEOs, boards and strategy leads with an AI question and no clear answer',
    headline: 'For boards asking about AI: find the workflows worth funding before tools are bought.',
    subline: 'Find the workflows worth automating, the data gaps to fix and the tools to avoid.',
    icon: BrainCircuit,
    cta: 'Book an AI workflow review',
    pains: [
      'Every vendor says add AI, but no one has assessed whether your systems are ready.',
      'Teams are using AI tools individually without changing how the business operates.',
      'You are about to spend on a programme that could be dated before it goes live.',
      'You need a specific AI roadmap grounded in the work your teams do every day.',
    ],
    steps: [
      ['Strategy lens', 'Tie AI decisions to revenue, cost, risk or service improvement.'],
      ['Workflow lens', 'Find the workflows agents can own and the bottlenecks automation removes.'],
      ['Architecture lens', 'Assess APIs, data quality and machine-readable system flows.'],
    ],
    deliverables: [
      'AI workflow review report',
      'Strategy gap analysis',
      '90-day AI roadmap',
      'Board presentation deck',
      'Vendor selection criteria',
      'Implementation sequencing plan',
    ],
    proof: ['No vendor agenda', 'Workflow evidence', 'Board-ready decisions'],
  },
  {
    slug: 'digital-strategy',
    title: 'Digital Roadmap',
    eyebrow: 'Digital roadmap and sequencing',
    audience: 'CEOs, COOs, CFOs and programme leaders deciding what to fund next',
    headline: 'You do not need another digital wishlist. You need a roadmap the business can actually deliver.',
    subline: 'Decide what to fund first, what to pause and what each initiative must change in daily work.',
    icon: Route,
    cta: 'Build the roadmap',
    pains: [
      'Every department has a different priority and no one can explain what should happen first.',
      'Digital initiatives are funded as isolated projects instead of one operating model shift.',
      'The roadmap looks good in a slide deck but does not connect to real workflows, owners or constraints.',
      'AI is being discussed separately from the systems and data foundations it depends on.',
    ],
    steps: [
      ['Find the commercial logic', 'Clarify the outcomes, constraints and investment decisions behind the roadmap.'],
      ['Prioritise the operating shifts', 'Map workflows, dependencies and quick wins before technology choices harden.'],
      ['Sequence the delivery', 'Build a phased roadmap with owners, risks, milestones and AI workflow checks built in.'],
    ],
    deliverables: [
      'Digital maturity assessment',
      'Prioritised initiative portfolio',
      '12-month delivery roadmap',
      'Investment sequencing model',
      'Risk and dependency map',
      'Executive decision pack',
    ],
    proof: ['Budget-ready priorities', 'Clear sequencing', 'Named owners'],
  },
  {
    slug: 'ocm',
    title: 'OCM, Training & Coaching',
    eyebrow: 'People, adoption and manager coaching',
    audience: 'HR Directors, Change Leads, IT PMs and Operations Heads preparing teams for new ways of working',
    headline: 'You invested in the platform. But your people are not using it.',
    subline: 'Prepare managers and teams before go-live pressure turns confusion into resistance.',
    icon: Workflow,
    cta: 'Plan adoption before go-live',
    pains: [
      'The last system launch failed because no one prepared people for how work would change.',
      'Go-live is close and training, support and adoption tracking still have no owner.',
      'Delivery teams know the platform but not how to coach resistance through change.',
      'Managers are expected to lead new workflows without the language, tools or confidence to do it.',
    ],
    steps: [
      ['Map the change impact', 'Stakeholder mapping, resistance planning and adoption risks before go-live pressure arrives.'],
      ['Build the training path', 'Role-based sessions, manager coaching and workflow walk-throughs for real work.'],
      ['Embed adoption', 'Communication, support rhythms and adoption measurement after launch.'],
    ],
    deliverables: [
      'Change strategy document',
      'Stakeholder impact assessment',
      'Communication plan',
      'Role-based training',
      'AI adoption workshop',
      'Go-live support plan',
    ],
    proof: ['Role-based training', 'Manager coaching', 'Post-launch support'],
  },
  {
    slug: 'borderless-resourcing',
    title: 'Borderless Resourcing',
    eyebrow: 'Specialist capacity without permanent headcount',
    audience: 'IT, operations and delivery leaders needing trusted specialist capability fast',
    headline: 'For stretched IT and operations teams: add specialist delivery capacity without permanent headcount.',
    subline: 'Add skilled delivery support with clear roles, cadence and local accountability.',
    icon: Globe2,
    cta: 'Discuss resourcing needs',
    pains: [
      'Your internal team is already stretched across delivery, support and business-as-usual work.',
      'You need CargoWise, ERP, data or software skill for months, not a permanent role.',
      'Past outsourcing created quality issues because no one owned the outcome locally.',
      'Specialist gaps are slowing ERP, CargoWise, data and software work.',
    ],
    steps: [
      ['Define the skill gap', 'Clarify the work, skills, governance and ownership required.'],
      ['Assemble the right model', 'Blend offshore, hybrid and specialist resources under KMC oversight.'],
      ['Manage delivery quality', 'Provide rhythms, reporting and escalation paths so extra capacity turns into shipped work.'],
    ],
    deliverables: [
      'Capability gap assessment',
      'Resource model recommendation',
      'Role and responsibility design',
      'Delivery governance rhythm',
      'Specialist onboarding plan',
      'Performance reporting cadence',
    ],
    proof: ['KMC-managed quality', 'Flexible capacity', 'Specialist ERP, data and software skills'],
  },
]

const serviceLandingContent = {
  'supply-chain': {
    heroTitle: 'Remove CargoWise re-keying.',
    heroAccent: 're-keying.',
    heroText: 'For freight teams that need cleaner shipment data, fewer workarounds and better visibility across operations, finance and customer updates.',
    traditional: [
      ['Configuration before workflow', 'Teams are asked to adapt to system settings instead of redesigning the real operating flow first.'],
      ['Reporting after the fact', 'Visibility is treated as dashboards and exports, while the root workflow and data quality issues remain untouched.'],
      ['Training too late', 'Users get shown screens near go-live instead of learning how the new operating rhythm should work.'],
    ],
    methodology: [
      ['System health', 'Review CargoWise setup, module usage, integrations, data quality and operational exceptions.'],
      ['Workflow redesign', 'Map the shipment, costing, quoting and visibility workflows that should drive the operation.'],
      ['Configuration and adoption', 'Prioritise fixes, custom modules, integrations and role-based training around daily work.'],
    ],
    benefits: [
      'Less re-keying across shipments, finance and customer updates',
      'Cleaner shipment data for reporting and automation',
      'Better module usage from existing CargoWise investment',
      'Clearer visibility across cost, quote and shipment status',
      'More confident teams because workflows match how work actually moves',
      'A sequenced plan for optimisation, integration and automation',
    ],
    proofTitle: 'For freight teams that need CargoWise improved while shipments keep moving.',
    proofText: 'KMC combines CargoWise workflow review, configuration priorities, training and managed specialist capacity.',
    faqs: [
      ['Do we need a full CargoWise reimplementation?', 'Not always. The first step is a health check to identify whether the issue is configuration, workflow, training, data or integration.'],
      ['Can this work around live operations?', 'Yes. The approach prioritises changes that can be sequenced without putting daily shipments or billing at risk.'],
      ['Can KMC support custom modules or integrations?', 'Yes. The work can move from review into configuration support, custom module development, integrations and training.'],
    ],
  },
  erp: {
    heroTitle: 'Choose ERP without vendor bias.',
    heroAccent: 'vendor bias.',
    heroText: 'For CFOs and COOs who need an independent view before selection, during delivery or when an ERP programme is already slipping.',
    traditional: [
      ['Vendor demos lead the decision', 'Feature-heavy demos can hide whether the ERP will fit your workflows, data and operating constraints.'],
      ['Requirements become wishlists', 'Long requirement documents often miss the few decisions that make or break adoption and value.'],
      ['Change is treated as a workstream', 'People, process and adoption are bolted on after configuration choices have already narrowed the options.'],
    ],
    methodology: [
      ['Decision framing', 'Clarify outcomes, constraints, current pain and the commercial logic for ERP investment.'],
      ['Workflow-led selection', 'Build requirements and scoring around real operating flows, not generic feature lists.'],
      ['Implementation readiness', 'Sequence architecture, data, change, training and governance before the programme accelerates.'],
    ],
    benefits: [
      'An ERP decision with less vendor bias',
      'Better alignment between finance, operations and IT',
      'Reduced risk of expensive rework during implementation',
      'Workflow design before configuration hardens',
      'AI-ready architecture and data considerations from the start',
      'A rescue path for programmes already under pressure',
    ],
    proofTitle: 'Client-side ERP judgement before the wrong decision gets expensive.',
    proofText: 'KMC tests ERP choices against workflow fit, data constraints, adoption risk and the commercial case.',
    faqs: [
      ['Can KMC help if we already have vendors shortlisted?', 'Yes. KMC can provide an independent scoring model, decision review and workflow-led validation before selection.'],
      ['Can you work with our implementation partner?', 'Yes. KMC can sit client-side to protect business outcomes while the implementation partner handles platform configuration.'],
      ['Is this only for new ERP projects?', 'No. KMC can review, rescue or reset ERP programmes that are already underway.'],
    ],
  },
  'ai-strategy': {
    heroTitle: 'Fund AI workflows that are ready.',
    heroAccent: 'are ready.',
    heroText: 'For boards and executive teams that need to find where AI can remove cost, risk or delay before buying tools.',
    traditional: [
      ['Tool-first experimentation', 'Teams try AI tools in isolation without changing the workflows or controls around them.'],
      ['Strategy without operations', 'AI plans stay abstract because they are not tied to system access, data quality or process ownership.'],
      ['Automation promises too much', 'Vendors pitch use cases before anyone checks whether the business has the foundations to support them.'],
    ],
    methodology: [
      ['Workflow review', 'Review strategy, workflow and architecture through a 3-lens scan.'],
      ['Use case prioritisation', 'Identify where AI can improve decisions, remove bottlenecks or support agent-driven work.'],
      ['Roadmap and governance', 'Build a board-ready roadmap with sequencing, controls and implementation logic.'],
    ],
    benefits: [
      'A board-ready view of AI workflow gaps',
      'Prioritised AI use cases tied to operational value',
      'Cleaner decision-making around vendors and tools',
      'Reduced risk of disconnected AI experimentation',
      'Workflow and architecture requirements before investment',
      'A 90-day path from decision to first controlled pilots',
    ],
    proofTitle: 'AI advice that starts with the work, the data and the controls.',
    proofText: 'KMC turns AI pressure into a short list of workflows, system gaps and decisions leaders can defend.',
    faqs: [
      ['Do we need mature data before starting?', 'No. The assessment identifies data, workflow and architecture gaps so the business knows what must be fixed first.'],
      ['Will this produce a roadmap we can use?', 'Yes. The output is written for executive decisions, prioritisation and near-term action.'],
      ['Can this help with vendor selection?', 'Yes. KMC can define AI workflow criteria to evaluate vendors, platforms and implementation partners.'],
    ],
  },
  'digital-strategy': {
    heroTitle: 'Sequence digital work before budgets scatter.',
    heroAccent: 'budgets scatter.',
    heroText: 'For leadership teams with too many projects, unclear priorities and no shared decision model for what to fund next.',
    traditional: [
      ['Initiatives compete for attention', 'Departments push separate priorities without one decision model for value, effort and risk.'],
      ['Roadmaps become slideware', 'Plans look polished but fail to define owners, dependencies, sequencing and operating impact.'],
      ['Technology outruns the team', 'Projects are approved before the organisation understands data, workflow and adoption requirements.'],
    ],
    methodology: [
      ['Current state', 'Assess skills, goals, constraints and the outcomes digital work must create.'],
      ['Prioritisation model', 'Score initiatives by value, risk, delivery effort, cost and AI relevance.'],
      ['Roadmap design', 'Create a phased roadmap with owners, dependencies, governance and decision points.'],
    ],
    benefits: [
      'A clear view of what should happen first and why',
      'Reduced duplication across digital initiatives',
      'A roadmap tied to outcomes, owners and constraints',
      'Better executive confidence in investment decisions',
      'A clear bridge from budget approval to delivery',
      'AI workflow checks before future programmes are funded',
    ],
    proofTitle: 'A roadmap built for budgets, real teams and operational pressure.',
    proofText: 'KMC connects priorities, workflows, owners and delivery sequence so leaders can make funding decisions.',
    faqs: [
      ['Can this be done before a platform decision?', 'Yes. That is often the best time because the roadmap can guide what should be selected and when.'],
      ['Will this replace our internal strategy?', 'No. It turns the strategy into a sequence of decisions, initiatives and delivery steps.'],
      ['Can this support board or budget conversations?', 'Yes. Outputs are designed to help leaders explain priorities, tradeoffs and investment logic.'],
    ],
  },
  ocm: {
    heroTitle: 'Turn go-live into daily adoption.',
    heroAccent: 'daily adoption.',
    heroText: 'For change leads and managers who need users ready for the workflows, handoffs and decisions that will change.',
    traditional: [
      ['Comms are mistaken for change', 'Updates and launch emails do not prepare managers or teams for new decisions, roles and behaviours.'],
      ['Training teaches screens', 'Users learn where to click but not how their workflow, accountability or handoffs have changed.'],
      ['Resistance is addressed too late', 'Concerns surface near go-live when trust is low and timelines are tight.'],
    ],
    methodology: [
      ['Impact mapping', 'Identify who is affected, what changes for them and where resistance is likely to appear.'],
      ['Role-based enablement', 'Build training, coaching and communications around each group’s real workflow.'],
      ['Adoption measurement', 'Track uptake, confidence, support needs and manager rhythms after launch.'],
    ],
    benefits: [
      'Higher adoption of new systems and workflows',
      'Less go-live confusion across teams and managers',
      'Clearer communication about what is changing and why',
      'Training that reflects role-specific work',
      'Earlier visibility of resistance and support needs',
      'A stronger handover from project delivery to business ownership',
    ],
    proofTitle: 'Change work tied to roles, managers and the first weeks after launch.',
    proofText: 'KMC connects stakeholder impact, role-based training and post-launch support to the way teams work.',
    faqs: [
      ['Can KMC help if go-live is already close?', 'Yes. KMC can triage the highest-risk adoption gaps and create a focused support plan.'],
      ['Is training customised?', 'Yes. Training is designed around roles, workflows and the specific change people need to adopt.'],
      ['Can this include AI adoption?', 'Yes. KMC can support AI adoption workshops, coaching and practical workflow guidance.'],
    ],
  },
  'borderless-resourcing': {
    heroTitle: 'Add specialist capacity without permanent hires.',
    heroAccent: 'permanent hires.',
    heroText: 'For stretched IT and operations teams that need ERP, CargoWise, data or software skill with clear cadence and quality control.',
    traditional: [
      ['Outsourcing lacks ownership', 'Work is handed off without enough context, quality control or local accountability for outcomes.'],
      ['Hiring takes too long', 'Permanent recruitment cannot always match urgent, time-bound delivery work.'],
      ['Specialists stay disconnected', 'Extra resources help with tasks but do not always integrate into the delivery rhythm or business goal.'],
    ],
    methodology: [
      ['Skill definition', 'Clarify the work, skill gaps, governance and success measures before resourcing begins.'],
      ['Managed resourcing model', 'Assemble offshore, hybrid or specialist skill with clear roles and oversight.'],
      ['Delivery rhythm', 'Run cadence, reporting and quality checks so added capacity translates into progress.'],
    ],
    benefits: [
      'Specialist ERP, CargoWise, data or software skill without permanent overhead',
      'Faster access to delivery skill for system and data work',
      'KMC-managed oversight and escalation',
      'Flexible support for CargoWise, ERP, data and software needs',
      'Reduced pressure on internal teams',
      'Continuity from advice to implementation and support',
    ],
    proofTitle: 'Specialist capacity with a management layer ordinary outsourcing often lacks.',
    proofText: 'KMC adds capacity while keeping scope, reporting, quality and escalation visible.',
    faqs: [
      ['Is this staff augmentation or managed delivery?', 'It can be either, but KMC is strongest where specialist capacity needs oversight, delivery rhythm and quality control.'],
      ['Can resources support existing teams?', 'Yes. The model can supplement internal IT, operations, data or delivery teams.'],
      ['Can this start small?', 'Yes. Engagements can begin with a defined capability gap and scale as the delivery need becomes clearer.'],
    ],
  },
}

const industries = [
  {
    slug: 'logistics',
    title: 'Logistics & Freight',
    icon: Truck,
    audience: 'Freight forwarders, NVOCCs, 3PLs, port operators and customs brokers',
    headline: 'Prepare logistics systems for AI-led work.',
    accent: 'AI-led work.',
    now: [
      'Manual data re-entry between CargoWise, Excel and email every single day',
      'No real-time shipment visibility across carriers and transport modes',
      'CargoWise implemented but under-configured',
      'Rate cards and quotes managed outside the system',
    ],
    next: [
      'CargoWise as the single source of truth',
      'Carrier API tracking integrated into operations',
      'Full module utilisation aligned to workflows',
      'Automated rate management and quoting',
    ],
    serviceLinks: ['Supply Chain Transformation', 'AI Strategy', 'Borderless Resourcing'],
  },
  {
    slug: 'manufacturing',
    title: 'Manufacturing & Distribution',
    icon: Factory,
    audience: 'Operations Managers, Plant Directors and Supply Chain Leads',
    headline: 'Modernise ERP before planning breaks.',
    accent: 'planning breaks.',
    now: [
      'ERP running on an old version with no clear upgrade path',
      'Production planning still driven by spreadsheets',
      'Inventory held manually with no demand-driven replenishment',
      'Warehouse management disconnected from ERP',
    ],
    next: [
      'Workflow-led ERP redesign',
      'AI-ready inventory and procurement flows',
      'Connected warehouse and finance operations',
      'Practical change and training plan',
    ],
    serviceLinks: ['ERP Transformation', 'AI Workflow Review', 'Workflow Redesign', 'OCM & Training'],
  },
  {
    slug: 'healthcare',
    title: 'Healthcare & Professional Services',
    icon: HeartPulse,
    audience: 'CEOs, COOs, Digital Health Leads and Aged Care Directors',
    headline: 'Replace systems without disrupting care.',
    accent: 'disrupting care.',
    now: [
      'Disconnected clinical and admin systems',
      'System projects stalled after a difficult go-live',
      'Workforce resistance shaped by previous system fatigue',
      'AI investment on the agenda but governance is immature',
    ],
    next: [
      'Clear digital roadmap and accountable sequencing',
      'Adoption-first change plan',
      'Safer system selection and implementation',
      'Governed AI use cases with clear controls',
    ],
    serviceLinks: ['Digital Strategy', 'OCM & Change Management', 'ERP Selection', 'Borderless Resourcing'],
  },
  {
    slug: 'finance',
    title: 'Banking, Finance & Insurance',
    icon: Landmark,
    audience: 'COOs, IT Directors and Heads of Operations in mid-market financial services',
    headline: 'Modernise finance workflows without weakening control.',
    accent: 'weakening control.',
    now: [
      'Core systems too fragile to touch',
      'AI use cases identified but governance is unclear',
      'Workflow automation blocked by legacy architecture',
      'Vendor lock-in with poor API access',
    ],
    next: [
      'Compliance-aware AI use cases',
      'API-first workflow redesign',
      'Lower-risk system modernisation',
      'Change management built around regulated teams',
    ],
    serviceLinks: ['AI Strategy', 'Workflow Redesign', 'ERP Transformation', 'Compliance-aware OCM'],
  },
]

const navGroups = [
  { label: 'AI Strategy', href: '#ai-first' },
  { label: 'Services', href: '#services', children: services.map((item) => ({ label: item.title, href: `#service-${item.slug}` })) },
  { label: 'Industries', href: '#industries', children: industries.map((item) => ({ label: item.title, href: `#industry-${item.slug}` })) },
  { label: 'AI Catlyst', href: '#ai-catlyst' },
  { label: 'About', href: '#about' },
  { label: 'Insights', href: '#insights' },
]

function useRoute() {
  const currentRoute = () => {
    const hashRoute = window.location.hash.replace('#', '')
    if (hashRoute) return hashRoute
    if (window.location.pathname.replace(/\/+$/, '').endsWith('/ai-catlyst')) return 'ai-catlyst'
    return 'home'
  }
  const [route, setRoute] = useState(currentRoute)

  useEffect(() => {
    const onHash = () => {
      setRoute(currentRoute())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return route
}

function App() {
  const route = useRoute()
  const page = useMemo(() => getPage(route), [route])
  const protectedPage = route === 'ai-catlyst'

  return (
    <div className={`site-shell ${protectedPage ? 'protected-catlyst' : 'kmc-experience'}`}>
      {!protectedPage && <a className="skip-link" href="#main-content">Skip to content</a>}
      {!protectedPage && <RouteMeta route={route} />}
      <Header protectedPage={protectedPage} />
      <main id="main-content">{page}</main>
      <Footer protectedPage={protectedPage} />
    </div>
  )
}

function RouteMeta({ route }) {
  useEffect(() => {
    const service = services.find((item) => route === `service-${item.slug}`)
    const industry = industries.find((item) => route === `industry-${item.slug}`)
    const titles = {
      home: 'Knight’s Move Consulting | Workflow, ERP and AI Advisory',
      'ai-first': 'AI Strategy and Workflow Readiness | KMC',
      services: 'Transformation Services | Knight’s Move Consulting',
      industries: 'Industry Transformation Advisory | KMC',
      about: 'About Knight’s Move Consulting',
      insights: 'ERP, Workflow and AI Insights | KMC',
    }
    const descriptions = {
      home: 'Independent client-side advice for ERP, CargoWise, AI workflow readiness, adoption and specialist delivery decisions.',
      'ai-first': 'Assess workflows, system access, data and controls before funding AI tools or pilots.',
      services: 'Choose the right starting point for ERP, CargoWise, AI strategy, digital roadmaps, adoption and specialist delivery.',
      industries: 'Workflow and system transformation advice for logistics, manufacturing, healthcare and financial services.',
      about: 'Meet the senior team helping leaders make better system, workflow and transformation decisions.',
      insights: 'Practical guidance for leaders making ERP, CargoWise, AI workflow and adoption decisions.',
    }
    const title = service ? `${service.title} | Knight’s Move Consulting` : industry ? `${industry.title} Advisory | KMC` : titles[route] || titles.home
    const description = service?.subline || industry?.headline || descriptions[route] || descriptions.home
    const descriptionTag = document.querySelector('meta[name="description"]')
    const previousTitle = document.title
    const previousDescription = descriptionTag?.content
    document.title = title
    if (descriptionTag) descriptionTag.content = description
    return () => {
      document.title = previousTitle
      if (descriptionTag && previousDescription) descriptionTag.content = previousDescription
    }
  }, [route])

  return null
}

function getPage(route) {
  if (route === 'ai-catlyst') return <AICatlystPage />
  if (route === 'ai-first') return <AIPage />
  if (route === 'services') return <ServicesHub />
  if (route === 'industries') return <IndustriesHub />
  if (route === 'about') return <AboutPage />
  if (route === 'insights') return <InsightsPage />

  const service = services.find((item) => route === `service-${item.slug}`)
  if (service) return <ServicePage service={service} />

  const industry = industries.find((item) => route === `industry-${item.slug}`)
  if (industry) return <IndustryPage industry={industry} />

  return <HomePage />
}

function Header({ protectedPage }) {
  const [open, setOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const close = (event) => {
      if (!event.target.closest('.nav-item')) setActiveMenu(null)
    }
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setActiveMenu(null)
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const closeMenus = () => {
    setActiveMenu(null)
    setOpen(false)
  }

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24)
  })

  return (
    <motion.header
      className={`site-header ${scrolled ? 'is-scrolled' : ''}`}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.62, ease }}
    >
      <a className="brand" href="#home" aria-label="Knight's Move Consulting home">
        <picture>
          <source srcSet={assetPath('kmc-logo-white.png')} media="(prefers-color-scheme: dark)" />
          <source srcSet={assetPath('kmc-logo-light.png')} media="(prefers-color-scheme: light)" />
          <img src={assetPath('kmc-logo-white.png')} alt="Knight's Move Consulting" />
        </picture>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navGroups.map((item) => (
          <div
            className={`nav-item ${activeMenu === item.label ? 'is-open' : ''}`}
            key={item.label}
            onMouseEnter={() => item.children && setActiveMenu(item.label)}
          >
            {item.children ? (
              <button
                type="button"
                className="nav-trigger"
                aria-expanded={activeMenu === item.label}
                aria-controls={`menu-${item.label}`}
                onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
              >
                {item.label}
                <ChevronDown size={14} />
              </button>
            ) : (
              <a href={item.href} onClick={() => setActiveMenu(null)}>{item.label}</a>
            )}
            <AnimatePresence>
              {item.children && activeMenu === item.label && (
                <motion.div
                  className="mega-panel"
                  id={`menu-${item.label}`}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.24, ease }}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <div className="mega-panel-head">
                    <span>{item.label}</span>
                    <small>{item.children.length} pages</small>
                  </div>
                  <div className="mega-flow" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="mega-link-grid">
                    {item.children.map((child, index) => (
                      <motion.a
                        key={child.href}
                        href={child.href}
                        onClick={() => setActiveMenu(null)}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.22, delay: index * 0.035, ease }}
                      >
                        <span>{child.label}</span>
                        <ArrowRight size={14} />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
      <div className="header-actions">
        <a className="ghost-link" href="#insights">{protectedPage ? 'Framework' : 'Decision framework'}</a>
        <Button href={calendly} small external>{protectedPage ? 'Book a call' : 'Assess a project'}</Button>
        <button className="menu-button" type="button" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease }}
          >
            <button className="menu-close" type="button" onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={22} />
            </button>
            <motion.img src={assetPath('kmc-logo-white.png')} alt="" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease }} />
            {navGroups.map((item, index) => (
              <motion.div
                className="mobile-group"
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.06 + index * 0.045, ease }}
              >
                <a href={item.href} onClick={closeMenus}>{item.label}</a>
                {item.children?.map((child) => (
                  <a className="mobile-child" key={child.href} href={child.href} onClick={closeMenus}>{child.label}</a>
                ))}
              </motion.div>
            ))}
            <Button href={calendly} external>Book a 30-minute call</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function HomePage() {
  return (
    <EditorialPage>
      <EditorialHero
        index="01 / Independent transformation advice"
        eyebrow="For CEOs, COOs, CFOs, IT and operations leaders"
        title="Fix the workflow before you fund the system."
        text="KMC reviews ERP, CargoWise, AI and change programmes before vendor decisions lock in the wrong way of working."
        primary="Assess a live decision"
        secondary="See the decision paths"
        secondaryHref="#decisions"
        statement="Technology should follow the operating decision. Not make it for you."
      />
      <EditorialTicker items={['ERP selection', 'CargoWise optimisation', 'AI workflow readiness', 'Digital roadmaps', 'Adoption', 'Specialist delivery']} />
      <DecisionDirectory id="decisions" />
      <WorkflowStoryboard />
      <EvidenceLedger />
      <ServiceDirectory />
      <LeadershipFeature />
      <EditorialFAQ />
      <EditorialCTA title="Test the workflow risk before you sign." text="Bring the project, vendor shortlist or delivery problem. KMC will show what to fix first." />
    </EditorialPage>
  )
}

function EditorialPage({ children }) {
  return <motion.div className="editorial-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>{children}</motion.div>
}

function EditorialHero({ index, eyebrow, title, text, primary, secondary, secondaryHref = '#editorial-main', statement, compact = false }) {
  return (
    <section className={`ed-hero ${compact ? 'compact' : ''}`}>
      <div className="wrapper ed-hero-grid">
        <motion.div className="ed-hero-main" variants={staggerVariants} initial="hidden" animate="visible">
          <motion.div className="ed-kicker" variants={itemVariants}><span>{index}</span><span>{eyebrow}</span></motion.div>
          <motion.h1 variants={itemVariants}>{title}</motion.h1>
          <motion.p className="ed-hero-copy" variants={itemVariants}>{text}</motion.p>
          <motion.div className="ed-actions" variants={itemVariants}>
            <Button href={calendly} external>{primary}</Button>
            <a href={secondaryHref}>{secondary}<ArrowRight size={16} /></a>
          </motion.div>
        </motion.div>
        <motion.aside className="ed-hero-aside" initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.25, ease }}>
          <span>Decision intelligence</span>
          <p>{statement}</p>
          <div className="ed-hero-readout">
            <div><span>01</span><strong>Workflow</strong><b>Mapped</b></div>
            <div><span>02</span><strong>Risk</strong><b>Visible</b></div>
            <div><span>03</span><strong>Next move</strong><b>Defined</b></div>
          </div>
          <div className="ed-signal"><i /><i /><i /><i /></div>
        </motion.aside>
      </div>
    </section>
  )
}

function EditorialTicker({ items }) {
  return <div className="ed-ticker" aria-label="KMC capabilities"><div>{[...items, ...items].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}</div></div>
}

function DecisionDirectory({ id }) {
  const decisions = [
    ['01', 'Selecting or rescuing ERP', 'Workflow fit, implementation risk and adoption need testing before vendor momentum takes over.', '#service-erp'],
    ['02', 'Fixing CargoWise and logistics work', 'Expose re-keying, data quality and visibility gaps across the shipment lifecycle.', '#service-supply-chain'],
    ['03', 'Finding AI work worth funding', 'Identify viable workflows, system access gaps and controls before pilots are bought.', '#ai-first'],
    ['04', 'Preparing people for change', 'Plan manager support, role training and adoption before go-live pressure arrives.', '#service-ocm'],
  ]
  return (
    <section className="ed-section ed-light" id={id}>
      <div className="wrapper">
        <EditorialHeading number="02" eyebrow="Decision directory" title="What are you deciding right now?" text="Choose the situation closest to yours. Each path shows the risk to test, the evidence to gather and the next move worth funding." />
        <div className="ed-directory">
          {decisions.map(([number, title, text, href]) => (
            <motion.a href={href} key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }}>
              <span>{number}</span><h3>{title}</h3><p>{text}</p><ArrowRight size={20} />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

function EditorialHeading({ number, eyebrow, title, text }) {
  return (
    <div className="ed-heading">
      <div><span>{number}</span><p>{eyebrow}</p></div>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

function WorkflowStoryboard() {
  const moves = [
    ['Diagnose the decision', 'Make the commercial reason, current constraints and decision risk visible.'],
    ['Trace the workflow', 'Follow the work across people, data, systems and handoffs before recommending change.'],
    ['Test the fit', 'Compare system, AI and operating-model options against evidence rather than momentum.'],
    ['Control delivery', 'Sequence implementation, adoption and specialist support around the operating reality.'],
  ]
  return (
    <section className="ed-section ed-ink" id="editorial-main">
      <div className="wrapper ed-story">
        <div className="ed-story-intro">
          <span>03 / The KMC method</span>
          <h2>Follow the work.<br />Then fund the move.</h2>
          <p>KMC gives leaders an independent route from uncertainty to a controlled implementation decision.</p>
        </div>
        <ol>
          {moves.map(([title, text], index) => <motion.li key={title} initial={{ opacity: 0.3 }} whileInView={{ opacity: 1 }} viewport={{ amount: 0.65 }}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></motion.li>)}
        </ol>
      </div>
    </section>
  )
}

function EvidenceLedger() {
  const items = [
    ['Independent advice', 'No platform commission', 'Recommendations follow workflow fit, risk and cost.'],
    ['Operational depth', 'ERP, CargoWise and AI', 'The review connects system choices to real operating work.'],
    ['Delivery capability', 'Advice through implementation', 'Senior judgement can be backed by managed specialist capacity.'],
    ['Adoption discipline', 'People included early', 'Training and manager readiness are designed before launch pressure.'],
  ]
  return (
    <section className="ed-section ed-paper">
      <div className="wrapper">
        <EditorialHeading number="04" eyebrow="Evidence ledger" title="What makes the advice useful." text="Not more slides. A clearer decision, named risks and a delivery route the client can control." />
        <div className="ed-ledger">{items.map(([label, title, text], index) => <article key={title}><span>0{index + 1} / {label}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div>
    </section>
  )
}

function ServiceDirectory() {
  return <DirectorySection number="05" eyebrow="Services" title="Six starting points. One operating principle." items={services} type="service" />
}

function DirectorySection({ number, eyebrow, title, text, items, type }) {
  return (
    <section className="ed-section ed-light" id={type === 'industry' ? 'industries-list' : 'services-list'}>
      <div className="wrapper">
        <EditorialHeading number={number} eyebrow={eyebrow} title={title} text={text} />
        <div className="ed-index">{items.map((item, index) => <a key={item.slug} href={`#${type}-${item.slug}`}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.headline}</p><ArrowRight size={18} /></a>)}</div>
      </div>
    </section>
  )
}

function LeadershipFeature() {
  return (
    <section className="ed-section ed-ink ed-leadership-feature">
      <div className="wrapper">
        <div><span>06 / Leadership</span><h2>Senior judgement stays close to the work.</h2><p>KMC combines executive transformation leadership, operational systems depth and commercial relationship building.</p><a href="#about">Meet the leadership team <ArrowRight size={16} /></a></div>
        <div className="ed-portrait-strip"><img src={assetPath('khalid-gibran.jpg')} alt="Richard Raj" /><img src={assetPath('mahen-prasad.jpg')} alt="Mahen Prasad" /><img src={assetPath('richard-raj.jpg')} alt="Khalid Gibran" /></div>
      </div>
    </section>
  )
}

function EditorialFAQ({ items }) {
  const defaults = [
    ['Do we need to know the platform before speaking with KMC?', 'No. KMC is most useful before the decision is locked in, while workflows, priorities and risks can still be shaped.'],
    ['Can KMC stay involved after the review?', 'Yes. Work can move from assessment into configuration, integration, training, change management or managed specialist capacity.'],
    ['What if the project is already underway?', 'KMC can review the current path and identify the highest-risk workflow, scope or adoption gaps before go-live.'],
  ]
  return <AccordionSection items={items || defaults} />
}

function AccordionSection({ items }) {
  const [openItem, setOpenItem] = useState(0)
  return (
    <section className="ed-section ed-paper">
      <div className="wrapper ed-faq-layout"><EditorialHeading number="07" eyebrow="Questions" title="What leaders ask before the work starts." />
        <div className="ed-accordion">{items.map(([question, answer], index) => <article key={question}><button type="button" onClick={() => setOpenItem(openItem === index ? -1 : index)} aria-expanded={openItem === index}><span>{String(index + 1).padStart(2, '0')}</span><strong>{question}</strong><span>{openItem === index ? '−' : '+'}</span></button><AnimatePresence>{openItem === index && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>{answer}</motion.p>}</AnimatePresence></article>)}</div>
      </div>
    </section>
  )
}

function EditorialCTA({ title, text }) {
  return <section className="ed-cta"><div className="wrapper"><span>Next move</span><h2>{title}</h2><p>{text}</p><Button href={calendly} external>Book a focused conversation</Button></div></section>
}

const heroVisuals = {
  home: ['ERP', 'CargoWise', 'AI', 'Change'],
  services: ['Select', 'Fix', 'Train', 'Deliver'],
  industries: ['Freight', 'Manufacturing', 'Health', 'Finance'],
  about: ['Review', 'Control', 'Deliver'],
  insights: ['Read', 'Check', 'Decide'],
  logistics: ['Shipment', 'Rates', 'Billing'],
  manufacturing: ['Plan', 'Stock', 'Warehouse'],
  healthcare: ['Admin', 'Care', 'Compliance'],
  finance: ['Risk', 'Data', 'Controls'],
  'supply-chain': ['Shipment', 'Rates', 'Billing'],
  erp: ['Finance', 'Ops', 'Inventory'],
  'ai-strategy': ['Workflow', 'Data', 'Controls'],
  'digital-strategy': ['Fund', 'Pause', 'Sequence'],
  ocm: ['Managers', 'Users', 'Adoption'],
  'borderless-resourcing': ['Local', 'Hybrid', 'Offshore'],
}

const heroSignals = {
  home: ['Independent client-side advice', 'Workflow-led decisions', 'Delivery support when needed'],
  services: ['Six practical starting points', 'Advice before vendor commitment', 'Assessment through delivery'],
  industries: ['Sector-specific workflow risk', 'Systems and adoption together', 'Practical next-step advice'],
  about: ['Senior transformation leadership', 'Commercial and delivery judgement', 'Borderless specialist network'],
  insights: ['Decision-focused guidance', 'No empty AI commentary', 'Practical frameworks and checks'],
  'ai-strategy': ['Use case before tooling', 'Readiness before investment', 'Controls before rollout'],
  'supply-chain': ['CargoWise workflow depth', 'Cleaner operational data', 'Less manual reconciliation'],
  erp: ['Vendor-neutral selection', 'Workflow fit before configuration', 'Adoption planned early'],
  'digital-strategy': ['Budget-ready priorities', 'Clear sequencing', 'Named owners and dependencies'],
  ocm: ['Role-based adoption', 'Manager readiness', 'Support beyond go-live'],
  'borderless-resourcing': ['KMC-managed quality', 'Flexible specialist capacity', 'Clear local accountability'],
  logistics: ['Shipment workflow visibility', 'CargoWise and data depth', 'Operationally grounded advice'],
  manufacturing: ['Planning-to-stock workflow', 'ERP and warehouse alignment', 'Practical adoption planning'],
  healthcare: ['Change without care disruption', 'Governance and adoption together', 'Safer system decisions'],
  finance: ['Control-aware workflow design', 'Governed AI use cases', 'Lower-risk modernisation'],
}

const heroSecondaryTargets = {
  services: '#services-list',
  industries: '#industries-list',
  about: '#leadership',
  insights: '#insight-content',
  'ai-strategy': '#ai-readiness',
}

const operationFlows = {
  home: {
    title: 'How KMC follows the work before recommending spend.',
    stages: ['Decision risk', 'Workflow map', 'System fit', 'Adoption plan', 'Delivery control'],
  },
  'supply-chain': {
    title: 'How freight work should move through CargoWise.',
    stages: ['Quote', 'Book', 'Move', 'Cost', 'Bill', 'Report'],
  },
  erp: {
    title: 'How ERP decisions move from shortlist to controlled delivery.',
    stages: ['Requirements', 'Scorecard', 'Workflow fit', 'Data check', 'Go-live plan'],
  },
  'ai-strategy': {
    title: 'How AI work moves from idea to controlled pilot.',
    stages: ['Use case', 'Workflow owner', 'Data access', 'Control point', 'Pilot'],
  },
  'digital-strategy': {
    title: 'How scattered initiatives become a funded sequence.',
    stages: ['Ideas', 'Value', 'Risk', 'Owner', 'Roadmap'],
  },
  ocm: {
    title: 'How change moves from announcement to adoption.',
    stages: ['Impact', 'Manager brief', 'Role training', 'Go-live support', 'Adoption check'],
  },
  'borderless-resourcing': {
    title: 'How specialist capacity plugs into delivery.',
    stages: ['Skill gap', 'Resource model', 'Onboard', 'Cadence', 'Quality check'],
  },
  logistics: {
    title: 'Where logistics teams usually lose visibility.',
    stages: ['Booking', 'Carrier', 'Customs', 'Warehouse', 'Customer update'],
  },
  manufacturing: {
    title: 'How manufacturing work connects planning to stock.',
    stages: ['Demand', 'Plan', 'Procure', 'Produce', 'Dispatch'],
  },
  healthcare: {
    title: 'How safer system change moves through healthcare teams.',
    stages: ['Admin', 'Clinical handoff', 'Compliance', 'Training', 'Support'],
  },
  finance: {
    title: 'How regulated workflow change keeps control visible.',
    stages: ['Risk', 'Approval', 'Data', 'Audit trail', 'Reporting'],
  },
}

function Hero({ eyebrow, title, accent, text, primary, secondary, secondaryHref, variant = 'home' }) {
  const parts = accent ? title.split(accent) : [title]
  const shouldReduceMotion = useReducedMotion()
  const [activeLens, setActiveLens] = useState(0)
  const { scrollY } = useScroll()
  const cardOneY = useTransform(scrollY, [0, 700], [0, shouldReduceMotion ? 0 : -54])
  const cardTwoY = useTransform(scrollY, [0, 700], [0, shouldReduceMotion ? 0 : 42])
  const lineY = useTransform(scrollY, [0, 700], [0, shouldReduceMotion ? 0 : -32])
  const lenses = heroVisuals[variant] || heroVisuals.home

  useEffect(() => {
    if (shouldReduceMotion) return undefined
    const timer = window.setInterval(() => {
      setActiveLens((current) => (current + 1) % lenses.length)
    }, 2200)
    return () => window.clearInterval(timer)
  }, [shouldReduceMotion, lenses.length])

  return (
    <section className="hero-section grid-bg">
      <motion.div className="hero-lines" aria-hidden="true" style={{ y: lineY }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.45 }} />
      <motion.div className="floating-card card-one" aria-hidden="true" style={{ y: cardOneY }} initial={{ opacity: 0, rotate: 9, scale: 0.92 }} animate={{ opacity: 0.72, rotate: 15, scale: 1 }} transition={{ duration: 1.05, delay: 0.42, ease }}><span /></motion.div>
      <motion.div className="floating-card card-two" aria-hidden="true" style={{ y: cardTwoY }} initial={{ opacity: 0, rotate: -24, scale: 0.92 }} animate={{ opacity: 0.72, rotate: -34, scale: 1 }} transition={{ duration: 1.05, delay: 0.52, ease }}><span /></motion.div>
      <motion.div
        className="wrapper hero-inner"
        variants={staggerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-content">
          <motion.p className="eyebrow pill" variants={itemVariants}>{eyebrow}</motion.p>
          <motion.h1 className="hero-title" variants={staggerVariants}>
            <motion.span className="title-line" variants={itemVariants}>{parts[0]}</motion.span>
            {accent && <motion.span className="title-line title-accent" variants={itemVariants}>{accent}</motion.span>}
            {parts[1] && <motion.span className="title-line" variants={itemVariants}>{parts[1]}</motion.span>}
          </motion.h1>
          <motion.p className="hero-copy" variants={itemVariants}>{text}</motion.p>
          <motion.div className="hero-actions" variants={itemVariants}>
            <Button href={calendly} external>{primary}</Button>
            <a className="secondary-action" href={secondaryHref || heroSecondaryTargets[variant] || '#process'}>
              {secondary}
              <ChevronDown size={17} />
            </a>
          </motion.div>
          <motion.ul className="hero-signals" variants={itemVariants} aria-label="Engagement principles">
            {(heroSignals[variant] || heroSignals.home).map((signal) => <li key={signal}><Check size={14} />{signal}</li>)}
          </motion.ul>
        </div>
        <motion.div className={`topic-visual ${variant}`} aria-hidden="true" variants={itemVariants}>
          <div className="topic-orbit">
            <span />
            <span />
          </div>
          <div className="topic-route" />
          <div className="topic-stack">
            {lenses.map((lens, index) => (
              <motion.span
                className={`topic-node ${activeLens === index ? 'active' : ''}`}
                key={lens}
                animate={{ opacity: activeLens === index ? 1 : 0.68, y: activeLens === index ? -4 : 0 }}
                transition={{ duration: 0.38, ease }}
              >
                {lens}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function LogoLoop() {
  const items = ['AI workflows', 'CargoWise', 'SAP', 'Microsoft BC', 'Salesforce', 'Pacific reach', 'Workflow redesign', 'OCM']
  return (
    <section className="logo-loop" aria-label="KMC capabilities">
      <div className="loop-track">
        {[...items, ...items].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
      </div>
    </section>
  )
}

function HomeProblem() {
  const problems = [
    ['Vendor-led decisions', 'ERP, CRM and logistics platforms are often chosen before workflows, data quality and adoption risks are properly understood.'],
    ['Hidden manual work', 'Spreadsheets, inboxes and re-keying keep operations moving, but they also hide the cost of poor system design.'],
    ['AI without foundations', 'Teams are experimenting with AI tools while the business still lacks clean workflows, usable APIs and decision governance.'],
    ['Change left too late', 'Training and communications get squeezed near go-live, when resistance is already expensive.'],
  ]
  return (
    <RevealSection className="section wrapper">
      <SectionHeader eyebrow="The problem" title="For leaders funding ERP, CargoWise or AI: the costly mistakes happen before contracts are signed." text="The risk is not the software. It is choosing software before the workflow, data and adoption problems are visible." />
      <motion.div className="problem-grid four" variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {problems.map(([title, text], index) => (
          <GlassCard key={title} index={`0${index + 1}`} title={title} text={text} direction={index % 2 ? 'up' : 'left'} />
        ))}
      </motion.div>
    </RevealSection>
  )
}

function HomeSolution() {
  const items = [
    ['Decision first', 'We define the commercial reason, risk and success measure before the platform conversation takes over.'],
    ['Workflow before systems', 'We map how work should flow across people, data and systems so technology supports operations instead of reshaping them by accident.'],
    ['Adoption built in', 'Change, training and coaching are treated as part of delivery, not a launch-week support task.'],
  ]
  return (
    <RevealSection className="section wrapper shift-section">
      <div className="shift-copy">
        <p className="eyebrow">The solution</p>
        <h2>Client-side advice that fixes the workflow before the software decision.</h2>
        <p>KMC reviews the work, data, people and vendor assumptions so leaders can spend with more confidence.</p>
      </div>
      <motion.div className="shift-rail" variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        {items.map(([label, text], index) => (
          <motion.article
            className="shift-card"
            key={label}
            variants={itemVariants}
            whileHover={{ x: 8, transition: { duration: 0.24, ease } }}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{label}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </motion.div>
    </RevealSection>
  )
}

function HomeOutcomes() {
  const outcomes = [
    ['Better investment decisions', 'Spend is tied to workflows, risk and operating results, not vendor momentum.'],
    ['Cleaner operations', 'Manual workarounds become visible, redesigned and measurable.'],
    ['AI-ready foundations', 'APIs, data flows and process ownership are assessed before automation is promised.'],
    ['Higher adoption', 'Managers and teams understand what changes, why it matters and how to work the new way.'],
    ['Faster delivery confidence', 'The next step is sequenced, owned and written for action.'],
    ['Flexible specialist capacity', 'When internal teams are stretched, KMC can add managed delivery skill without permanent overhead.'],
  ]
  return (
    <RevealSection className="section wrapper">
      <SectionHeader eyebrow="Business outcomes" title="What changes for leaders, teams and daily operations." />
      <motion.div className="outcome-grid" variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {outcomes.map(([title, text], index) => (
          <GlassCard key={title} index={`0${index + 1}`} title={title} text={text} compact />
        ))}
      </motion.div>
    </RevealSection>
  )
}

function ProcessSteps() {
  const steps = [
    ['Diagnose', 'Assess the decision, current workflows, system constraints and AI workflow gaps.', ClipboardCheck],
    ['Redesign', 'Shape the future workflow before vendors, configuration or build work dominate the conversation.', Route],
    ['Decide', 'Turn findings into a clear recommendation, roadmap or selection path leaders can act on.', Network],
    ['Deliver', 'Support implementation, integration, configuration, training or specialist delivery as needed.', Layers3],
    ['Embed', 'Measure adoption, coach managers and refine the operating rhythm after launch.', Workflow],
  ]
  return (
    <RevealSection id="process" className="section wrapper process-section">
      <SectionHeader eyebrow="How it works" title="From unclear decision to funded next step in five moves." />
      <motion.div className="step-grid" variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {steps.map(([title, text, Icon], index) => (
          <motion.article className="step-card" key={title} variants={itemVariants} whileHover={{ y: -10, rotateX: 2, transition: { duration: 0.24, ease } }}>
            <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
            <Icon size={30} />
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </motion.div>
    </RevealSection>
  )
}

function ServicesSnapshot() {
  const summaries = {
    'supply-chain': 'Optimise CargoWise, logistics workflows, data quality and operational visibility.',
    erp: 'Select, design or rescue ERP programmes with vendor-neutral advice.',
    'ai-strategy': 'Identify the workflows worth automating and the gaps to fix first.',
    'digital-strategy': 'Choose what to fund, stop and sequence across competing projects.',
    ocm: 'Prepare people, managers and teams to adopt new ways of working.',
    'borderless-resourcing': 'Add managed specialist skill without permanent headcount.',
  }
  return (
    <RevealSection className="section wrapper">
      <SectionHeader eyebrow="Services and capabilities" title="Pick the problem you need solved first." />
      <motion.div className="tile-grid" variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {services.map((service) => {
          const Icon = service.icon
          return (
            <motion.a className="service-tile" href={`#service-${service.slug}`} key={service.slug} variants={itemVariants} whileHover={{ y: -8, transition: { duration: 0.24, ease } }} whileTap={{ scale: 0.985 }}>
              <Icon size={28} />
              <span>{service.eyebrow}</span>
              <h3>{service.title}</h3>
              <p>{summaries[service.slug]}</p>
              <ArrowRight size={18} />
            </motion.a>
          )
        })}
      </motion.div>
    </RevealSection>
  )
}

function HomeProof() {
  return (
    <RevealSection className="section wrapper">
      <SectionHeader eyebrow="Proof and trust" title="Why senior teams use KMC before they commit to vendors or headcount." />
      <motion.div className="cred-strip" variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
        <Metric value="9" label="industries served" />
        <Metric value="2" suffix=" regions" label="NZ, AU and Pacific reach" />
        <Metric value="3" suffix=" platforms" label="CargoWise, SAP and ERP depth" />
      </motion.div>
      <motion.div className="proof-grid" variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <GlassCard title="No platform commission" text="Recommendations are based on workflow fit, risk and cost, not a vendor relationship." compact />
        <GlassCard title="Workflows before slides" text="KMC reviews how work moves through teams, systems and handoffs before recommending a path." compact />
        <GlassCard title="Advice plus delivery capacity" text="Senior review can be backed by managed specialists when the project needs extra hands." compact />
      </motion.div>
    </RevealSection>
  )
}

function LeadershipPanel() {
  const people = [
    {
      name: 'Richard Raj',
      role: 'Founder and Managing Director',
      image: 'khalid-gibran.jpg',
      bio: [
        'Richard Raj is an executive technology leader and the founder of Knight’s Move Consulting, bringing more than two decades of experience in digital strategy, technology governance, programme leadership, and large-scale business transformation.',
        'Richard established KMC to make high-quality transformation expertise accessible to organisations of all sizes. He works with boards, executives, and senior leadership teams to simplify complex challenges, develop practical strategies, improve technology delivery, and successfully lead organisational change.',
        'His expertise includes digital transformation, IT strategy, portfolio governance, operating models, programme management, Agile and Lean delivery, DevOps, and executive advisory. Richard’s leadership approach combines strategic thinking with hands-on implementation, ensuring that transformation initiatives deliver measurable business value rather than technology alone.',
        'Through KMC, Richard is committed to helping organisations reduce waste, strengthen delivery capability, and respond confidently to digital disruption. He is known for his collaborative leadership style, practical problem-solving, and ability to align people, processes, and technology around a clear business vision.',
      ],
    },
    {
      name: 'Mahen Prasad',
      role: 'General Manager',
      image: 'mahen-prasad.jpg',
      bio: [
        'Mahen Prasad is an accomplished Senior Business Analyst and Systems Implementation Consultant with more than 30 years of experience across shipping and logistics, ERP, finance, manufacturing, retail, media, and the public sector.',
        'As General Manager of Knight’s Move Consulting, Mahen supports the delivery of complex business and technology transformation programmes. He specialises in understanding business requirements, improving operational processes, implementing enterprise systems, managing systems integration, and ensuring technology solutions align with organisational goals.',
        'Mahen brings extensive experience in CargoWise, revenue management, billing, master data, finance, inventory, payroll, HR, manufacturing, warehousing, and asset management systems. His previous engagements include work with Neptune PDL, Ports of Auckland, Freightways Group, Fisher & Paykel, Triquestra, Livingston Group, and New Zealand government agencies.',
        'Known for his analytical thinking and practical delivery approach, Mahen works closely with business leaders, project teams, developers, testers, and technology vendors to turn complex requirements into effective solutions that improve efficiency and create lasting operational value.',
      ],
    },
    {
      name: 'Khalid Gibran',
      role: 'Business Development Director',
      image: 'richard-raj.jpg',
      bio: [
        'Khalid Gibran is an experienced entrepreneur, business transformation specialist, and growth advisor with a strong track record across New Zealand, Australia, Asia, the United Kingdom, and the Middle East.',
        'As Business Development Director of Knight’s Move Consulting, Khalid is responsible for building strategic relationships, identifying new market opportunities, and connecting organisations with practical solutions that improve performance, efficiency, and long-term growth.',
        'His experience spans business development, sales, customer engagement, retail partnerships, digital transformation, emerging technologies, and market expansion. Over the course of his career, Khalid has established and supported business ventures across multiple international markets and worked with major retailers and commercial partners throughout the Asia-Pacific region.',
        'Khalid is passionate about helping organisations streamline operations, adopt suitable technologies, and achieve measurable returns from transformation initiatives. He combines commercial insight, an extensive business network, and an entrepreneurial approach to create partnerships that deliver value for clients and support the continued growth of Knight’s Move Consulting.',
      ],
    },
  ]

  return (
    <section className="section wrapper leadership-section" id="leadership">
      <div className="leadership-heading">
        <p className="eyebrow">Leadership team</p>
        <h2>Senior judgement, delivery control and commercial momentum in one team.</h2>
      </div>
      <div className="profile-list">
        {people.map(({ name, role, image, bio }, index) => (
          <article className="profile-card" key={name}>
            <div className="profile-image-wrap">
              <img src={assetPath(image)} alt={`${name}, ${role}`} loading={index === 0 ? 'eager' : 'lazy'} />
            </div>
            <div className="profile-content">
              <span className="profile-number">0{index + 1}</span>
              <p className="profile-role">{role}</p>
              <h3>{name}</h3>
              <div className="profile-bio">
                {bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function FAQSection() {
  const faqs = [
    ['Do we need to know the platform before speaking with KMC?', 'No. KMC is most useful before the decision is locked in, when workflows, priorities and risks can still be shaped.'],
    ['Is this only for large programmes?', 'No. The work can start with a focused review, roadmap, CargoWise optimisation, ERP selection or adoption issue.'],
    ['How is KMC different from a software vendor?', 'KMC starts with the operating model and the cost of getting it wrong, then helps decide what system, change or resourcing is needed.'],
    ['Can KMC stay involved after the review?', 'Yes. Engagements can move from assessment into configuration, integration, training, OCM or managed specialist capacity.'],
    ['What if our team is already mid-project?', 'KMC can review the current path, identify the highest-risk gaps and help rescue scope, adoption or workflow design before go-live.'],
    ['How quickly can we get value?', 'A first call can clarify the decision, the risk and the next piece of work.'],
  ]
  return (
    <RevealSection className="section wrapper faq-section">
      <SectionHeader eyebrow="FAQ and objections" title="What leaders usually ask before a first call." />
      <motion.div className="faq-grid" variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {faqs.map(([question, answer]) => <GlassCard key={question} title={question} text={answer} compact />)}
      </motion.div>
    </RevealSection>
  )
}

function AIPage() {
  const principles = ['Pick the workflow first', 'Check system access', 'Clean the data path', 'Set controls early', 'Pilot before rollout']
  return (
    <EditorialPage>
      <EditorialHero compact index="AI / Readiness" eyebrow="For boards and executive teams" title="Find AI use cases worth funding." text="KMC reviews workflows, data access and controls so leaders can choose a small number of AI moves that can actually work." primary="Assess AI readiness" secondary="Take the readiness check" secondaryHref="#ai-readiness" statement="The useful question is not where AI can be added. It is which workflow is ready to change." />
      <section className="ed-section ed-light"><div className="wrapper"><EditorialHeading number="01" eyebrow="Readiness matrix" title="Five conditions before a controlled pilot." /><div className="ed-matrix">{principles.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong><i /></div>)}</div></div></section>
      <WorkflowStrip variant="ai-strategy" />
      <ReadinessQuiz />
      <EditorialCTA title="Check workflow readiness before buying AI." text="KMC will identify the first use cases worth testing and the gaps that need fixing." />
    </EditorialPage>
  )
}

function ReadinessQuiz() {
  const questions = [
    'Are your core business workflows documented?',
    'Are your key systems accessible via APIs?',
    'Do you know who owns each AI decision?',
    'Have you assessed which processes could be agent-driven?',
    'Do you know your biggest operational bottlenecks?',
  ]
  const [answers, setAnswers] = useState({})
  const score = Object.values(answers).filter(Boolean).length
  const complete = Object.keys(answers).length === questions.length
  const recommendation = score >= 4 ? 'Start with one controlled AI workflow pilot.' : score >= 2 ? 'Start by fixing workflow and system access gaps.' : 'Start with the 3-lens AI workflow review.'

  return (
    <RevealSection className="section wrapper quiz-section" id="ai-readiness">
      <div className="quiz-copy">
        <p className="eyebrow">Interactive readiness quiz</p>
        <h2>Five questions. A sharper next step.</h2>
        <p>Answer five questions to see whether AI work should start with pilots, workflow cleanup or system access.</p>
      </div>
      <motion.div className="quiz-card" variants={itemVariants}>
        {questions.map((question, index) => (
          <div className="quiz-row" key={question}>
            <span>{index + 1}</span>
            <p>{question}</p>
            <div>
              <button className={answers[index] === true ? 'active' : ''} onClick={() => setAnswers({ ...answers, [index]: true })}>Yes</button>
              <button className={answers[index] === false ? 'active' : ''} onClick={() => setAnswers({ ...answers, [index]: false })}>No</button>
            </div>
          </div>
        ))}
        <div className="quiz-result">
          <strong>{complete ? `${score}/5 readiness score` : 'Answer all questions'}</strong>
          <p>{complete ? recommendation : 'Your recommendation will appear here.'}</p>
          <Button href={calendly} external small>Book a 30-minute call</Button>
        </div>
      </motion.div>
    </RevealSection>
  )
}

function ServicesHub() {
  return (
    <EditorialPage>
      <EditorialHero compact index="Services / Decision paths" eyebrow="For leaders with a live decision" title="Choose the right first move." text="ERP selection, CargoWise gaps, AI pressure, adoption risk and short-term delivery capacity each need a different starting point." primary="Assess a live project" secondary="Explore services" secondaryHref="#services-list" statement="A focused first move is more valuable than a broad transformation promise." />
      <DirectorySection number="01" eyebrow="Service directory" title="Start with the decision creating risk, delay or uncertainty." text="Each engagement can begin as a focused assessment and expand only when the evidence supports it." items={services} type="service" />
      <EvidenceLedger />
      <EditorialCTA title="Unsure which service fits?" text="Bring the current blocker. KMC will identify the risk and the most practical starting point." />
    </EditorialPage>
  )
}

function ServicePage({ service }) {
  const content = serviceLandingContent[service.slug]
  const heroTitle = content?.heroTitle || service.headline
  return (
    <EditorialPage>
      <EditorialHero compact index={`Service / ${service.title}`} eyebrow={service.audience} title={heroTitle} text={content?.heroText || service.subline} primary={service.cta} secondary="See the method" secondaryHref="#process" statement={service.proof.join(' · ')} />
      <ProblemLedger title={`The signals that ${service.title.toLowerCase()} needs attention.`} items={service.pains} />
      <ComparisonSpread items={content?.traditional || []} />
      <ServiceStoryboard service={service} />
      <DeliverablesTable items={content?.benefits || service.deliverables} />
      <ProofBand items={service.proof} />
      <EditorialFAQ items={content?.faqs?.length ? content.faqs : undefined} />
      <EditorialCTA title={`Need ${service.title.toLowerCase()} without a slow discovery process?`} text="Bring the current decision or blocker. KMC will identify the risk, the next step and whether the work is worth doing." />
    </EditorialPage>
  )
}

function IndustriesHub() {
  return (
    <EditorialPage>
      <EditorialHero compact index="Industries / Operating risk" eyebrow="For sector teams with messy systems" title="Fix the workflow risk in your sector." text="Freight, manufacturing, healthcare and finance teams carry different system risk. Start with the page that sounds like your operation." primary="Discuss your environment" secondary="Explore sectors" secondaryHref="#industries-list" statement="The platform may be similar. The operating risk is not." />
      <DirectorySection number="01" eyebrow="Industry directory" title="Choose the operating environment closest to yours." text="See the workflows, controls and adoption risks KMC examines first." items={industries} type="industry" />
      <WorkflowStoryboard />
      <EditorialCTA title="Need a sector-specific second opinion?" text="Bring the current operating blocker. KMC will show which decision needs attention first." />
    </EditorialPage>
  )
}

function IndustryPage({ industry }) {
  return (
    <EditorialPage>
      <EditorialHero compact index={`Industry / ${industry.title}`} eyebrow={industry.audience} title={industry.headline} text="KMC connects system, workflow and adoption decisions to the realities of your operating environment." primary="Discuss the operating risk" secondary="Compare current state" secondaryHref="#process" statement={industry.next[0]} />
      <StateSpread industry={industry} />
      <WorkflowStrip variant={industry.slug} />
      <RelatedServices links={industry.serviceLinks} title={`Relevant moves for ${industry.title.toLowerCase()}.`} />
      <EditorialCTA title={`Running a ${industry.title.toLowerCase()} operation with system or workflow risk?`} text="Bring the current blocker. KMC will show which decision needs attention first." />
    </EditorialPage>
  )
}

function AboutPage() {
  return (
    <EditorialPage>
      <EditorialHero compact index="Company / Leadership" eyebrow="About Knight's Move Consulting" title="Meet the team before system decisions get expensive." text="KMC gives senior client-side advice, delivery control and specialist capacity for system and workflow change." primary="Book a consultation" secondary="Meet the team" secondaryHref="#leadership" statement="Senior judgement should stay close to the decision and the work." />
      <LeadershipPanel />
      <EvidenceLedger />
      <EditorialCTA title="Get a second opinion before spend increases." text="Bring the current problem, project or vendor decision. KMC will show the risk and the next move before spend increases." />
    </EditorialPage>
  )
}

function InsightsPage() {
  const [frameworkEmail, setFrameworkEmail] = useState('')
  const [frameworkReady, setFrameworkReady] = useState(false)
  const requestFramework = (event) => {
    event.preventDefault()
    setFrameworkReady(true)
    window.location.href = `mailto:info@knightsmoveconsulting.com?subject=AI%20Workflow%20Readiness%20Framework&body=${encodeURIComponent(`Please send the AI Workflow Readiness Framework to ${frameworkEmail}.`)}`
  }

  return (
    <EditorialPage>
      <EditorialHero compact index="Insights / Decision resources" eyebrow="For leaders checking their thinking" title="Think clearly before system spend." text="Use the articles and framework to test ERP, CargoWise, AI and adoption decisions before you bring in vendors or add headcount." primary="Request the framework" secondary="Read the latest" secondaryHref="#insight-content" statement="Useful insight should change the next decision, not merely describe a trend." />
      <PublicationIndex />
      <section className="ed-section ed-ink"><div className="wrapper lead-magnet">
        <div>
          <p className="eyebrow">Primary gated asset</p>
          <h2>Download the AI Workflow Readiness Framework</h2>
          <p>A short assessment for checking strategy, workflow and system access before funding AI work.</p>
        </div>
        <form className="download-form" onSubmit={requestFramework}>
          <label htmlFor="framework-email">Work email</label>
          <input id="framework-email" type="email" placeholder="name@company.com" value={frameworkEmail} onChange={(event) => setFrameworkEmail(event.target.value)} required />
          <Button asButton><FileDown size={17} /> Request framework</Button>
          <span className="form-note" aria-live="polite">{frameworkReady ? 'Your email app is opening with the request prepared.' : 'The request opens in your email app. No marketing list.'}</span>
        </form>
      </div></section>
      <EditorialCTA title="Need to test a live decision?" text="Bring the current project, shortlist or AI question. KMC will identify the next piece of evidence worth gathering." />
    </EditorialPage>
  )
}

function ProblemLedger({ title, items }) {
  return <section className="ed-section ed-light"><div className="wrapper"><EditorialHeading number="01" eyebrow="Problem ledger" title={title} /><div className="ed-problem-ledger">{items.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>)}</div></div></section>
}

function ComparisonSpread({ items }) {
  const risks = items.length ? items.map(([title, text]) => `${title}: ${text}`) : ['Technology chosen before the operating model.', 'Delivery measured by activity instead of changed work.', 'Adoption addressed after configuration decisions harden.']
  return <section className="ed-section ed-paper" id="process"><div className="wrapper ed-compare"><div><span>02 / The usual route</span><h2>Where momentum creates risk.</h2>{risks.map((item) => <p key={item}>{item}</p>)}</div><div><span>What changes</span><h2>Evidence before commitment.</h2><p>Start with the operating model before the platform or resource decision.</p><p>Tie work to measurable workflow, adoption and readiness outcomes.</p><p>Sequence implementation so teams can absorb change.</p></div></div></section>
}

function ServiceStoryboard({ service }) {
  return <section className="ed-section ed-ink"><div className="wrapper ed-service-story"><div><span>03 / Method</span><h2>How the work moves.</h2><p>{service.subline}</p></div><ol>{service.steps.map(([title, text], index) => <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section>
}

function DeliverablesTable({ items }) {
  return <section className="ed-section ed-light"><div className="wrapper"><EditorialHeading number="04" eyebrow="Outputs" title="What your team can use afterwards." /><div className="ed-output-table">{items.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong><Check size={17} /></div>)}</div></div></section>
}

function ProofBand({ items }) {
  return <section className="ed-proof-band"><div className="wrapper">{items.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</div></section>
}

function WorkflowStrip({ variant }) {
  const flow = operationFlows[variant] || operationFlows.home
  return <section className="ed-section ed-ink"><div className="wrapper"><EditorialHeading number="02" eyebrow="Operating flow" title={flow.title} /><div className="ed-flow-strip">{flow.stages.map((stage, index) => <motion.div key={stage} initial={{ opacity: 0.25 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.7 }}><span>{String(index + 1).padStart(2, '0')}</span><strong>{stage}</strong></motion.div>)}</div></div></section>
}

function StateSpread({ industry }) {
  return <section className="ed-section ed-paper" id="process"><div className="wrapper ed-state-spread"><div><span>01 / Current state</span><h2>Where risk is visible now.</h2>{industry.now.map((item) => <p key={item}>{item}</p>)}</div><div><span>Target state</span><h2>Where KMC takes the work.</h2>{industry.next.map((item) => <p key={item}>{item}</p>)}</div></div></section>
}

function RelatedServices({ links, title }) {
  return <section className="ed-section ed-light"><div className="wrapper"><EditorialHeading number="03" eyebrow="Relevant services" title={title} /><div className="ed-related">{links.map((link, index) => <div key={link}><span>0{index + 1}</span><strong>{link}</strong><ArrowRight size={17} /></div>)}</div></div></section>
}

function PublicationIndex() {
  const posts = [
    ['AI WORKFLOWS', 'Why AI pilots fail before they start', 'The workflow, data and approval path are usually the issue, not the model.'],
    ['SUPPLY CHAIN', 'AI agents will run logistics workflows', 'Find suppliers, negotiate rates, book transport and track execution without human bottlenecks.'],
    ['ERP', 'Selecting ERP when AI workflows are on the roadmap', 'API access, clean data and adoption risk now matter as much as feature count.'],
  ]
  return <section className="ed-section ed-light" id="insight-content"><div className="wrapper"><EditorialHeading number="01" eyebrow="Latest thinking" title="Decision-focused reading for operating leaders." /><div className="ed-publication">{posts.map(([tag, title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')} / {tag}</span><h2>{title}</h2><p>{text}</p><a href="#insights">Read note <ArrowRight size={15} /></a></article>)}</div></div></section>
}

function PainPoints({ pains, serviceTitle }) {
  return (
    <RevealSection className="section wrapper">
      <SectionHeader eyebrow="The problem" title={`For teams considering ${serviceTitle.toLowerCase()}: these symptoms usually show up first.`} />
      <motion.div className="problem-grid four" variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {pains.map((pain, index) => <GlassCard key={pain} index={`0${index + 1}`} title={pain} />)}
      </motion.div>
    </RevealSection>
  )
}

function TraditionalFailure({ items }) {
  return (
    <RevealSection className="section wrapper split-compare" id="process">
      <ComparePanel title="Why the usual route costs time" items={items.map(([title, text]) => `${title}: ${text}`)} />
      <ComparePanel title="What has to change before spend increases" items={[
        'Start with the operating model before the platform or resource decision.',
        'Tie the work to measurable workflow, adoption and readiness outcomes.',
        'Sequence implementation so teams can absorb change without losing momentum.',
      ]} positive />
    </RevealSection>
  )
}

function Methodology({ items }) {
  return (
    <RevealSection className="section wrapper">
      <SectionHeader eyebrow="Our approach" title="How KMC gets leaders from risk to decision." />
      <motion.div className="tile-grid" variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {items.map(([title, text], index) => (
          <GlassCard key={title} index={`0${index + 1}`} title={title} text={text} compact />
        ))}
      </motion.div>
    </RevealSection>
  )
}

function BenefitsOutcomes({ benefits }) {
  return (
    <RevealSection className="section wrapper deliverables">
      <SectionHeader eyebrow="Key benefits and outcomes" title="What your team should be able to do afterwards." />
      <motion.div className="deliverable-grid" variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {benefits.map((item) => (
          <motion.span key={item} variants={itemVariants}><Check size={16} />{item}</motion.span>
        ))}
      </motion.div>
    </RevealSection>
  )
}

function OperationFlow({ variant }) {
  const flow = operationFlows[variant] || operationFlows.home
  return (
    <RevealSection className={`section wrapper operation-flow ${variant}`}>
      <div className="flow-copy">
        <p className="eyebrow">Operation flow</p>
        <h2>{flow.title}</h2>
      </div>
      <motion.div className="flow-board" variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
        <div className="flow-line" aria-hidden="true" />
        {flow.stages.map((stage, index) => (
          <motion.div className="flow-stage" key={stage} variants={itemVariants} style={{ '--stage-index': index }}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{stage}</strong>
          </motion.div>
        ))}
      </motion.div>
    </RevealSection>
  )
}

function ApproachSteps({ steps }) {
  return (
    <RevealSection className="section wrapper">
      <SectionHeader eyebrow="Process and implementation" title="How the work moves from review to implementation." />
      <motion.div className="step-grid" variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {steps.map(([title, text], index) => (
          <motion.article className="step-card" key={title} variants={itemVariants} whileHover={{ y: -8, transition: { duration: 0.24, ease } }}>
            <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </motion.div>
    </RevealSection>
  )
}

function ServiceProof({ service, content }) {
  return (
    <RevealSection className="section wrapper service-proof">
      <SectionHeader eyebrow="Trust and proof" title={content?.proofTitle || 'Specific reasons KMC wins this work.'} text={content?.proofText} />
      <motion.div className="tile-grid" variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {service.proof.map((item) => <GlassCard key={item} title={item} text="How it shows up: clear recommendations, named risks and a delivery path the client can control." compact />)}
      </motion.div>
    </RevealSection>
  )
}

function ServiceFAQ({ faqs }) {
  return (
    <RevealSection className="section wrapper">
      <SectionHeader eyebrow="FAQ" title="Questions buyers usually ask before this work starts." />
      <motion.div className="faq-grid" variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {faqs.map(([question, answer]) => <GlassCard key={question} title={question} text={answer} compact />)}
      </motion.div>
    </RevealSection>
  )
}

function ComparePanel({ title, items, positive }) {
  return (
    <motion.div className={`compare-panel ${positive ? 'positive' : ''}`} variants={itemVariants} whileHover={{ y: -6, transition: { duration: 0.24, ease } }}>
      <h2>{title}</h2>
      {items.map((item) => <p key={item}><Check size={16} />{item}</p>)}
    </motion.div>
  )
}

function LatestInsights() {
  const posts = [
    ['AI WORKFLOWS', 'Why AI pilots fail before they start', 'The workflow, data and approval path are usually the issue, not the model.'],
    ['SUPPLY CHAIN', 'AI agents will run logistics workflows', 'Find suppliers, negotiate rates, book transport and track execution without human bottlenecks.'],
    ['ERP', 'Selecting ERP when AI workflows are on the roadmap', 'API access, clean data and adoption risk now matter as much as feature count.'],
  ]
  return (
    <RevealSection className="section wrapper">
      <SectionHeader eyebrow="Latest insights" title="Current thinking for leaders before they commit spend." />
      <motion.div className="tile-grid" variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {posts.map(([tag, title, text]) => (
          <motion.article className="insight-card" key={title} variants={itemVariants} whileHover={{ y: -8, transition: { duration: 0.24, ease } }}>
            <span>{tag}</span>
            <h3>{title}</h3>
            <p>{text}</p>
            <a href="#insights">Read article <ArrowRight size={16} /></a>
          </motion.article>
        ))}
      </motion.div>
    </RevealSection>
  )
}

function CTASection({ title, text }) {
  return (
    <RevealSection className="section wrapper cta-section">
      <div>
        <p className="eyebrow">Next step</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="cta-actions">
        <Button href={calendly} external><CalendarDays size={18} /> Book a 30-minute call</Button>
        <a href="#insights" className="secondary-action"><FileDown size={17} /> Download framework</a>
      </div>
    </RevealSection>
  )
}

function RevealSection({ children, className, direction = 'up', ...props }) {
  const offset = {
    up: { x: 0, y: 34 },
    down: { x: 0, y: -28 },
    left: { x: 34, y: 0 },
    right: { x: -34, y: 0 },
  }[direction]
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={revealTransition}
      viewport={{ once: true, amount: 0.16 }}
      {...props}
    >
      {children}
    </motion.section>
  )
}

function SectionHeader({ eyebrow, title, text }) {
  return (
    <motion.div className="section-header" variants={revealVariants}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </motion.div>
  )
}

function GlassCard({ index, title, text, compact, direction = 'up' }) {
  const offset = {
    up: { x: 0, y: 22 },
    left: { x: 22, y: 0 },
    right: { x: -22, y: 0 },
  }[direction]
  return (
    <motion.article
      className={`glass-card ${compact ? 'compact' : ''}`}
      variants={{ hidden: { opacity: 0, ...offset }, visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.55, ease } } }}
      whileHover={{ y: -10, transition: { duration: 0.24, ease } }}
    >
      {index && <span>{index}</span>}
      <h3>{title}</h3>
      {text && <p>{text}</p>}
    </motion.article>
  )
}

function HubCard({ item, href }) {
  const Icon = item.icon
  return (
    <motion.a className="hub-card" href={href} variants={itemVariants} whileHover={{ y: -8, transition: { duration: 0.24, ease } }} whileTap={{ scale: 0.985 }}>
      <Icon size={30} />
      <span>{item.eyebrow || item.audience}</span>
      <h2>{item.title}</h2>
      <p>{item.headline}</p>
      <ArrowRight size={18} />
    </motion.a>
  )
}

// Retained temporarily as compatibility fallbacks while the editorial routes use
// the new AI conversion components above.
void [Hero, LogoLoop, HomeProblem, HomeSolution, HomeOutcomes, ProcessSteps, ServicesSnapshot, HomeProof, FAQSection, PainPoints, TraditionalFailure, Methodology, BenefitsOutcomes, OperationFlow, ApproachSteps, ServiceProof, ServiceFAQ, LatestInsights, CTASection, HubCard]

function Metric({ value, label, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const numericValue = Number.parseInt(value, 10)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { stiffness: 80, damping: 18 })
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    if (inView && Number.isFinite(numericValue)) {
      motionValue.set(numericValue)
    }
  }, [inView, motionValue, numericValue])

  useMotionValueEvent(springValue, 'change', (latest) => {
    setDisplayValue(String(Math.round(latest)))
  })

  return (
    <motion.div className="metric" ref={ref} variants={itemVariants} whileHover={{ y: -6, transition: { duration: 0.24, ease } }}>
      <strong>{Number.isFinite(numericValue) ? displayValue : value}{suffix}</strong>
      <span>{label}</span>
    </motion.div>
  )
}

function Button({ href, children, small, external, asButton }) {
  const className = `primary-button ${small ? 'small' : ''}`
  const motionProps = {
    whileHover: { y: -3, scale: 1.018, boxShadow: '0 28px 70px rgba(235, 194, 102, 0.32)' },
    whileTap: { y: 0, scale: 0.975 },
    transition: { duration: 0.2, ease },
  }
  if (asButton) return <motion.button className={className} type="submit" {...motionProps}>{children}<ArrowRight size={17} /></motion.button>
  return <motion.a className={className} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} {...motionProps}>{children}<ArrowRight size={17} /></motion.a>
}

function Footer({ protectedPage }) {
  return (
    <footer className="site-footer">
      {!protectedPage && (
        <div className="wrapper footer-conversion">
          <div>
            <span>Have a live system, workflow or AI decision?</span>
            <strong>Get an independent view before more spend is committed.</strong>
          </div>
          <Button href={calendly} external>Assess the decision</Button>
        </div>
      )}
      <div className="wrapper footer-grid">
        <div>
          <img src={assetPath('kmc-logo-white.png')} alt="Knight's Move Consulting" />
          <p>Client-side advice for ERP, CargoWise, AI workflow, adoption and specialist delivery decisions.</p>
        </div>
        <FooterColumn title="Services" items={services.map((item) => [item.title, `#service-${item.slug}`])} />
        <FooterColumn title="Industries" items={industries.map((item) => [item.title, `#industry-${item.slug}`])} />
        <FooterColumn title="Company" items={[['AI Catlyst', '#ai-catlyst'], ['About', '#about'], ['Insights', '#insights'], ['AI Strategy', '#ai-first']]} />
      </div>
      <div className="wrapper footer-bottom">
        <span>{protectedPage ? "© 2025 Knight's Move Consulting Ltd." : "© 2026 Knight's Move Consulting Ltd."}</span>
        <span>knightsmoveconsulting.com | +64 21 228 9920</span>
        <span>Designed by <a href="https://levatahq.com" target="_blank" rel="noreferrer">Levata</a></span>
      </div>
    </footer>
  )
}

function FooterColumn({ title, items }) {
  return (
    <div className="footer-column">
      <h3>{title}</h3>
      {items.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
    </div>
  )
}

export default App
