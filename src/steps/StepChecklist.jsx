import { useForm } from '../FormContext.jsx';

export default function StepChecklist() {
  const { handleCheckboxChange, checkboxChecked } = useForm();
  const CB = ({ group, options }) => (
    <div className="checkboxes">{options.map(o => (<label key={o}><input type="checkbox" checked={checkboxChecked(group, o)} onChange={() => handleCheckboxChange(group, o)} />{o}</label>))}</div>
  );

  return (<section className="card">
    <div className="step-header"><div className="step-icon">3</div><div><h2>New Admission Required Documentation Checklist</h2><p className="step-desc">PDF page 3 - complete checklist</p></div></div>
    <h3>A. Identification</h3>
    <CB group="checklist.identification" options={['Social Security Card', 'State-Issued Photo ID', 'Insurance / Medicaid / Medicare Cards']} />
    <h3>B. Person-Centered Plan (PCP)</h3>
    <CB group="checklist.personCenteredPlan" options={['Current Approved PCP']} />
    <h3>C. Clinical / Functional Information</h3>
    <CB group="checklist.clinicalFunctionalInformation" options={[
      'Current Nursing Assessment (if applicable)',
      'Health Risk Screening Tool (HRST)',
      'Medication List',
      'Current Physician Orders',
      'Behavioral Support Plan (if applicable)',
      'Recent Medical Appointments / Therapy Plans (OT, PT, Speech, etc.)',
      'Recent Medical Summaries or Discharge Summaries',
    ]} />
    <h3>D. Health & Medical Records</h3>
    <CB group="checklist.healthMedicalRecords" options={['Complete Medical History', 'Allergies', 'Immunization Record']} />
    <h3>E. Legal Documents (If Applicable)</h3>
    <CB group="checklist.legalDocuments" options={['Guardianship Letters / POA Documentation', 'Court Orders (if any)', 'Authorized Representative Forms']} />
  </section>);
}
