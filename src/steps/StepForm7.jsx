import { useForm } from '../FormContext.jsx';
export default function StepForm7() {
  const { handleChange, getDeep } = useForm();
  return (<section className="card">
    <div className="step-header"><div className="step-icon">🔒</div><div><h2>Form 7 — Consent for Services & HIPAA Acknowledgement</h2><p className="step-desc">Privacy practices acknowledgement</p></div></div>
    <div className="notice">Participant acknowledges receipt of the Notice of Privacy Practices and understands that PHI may be used or disclosed for treatment, payment, and healthcare operations as permitted by HIPAA.</div>
    <div className="grid">
      <div><label>Consent Scope / Duration</label><select name="consent.scopeDuration" value={getDeep('consent.scopeDuration') || ''} onChange={handleChange}><option value=""> </option><option>Duration of placement</option><option>Specific period</option><option>Until revoked in writing</option></select></div>
      <div><label>Consent Start Date</label><input type="date" name="consent.startDate" value={getDeep('consent.startDate') || ''} onChange={handleChange} /></div>
      <div><label>Consent End Date</label><input type="date" name="consent.endDate" value={getDeep('consent.endDate') || ''} onChange={handleChange} /></div>
      <div><label>Participant / Authorized Representative Signature</label><input name="consent.participantSignature" value={getDeep('consent.participantSignature') || ''} onChange={handleChange} /></div>
      <div><label>Date</label><input type="date" name="consent.signatureDate" value={getDeep('consent.signatureDate') || ''} onChange={handleChange} /></div>
      <div><label>Staff Witness Signature</label><input name="consent.staffWitnessSignature" value={getDeep('consent.staffWitnessSignature') || ''} onChange={handleChange} /></div>
      <div><label>Printed Name</label><input name="consent.printedName" value={getDeep('consent.printedName') || ''} onChange={handleChange} /></div>
      <div><label>Relationship</label><input name="consent.relationship" value={getDeep('consent.relationship') || ''} onChange={handleChange} /></div>
    </div>
  </section>);
}
