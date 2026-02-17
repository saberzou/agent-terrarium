import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import './PostcardScreen.css'

function createFrontTexture(robot) {
  const c = document.createElement('canvas')
  c.width = 800; c.height = 1100
  const ctx = c.getContext('2d')

  const g = ctx.createLinearGradient(0, 0, 800, 1100)
  g.addColorStop(0, '#2A1A12'); g.addColorStop(0.5, '#3D2218'); g.addColorStop(1, '#1A1210')
  ctx.fillStyle = g; ctx.fillRect(0, 0, 800, 1100)

  // Grid lines
  ctx.strokeStyle = robot.frontColor + '40'; ctx.lineWidth = 1
  for (let i = 0; i < 20; i++) {
    ctx.beginPath(); ctx.moveTo(60, 80 + i * 50); ctx.lineTo(740, 80 + i * 50); ctx.stroke()
  }

  // Topographic circles
  ctx.strokeStyle = robot.frontColor + '30'; ctx.lineWidth = 0.8
  for (let r = 50; r < 350; r += 30) {
    ctx.beginPath(); ctx.ellipse(500, 500, r, r * 0.7, -0.2, 0, Math.PI * 2); ctx.stroke()
  }

  // Scan lines
  ctx.strokeStyle = robot.frontColor + '20'
  for (let i = 0; i < 800; i += 3) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 1100); ctx.stroke()
  }

  // Title
  ctx.fillStyle = robot.frontColor
  ctx.font = 'bold 48px "Geist", sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText(robot.frontTitle, 60, 900)

  ctx.fillStyle = '#D4A574'
  ctx.font = '18px "Geist Pixel", monospace'
  ctx.fillText(robot.frontSubtitle, 60, 940)

  // Border + corners
  ctx.strokeStyle = robot.frontColor + '60'; ctx.lineWidth = 2
  ctx.strokeRect(30, 30, 740, 1040)
  ctx.fillStyle = robot.frontColor
  ;[[30,30],[740,30],[30,1040],[740,1040]].forEach(([x,y]) => ctx.fillRect(x-4,y-4,8,8))

  return new THREE.CanvasTexture(c)
}

function createBackTexture(robot) {
  const c = document.createElement('canvas')
  c.width = 800; c.height = 1100
  const ctx = c.getContext('2d')

  ctx.fillStyle = '#1A1210'; ctx.fillRect(0, 0, 800, 1100)

  // Grid
  ctx.strokeStyle = '#2A1A1240'; ctx.lineWidth = 0.5
  for (let i = 0; i < 800; i += 20) { ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,1100); ctx.stroke() }
  for (let i = 0; i < 1100; i += 20) { ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(800,i); ctx.stroke() }

  // Header
  ctx.fillStyle = '#E8763A'
  ctx.font = 'bold 28px "Geist", sans-serif'; ctx.textAlign = 'left'
  ctx.fillText(robot.name, 60, 80)

  ctx.strokeStyle = '#E8763A40'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(60,100); ctx.lineTo(740,100); ctx.stroke()

  // Data
  ctx.fillStyle = '#8B8B8B'; ctx.font = '14px "Geist Pixel", monospace'
  const sigBlocks = Math.floor(robot.signal / 10)
  ctx.fillText(`SOL ${robot.sol}`, 60, 135)
  ctx.fillText(`COORDS: ${robot.coords}`, 60, 160)
  ctx.fillText(`SIGNAL: ${'█'.repeat(sigBlocks)}${'░'.repeat(10-sigBlocks)} ${robot.signal}%`, 60, 185)
  ctx.fillText(`RELAY: RELAY-1 → EARTH`, 60, 210)

  ctx.strokeStyle = '#D4A57430'
  ctx.beginPath(); ctx.moveTo(60,240); ctx.lineTo(740,240); ctx.stroke()

  // Message
  ctx.fillStyle = '#F5EDE3'; ctx.font = '22px "Geist", sans-serif'
  const lines = robot.message.split('\n')
  lines.forEach((line, i) => ctx.fillText(line, 60, 300 + i * 36))

  const msgBottom = 300 + lines.length * 36 + 30
  ctx.strokeStyle = '#D4A57430'
  ctx.beginPath(); ctx.moveTo(60,msgBottom); ctx.lineTo(740,msgBottom); ctx.stroke()
  ctx.fillStyle = '#D4A574'; ctx.font = '14px "Geist Pixel", monospace'
  ctx.fillText(`— ${robot.name}`, 60, msgBottom + 30)

  // Binary data decoration
  ctx.fillStyle = '#8B8B8B30'; ctx.font = '10px "Geist Pixel", monospace'
  for (let row = 0; row < 4; row++) {
    let d = ''
    for (let col = 0; col < 8; col++) d += Math.floor(Math.random()*256).toString(2).padStart(8,'0') + '  '
    ctx.fillText(d, 60, 980 + row * 18)
  }

  ctx.strokeStyle = '#D4A57430'; ctx.lineWidth = 2; ctx.strokeRect(30,30,740,1040)

  return new THREE.CanvasTexture(c)
}

