import { useForm } from '../FormContext.jsx';
export default function StepWelcome() {
  const { data, handleChange, getDeep } = useForm();
  return (<>
    <section className="card intro">
      <div className="step-header"><div className="step-icon">📋</div><div><h2>Online Intake Package</h2><p className="step-desc">Welcome to the DOFA Pathways admission process</p></div></div>
      <p>This online form captures the admission information, submits it to Google Sheets, and creates the completed intake PDF through Google Apps Script.</p>
      <p className="small">For real admissions, use secure hosting, encrypted storage, role-based staff access, HIPAA-compliant handling, and a legally valid e-signature solution where required.</p>
    </section>
    <section className="card">
      <h2>Cover / Admission Summary</h2>
      <h3>DOFA PATHWAYS</h3>
      <p>Residential Services</p>
      <p>New Admission Intake Package</p>
      <div className="grid">
        <div><label className="required">Participant Name</label><input name="cover.participantName" value={getDeep('cover.participantName') || ''} onChange={handleChange} required /></div>
        <div><label>Date of Admission</label><input type="date" name="cover.dateOfAdmission" value={getDeep('cover.dateOfAdmission') || ''} onChange={handleChange} /></div>
        <div><label>Assigned Residence</label><input name="cover.assignedResidence" value={getDeep('cover.assignedResidence') || ''} onChange={handleChange} /></div>
        <div><label>Assigned Case Manager</label><input name="cover.assignedCaseManager" value={getDeep('cover.assignedCaseManager') || ''} onChange={handleChange} /></div>
      </div>
      <h3>PACKAGE CONTENTS</h3>
      <ul className="pdf-list package-list">
        <li>New Admission Documentation Checklist</li>
        <li>Form 1 — Participant Information & Demographics</li>
        <li>Form 2 — Emergency Contact & Guardian Information</li>
        <li>Form 3 — Referral, Program Interest & Goals</li>
        <li>Form 4 — Risk Screening</li>
        <li>Form 5 — Clinical / High-Support Needs Assessment</li>
        <li>Form 6 — Residential Placement Agreement</li>
        <li>Form 7 — Consent for Services (HIPAA)</li>
        <li>Form 8 — Release of Information (ROI)</li>
        <li>Form 9 — Rights & Responsibilities Acknowledgement</li>
        <li>Signature Page — Participant, Guardian & Responsible Party</li>
        <li>Form 10 — Staff Intake Review & Eligibility Determination</li>
      </ul>
      <p className="small">Confidential — For Authorized Use Only</p>
    </section>
    <section className="card">
      <h2>Welcome</h2>
      <div className="welcome-letter">
        <p>To Our Individuals and Their Families,</p>
        <p>Thank you for choosing DOFA Pathways. We know that entrusting the care of your loved one to someone else is one of the most courageous decisions a family can make. It requires faith, vulnerability, and hope and we honor that deeply.</p>
        <p>DOFA Pathways was not created from theory or distance. It was born from lived experience from the sacred journey of birthing and caring for my own son with many abilities and learning firsthand what it means to advocate, to fight, to love, and to believe in someone's limitless potential. Being chosen as his mother ignited the vision that became DOFA Pathways.</p>
        <p>Combined with my many years as a Direct Support Professional, and as a Registered Nurse, Case Manager, this journey shaped our promise:</p>
        <p><strong>Your loved one will be met with dignity, compassion, respect, and unwavering belief — every single day.</strong></p>
        <p>Their choices will guide us.</p>
        <p>Their preferences will shape us.</p>
        <p>Their quality of life will inspire us.</p>
        <p>Our name reflects our purpose:</p>
        <p><strong>Developing Opportunities For All</strong></p>
        <p>This is not just a name. It is our calling.</p>
        <p>We are committed to being present for you 24 hours a day, seven days a week whenever you need our approved services. You are not just receiving a provider; you are joining a community built on empathy, advocacy, and hope.</p>
        <p>This intake package was prepared to help you understand your services and what you can expect from us. Please take time to review and sign. If you have any questions or concerns, you are always welcome to contact our team or reach out to me personally.</p>
        <p>Thank you for allowing us to walk this journey with you.</p>
        <p>It is an honor we do not take lightly.</p>
        <div className="signature-block">
          <p>Best Wishes,</p>
          <p>Atinuke Fadipe, MSN, RN, CM/DN<br />Founder & CEO, DOFA Pathways Corporation.</p>
        </div>
      </div>
    </section>
  </>);
}
