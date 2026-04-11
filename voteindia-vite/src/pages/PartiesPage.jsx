import React, { useState, useEffect } from 'react'

function PartyDetail({ party:p, onBack }) {
  return (
    <div className="page">
      <button className="btn btn-outline" onClick={onBack} style={{marginBottom:'1.5rem'}}>← Back to Parties</button>
      <div style={{display:'flex',alignItems:'center',gap:'1rem',marginBottom:'1.5rem',flexWrap:'wrap'}}>
        <div className="party-logo" style={{width:70,height:70,background:p.bg,color:p.color,fontSize:'2rem',border:`2px solid ${p.color}33`}}>{p.symbol}</div>
        <div>
          <div style={{fontSize:'1.5rem',fontWeight:700,color:'#e8eaf0'}}>{p.name}</div>
          <div style={{color:'#6b7fa8',fontSize:'.85rem'}}>Founded {p.founded} · Leader: {p.leader} · {p.alliance} Alliance</div>
          <div style={{display:'flex',gap:8,marginTop:6,flexWrap:'wrap'}}>
            <span className="verified-badge">✓ ECI Registered</span>
            <span style={{background:p.bg,color:p.color,padding:'3px 10px',borderRadius:20,fontSize:'.75rem',border:`1px solid ${p.color}33`}}>{p.ideology}</span>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div>
          <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:'1.25rem',marginBottom:'1rem'}}>
            <div style={{fontWeight:600,marginBottom:'1rem',color:'#e8eaf0'}}>Key Leadership</div>
            {p.candidates.map((c,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
                <div style={{width:36,height:36,borderRadius:'50%',background:p.bg,border:`1px solid ${p.color}33`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.85rem',fontWeight:700,color:p.color,flexShrink:0}}>
                  {c.split(' ').map(x=>x[0]).join('')}
                </div>
                <div>
                  <div style={{fontSize:'.9rem',fontWeight:500,color:'#e8eaf0'}}>{c}</div>
                  <div style={{fontSize:'.75rem',color:'#6b7fa8'}}>{i===0?'President / Leader':i===1?'National Secretary':'Senior Leader'}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:'1.25rem'}}>
            <div style={{fontWeight:600,marginBottom:'.75rem',color:'#e8eaf0'}}>Election Performance</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
              {[{label:'Lok Sabha Seats',val:p.seats},{label:'Alliance',val:p.alliance},{label:'Vote Share',val:'28.4%'},{label:'States Ruling',val:3}].map((s,i)=>(
                <div key={i} style={{background:'#0d1526',borderRadius:10,padding:'.75rem'}}>
                  <div style={{fontSize:'.7rem',color:'#6b7fa8'}}>{s.label}</div>
                  <div style={{fontSize:'1rem',fontWeight:600,color:p.color}}>{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:'1.25rem'}}>
          <div style={{fontWeight:600,marginBottom:'1rem',color:'#e8eaf0'}}>📋 Party Agenda & Manifesto</div>
          {Object.entries(p.agenda).map(([key,points])=>(
            <div key={key} className="agenda-section">
              <div className="agenda-title">
                {key==='economy'?'💰':key==='security'?'🛡':key==='social'?'🤝':'🌾'} {key.charAt(0).toUpperCase()+key.slice(1)}
              </div>
              <ul className="agenda-points">{points.map((pt,i)=><li key={i}>{pt}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PartiesPage() {
  const [PARTIES, setParties] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('all')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetch('/api/parties')
      .then(res => res.json())
      .then(data => { setParties(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); })
  }, [])

  if (loading) return <div className="page" style={{paddingTop:'2rem',textAlign:'center'}}>Loading parties data...</div>

  if (selected) return <PartyDetail party={PARTIES.find(p=>p._id===selected || p.id===selected)} onBack={()=>setSelected(null)} />
  const list = tab==='all' ? PARTIES : PARTIES.filter(p=>p.alliance===tab)

  return (
    <div className="page">
      <div className="section-title">🏛 Political Parties</div>
      <div className="section-sub">Explore registered national and regional parties, their leadership and manifestos</div>
      <div className="tabs">
        {['all','NDA','INDIA'].map(t=>(
          <button key={t} className={`tab${tab===t?' active':''}`} onClick={()=>setTab(t)}>
            {t==='all'?'All Parties':t==='NDA'?'NDA Alliance':'INDIA Alliance'}
          </button>
        ))}
      </div>
      <div className="parties-grid">
        {list.map(p=>(
          <div key={p._id || p.id} className="party-card" onClick={()=>setSelected(p._id || p.id)}>
            <div className="party-header">
              <div className="party-logo" style={{background:p.bg,color:p.color,border:`1px solid ${p.color}33`}}>{p.symbol}</div>
              <div>
                <div className="party-name">{p.name}</div>
                <div className="party-abbr">{p.abbr} · Est. {p.founded}</div>
                <span style={{background:p.bg,color:p.color,padding:'2px 8px',borderRadius:20,fontSize:'.7rem',border:`1px solid ${p.color}22`,marginTop:4,display:'inline-block'}}>{p.alliance}</span>
              </div>
            </div>
            <div className="party-body">
              <div className="party-desc">Led by <strong style={{color:'#e8eaf0'}}>{p.leader}</strong>. {p.ideology}. {p.seats} Lok Sabha seats.</div>
              <div className="party-tags">
                {Object.keys(p.agenda).map(k=>(
                  <span key={k} className="tag" style={{color:p.color,borderColor:`${p.color}33`,background:p.bg}}>
                    {k==='economy'?'💰':k==='security'?'🛡':k==='social'?'🤝':'🌾'} {k}
                  </span>
                ))}
              </div>
              <div className="party-seats">
                <div className="seat-stat"><div className="seat-num" style={{color:p.color}}>{p.seats}</div><div className="seat-label">LS Seats</div></div>
                <div className="seat-stat"><div className="seat-num" style={{color:p.color}}>{p.candidates.length}</div><div className="seat-label">Leaders</div></div>
                <div className="seat-stat"><div style={{color:p.color,fontWeight:600,fontSize:'.9rem'}}>View →</div><div className="seat-label">Manifesto</div></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
