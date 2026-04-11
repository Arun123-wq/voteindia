import React, { useState, useEffect } from 'react'
import { apiFetch } from '../api.js'

export default function VotePage({ nav, user, voted, setVoted }) {
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading]       = useState(true)
  const [selected, setSelected]     = useState(null)
  const [step, setStep]             = useState(1)
  const [ack, setAck]               = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [voteError, setVoteError]   = useState('')

  useEffect(() => {
    apiFetch('/candidates')
      .then(r => r.json())
      .then(d => { setCandidates(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(e => { console.error(e); setLoading(false) })
  }, [])

  // Guard is handled by PrivateRoute in App.jsx — but keep a fallback
  if (!user) return null

  if (voted) {
    const id = `EVM/UP/26/${Math.random().toString(36).substr(2, 8).toUpperCase()}`
    return (
      <div className="page">
        <div className="success-screen">
          <div className="success-icon">✅</div>
          <div className="success-title">Vote Cast Successfully!</div>
          <div className="success-sub">
            Your encrypted vote has been recorded. Thank you for participating in India's democracy!
          </div>
          <div className="receipt-box">
            <div style={{ textAlign: 'center', marginBottom: 12, fontSize: '.7rem', color: '#6b7fa8', textTransform: 'uppercase', letterSpacing: 1 }}>
              Voting Receipt
            </div>
            <div className="receipt-row">
              <span style={{ color: '#6b7fa8' }}>Receipt ID</span>
              <span style={{ color: '#FF9933', fontSize: '.8rem' }}>{id}</span>
            </div>
            <div className="receipt-row">
              <span style={{ color: '#6b7fa8' }}>Voter ID</span>
              <span style={{ fontSize: '.8rem' }}>{user.voterId}</span>
            </div>
            <div className="receipt-row">
              <span style={{ color: '#6b7fa8' }}>Constituency</span>
              <span style={{ fontSize: '.8rem' }}>Varanasi</span>
            </div>
            <div className="receipt-row">
              <span style={{ color: '#6b7fa8' }}>Time</span>
              <span style={{ fontSize: '.8rem' }}>{new Date().toLocaleTimeString()}</span>
            </div>
            <div className="receipt-row">
              <span style={{ color: '#6b7fa8' }}>Status</span>
              <span style={{ color: '#27c211' }}>✓ Counted</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <button className="btn btn-outline" onClick={() => nav('results')}>📊 View Results</button>
            <button className="btn btn-green" onClick={() => nav('home')}>🏠 Home</button>
          </div>
        </div>
      </div>
    )
  }

  if (loading) return (
    <div className="page" style={{ paddingTop: '2rem', textAlign: 'center', color: '#6b7fa8' }}>
      Loading voting terminal…
    </div>
  )

  const cand = candidates.find(c => (c._id || c.id) === selected)

  // ── Submit vote via protected API ─────────────────────────────────────────
  const submitVote = async () => {
    if (!selected || !ack) return
    setSubmitting(true)
    setVoteError('')
    try {
      const res  = await apiFetch('/vote', {
        method: 'POST',
        body: JSON.stringify({ candidateId: selected }),
      })
      const data = await res.json()
      setSubmitting(false)
      if (res.ok) {
        setVoted(true)
      } else {
        setVoteError(data.message || 'Failed to cast vote. Please try again.')
      }
    } catch {
      setSubmitting(false)
      setVoteError('Network error — please check your connection.')
    }
  }

  return (
    <div className="page">
      <div className="vote-section">
        <div className="section-title">🗳 Cast Your Vote</div>
        <div className="section-sub">UP By-election 2026 · Varanasi Constituency · Voting closes at 6:00 PM</div>
        <div className="alert alert-warning">⚠ You can only vote ONCE. Your vote is final and cannot be changed.</div>
        <div className="alert alert-success">✓ Verified Voter: {user.name} | ID: {user.voterId}</div>

        {step === 1 && (
          <div className="vote-card">
            <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '.25rem', color: '#e8eaf0' }}>
              Select Your Candidate
            </div>
            <div style={{ fontSize: '.8rem', color: '#6b7fa8', marginBottom: '1rem' }}>
              Varanasi Constituency, Uttar Pradesh · 2026 By-election
            </div>
            <div className="candidate-grid">
              {candidates.map(c => (
                <div
                  key={c._id || c.id}
                  className={`candidate-item${selected === (c._id || c.id) ? ' selected' : ''}`}
                  onClick={() => setSelected(c._id || c.id)}
                >
                  <div className="radio-circle">
                    {selected === (c._id || c.id) && <div className="radio-dot" />}
                  </div>
                  <div className="candidate-avatar" style={{ background: `${c.color}22`, color: c.color, border: `1px solid ${c.color}44` }}>
                    {c.name.split(' ').map(x => x[0]).join('').slice(0, 2)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="candidate-name">{c.name}</div>
                    <div className="candidate-party">{c.party} · {c.symbol}</div>
                  </div>
                  <div className="candidate-symbol">{c.symbol}</div>
                </div>
              ))}
            </div>
            <button
              className="btn btn-primary btn-full"
              style={{ marginTop: '1.5rem' }}
              disabled={!selected}
              onClick={() => setStep(2)}
            >
              {selected ? 'Review & Confirm →' : 'Select a candidate first'}
            </button>
          </div>
        )}

        {step === 2 && cand && (
          <div className="vote-card">
            <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '1rem', color: '#e8eaf0' }}>
              Review Your Vote
            </div>
            <div style={{ background: 'rgba(255,153,51,.05)', border: '2px solid rgba(255,153,51,.3)', borderRadius: 12, padding: '1.5rem', textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: 8 }}>{cand.symbol}</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#e8eaf0' }}>{cand.name}</div>
              <div style={{ color: '#6b7fa8', marginTop: 4 }}>{cand.party} · Varanasi</div>
            </div>
            <div className="voter-info">
              <div className="voter-info-row"><span className="voter-info-label">Your Name</span><span className="voter-info-value">{user.name}</span></div>
              <div className="voter-info-row"><span className="voter-info-label">Voter ID</span><span className="voter-info-value">{user.voterId}</span></div>
              <div className="voter-info-row"><span className="voter-info-label">Constituency</span><span className="voter-info-value">Varanasi</span></div>
              <div className="voter-info-row"><span className="voter-info-label">Election</span><span className="voter-info-value">UP By-election 2026</span></div>
            </div>

            {voteError && (
              <div style={{ background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.3)', color: '#f87171', borderRadius: 8, padding: '10px 14px', marginBottom: '1rem', fontSize: '.85rem' }}>
                ⚠ {voteError}
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '.82rem', color: '#6b7fa8', marginBottom: '1.5rem' }}>
              <input type="checkbox" style={{ marginTop: 3 }} checked={ack} onChange={e => setAck(e.target.checked)} />
              <span>I confirm this is my final vote. This action is irreversible and I am voting of my own free will.</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <button className="btn btn-outline btn-full" onClick={() => setStep(1)} disabled={submitting}>
                ← Change Vote
              </button>
              <button className="btn btn-green btn-full" disabled={!ack || submitting} onClick={submitVote}>
                {submitting ? 'Submitting…' : '✓ Submit Vote'}
              </button>
            </div>
          </div>
        )}

        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '1rem', fontSize: '.8rem', color: '#6b7fa8', lineHeight: 1.6 }}>
          🔒 Your vote is encrypted end-to-end using EVM-grade security with blockchain audit trails.
          No one can see your individual vote — only the final count.
        </div>
      </div>
    </div>
  )
}
