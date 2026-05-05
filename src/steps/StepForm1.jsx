import { useForm } from '../FormContext.jsx';
export default function StepForm1() {
  const { handleChange, handleCheckboxChange, checkboxChecked, getDeep, errors } = useForm();
  const E = ({ name }) => errors[name] ? <div className="error-message">{errors[name]}</div> : null;
  const ec = (name) => errors[name] ? 'field-error' : '';
  return (<section className="card">
    <div className="step-header"><div className="step-icon">👤</div><div><h2>Form 1 — Participant Information & Demographics</h2><p className="step-desc">Please complete all required fields</p></div></div>
    <h3>Personal Information</h3>
    <div className="grid">
      <div><label className="required">Full Legal Name</label><input className={ec('participant.fullLegalName')} name="participant.fullLegalName" value={getDeep('participant.fullLegalName') || ''} onChange={handleChange} required /><E name="participant.fullLegalName" /></div>
      <div><label>Preferred Name / Nickname</label><input name="participant.preferredName" value={getDeep('participant.preferredName') || ''} onChange={handleChange} /></div>
      <div><label className="required">Date of Birth</label><input className={ec('participant.dateOfBirth')} type="date" name="participant.dateOfBirth" value={getDeep('participant.dateOfBirth') || ''} onChange={handleChange} required /><E name="participant.dateOfBirth" /></div>
      <div><label>Social Security # Last 4 Digits</label><input name="participant.ssnLast4" value={getDeep('participant.ssnLast4') || ''} maxLength="4" onChange={handleChange} /></div>
      <div><label>Gender Identity</label><input name="participant.genderIdentity" value={getDeep('participant.genderIdentity') || ''} onChange={handleChange} /></div>
      <div><label>Pronouns</label><input name="participant.pronouns" value={getDeep('participant.pronouns') || ''} onChange={handleChange} /></div>
    </div>
    <h3>Race / Ethnicity</h3>
    <div className="checkboxes">
      {['American Indian / Alaska Native','Asian','Black / African American','Hispanic / Latino','Native Hawaiian / Pacific Islander','White','Two or more races','Prefer not to say'].map(o => (<label key={o}><input type="checkbox" checked={checkboxChecked('participant.raceEthnicity', o)} onChange={() => handleCheckboxChange('participant.raceEthnicity', o)} />{o}</label>))}
    </div>
    <h3>Contact Information</h3>
    <div className="grid">
      <div><label className="required">Current Address (Street, City, State, ZIP)</label><input className={ec('participant.currentAddress')} name="participant.currentAddress" value={getDeep('participant.currentAddress') || ''} onChange={handleChange} required /><E name="participant.currentAddress" /></div>
      <div><label className="required">Primary Phone</label><input className={ec('participant.primaryPhone')} name="participant.primaryPhone" value={getDeep('participant.primaryPhone') || ''} onChange={handleChange} required /><E name="participant.primaryPhone" /></div>
      <div><label>Alternate Phone</label><input name="participant.alternatePhone" value={getDeep('participant.alternatePhone') || ''} onChange={handleChange} /></div>
      <div><label>Email Address</label><input type="email" name="participant.email" value={getDeep('participant.email') || ''} onChange={handleChange} /></div>
      <div><label>Preferred Contact Method</label><input name="participant.preferredContactMethod" value={getDeep('participant.preferredContactMethod') || ''} onChange={handleChange} /></div>
    </div>
    <h3>Housing & Background</h3>
    <div className="grid">
      <div><label>Current Housing Status</label><input name="participant.currentHousingStatus" value={getDeep('participant.currentHousingStatus') || ''} onChange={handleChange} /></div>
      <div><label>Education Level</label><input name="participant.educationLevel" value={getDeep('participant.educationLevel') || ''} onChange={handleChange} /></div>
      <div><label>Employment Status</label><input name="participant.employmentStatus" value={getDeep('participant.employmentStatus') || ''} onChange={handleChange} /></div>
      <div><label>Primary Language</label><input name="participant.primaryLanguage" value={getDeep('participant.primaryLanguage') || ''} onChange={handleChange} /></div>
      <div><label>Medicaid ID #</label><input name="participant.medicaidId" value={getDeep('participant.medicaidId') || ''} onChange={handleChange} /></div>
      <div><label>Medicare ID #</label><input name="participant.medicareId" value={getDeep('participant.medicareId') || ''} onChange={handleChange} /></div>
      <div><label>Primary Insurance / Payer</label><input name="participant.primaryInsurance" value={getDeep('participant.primaryInsurance') || ''} onChange={handleChange} /></div>
      <div><label>Policy / Member ID</label><input name="participant.policyMemberId" value={getDeep('participant.policyMemberId') || ''} onChange={handleChange} /></div>
    </div>
    <p className="small">* Required field</p>
  </section>);
}
