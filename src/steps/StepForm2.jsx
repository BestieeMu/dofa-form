import { useForm } from '../FormContext.jsx';

export default function StepForm2() {
  const { handleChange, handleBooleanChange, handleCheckboxChange, checkboxChecked, getDeep, errors } = useForm();
  const E = ({ name }) => errors[name] ? <div className="error-message">{errors[name]}</div> : null;
  const ec = (name) => errors[name] ? 'field-error' : '';
  const setGuardianChoice = (selectedName, otherName, checked) => {
    handleBooleanChange(selectedName, checked);
    if (checked) handleBooleanChange(otherName, false);
  };

  return (<section className="card">
    <div className="step-header"><div className="step-icon">5</div><div><h2>Emergency Contact & Guardian Information</h2><p className="step-desc">Emergency and legal guardian details</p></div></div>
    <div className="grid">
      <div><label className="required">Emergency Contact Full Name</label><input className={ec('emergency.contactFullName')} name="emergency.contactFullName" value={getDeep('emergency.contactFullName') || ''} onChange={handleChange} /><E name="emergency.contactFullName" /></div>
      <div><label className="required">Relationship to Participant</label><input className={ec('emergency.relationship')} name="emergency.relationship" value={getDeep('emergency.relationship') || ''} onChange={handleChange} /><E name="emergency.relationship" /></div>
      <div><label className="required">Primary Phone</label><input className={ec('emergency.primaryPhone')} name="emergency.primaryPhone" value={getDeep('emergency.primaryPhone') || ''} onChange={handleChange} /><E name="emergency.primaryPhone" /></div>
      <div><label>Alternate Phone</label><input name="emergency.alternatePhone" value={getDeep('emergency.alternatePhone') || ''} onChange={handleChange} /></div>
      <div style={{ gridColumn: '1 / -1' }}><label>Address</label><input name="emergency.address" value={getDeep('emergency.address') || ''} onChange={handleChange} /></div>
    </div>
    <h3>Legal Guardian / Authorized Representative</h3>
    <div className="checkboxes single-check">
      <label><input type="checkbox" checked={!!getDeep('emergency.hasGuardian')} onChange={(e) => setGuardianChoice('emergency.hasGuardian', 'emergency.hasNoGuardian', e.target.checked)} />Yes</label>
      <label><input type="checkbox" checked={!!getDeep('emergency.hasNoGuardian')} onChange={(e) => setGuardianChoice('emergency.hasNoGuardian', 'emergency.hasGuardian', e.target.checked)} />No</label>
    </div>
    <div className="grid">
      <div><p >If YES, complete the following: </p></div>
      <div></div>
      <div><label>Guardian / Representative Full Name</label><input name="emergency.guardianFullName" value={getDeep('emergency.guardianFullName') || ''} onChange={handleChange} /></div>
      <div><label>Relationship</label><input name="emergency.guardianRelationship" value={getDeep('emergency.guardianRelationship') || ''} onChange={handleChange} /></div>
      <div><label>Primary Phone</label><input name="emergency.guardianPhone" value={getDeep('emergency.guardianPhone') || ''} onChange={handleChange} /></div>
      <div><label>Email</label><input type="email" name="emergency.guardianEmail" value={getDeep('emergency.guardianEmail') || ''} onChange={handleChange} /></div>
      <div style={{ gridColumn: '1 / -1' }}><label>Mailing Address</label><input name="emergency.guardianMailingAddress" value={getDeep('emergency.guardianMailingAddress') || ''} onChange={handleChange} /></div>
      <div style={{ gridColumn: '1 / -1' }}><label>Legal Authority / Scope</label><textarea name="emergency.legalAuthority" value={getDeep('emergency.legalAuthority') || ''} onChange={handleChange} /></div>
    </div>
    <h3>Documentation</h3>
    <div className="checkboxes">
      {['Power of Attorney on file', 'Guardianship Order on file', 'Healthcare Proxy on file', 'None - participant self-directs'].map(o => (<label key={o}><input type="checkbox" checked={checkboxChecked('emergency.documentation', o)} onChange={() => handleCheckboxChange('emergency.documentation', o)} />{o}</label>))}
    </div>
  </section>);
}
