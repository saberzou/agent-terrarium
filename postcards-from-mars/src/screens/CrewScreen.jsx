import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import CircularGallery from '../components/CircularGallery'
import './CrewScreen.css'

export default function CrewScreen({ robots, onConnect }) {
  const cardsRef = useRef(null)

  useEffect(() => {
    const cards = cardsRef.current.querySelectorAll('.crew-card')
    gsap.fromTo(cards,
      { opacity: 0, y: 60, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  const galleryItems = robots.map((robot) => ({
    image: robot.avatar,
    text: robot.name,
  }))

  return (
    <div className="crew-screen">
      <div className="crew-header">
        <h2 className="crew-title">THE CREW</h2>
        <p className="crew-subtitle">5 robots. 225 million kilometers from home.</p>
      </div>
      <div className="crew-gallery-bg">
        <CircularGallery
          items={galleryItems}
          bend={3}
          textColor="#F5EDE3"
          borderRadius={0.05}
          font="bold 24px Geist, sans-serif"
          scrollSpeed={2}
          scrollEase={0.05}
        />
      </div>
      <div className="crew-grid" ref={cardsRef}>
        {robots.map((robot, i) => (
          <div className="crew-card" key={robot.id}>
            <div className="crew-avatar-wrap">
              <img src={robot.avatar} alt={robot.name} className="crew-avatar" />
            </div>
            <h3 className="crew-name">{robot.name}</h3>
            <p className="crew-role">{robot.role}</p>
            <p className="crew-personality">{robot.personality}</p>
            <button className="crew-connect" onClick={() => onConnect(i)}>
              CONNECT →
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
