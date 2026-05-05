import { useForm } from '../FormContext.jsx';
export default function StepForm4() {
  const { handleChange, handleCheckboxChange, checkboxChecked, getDeep } = useForm();
  return (<section className="card">
    <div className="step-header"><div className="step-icon">⚠️</div><div><h2>Form 4 — Risk Screening</h2><p className="step-desc">All responses are confidential</p></div></div>
    <p>This section helps ensure we provide the appropriate level of support.</p>
    <div className="checkboxes">
      {['History of psychiatric hospitalization','Current behavioral concerns or incidents','Medical fragility / complex medical needs','High supervision needs (24-hr or 1:1)','History of self-injurious behavior','Aggression toward others','Elopement risk','Substance use history','History of trauma / abuse','Involvement with criminal justice system','None of the above','Other'].map(o => (<label key={o}><input type="checkbox" checked={checkboxChecked('risk.indicators', o)} onChange={() => handleCheckboxChange('risk.indicators', o)} />{o}</label>))}
    </div>
    <div className="grid">
      <div style={{gridColumn:'1 / -1'}}><label>Describe any checked risk indicators (dates, frequency, context, current status)</label><textarea name="risk.description" value={getDeep('risk.description') || ''} onChange={handleChange} /></div>
      <div><label>Other Risk Indicator</label><input name="risk.otherIndicator" value={getDeep('risk.otherIndicator') || ''} onChange={handleChange} placeholder="If checked 'Other', describe here" /></div>
      <div><label>Overall Risk Level Assessment</label><select name="risk.overallRiskLevel" value={getDeep('risk.overallRiskLevel') || ''} onChange={handleChange}><option value=""> </option><option>Low</option><option>Moderate</option><option>High</option><option>Requires Clinical Review</option></select></div>
      <div><label>Clinical / High-Support Section Required?</label><select name="risk.form5Required" value={getDeep('risk.form5Required') || ''} onChange={handleChange}><option value=""> </option><option>Yes — proceed to Form 5</option><option>No — skip to Form 6</option></select></div>
    </div>
  </section>);
}
