import React from 'react'

export default function Navbar({ page, nav, user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="logo" onClick={() => nav('home')}>
        <div className="logo-flag">
          <span style={{ background: '#FF9933' }} />
          <span style={{ background: '#fff' }} />
          <span style={{ background: '#138808' }} />
        </div>
        <span className="logo-text">VoteIndia</span>
      </div>

      <div className="nav-links">
        {['elections', 'parties', 'results'].map(p => (
          <button
            key={p}
            className={`nav-btn ${page === p ? 'active' : ''}`}
            onClick={() => nav(p)}
          >
            {p === 'elections' ? '🗳 Elections' : p === 'parties' ? '🏛 Parties' : '📊 Results'}
          </button>
        ))}

        {user ? (
          <>
            <button
              className={`nav-btn ${page === 'vote' ? 'active' : ''}`}
              onClick={() => nav('vote')}
            >
              🗹 Vote
            </button>
            <button
              className={`nav-btn ${page === 'dashboard' ? 'active' : ''}`}
              onClick={() => nav('dashboard')}
            >
              👤 {user.name ? user.name.split(' ')[0] : 'Profile'}
            </button>
            <button className="nav-btn" style={{ color: '#f87171' }} onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="nav-btn" onClick={() => nav('login')}>Login</button>
            <button className="nav-btn primary" onClick={() => nav('register')}>Register</button>
          </>
        )}
      </div>
    </nav>
  )
}
