import { useForm } from '../FormContext.jsx';
export default function StepForm3() {
  const { handleChange, handleCheckboxChange, checkboxChecked, getDeep, errors } = useForm();
  const E = ({ name }) => errors[name] ? <div className="error-message">{errors[name]}</div> : null;
  const ec = (name) => errors[name] ? 'field-error' : '';
  return (<section className="card">
    <div className="step-header"><div className="step-icon">🎯</div><div><h2>Form 3 — Referral, Program Interest & Goals</h2><p className="step-desc">Tell us about the referral and your goals</p></div></div>
    <div className="grid">
      <div><label className="required">Referral Source</label><input className={ec('referral.referralSource')} name="referral.referralSource" value={getDeep('referral.referralSource') || ''} onChange={handleChange} required /><E name="referral.referralSource" /></div>
      <div><label>Referring Agency / Person</label><input name="referral.referringAgencyPerson" value={getDeep('referral.referringAgencyPerson') || ''} onChange={handleChange} /></div>
      <div><label>Referral Date</label><input type="date" name="referral.referralDate" value={getDeep('referral.referralDate') || ''} onChange={handleChange} /></div>
      <div><label>Referral Contact Phone</label><input name="referral.referralContactPhone" value={getDeep('referral.referralContactPhone') || ''} onChange={handleChange} /></div>
      <div style={{gridColumn:'1 / -1'}}><label>Reason for Seeking Residential Services</label><textarea name="referral.reason" value={getDeep('referral.reason') || ''} onChange={handleChange} /></div>
    </div>
    <h3>Programs of Interest</h3>
    <div className="checkboxes">
      {['Group Home / Residential Habilitation','Supported Living','Community Development Services (CDS)','Day Habilitation','Employment / Vocational Support','Behavioral Support Services','Family / Caregiver Support','Respite Services'].map(o => (<label key={o}><input type="checkbox" checked={checkboxChecked('referral.programsOfInterest', o)} onChange={() => handleCheckboxChange('referral.programsOfInterest', o)} />{o}</label>))}
    </div>
    <h3>Current Needs & Goals</h3>
    <div className="grid">
      <div><label>Housing Status at Referral</label><input name="referral.housingStatusAtReferral" value={getDeep('referral.housingStatusAtReferral') || ''} onChange={handleChange} /></div>
      <div><label>Income Source(s)</label><input name="referral.incomeSources" value={getDeep('referral.incomeSources') || ''} onChange={handleChange} /></div>
      <div style={{gridColumn:'1 / -1'}}><label>Short-Term Goals (0–6 months)</label><textarea name="referral.shortTermGoals" value={getDeep('referral.shortTermGoals') || ''} onChange={handleChange} /></div>
      <div style={{gridColumn:'1 / -1'}}><label>Long-Term Goals (6+ months)</label><textarea name="referral.longTermGoals" value={getDeep('referral.longTermGoals') || ''} onChange={handleChange} /></div>
    </div>
    <div className="checkboxes">
      {['Personal Care / ADLs','Medication Management','Meal Preparation / Nutrition','Transportation','Community Integration','Social Skills','Financial Management','Health & Wellness','Communication Support','Behavioral Support','Employment / Education','Family Relationships'].map(o => (<label key={o}><input type="checkbox" checked={checkboxChecked('referral.areasOfSupportNeeded', o)} onChange={() => handleCheckboxChange('referral.areasOfSupportNeeded', o)} />{o}</label>))}
    </div>
  </section>);
}
