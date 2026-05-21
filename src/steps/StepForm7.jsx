import { useForm } from '../FormContext.jsx';
import SignatureInput from '../components/SignatureInput.jsx';

export default function StepForm7() {
  const { handleChange, handleBooleanChange, getDeep } = useForm();

  const wantsCopy = getDeep('meta.sendCopyToEmail') === true;

  return (
    <>
      <section className="card">
        <div className="step-header"><div className="step-icon">8</div><div><h2>Consent for Services & HIPAA Acknowledgement</h2><p className="step-desc">Participant and staff witness information</p></div></div>
        <div className="notice">Participant acknowledges receipt of privacy practices and consents to services as described in the revised intake template.</div>
        <div className="grid">
          <SignatureInput name="consent.participantSignature" label="Participant / Authorized Representative Signature" />
          <div><label>Signature Date</label><input type="date" name="consent.signatureDate" value={getDeep('consent.signatureDate') || ''} onChange={handleChange} /></div>
          <div><label>Printed Name</label><input name="consent.printedName" value={getDeep('consent.printedName') || ''} onChange={handleChange} /></div>
          <div><label>Participant Phone Number</label><input name="consent.ParticipantNum" value={getDeep('consent.ParticipantNum') || ''} onChange={handleChange} /></div>
          <div style={{ gridColumn: '1 / -1' }}><label>Participant Address</label><input name="consent.ParticipantAdress" value={getDeep('consent.ParticipantAdress') || ''} onChange={handleChange} /></div>
          <SignatureInput name="consent.staffWitnessSignature" label="Staff Witness Signature" />
          <div><label>Staff Witness Name</label><input name="consent.staffWitnessName" value={getDeep('consent.staffWitnessName') || ''} onChange={handleChange} /></div>
          <div><label>Staff Witness Title</label><input name="consent.staffWitnessTitle" value={getDeep('consent.staffWitnessTitle') || ''} onChange={handleChange} /></div>
          <div><label>Staff Witness Date</label><input type="date" name="consent.staffWitnessDate" value={getDeep('consent.staffWitnessDate') || ''} onChange={handleChange} /></div>
        </div>
      </section>

      {/* ── Email copy opt-in ───────────────────────────────────────────── */}
      <section className="card copy-email-card">
        <div className="copy-email-header">
          <span className="copy-email-icon">✉</span>
          <div>
            <h3 className="copy-email-title">Receive a Copy of This Form</h3>
            <p className="copy-email-subtitle">Optional — we'll email you a PDF copy of your completed intake form once it's submitted.</p>
          </div>
        </div>

        <label className="copy-email-checkbox-label">
          <input
            type="checkbox"
            className="copy-email-checkbox"
            checked={wantsCopy}
            onChange={(e) => handleBooleanChange('meta.sendCopyToEmail', e.target.checked)}
          />
          <span>Yes, send me a copy of this form by email</span>
        </label>

        {wantsCopy && (
          <div className="copy-email-field">
            <label htmlFor="meta-copyEmail">Email Address <span className="required-star">*</span></label>
            <input
              id="meta-copyEmail"
              type="email"
              name="meta.copyEmail"
              value={getDeep('meta.copyEmail') || ''}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
            />
            <p className="copy-email-note">Your copy will be sent as a PDF attachment after successful submission.</p>
          </div>
        )}
      </section>
    </>
  );
}
