import React from 'react'

export default function Footer({ nav }) {
  const pages = ['home','elections','parties','vote','results','about','voter']
  return (
    <footer className="footer">
      <div style={{ marginBottom:8 }}>
        {pages.map(p => (
          <span key={p} style={{ margin:'0 12px', cursor:'pointer' }} onClick={() => nav(p)}>
            {p.charAt(0).toUpperCase()+p.slice(1)}
          </span>
        ))}
      </div>
      <div>© 2026 Election Commission of India · VoteIndia Digital Platform</div>
      <div style={{ marginTop:4, fontSize:'0.75rem' }}>Developed under Digital India Mission · NIC · MeitY</div>
    </footer>
  )
}
