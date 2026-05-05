const CONFIG = {
  driveFolderId: '10TLoTQO6Qd1ifKNlgSnWiU-m7JUluSKR',
  sheetName: 'DOFA Intake Entries',
  templateDocId: '1e-t-4HYnEECYgqd5Vng4xTKCy_ats9k-qAW3HXrCzTc',
  emailRecipients: 'chideraigboka7@gmail.com',
  emailPdfAsAttachment: true,
};

const FIELD_SCHEMA = [
  section('Cover / Admission Summary', [
    text('cover.participantName', 'Participant Name'),
    dateField('cover.dateOfAdmission', 'Date of Admission'),
    text('cover.assignedResidence', 'Assigned Residence'),
    text('cover.assignedCaseManager', 'Assigned Case Manager'),
  ]),
  section('New Admission Documentation Checklist', [
    checks('checklist.identification', '1. Required Documents & Information - A. Identification', [
      'Social Security card',
      'State ID',
      'Insurance / Medicaid / Medicare cards',
    ]),
    checks('checklist.personCenteredPlan', '1. Required Documents & Information - B. Person-Centered Plan (PCP)', [
      'Current approved PCP',
      'Any recent PCP addendums or revisions',
      'Goals, outcomes, and support needs relevant to residential services',
    ]),
    checks('checklist.clinicalFunctionalInformation', '1. Required Documents & Information - C. Clinical / Functional Information', [
      'Full Current Nursing Assessment (if applicable)',
      'Health Risk Screening Tool (HRST)',
      'Medication list',
      'MARs (Medication Administration Records) for last 3–6 months',
      'Current physician orders',
      'Behavioral support plan (if applicable)',
      'Therapy plans (OT, PT, Speech, etc.)',
      'Recent medical summaries or discharge summaries',
    ]),
    checks('checklist.healthMedicalRecords', '2. Health & Medical Records', [
      'Complete medical history',
      'Allergies',
      'Immunization record',
      'Last annual physical & dental exam',
    ]),
    checks('checklist.legalDocuments', '3. Legal Documents (If Applicable)', [
      'Guardianship letters / POA documentation',
      'Court orders (if any)',
      'Authorized representative forms',
    ]),
    checks('checklist.residentialDailySupportDetails', '4. Residential / Daily Support Details', [
      'Staffing needs (1:1 hours, overnight support, etc.)',
      'Dietary needs and meal plans',
      'Transportation needs',
      'List of assistive devices: wheelchair, gait belt, communication device, etc.',
    ]),
    checks('checklist.personalBelongingsTransitionPlanning', '5. Personal Belongings & Transition Planning', [
      'Inventory list of personal property',
      'Transfer of clothing, equipment, personal items',
      'Handover of durable medical equipment',
      'Date of move agreed by all parties',
      'Orientation meeting between individual, new provider, CCS, and (if appropriate) family/guardian',
    ]),
  ]),
  section('Form 1 - Participant Information & Demographics', [
    text('participant.fullLegalName', 'Full Legal Name'),
    text('participant.preferredName', 'Preferred Name / Nickname'),
    dateField('participant.dateOfBirth', 'Date of Birth'),
    text('participant.ssnLast4', 'Social Security # Last 4 Digits'),
    text('participant.genderIdentity', 'Gender Identity'),
    text('participant.pronouns', 'Pronouns'),
    checks('participant.raceEthnicity', 'Race / Ethnicity', [
      'American Indian / Alaska Native',
      'Asian',
      'Black / African American',
      'Hispanic / Latino',
      'Native Hawaiian / Pacific Islander',
      'White',
      'Two or more races',
      'Prefer not to say',
    ]),
    text('participant.currentAddress', 'Current Address'),
    text('participant.primaryPhone', 'Primary Phone'),
    text('participant.alternatePhone', 'Alternate Phone'),
    text('participant.email', 'Email Address'),
    text('participant.preferredContactMethod', 'Preferred Contact Method'),
    text('participant.currentHousingStatus', 'Current Housing Status'),
    text('participant.educationLevel', 'Education Level'),
    text('participant.employmentStatus', 'Employment Status'),
    text('participant.primaryLanguage', 'Primary Language'),
    text('participant.medicaidId', 'Medicaid ID #'),
    text('participant.medicareId', 'Medicare ID #'),
    text('participant.primaryInsurance', 'Primary Insurance / Payer'),
    text('participant.policyMemberId', 'Policy / Member ID'),
  ]),
  section('Form 2 - Emergency Contact & Guardian Information', [
    text('emergency.contactFullName', 'Emergency Contact Full Name'),
    text('emergency.relationship', 'Relationship to Participant'),
    text('emergency.primaryPhone', 'Primary Phone'),
    text('emergency.alternatePhone', 'Alternate Phone'),
    text('emergency.address', 'Address'),
    select('emergency.hasGuardian', 'Has Legal Guardian?', ['Yes', 'No']),
    text('emergency.guardianFullName', 'Guardian / Representative Full Name'),
    text('emergency.guardianRelationship', 'Guardian Relationship'),
    text('emergency.guardianPhone', 'Guardian Primary Phone'),
    text('emergency.guardianEmail', 'Guardian Email'),
    text('emergency.guardianMailingAddress', 'Guardian Mailing Address'),
    longText('emergency.legalAuthority', 'Legal Authority / Scope'),
    checks('emergency.documentation', 'Documentation', [
      'Power of Attorney on file',
      'Guardianship Order on file',
      'Healthcare Proxy on file',
      'None - participant self-directs',
    ]),
  ]),
  section('Form 3 - Referral, Program Interest & Goals', [
    text('referral.referralSource', 'Referral Source'),
    text('referral.referringAgencyPerson', 'Referring Agency / Person'),
    dateField('referral.referralDate', 'Referral Date'),
    text('referral.referralContactPhone', 'Referral Contact Phone'),
    longText('referral.reason', 'Reason for Seeking Residential Services'),
    checks('referral.programsOfInterest', 'Programs of Interest', [
      'Group Home / Residential Habilitation',
      'Supported Living',
      'Community Development Services (CDS)',
      'Day Habilitation',
      'Employment / Vocational Support',
      'Behavioral Support Services',
      'Family / Caregiver Support',
      'Respite Services',
    ]),
    text('referral.housingStatusAtReferral', 'Housing Status at Referral'),
    text('referral.incomeSources', 'Income Source(s)'),
    checks('referral.areasOfSupportNeeded', 'Areas of Support Needed', [
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
    ]),
    longText('referral.shortTermGoals', 'Short-Term Goals (0–6 months)'),
    longText('referral.longTermGoals', 'Long-Term Goals (6+ months)'),
  ]),
  section('Form 4 - Risk Screening', [
    checks('risk.indicators', 'Risk Indicators (check all that apply)', [
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
    ]),
    longText('risk.description', 'Describe any checked risk indicators (dates, frequency, context, current status)'),
    text('risk.otherIndicator', 'Other Risk Indicator'),
    select('risk.overallRiskLevel', 'Overall Risk Level Assessment', ['Low', 'Moderate', 'High', 'Requires Clinical Review']),
    select('risk.form5Required', 'Clinical / High-Support Section Required?', ['Yes - proceed to Form 5', 'No - skip to Form 6']),
  ]),
  section('Form 5 - Clinical / High-Support Needs Assessment', [
    longText('clinical.primaryDiagnoses', 'Primary Diagnosis / Diagnoses (ICD codes if available)'),
    longText('clinical.knownAllergies', 'Known Allergies (medications, food, environmental)'),
    checks('clinical.dietaryNeeds', 'Dietary Needs', [
      'No restrictions',
      'Texture-modified diet',
      'Low sodium',
      'Diabetic diet',
      'Vegetarian / Vegan',
      'Religious dietary restrictions',
      'Other',
    ]),
    longText('clinical.dietaryDetails', 'Dietary Details / Restrictions'),
    select('clinical.dailyLivingSupportLevel', 'Daily Living Support Level Required:', ['Independent', 'Minimal Assistance', 'Moderate Assistance', 'Extensive Assistance', 'Total Assistance']),
    select('clinical.mobilityNeeds', 'Mobility Needs:', ['Ambulatory - independent', 'Ambulatory - with device', 'Wheelchair - self-propelled', 'Wheelchair - dependent', 'Bed-bound / transfer required']),
    checks('clinical.assistiveDevices', 'Assistive Devices / Equipment', [
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
    ]),
    text('clinical.primaryCommunicationMethod', 'Primary Communication Method'),
    text('clinical.supervisionLevelRequired', 'Supervision Level Required'),
    longText('clinical.communicationNeeds', 'Communication Needs / Special Instructions'),
    longText('clinical.behavioralSafetyConsiderations', 'Behavioral Safety Considerations'),
    select('clinical.codeStatus', 'Code Status', ['Full Code', 'DNR - on file', 'DNI', 'Comfort Care Only', 'Unknown / Not established']),
    text('clinical.additionalClinicalNotes', 'Additional Clinical Notes'),
  ]),
  section('Form 6 - Residential Placement Agreement', [
    dateField('placement.placementStartDate', 'Placement Start Date'),
    text('placement.residenceHomeAddress', 'Residence / Home Address'),
    text('placement.roomUnitAssignment', 'Room / Unit Assignment'),
    checks('placement.fundingSources', 'Funding Source(s)', ['DDA Waiver', 'Medicaid', 'Private Pay', 'Grant Funded', 'Other']),
    text('placement.otherFundingDetails', 'Other Funding Details'),
    checks('placement.servicesToBeProvided', 'Services to Be Provided', [
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
    ]),
    checks('placement.residentRightsDuringPlacement', 'Resident Rights During Placement', [
      'To be treated with dignity and respect at all times',
      'To have privacy in personal matters and communications',
      'To participate in the development and review of your service plan',
      'To receive services in a safe, clean, and accessible environment',
      'To voice grievances without retaliation',
      'To have personal belongings in your room',
      'To come and go as appropriate to your support needs and plan',
      'To receive visitors at reasonable times',
    ]),
    longText('placement.financialArrangement', 'Financial Arrangement / Private-Pay Rate'),
    text('placement.residentSignature', 'Resident / Authorized Representative Signature'),
    dateField('placement.residentSignatureDate', 'Resident Signature Date'),
    text('placement.witnessStaffSignature', 'Witness / Staff Signature'),
    dateField('placement.witnessStaffSignatureDate', 'Witness / Staff Signature Date'),
    text('placement.printedName', 'Printed Name'),
    text('placement.staffPrintedName', 'Staff Printed Name'),
  ]),
  section('Form 7 - Consent for Services & HIPAA Acknowledgement', [
    select('consent.scopeDuration', 'Consent Scope / Duration', ['Duration of placement', 'Specific period', 'Until revoked in writing']),
    dateField('consent.startDate', 'Consent Start Date'),
    dateField('consent.endDate', 'Consent End Date'),
    text('consent.participantSignature', 'Participant / Authorized Representative Signature'),
    dateField('consent.signatureDate', 'Date'),
    text('consent.staffWitnessSignature', 'Staff Witness Signature'),
    text('consent.printedName', 'Printed Name'),
    text('consent.relationship', 'Relationship'),
  ]),
  section('Form 8 - Release of Information (ROI)', [
    text('roi.participantFullName', 'Participant Full Name'),
    dateField('roi.dateOfBirth', 'Date of Birth'),
    text('roi.nameOrganization', 'Name / Organization'),
    text('roi.titlePosition', 'Title / Position'),
    text('roi.phoneNumber', 'Phone Number'),
    text('roi.faxNumber', 'Fax Number'),
    text('roi.address', 'Address'),
    checks('roi.informationTypes', 'Type of Information to Be Released', [
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
    ]),
    // Sensitive Information - changed to checkboxes for Authorize
    checks('roi.hivAidsAuthorize', 'HIV / AIDS Treatment - Authorize', ['Authorize']),
    checks('roi.mentalHealthAuthorize', 'Mental Health Records - Authorize', ['Authorize']),
    checks('roi.substanceAlcoholAuthorize', 'Substance / Alcohol Abuse Treatment - Authorize', ['Authorize']),
    checks('roi.recordsFromAnotherAuthorize', 'Records from Another Provider - Authorize', ['Authorize']),
    checks('roi.purposeOfDisclosure', 'Purpose of Disclosure', ['At my request', 'Healthcare / Treatment', 'Payment / Insurance', 'Coordination of Services', 'Employment', 'Other']),
    dateField('roi.effectiveDate', 'Authorization Effective Date'),
    dateField('roi.expirationDate', 'Authorization Expiration Date'),
    text('roi.signature', 'Participant / Authorized Representative Signature'),
    dateField('roi.signatureDate', 'Date'),
    text('roi.staffSignature', 'Staff Signature'),
    text('roi.printedName', 'Printed Name'),
    text('roi.relationship', 'Relationship'),
  ]),
  section('Form 9 - Rights & Responsibilities Acknowledgement', [
    text('rights.signature', 'Participant / Representative Signature'),
    dateField('rights.date', 'Date'),
    text('rights.staffWitness', 'Staff Witness'),
    text('rights.printedName', 'Printed Name'),
    text('rights.relationship', 'Relationship'),
  ]),
  section('Signature Page - Participant, Guardian & Responsible Party', [
    text('signature.participantFullName', 'Participant Full Name'),
    text('signature.participantSignature', 'Participant Signature'),
    dateField('signature.participantDate', 'Date'),
    text('signature.participantAddress', 'Participant Address'),
    text('signature.participantPhone', 'Participant Phone Number'),
    text('signature.guardianFullName', 'Guardian Full Name'),
    text('signature.guardianSignature', 'Guardian Signature'),
    dateField('signature.guardianDate', 'Guardian Date'),
    text('signature.guardianRelationship', 'Guardian Relationship to Participant'),
    text('signature.guardianPhone', 'Guardian Phone Number'),
    text('signature.guardianAddress', 'Guardian Address'),
    text('signature.legalAuthorityDocumentation', 'Legal Authority / Documentation on File'),
    text('signature.responsiblePartyFullName', 'Responsible Party Full Name'),
    text('signature.responsiblePartySignature', 'Responsible Party Signature'),
    dateField('signature.responsiblePartyDate', 'Responsible Party Date'),
    text('signature.responsiblePartyAddress', 'Responsible Party Address'),
    text('signature.responsiblePartyRelationship', 'Responsible Party Relationship to Participant'),
    text('signature.responsiblePartyPhone', 'Responsible Party Phone Number'),
    text('signature.responsiblePartyCapacityRole', 'Capacity / Role'),
    text('signature.staffFullName', 'Staff Full Name'),
    text('signature.staffTitle', 'Staff Title'),
    text('signature.staffSignature', 'Staff Signature'),
    dateField('signature.staffDate', 'Staff Date'),
  ]),
  section('Form 10 - Staff Intake Review & Eligibility Determination', [
    dateField('staff.intakeReviewDate', 'Intake Review Date'),
    text('staff.reviewingStaff', 'Reviewing Staff / Case Manager'),
    text('staff.participantFullName', 'Participant Full Name'),
    dateField('staff.dateOfAdmission', 'Date of Admission'),
    select('staff.eligibilityStatus', 'Eligibility Status', ['Approved - Admit to Residential Services', 'Pending - Additional information required', 'Not Eligible - See notes']),
    checks('staff.fundingSourcesApproved', 'Funding / Program Source Approved', ['DDA Waiver', 'Medicaid', 'Private Pay', 'Grant Funded', 'Other']),
    text('staff.fundingProgramSourceApproved', 'Funding Notes / Program Source Details'),
    text('staff.highSupportReviewedBy', 'High-Support / Clinical Needs Reviewed By'),
    text('staff.clinicianNurseName', 'Clinician / Nurse Name'),
    text('staff.clinicianTitleCredential', 'Title / Credential'),
    dateField('staff.reviewDate', 'Review Date'),
    text('staff.riskLevelConfirmed', 'Risk Level Confirmed'),
    longText('staff.clinicalRecommendations', 'Clinical Recommendations / Accommodations'),
    // Documentation Checklist with Received / N/A
    status('staff.docChecklist.form1', 'Form 1 - Participant Information'),
    status('staff.docChecklist.form2', 'Form 2 - Emergency Contact & Guardian'),
    status('staff.docChecklist.form3', 'Form 3 - Referral & Goals'),
    status('staff.docChecklist.form4', 'Form 4 - Risk Screening'),
    status('staff.docChecklist.form5', 'Form 5 - Clinical Assessment'),
    status('staff.docChecklist.form6', 'Form 6 - Placement Agreement'),
    status('staff.docChecklist.form7', 'Form 7 - Consent & HIPAA'),
    status('staff.docChecklist.form8', 'Form 8 - Release of Information'),
    status('staff.docChecklist.form9', 'Form 9 - Rights & Responsibilities'),
    status('staff.docChecklist.id', 'ID / Photo Identification'),
    status('staff.docChecklist.insurance', 'Insurance / Medicaid Card'),
    status('staff.docChecklist.guardianshipDocs', 'Guardianship Documentation'),
    status('staff.docChecklist.physicianOrders', 'Physician Orders / Health Summary'),
    status('staff.docChecklist.behavioralPlan', 'Current Behavioral Support Plan'),
    status('staff.docChecklist.ispPriorProvider', 'ISP from Prior Provider'),
    dateField('staff.orientationScheduledDate', 'Orientation Scheduled Date'),
    dateField('staff.initialIspMeetingDate', 'Initial ISP Meeting Date'),
    text('staff.assignedResidenceHome', 'Assigned Residence / Home'),
    text('staff.assignedCaseManager', 'Assigned Case Manager'),
    longText('staff.notes', 'Staff Notes / Additional Comments'),
    text('staff.intakeCoordinatorSignature', 'Intake Coordinator / Case Manager Signature'),
    dateField('staff.signatureDate', 'Date'),
    text('staff.supervisorSignature', 'Supervisor Signature'),
    text('staff.printedName', 'Printed Name'),
    text('staff.supervisorTitle', 'Title'),
  ]),
];

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const result = saveSubmission(payload);
    return jsonResponse({ ok: true, ...result });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error && error.message ? error.message : error) });
  }
}

