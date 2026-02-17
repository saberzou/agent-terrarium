import { useMemo } from 'react'
import CircularGallery from '../components/CircularGallery'
import './CrewScreen.css'

export default function CrewScreen({ robots, onConnect }) {
  const galleryItems = useMemo(() =>
    robots.map((robot, i) => ({
      image: robot.avatar,
      text: robot.name,
      index: i,
    })), [robots]
  )

  return (
    <div className="crew-screen">
      <div className="crew-header">
        <h2 className="crew-title">THE CREW</h2>
        <p className="crew-subtitle">5 robots. 225 million kilometers from home. Drag to explore.</p>
      </div>
      <div className="crew-gallery-wrap">
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
      <div className="crew-hint">Click a robot to receive their postcards</div>
    </div>
  )
}
