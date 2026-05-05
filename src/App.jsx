import { useState } from 'react';

function setDeep(obj, path, value) {
  const parts = path.split('.');
  let ref = obj;
  for (let i = 0; i < parts.length - 1; i += 1) {
    if (!ref[parts[i]] || typeof ref[parts[i]] !== 'object') {
      ref[parts[i]] = {};
    }
    ref = ref[parts[i]];
  }
  ref[parts[parts.length - 1]] = value;
}

function getDeep(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

function App() {
  const [data, setData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => {
      const next = JSON.parse(JSON.stringify(prev || {}));
      setDeep(next, name, value);
      if (name === 'risk.form5Required' && value === 'No — skip to Form 6') {
        delete next.clinical;
      }
      return next;
    });
  };

  const skipForm5 = getDeep(data, 'risk.form5Required') === 'No — skip to Form 6';

  const handleCheckboxChange = (group, value) => {
    setData((prev) => {
      const next = JSON.parse(JSON.stringify(prev || {}));
      const current = getDeep(next, group) || [];
      const nextValues = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      setDeep(next, group, nextValues);
      return next;
    });
  };

  const saveDraft = () => {
    localStorage.setItem('dofaIntakeDraft', JSON.stringify(data));
    alert('Draft saved in this browser.');
  };

  const loadDraft = () => {
    const raw = localStorage.getItem('dofaIntakeDraft');
    if (!raw) {
      alert('No saved draft found in this browser.');
      return;
    }
    try {
      setData(JSON.parse(raw));
      alert('Draft loaded.');
    } catch {
      alert('Saved draft could not be loaded.');
    }
  };

  const checkboxChecked = (group, value) => {
    const values = getDeep(data, group) || [];
    return values.includes(value);
  };

  const submitToGoogleSheets = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.ok === false) {
        alert(result.error || 'Unable to submit to Google Sheets.');
        return;
      }
      alert(result.pdfUrl ? `Submitted successfully. PDF saved: ${result.pdfUrl}` : 'Submitted successfully.');
    } catch (err) {
      alert('Unable to submit right now. Please check the API server and Apps Script URL.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-shell">
      <header>
        <h1>DOFA PATHWAYS</h1>
        <p>Residential Services — Online New Admission Intake Form</p>
      </header>
      <main>
        <section className="card intro">
          <h2>Online Intake Package</h2>
          <p>This online form captures the admission information, submits it to Google Sheets, and creates the completed intake PDF through Google Apps Script.</p>
          <p className="small">For real admissions, use secure hosting, encrypted storage, role-based staff access, HIPAA-compliant handling, and a legally valid e-signature solution where required.</p>
        </section>

        <form id="intakeForm" onSubmit={(e) => e.preventDefault()}>
          <section className="card">
            <h2>Cover / Admission Summary</h2>
            <h3>DOFA PATHWAYS</h3>
            <p>Residential Services</p>
            <p>New Admission Intake Package</p>
            <div className="grid">
              <div>
                <label className="required">Participant Name</label>
                <input name="cover.participantName" value={getDeep(data, 'cover.participantName') || ''} onChange={handleChange} required />
              </div>
              <div>
                <label>Date of Admission</label>
                <input type="date" name="cover.dateOfAdmission" value={getDeep(data, 'cover.dateOfAdmission') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Assigned Residence</label>
                <input name="cover.assignedResidence" value={getDeep(data, 'cover.assignedResidence') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Assigned Case Manager</label>
                <input name="cover.assignedCaseManager" value={getDeep(data, 'cover.assignedCaseManager') || ''} onChange={handleChange} />
              </div>
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
            <p>Best Wishes,</p>
            <p>Atinuke Fadipe, MSN, RN, CM/DN<br />Founder & CEO, DOFA Pathways Corporation.</p>
          </section>

          <section className="card">
            <h2>AGENCY CONTACT INFORMATION</h2>
            <h3>Office Address</h3>
            <p>10005 Old Columbia Rd, Suite L-261<br />Columbia, MD 21046</p>
            <h3>Office Number</h3>
            <p>(240) 375-6996</p>
            <p>Available 24 Hours a Day, 7 Days a Week — On Call</p>
            <h3>For All Medical-Related Issues</h3>
            <p>Delegating Nurse: Halimat<br />(240) 278-1871</p>
            <h3>EMERGENCY SERVICES</h3>
            <p><strong>DIAL 911</strong></p>
          </section>

          <section className="card">
            <h2>NEW ADMISSION — Required Documentation Checklist</h2>
            <p>Please gather and submit all applicable documents prior to or at the time of admission. Staff will verify receipt and note any missing items on Form 10.</p>

            <h3>1. Required Documents & Information</h3>
            <h4>A. Identification</h4>
            <div className="checkboxes">
              {[
                'Social Security card',
                'State ID',
                'Insurance / Medicaid / Medicare cards',
              ].map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={checkboxChecked('checklist.identification', option)}
                    onChange={() => handleCheckboxChange('checklist.identification', option)}
                  />
                  {option}
                </label>
              ))}
            </div>

            <h4>B. Person-Centered Plan (PCP)</h4>
            <div className="checkboxes">
              {[
                'Current approved PCP',
                'Any recent PCP addendums or revisions',
                'Goals, outcomes, and support needs relevant to residential services',
              ].map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={checkboxChecked('checklist.personCenteredPlan', option)}
                    onChange={() => handleCheckboxChange('checklist.personCenteredPlan', option)}
                  />
                  {option}
                </label>
              ))}
            </div>

            <h4>C. Clinical / Functional Information</h4>
            <div className="checkboxes">
              {[
                'Full Current Nursing Assessment (if applicable)',
                'Health Risk Screening Tool (HRST)',
                'Medication list',
                'MARs (Medication Administration Records) for last 3–6 months',
                'Current physician orders',
                'Behavioral support plan (if applicable)',
                'Therapy plans (OT, PT, Speech, etc.)',
                'Recent medical summaries or discharge summaries',
              ].map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={checkboxChecked('checklist.clinicalFunctionalInformation', option)}
                    onChange={() => handleCheckboxChange('checklist.clinicalFunctionalInformation', option)}
                  />
                  {option}
                </label>
              ))}
            </div>

            <h3>2. Health & Medical Records</h3>
            <div className="checkboxes">
              {[
                'Complete medical history',
                'Allergies',
                'Immunization record',
                'Last annual physical & dental exam',
              ].map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={checkboxChecked('checklist.healthMedicalRecords', option)}
                    onChange={() => handleCheckboxChange('checklist.healthMedicalRecords', option)}
                  />
                  {option}
                </label>
              ))}
            </div>

            <h3>3. Legal Documents (If Applicable)</h3>
            <div className="checkboxes">
              {[
                'Guardianship letters / POA documentation',
                'Court orders (if any)',
                'Authorized representative forms',
              ].map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={checkboxChecked('checklist.legalDocuments', option)}
                    onChange={() => handleCheckboxChange('checklist.legalDocuments', option)}
                  />
                  {option}
                </label>
              ))}
            </div>

            <h3>4. Residential / Daily Support Details</h3>
            <div className="checkboxes">
              {[
                'Staffing needs (1:1 hours, overnight support, etc.)',
                'Dietary needs and meal plans',
                'Transportation needs',
                'List of assistive devices: wheelchair, gait belt, communication device, etc.',
              ].map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={checkboxChecked('checklist.residentialDailySupportDetails', option)}
                    onChange={() => handleCheckboxChange('checklist.residentialDailySupportDetails', option)}
                  />
                  {option}
                </label>
              ))}
            </div>

            <h3>5. Personal Belongings & Transition Planning</h3>
            <div className="checkboxes">
              {[
                'Inventory list of personal property',
                'Transfer of clothing, equipment, personal items',
                'Handover of durable medical equipment',
                'Date of move agreed by all parties',
                'Orientation meeting between individual, new provider, CCS, and (if appropriate) family/guardian',
              ].map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={checkboxChecked('checklist.personalBelongingsTransitionPlanning', option)}
                    onChange={() => handleCheckboxChange('checklist.personalBelongingsTransitionPlanning', option)}
                  />
                  {option}
                </label>
              ))}
            </div>

            <h3>6. Provider Responsibilities</h3>
            <p>Old Provider Must: (If Applicable)</p>
            <ul className="pdf-list">
              <li>Provide records within required timeframe</li>
              <li>Complete discharge summary</li>
              <li>Return personal funds & belongings</li>
              <li>Give medication & equipment to new provider on transfer day</li>
            </ul>
            <div className="notice">STAFF NOTE: All documents received should be logged on Form 10 — Staff Intake Review & Eligibility Determination. Copies should be placed in the participant's file. Originals returned to participant/guardian.</div>
          </section>

          <section className="card">
            <h2>Form 1 — Participant Information & Demographics</h2>
            <p>Please complete all required fields. This information is used to establish your participant record.</p>
            <h3>Personal Information</h3>
            <div className="grid">
              <div>
                <label className="required">Full Legal Name</label>
                <input name="participant.fullLegalName" value={getDeep(data, 'participant.fullLegalName') || ''} onChange={handleChange} required />
              </div>
              <div>
                <label>Preferred Name / Nickname</label>
                <input name="participant.preferredName" value={getDeep(data, 'participant.preferredName') || ''} onChange={handleChange} />
              </div>
              <div>
                <label className="required">Date of Birth</label>
                <input type="date" name="participant.dateOfBirth" value={getDeep(data, 'participant.dateOfBirth') || ''} onChange={handleChange} required />
              </div>
              <div>
                <label>Social Security # Last 4 Digits</label>
                <input name="participant.ssnLast4" value={getDeep(data, 'participant.ssnLast4') || ''} maxLength="4" onChange={handleChange} />
              </div>
              <div>
                <label>Gender Identity</label>
                <input name="participant.genderIdentity" value={getDeep(data, 'participant.genderIdentity') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Pronouns</label>
                <input name="participant.pronouns" value={getDeep(data, 'participant.pronouns') || ''} onChange={handleChange} />
              </div>
            </div>
            <h3>Race / Ethnicity</h3>
            <div className="checkboxes">
              {[
                'American Indian / Alaska Native',
                'Asian',
                'Black / African American',
                'Hispanic / Latino',
                'Native Hawaiian / Pacific Islander',
                'White',
                'Two or more races',
                'Prefer not to say',
              ].map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={checkboxChecked('participant.raceEthnicity', option)}
                    onChange={() => handleCheckboxChange('participant.raceEthnicity', option)}
                  />
                  {option}
                </label>
              ))}
            </div>
            <h3>Contact Information</h3>
            <div className="grid">
              <div>
                <label className="required">Current Address (Street, City, State, ZIP)</label>
                <input name="participant.currentAddress" value={getDeep(data, 'participant.currentAddress') || ''} onChange={handleChange} required />
              </div>
              <div>
                <label className="required">Primary Phone</label>
                <input name="participant.primaryPhone" value={getDeep(data, 'participant.primaryPhone') || ''} onChange={handleChange} required />
              </div>
              <div>
                <label>Alternate Phone</label>
                <input name="participant.alternatePhone" value={getDeep(data, 'participant.alternatePhone') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Email Address</label>
                <input type="email" name="participant.email" value={getDeep(data, 'participant.email') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Preferred Contact Method</label>
                <input name="participant.preferredContactMethod" value={getDeep(data, 'participant.preferredContactMethod') || ''} onChange={handleChange} />
              </div>
            </div>
            <h3>Housing & Background</h3>
            <div className="grid">
              <div>
                <label>Current Housing Status</label>
                <input name="participant.currentHousingStatus" value={getDeep(data, 'participant.currentHousingStatus') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Education Level</label>
                <input name="participant.educationLevel" value={getDeep(data, 'participant.educationLevel') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Employment Status</label>
                <input name="participant.employmentStatus" value={getDeep(data, 'participant.employmentStatus') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Primary Language</label>
                <input name="participant.primaryLanguage" value={getDeep(data, 'participant.primaryLanguage') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Medicaid ID #</label>
                <input name="participant.medicaidId" value={getDeep(data, 'participant.medicaidId') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Medicare ID #</label>
                <input name="participant.medicareId" value={getDeep(data, 'participant.medicareId') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Primary Insurance / Payer</label>
                <input name="participant.primaryInsurance" value={getDeep(data, 'participant.primaryInsurance') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Policy / Member ID</label>
                <input name="participant.policyMemberId" value={getDeep(data, 'participant.policyMemberId') || ''} onChange={handleChange} />
              </div>
            </div>
            <p className="small">* Required field</p>
          </section>

          <section className="card">
            <h2>Form 2 — Emergency Contact & Guardian Information</h2>
            <div className="grid">
              <div>
                <label className="required">Emergency Contact Full Name</label>
                <input name="emergency.contactFullName" value={getDeep(data, 'emergency.contactFullName') || ''} onChange={handleChange} required />
              </div>
              <div>
                <label className="required">Relationship to Participant</label>
                <input name="emergency.relationship" value={getDeep(data, 'emergency.relationship') || ''} onChange={handleChange} required />
              </div>
              <div>
                <label className="required">Primary Phone</label>
                <input name="emergency.primaryPhone" value={getDeep(data, 'emergency.primaryPhone') || ''} onChange={handleChange} required />
              </div>
              <div>
                <label>Alternate Phone</label>
                <input name="emergency.alternatePhone" value={getDeep(data, 'emergency.alternatePhone') || ''} onChange={handleChange} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Address</label>
                <input name="emergency.address" value={getDeep(data, 'emergency.address') || ''} onChange={handleChange} />
              </div>
            </div>
            <h3>Legal Guardian / Authorized Representative</h3>
            <div className="grid">
              <div>
                <label>Has Legal Guardian?</label>
                <select name="emergency.hasGuardian" value={getDeep(data, 'emergency.hasGuardian') || ''} onChange={handleChange}>
                  <option value=""> </option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div>
                <label>Guardian / Representative Full Name</label>
                <input name="emergency.guardianFullName" value={getDeep(data, 'emergency.guardianFullName') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Relationship</label>
                <input name="emergency.guardianRelationship" value={getDeep(data, 'emergency.guardianRelationship') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Primary Phone</label>
                <input name="emergency.guardianPhone" value={getDeep(data, 'emergency.guardianPhone') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Email</label>
                <input type="email" name="emergency.guardianEmail" value={getDeep(data, 'emergency.guardianEmail') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Mailing Address</label>
                <input name="emergency.guardianMailingAddress" value={getDeep(data, 'emergency.guardianMailingAddress') || ''} onChange={handleChange} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Legal Authority / Scope</label>
                <textarea name="emergency.legalAuthority" value={getDeep(data, 'emergency.legalAuthority') || ''} onChange={handleChange} />
              </div>
            </div>
            <div className="checkboxes">
              {[
                'Power of Attorney on file',
                'Guardianship Order on file',
                'Healthcare Proxy on file',
                'None — participant self-directs',
              ].map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={checkboxChecked('emergency.documentation', option)}
                    onChange={() => handleCheckboxChange('emergency.documentation', option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>Form 3 — Referral, Program Interest & Goals</h2>
            <div className="grid">
              <div>
                <label className="required">Referral Source</label>
                <input name="referral.referralSource" value={getDeep(data, 'referral.referralSource') || ''} onChange={handleChange} required />
              </div>
              <div>
                <label>Referring Agency / Person</label>
                <input name="referral.referringAgencyPerson" value={getDeep(data, 'referral.referringAgencyPerson') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Referral Date</label>
                <input type="date" name="referral.referralDate" value={getDeep(data, 'referral.referralDate') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Referral Contact Phone</label>
                <input name="referral.referralContactPhone" value={getDeep(data, 'referral.referralContactPhone') || ''} onChange={handleChange} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Reason for Seeking Residential Services</label>
                <textarea name="referral.reason" value={getDeep(data, 'referral.reason') || ''} onChange={handleChange} />
              </div>
            </div>
            <h3>Programs of Interest</h3>
            <div className="checkboxes">
              {[
                'Group Home / Residential Habilitation',
                'Supported Living',
                'Community Development Services (CDS)',
                'Day Habilitation',
                'Employment / Vocational Support',
                'Behavioral Support Services',
                'Family / Caregiver Support',
                'Respite Services',
              ].map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={checkboxChecked('referral.programsOfInterest', option)}
                    onChange={() => handleCheckboxChange('referral.programsOfInterest', option)}
                  />
                  {option}
                </label>
              ))}
            </div>
            <h3>Current Needs & Goals</h3>
            <div className="grid">
              <div>
                <label>Housing Status at Referral</label>
                <input name="referral.housingStatusAtReferral" value={getDeep(data, 'referral.housingStatusAtReferral') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Income Source(s)</label>
                <input name="referral.incomeSources" value={getDeep(data, 'referral.incomeSources') || ''} onChange={handleChange} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Short-Term Goals (0–6 months)</label>
                <textarea name="referral.shortTermGoals" value={getDeep(data, 'referral.shortTermGoals') || ''} onChange={handleChange} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Long-Term Goals (6+ months)</label>
                <textarea name="referral.longTermGoals" value={getDeep(data, 'referral.longTermGoals') || ''} onChange={handleChange} />
              </div>
            </div>
            <div className="checkboxes">
              {[
                'Personal Care / ADLs',
                'Medication Management',
                'Meal Preparation / Nutrition',
                'Transportation',
                'Community Integration',
                'Social Skills',
                'Financial Management',
                'Health & Wellness',
                'Communication Support',
                'Behavioral Support',
                'Employment / Education',
                'Family Relationships',
              ].map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={checkboxChecked('referral.areasOfSupportNeeded', option)}
                    onChange={() => handleCheckboxChange('referral.areasOfSupportNeeded', option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>Form 4 — Risk Screening</h2>
            <p>This section helps ensure we provide the appropriate level of support. All responses are confidential.</p>
            <div className="checkboxes">
              {[
                'History of psychiatric hospitalization',
                'Current behavioral concerns or incidents',
                'Medical fragility / complex medical needs',
                'High supervision needs (24-hr or 1:1)',
                'History of self-injurious behavior',
                'Aggression toward others',
                'Elopement risk',
                'Substance use history',
                'History of trauma / abuse',
                'Involvement with criminal justice system',
                'None of the above',
                'Other',
              ].map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={checkboxChecked('risk.indicators', option)}
                    onChange={() => handleCheckboxChange('risk.indicators', option)}
                  />
                  {option}
                </label>
              ))}
            </div>
            <div className="grid">
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Describe any checked risk indicators (dates, frequency, context, current status)</label>
                <textarea name="risk.description" value={getDeep(data, 'risk.description') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Other Risk Indicator</label>
                <input name="risk.otherIndicator" value={getDeep(data, 'risk.otherIndicator') || ''} onChange={handleChange} placeholder="If checked 'Other', describe here" />
              </div>
              <div>
                <label>Overall Risk Level Assessment</label>
                <select name="risk.overallRiskLevel" value={getDeep(data, 'risk.overallRiskLevel') || ''} onChange={handleChange}>
                  <option value=""> </option>
                  <option>Low</option>
                  <option>Moderate</option>
                  <option>High</option>
                  <option>Requires Clinical Review</option>
                </select>
              </div>
              <div>
                <label>Clinical / High-Support Section Required?</label>
                <select name="risk.form5Required" value={getDeep(data, 'risk.form5Required') || ''} onChange={handleChange}>
                  <option value=""> </option>
                  <option>Yes — proceed to Form 5</option>
                  <option>No — skip to Form 6</option>
                </select>
              </div>
            </div>
          </section>

          { !skipForm5 && (
            <section className="card">
              <h2>Form 5 — Clinical / High-Support Needs Assessment</h2>
              <p>Complete this form only if indicated on Form 4 or requested by a clinician.</p>
              <div className="grid">
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Primary Diagnosis / Diagnoses (ICD codes if available)</label>
                <textarea name="clinical.primaryDiagnoses" value={getDeep(data, 'clinical.primaryDiagnoses') || ''} onChange={handleChange} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Known Allergies (medications, food, environmental)</label>
                <textarea name="clinical.knownAllergies" value={getDeep(data, 'clinical.knownAllergies') || ''} onChange={handleChange} />
              </div>
            </div>
            <h3>Dietary Needs</h3>
            <p>Does the participant have special dietary needs?</p>
            <div className="checkboxes">
              {[
                'No restrictions',
                'Texture-modified diet',
                'Low sodium',
                'Diabetic diet',
                'Vegetarian / Vegan',
                'Religious dietary restrictions',
                'Other',
              ].map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={checkboxChecked('clinical.dietaryNeeds', option)}
                    onChange={() => handleCheckboxChange('clinical.dietaryNeeds', option)}
                  />
                  {option}
                </label>
              ))}
            </div>
            <div className="grid">
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Dietary Details / Restrictions</label>
                <textarea name="clinical.dietaryDetails" value={getDeep(data, 'clinical.dietaryDetails') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Daily Living Support Level Required:</label>
                <select name="clinical.dailyLivingSupportLevel" value={getDeep(data, 'clinical.dailyLivingSupportLevel') || ''} onChange={handleChange}>
                  <option value=""> </option>
                  <option>Independent</option>
                  <option>Minimal Assistance</option>
                  <option>Moderate Assistance</option>
                  <option>Extensive Assistance</option>
                  <option>Total Assistance</option>
                </select>
              </div>
              <div>
                <label>Mobility Needs:</label>
                <select name="clinical.mobilityNeeds" value={getDeep(data, 'clinical.mobilityNeeds') || ''} onChange={handleChange}>
                  <option value=""> </option>
                  <option>Ambulatory — independent</option>
                  <option>Ambulatory — with device</option>
                  <option>Wheelchair — self-propelled</option>
                  <option>Wheelchair — dependent</option>
                  <option>Bed-bound / transfer required</option>
                </select>
              </div>
            </div>
            <h3>Assistive Devices / Equipment:</h3>
            <div className="checkboxes">
              {[
                'None',
                'Wheelchair',
                'Walker / Cane',
                'Hearing Aid',
                'Communication Device (AAC)',
                'Feeding Tube / PEG',
                'Oxygen',
                'CPAP / BiPAP',
                'Catheter',
                'Other',
              ].map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={checkboxChecked('clinical.assistiveDevices', option)}
                    onChange={() => handleCheckboxChange('clinical.assistiveDevices', option)}
                  />
                  {option}
                </label>
              ))}
            </div>
            <h3>Communication & Supervision</h3>
            <div className="grid">
              <div>
                <label>Primary Communication Method</label>
                <input name="clinical.primaryCommunicationMethod" value={getDeep(data, 'clinical.primaryCommunicationMethod') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Supervision Level Required</label>
                <input name="clinical.supervisionLevelRequired" value={getDeep(data, 'clinical.supervisionLevelRequired') || ''} onChange={handleChange} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Communication Needs / Special Instructions</label>
                <textarea name="clinical.communicationNeeds" value={getDeep(data, 'clinical.communicationNeeds') || ''} onChange={handleChange} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Behavioral Safety Considerations (triggers, de-escalation strategies, behavioral support plan on file?)</label>
                <textarea name="clinical.behavioralSafetyConsiderations" value={getDeep(data, 'clinical.behavioralSafetyConsiderations') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Code Status</label>
                <select name="clinical.codeStatus" value={getDeep(data, 'clinical.codeStatus') || ''} onChange={handleChange}>
                  <option value=""> </option>
                  <option>Full Code</option>
                  <option>DNR — on file</option>
                  <option>DNI</option>
                  <option>Comfort Care Only</option>
                  <option>Unknown / Not established</option>
                </select>
              </div>
              <div>
                <label>Additional Clinical Notes</label>
                <input name="clinical.additionalClinicalNotes" value={getDeep(data, 'clinical.additionalClinicalNotes') || ''} onChange={handleChange} />
              </div>
            </div>
          </section>
          )}

          <section className="card">
            <h2>Form 6 — Residential Placement Agreement</h2>
            <p>This agreement is entered into between DOFA Pathways ("the Provider") and the participant named below ("Resident") and/or their authorized representative, for the provision of residential services.</p>
            <h3>Placement Details</h3>
            <div className="grid">
              <div>
                <label className="required">Placement Start Date</label>
                <input type="date" name="placement.placementStartDate" value={getDeep(data, 'placement.placementStartDate') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Residence / Home Address</label>
                <input name="placement.residenceHomeAddress" value={getDeep(data, 'placement.residenceHomeAddress') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Room / Unit Assignment</label>
                <input name="placement.roomUnitAssignment" value={getDeep(data, 'placement.roomUnitAssignment') || ''} onChange={handleChange} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Funding Source(s)</label>
                <div className="checkboxes">
                  {[
                    'DDA Waiver',
                    'Medicaid',
                    'Private Pay',
                    'Grant Funded',
                    'Other',
                  ].map((option) => (
                    <label key={option}>
                      <input
                        type="checkbox"
                        checked={checkboxChecked('placement.fundingSources', option)}
                        onChange={() => handleCheckboxChange('placement.fundingSources', option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Other Funding Details</label>
                <input name="placement.otherFundingDetails" value={getDeep(data, 'placement.otherFundingDetails') || ''} onChange={handleChange} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Financial Arrangement / Private-Pay Rate</label>
                <textarea name="placement.financialArrangement" value={getDeep(data, 'placement.financialArrangement') || ''} onChange={handleChange} />
              </div>
            </div>
            <h3>Services to Be Provided</h3>
            <div className="checkboxes">
              {[
                'Residential Habilitation (24-hr staffing)',
                'Personal Care Assistance',
                'Medication Administration / Management',
                'Meal Preparation',
                'Transportation',
                'Community Integration Activities',
                'Behavioral Support',
                'Nursing / Health Monitoring',
                'Employment / Vocational Support',
                'Individualized Service Plan (ISP) Development',
              ].map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={checkboxChecked('placement.servicesToBeProvided', option)}
                    onChange={() => handleCheckboxChange('placement.servicesToBeProvided', option)}
                  />
                  {option}
                </label>
              ))}
            </div>
            <h3>Resident Rights During Placement</h3>
            <div className="checkboxes">
              {[
                'To be treated with dignity and respect at all times',
                'To have privacy in personal matters and communications',
                'To participate in the development and review of your service plan',
                'To receive services in a safe, clean, and accessible environment',
                'To voice grievances without retaliation',
                'To have personal belongings in your room',
                'To come and go as appropriate to your support needs and plan',
                'To receive visitors at reasonable times',
              ].map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={checkboxChecked('placement.residentRightsDuringPlacement', option)}
                    onChange={() => handleCheckboxChange('placement.residentRightsDuringPlacement', option)}
                  />
                  {option}
                </label>
              ))}
            </div>
            <h3>Fees, Billing & Discharge</h3>
            <p>Discharge / termination may occur with 30 days written notice by either party, or immediately if safety is at risk or funding is discontinued.</p>
            <h3>Acknowledgement & Signature</h3>
            <p>By signing below, the Resident/Representative acknowledges receipt of this agreement, understands the terms, and consents to placement.</p>
            <div className="grid">
              <div>
                <label>Resident / Authorized Representative Signature</label>
                <input name="placement.residentSignature" value={getDeep(data, 'placement.residentSignature') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Resident Signature Date</label>
                <input type="date" name="placement.residentSignatureDate" value={getDeep(data, 'placement.residentSignatureDate') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Witness / Staff Signature</label>
                <input name="placement.witnessStaffSignature" value={getDeep(data, 'placement.witnessStaffSignature') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Witness / Staff Signature Date</label>
                <input type="date" name="placement.witnessStaffSignatureDate" value={getDeep(data, 'placement.witnessStaffSignatureDate') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Printed Name</label>
                <input name="placement.printedName" value={getDeep(data, 'placement.printedName') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Staff Printed Name</label>
                <input name="placement.staffPrintedName" value={getDeep(data, 'placement.staffPrintedName') || ''} onChange={handleChange} />
              </div>
            </div>
          </section>

          <section className="card">
            <h2>Form 7 — Consent for Services & HIPAA Acknowledgement</h2>
            <div className="notice">Participant acknowledges receipt of the Notice of Privacy Practices and understands that PHI may be used or disclosed for treatment, payment, and healthcare operations as permitted by HIPAA.</div>
            <div className="grid">
              <div>
                <label>Consent Scope / Duration</label>
                <select name="consent.scopeDuration" value={getDeep(data, 'consent.scopeDuration') || ''} onChange={handleChange}>
                  <option value=""> </option>
                  <option>Duration of placement</option>
                  <option>Specific period</option>
                  <option>Until revoked in writing</option>
                </select>
              </div>
              <div>
                <label>Consent Start Date</label>
                <input type="date" name="consent.startDate" value={getDeep(data, 'consent.startDate') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Consent End Date</label>
                <input type="date" name="consent.endDate" value={getDeep(data, 'consent.endDate') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Participant / Authorized Representative Signature</label>
                <input name="consent.participantSignature" value={getDeep(data, 'consent.participantSignature') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Date</label>
                <input type="date" name="consent.signatureDate" value={getDeep(data, 'consent.signatureDate') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Staff Witness Signature</label>
                <input name="consent.staffWitnessSignature" value={getDeep(data, 'consent.staffWitnessSignature') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Printed Name</label>
                <input name="consent.printedName" value={getDeep(data, 'consent.printedName') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Relationship</label>
                <input name="consent.relationship" value={getDeep(data, 'consent.relationship') || ''} onChange={handleChange} />
              </div>
            </div>
          </section>

          <section className="card">
            <h2>Form 8 — Release of Information (ROI)</h2>
            <div className="grid">
              <div>
                <label className="required">Participant Full Name</label>
                <input name="roi.participantFullName" value={getDeep(data, 'roi.participantFullName') || ''} onChange={handleChange} />
              </div>
              <div>
                <label className="required">Date of Birth</label>
                <input type="date" name="roi.dateOfBirth" value={getDeep(data, 'roi.dateOfBirth') || ''} onChange={handleChange} />
              </div>
              <div>
                <label className="required">Name / Organization</label>
                <input name="roi.nameOrganization" value={getDeep(data, 'roi.nameOrganization') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Title / Position</label>
                <input name="roi.titlePosition" value={getDeep(data, 'roi.titlePosition') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Phone Number</label>
                <input name="roi.phoneNumber" value={getDeep(data, 'roi.phoneNumber') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Fax Number</label>
                <input name="roi.faxNumber" value={getDeep(data, 'roi.faxNumber') || ''} onChange={handleChange} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Address</label>
                <input name="roi.address" value={getDeep(data, 'roi.address') || ''} onChange={handleChange} />
              </div>
            </div>
            <h3>Type of Information to Be Released</h3>
            <div className="checkboxes">
              {[
                'Discharge Summary',
                'History and Physical Exam',
                'Consultation Reports',
                'Reports of Operation',
                'Medication Records',
                'Imaging / Lab Reports',
                'Nursing Notes',
                'Psychological / Psychiatric Records',
                'ISP / Support Plan',
                'Other',
              ].map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={checkboxChecked('roi.informationTypes', option)}
                    onChange={() => handleCheckboxChange('roi.informationTypes', option)}
                  />
                  {option}
                </label>
              ))}
            </div>
            <h3>Sensitive Information Releases</h3>
            <div className="grid">
              {[
                { label: 'HIV / AIDS Treatment Information', name: 'roi.hivAidsTreatment' },
                { label: 'Mental Health Records', name: 'roi.mentalHealthRecords' },
                { label: 'Substance / Alcohol Abuse Treatment', name: 'roi.substanceAlcoholTreatment' },
                { label: 'Records from Another Provider', name: 'roi.recordsFromAnotherProvider' },
              ].map((field) => (
                <div key={field.name}>
                  <label>{field.label}</label>
                  <select name={field.name} value={getDeep(data, field.name) || ''} onChange={handleChange}>
                    <option value=""> </option>
                    <option>Authorize</option>
                    <option>Do NOT Release</option>
                  </select>
                </div>
              ))}
              <div>
                <label>Authorization Effective Date</label>
                <input type="date" name="roi.effectiveDate" value={getDeep(data, 'roi.effectiveDate') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Authorization Expiration Date</label>
                <input type="date" name="roi.expirationDate" value={getDeep(data, 'roi.expirationDate') || ''} onChange={handleChange} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Purpose of Disclosure</label>
                <div className="checkboxes">
                  {[
                    'At my request',
                    'Healthcare / Treatment',
                    'Payment / Insurance',
                    'Coordination of Services',
                    'Employment',
                    'Other',
                  ].map((option) => (
                    <label key={option}>
                      <input
                        type="checkbox"
                        checked={checkboxChecked('roi.purposeOfDisclosure', option)}
                        onChange={() => handleCheckboxChange('roi.purposeOfDisclosure', option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label>Signature</label>
                <input name="roi.signature" value={getDeep(data, 'roi.signature') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Date</label>
                <input type="date" name="roi.signatureDate" value={getDeep(data, 'roi.signatureDate') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Staff Signature</label>
                <input name="roi.staffSignature" value={getDeep(data, 'roi.staffSignature') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Printed Name</label>
                <input name="roi.printedName" value={getDeep(data, 'roi.printedName') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Relationship</label>
                <input name="roi.relationship" value={getDeep(data, 'roi.relationship') || ''} onChange={handleChange} />
              </div>
            </div>
          </section>

          <section className="card">
            <h2>Form 9 — Rights & Responsibilities Acknowledgement</h2>
            <div className="notice">By signing, the participant or representative acknowledges that the Rights and Responsibilities have been received, read or explained, and understood.</div>
            <div className="grid">
              <div>
                <label>Participant / Representative Signature</label>
                <input name="rights.signature" value={getDeep(data, 'rights.signature') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Date</label>
                <input type="date" name="rights.date" value={getDeep(data, 'rights.date') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Staff Witness</label>
                <input name="rights.staffWitness" value={getDeep(data, 'rights.staffWitness') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Printed Name</label>
                <input name="rights.printedName" value={getDeep(data, 'rights.printedName') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Relationship</label>
                <input name="rights.relationship" value={getDeep(data, 'rights.relationship') || ''} onChange={handleChange} />
              </div>
            </div>
          </section>

          <section className="card">
            <h2>Signature Page — Participant, Guardian & Responsible Party</h2>
            <div className="grid">
              <div>
                <label>Participant Full Name</label>
                <input name="signature.participantFullName" value={getDeep(data, 'signature.participantFullName') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Participant Signature</label>
                <input name="signature.participantSignature" value={getDeep(data, 'signature.participantSignature') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Date</label>
                <input type="date" name="signature.participantDate" value={getDeep(data, 'signature.participantDate') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Phone Number</label>
                <input name="signature.participantPhone" value={getDeep(data, 'signature.participantPhone') || ''} onChange={handleChange} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Participant Address</label>
                <input name="signature.participantAddress" value={getDeep(data, 'signature.participantAddress') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Guardian Full Name</label>
                <input name="signature.guardianFullName" value={getDeep(data, 'signature.guardianFullName') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Guardian Signature</label>
                <input name="signature.guardianSignature" value={getDeep(data, 'signature.guardianSignature') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Guardian Date</label>
                <input type="date" name="signature.guardianDate" value={getDeep(data, 'signature.guardianDate') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Guardian Address</label>
                <input name="signature.guardianAddress" value={getDeep(data, 'signature.guardianAddress') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Guardian Relationship to Participant</label>
                <input name="signature.guardianRelationship" value={getDeep(data, 'signature.guardianRelationship') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Guardian Phone Number</label>
                <input name="signature.guardianPhone" value={getDeep(data, 'signature.guardianPhone') || ''} onChange={handleChange} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Legal Authority / Documentation on File</label>
                <input name="signature.legalAuthorityDocumentation" value={getDeep(data, 'signature.legalAuthorityDocumentation') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Responsible Party Full Name</label>
                <input name="signature.responsiblePartyFullName" value={getDeep(data, 'signature.responsiblePartyFullName') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Responsible Party Signature</label>
                <input name="signature.responsiblePartySignature" value={getDeep(data, 'signature.responsiblePartySignature') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Responsible Party Date</label>
                <input type="date" name="signature.responsiblePartyDate" value={getDeep(data, 'signature.responsiblePartyDate') || ''} onChange={handleChange} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Responsible Party Address</label>
                <input name="signature.responsiblePartyAddress" value={getDeep(data, 'signature.responsiblePartyAddress') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Responsible Party Relationship to Participant</label>
                <input name="signature.responsiblePartyRelationship" value={getDeep(data, 'signature.responsiblePartyRelationship') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Responsible Party Phone Number</label>
                <input name="signature.responsiblePartyPhone" value={getDeep(data, 'signature.responsiblePartyPhone') || ''} onChange={handleChange} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Capacity / Role</label>
                <input name="signature.responsiblePartyCapacityRole" value={getDeep(data, 'signature.responsiblePartyCapacityRole') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Staff Full Name</label>
                <input name="signature.staffFullName" value={getDeep(data, 'signature.staffFullName') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Staff Title</label>
                <input name="signature.staffTitle" value={getDeep(data, 'signature.staffTitle') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Staff Signature</label>
                <input name="signature.staffSignature" value={getDeep(data, 'signature.staffSignature') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Staff Date</label>
                <input type="date" name="signature.staffDate" value={getDeep(data, 'signature.staffDate') || ''} onChange={handleChange} />
              </div>
            </div>
          </section>

          <section className="card">
            <h2>Form 10 — Staff Intake Review & Eligibility Determination</h2>
            <div className="grid">
              <div>
                <label>Intake Review Date</label>
                <input type="date" name="staff.intakeReviewDate" value={getDeep(data, 'staff.intakeReviewDate') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Reviewing Staff / Case Manager</label>
                <input name="staff.reviewingStaff" value={getDeep(data, 'staff.reviewingStaff') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Participant Full Name</label>
                <input name="staff.participantFullName" value={getDeep(data, 'staff.participantFullName') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Date of Admission</label>
                <input type="date" name="staff.dateOfAdmission" value={getDeep(data, 'staff.dateOfAdmission') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Eligibility Status</label>
                <select name="staff.eligibilityStatus" value={getDeep(data, 'staff.eligibilityStatus') || ''} onChange={handleChange}>
                  <option value=""> </option>
                  <option>Approved — Admit to Residential Services</option>
                  <option>Pending — Additional information required</option>
                  <option>Not Eligible — See notes</option>
                </select>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Funding / Program Source Approved</label>
                <div className="checkboxes">
                  {[
                    'DDA Waiver',
                    'Medicaid',
                    'Grant Funded',
                    'Private Pay',
                    'Other',
                  ].map((option) => (
                    <label key={option}>
                      <input
                        type="checkbox"
                        checked={checkboxChecked('staff.fundingSourcesApproved', option)}
                        onChange={() => handleCheckboxChange('staff.fundingSourcesApproved', option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Funding Notes / Program Source Details</label>
                <input name="staff.fundingProgramSourceApproved" value={getDeep(data, 'staff.fundingProgramSourceApproved') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Clinician / Nurse Name</label>
                <input name="staff.clinicianNurseName" value={getDeep(data, 'staff.clinicianNurseName') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>High-Support / Clinical Needs Reviewed By</label>
                <input name="staff.highSupportReviewedBy" value={getDeep(data, 'staff.highSupportReviewedBy') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Clinician Title / Credential</label>
                <input name="staff.clinicianTitleCredential" value={getDeep(data, 'staff.clinicianTitleCredential') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Review Date</label>
                <input type="date" name="staff.reviewDate" value={getDeep(data, 'staff.reviewDate') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Risk Level Confirmed</label>
                <input name="staff.riskLevelConfirmed" value={getDeep(data, 'staff.riskLevelConfirmed') || ''} onChange={handleChange} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Clinical Recommendations / Accommodations</label>
                <textarea name="staff.clinicalRecommendations" value={getDeep(data, 'staff.clinicalRecommendations') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Orientation Scheduled Date</label>
                <input type="date" name="staff.orientationScheduledDate" value={getDeep(data, 'staff.orientationScheduledDate') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Initial ISP Meeting Date</label>
                <input type="date" name="staff.initialIspMeetingDate" value={getDeep(data, 'staff.initialIspMeetingDate') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Assigned Residence / Home</label>
                <input name="staff.assignedResidenceHome" value={getDeep(data, 'staff.assignedResidenceHome') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Assigned Case Manager</label>
                <input name="staff.assignedCaseManager" value={getDeep(data, 'staff.assignedCaseManager') || ''} onChange={handleChange} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Documentation Checklist Status</label>
                <div className="grid">
                  {[
                    { label: 'Form 1 -- Participant Information', name: 'staff.docChecklist.form1' },
                    { label: 'Form 2 -- Emergency Contact & Guardian', name: 'staff.docChecklist.form2' },
                    { label: 'Form 3 -- Referral & Goals', name: 'staff.docChecklist.form3' },
                    { label: 'Form 4 -- Risk Screening', name: 'staff.docChecklist.form4' },
                    { label: 'Form 5 -- Clinical Assessment (if applicable)', name: 'staff.docChecklist.form5' },
                    { label: 'Form 6 -- Placement Agreement', name: 'staff.docChecklist.form6' },
                    { label: 'Form 7 -- Consent & HIPAA', name: 'staff.docChecklist.form7' },
                    { label: 'Form 8 -- Release of Information', name: 'staff.docChecklist.form8' },
                    { label: 'Form 9 -- Rights & Responsibilities', name: 'staff.docChecklist.form9' },
                    { label: 'ID / Photo Identification', name: 'staff.docChecklist.id' },
                    { label: 'Insurance / Medicaid Card', name: 'staff.docChecklist.insurance' },
                    { label: 'Guardianship Documentation (if applicable)', name: 'staff.docChecklist.guardianshipDocs' },
                    { label: 'Physician Orders / Health Summary', name: 'staff.docChecklist.physicianOrders' },
                    { label: 'Current Behavioral Support Plan (if applicable)', name: 'staff.docChecklist.behavioralPlan' },
                    { label: 'ISP from Prior Provider (if applicable)', name: 'staff.docChecklist.ispPriorProvider' },
                  ].map((item) => (
                    <div key={item.name}>
                      <label>{item.label}</label>
                      <select name={item.name} value={getDeep(data, item.name) || ''} onChange={handleChange}>
                        <option value=""> </option>
                        <option>Received</option>
                        <option>N/A</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Funding Notes / Program Source Details</label>
                <input name="staff.fundingProgramSourceApproved" value={getDeep(data, 'staff.fundingProgramSourceApproved') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Clinician / Nurse Name</label>
                <input name="staff.clinicianNurseName" value={getDeep(data, 'staff.clinicianNurseName') || ''} onChange={handleChange} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Staff Notes / Additional Comments</label>
                <textarea name="staff.notes" value={getDeep(data, 'staff.notes') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Intake Coordinator / Case Manager Signature</label>
                <input name="staff.intakeCoordinatorSignature" value={getDeep(data, 'staff.intakeCoordinatorSignature') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Date</label>
                <input type="date" name="staff.signatureDate" value={getDeep(data, 'staff.signatureDate') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Supervisor Signature</label>
                <input name="staff.supervisorSignature" value={getDeep(data, 'staff.supervisorSignature') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Supervisor Title</label>
                <input name="staff.supervisorTitle" value={getDeep(data, 'staff.supervisorTitle') || ''} onChange={handleChange} />
              </div>
              <div>
                <label>Printed Name</label>
                <input name="staff.printedName" value={getDeep(data, 'staff.printedName') || ''} onChange={handleChange} />
              </div>
            </div>
          </section>
        </form>
      </main>

      <div className="actions">
        <button type="button" onClick={submitToGoogleSheets} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        <button type="button" className="light" onClick={saveDraft}>Save Draft in Browser</button>
        <button type="button" className="light" onClick={loadDraft}>Load Draft</button>
      </div>
    </div>
  );
}

export default App;
