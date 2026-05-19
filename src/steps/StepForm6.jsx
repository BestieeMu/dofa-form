import { useForm } from '../FormContext.jsx';

const serviceFields = [
  ['placement.group_home', 'Group Home'],
  ['placement.supported_living', 'Supported Living'],
  ['placement.community_development_service', 'Community Development Service'],
  ['placement.day_habilitation', 'Day Habilitation'],
  ['placement.v', 'Vocational / Employment Support'],
  ['placement.behavioral_support', 'Behavioral Support'],
  ['placement.family_caregiver', 'Family / Caregiver Support'],
  ['placement.respite', 'Respite'],
];

export default function StepForm6() {
  const { handleChange, handleBooleanChange, getDeep } = useForm();

  return (<section className="card">
    <div className="step-header"><div className="step-icon">7</div><div><h2>Residential Placement Agreement</h2><p className="step-desc">Placement details and services to be provided</p></div></div>
    <p>This agreement is entered into between DOFA Pathways and the participant and/or their authorized representative for residential services.</p>
    <h3>Placement Details</h3>
    <div className="grid">
      <div><label>Participant Name</label><input name="placement.participantName" value={getDeep('placement.participantName') || ''} onChange={handleChange} /></div>
      <div><label>Placement Start Date</label><input type="date" name="placement.placementStartDate" value={getDeep('placement.placementStartDate') || ''} onChange={handleChange} /></div>
      <div style={{ gridColumn: '1 / -1' }}><label>Residence / Home Address</label><input name="placement.residenceHomeAddress" value={getDeep('placement.residenceHomeAddress') || ''} onChange={handleChange} /></div>
    </div>
    <h3>Services to Be Provided</h3>
    <div className="checkboxes">
      {serviceFields.map(([name, label]) => (<label key={name}><input type="checkbox" checked={!!getDeep(name)} onChange={(e) => handleBooleanChange(name, e.target.checked)} />{label}</label>))}
    </div>
  </section>);
}
