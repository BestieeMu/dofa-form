import { useForm } from '../FormContext.jsx';

export default function StepWelcome() {
  const { handleChange, getDeep, errors } = useForm();
  const E = ({ name }) => errors[name] ? <div className="error-message">{errors[name]}</div> : null;
  const ec = (name) => errors[name] ? 'field-error' : '';

  return (<>
    <section className="card intro">
      <div className="step-header"><div className="step-icon">1</div><div><h2>New Admission Intake Package</h2><p className="step-desc">PDF page 1 - cover and agency contact information</p></div></div>
      <h3>DOFA PATHWAYS CORPORATION</h3>
      <p>Developing Opportunities For All</p>
      <p>10005 Old Columbia Rd, Suite L-261 | Columbia, MD 21046 | 301-356-8845</p>
      <p className="small">DOFA Pathways Corporation | Residential Services | New Admission Intake Package | Confidential</p>
    </section>

    <section className="card">
      <h2>New Admission Intake Package</h2>
      <div className="grid">
        <div><label className="required">Participant Name</label><input className={ec('cover.participantName')} name="cover.participantName" value={getDeep('cover.participantName') || ''} onChange={handleChange} /><E name="cover.participantName" /></div>
        <div><label>Date of Admission</label><input type="date" name="cover.dateOfAdmission" value={getDeep('cover.dateOfAdmission') || ''} onChange={handleChange} /></div>
        <div><label>Assigned Residence</label><input name="cover.assignedResidence" value={getDeep('cover.assignedResidence') || ''} onChange={handleChange} /></div>
        <div><label>Assigned House Manager</label><input name="cover.assignedCaseManager" value={getDeep('cover.assignedCaseManager') || ''} onChange={handleChange} /></div>
      </div>
      <p className="small">Confidential - For Authorized Use Only</p>
    </section>

    <section className="card">
      <h2>Agency Contact Information</h2>
      <h3>Office Address</h3>
      <p>10005 Old Columbia Rd, Suite L-261<br />Columbia, MD 21046</p>
      <h3>Office Hours</h3>
      <p>(301) 356-8845<br />Mon-Fri, 9:00am-5:00pm</p>
      <h3>Director of Programs</h3>
      <p>akamran@dofapathways.org<br />(240) 375-6996</p>
      <h3>Program Service Administrator</h3>
      <p>mrex@dofapathways.org<br />(667) 409-1028</p>
      <p>Available 24 Hours a Day, 7 Days a Week</p>
      <h3>Delegating Nurse</h3>
      <p>Halimat B.<br />hbakare@dofapathways.org<br />(773) 690-7029</p>
      <h3>Emergency & Crisis Lines</h3>
      <p>Maryland Crisis Hotline (24/7): Dial 988<br />Emergency Services: Dial 911</p>
    </section>
  </>);
}