function setupWorkbook() {
  const sheet = getSheet();
  ensureHeaders(sheet);
}

function saveSubmission(data) {
  try {
    const sheet = getSheet();
    const headers = ensureHeaders(sheet);
    const entryId = Utilities.getUuid();
    const submittedAt = new Date();
    let pdfFile;
    try {
      pdfFile = createPdf(data, entryId);
    } catch (pdfError) {
      Logger.log('PDF creation failed, continuing with spreadsheet save: ' + pdfError);
      pdfFile = {
        getUrl: function() { return 'PDF creation failed: ' + pdfError.message; },
        getId: function() { return 'failed'; }
      };
    }
    const rowObject = buildRowObject(data, entryId, submittedAt, pdfFile.getUrl());
    sheet.appendRow(headers.map((header) => rowObject[header] || ''));
    try {
      sendNotification(data, pdfFile);
    } catch (emailError) {
      Logger.log('Email notification failed: ' + emailError);
    }
    return { entryId, pdfUrl: pdfFile.getUrl(), pdfId: pdfFile.getId() };
  } catch (error) {
    Logger.log('Submission save error: ' + error);
    throw new Error('Failed to save submission: ' + error.message);
  }
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(CONFIG.sheetName) || spreadsheet.insertSheet(CONFIG.sheetName);
}

