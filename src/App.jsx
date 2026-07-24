import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useScroll } from 'motion/react'
import { Plus, ArrowRight, Check, Phone } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]
const TYPEFORM = 'https://form.typeform.com/to/Klck50zm'
const HERO_VIDEO = '/hero-video.mp4'

/* ================= shared ================= */

function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      className={className}
      initial={{ y: 24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay, duration: 0.8, ease: EASE }}
    >
      {children}
    </Tag>
  )
}

function useSequence(inView, count, interval, initialDelay = 200) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    let i = 0
    let timer
    const start = setTimeout(() => {
      timer = setInterval(() => {
        i += 1
        setN(i)
        if (i >= count) clearInterval(timer)
      }, interval)
    }, initialDelay)
    return () => {
      clearTimeout(start)
      clearInterval(timer)
    }
  }, [inView, count, interval, initialDelay])
  return n
}

function useCountUp(inView, target, dur = 1200) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf
    const t0 = performance.now()
    const step = (t) => {
      const p = Math.min((t - t0) / dur, 1)
      setV(Math.round(p * target))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, dur])
  return v
}

function LogoIcon({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="5" y="8" width="22" height="9" rx="4.5" fill="#000" transform="rotate(-35 16 12.5)" />
      <rect x="5" y="17" width="22" height="9" rx="4.5" fill="#000" transform="rotate(-35 16 21.5)" />
    </svg>
  )
}

function DotGridIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <circle cx="3.5" cy="3.5" r="1.5" fill="#fff" />
      <circle cx="8.5" cy="3.5" r="1.5" fill="#fff" />
      <circle cx="3.5" cy="8.5" r="1.5" fill="#fff" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="#fff" />
    </svg>
  )
}

function CheckPill() {
  return (
    <span className="check-circle">
      <Check size={10} strokeWidth={3.2} />
    </span>
  )
}

function LiveBadge() {
  return (
    <span className="live-badge">
      <span className="live-dot" />
      Live
    </span>
  )
}

/* ================= chrome ================= */

function ProgressBar() {
  const { scrollYProgress } = useScroll()
  return <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
}

const MENU_LINKS = [
  ['#demo', 'How It Works'],
  ['#dashboard', 'Command Center'],
  ['#tools', 'Integrations'],
  ['#faq', 'FAQ'],
  ['#process', 'What Happens When You Book'],
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled && !open ? 'scrolled' : ''}`}
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div className="nav-left">
          <a href="#" className="logo" onClick={() => setOpen(false)}>
            <LogoIcon />
            <span className="brand-text">NexFlow</span>
          </a>

          <button
            className={`menu-btn ${open ? 'open' : ''}`}
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="menu-circle">
              <Plus size={12} strokeWidth={3} color="#000" />
            </span>
            <span className="menu-label">{open ? 'Close' : 'Menu'}</span>
          </button>

          <div className="nav-tags">
            <a href="#demo">How It Works</a>
            <a href="#dashboard">Command Center</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>

        <div className="nav-right">
          <a className="right-pill" href={TYPEFORM} target="_blank" rel="noopener noreferrer">
            <span className="grid-btn">
              <DotGridIcon />
            </span>
            <span className="right-label">Book Free Audit</span>
          </a>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="menu-links">
              {MENU_LINKS.map(([href, label], i) => (
                <motion.a
                  key={href}
                  href={href}
                  className="menu-link heading"
                  onClick={() => setOpen(false)}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.6, ease: EASE }}
                >
                  {label}
                </motion.a>
              ))}
            </div>
            <motion.div
              className="menu-cta"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6, ease: EASE }}
            >
              <a className="btn-primary" href={TYPEFORM} target="_blank" rel="noopener noreferrer">
                Book Your Free Audit
                <ArrowRight size={14} strokeWidth={2.2} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ================= hero (no video) ================= */

function Hero() {
  return (
    <section className="hero">
      <motion.div
        className="video-wrap"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <div className="video-inner">
          <video src={HERO_VIDEO} autoPlay muted playsInline loop />
        </div>
      </motion.div>

      <motion.div
        className="hero-footer"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: EASE }}
      >
        <div className="hero-left">
          <motion.div
            className="subtitle"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
          >
            <span className="dot" />
            <span>Done-for-you AI operations — for any business that runs on calls, bookings & follow-up</span>
          </motion.div>

          <motion.h1
            className="heading"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: EASE }}
          >
            AI agents that
            <br />
            actually run the work.
          </motion.h1>

          <motion.div
            className="cta-row"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8, ease: EASE }}
          >
            <a className="btn-primary" href={TYPEFORM} target="_blank" rel="noopener noreferrer">
              Book Your Free Audit
              <ArrowRight size={14} strokeWidth={2.2} />
            </a>
            <a className="btn-secondary" href="#demo">
              See How It Works
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero-right"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8, ease: EASE }}
        >
          <span className="pill-tag">Voice Agents</span>
          <span className="pill-tag">Custom Agents</span>
          <span className="pill-tag">24/7 Coverage</span>
          <span className="pill-tag">Fully Managed</span>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ================= integrations ================= */

const cdn = (slug) => `https://cdn.simpleicons.org/${slug}/000000`
const LOGOS = [
  ['/logos/slack.svg', 'Slack'],
  [cdn('gmail'), 'Gmail'],
  [cdn('googlecalendar'), 'Google Calendar'],
  [cdn('stripe'), 'Stripe'],
  ['/logos/twilio.svg', 'Twilio'],
  [cdn('hubspot'), 'HubSpot'],
  [cdn('calendly'), 'Calendly'],
  [cdn('quickbooks'), 'QuickBooks'],
  [cdn('zoom'), 'Zoom'],
  [cdn('square'), 'Square'],
  [cdn('whatsapp'), 'WhatsApp'],
  [cdn('notion'), 'Notion'],
]

