import React, { useState, useEffect } from 'react'
import { apiFetch } from '../api'

export default function ResultsPage() {
  const [CANDIDATES_UP, setCandidates] = useState([])
  const [PARTIES, setParties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = () => {
      Promise.all([
        apiFetch('/results').then(r=>r.json()),
        apiFetch('/parties').then(r=>r.json())
      ]).then(([c, p]) => {
        setCandidates(Array.isArray(c) ? c : []);
        setParties(Array.isArray(p) ? p : []); 
        setLoading(false);
      }).catch(e => { console.error(e); setLoading(false); })
    }

    loadData()
    const timer = setInterval(loadData, 30000) // Auto-refresh every 30 seconds
    return () => clearInterval(timer)
  }, [])

  if (loading) return <div className="page" style={{paddingTop:'2rem',textAlign:'center'}}>Loading results...</div>

  const total = CANDIDATES_UP.reduce((a,c)=>a+(c.votes||0),0)
  const sorted = [...CANDIDATES_UP].sort((a,b)=>(b.votes||0)-(a.votes||0))
  const alliances = [
    {name:'NDA', seats:293, color:'#FF9933'},
    {name:'INDIA Alliance', seats:234, color:'#138808'},
    {name:'Others', seats:16, color:'#6b7fa8'},
  ]

  return (
    <div className="page">
      <div className="section-title">📊 Election Results</div>
      <div className="section-sub">Live and historical results for Indian elections</div>
      <div className="alert alert-info">📡 UP By-election 2026 counting in progress · Last updated: {new Date().toLocaleTimeString()}</div>

      <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:'1.5rem',marginBottom:'1.5rem'}}>
        <div style={{fontWeight:600,marginBottom:'1rem',color:'#e8eaf0'}}>Varanasi Constituency — Live Vote Count</div>
        {sorted.map((c,i)=>{
          const pct = total>0 ? Math.round((c.votes/total)*100) : 0
          return (
            <div key={c._id || c.id} style={{marginBottom:'.75rem'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:4,flexWrap:'wrap',gap:4}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <span style={{width:24,height:24,borderRadius:'50%',display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:'.75rem',fontWeight:700,background:i===0?'rgba(255,215,0,.2)':i===1?'rgba(192,192,192,.2)':'rgba(107,127,168,.1)',color:i===0?'#FFD700':i===1?'#C0C0C0':'#6b7fa8'}}>{i+1}</span>
                  <span style={{fontSize:'.9rem',fontWeight:500,color:'#e8eaf0'}}>{c.name}</span>
                  <span style={{fontSize:'.75rem',color:'#6b7fa8'}}>{c.symbol} {c.party}</span>
                  {i===0 && <span style={{background:'rgba(255,215,0,.15)',color:'#FFD700',border:'1px solid rgba(255,215,0,.3)',padding:'2px 8px',borderRadius:20,fontSize:'.7rem'}}>Leading</span>}
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontSize:'.9rem',fontWeight:600,color:c.color}}>{c.votes.toLocaleString()}</div>
                  <div style={{fontSize:'.75rem',color:'#6b7fa8'}}>{pct}%</div>
                </div>
              </div>
              <div className="progress-bar"><div className="progress-fill" style={{width:`${pct}%`,background:c.color}} /></div>
            </div>
          )
        })}
        <div style={{borderTop:'1px solid #1e2d4a',marginTop:'1rem',paddingTop:'.75rem',display:'flex',justifyContent:'space-between',fontSize:'.82rem',color:'#6b7fa8',flexWrap:'wrap',gap:8}}>
          <span>Total: {total.toLocaleString()} votes</span><span>Turnout: 73.2%</span><span>Rounds: 14/18</span>
        </div>
      </div>

      <div style={{fontWeight:600,marginBottom:'1rem',color:'#e8eaf0'}}>Lok Sabha 2024 — National Results</div>
      <div className="results-grid" style={{marginBottom:'1.5rem'}}>
        {alliances.map((r,i)=>(
          <div key={i} className="result-card">
            <div className="result-header">
              <div style={{width:36,height:36,borderRadius:'50%',background:`${r.color}22`,border:`1px solid ${r.color}44`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,color:r.color,fontSize:'.8rem'}}>{i+1}</div>
              <div style={{fontSize:'.9rem',fontWeight:600,color:'#e8eaf0'}}>{r.name}</div>
            </div>
            <div className="progress-bar"><div className="progress-fill" style={{width:`${Math.round((r.seats/543)*100)}%`,background:r.color}} /></div>
            <div className="result-votes">
              <span style={{color:r.color,fontWeight:600,fontSize:'1.1rem'}}>{r.seats} seats</span>
              <span style={{color:'#6b7fa8'}}>{Math.round((r.seats/543)*100)}%</span>
            </div>
            <div style={{fontSize:'.72rem',color:'#6b7fa8',marginTop:4}}>Majority mark: 272 seats</div>
          </div>
        ))}
      </div>

      <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:'1.5rem'}}>
        <div style={{fontWeight:600,marginBottom:'1rem',color:'#e8eaf0'}}>Party-wise Breakdown</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'.75rem'}}>
          {PARTIES.map(p=>(
            <div key={p._id || p.id || Math.random()} style={{display:'flex',alignItems:'center',gap:10,background:'#0d1526',borderRadius:10,padding:'.75rem'}}>
              <span style={{fontSize:'1.2rem'}}>{p.symbol}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:'.8rem',fontWeight:600,color:'#e8eaf0'}}>{p.abbr}</div>
                <div className="progress-bar" style={{margin:'4px 0'}}>
                  <div className="progress-fill" style={{width:`${Math.min(Math.round((parseInt(p.seats||0)/543)*200), 100)}%`,background:p.color}} />
                </div>
              </div>
              <div style={{color:p.color,fontWeight:700,fontSize:'.95rem'}}>{p.seats || 0}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
