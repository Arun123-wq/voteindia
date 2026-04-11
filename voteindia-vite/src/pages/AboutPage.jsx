import React from 'react'

export default function AboutPage() {
  return (
    <div className="page">
      <div className="section-title">ℹ About VoteIndia</div>
      <div className="section-sub">India's official digital election platform under the Election Commission of India</div>
      <div className="grid-2" style={{marginBottom:'1.5rem'}}>
        <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:'1.5rem'}}>
          <div style={{fontWeight:600,fontSize:'1rem',marginBottom:'.75rem',color:'#e8eaf0'}}>🏛 About ECI</div>
          <div style={{fontSize:'.85rem',color:'#a0aec0',lineHeight:1.8}}>The Election Commission of India is an autonomous constitutional authority responsible for administering election processes in India. It conducts elections to the Lok Sabha, Rajya Sabha, State Legislative Assemblies, and the offices of the President and Vice-President of India.</div>
        </div>
        <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:'1.5rem'}}>
          <div style={{fontWeight:600,fontSize:'1rem',marginBottom:'.75rem',color:'#e8eaf0'}}>🔒 Security Features</div>
          <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:8}}>
            {['256-bit AES Encryption','Aadhaar Biometric Auth','Blockchain Audit Trail','OTP + Face Verification','End-to-End Vote Secrecy','Real-time EVM Monitoring'].map((f,i)=>(
              <li key={i} style={{fontSize:'.82rem',color:'#a0aec0',display:'flex',gap:8}}><span style={{color:'#138808'}}>✓</span>{f}</li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:'1.5rem',marginBottom:'1.5rem'}}>
        <div style={{fontWeight:600,marginBottom:'1rem',color:'#e8eaf0'}}>📜 Important Electoral Laws</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:'.75rem'}}>
          {[{t:'Representation of People Act, 1951',d:'Regulates the conduct of elections'},{t:'Model Code of Conduct',d:'Guidelines for parties during elections'},{t:'IT (Amendment) Act 2008',d:'Governs digital voting security'},{t:'Right to Vote (Article 326)',d:'Universal Adult Suffrage for citizens'}].map((l,i)=>(
            <div key={i} style={{background:'#0d1526',borderRadius:10,padding:'.75rem',borderLeft:'3px solid #FF9933'}}>
              <div style={{fontSize:'.82rem',fontWeight:600,color:'#e8eaf0',marginBottom:4}}>{l.t}</div>
              <div style={{fontSize:'.75rem',color:'#6b7fa8'}}>{l.d}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:'1.5rem'}}>
        <div style={{fontWeight:600,marginBottom:'1rem',color:'#e8eaf0'}}>📞 Contact & Helpline</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'1rem'}}>
          {[{icon:'📞',t:'Voter Helpline',v:'1950 (Toll Free)'},{icon:'📧',t:'Email',v:'complaints@eci.gov.in'},{icon:'🌐',t:'Website',v:'www.eci.gov.in'},{icon:'📍',t:'Address',v:'Nirvachan Sadan, New Delhi'}].map((c,i)=>(
            <div key={i} style={{display:'flex',gap:12,alignItems:'flex-start'}}>
              <span style={{fontSize:'1.5rem'}}>{c.icon}</span>
              <div><div style={{fontSize:'.75rem',color:'#6b7fa8'}}>{c.t}</div><div style={{fontSize:'.9rem',color:'#e8eaf0',fontWeight:500}}>{c.v}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
