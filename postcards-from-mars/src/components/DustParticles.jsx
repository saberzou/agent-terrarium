import { useEffect, useRef } from 'react'

export default function DustParticles() {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    const spawn = () => {
      const el = document.createElement('div')
      el.style.cssText = `
        position:absolute;
        width:${1 + Math.random() * 2}px;
        height:${1 + Math.random() * 2}px;
        background:#D4A574;
        border-radius:50%;
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        opacity:0;
        pointer-events:none;
        animation:dust-drift ${4 + Math.random() * 8}s linear forwards;
        --dx:${(Math.random() - 0.5) * 200}px;
        --dy:${(Math.random() - 0.5) * 200}px;
      `
      container.appendChild(el)
      el.addEventListener('animationend', () => el.remove())
    }
    for (let i = 0; i < 15; i++) setTimeout(spawn, i * 200)
    const interval = setInterval(spawn, 300)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <style>{`
        @keyframes dust-drift {
          0% { transform:translate(0,0); opacity:0; }
          10% { opacity:0.3; }
          90% { opacity:0.15; }
          100% { transform:translate(var(--dx),var(--dy)); opacity:0; }
        }
      `}</style>
      <div ref={ref} style={{ position:'fixed', inset:0, zIndex:1, pointerEvents:'none' }} />
    </>
  )
}