function ensureHeaders(sheet) {
  const headers = buildHeaders();
  const current = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), headers.length)).getValues()[0].filter(String);
  if (current.join('|') !== headers.join('|')) {
    sheet.clear();
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  }
  return headers;
}

function buildHeaders() {
  const headers = ['Entry ID', 'Submitted At', 'PDF URL', 'Raw JSON'];
  flattenFields().forEach((field) => {
    if (field.type === 'checkboxGroup') {
      field.options.forEach((option) => headers.push(`${field.section} | ${field.label} | ${option}`));
      headers.push(`${field.section} | ${field.label} | Selected`);
    } else {
      headers.push(`${field.section} | ${field.label}`);
    }
  });
  return headers;
}

function buildRowObject(data, entryId, submittedAt, pdfUrl) {
  const row = {
    'Entry ID': entryId,
    'Submitted At': submittedAt,
    'PDF URL': pdfUrl,
    'Raw JSON': JSON.stringify(data || {}),
  };
  flattenFields().forEach((field) => {
    const value = getDeep(data, field.name);
    if (field.type === 'checkboxGroup') {
      const selected = Array.isArray(value) ? value : [];
      field.options.forEach((option) => {
        row[`${field.section} | ${field.label} | ${option}`] = selected.includes(option) ? 'Yes' : 'No';
      });
      row[`${field.section} | ${field.label} | Selected`] = selected.join(', ');
    } else {
      row[`${field.section} | ${field.label}`] = formatValue(value);
    }
  });
  return row;
}

