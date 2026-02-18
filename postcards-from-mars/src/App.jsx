import { useState, useRef, useCallback } from 'react'
import gsap from 'gsap'
import IntroScreen from './screens/IntroScreen'
import CrewScreen from './screens/CrewScreen'
import PostcardScreen from './screens/PostcardScreen'
import ExploreScreen from './screens/ExploreScreen'
import ChatWindow from './components/ChatWindow'
import DustParticles from './components/DustParticles'
import StaggeredMenu from './components/StaggeredMenu'
import Dither from './components/Dither'
import { robots } from './data'
import './App.css'

const menuItems = [
  { label: 'Intro', ariaLabel: 'Go to intro', screen: 'intro' },
  { label: 'Explore Mars', ariaLabel: 'Explore Mars imagery', screen: 'explore' },
  { label: 'The crew', ariaLabel: 'Go to crew', screen: 'crew' },
  { label: 'Logs', ariaLabel: 'Go to logs', screen: 'postcard' },
]

const ditherColors = {
  intro:    [0.98, 0.23, 0.00],
  explore:  [0.75, 0.30, 0.10],
  crew:     [0.91, 0.46, 0.23],
  postcard: [0.55, 0.35, 0.15],
}

const VALID_SCREENS = ['intro', 'explore', 'crew', 'postcard']

function getScreenFromHash() {
  const hash = window.location.hash.replace('#', '')
  return VALID_SCREENS.includes(hash) ? hash : 'intro'
}

export default function App() {
  const [screen, setScreen] = useState(getScreenFromHash)
  const [selectedRobot, setSelectedRobot] = useState(0)
  const [chatRobot, setChatRobot] = useState(null)
  const containerRef = useRef(null)
  const ditherRef = useRef(null)

  const navigate = useCallback((to) => {
    setScreen(to)
    window.location.hash = to
  }, [])

  const transition = useCallback((to, robotIndex) => {
    const el = containerRef.current
    const bg = ditherRef.current
    const tl = gsap.timeline()
    tl.to([el, bg], {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        if (robotIndex !== undefined) setSelectedRobot(robotIndex)
        navigate(to)
      }
    })
    tl.to([el, bg], {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    })
  }, [])

  const handleMenuNav = useCallback((item) => {
    if (item.screen !== screen) transition(item.screen)
  }, [screen, transition])

  const openChat = useCallback((robotIndex) => {
    setChatRobot(robots[robotIndex])
  }, [])

  const openRandomChat = useCallback(() => {
    const i = Math.floor(Math.random() * robots.length)
    setChatRobot(robots[i])
  }, [])

  const waveColor = ditherColors[screen] || ditherColors.intro

  return (
    <>
      <div className="dither-bg" ref={ditherRef}>
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
        displayItemNumbering={false}
        accentColor="#E8763A"
        menuButtonColor="#F5EDE3"
        openMenuButtonColor="#F5EDE3"
        onItemClick={handleMenuNav}
      />
      <div className="app" ref={containerRef}>
        <DustParticles />
        {screen === 'intro' && (
          <IntroScreen onEnter={() => transition('explore')} />
        )}
        {screen === 'explore' && (
          <ExploreScreen />
        )}
        {screen === 'crew' && (
          <CrewScreen
            robots={robots}
            onConnect={(i) => openChat(i)}
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

      {chatRobot && (
        <ChatWindow robot={chatRobot} onClose={() => setChatRobot(null)} />
      )}
    </>
  )
}
