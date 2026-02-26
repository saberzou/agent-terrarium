import { useRef, useEffect, useMemo } from 'react'
import gsap from 'gsap'
import PixelGrid from '../components/PixelGrid'
import './PostcardScreen.css'

export default function PostcardScreen({ robots, initialIndex, onBack }) {
  const gridRef = useRef(null)

  /* flatten, then sort by sol descending so latest logs come first */
  const cards = useMemo(() =>
    robots.flatMap(r =>
      r.logs.map((log, li) => ({ ...r, ...log, logIndex: li }))
    ).sort((a, b) => b.sol - a.sol), [robots])

  useEffect(() => {
    const els = gridRef.current?.querySelectorAll('.pc-card')
    if (els?.length) {
      gsap.fromTo(els,
        { opacity: 0, y: 60, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      )
    }
  }, [])

  const first = cards[0] || {}
  const sigBlocks = Math.floor((first.signal || 0) / 10)

  return (
    <div className="postcard-screen">
      <div className="pc-header">
        <div>
          <h2 className="pc-title">Mission logs</h2>
          <p className="pc-subtitle">Field notes from 225 million km away</p>
        </div>
        <div className="pc-signal">
          Signal: {'█'.repeat(sigBlocks)}{'░'.repeat(10 - sigBlocks)} {first.signal}%<br />
          {cards.length} entries · {robots.length} crew
        </div>
      </div>

      <div className="pc-grid" ref={gridRef}>
        {cards.map((c, i) => (
          <div className="pc-card" key={`${c.id}-${c.sol}`}>
            <div className="pc-pattern">
              <PixelGrid color={c.frontColor} seed={[...c.id].reduce((h, ch) => h * 31 + ch.charCodeAt(0), 0) + c.sol * 7919} />
            </div>
            <div className="pc-content">
              <h3 className="pc-card-title">{c.title}</h3>
              <p className="pc-card-sub">{c.subtitle}</p>
              <div className="pc-divider" />
              <p className="pc-message">{c.message}</p>
              <div className="pc-id-row pc-id-bottom">
                <img src={c.avatar} alt={c.name} className="pc-avatar" />
                <div>
                  <div className="pc-name">{c.name}</div>
                  <div className="pc-sol">Sol {c.sol}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
