import { useForm } from '../FormContext.jsx';

export default function StepForm7() {
  const { handleChange, getDeep } = useForm();

  return (<section className="card">
    <div className="step-header"><div className="step-icon">8</div><div><h2>Consent for Services & HIPAA Acknowledgement</h2><p className="step-desc">Participant and staff witness information</p></div></div>
    <div className="notice">Participant acknowledges receipt of privacy practices and consents to services as described in the revised intake template.</div>
    <div className="grid">
      <div><label>Participant / Authorized Representative Signature</label><input name="consent.participantSignature" value={getDeep('consent.participantSignature') || ''} onChange={handleChange} /></div>
      <div><label>Signature Date</label><input type="date" name="consent.signatureDate" value={getDeep('consent.signatureDate') || ''} onChange={handleChange} /></div>
      <div><label>Printed Name</label><input name="consent.printedName" value={getDeep('consent.printedName') || ''} onChange={handleChange} /></div>
      <div><label>Participant Phone Number</label><input name="consent.ParticipantNum" value={getDeep('consent.ParticipantNum') || ''} onChange={handleChange} /></div>
      <div style={{ gridColumn: '1 / -1' }}><label>Participant Address</label><input name="consent.ParticipantAdress" value={getDeep('consent.ParticipantAdress') || ''} onChange={handleChange} /></div>
      <div><label>Staff Witness Signature</label><input name="consent.staffWitnessSignature" value={getDeep('consent.staffWitnessSignature') || ''} onChange={handleChange} /></div>
      <div><label>Staff Witness Name</label><input name="consent.staffWitnessName" value={getDeep('consent.staffWitnessName') || ''} onChange={handleChange} /></div>
      <div><label>Staff Witness Title</label><input name="consent.staffWitnessTitle" value={getDeep('consent.staffWitnessTitle') || ''} onChange={handleChange} /></div>
      <div><label>Staff Witness Date</label><input type="date" name="consent.staffWitnessDate" value={getDeep('consent.staffWitnessDate') || ''} onChange={handleChange} /></div>
    </div>
  </section>);
}