function Postcard({ robot, flipped, onFlip }) {
  const groupRef = useRef()
  const mousePos = useRef({ x: 0, y: 0 })
  const flipAngle = useRef(0)
  const { size } = useThree()

  const [frontTex, backTex] = useMemo(() => {
    const ft = createFrontTexture(robot)
    const bt = createBackTexture(robot)
    ft.colorSpace = THREE.SRGBColorSpace
    bt.colorSpace = THREE.SRGBColorSpace
    return [ft, bt]
  }, [robot])

  useEffect(() => {
    const handler = (e) => {
      mousePos.current.x = (e.clientX / size.width) * 2 - 1
      mousePos.current.y = (e.clientY / size.height) * 2 - 1
    }
    window.addEventListener('pointermove', handler)
    return () => window.removeEventListener('pointermove', handler)
  }, [size])

  useFrame(() => {
    if (!groupRef.current) return
    const tilt = 0.15
    const targetFlip = flipped ? Math.PI : 0
    flipAngle.current += (targetFlip - flipAngle.current) * 0.08

    groupRef.current.rotation.x += (-mousePos.current.y * tilt - groupRef.current.rotation.x) * 0.08
    groupRef.current.rotation.y = mousePos.current.x * tilt + flipAngle.current + (mousePos.current.x * tilt - (groupRef.current.rotation.y - flipAngle.current)) * 0.08
    groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.03
  })

  const W = 1.6, H = 2.2

  return (
    <group ref={groupRef} onClick={onFlip}>
      {/* Edge */}
      <mesh>
        <boxGeometry args={[W, H, 0.01]} />
        <meshPhysicalMaterial color="#D4A574" metalness={0.6} roughness={0.3} clearcoat={1} />
      </mesh>
      {/* Front */}
      <mesh position={[0, 0, 0.006]}>
        <planeGeometry args={[W, H]} />
        <meshPhysicalMaterial map={frontTex} metalness={0.4} roughness={0.25} clearcoat={1} clearcoatRoughness={0.1} />
      </mesh>
      {/* Back */}
      <mesh position={[0, 0, -0.006]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[W, H]} />
        <meshPhysicalMaterial map={backTex} metalness={0.3} roughness={0.3} clearcoat={0.8} clearcoatRoughness={0.15} />
      </mesh>
    </group>
  )
}

export default function PostcardScreen({ robots, initialIndex, onBack }) {
  const [index, setIndex] = useState(initialIndex)
  const [flipped, setFlipped] = useState(false)
  const robot = robots[index]

  const prev = () => { setFlipped(false); setIndex((index - 1 + robots.length) % robots.length) }
  const next = () => { setFlipped(false); setIndex((index + 1) % robots.length) }

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === ' ') { e.preventDefault(); setFlipped(f => !f) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [index])

  return (
    <div className="postcard-screen">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 40 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <ambientLight intensity={0.3} color="#D4A574" />
        <directionalLight position={[3, 4, 5]} intensity={1.5} color="#FFF0E0" />
        <directionalLight position={[-3, -1, 3]} intensity={0.4} color="#E8763A" />
        <directionalLight position={[0, -2, -3]} intensity={0.6} color="#C1440E" />
        <Postcard robot={robot} flipped={flipped} onFlip={() => setFlipped(f => !f)} />
      </Canvas>

      <div className="postcard-overlay">
        <div className="postcard-header">
          <button className="postcard-back-btn" onClick={onBack}>← CREW</button>
          <div className="postcard-signal">
            SIGNAL: {'█'.repeat(Math.floor(robot.signal/10))}{'░'.repeat(10-Math.floor(robot.signal/10))} {robot.signal}%<br/>
            RELAY-1 → EARTH<br/>
            SOL {robot.sol} · {robot.coords}
          </div>
        </div>
        <div className="postcard-footer">
          <div>
            <div className="postcard-robot-id">{robot.name}</div>
            <div className="postcard-hint">{flipped ? 'click to flip back' : 'click to flip · drag to tilt'}</div>
          </div>
          <div className="postcard-nav">
            <button onClick={prev}>← PREV</button>
            <button onClick={next}>NEXT →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
