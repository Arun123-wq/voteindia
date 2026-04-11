import React, { useState, useEffect } from 'react'
import { apiFetch } from '../api'

const TIMELINE = [
  {date:'Jan 15, 2026', title:'Model Code of Conduct Announced', desc:'ECI announces MCC for upcoming elections. Political parties must comply immediately.', color:'#FF9933', done:true},
  {date:'Feb 1, 2026',  title:'Voter List Publication', desc:'Final electoral rolls published. Voters can verify names at booths or online.', color:'#138808', done:true},
  {date:'Mar 1, 2026',  title:'Nominations Open', desc:'Candidates can file nominations at respective Returning Officer offices.', color:'#FF9933', done:true},
  {date:'Mar 28, 2026', title:'UP By-election Voting Day', desc:'All registered UP voters in 9 constituencies to cast votes between 7AM-6PM.', color:'#e63946', done:false},
  {date:'Apr 1, 2026',  title:'Vote Counting & Results', desc:'EVMs opened and counted under CCTV surveillance at counting centres.', color:'#9333ea', done:false},
]

export default function ElectionsPage({ nav }) {
  const [ELECTIONS, setElections] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    apiFetch('/elections')
      .then(res => res.json())
      .then(data => { setElections(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); })
  }, [])

  const list = filter==='all' ? ELECTIONS : ELECTIONS.filter(e=>e.status===filter)

  if (loading) return <div className="page" style={{paddingTop:'2rem',textAlign:'center'}}>Loading elections data...</div>

  return (
    <div className="page">
      <div className="section-title">🗳 Elections</div>
      <div className="section-sub">Scheduled, active and past elections across India</div>

      <div style={{display:'flex',gap:'.5rem',marginBottom:'1.5rem',flexWrap:'wrap'}}>
        {['all','active','upcoming','closed'].map(f=>(
          <button key={f} className={`nav-btn${filter===f?' active':''}`} onClick={()=>setFilter(f)}>
            {f.charAt(0).toUpperCase()+f.slice(1)}
          </button>
        ))}
      </div>

      <div className="elections-list">
        {list.map(e=>{
          const d = new Date(e.date)
          return (
            <div key={e._id || e.id} className="election-card">
              <div className="election-date">
                <div className="election-day">{d.getDate()}</div>
                <div className="election-month">{d.toLocaleString('default',{month:'short'})}</div>
                <div style={{fontSize:'.65rem',color:'#6b7fa8',marginTop:2}}>{d.getFullYear()}</div>
              </div>
              <div className="election-info">
                <div className="election-title">{e.title}</div>
                <div className="election-meta">
                  <span>📍 {e.type}</span>
                  <span>🪑 {e.seats.toLocaleString()} Seats</span>
                  <span>🔁 {e.phases} Phase{e.phases>1?'s':''}</span>
                  {e.result && <span style={{color:'#27c211'}}>✓ {e.result}</span>}
                </div>
              </div>
              <div>
                <span className={`election-status status-${e.status}`}>
                  {e.status==='active'?'● LIVE':e.status==='upcoming'?'Upcoming':'Concluded'}
                </span>
                {e.status==='active' && (
                  <button className="btn btn-primary" style={{display:'block',marginTop:8,padding:'6px 14px',fontSize:'.8rem'}} onClick={()=>nav('vote')}>Vote Now</button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div style={{marginTop:'2rem',background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:'1.5rem'}}>
        <div style={{fontWeight:600,marginBottom:'1rem',color:'#e8eaf0'}}>📅 Election Timeline 2026</div>
        <div className="timeline">
          {TIMELINE.map((t,i)=>(
            <div key={i} className="timeline-item">
              <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <div className="timeline-dot" style={{background:t.done?t.color:'#1e2d4a'}} />
                {i<TIMELINE.length-1 && <div className="timeline-line" style={{height:50}} />}
              </div>
              <div className="timeline-content">
                <div style={{fontSize:'.72rem',color:'#6b7fa8',marginBottom:2}}>{t.date}</div>
                <h4>{t.title}</h4>
                <p>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
