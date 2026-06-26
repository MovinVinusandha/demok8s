import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [now, setNow] = useState(() => new Date())
  const username = import.meta.env.VITE_USERNAME ?? ''
  const password = import.meta.env.VITE_PASSWORD ?? ''

  // New states for inputting and showing saved text
  const [inputText, setInputText] = useState('')
  const [savedText, setSavedText] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  // Fetch the saved file content when the component mounts
  useEffect(() => {
    fetch('/api/get-text')
      .then((res) => res.json())
      .then((data) => {
        if (data.text) {
          setSavedText(data.text)
        }
      })
      .catch((err) => console.error('Error fetching text:', err))
  }, [])

  const handleSave = async () => {
    setStatusMessage('Saving...')
    try {
      const response = await fetch('/api/save-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      })
      const data = await response.json()
      if (data.success) {
        setSavedText(inputText)
        setInputText('')
        setStatusMessage('Text saved successfully!')
      } else {
        setStatusMessage('Failed to save text.')
      }
    } catch (error) {
      console.error('Error:', error)
      setStatusMessage('Error connecting to backend.')
    }
  }

  const getGreeting = (date) => {
    const h = date.getHours()
    if (h >= 5 && h < 12) return 'Good morning'
    if (h >= 12 && h < 17) return 'Good afternoon'
    if (h >= 17 && h < 21) return 'Good evening'
    return 'Good night'
  }

  const greeting = getGreeting(now)

  return (
    <>
      <section id="center">
        <div>
          <p className="eyebrow">DevOps <code>k8s</code> Demo</p>
          <h1 aria-live="polite">{greeting}, Movin</h1>

          <br />
          <p><code>v4.0.0</code></p>
          <br/>
        </div>
      </section>

      {/* NEW TEXT BOX AND DISPLAY FUNCTIONALITY */}
      <section style={{ margin: '30px auto', maxWidth: '500px', padding: '0 20px', textAlign: 'left' }}>
        <h2>Manage Notes File</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <textarea 
            rows="4" 
            placeholder="Type your text here to save into a .txt file..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--code-bg)', color: 'var(--text-h)' }}
          />
          <button 
            onClick={handleSave}
            style={{ alignSelf: 'flex-start', padding: '8px 16px', borderRadius: '4px', background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer' }}
          >
            Save to file
          </button>
          {statusMessage && <p style={{ fontSize: '14px', fontStyle: 'italic' }}>{statusMessage}</p>}
        </div>

        <div style={{ marginTop: '24px', padding: '16px', background: 'var(--accent-bg)', borderRadius: '6px', border: '1px solid var(--accent-border)' }}>
          <h3>Current Content inside .txt file:</h3>
          <p style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--mono)', marginTop: '8px' }}>
            {savedText || <em>[The file is currently empty or doesn't exist]</em>}
          </p>
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