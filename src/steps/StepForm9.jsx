import { useForm } from '../FormContext.jsx';
import SignatureInput from '../components/SignatureInput.jsx';

export default function StepForm9() {
  const { handleChange, getDeep } = useForm();

  return (<section className="card">
    <div className="step-header"><div className="step-icon">10</div><div><h2>Rights & Responsibilities Acknowledgement</h2><p className="step-desc">Final acknowledgement from participant or representative</p></div></div>
    <div className="notice">By signing, the participant or representative acknowledges that the Rights and Responsibilities have been received, read or explained, and understood.</div>
    <div className="grid">
      <SignatureInput name="rights.signature" label="Participant / Representative Signature" />
      <div><label>Date</label><input type="date" name="rights.date" value={getDeep('rights.date') || ''} onChange={handleChange} /></div>
      <div><label>Printed Name</label><input name="rights.printedName" value={getDeep('rights.printedName') || ''} onChange={handleChange} /></div>
      <div><label>Relationship</label><input name="rights.relationship" value={getDeep('rights.relationship') || ''} onChange={handleChange} /></div>
    </div>
  </section>);
}
