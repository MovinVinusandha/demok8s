import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [now, setNow] = useState(() => new Date())
  const username = import.meta.env.VITE_USERNAME ?? ''
  const password = import.meta.env.VITE_PASSWORD ?? ''

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(timer)
  }, [])

  const getGreeting = (date) => {
    const h = date.getHours()
    if (h >= 5 && h < 12) return 'Good morning'
    if (h >= 12 && h < 17) return 'Good afternoon'
    if (h >= 17 && h < 21) return 'Good evening'
    return 'Good night'
  }

  const greeting = getGreeting(now)
  const fullDateTime = now.toLocaleString([], {
    dateStyle: 'full',
    timeStyle: 'medium',
  })
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <p className="eyebrow">DevOps Demo</p>
          <h1 aria-live="polite">{greeting}, Movin</h1>

          <p>
            A fresh Vite + React landing space for testing, shipping, and
            showing off your next big idea.
          </p>
          <br />
          <p><code>v3.1.0</code></p>
          <br/>
          <p>{now.toLocaleString()}</p>
        </div>
      </section>

      <p><code>username={username}</code></p>
      <p><code>password={password}</code></p>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App