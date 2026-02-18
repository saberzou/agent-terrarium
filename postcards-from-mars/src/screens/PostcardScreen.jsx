import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import GeoPattern from '../components/GeoPattern'
import './PostcardScreen.css'

export default function PostcardScreen({ robots, initialIndex, onBack }) {
  const gridRef = useRef(null)

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.pc-card')
    if (cards?.length) {
      gsap.fromTo(cards,
        { opacity: 0, y: 60, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      )
    }
  }, [])

  const robot = robots[initialIndex] || robots[0]
  const sigBlocks = Math.floor(robot.signal / 10)

  return (
    <div className="postcard-screen">
      <div className="pc-header">
        <div>
          <h2 className="pc-title">Mission logs</h2>
          <p className="pc-subtitle">Field notes from 225 million km away</p>
        </div>
        <div className="pc-signal">
          Signal: {'█'.repeat(sigBlocks)}{'░'.repeat(10 - sigBlocks)} {robot.signal}%<br />
          Sol {robot.sol} · {robot.coords}
        </div>
      </div>

      <div className="pc-grid" ref={gridRef}>
        {robots.map((r, i) => (
          <div className="pc-card" key={r.id}>
            <div className="pc-pattern">
              <GeoPattern color={r.frontColor} seed={i * 137 + 42} />
            </div>
            <div className="pc-content">
              <div className="pc-id-row">
                <img src={r.avatar} alt={r.name} className="pc-avatar" />
                <div>
                  <div className="pc-name">{r.name}</div>
                  <div className="pc-sol">Sol {r.sol}</div>
                </div>
              </div>
              <h3 className="pc-card-title">{r.frontTitle}</h3>
              <p className="pc-card-sub">{r.frontSubtitle}</p>
              <div className="pc-divider" />
              <p className="pc-message">{r.message}</p>
              <div className="pc-sign">— {r.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
