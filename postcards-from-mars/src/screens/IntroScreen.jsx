import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './IntroScreen.css'

function Typewriter({ text, delay = 0, speed = 40, className = '', onDone }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        onDoneRef.current?.()
      }
    }, speed)
    return () => clearInterval(interval)
  }, [started, text, speed])

  if (!started) return <span className={className}>&nbsp;</span>

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && <span className="cursor">▌</span>}
    </span>
  )
}

export default function IntroScreen({ onEnter, skipAnimation, onAnimationDone }) {
  const containerRef = useRef(null)
  const onAnimationDoneRef = useRef(onAnimationDone)
  onAnimationDoneRef.current = onAnimationDone

  // If skipping, jump straight to final state
  const [phase, setPhase] = useState(skipAnimation ? 6 : 0)
  // 0: silence, 1: signal pulse, 2: signal text, 3: title, 4: subtitle, 5: CTA, 6: static (no animation)

  useEffect(() => {
    if (skipAnimation) return
    const t1 = setTimeout(() => setPhase(1), 600)
    return () => clearTimeout(t1)
  }, [skipAnimation])

  useEffect(() => {
    if (phase === 1) {
      const el = containerRef.current?.querySelector('.signal-pulse')
      if (el) {
        gsap.fromTo(el,
          { scale: 0, opacity: 1 },
          {
            scale: 3, opacity: 0, duration: 1, ease: 'power2.out',
            onComplete: () => setPhase(2)
          }
        )
      }
    }
    if (phase === 5) {
      onAnimationDoneRef.current?.()
    }
  }, [phase])

  // Static (skip) mode — show everything immediately
  if (phase === 6) {
    return (
      <div className="intro-screen" ref={containerRef}>
        <div className="intro-content">
          <p className="intro-signal-text">[SIGNAL ACQUIRED]</p>
          <h1 className="intro-logo">MISSION LOGS FROM MARS</h1>
          <div className="intro-subtitle">
            <p>Five AI robots. One red planet.</p>
            <p>They were sent to witness. They learned to wonder.</p>
          </div>
          <button className="intro-cta" style={{ animation: 'none' }} onClick={onEnter}>
            Explore Mars →
          </button>
        </div>
        <div className="intro-signal visible">
          <span>SIGNAL: ████░░ 67%</span><br/>
          <span>Relay-1 → Earth</span><br/>
          <span>Delay: 12m 34s</span>
        </div>
      </div>
    )
  }

  return (
    <div className="intro-screen" ref={containerRef}>
      {phase >= 1 && phase < 3 && (
        <div className="signal-pulse-container">
          <div className="signal-pulse" />
        </div>
      )}

      <div className="intro-content">
        {phase >= 2 && (
          <p className="intro-signal-text">
            <Typewriter
              text="[SIGNAL ACQUIRED]"
              delay={0}
              speed={35}
              onDone={() => setPhase(3)}
            />
          </p>
        )}

        {phase >= 3 && (
          <h1 className="intro-logo">
            <Typewriter
              text="MISSION LOGS FROM MARS"
              delay={400}
              speed={45}
              onDone={() => setPhase(4)}
            />
          </h1>
        )}

        {phase >= 4 && (
          <div className="intro-subtitle">
            <p>
              <Typewriter
                text="Five AI robots. One red planet."
                delay={300}
                speed={30}
              />
            </p>
            <p>
              <Typewriter
                text="They were sent to witness. They learned to wonder."
                delay={1400}
                speed={30}
                onDone={() => setPhase(5)}
              />
            </p>
          </div>
        )}

        {phase >= 5 && (
          <button className="intro-cta" onClick={onEnter}>
            Explore Mars →
          </button>
        )}
      </div>

      <div className={`intro-signal ${phase >= 2 ? 'visible' : ''}`}>
        <span>SIGNAL: ████░░ 67%</span><br/>
        <span>Relay-1 → Earth</span><br/>
        <span>Delay: 12m 34s</span>
      </div>
    </div>
  )
}
