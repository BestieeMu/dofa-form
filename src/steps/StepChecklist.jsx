import { useForm } from '../FormContext.jsx';
export default function StepChecklist() {
  const { handleCheckboxChange, checkboxChecked } = useForm();
  const CB = ({ group, options }) => (
    <div className="checkboxes">{options.map(o => (<label key={o}><input type="checkbox" checked={checkboxChecked(group, o)} onChange={() => handleCheckboxChange(group, o)} />{o}</label>))}</div>
  );
  return (<section className="card">
    <div className="step-header"><div className="step-icon">✅</div><div><h2>NEW ADMISSION — Required Documentation Checklist</h2><p className="step-desc">Gather and submit all applicable documents</p></div></div>
    <p>Please gather and submit all applicable documents prior to or at the time of admission. Staff will verify receipt and note any missing items on Form 10.</p>
    <h3>1. Required Documents & Information</h3>
    <h4>A. Identification</h4>
    <CB group="checklist.identification" options={['Social Security card','State ID','Insurance / Medicaid / Medicare cards']} />
    <h4>B. Person-Centered Plan (PCP)</h4>
    <CB group="checklist.personCenteredPlan" options={['Current approved PCP','Any recent PCP addendums or revisions','Goals, outcomes, and support needs relevant to residential services']} />
    <h4>C. Clinical / Functional Information</h4>
    <CB group="checklist.clinicalFunctionalInformation" options={['Full Current Nursing Assessment (if applicable)','Health Risk Screening Tool (HRST)','Medication list','MARs (Medication Administration Records) for last 3–6 months','Current physician orders','Behavioral support plan (if applicable)','Therapy plans (OT, PT, Speech, etc.)','Recent medical summaries or discharge summaries']} />
    <h3>2. Health & Medical Records</h3>
    <CB group="checklist.healthMedicalRecords" options={['Complete medical history','Allergies','Immunization record','Last annual physical & dental exam']} />
    <h3>3. Legal Documents (If Applicable)</h3>
    <CB group="checklist.legalDocuments" options={['Guardianship letters / POA documentation','Court orders (if any)','Authorized representative forms']} />
    <h3>4. Residential / Daily Support Details</h3>
    <CB group="checklist.residentialDailySupportDetails" options={['Staffing needs (1:1 hours, overnight support, etc.)','Dietary needs and meal plans','Transportation needs','List of assistive devices: wheelchair, gait belt, communication device, etc.']} />
    <h3>5. Personal Belongings & Transition Planning</h3>
    <CB group="checklist.personalBelongingsTransitionPlanning" options={['Inventory list of personal property','Transfer of clothing, equipment, personal items','Handover of durable medical equipment','Date of move agreed by all parties','Orientation meeting between individual, new provider, CCS, and (if appropriate) family/guardian']} />
    <h3>6. Provider Responsibilities</h3>
    <p>Old Provider Must: (If Applicable)</p>
    <ul className="pdf-list"><li>Provide records within required timeframe</li><li>Complete discharge summary</li><li>Return personal funds & belongings</li><li>Give medication & equipment to new provider on transfer day</li></ul>
    <div className="notice">STAFF NOTE: All documents received should be logged on Form 10 — Staff Intake Review & Eligibility Determination. Copies should be placed in the participant's file. Originals returned to participant/guardian.</div>
  </section>);
}
