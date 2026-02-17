import { useState, useRef, useCallback } from 'react'
import gsap from 'gsap'
import IntroScreen from './screens/IntroScreen'
import CrewScreen from './screens/CrewScreen'
import PostcardScreen from './screens/PostcardScreen'
import DustParticles from './components/DustParticles'
import StaggeredMenu from './components/StaggeredMenu'
import { robots } from './data'
import './App.css'

const menuItems = [
  { label: 'Intro', ariaLabel: 'Go to intro', screen: 'intro' },
  { label: 'The Crew', ariaLabel: 'Go to crew', screen: 'crew' },
  { label: 'Postcards', ariaLabel: 'Go to postcards', screen: 'postcard' },
]

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

  return (
    <>
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
