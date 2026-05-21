import { useForm } from '../FormContext.jsx';
import SignatureInput from '../components/SignatureInput.jsx';

const sensitiveFields = [
  ['roi.mentalHealthRecords', 'roi.mentalHealthRecordsNo', 'Mental Health Records'],
  ['roi.hivAidsTreatment', 'roi.hivAidsTreatmentNo', 'HIV / AIDS Treatment'],
  ['roi.substanceAlcoholTreatment', 'roi.substanceAlcoholTreatmentNo', 'Substance / Alcohol Abuse Treatment'],
  ['roi.recordsFromAnotherProvider', 'roi.recordsFromAnotherProviderNo', 'Records from Another Provider'],
];

export default function StepForm8() {
  const { handleChange, handleBooleanChange, handleCheckboxChange, checkboxChecked, getDeep } = useForm();
  const setSensitiveChoice = (selectedName, otherName, checked) => {
    handleBooleanChange(selectedName, checked);
    if (checked) handleBooleanChange(otherName, false);
  };

  return (<section className="card">
    <div className="step-header"><div className="step-icon">9</div><div><h2>Release of Information (ROI)</h2><p className="step-desc">Authorization for information disclosure</p></div></div>
    <div className="grid">
      <div><label>Participant Full Name</label><input name="roi.participantFullName" value={getDeep('roi.participantFullName') || ''} onChange={handleChange} /></div>
      <div><label>Date of Birth</label><input type="date" name="roi.dateOfBirth" value={getDeep('roi.dateOfBirth') || ''} onChange={handleChange} /></div>
      <div><label>Name / Organization</label><input name="roi.nameOrganization" value={getDeep('roi.nameOrganization') || ''} onChange={handleChange} /></div>
      <div><label>Title / Position</label><input name="roi.titlePosition" value={getDeep('roi.titlePosition') || ''} onChange={handleChange} /></div>
      <div><label>Phone Number</label><input name="roi.phoneNumber" value={getDeep('roi.phoneNumber') || ''} onChange={handleChange} /></div>
      <div><label>Fax Number</label><input name="roi.faxNumber" value={getDeep('roi.faxNumber') || ''} onChange={handleChange} /></div>
      <div style={{ gridColumn: '1 / -1' }}><label>Address</label><input name="roi.address" value={getDeep('roi.address') || ''} onChange={handleChange} /></div>
    </div>
    <h3>Type of Information to Be Released</h3>
    <div className="checkboxes">{['Discharge Summary', 'History and Physical Exam', 'Consultation Reports', 'Reports of Operation', 'Medication Records', 'Imaging / Lab Reports', 'Nursing Notes', 'Psychological / Psychiatric Records', 'ISP / Support Plan', 'Other'].map(o => (<label key={o}><input type="checkbox" checked={checkboxChecked('roi.informationTypes', o)} onChange={() => handleCheckboxChange('roi.informationTypes', o)} />{o}</label>))}</div>
    <h3>Sensitive Information Releases</h3>
    <div className="grid">
      {sensitiveFields.map(([yesName, noName, label]) => (
        <div key={yesName} className="choice-row">
          <label>{label}</label>
          <div className="checkboxes single-check">
            <label><input type="checkbox" checked={!!getDeep(yesName)} onChange={(e) => setSensitiveChoice(yesName, noName, e.target.checked)} />Authorize</label>
            <label><input type="checkbox" checked={!!getDeep(noName)} onChange={(e) => setSensitiveChoice(noName, yesName, e.target.checked)} />Do Not Release</label>
          </div>
        </div>
      ))}
      <div><label>Authorization Effective Date</label><input type="date" name="roi.effectiveDate" value={getDeep('roi.effectiveDate') || ''} onChange={handleChange} /></div>
      <div><label>Authorization Expiration Date</label><input type="date" name="roi.expirationDate" value={getDeep('roi.expirationDate') || ''} onChange={handleChange} /></div>
    </div>
    <h3>Purpose of Disclosure</h3>
    <div className="checkboxes">{['At my request', 'Healthcare / Treatment', 'Payment / Insurance', 'Coordination of Services', 'Employment', 'Other'].map(o => (<label key={o}><input type="checkbox" checked={checkboxChecked('roi.purposeOfDisclosure', o)} onChange={() => handleCheckboxChange('roi.purposeOfDisclosure', o)} />{o}</label>))}</div>
    <h3>Signatures</h3>
    <div className="grid">
      <SignatureInput name="roi.signature" label="Participant / Authorized Representative Signature" />
      <div><label>Date</label><input type="date" name="roi.signatureDate" value={getDeep('roi.signatureDate') || ''} onChange={handleChange} /></div>
      <SignatureInput name="roi.staffSignature" label="Staff Signature" />
      <div><label>Printed Name</label><input name="roi.printedName" value={getDeep('roi.printedName') || ''} onChange={handleChange} /></div>
      <div><label>Relationship</label><input name="roi.relationship" value={getDeep('roi.relationship') || ''} onChange={handleChange} /></div>
    </div>
  </section>);
}
