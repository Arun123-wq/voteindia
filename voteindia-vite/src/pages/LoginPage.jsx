import React, { useState } from 'react'
import { loginUser } from '../api.js'

export default function LoginPage({ nav, setUser }) {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handle = async () => {
    if (!id.trim() || !pw.trim()) {
      setError('Please enter your Voter ID / Aadhaar and password.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res  = await loginUser(id.trim(), pw)
      const data = await res.json()
      setLoading(false)
      if (res.ok) {
        setUser(data.user, data.token)   // saves token + user to localStorage
        nav('dashboard')
      } else {
        setError(data.message || 'Login failed. Please check your credentials.')
      }
    } catch {
      setLoading(false)
      setError('Network error — make sure the server is running.')
    }
  }

  const handleKeyDown = (e) => { if (e.key === 'Enter') handle() }

  return (
    <div className="page" style={{ paddingTop: '3rem' }}>
      <div className="form-card">
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: 8 }}>🔐</div>
          <div className="form-title">Voter Login</div>
          <div className="form-sub">Access your secure voting portal</div>
        </div>

        <div className="alert alert-info">
          🛡 Secured with JWT — your session is encrypted end-to-end
        </div>

        {error && (
          <div className="alert" style={{ background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.3)', color: '#f87171', marginBottom: '1rem' }}>
            ⚠ {error}
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Voter ID / Aadhaar Number</label>
          <input
            id="login-id"
            className="form-input"
            placeholder="e.g. IND123456 or XXXX XXXX XXXX"
            value={id}
            onChange={e => setId(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password / MPIN</label>
          <input
            id="login-password"
            className="form-input"
            type="password"
            placeholder="Enter your secure password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="current-password"
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <span className="text-link">Forgot Password?</span>
        </div>

        <button
          id="login-submit"
          className="btn btn-primary btn-full"
          onClick={handle}
          disabled={loading}
        >
          {loading ? 'Verifying…' : 'Login →'}
        </button>

        <hr className="divider" />
        <div style={{ textAlign: 'center', fontSize: '.85rem', color: '#6b7fa8' }}>
          New voter?{' '}
          <span className="text-link" onClick={() => nav('register')}>
            Register here
          </span>
        </div>
      </div>
    </div>
  )
}