function createPdf(data, entryId) {
  try {
    if (CONFIG.templateDocId) {
      return createPdfFromTemplate(data, entryId);
    }
    return createSummaryPdf(data, entryId);
  } catch (error) {
    Logger.log('PDF creation error: ' + error);
    return {
      getUrl: function() { return 'PDF creation failed: ' + error.message; },
      getId: function() { return 'failed'; }
    };
  }
}

function createPdfFromTemplate(data, entryId) {
  try {
    const name = `DOFA Intake - ${safeName(getDeep(data, 'cover.participantName') || getDeep(data, 'participant.fullLegalName') || entryId)}`;
    const folder = DriveApp.getFolderById(CONFIG.driveFolderId);
    const templateFile = DriveApp.getFileById(CONFIG.templateDocId);
    const workingCopy = templateFile.makeCopy(`${name} - Working Copy`, folder);
    const doc = DocumentApp.openById(workingCopy.getId());
    const body = doc.getBody();

    // Build replacement values
    const replacements = buildReplacements(data, entryId);

    // Replace each placeholder
    Object.keys(replacements).forEach((placeholder) => {
      const searchText = `{{${placeholder}}}`;
      const replacementValue = replacements[placeholder];
      try {
        body.replaceText(searchText, replacementValue);
      } catch (e) {
        Logger.log(`Failed to replace {{${placeholder}}}: ${e.message}`);
      }
    });

    doc.saveAndClose();
    const pdfBlob = workingCopy.getAs(MimeType.PDF).setName(`${name}.pdf`);
    const pdfFile = folder.createFile(pdfBlob);
    workingCopy.setTrashed(true);
    return pdfFile;
  } catch (error) {
    Logger.log('Template PDF creation error: ' + error);
    throw new Error('Failed to create PDF from template: ' + error.message);
  }
}

