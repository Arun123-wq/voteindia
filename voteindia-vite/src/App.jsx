import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ElectionsPage from './pages/ElectionsPage.jsx'
import PartiesPage from './pages/PartiesPage.jsx'
import VotePage from './pages/VotePage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import VoterCardPage from './pages/VoterCardPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import { getSavedUser, fetchMe, clearSession, saveSession } from './api.js'

/** Pages that require a valid JWT to access */
const PROTECTED = ['vote', 'dashboard', 'voter']

/** Guard wrapper — redirects to login if not authenticated */
function PrivateRoute({ user, nav, children }) {
  if (!user) {
    return (
      <div className="page" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
        <div style={{ fontSize: '1.2rem', color: '#e8eaf0', marginBottom: '0.5rem' }}>
          Authentication Required
        </div>
        <div style={{ color: '#6b7fa8', marginBottom: '1.5rem', fontSize: '.9rem' }}>
          Please log in to access this page.
        </div>
        <button className="btn btn-primary" onClick={() => nav('login')}>
          Login →
        </button>
      </div>
    )
  }
  return children
}

export default function App() {
  const [page, setPage] = useState('home')
  const [user, setUser] = useState(null)
  const [voted, setVoted] = useState(false)
  const [authReady, setAuthReady] = useState(false) // wait for session restore

  // ── Restore session from localStorage on mount ──────────────────────────
  useEffect(() => {
    const savedUser = getSavedUser()
    if (!savedUser) {
      setAuthReady(true)
      return
    }
    // Validate the stored token with the server
    fetchMe()
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
          setVoted(data.user.voted ?? false)
        } else {
          // Token invalid / expired — clear stale data
          clearSession()
        }
      })
      .catch(() => clearSession())
      .finally(() => setAuthReady(true))
  }, [])

  const nav = (p) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSetUser = (userData, token) => {
    if (token) saveSession(token, userData)
    setUser(userData)
    setVoted(userData?.voted ?? false)
  }

  const handleLogout = () => {
    clearSession()
    setUser(null)
    setVoted(false)
    nav('home')
  }

  if (!authReady) {
    // Brief splash while we validate the stored JWT
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg, #0d1b2e)', color: '#e8eaf0', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: '2rem' }}>🏛</div>
        <div style={{ color: '#6b7fa8', fontSize: '.9rem' }}>VoteIndia — Verifying session…</div>
      </div>
    )
  }

  const pages = {
    home: <HomePage nav={nav} user={user} />,
    login: <LoginPage nav={nav} setUser={handleSetUser} />,
    register: <RegisterPage nav={nav} />,
    elections: <ElectionsPage nav={nav} />,
    parties: <PartiesPage />,
    vote: (
      <PrivateRoute user={user} nav={nav}>
        <VotePage nav={nav} user={user} voted={voted} setVoted={setVoted} />
      </PrivateRoute>
    ),
    results: <ResultsPage />,
    dashboard: (
      <PrivateRoute user={user} nav={nav}>
        <DashboardPage nav={nav} user={user} />
      </PrivateRoute>
    ),
    voter: (
      <PrivateRoute user={user} nav={nav}>
        <VoterCardPage nav={nav} user={user} />
      </PrivateRoute>
    ),
    about: <AboutPage />,
  }

  return (
    <div className="app">
      <Navbar page={page} nav={nav} user={user} onLogout={handleLogout} />
      <div className="eci-strip">
        🏛 Election Commission of India — VoteIndia Digital Infrastructure | SECURE · TRANSPARENT · VERIFIED
      </div>
      {pages[page] ?? pages.home}
      <Footer nav={nav} />
    </div>
  )
}
