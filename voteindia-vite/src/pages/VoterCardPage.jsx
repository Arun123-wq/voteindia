import React from 'react'

export default function VoterCardPage({ nav, user }) {
  if (!user) return (
    <div className="page">
      <div style={{textAlign:'center',padding:'3rem'}}>
        <div style={{fontSize:'1.2rem',color:'#e8eaf0',marginBottom:'1rem'}}>Please login first</div>
        <button className="btn btn-primary" onClick={()=>nav('login')}>Login</button>
      </div>
    </div>
  )

  const initials = user.name.split(' ').map(x=>x[0]).join('').slice(0,2)

  return (
    <div className="page">
      <button className="btn btn-outline" style={{marginBottom:'1.5rem'}} onClick={()=>nav('dashboard')}>← Dashboard</button>
      <div className="section-title">🪪 Digital Voter ID Card</div>
      <div className="section-sub">Your official digital Voter Identity Card issued by ECI</div>
      <div style={{maxWidth:480,margin:'0 auto'}}>
        <div style={{background:'linear-gradient(135deg,#1a2236 0%,#0d1526 100%)',border:'2px solid rgba(255,153,51,.4)',borderRadius:20,overflow:'hidden',boxShadow:'0 8px 32px rgba(0,0,0,.4)'}}>
          <div style={{background:'linear-gradient(90deg,#FF9933,#138808)',height:6}} />
          <div style={{padding:'1.5rem'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'1.25rem'}}>
              <div>
                <div style={{fontSize:'.65rem',color:'#6b7fa8',letterSpacing:2,textTransform:'uppercase'}}>Election Commission of India</div>
                <div style={{fontFamily:"'Yatra One',cursive",fontSize:'1rem',background:'linear-gradient(90deg,#FF9933,#138808)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>EPIC Card</div>
              </div>
              <div style={{display:'flex',flexDirection:'column',width:24,height:18,overflow:'hidden',borderRadius:3}}>
                <div style={{flex:1,background:'#FF9933'}} /><div style={{flex:1,background:'#fff'}} /><div style={{flex:1,background:'#138808'}} />
              </div>
            </div>
            <div style={{display:'flex',gap:'1.25rem',alignItems:'flex-start'}}>
              <div style={{width:80,height:96,background:'rgba(255,153,51,.1)',border:'2px solid rgba(255,153,51,.3)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2rem',fontWeight:700,color:'#FF9933',flexShrink:0}}>
                {initials}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:'1.1rem',fontWeight:700,color:'#e8eaf0',marginBottom:4}}>{user.name}</div>
                {[{k:'S/O',v:'Ramesh Kumar Singh'},{k:'DOB',v:'15/05/1990'},{k:'Sex',v:'Male'},{k:'State',v:'West Bengal'}].map((r,i)=>(
                  <div key={i} style={{fontSize:'.78rem',color:'#a0aec0',marginBottom:2}}>
                    <span style={{color:'#6b7fa8',marginRight:4}}>{r.k}:</span>{r.v}
                  </div>
                ))}
              </div>
            </div>
            <div style={{borderTop:'1px solid rgba(255,153,51,.2)',marginTop:'1.25rem',paddingTop:'1rem'}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.75rem',marginBottom:'.75rem'}}>
                <div>
                  <div style={{fontSize:'.65rem',color:'#6b7fa8',textTransform:'uppercase',letterSpacing:1}}>Voter ID</div>
                  <div style={{fontSize:'.85rem',fontWeight:600,color:'#FF9933',fontFamily:'monospace'}}>{user.voterId}</div>
                </div>
                <div>
                  <div style={{fontSize:'.65rem',color:'#6b7fa8',textTransform:'uppercase',letterSpacing:1}}>Part No.</div>
                  <div style={{fontSize:'.85rem',fontWeight:600,color:'#e8eaf0'}}>142 / 3</div>
                </div>
              </div>
              <div style={{fontSize:'.8rem',color:'#a0aec0'}}><span style={{color:'#6b7fa8'}}>Constituency: </span>Varanasi Parliamentary — 63</div>
              <div style={{fontSize:'.8rem',color:'#a0aec0',marginTop:2}}><span style={{color:'#6b7fa8'}}>Assembly: </span>Jadavpur — 223</div>
            </div>
            <div style={{background:'rgba(19,136,8,.1)',border:'1px solid rgba(19,136,8,.2)',borderRadius:8,padding:'.5rem .75rem',marginTop:'1rem',display:'flex',alignItems:'center',gap:6,fontSize:'.75rem',color:'#27c211'}}>
              ✓ Digitally Verified by ECI · Valid for all Elections
            </div>
          </div>
          <div style={{background:'linear-gradient(90deg,#138808,#FF9933)',height:6}} />
        </div>
        <div style={{display:'flex',gap:'1rem',marginTop:'1.5rem',justifyContent:'center'}}>
          <button className="btn btn-outline">📥 Download PDF</button>
          <button className="btn btn-primary">🔗 Share Card</button>
        </div>
      </div>
    </div>
  )
}