function createSummaryPdf(data, entryId) {
  try {
    const name = `DOFA Intake - ${safeName(getDeep(data, 'cover.participantName') || getDeep(data, 'participant.fullLegalName') || entryId)}`;
    const doc = DocumentApp.create(name);
    const body = doc.getBody();

    body.appendParagraph('DOFA PATHWAYS').setHeading(DocumentApp.ParagraphHeading.TITLE);
    body.appendParagraph('Residential Services - New Admission Intake Package');
    body.appendParagraph(`Entry ID: ${entryId}`);
    body.appendParagraph(`Generated: ${new Date().toLocaleString()}`);
    body.appendParagraph('');

    const replacements = buildReplacements(data, entryId);

    FIELD_SCHEMA.forEach((sectionDef) => {
      body.appendParagraph(sectionDef.title).setHeading(DocumentApp.ParagraphHeading.HEADING1);
      body.appendParagraph('');
      
      sectionDef.fields.forEach((field) => {
        const value = replacements[field.name];
        
        if (field.type === 'checkboxGroup') {
          body.appendParagraph(field.label + ':');
          field.options.forEach((option) => {
            const slugged = slug(option);
            const checked = value && value.includes(option) ? '[✓]' : '[ ]';
            body.appendParagraph(`  ${checked} ${option}`);
          });
        } else {
          body.appendParagraph(`${field.label}: ${value || '—'}`);
        }
        body.appendParagraph('');
      });
      body.appendParagraph('');
    });

    doc.saveAndClose();
    const docFile = DriveApp.getFileById(doc.getId());
    const pdfBlob = docFile.getAs(MimeType.PDF).setName(`${name}.pdf`);
    const folder = DriveApp.getFolderById(CONFIG.driveFolderId);
    const pdfFile = folder.createFile(pdfBlob);
    docFile.setTrashed(true);
    return pdfFile;
  } catch (error) {
    Logger.log('Summary PDF creation error: ' + error);
    throw new Error('Failed to create summary PDF: ' + error.message);
  }
}

