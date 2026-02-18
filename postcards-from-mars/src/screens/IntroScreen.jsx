import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './IntroScreen.css'

export default function IntroScreen({ onEnter }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const els = containerRef.current.querySelectorAll('.reveal')
    gsap.fromTo(els, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.3, ease: 'power3.out', delay: 0.3 }
    )
    gsap.fromTo('.intro-cta',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 1.5 }
    )
  }, [])

  return (
    <div className="intro-screen" ref={containerRef}>
      <div className="intro-content">
        <h1 className="intro-logo reveal">
          Mission logs<br/>from Mars
        </h1>
        <p className="intro-story reveal">
          Humanity sent 5 AI robots to Mars ahead of the first human settlers.
        </p>
        <p className="intro-story reveal">
          They explore. They document. They keep mission logs.
        </p>
        <button className="intro-cta" onClick={onEnter}>
          Explore Mars →
        </button>
      </div>
      <div className="intro-signal reveal">
        <span>SIGNAL: ████░░ 67%</span><br/>
        <span>Relay-1 → Earth</span><br/>
        <span>Delay: 12m 34s</span>
      </div>
    </div>
  )
}
