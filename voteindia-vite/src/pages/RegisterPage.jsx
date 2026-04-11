import React, { useState } from 'react'
import { STATES } from '../data/data.js'
import { registerUser, saveSession } from '../api.js'

export default function RegisterPage({ nav }) {
  const [step, setStep] = useState(1)
  const [ack, setAck] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '', dob: '', gender: '', category: '', aadhaar: '', mobile: '',
    state: '', constituency: '', address: '', district: '', pin: '', password: ''
  })

  const steps = ['Personal Info','Address & Security','Done']
  
  const next = async () => {
    if (step === 2) {
      if (!ack) return alert('Please agree to the declaration');
      setLoading(true);
      try {
        const res  = await registerUser(formData);
        const data = await res.json();
        setLoading(false);
        if (res.ok) {
          // Auto-login: save token so user is authenticated immediately
          if (data.token) saveSession(data.token, data.user);
          setStep(3);
        } else {
          alert(data.message || 'Registration failed');
        }
      } catch (err) {
        setLoading(false);
        alert('Network error — make sure the server is running.');
      }
    } else if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="page" style={{paddingTop:'2rem'}}>
      <div className="form-card" style={{maxWidth:560}}>
        <div style={{textAlign:'center',marginBottom:'1.5rem'}}>
          <div style={{fontSize:'2rem',marginBottom:8}}>📝</div>
          <div className="form-title">Voter Registration</div>
          <div className="form-sub">Register to exercise your democratic right</div>
        </div>

        <div className="steps-bar">
          {steps.map((s,i) => (
            <React.Fragment key={i}>
              <div className="step-item">
                <div className={`step-circle${i<step?' done':i===step-1?' active':''}`}>{i<step?'✓':i+1}</div>
                <div className="step-label">{s}</div>
              </div>
              {i<steps.length-1 && <div className={`step-line${i<step-1?' done':''}`} />}
            </React.Fragment>
          ))}
        </div>

        {step===1 && <>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Full Name</label><input name="name" value={formData.name} onChange={handleChange} className="form-input" placeholder="As per Aadhaar" /></div>
            <div className="form-group"><label className="form-label">Date of Birth</label><input name="dob" value={formData.dob} onChange={handleChange} className="form-input" type="date" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Gender</label><select name="gender" value={formData.gender} onChange={handleChange} className="form-select"><option>Male</option><option>Female</option><option>Other</option></select></div>
            <div className="form-group"><label className="form-label">Category</label><select name="category" value={formData.category} onChange={handleChange} className="form-select"><option>General</option><option>OBC</option><option>SC</option><option>ST</option></select></div>
          </div>
          <div className="form-group"><label className="form-label">Aadhaar Number</label><input name="aadhaar" value={formData.aadhaar} onChange={handleChange} className="form-input" placeholder="XXXX XXXX XXXX" maxLength={14} /></div>
          <div className="form-group"><label className="form-label">Mobile Number</label><input name="mobile" value={formData.mobile} onChange={handleChange} className="form-input" placeholder="+91 XXXXXXXXXX" /></div>
        </>}

        {step===2 && <>
          <div className="form-group">
            <label className="form-label">State / UT</label>
            <select name="state" value={formData.state} onChange={handleChange} className="form-select"><option value="">Select State</option>{STATES.map(s=><option key={s}>{s}</option>)}</select>
          </div>
          <div className="form-group">
            <label className="form-label">Parliamentary Constituency</label>
            <select name="constituency" value={formData.constituency} onChange={handleChange} className="form-select"><option value="">Select Constituency</option><option>Varanasi</option><option>Lucknow</option><option>Gorakhpur</option><option>Allahabad</option></select>
          </div>
          <div className="form-group"><label className="form-label">Residential Address</label><textarea name="address" value={formData.address} onChange={handleChange} className="form-input" rows={3} placeholder="House No., Street, Village/Town" /></div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">District</label><input name="district" value={formData.district} onChange={handleChange} className="form-input" placeholder="District" /></div>
            <div className="form-group"><label className="form-label">PIN Code</label><input name="pin" value={formData.pin} onChange={handleChange} className="form-input" placeholder="6-digit PIN" maxLength={6} /></div>
          </div>
          <div className="form-group" style={{marginTop:'1rem'}}><label className="form-label">Set 6-digit MPIN</label><input name="password" value={formData.password} onChange={handleChange} className="form-input" type="password" placeholder="Create secure MPIN" maxLength={6} /></div>
          <div style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:'.8rem',color:'#6b7fa8',marginTop:'.5rem'}}>
            <input type="checkbox" style={{marginTop:2}} checked={ack} onChange={e=>setAck(e.target.checked)} />
            <span>I declare the information is correct and I am an Indian citizen above 18 years of age.</span>
          </div>
        </>}

        {step===3 && (
          <div className="success-screen">
            <div className="success-icon">🎉</div>
            <div className="success-title">Registration Submitted!</div>
            <div className="success-sub">Your application has been sent to the Electoral Roll Officer. You will receive your Voter ID within 7-10 working days.</div>
            <div className="receipt-box">
              <div className="receipt-row"><span style={{color:'#6b7fa8'}}>Reference No.</span><span style={{color:'#FF9933'}}>ECI/2026/847291</span></div>
              <div className="receipt-row"><span style={{color:'#6b7fa8'}}>Status</span><span style={{color:'#27c211'}}>Under Review</span></div>
              <div className="receipt-row"><span style={{color:'#6b7fa8'}}>Expected</span><span>7-10 days</span></div>
            </div>
            <button className="btn btn-primary" style={{marginTop:'1.5rem'}} onClick={() => nav('login')}>Go to Login</button>
          </div>
        )}

        {step<3 && <button className="btn btn-primary btn-full" style={{marginTop:'1.5rem'}} disabled={loading} onClick={next}>{loading ? 'Processing...' : (step===2?'Submit Registration':'Continue →')}</button>}
        {step===1 && <div style={{textAlign:'center',marginTop:'1rem',fontSize:'.85rem',color:'#6b7fa8'}}>Already registered? <span className="text-link" onClick={()=>nav('login')}>Login here</span></div>}
      </div>
    </div>
  )
}
