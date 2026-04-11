import React from 'react'

export default function DashboardPage({ nav, user }) {
  if (!user) return (
    <div className="page">
      <div style={{textAlign:'center',padding:'3rem'}}>
        <div style={{fontSize:'3rem',marginBottom:'1rem'}}>👤</div>
        <div style={{fontSize:'1.2rem',color:'#e8eaf0',marginBottom:'1rem'}}>Please login to view your dashboard</div>
        <button className="btn btn-primary" onClick={()=>nav('login')}>Login</button>
      </div>
    </div>
  )

  const initials = user.name.split(' ').map(x=>x[0]).join('').slice(0,2)

  return (
    <div className="page">
      <div style={{display:'flex',alignItems:'center',gap:'1rem',marginBottom:'2rem',flexWrap:'wrap'}}>
        <div style={{width:60,height:60,borderRadius:'50%',background:'rgba(255,153,51,.15)',border:'2px solid rgba(255,153,51,.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.5rem',fontWeight:700,color:'#FF9933'}}>
          {initials}
        </div>
        <div>
          <div style={{fontSize:'1.3rem',fontWeight:700,color:'#e8eaf0'}}>{user.name}</div>
          <div style={{display:'flex',gap:8,marginTop:4,flexWrap:'wrap'}}>
            <span className="verified-badge">✓ Verified Voter</span>
            <span style={{background:'rgba(59,130,246,.1)',border:'1px solid rgba(59,130,246,.2)',color:'#60a5fa',padding:'3px 10px',borderRadius:20,fontSize:'.75rem'}}>🗳 Eligible</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {[
          {title:'Voter ID', value:user.voterId, sub:'National Voter ID'},
          {title:'Constituency', value:'Varanasi', sub:'Uttar Pradesh'},
          {title:'Status', value:'Active', sub:'Valid till 2030'},
          {title:'Votes Cast', value:'1 / 1', sub:'UP By-election 2026'},
        ].map((d,i)=>(
          <div key={i} className="dash-card" style={{cursor:'default'}}>
            <div className="dash-card-title">{d.title}</div>
            <div className="dash-card-value" style={{fontSize:'1rem',marginTop:4,wordBreak:'break-all'}}>{d.value}</div>
            <div className="dash-card-sub">{d.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:'1.25rem'}}>
          <div style={{fontWeight:600,marginBottom:'1rem',color:'#e8eaf0'}}>Personal Details</div>
          {[
            {k:'Full Name',v:user.name},{k:'Date of Birth',v:'15 May 1990'},
            {k:'Gender',v:'Male'},{k:'State',v:'West Bengal'},
            {k:'Assembly',v:'Jadavpur'},{k:'Parliamentary',v:'Varanasi'},
          ].map((r,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid #1e2d4a',fontSize:'.85rem',gap:8}}>
              <span style={{color:'#6b7fa8',flexShrink:0}}>{r.k}</span>
              <span style={{color:'#e8eaf0',fontWeight:500,textAlign:'right'}}>{r.v}</span>
            </div>
          ))}
        </div>
        <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:'1.25rem'}}>
          <div style={{fontWeight:600,marginBottom:'1rem',color:'#e8eaf0'}}>Voting History</div>
          {[
            {e:'UP By-election 2026',d:'Today',s:'Voted'},
            {e:'Delhi Assembly 2025',d:'Feb 5, 2025',s:'Voted'},
            {e:'Lok Sabha 2024',d:'May 7, 2024',s:'Voted'},
            {e:'Bihar Elections 2025',d:'Oct 15, 2025',s:'Not Eligible'},
          ].map((r,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid #1e2d4a',gap:8}}>
              <div>
                <div style={{fontSize:'.85rem',color:'#e8eaf0'}}>{r.e}</div>
                <div style={{fontSize:'.75rem',color:'#6b7fa8'}}>{r.d}</div>
              </div>
              <span style={{padding:'3px 10px',borderRadius:20,fontSize:'.72rem',flexShrink:0,background:r.s==='Voted'?'rgba(19,136,8,.15)':'rgba(107,127,168,.1)',color:r.s==='Voted'?'#27c211':'#6b7fa8'}}>{r.s}</span>
            </div>
          ))}
          <button className="btn btn-outline btn-full" style={{marginTop:'1rem',fontSize:'.82rem'}} onClick={()=>nav('voter')}>🪪 View Voter Card</button>
        </div>
      </div>
    </div>
  )
}