function buildReplacements(data, entryId) {
  const replacements = {
    entryId: entryId,
    submittedAt: new Date().toLocaleString(),
  };

  flattenFields().forEach((field) => {
    const value = getDeep(data, field.name);
    
    if (field.type === 'checkboxGroup') {
      const selected = Array.isArray(value) ? value : [];
      replacements[field.name] = selected.join(', ');
      field.options.forEach((option) => {
        const slugged = slug(option);
        replacements[`${field.name}.${slugged}`] = selected.includes(option) ? '✓' : '☐';
      });
    } else if (field.type === 'select' && field.options && field.options.length === 2 && field.options[0] === 'Received' && field.options[1] === 'N/A') {
      // STATUS FIELDS (Received / N/A)
      replacements[field.name] = value || '';
      
      if (value === 'Received') {
        replacements[`${field.name}.received`] = 'Received';
        replacements[`${field.name}.n_a`] = '';
      } else if (value === 'N/A') {
        replacements[`${field.name}.received`] = '';
        replacements[`${field.name}.n_a`] = '✓';
      } else {
        // Neither selected
        replacements[`${field.name}.received`] = '☐';
        replacements[`${field.name}.n_a`] = '☐';
      }
    } else if (field.type === 'select') {
      replacements[field.name] = value || '';
      if (field.options && field.options.length) {
        field.options.forEach((option) => {
          const slugged = slug(option);
          replacements[`${field.name}.${slugged}`] = value === option ? '✓' : '☐';
        });
      }
    } else if (field.type === 'date') {
      replacements[field.name] = value ? new Date(value).toLocaleDateString() : '';
    } else {
      replacements[field.name] = formatValue(value);
    }
  });

  return replacements;
}

function sendNotification(data, pdfFile) {
  const recipients = CONFIG.emailRecipients.trim();
  if (!recipients) return;
  const participant = getDeep(data, 'cover.participantName') || getDeep(data, 'participant.fullLegalName') || 'Participant';
  const options = {
    name: 'DOFA Pathways Intake',
    htmlBody: `<p>A new DOFA intake submission was received for <strong>${participant}</strong>.</p><p>PDF: <a href="${pdfFile.getUrl()}">${pdfFile.getName()}</a></p>`,
  };
  if (CONFIG.emailPdfAsAttachment) options.attachments = [pdfFile.getBlob()];
  MailApp.sendEmail(recipients, `DOFA Intake Submission - ${participant}`, `PDF: ${pdfFile.getUrl()}`, options);
}

function flattenFields() {
  return FIELD_SCHEMA.flatMap((sectionDef) => sectionDef.fields.map((field) => ({ ...field, section: sectionDef.title })));
}

function getDeep(data, path) {
  return path.split('.').reduce((value, key) => value && value[key] !== undefined ? value[key] : '', data || {});
}

function formatValue(value) {
  if (Array.isArray(value)) return value.join(', ');
  if (value === null || value === undefined) return '';
  return String(value);
}

