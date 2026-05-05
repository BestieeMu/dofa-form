import { useForm } from '../FormContext.jsx';
export default function StepSignatures() {
  const { handleChange, handleCheckboxChange, checkboxChecked, getDeep } = useForm();
  const docItems = [
    {label:'Form 1 -- Participant Information',name:'staff.docChecklist.form1'},
    {label:'Form 2 -- Emergency Contact & Guardian',name:'staff.docChecklist.form2'},
    {label:'Form 3 -- Referral & Goals',name:'staff.docChecklist.form3'},
    {label:'Form 4 -- Risk Screening',name:'staff.docChecklist.form4'},
    {label:'Form 5 -- Clinical Assessment (if applicable)',name:'staff.docChecklist.form5'},
    {label:'Form 6 -- Placement Agreement',name:'staff.docChecklist.form6'},
    {label:'Form 7 -- Consent & HIPAA',name:'staff.docChecklist.form7'},
    {label:'Form 8 -- Release of Information',name:'staff.docChecklist.form8'},
    {label:'Form 9 -- Rights & Responsibilities',name:'staff.docChecklist.form9'},
    {label:'ID / Photo Identification',name:'staff.docChecklist.id'},
    {label:'Insurance / Medicaid Card',name:'staff.docChecklist.insurance'},
    {label:'Guardianship Documentation (if applicable)',name:'staff.docChecklist.guardianshipDocs'},
    {label:'Physician Orders / Health Summary',name:'staff.docChecklist.physicianOrders'},
    {label:'Current Behavioral Support Plan (if applicable)',name:'staff.docChecklist.behavioralPlan'},
    {label:'ISP from Prior Provider (if applicable)',name:'staff.docChecklist.ispPriorProvider'},
  ];
  return (<>
    <section className="card">
      <div className="step-header"><div className="step-icon">✍️</div><div><h2>Signature Page — Participant, Guardian & Responsible Party</h2><p className="step-desc">Final signatures for all parties</p></div></div>
      <div className="grid">
        <div><label>Participant Full Name</label><input name="signature.participantFullName" value={getDeep('signature.participantFullName') || ''} onChange={handleChange} /></div>
        <div><label>Participant Signature</label><input name="signature.participantSignature" value={getDeep('signature.participantSignature') || ''} onChange={handleChange} /></div>
        <div><label>Date</label><input type="date" name="signature.participantDate" value={getDeep('signature.participantDate') || ''} onChange={handleChange} /></div>
        <div><label>Phone Number</label><input name="signature.participantPhone" value={getDeep('signature.participantPhone') || ''} onChange={handleChange} /></div>
        <div style={{gridColumn:'1 / -1'}}><label>Participant Address</label><input name="signature.participantAddress" value={getDeep('signature.participantAddress') || ''} onChange={handleChange} /></div>
        <div><label>Guardian Full Name</label><input name="signature.guardianFullName" value={getDeep('signature.guardianFullName') || ''} onChange={handleChange} /></div>
        <div><label>Guardian Signature</label><input name="signature.guardianSignature" value={getDeep('signature.guardianSignature') || ''} onChange={handleChange} /></div>
        <div><label>Guardian Date</label><input type="date" name="signature.guardianDate" value={getDeep('signature.guardianDate') || ''} onChange={handleChange} /></div>
        <div><label>Guardian Address</label><input name="signature.guardianAddress" value={getDeep('signature.guardianAddress') || ''} onChange={handleChange} /></div>
        <div><label>Guardian Relationship to Participant</label><input name="signature.guardianRelationship" value={getDeep('signature.guardianRelationship') || ''} onChange={handleChange} /></div>
        <div><label>Guardian Phone Number</label><input name="signature.guardianPhone" value={getDeep('signature.guardianPhone') || ''} onChange={handleChange} /></div>
        <div style={{gridColumn:'1 / -1'}}><label>Legal Authority / Documentation on File</label><input name="signature.legalAuthorityDocumentation" value={getDeep('signature.legalAuthorityDocumentation') || ''} onChange={handleChange} /></div>
        <div><label>Responsible Party Full Name</label><input name="signature.responsiblePartyFullName" value={getDeep('signature.responsiblePartyFullName') || ''} onChange={handleChange} /></div>
        <div><label>Responsible Party Signature</label><input name="signature.responsiblePartySignature" value={getDeep('signature.responsiblePartySignature') || ''} onChange={handleChange} /></div>
        <div><label>Responsible Party Date</label><input type="date" name="signature.responsiblePartyDate" value={getDeep('signature.responsiblePartyDate') || ''} onChange={handleChange} /></div>
        <div style={{gridColumn:'1 / -1'}}><label>Responsible Party Address</label><input name="signature.responsiblePartyAddress" value={getDeep('signature.responsiblePartyAddress') || ''} onChange={handleChange} /></div>
        <div><label>Responsible Party Relationship to Participant</label><input name="signature.responsiblePartyRelationship" value={getDeep('signature.responsiblePartyRelationship') || ''} onChange={handleChange} /></div>
        <div><label>Responsible Party Phone Number</label><input name="signature.responsiblePartyPhone" value={getDeep('signature.responsiblePartyPhone') || ''} onChange={handleChange} /></div>
        <div style={{gridColumn:'1 / -1'}}><label>Capacity / Role</label><input name="signature.responsiblePartyCapacityRole" value={getDeep('signature.responsiblePartyCapacityRole') || ''} onChange={handleChange} /></div>
        <div><label>Staff Full Name</label><input name="signature.staffFullName" value={getDeep('signature.staffFullName') || ''} onChange={handleChange} /></div>
        <div><label>Staff Title</label><input name="signature.staffTitle" value={getDeep('signature.staffTitle') || ''} onChange={handleChange} /></div>
        <div><label>Staff Signature</label><input name="signature.staffSignature" value={getDeep('signature.staffSignature') || ''} onChange={handleChange} /></div>
        <div><label>Staff Date</label><input type="date" name="signature.staffDate" value={getDeep('signature.staffDate') || ''} onChange={handleChange} /></div>
      </div>
    </section>
    <section className="card">
      <h2>Form 10 — Staff Intake Review & Eligibility Determination</h2>
      <div className="grid">
        <div><label>Intake Review Date</label><input type="date" name="staff.intakeReviewDate" value={getDeep('staff.intakeReviewDate') || ''} onChange={handleChange} /></div>
        <div><label>Reviewing Staff / Case Manager</label><input name="staff.reviewingStaff" value={getDeep('staff.reviewingStaff') || ''} onChange={handleChange} /></div>
        <div><label>Participant Full Name</label><input name="staff.participantFullName" value={getDeep('staff.participantFullName') || ''} onChange={handleChange} /></div>
        <div><label>Date of Admission</label><input type="date" name="staff.dateOfAdmission" value={getDeep('staff.dateOfAdmission') || ''} onChange={handleChange} /></div>
        <div><label>Eligibility Status</label><select name="staff.eligibilityStatus" value={getDeep('staff.eligibilityStatus') || ''} onChange={handleChange}><option value=""> </option><option>Approved — Admit to Residential Services</option><option>Pending — Additional information required</option><option>Not Eligible — See notes</option></select></div>
        <div style={{gridColumn:'1 / -1'}}><label>Funding / Program Source Approved</label>
          <div className="checkboxes">{['DDA Waiver','Medicaid','Grant Funded','Private Pay','Other'].map(o => (<label key={o}><input type="checkbox" checked={checkboxChecked('staff.fundingSourcesApproved', o)} onChange={() => handleCheckboxChange('staff.fundingSourcesApproved', o)} />{o}</label>))}</div>
        </div>
        <div style={{gridColumn:'1 / -1'}}><label>Funding Notes / Program Source Details</label><input name="staff.fundingProgramSourceApproved" value={getDeep('staff.fundingProgramSourceApproved') || ''} onChange={handleChange} /></div>
        <div><label>Clinician / Nurse Name</label><input name="staff.clinicianNurseName" value={getDeep('staff.clinicianNurseName') || ''} onChange={handleChange} /></div>
        <div><label>High-Support / Clinical Needs Reviewed By</label><input name="staff.highSupportReviewedBy" value={getDeep('staff.highSupportReviewedBy') || ''} onChange={handleChange} /></div>
        <div><label>Clinician Title / Credential</label><input name="staff.clinicianTitleCredential" value={getDeep('staff.clinicianTitleCredential') || ''} onChange={handleChange} /></div>
        <div><label>Review Date</label><input type="date" name="staff.reviewDate" value={getDeep('staff.reviewDate') || ''} onChange={handleChange} /></div>
        <div><label>Risk Level Confirmed</label><input name="staff.riskLevelConfirmed" value={getDeep('staff.riskLevelConfirmed') || ''} onChange={handleChange} /></div>
        <div style={{gridColumn:'1 / -1'}}><label>Clinical Recommendations / Accommodations</label><textarea name="staff.clinicalRecommendations" value={getDeep('staff.clinicalRecommendations') || ''} onChange={handleChange} /></div>
        <div><label>Orientation Scheduled Date</label><input type="date" name="staff.orientationScheduledDate" value={getDeep('staff.orientationScheduledDate') || ''} onChange={handleChange} /></div>
        <div><label>Initial ISP Meeting Date</label><input type="date" name="staff.initialIspMeetingDate" value={getDeep('staff.initialIspMeetingDate') || ''} onChange={handleChange} /></div>
        <div><label>Assigned Residence / Home</label><input name="staff.assignedResidenceHome" value={getDeep('staff.assignedResidenceHome') || ''} onChange={handleChange} /></div>
        <div><label>Assigned Case Manager</label><input name="staff.assignedCaseManager" value={getDeep('staff.assignedCaseManager') || ''} onChange={handleChange} /></div>
        <div style={{gridColumn:'1 / -1'}}><label>Documentation Checklist Status</label>
          <div className="grid">{docItems.map(item => (<div key={item.name}><label>{item.label}</label><select name={item.name} value={getDeep(item.name) || ''} onChange={handleChange}><option value=""> </option><option>Received</option><option>N/A</option></select></div>))}</div>
        </div>
        <div style={{gridColumn:'1 / -1'}}><label>Staff Notes / Additional Comments</label><textarea name="staff.notes" value={getDeep('staff.notes') || ''} onChange={handleChange} /></div>
        <div><label>Intake Coordinator / Case Manager Signature</label><input name="staff.intakeCoordinatorSignature" value={getDeep('staff.intakeCoordinatorSignature') || ''} onChange={handleChange} /></div>
        <div><label>Date</label><input type="date" name="staff.signatureDate" value={getDeep('staff.signatureDate') || ''} onChange={handleChange} /></div>
        <div><label>Supervisor Signature</label><input name="staff.supervisorSignature" value={getDeep('staff.supervisorSignature') || ''} onChange={handleChange} /></div>
        <div><label>Supervisor Title</label><input name="staff.supervisorTitle" value={getDeep('staff.supervisorTitle') || ''} onChange={handleChange} /></div>
        <div><label>Printed Name</label><input name="staff.printedName" value={getDeep('staff.printedName') || ''} onChange={handleChange} /></div>
      </div>
    </section>
  </>);
}
