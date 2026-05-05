import { useForm } from '../FormContext.jsx';
export default function StepForm5() {
  const { handleChange, handleCheckboxChange, checkboxChecked, getDeep } = useForm();
  return (<section className="card">
    <div className="step-header"><div className="step-icon">🏥</div><div><h2>Form 5 — Clinical / High-Support Needs Assessment</h2><p className="step-desc">Complete only if indicated on Form 4</p></div></div>
    <div className="grid">
      <div style={{gridColumn:'1 / -1'}}><label>Primary Diagnosis / Diagnoses (ICD codes if available)</label><textarea name="clinical.primaryDiagnoses" value={getDeep('clinical.primaryDiagnoses') || ''} onChange={handleChange} /></div>
      <div style={{gridColumn:'1 / -1'}}><label>Known Allergies (medications, food, environmental)</label><textarea name="clinical.knownAllergies" value={getDeep('clinical.knownAllergies') || ''} onChange={handleChange} /></div>
    </div>
    <h3>Dietary Needs</h3>
    <p>Does the participant have special dietary needs?</p>
    <div className="checkboxes">
      {['No restrictions','Texture-modified diet','Low sodium','Diabetic diet','Vegetarian / Vegan','Religious dietary restrictions','Other'].map(o => (<label key={o}><input type="checkbox" checked={checkboxChecked('clinical.dietaryNeeds', o)} onChange={() => handleCheckboxChange('clinical.dietaryNeeds', o)} />{o}</label>))}
    </div>
    <div className="grid">
      <div style={{gridColumn:'1 / -1'}}><label>Dietary Details / Restrictions</label><textarea name="clinical.dietaryDetails" value={getDeep('clinical.dietaryDetails') || ''} onChange={handleChange} /></div>
      <div><label>Daily Living Support Level Required:</label><select name="clinical.dailyLivingSupportLevel" value={getDeep('clinical.dailyLivingSupportLevel') || ''} onChange={handleChange}><option value=""> </option><option>Independent</option><option>Minimal Assistance</option><option>Moderate Assistance</option><option>Extensive Assistance</option><option>Total Assistance</option></select></div>
      <div><label>Mobility Needs:</label><select name="clinical.mobilityNeeds" value={getDeep('clinical.mobilityNeeds') || ''} onChange={handleChange}><option value=""> </option><option>Ambulatory — independent</option><option>Ambulatory — with device</option><option>Wheelchair — self-propelled</option><option>Wheelchair — dependent</option><option>Bed-bound / transfer required</option></select></div>
    </div>
    <h3>Assistive Devices / Equipment:</h3>
    <div className="checkboxes">
      {['None','Wheelchair','Walker / Cane','Hearing Aid','Communication Device (AAC)','Feeding Tube / PEG','Oxygen','CPAP / BiPAP','Catheter','Other'].map(o => (<label key={o}><input type="checkbox" checked={checkboxChecked('clinical.assistiveDevices', o)} onChange={() => handleCheckboxChange('clinical.assistiveDevices', o)} />{o}</label>))}
    </div>
    <h3>Communication & Supervision</h3>
    <div className="grid">
      <div><label>Primary Communication Method</label><input name="clinical.primaryCommunicationMethod" value={getDeep('clinical.primaryCommunicationMethod') || ''} onChange={handleChange} /></div>
      <div><label>Supervision Level Required</label><input name="clinical.supervisionLevelRequired" value={getDeep('clinical.supervisionLevelRequired') || ''} onChange={handleChange} /></div>
      <div style={{gridColumn:'1 / -1'}}><label>Communication Needs / Special Instructions</label><textarea name="clinical.communicationNeeds" value={getDeep('clinical.communicationNeeds') || ''} onChange={handleChange} /></div>
      <div style={{gridColumn:'1 / -1'}}><label>Behavioral Safety Considerations (triggers, de-escalation strategies, behavioral support plan on file?)</label><textarea name="clinical.behavioralSafetyConsiderations" value={getDeep('clinical.behavioralSafetyConsiderations') || ''} onChange={handleChange} /></div>
      <div><label>Code Status</label><select name="clinical.codeStatus" value={getDeep('clinical.codeStatus') || ''} onChange={handleChange}><option value=""> </option><option>Full Code</option><option>DNR — on file</option><option>DNI</option><option>Comfort Care Only</option><option>Unknown / Not established</option></select></div>
      <div><label>Additional Clinical Notes</label><input name="clinical.additionalClinicalNotes" value={getDeep('clinical.additionalClinicalNotes') || ''} onChange={handleChange} /></div>
    </div>
  </section>);
}
