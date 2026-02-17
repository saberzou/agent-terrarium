import { useState, useRef, useCallback, useMemo } from 'react'
import gsap from 'gsap'
import IntroScreen from './screens/IntroScreen'
import CrewScreen from './screens/CrewScreen'
import PostcardScreen from './screens/PostcardScreen'
import DustParticles from './components/DustParticles'
import StaggeredMenu from './components/StaggeredMenu'
import Dither from './components/Dither'
import { robots } from './data'
import './App.css'

const menuItems = [
  { label: 'Intro', ariaLabel: 'Go to intro', screen: 'intro' },
  { label: 'The Crew', ariaLabel: 'Go to crew', screen: 'crew' },
  { label: 'Postcards', ariaLabel: 'Go to postcards', screen: 'postcard' },
]

// Different dither colors per screen
const ditherColors = {
  intro:    [0.76, 0.27, 0.05],  // Mars rust
  crew:     [0.22, 0.45, 0.65],  // Deep blue
  postcard: [0.55, 0.35, 0.15],  // Warm brown
}

export default function App() {
  const [screen, setScreen] = useState('intro')
  const [selectedRobot, setSelectedRobot] = useState(0)
  const containerRef = useRef(null)

  const transition = useCallback((to, robotIndex) => {
    const el = containerRef.current
    gsap.to(el, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        if (robotIndex !== undefined) setSelectedRobot(robotIndex)
        setScreen(to)
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.inOut' })
      }
    })
  }, [])

  const handleMenuNav = useCallback((item) => {
    if (item.screen !== screen) transition(item.screen)
  }, [screen, transition])

  const waveColor = ditherColors[screen] || ditherColors.intro

  return (
    <>
      <div className="dither-bg">
        <Dither
          waveColor={waveColor}
          waveSpeed={0.03}
          waveFrequency={3}
          waveAmplitude={0.3}
          colorNum={4}
          pixelSize={3}
          enableMouseInteraction={true}
          mouseRadius={0.8}
        />
      </div>
      <StaggeredMenu
        position="left"
        colors={['#C1440E', '#E8763A']}
        items={menuItems}
        accentColor="#E8763A"
        menuButtonColor="#F5EDE3"
        openMenuButtonColor="#F5EDE3"
        onItemClick={handleMenuNav}
      />
      <div className="app" ref={containerRef}>
        <DustParticles />
        {screen === 'intro' && (
          <IntroScreen onEnter={() => transition('crew')} />
        )}
        {screen === 'crew' && (
          <CrewScreen
            robots={robots}
            onConnect={(i) => transition('postcard', i)}
          />
        )}
        {screen === 'postcard' && (
          <PostcardScreen
            robots={robots}
            initialIndex={selectedRobot}
            onBack={() => transition('crew')}
          />
        )}
      </div>
    </>
  )
}
