import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Dither from '../components/Dither'
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
      <Dither
        waveColor={[0.76, 0.27, 0.05]}
        waveSpeed={0.03}
        waveFrequency={3}
        waveAmplitude={0.3}
        colorNum={4}
        pixelSize={3}
        enableMouseInteraction={true}
        mouseRadius={0.8}
      />
      <div className="intro-content">
        <h1 className="intro-logo reveal">
          POSTCARDS<br/>FROM MARS
        </h1>
        <p className="intro-story reveal">
          Humanity sent 5 AI robots to Mars ahead of the first human settlers.
        </p>
        <p className="intro-story reveal">
          They explore. They document. They send postcards home.
        </p>
        <button className="intro-cta" onClick={onEnter}>
          RECEIVE TRANSMISSIONS →
        </button>
      </div>
      <div className="intro-signal reveal">
        <span>SIGNAL: ████░░ 67%</span><br/>
        <span>RELAY-1 → EARTH</span><br/>
        <span>DELAY: 12m 34s</span>
      </div>
    </div>
  )
}
