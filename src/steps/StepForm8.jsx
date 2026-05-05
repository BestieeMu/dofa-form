import { useForm } from '../FormContext.jsx';
export default function StepForm8() {
  const { handleChange, handleCheckboxChange, checkboxChecked, getDeep } = useForm();
  return (<section className="card">
    <div className="step-header"><div className="step-icon">📄</div><div><h2>Form 8 — Release of Information (ROI)</h2><p className="step-desc">Authorization for information disclosure</p></div></div>
    <div className="grid">
      <div><label className="required">Participant Full Name</label><input name="roi.participantFullName" value={getDeep('roi.participantFullName') || ''} onChange={handleChange} /></div>
      <div><label className="required">Date of Birth</label><input type="date" name="roi.dateOfBirth" value={getDeep('roi.dateOfBirth') || ''} onChange={handleChange} /></div>
      <div><label className="required">Name / Organization</label><input name="roi.nameOrganization" value={getDeep('roi.nameOrganization') || ''} onChange={handleChange} /></div>
      <div><label>Title / Position</label><input name="roi.titlePosition" value={getDeep('roi.titlePosition') || ''} onChange={handleChange} /></div>
      <div><label>Phone Number</label><input name="roi.phoneNumber" value={getDeep('roi.phoneNumber') || ''} onChange={handleChange} /></div>
      <div><label>Fax Number</label><input name="roi.faxNumber" value={getDeep('roi.faxNumber') || ''} onChange={handleChange} /></div>
      <div style={{gridColumn:'1 / -1'}}><label>Address</label><input name="roi.address" value={getDeep('roi.address') || ''} onChange={handleChange} /></div>
    </div>
    <h3>Type of Information to Be Released</h3>
    <div className="checkboxes">{['Discharge Summary','History and Physical Exam','Consultation Reports','Reports of Operation','Medication Records','Imaging / Lab Reports','Nursing Notes','Psychological / Psychiatric Records','ISP / Support Plan','Other'].map(o => (<label key={o}><input type="checkbox" checked={checkboxChecked('roi.informationTypes', o)} onChange={() => handleCheckboxChange('roi.informationTypes', o)} />{o}</label>))}</div>
    <h3>Sensitive Information Releases</h3>
    <div className="grid">
      {[{label:'HIV / AIDS Treatment Information',name:'roi.hivAidsTreatment'},{label:'Mental Health Records',name:'roi.mentalHealthRecords'},{label:'Substance / Alcohol Abuse Treatment',name:'roi.substanceAlcoholTreatment'},{label:'Records from Another Provider',name:'roi.recordsFromAnotherProvider'}].map(f => (<div key={f.name}><label>{f.label}</label><select name={f.name} value={getDeep(f.name) || ''} onChange={handleChange}><option value=""> </option><option>Authorize</option><option>Do NOT Release</option></select></div>))}
      <div><label>Authorization Effective Date</label><input type="date" name="roi.effectiveDate" value={getDeep('roi.effectiveDate') || ''} onChange={handleChange} /></div>
      <div><label>Authorization Expiration Date</label><input type="date" name="roi.expirationDate" value={getDeep('roi.expirationDate') || ''} onChange={handleChange} /></div>
      <div style={{gridColumn:'1 / -1'}}><label>Purpose of Disclosure</label>
        <div className="checkboxes">{['At my request','Healthcare / Treatment','Payment / Insurance','Coordination of Services','Employment','Other'].map(o => (<label key={o}><input type="checkbox" checked={checkboxChecked('roi.purposeOfDisclosure', o)} onChange={() => handleCheckboxChange('roi.purposeOfDisclosure', o)} />{o}</label>))}</div>
      </div>
      <div><label>Signature</label><input name="roi.signature" value={getDeep('roi.signature') || ''} onChange={handleChange} /></div>
      <div><label>Date</label><input type="date" name="roi.signatureDate" value={getDeep('roi.signatureDate') || ''} onChange={handleChange} /></div>
      <div><label>Staff Signature</label><input name="roi.staffSignature" value={getDeep('roi.staffSignature') || ''} onChange={handleChange} /></div>
      <div><label>Printed Name</label><input name="roi.printedName" value={getDeep('roi.printedName') || ''} onChange={handleChange} /></div>
      <div><label>Relationship</label><input name="roi.relationship" value={getDeep('roi.relationship') || ''} onChange={handleChange} /></div>
    </div>
  </section>);
}