function Integrations() {
  const track = [...LOGOS, ...LOGOS]
  return (
    <section id="tools" className="integrations">
      <Reveal className="eyebrow-row centered">
        <span className="dot" />
        <span>Plugs into 55+ tools you already run</span>
      </Reveal>
      <Reveal delay={0.15} className="marquee">
        <div className="marquee-track">
          {track.map(([src, name], i) => (
            <img key={i} src={src} alt={name} loading="lazy" />
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.2} className="stack-note">
        <h3 className="heading stack-heading">
          No rip and replace. <span className="ghosted">It joins your stack.</span>
        </h3>
        <p className="body-text centered-text">
          Keep the CRM, calendar, phone, and inbox you already run. NexFlow plugs in alongside them —
          55+ integrations out of the box, no migration, no retraining.
        </p>
      </Reveal>
    </section>
  )
}

/* ================= offerings ================= */

function OfferingIntro() {
  return (
    <section id="demo" className="offer-intro">
      <Reveal className="eyebrow-row centered">
        <span className="dot" />
        <span>What we build</span>
      </Reveal>
      <Reveal as="h2" delay={0.1} className="heading section-heading">
        Two kinds of agents.
        <br />
        <span className="ghosted">Both run themselves.</span>
      </Reveal>
    </section>
  )
}

function Offering({ id, index, kicker, title, body, bullets, flip, visual }) {
  return (
    <section id={id} className={`offering ${flip ? 'flip' : ''}`}>
      <Reveal className="offering-copy">
        <div className="kicker">
          <span className="kicker-num">{index}</span>
          <span>{kicker}</span>
        </div>
        <h3 className="heading offering-heading">{title}</h3>
        <p className="body-text">{body}</p>
        <ul className="check-list">
          {bullets.map((b) => (
            <li key={b}>
              <CheckPill />
              {b}
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={0.15} className="offering-visual">
        {visual}
      </Reveal>
    </section>
  )
}

/* ---- 01: animated live call ---- */

const CALL_SCRIPT = [
  ['caller', 'Caller', 'Hi — do you have any openings this week?'],
  ['agent', 'NexFlow agent', 'We do. I can get you in Thursday at 10, or Friday at 2 — which works better?'],
  ['caller', 'Caller', 'Thursday at 10 is perfect.'],
  ['agent', 'NexFlow agent', "Booked. You'll get a text confirmation shortly. Anything else?"],
]

function VoiceDemo() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [connected, setConnected] = useState(false)
  const [secs, setSecs] = useState(0)
  const shown = useSequence(connected, CALL_SCRIPT.length + 1, 950, 0)

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setConnected(true), 850)
    return () => clearTimeout(t)
  }, [inView])

  useEffect(() => {
    if (!connected) return
    const t = setInterval(() => setSecs((s) => Math.min(s + 1, 59)), 1000)
    return () => clearInterval(t)
  }, [connected])

  return (
    <div className="phone" ref={ref}>
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="call-top">
          <div className="call-av">
            <Phone size={20} strokeWidth={2} />
          </div>
          <div className="call-name">NexFlow Voice Agent</div>
          <div className="call-status">
            {connected ? `Connected · 00:${String(secs).padStart(2, '0')}` : 'Incoming call…'}
          </div>
          <div className={`wave ${connected ? 'on' : ''}`}>
            {Array.from({ length: 7 }).map((_, i) => (
              <i key={i} />
            ))}
          </div>
        </div>
        <div className="call-body">
          {CALL_SCRIPT.map(([role, who, text], i) => (
            <div key={i} className={`vbubble ${role} anim-step ${shown > i ? 'show' : ''}`}>
              <span className="lbl">{who}</span>
              {text}
            </div>
          ))}
          <div className={`call-done anim-step ${shown > CALL_SCRIPT.length ? 'show' : ''}`}>
            <span className="done-check">
              <Check size={12} strokeWidth={3} />
            </span>
            <div>
              <div className="done-title">Booked · Thu 10:00 AM</div>
              <div className="done-sub">SMS sent · added to calendar · logged to CRM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---- 02: chat agent working ---- */

const CHAT_STEPS = [
  'Matched the client + email thread in HubSpot',
  'Stripe: confirmed a duplicate $480 charge on May 14',
  'Refunded it — held for your approval (over $200)',
  'Drafted the apology & logged root cause: payment webhook fired twice',
]

function ChatDemo() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [typingDone, setTypingDone] = useState(false)
  // 1 opening line + 4 steps + 1 deliver card
  const shown = useSequence(typingDone, CHAT_STEPS.length + 2, 540, 0)

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setTypingDone(true), 900)
    return () => clearTimeout(t)
  }, [inView])

  return (
    <div className="mock" ref={ref}>
      <div className="mock-bar">
        <span className="tdot" />
        <span className="tdot" />
        <span className="tdot" />
        <span className="chan"># ops · NexFlow agent</span>
        <span className="illus">Illustrative</span>
      </div>
      <div className="msg">
        <div className="av user">AF</div>
        <div>
          <div>
            <span className="who">You</span>
            <span className="when">9:41 AM</span>
          </div>
          <div className="txt">
            A client just emailed furious — says we charged them twice for May. Sort it out.
          </div>
        </div>
      </div>
      <div className="msg bordered">
        <div className="av bot">N</div>
        <div className="msg-col">
          <div>
            <span className="who">NexFlow Agent</span>
            <span className="when">9:41 AM</span>
          </div>
          {inView && !typingDone && (
            <div className="typing">
              <span />
              <span />
              <span />
            </div>
          )}
          <div className={`txt anim-step ${shown > 0 ? 'show' : ''}`}>
            On it — pulling the email thread and reconciling Stripe against your CRM.
          </div>
          {CHAT_STEPS.map((s, i) => (
            <div key={s} className={`chat-step anim-step ${shown > i + 1 ? 'show' : ''}`}>
              <CheckPill />
              {s}
            </div>
          ))}
          <div className={`deliver anim-step ${shown > CHAT_STEPS.length + 1 ? 'show' : ''}`}>
            <span className="done-check">
              <Check size={12} strokeWidth={3} />
            </span>
            <div className="deliver-body">
              <div className="done-title">Resolved · $480 refund pending your approval</div>
              <div className="done-sub">Client retained · webhook bug flagged for your dev to fix</div>
            </div>
            <span className="deliver-link">View log</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ================= command center ================= */

const CC_TABS = [
  {
    key: 'overview',
    label: 'Overview',
    stats: [
      ['Agents Live', '8', '▲ +2 this month', 8],
      ['Tasks · 24h', '1,284', '▲ +12%'],
      ['Calls Answered', '412', '100% pickup', 412],
      ['Hours Saved', '14h', '▲ vs manual', 14, 'h'],
    ],
    panels: [
      { title: 'Automations · 24h', right: '1,284', spark: true },
      {
        title: 'Live activity',
        live: true,
        rows: [
          ['11:47', 'Voice agent', 'inbound · booked'],
          ['11:42', 'Custom agent', 'invoice nudge'],
          ['11:31', 'Triage agent', '14 routed'],
          ['11:28', 'No-show recovery', '3 rebooked'],
        ],
      },
    ],
  },
  {
    key: 'voice',
    label: 'Voice',
    stats: [
      ['Calls Answered', '412', '100% pickup'],
      ['Booked', '88', '▲ 21% of calls'],
      ['Missed → Recovered', '37', '▲ won back'],
      ['Avg Handle', '1:12', 'no hold time'],
    ],
    panels: [
      {
        title: 'Recent calls',
        right: 'Today',
        rows: [
          ['11:47', 'New patient', 'booked Tue 2:30 PM'],
          ['11:20', 'Reschedule', 'moved to Fri 10 AM'],
          ['10:58', 'Pricing question', 'answered · SMS sent'],
          ['10:31', 'After-hours call', 'captured · callback queued'],
        ],
      },
      {
        title: 'Outcomes · this week',
        live: true,
        rows: [
          ['Booked', '88 appointments', ''],
          ['Routed', '31 to your team', ''],
          ['FAQ', '204 answered instantly', ''],
          ['Spam', '62 screened out', ''],
        ],
      },
    ],
  },
  {
    key: 'agents',
    label: 'Custom Agents',
    stats: [
      ['Agents Live', '8', '▲ +2 this month'],
      ['Tasks · 24h', '1,284', '▲ +12%'],
      ['In Approval', '3', 'awaiting you'],
      ['Success', '99.2%', '▲ vs manual'],
    ],
    panels: [
      {
        title: 'Agents running',
        right: '8 live',
        rows: [
          ['Triage', '14 inbound routed', ''],
          ['Invoice', '9 nudges sent · 2 paid', ''],
          ['Reviews', '6 requests · 4 five-star', ''],
          ['Recovery', '3 no-shows rebooked', ''],
        ],
      },
      {
        title: 'Approval queue',
        right: '3 pending',
        rows: [
          ['11:42', 'Refund · $240', 'needs sign-off'],
          ['11:15', 'Discount offer', 'VIP customer'],
          ['10:49', 'Contract reply', 'draft ready'],
        ],
      },
    ],
  },
  {
    key: 'pipeline',
    label: 'Pipeline',
    stats: [
      ['New Leads', '24', '▲ today'],
      ['Contacted', '61', 'auto follow-up'],
      ['Booked', '18', '▲ 30% rate'],
      ['Won', '7', '$9,400 value'],
    ],
    panels: [
      {
        title: 'Recent leads',
        right: '24 today',
        rows: [
          ['2m', 'Maria T.', 'intake form · auto-replied'],
          ['24m', 'Derek C.', 'Google Ads · quote queued'],
          ['1h', 'Jordan L.', 'Instagram DM · qualified'],
          ['2h', 'Sarah P.', 'missed call · booked Fri 3 PM'],
        ],
      },
      {
        title: 'Stages',
        live: true,
        rows: [
          ['New', '24 leads', ''],
          ['Nurture', '61 in sequence', ''],
          ['Booked', '18 discovery calls', ''],
          ['Won', '7 · $9,400', ''],
        ],
      },
    ],
  },
  {
    key: 'capture',
    label: 'Capture',
    stats: [
      ['Captured · 24h', '46', '▲ nothing missed'],
      ['Auto-Replied', '46', 'under 60s'],
      ['Recovered', '$4,280', '▲ would-be lost'],
      ['Response', '<60s', 'every channel'],
    ],
    panels: [
      {
        title: 'Capture feed',
        live: true,
        rows: [
          ['11:51', 'Missed call', 'SMS sent · rebook link'],
          ['11:38', 'Web form', 'Maria T. · replied instantly'],
          ['11:22', 'Instagram DM', 'qualified · call offered'],
          ['11:04', 'After-hours', 'captured · queued for AM'],
        ],
      },
      {
        title: 'By channel · 24h',
        right: '46 total',
        rows: [
          ['Calls', '19 missed · all recovered', ''],
          ['Forms', '14 · instant reply', ''],
          ['DMs', '9 · qualified', ''],
          ['SMS', '4 · in conversation', ''],
        ],
      },
    ],
  },
]

function Sparkline({ inView }) {
  return (
    <svg viewBox="0 0 820 110" width="100%" height="96" preserveAspectRatio="none">
      <motion.path
        d="M0,92 C70,80 110,76 170,64 C240,52 290,58 350,42 C420,26 470,34 530,26 C590,18 640,22 700,14 C740,10 780,12 820,8"
        fill="none"
        stroke="#000"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.4, ease: EASE }}
      />
    </svg>
  )
}

