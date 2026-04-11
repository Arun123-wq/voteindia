import React from 'react'

const STATS = [
  {num:'96.8 Cr', label:'Registered Voters', g:false},
  {num:'68.4%',  label:'Average Turnout 2024', g:true},
  {num:'543',    label:'Lok Sabha Seats', g:false},
  {num:'7',      label:'Phases in 2024', g:true},
  {num:'₹3,500 Cr', label:'Total Election Budget', g:false},
  {num:'10.5 L', label:'Polling Stations', g:true},
]
const CARDS = [
  {icon:'🗳', title:'Active Elections', desc:'UP By-elections 2026 is currently active. Cast your vote now if you are a registered voter.', action:'Vote Now', page:'vote', color:'#FF9933'},
  {icon:'📅', title:'Election Schedule', desc:'View the complete schedule for upcoming state and national elections with phase-wise dates.', action:'View Schedule', page:'elections', color:'#138808'},
  {icon:'🏛', title:'Political Parties', desc:'Explore party manifestos, leadership and agendas of all major national and regional parties.', action:'Explore Parties', page:'parties', color:'#0077b6'},
  {icon:'📊', title:'Election Results', desc:'Real-time and historical results with seat-wise breakdown and vote share analysis.', action:'See Results', page:'results', color:'#9333ea'},
]
const STEPS = [
  {n:1, icon:'📝', title:'Register', desc:'Enter Aadhaar/Voter ID and verify OTP'},
  {n:2, icon:'✅', title:'Verify',   desc:'Biometric & face authentication'},
  {n:3, icon:'🗳', title:'Vote',     desc:'Select your preferred candidate'},
  {n:4, icon:'🔒', title:'Confirm',  desc:'Encrypted ballot receipt generated'},
]

export default function HomePage({ nav, user }) {
  return (
    <div className="page">
      <div className="hero">
        <div className="hero-badges">
          <span className="badge">🏛 18th Lok Sabha</span>
          <span className="badge green">✓ ECI Certified</span>
          <span className="badge">🔒 End-to-End Encrypted</span>
        </div>
        <h1>Jai Hind — Your Vote,<br/>Your Democracy</h1>
        <p>India's official digital voting platform. Register, verify your identity, and cast your vote securely from anywhere in the country.</p>
        <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
          {user
            ? <button className="btn btn-primary btn-lg" onClick={() => nav('vote')}>🗹 Cast Your Vote</button>
            : <button className="btn btn-primary btn-lg" onClick={() => nav('register')}>Register to Vote →</button>}
          <button className="btn btn-outline btn-lg" onClick={() => nav('elections')}>View Elections</button>
        </div>
      </div>

      <div className="stats-grid">
        {STATS.map((s,i) => (
          <div key={i} className="stat-card">
            <div className={`stat-num${s.g?' green':''}`}>{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{marginTop:'3rem',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'1.5rem'}}>
        {CARDS.map((c,i) => (
          <div key={i} className="dash-card" onClick={() => nav(c.page)}>
            <div style={{fontSize:'2rem',marginBottom:'.75rem'}}>{c.icon}</div>
            <div style={{fontWeight:600,fontSize:'1rem',marginBottom:'.5rem',color:'#e8eaf0'}}>{c.title}</div>
            <div style={{fontSize:'.82rem',color:'#6b7fa8',lineHeight:1.6,marginBottom:'1rem'}}>{c.desc}</div>
            <span style={{color:c.color,fontSize:'.85rem',fontWeight:500}}>{c.action} →</span>
          </div>
        ))}
      </div>

      <div style={{marginTop:'2rem',background:'var(--card)',border:'1px solid var(--border)',borderRadius:'16px',padding:'1.5rem'}}>
        <div className="section-title" style={{marginBottom:'1rem'}}>How It Works</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'1rem'}}>
          {STEPS.map(s => (
            <div key={s.n} style={{textAlign:'center',padding:'1rem'}}>
              <div style={{width:48,height:48,background:'rgba(255,153,51,.1)',border:'1px solid rgba(255,153,51,.2)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4rem',margin:'0 auto .75rem'}}>{s.icon}</div>
              <div style={{fontWeight:600,marginBottom:4,color:'#e8eaf0'}}>{s.n}. {s.title}</div>
              <div style={{fontSize:'.8rem',color:'#6b7fa8'}}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
