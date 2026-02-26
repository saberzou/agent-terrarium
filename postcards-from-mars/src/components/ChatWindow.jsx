import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { getBotResponse } from '../chatData'
import './ChatWindow.css'

export default function ChatWindow({ robot, onClose }) {
  const [messages, setMessages] = useState([
    { from: 'bot', text: `RELAY-1 link established. ${robot.name} online.` }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const messagesRef = useRef(null)
  const panelRef = useRef(null)
  const inputRef = useRef(null)

  // Slide up on mount
  useEffect(() => {
    gsap.fromTo(panelRef.current,
      { y: '100%' },
      { y: '0%', duration: 0.5, ease: 'power3.out' }
    )
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    const el = messagesRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing])

  const handleClose = () => {
    gsap.to(panelRef.current, {
      y: '100%', duration: 0.4, ease: 'power3.in',
      onComplete: onClose
    })
  }

  const send = () => {
    const text = input.trim()
    if (!text) return
    setInput('')
    setMessages(prev => [...prev, { from: 'user', text }])
    setTyping(true)

    // Simulate typing delay
    const delay = 800 + Math.random() * 1200
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, { from: 'bot', text: getBotResponse(robot.id, text) }])
    }, delay)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="chat-overlay" onClick={handleClose}>
      <div className="chat-panel" ref={panelRef} onClick={e => e.stopPropagation()}>
        <div className="chat-header">
          <div className="chat-header-info">
            <img src={robot.avatar} alt={robot.name} className="chat-header-avatar" />
            <div>
              <div className="chat-header-name">{robot.name}</div>
              <div className="chat-header-status">SIGNAL: {robot.signal}% · SOL {robot.logs?.[0]?.sol ?? '—'}</div>
            </div>
          </div>
          <button className="chat-close" onClick={handleClose}>✕</button>
        </div>

        <div className="chat-messages" ref={messagesRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`chat-msg chat-msg-${msg.from}`}>
              <div className="chat-bubble">{msg.text}</div>
            </div>
          ))}
          {typing && (
            <div className="chat-msg chat-msg-bot">
              <div className="chat-bubble chat-typing">
                <span /><span /><span />
              </div>
            </div>
          )}
        </div>

        <div className="chat-input-row">
          <input
            ref={inputRef}
            className="chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={`Message ${robot.name}...`}
            autoFocus
          />
          <button className="chat-send" onClick={send} disabled={!input.trim()}>→</button>
        </div>
      </div>
    </div>
  )
}