function CommandCenter() {
  const [active, setActive] = useState('overview')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const tab = CC_TABS.find((t) => t.key === active)

  return (
    <section id="dashboard" className="cc-section">
      <Reveal className="eyebrow-row centered">
        <span className="dot" />
        <span>Your command center</span>
      </Reveal>
      <Reveal as="h2" delay={0.1} className="heading section-heading">
        Every agent. One screen.
        <br />
        <span className="ghosted">Owned by you.</span>
      </Reveal>

      <Reveal delay={0.2} className="cc-wrap">
        <div className="cc" ref={ref}>
          <div className="mock-bar">
            <span className="tdot" />
            <span className="tdot" />
            <span className="tdot" />
            <span className="chan">dashboard.nexflowaisolutions.com</span>
            <span className="illus">Sample data · illustrative</span>
          </div>
          <div className="cc-tabs" role="tablist">
            {CC_TABS.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={t.key === active}
                className={`cc-tab ${t.key === active ? 'active' : ''}`}
                onClick={() => setActive(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="cc-body">
            <div className="cc-stats">
              {tab.stats.map(([k, v, trend]) => (
                <div key={k} className="cc-stat">
                  <div className="k">{k}</div>
                  <div className="v">{v}</div>
                  <div className="t">{trend}</div>
                </div>
              ))}
            </div>
            <div className="cc-row">
              {tab.panels.map((p) => (
                <div key={p.title} className="cc-panel">
                  <div className="cc-ph">
                    <span>{p.title}</span>
                    {p.live ? <LiveBadge /> : <span className="cc-ph-right">{p.right}</span>}
                  </div>
                  {p.spark ? (
                    <Sparkline inView={inView} />
                  ) : (
                    p.rows.map(([ts, bold, rest]) => (
                      <div key={ts + bold} className="cc-feed-row">
                        <span className="ts">{ts}</span>
                        <span>
                          <b>{bold}</b>
                          {rest ? ` · ${rest}` : ''}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* ================= approvals / control ================= */

const MODES = [
  ['Approvals', 'You confirm each action', 'Nothing happens without your sign-off. Every drafted message, booking, and action waits in your queue for one tap.'],
  ['Semi-auto', 'Approve the big stuff', 'Routine work runs automatically; anything touching money or a VIP customer waits for your one-tap approval.'],
  ['Autonomous', 'Runs on its own', 'Proven workflows run fully on their own, end to end. You just watch the results land in your Command Center.'],
]

function Approvals() {
  const [mode, setMode] = useState(1)
  return (
    <section id="agents" className="offering">
      <Reveal className="offering-visual">
        <div className="mock">
          <div className="mock-bar">
            <span className="tdot" />
            <span className="tdot" />
            <span className="tdot" />
            <span className="chan">Command Center · Approvals</span>
            <LiveBadge />
          </div>
          <div className="approval-list">
            <div className="approval-card">
              <div className="av bot sq">V</div>
              <div className="approval-body">
                <div className="done-title">Voice agent · booked inbound call</div>
                <div className="done-sub">New patient · Tue 2:30 PM · auto-confirmed</div>
              </div>
              <span className="tag-auto">Auto</span>
            </div>
            <div className="approval-card highlight">
              <div className="av user sq">$</div>
              <div className="approval-body">
                <div className="done-title">Refund request · $240</div>
                <div className="done-sub">Needs your approval before sending</div>
              </div>
              <div className="approval-actions">
                <span className="mini-btn dark">Approve</span>
                <span className="mini-btn">Hold</span>
              </div>
            </div>
            <div className="approval-card">
              <div className="av bot sq">F</div>
              <div className="approval-body">
                <div className="done-title">Follow-up sequence · 24 leads</div>
                <div className="done-sub">Drafted · scheduled for 4:00 PM</div>
              </div>
              <span className="tag-auto">Semi-auto</span>
            </div>
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.15} className="offering-copy">
        <div className="kicker">
          <span className="kicker-num">03</span>
          <span>Real work, delivered</span>
        </div>
        <h3 className="heading offering-heading">Stay in control of every action.</h3>
        <p className="body-text">
          Your agents never go rogue. Choose how much rope each one gets — review everything, approve
          the big stuff, or let proven workflows run fully on their own.
        </p>
        <div className="mode-row">
          {MODES.map(([title, sub], i) => (
            <button
              key={title}
              type="button"
              className={`mode-btn ${mode === i ? 'active' : ''}`}
              onClick={() => setMode(i)}
            >
              <span className="mt">{title}</span>
              <span className="md">{sub}</span>
            </button>
          ))}
        </div>
        <p className="mode-copy">{MODES[mode][2]}</p>
      </Reveal>
    </section>
  )
}

/* ================= overnight ================= */

const OVERNIGHT = [
  ['01:48', 'Inbound call answered — caller asking about availability'],
  ['01:49', 'Qualified intent, checked the live calendar'],
  ['01:50', 'Booked Thursday 10:00 AM · sent SMS confirmation'],
  ['06:30', 'Logged to CRM · added to your morning brief'],
]

function Overnight() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const shown = useSequence(inView, OVERNIGHT.length + 1, 540)

  return (
    <section className="offering flip">
      <Reveal className="offering-copy">
        <div className="kicker">
          <span className="kicker-num">04</span>
          <span>Always on</span>
        </div>
        <h3 className="heading offering-heading">
          Your business closes.
          <br />
          Your agents don't.
        </h3>
        <p className="body-text">
          The calls that used to go to voicemail at 1 AM now get answered, qualified, and booked. You
          wake up to a full calendar — not a list of missed numbers.
        </p>
      </Reveal>
      <Reveal delay={0.15} className="offering-visual">
        <div className="mock padded" ref={ref}>
          <div className="overnight-head">
            <span>Overnight · while you slept</span>
            <span className="illus">Illustrative</span>
          </div>
          {OVERNIGHT.map(([time, text], i) => (
            <div key={time} className={`tl-row anim-step ${shown > i ? 'show' : ''}`}>
              <span className="tl-time">{time}</span>
              <span className="tl-text">{text}</span>
            </div>
          ))}
          <div className={`deliver anim-step ${shown > OVERNIGHT.length ? 'show' : ''}`}>
            <span className="done-check">
              <Check size={12} strokeWidth={3} />
            </span>
            <div className="deliver-body">
              <div className="done-title">1 booking recovered overnight</div>
              <div className="done-sub">Zero missed calls · 100% pickup</div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* ================= channels + outcomes ================= */

const CHANNELS = [
  [null, 'Phone calls'],
  ['/logos/teams.svg', 'Teams'],
  [cdn('whatsapp'), 'WhatsApp'],
  [cdn('telegram'), 'Telegram'],
  [cdn('gmail'), 'Email'],
  ['/logos/slack.svg', 'Slack'],
]

function Channels() {
  return (
    <section className="channels">
      <Reveal className="eyebrow-row centered">
        <span className="dot" />
        <span>Works where you work</span>
      </Reveal>
      <Reveal delay={0.1} className="chip-row">
        {CHANNELS.map(([src, name]) => (
          <span key={name} className="chip">
            {src ? <img src={src} alt="" /> : <Phone size={14} strokeWidth={2} />}
            {name}
          </span>
        ))}
      </Reveal>
    </section>
  )
}

function Outcomes() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const n = useCountUp(inView, 55)
  return (
    <section className="outcomes" ref={ref}>
      <Reveal className="eyebrow-row centered">
        <span className="dot" />
        <span>Your time back</span>
      </Reveal>
      <Reveal as="h2" delay={0.1} className="heading section-heading">
        Ship outcomes,
        <br />
        not busywork.
      </Reveal>
      <Reveal delay={0.2} className="stats-row">
        <div className="big-stat">
          <div className="big-num heading">Every</div>
          <div className="big-label">inbound call, answered</div>
        </div>
        <div className="big-stat">
          <div className="big-num heading">{n}+</div>
          <div className="big-label">tools it plugs into</div>
        </div>
        <div className="big-stat">
          <div className="big-num heading">24/7</div>
          <div className="big-label">always running</div>
        </div>
      </Reveal>
    </section>
  )
}

/* ================= why now ================= */

const WHY = [
  ['01', 'Founder-built', 'You work directly with the person designing and running your agents — not a ticket queue.'],
  ['02', 'You own the system', 'Branded dashboard, your data, your agents — every action logged. No lock-in, cancel anytime. Nothing held hostage.'],
  ['03', 'Free audit, no obligation', "See exactly what we'd build and what it costs before you pay a cent. Keep the plan even if we never work together."],
]

function WhyNow() {
  return (
    <section className="why-now">
      <Reveal className="eyebrow-row centered">
        <span className="dot" />
        <span>Why work with us now</span>
      </Reveal>
      <Reveal as="h2" delay={0.1} className="heading section-heading">
        New — and that's the advantage.
      </Reveal>
      <Reveal delay={0.15} className="body-text centered-text why-sub">
        We're taking on our first clients by hand. No support queue, no wall of borrowed logos — just
        the founder building your agents and standing behind the work.
      </Reveal>
      <div className="steps-grid">
        {WHY.map(([num, title, body], i) => (
          <Reveal key={num} delay={0.2 + i * 0.12} className="step-card">
            <span className="step-num">{num}</span>
            <h4>{title}</h4>
            <p>{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ================= FAQ ================= */

const FAQS = [
  ['What does NexFlow actually do?', 'We design, build, and operate AI agents inside your business — a voice receptionist that answers every call, and custom agents wired into your specific workflows. Everything reports into one branded Command Center you own.'],
  ["How long until it's live?", 'Most builds go live in days, not months. Your free audit comes back with an exact timeline for your operation.'],
  ['Do I have to replace my current tools?', 'No. NexFlow plugs in alongside your CRM, calendar, phone, and inbox — 55+ integrations out of the box. No migration, no retraining.'],
  ['How do I stay in control?', 'Every agent runs in the autonomy mode you set — full approvals, semi-auto, or autonomous. Every action is logged in your Command Center.'],
  ['What makes NexFlow different?', 'Most agencies bolt AI onto your business and hope. Every NexFlow agent ships security-first: least-privilege access to your tools, every action logged, your data stays yours. Custom-built around how your business actually runs, then operated for you.'],
  ['What does it cost?', 'Every build is scoped in your free audit, but typical engagements: missed-call rescue from $997 setup + $197/mo, a 24/7 AI voice receptionist from $2,500 setup + $397/mo, custom agent builds quoted fixed-price before we start. The audit comes back with an exact number — no surprises, cancel anytime.'],
]

function Faq() {
  return (
    <section id="faq" className="faq">
      <Reveal className="eyebrow-row centered">
        <span className="dot" />
        <span>FAQ</span>
      </Reveal>
      <Reveal as="h2" delay={0.1} className="heading section-heading">
        Questions, answered.
      </Reveal>
      <Reveal delay={0.2} className="faq-list">
        {FAQS.map(([q, a], i) => (
          <details key={q} open={i === 0}>
            <summary>
              {q}
              <span className="faq-plus">
                <Plus size={16} strokeWidth={2} />
              </span>
            </summary>
            <div className="faq-a">{a}</div>
          </details>
        ))}
      </Reveal>
    </section>
  )
}

/* ================= steps + CTA + footer ================= */

const STEPS = [
  ['01 — Free audit', 'Seven questions, three minutes. Tell us how your business runs today.'],
  ['02 — Your plan in 24 hours', "A written plan: which agents we'd build, what they replace, and an exact fixed price."],
  ['03 — Live in days', 'We build, you approve, it runs. Cancel anytime — the agents keep logs, you keep the data.'],
]

function Steps() {
  return (
    <section id="process" className="steps">
      <Reveal className="eyebrow-row centered">
        <span className="dot" />
        <span>What happens when you book</span>
      </Reveal>
      <Reveal as="h2" delay={0.1} className="heading section-heading">
        Three steps. No lock-in.
      </Reveal>
      <div className="steps-grid">
        {STEPS.map(([title, body], i) => (
          <Reveal key={title} delay={0.15 + i * 0.12} className="step-card">
            <span className="step-num">{title}</span>
            <p>{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="final-cta">
      <Reveal className="eyebrow-row centered">
        <span className="dot" />
        <span>NexFlow AI</span>
      </Reveal>
      <Reveal as="h2" delay={0.1} className="heading cta-heading">
        Put an agent
        <br />
        on your busywork.
      </Reveal>
      <Reveal delay={0.2} className="body-text centered-text">
        Free audit — in 24 hours you get a written plan: which agents we'd build, what they replace,
        and the ROI.
      </Reveal>
      <Reveal delay={0.3} className="cta-row centered-row">
        <a className="btn-primary" href={TYPEFORM} target="_blank" rel="noopener noreferrer">
          Book Your Free Audit
          <ArrowRight size={14} strokeWidth={2.2} />
        </a>
        <a className="btn-secondary" href="#demo">
          See How It Works
        </a>
      </Reveal>
      <Reveal delay={0.4} className="fine-print">
        No obligation · keep the audit even if we never work together
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <LogoIcon size={18} />
            <span>NexFlow AI</span>
          </div>
          <p className="footer-tag">
            Done-for-you AI operations. Built for operators — every agent security-first:
            least-privilege access to your tools, every action logged, your data stays yours.
          </p>
        </div>
        <div className="footer-col">
          <span className="footer-head">Site</span>
          <a href="#demo">How It Works</a>
          <a href="#dashboard">Command Center</a>
          <a href="#tools">Integrations</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="footer-col">
          <span className="footer-head">Legal</span>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
        </div>
        <div className="footer-col">
          <span className="footer-head">Get Started</span>
          <a href={TYPEFORM} target="_blank" rel="noopener noreferrer">
            Book a Free Audit
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 NexFlow AI. All rights reserved.</span>
        <span>No obligation · no lock-in · cancel anytime</span>
      </div>
    </footer>
  )
}

/* ================= page ================= */

export default function App() {
  return (
    <div className="page">
      <ProgressBar />
      <Navbar />
      <Hero />
      <Integrations />
      <OfferingIntro />
      <Offering
        id="voice"
        index="01"
        kicker="Voice receptionist"
        title={
          <>
            Answers every call.
            <br />
            Books the right ones.
          </>
        }
        body="Trained on your business, it picks up 24/7, qualifies the caller, books straight into your calendar, and transfers to a human when it matters — sounding human the whole way."
        bullets={[
          'Inbound & after-hours coverage',
          'Books to Google / Outlook / Cal.com',
          'Live transfer + instant SMS confirmation',
        ]}
        visual={<VoiceDemo />}
      />
      <Offering
        id="custom"
        index="02"
        kicker="Custom agents"
        flip
        title={
          <>
            Tell it what you need.
            <br />
            It ships the outcome.
          </>
        }
        body="No flowcharts, no rules engine to maintain. Describe the messy problem — a billing dispute, a scheduling pile-up, a stalled deal — the way you'd tell a teammate. It investigates across your tools, uses judgment, and reports back the finished result."
        bullets={[
          'Reasons across your CRM, payments & inbox',
          'Handles multi-step problems end to end',
          'Pauses for your approval on anything sensitive',
        ]}
        visual={<ChatDemo />}
      />
      <CommandCenter />
      <Approvals />
      <Overnight />
      <Channels />
      <Outcomes />
      <WhyNow />
      <Faq />
      <Steps />
      <FinalCta />
      <Footer />
    </div>
  )
}