function safeName(value) {
  return String(value).replace(/[\\/:*?"<>|#%{}~&]/g, '-').slice(0, 120);
}

function slug(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 80);
}

function escapeForReplaceText(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}

function section(title, fields) {
  return { title, fields };
}

function text(name, label) {
  return { type: 'text', name, label };
}

function longText(name, label) {
  return { type: 'longText', name, label };
}

function dateField(name, label) {
  return { type: 'date', name, label };
}

function select(name, label, options) {
  return { type: 'select', name, label, options };
}

function checks(name, label, options) {
  return { type: 'checkboxGroup', name, label, options };
}

function status(name, label) {
  return select(name, label, ['Received', 'N/A']);
}

function testPopulateTemplate() {
  const testData = {
    "cover": {
      "participantName": "Chidera Igboka",
      "assignedResidence": "Enugu house",
      "assignedCaseManager": "Bumi",
      "dateOfAdmission": "2026-05-28"
    },
    "checklist": {
      "identification": ["Social Security card", "Insurance / Medicaid / Medicare cards", "State ID"],
      "personCenteredPlan": ["Any recent PCP addendums or revisions", "Goals, outcomes, and support needs relevant to residential services"],
      "clinicalFunctionalInformation": ["Therapy plans (OT, PT, Speech, etc.)", "MARs (Medication Administration Records) for last 3–6 months", "Recent medical summaries or discharge summaries"],
      "healthMedicalRecords": ["Immunization record", "Allergies"],
      "legalDocuments": ["Court orders (if any)", "Guardianship letters / POA documentation"],
      "residentialDailySupportDetails": ["Staffing needs (1:1 hours, overnight support, etc.)", "Dietary needs and meal plans", "List of assistive devices: wheelchair, gait belt, communication device, etc."],
      "personalBelongingsTransitionPlanning": ["Date of move agreed by all parties", "Inventory list of personal property", "Handover of durable medical equipment", "Orientation meeting between individual, new provider, CCS, and (if appropriate) family/guardian"]
    },
    "participant": {
      "fullLegalName": "Igboka Chidera",
      "preferredName": "Bumi",
      "dateOfBirth": "2026-05-03",
      "ssnLast4": "8783",
      "genderIdentity": "Male",
      "pronouns": "Chi Chi",
      "raceEthnicity": ["Black / African American"],
      "currentAddress": "Irawo",
      "email": "igbokamalachi@gmail.com",
      "primaryPhone": "0904342342",
      "alternatePhone": "234 0993432",
      "preferredContactMethod": "WhatsApp",
      "currentHousingStatus": "Lagos",
      "educationLevel": "University",
      "employmentStatus": "Student",
      "primaryLanguage": "Igbo",
      "medicaidId": "ID43453453",
      "medicareId": "MD4365342",
      "primaryInsurance": "Base",
      "policyMemberId": "2423458"
    },
    "emergency": {
      "contactFullName": "Chidera Igboka",
      "relationship": "Brother",
      "primaryPhone": "039430943",
      "alternatePhone": "204459394",
      "hasGuardian": "Yes",
      "guardianFullName": "Chidera Malachi Igboka",
      "address": "Irawo",
      "guardianRelationship": "Brother",
      "guardianPhone": "090343453",
      "guardianEmail": "igbokamalachi@gmail.com",
      "guardianMailingAddress": "Igboka's Compound, Amuri Rd., Agenugu State",
      "documentation": ["Power of Attorney on file", "None - participant self-directs"],
      "legalAuthority": "example legal scope here"
    },
    "referral": {
      "referralSource": "LinkedIn",
      "referringAgencyPerson": "Planum",
      "referralDate": "2026-05-03",
      "referralContactPhone": "09034534",
      "reason": "I just want to check out another house",
      "programsOfInterest": ["Group Home / Residential Habilitation", "Day Habilitation"],
      "housingStatusAtReferral": "Need",
      "incomeSources": "$1,200",
      "shortTermGoals": "3 month I want to make 5 million",
      "longTermGoals": "In 10 months I want to make 120 million dollars",
      "areasOfSupportNeeded": ["Personal Care / ADLs", "Behavioral Support", "Social Skills", "Medication Management", "Community Integration", "Communication Support"]
    },
    "risk": {
      "indicators": ["History of psychiatric hospitalization", "Aggression toward others", "History of trauma / abuse"],
      "description": "I don't have strength to explain anything to you",
      "overallRiskLevel": "Moderate",
      "form5Required": "Yes - proceed to Form 5"
    },
    "placement": {
      "placementStartDate": "2026-05-29",
      "residenceHomeAddress": "Irawo",
      "roomUnitAssignment": "4",
      "fundingSources": ["Private Pay"],
      "financialArrangement": "this and that",
      "servicesToBeProvided": ["Medication Administration / Management", "Nursing / Health Monitoring", "Meal Preparation"],
      "residentRightsDuringPlacement": ["To voice grievances without retaliation"],
      "residentSignature": "Chidera",
      "residentSignatureDate": "2026-05-03",
      "witnessStaffSignature": "Bumi",
      "witnessStaffSignatureDate": "2026-05-29",
      "printedName": "Chidera",
      "staffPrintedName": "Chi Buki"
    },
    "roi": {
      "participantFullName": "Chidera Malachi Igboka",
      "dateOfBirth": "2026-05-03",
      "nameOrganization": "Proneat",
      "titlePosition": "Front End Developer",
      "phoneNumber": "09034434",
      "faxNumber": "24534",
      "address": "Igboka's Compound, Amuri Rd., Agenugu State",
      "informationTypes": ["ISP / Support Plan", "Reports of Operation"],
      "hivAidsAuthorize": ["Authorize"],
      "mentalHealthAuthorize": [],
      "substanceAlcoholAuthorize": ["Authorize"],
      "recordsFromAnotherAuthorize": ["Authorize"],
      "purposeOfDisclosure": ["Payment / Insurance"],
      "effectiveDate": "2026-05-28",
      "expirationDate": "2026-05-28",
      "signatureDate": "2026-05-30",
      "signature": "Chidera",
      "printedName": "Chidra",
      "relationship": "Friend",
      "staffSignature": "Bookie"
    },
    "clinical": {
      "primaryDiagnoses": "ICD examples",
      "knownAllergies": "I don't know any",
      "dietaryNeeds": ["Low sodium", "Diabetic diet"],
      "dietaryDetails": "I don't know any",
      "dailyLivingSupportLevel": "Moderate Assistance",
      "mobilityNeeds": "Wheelchair - self-propelled",
      "assistiveDevices": ["Oxygen", "Wheelchair"],
      "primaryCommunicationMethod": "Book",
      "supervisionLevelRequired": "Room",
      "communicationNeeds": "this and that",
      "codeStatus": "DNR - on file",
      "additionalClinicalNotes": "no note",
      "behavioralSafetyConsiderations": "this is bad"
    },
    "consent": {
      "scopeDuration": "Duration of placement",
      "startDate": "2026-05-03",
      "endDate": "2026-05-03",
      "signatureDate": "2026-05-03",
      "printedName": "Hello",
      "relationship": "Friend",
      "staffWitnessSignature": "Chidera",
      "participantSignature": "Chidrea"
    },
    "signature": {
      "participantFullName": "Chidera Igboka",
      "participantSignature": "Chidera Signature",
      "participantDate": "2026-05-31",
      "participantAddress": "Irawo",
      "participantPhone": "645343",
      "guardianFullName": "Chidera Malachi Igboka",
      "guardianSignature": "Guardian Signature Here",
      "guardianAddress": "Irawo",
      "responsiblePartyFullName": "Chidera Malachi Igboka",
      "guardianDate": "2026-05-28",
      "guardianPhone": "090675645",
      "guardianRelationship": "Brother",
      "legalAuthorityDocumentation": "Power of Attorney document on file",
      "responsiblePartySignature": "Responsible Party Signature",
      "responsiblePartyDate": "2026-05-30",
      "responsiblePartyAddress": "Igboka's Compound, Amuri Rd., Agenugu State",
      "responsiblePartyRelationship": "Brother",
      "responsiblePartyPhone": "090675645",
      "responsiblePartyCapacityRole": "Legal Guardian",
      "staffFullName": "Staff Full Name Here",
      "staffTitle": "Intake Coordinator",
      "staffSignature": "Staff Signature Here",
      "staffDate": "2026-05-30"
    },
    "rights": {
      "signature": "Chidra",
      "date": "2026-05-30",
      "staffWitness": "Staff Witness Name",
      "printedName": "Me",
      "relationship": "Boyfriend"
    },
    "staff": {
      "intakeReviewDate": "2026-05-27",
      "reviewingStaff": "Reviewing Staff Name",
      "participantFullName": "Igboka Chidera",
      "dateOfAdmission": "2026-05-28",
      "eligibilityStatus": "Approved - Admit to Residential Services",
      "fundingSourcesApproved": ["Private Pay", "Medicaid"],
      "fundingProgramSourceApproved": "Funding approved from multiple sources",
      "highSupportReviewedBy": "Clinical Review Team",
      "clinicianNurseName": "Nurse Name Here",
      "clinicianTitleCredential": "RN, MSN",
      "reviewDate": "2026-05-27",
      "riskLevelConfirmed": "Moderate",
      "clinicalRecommendations": "Weekly monitoring and behavioral support recommended",
      "orientationScheduledDate": "2026-05-24",
      "initialIspMeetingDate": "2026-05-27",
      "assignedResidenceHome": "3R",
      "assignedCaseManager": "Case Manager Name",
      "docChecklist": {
        "form1": "Received",
        "form2": "N/A",
        "form3": "Received",
        "form4": "Received",
        "form5": "N/A",
        "form6": "Received",
        "form7": "N/A",
        "form8": "Received",
        "form9": "Received",
        "id": "Received",
        "insurance": "N/A",
        "guardianshipDocs": "Received",
        "physicianOrders": "Received",
        "behavioralPlan": "N/A",
        "ispPriorProvider": "N/A"
      },
      "notes": "Additional staff notes go here",
      "intakeCoordinatorSignature": "Coordinator Signature",
      "signatureDate": "2026-05-28",
      "supervisorSignature": "Supervisor Signature Here",
      "printedName": "Bookie",
      "supervisorTitle": "Program Supervisor"
    }
  };

  try {
    if (!CONFIG.templateDocId) {
      Logger.log('ERROR: CONFIG.templateDocId is empty.');
      return { success: false, error: 'Template ID not set' };
    }

    Logger.log('Starting test population...');
    const pdfFile = createPdfFromTemplate(testData, 'TEST-' + Utilities.getUuid());
    Logger.log('✅ SUCCESS! PDF created: ' + pdfFile.getUrl());
    return { success: true, pdfUrl: pdfFile.getUrl() };
  } catch (error) {
    Logger.log('❌ ERROR: ' + error.toString());
    return { success: false, error: error.toString() };
  }
}

function diagnoseDocChecklist() {
  const testData = {
    staff: {
      docChecklist: {
        form1: "Received",
        form2: "N/A",
        form3: "Received",
        form4: "N/A",
        form5: "Received"
      }
    }
  };
  
  const replacements = buildReplacements(testData, 'TEST');
  
  Logger.log('=== DOC CHECKLIST REPLACEMENTS ===');
  Object.keys(replacements).forEach(key => {
    if (key.includes('docChecklist')) {
      Logger.log(`{{${key}}} = "${replacements[key]}"`);
    }
  });
}