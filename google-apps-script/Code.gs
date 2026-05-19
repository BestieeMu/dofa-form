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
    text('cover.assignedCaseManager', 'Assigned House Manager'),
  ]),
  section('New Admission Documentation Checklist', [
    checks('checklist.identification', 'Identification', ['Social Security Card', 'State-Issued Photo ID', 'Insurance / Medicaid / Medicare Cards']),
    checks('checklist.personCenteredPlan', 'Person-Centered Plan', ['Current Approved PCP']),
    checks('checklist.clinicalFunctionalInformation', 'Clinical / Functional Information', [
      'Current Nursing Assessment (if applicable)',
      'Health Risk Screening Tool (HRST)',
      'Medication List',
      'Current Physician Orders',
      'Behavioral Support Plan (if applicable)',
      'Recent Medical Appointments / Therapy Plans (OT, PT, Speech, etc.)',
      'Recent Medical Summaries or Discharge Summaries',
    ]),
    checks('checklist.healthMedicalRecords', 'Health & Medical Records', ['Complete Medical History', 'Allergies', 'Immunization Record']),
    checks('checklist.legalDocuments', 'Legal Documents (If Applicable)', ['Guardianship Letters / POA Documentation', 'Court Orders (if any)', 'Authorized Representative Forms']),
  ]),
  section('Participant Information & Demographics', [
    text('participant.fullLegalName', 'Full Legal Name'),
    text('participant.preferredName', 'Preferred Name / Nickname'),
    dateField('participant.dateOfBirth', 'Date of Birth'),
    text('participant.ssnFull', 'Full SSN'),
    text('participant.genderIdentity', 'Gender Identity'),
    checks('participant.raceEthnicity', 'Race / Ethnicity', ['American Indian / Alaska Native', 'Asian', 'Black / African American', 'Hispanic / Latino', 'Native Hawaiian / Pacific Islander', 'White', 'Two or more races', 'Prefer not to say']),
    text('participant.currentAddress', 'Current Address'),
    text('participant.primaryPhone', 'Primary Phone'),
    text('participant.alternatePhone', 'Alternate Phone'),
    text('participant.email', 'Email Address'),
    text('participant.currentHousingStatus', 'Current Housing Status'),
    text('participant.primaryLanguage', 'Primary Language'),
    text('participant.medicaidId', 'Medicaid ID #'),
    text('participant.primaryInsurance', 'Primary Insurance / Payer'),
    text('participant.policyMemberId', 'Policy / Member ID'),
  ]),
  section('Emergency Contact & Guardian Information', [
    text('emergency.contactFullName', 'Emergency Contact Full Name'),
    text('emergency.relationship', 'Relationship to Participant'),
    text('emergency.primaryPhone', 'Primary Phone'),
    text('emergency.alternatePhone', 'Alternate Phone'),
    text('emergency.address', 'Address'),
    boolField('emergency.hasGuardian', 'Has Legal Guardian'),
    boolField('emergency.hasNoGuardian', 'No Legal Guardian'),
    text('emergency.guardianFullName', 'Guardian / Representative Full Name'),
    text('emergency.guardianRelationship', 'Guardian Relationship'),
    text('emergency.guardianPhone', 'Guardian Primary Phone'),
    text('emergency.guardianEmail', 'Guardian Email'),
    text('emergency.guardianMailingAddress', 'Guardian Mailing Address'),
    longText('emergency.legalAuthority', 'Legal Authority / Scope'),
    checks('emergency.documentation', 'Documentation', ['Power of Attorney on file', 'Guardianship Order on file', 'Healthcare Proxy on file', 'None - participant self-directs']),
  ]),
  section('Clinical / High-Support Needs Assessment', [
    select('clinical.codeStatus', 'Code Status', ['Full Code', 'DNR - on file', 'DNI']),
  ]),
  section('Residential Placement Agreement', [
    text('placement.participantName', 'Participant Name'),
    dateField('placement.placementStartDate', 'Placement Start Date'),
    text('placement.residenceHomeAddress', 'Residence / Home Address'),
    boolField('placement.group_home', 'Group Home'),
    boolField('placement.supported_living', 'Supported Living'),
    boolField('placement.community_development_service', 'Community Development Service'),
    boolField('placement.day_habilitation', 'Day Habilitation'),
    boolField('placement.v', 'Vocational / Employment Support'),
    boolField('placement.behavioral_support', 'Behavioral Support'),
    boolField('placement.family_caregiver', 'Family / Caregiver Support'),
    boolField('placement.respite', 'Respite'),
  ]),
  section('Consent for Services & HIPAA Acknowledgement', [
    text('consent.participantSignature', 'Participant / Authorized Representative Signature'),
    dateField('consent.signatureDate', 'Signature Date'),
    text('consent.printedName', 'Printed Name'),
    text('consent.ParticipantAdress', 'Participant Address'),
    text('consent.ParticipantNum', 'Participant Phone Number'),
    text('consent.staffWitnessSignature', 'Staff Witness Signature'),
    text('consent.staffWitnessName', 'Staff Witness Name'),
    text('consent.staffWitnessTitle', 'Staff Witness Title'),
    dateField('consent.staffWitnessDate', 'Staff Witness Date'),
  ]),
  section('Release of Information (ROI)', [
    text('roi.participantFullName', 'Participant Full Name'),
    dateField('roi.dateOfBirth', 'Date of Birth'),
    text('roi.nameOrganization', 'Name / Organization'),
    text('roi.titlePosition', 'Title / Position'),
    text('roi.phoneNumber', 'Phone Number'),
    text('roi.faxNumber', 'Fax Number'),
    text('roi.address', 'Address'),
    checks('roi.informationTypes', 'Type of Information to Be Released', ['Discharge Summary', 'History and Physical Exam', 'Consultation Reports', 'Reports of Operation', 'Medication Records', 'Imaging / Lab Reports', 'Nursing Notes', 'Psychological / Psychiatric Records', 'ISP / Support Plan', 'Other']),
    boolField('roi.mentalHealthRecords', 'Mental Health Records - Authorize'),
    boolField('roi.mentalHealthRecordsNo', 'Mental Health Records - Do Not Release'),
    boolField('roi.hivAidsTreatment', 'HIV / AIDS Treatment - Authorize'),
    boolField('roi.hivAidsTreatmentNo', 'HIV / AIDS Treatment - Do Not Release'),
    boolField('roi.substanceAlcoholTreatment', 'Substance / Alcohol Abuse Treatment - Authorize'),
    boolField('roi.substanceAlcoholTreatmentNo', 'Substance / Alcohol Abuse Treatment - Do Not Release'),
    boolField('roi.recordsFromAnotherProvider', 'Records from Another Provider - Authorize'),
    boolField('roi.recordsFromAnotherProviderNo', 'Records from Another Provider - Do Not Release'),
    checks('roi.purposeOfDisclosure', 'Purpose of Disclosure', ['At my request', 'Healthcare / Treatment', 'Payment / Insurance', 'Coordination of Services', 'Employment', 'Other']),
    dateField('roi.effectiveDate', 'Authorization Effective Date'),
    dateField('roi.expirationDate', 'Authorization Expiration Date'),
    text('roi.signature', 'Participant / Authorized Representative Signature'),
    dateField('roi.signatureDate', 'Date'),
    text('roi.staffSignature', 'Staff Signature'),
    text('roi.printedName', 'Printed Name'),
    text('roi.relationship', 'Relationship'),
  ]),
  section('Rights & Responsibilities Acknowledgement', [
    text('rights.signature', 'Participant / Representative Signature'),
    dateField('rights.date', 'Date'),
    text('rights.printedName', 'Printed Name'),
    text('rights.relationship', 'Relationship'),
  ]),
];

const CHECKBOX_PLACEHOLDER_ALIASES = {
  'checklist.identification|State-Issued Photo ID': 'state_id',
  'checklist.clinicalFunctionalInformation|Current Nursing Assessment (if applicable)': 'full_current_nursing_assessment_if_applicable',
  'checklist.clinicalFunctionalInformation|Recent Medical Appointments / Therapy Plans (OT, PT, Speech, etc.)': 'therapy_plans_ot_pt_speech_etc',
};

const SECTION_ORDER = [
  'Cover / Admission Summary',
  'New Admission Documentation Checklist',
  'Participant Information & Demographics',
  'Clinical / High-Support Needs Assessment',
  'Emergency Contact & Guardian Information',
  'Release of Information (ROI)',
  'Rights & Responsibilities Acknowledgement',
  'Residential Placement Agreement',
  'Consent for Services & HIPAA Acknowledgement',
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
      getId: function() { return 'failed'; },
      getName: function() { return 'PDF creation failed'; },
      getBlob: function() { return Utilities.newBlob('', 'text/plain', 'pdf-error.txt'); },
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
    } else if (field.type === 'boolean') {
      row[`${field.section} | ${field.label}`] = value === true ? 'Yes' : 'No';
    } else {
      row[`${field.section} | ${field.label}`] = formatValue(value);
    }
  });
  return row;
}

function createPdf(data, entryId) {
  if (CONFIG.templateDocId) return createPdfFromTemplate(data, entryId);
  return createSummaryPdf(data, entryId);
}

function createPdfFromTemplate(data, entryId) {
  const name = `DOFA Intake - ${safeName(getDeep(data, 'participant.fullLegalName') || getDeep(data, 'placement.participantName') || getDeep(data, 'roi.participantFullName') || entryId)}`;
  const folder = DriveApp.getFolderById(CONFIG.driveFolderId);
  const templateFile = DriveApp.getFileById(CONFIG.templateDocId);
  const workingCopy = templateFile.makeCopy(`${name} - Working Copy`, folder);
  const doc = DocumentApp.openById(workingCopy.getId());
  const body = doc.getBody();
  const replacements = buildReplacements(data, entryId);

  Object.keys(replacements).forEach((placeholder) => {
    try {
      body.replaceText(`{{${placeholder}}}`, replacements[placeholder]);
    } catch (e) {
      Logger.log(`Failed to replace {{${placeholder}}}: ${e.message}`);
    }
  });

  doc.saveAndClose();
  const pdfBlob = workingCopy.getAs(MimeType.PDF).setName(`${name}.pdf`);
  const pdfFile = folder.createFile(pdfBlob);
  workingCopy.setTrashed(true);
  return pdfFile;
}

function createSummaryPdf(data, entryId) {
  const name = `DOFA Intake - ${safeName(getDeep(data, 'participant.fullLegalName') || entryId)}`;
  const doc = DocumentApp.create(name);
  const body = doc.getBody();

  body.appendParagraph('DOFA PATHWAYS').setHeading(DocumentApp.ParagraphHeading.TITLE);
  body.appendParagraph('Residential Services - New Admission Intake Package');
  body.appendParagraph(`Entry ID: ${entryId}`);
  body.appendParagraph(`Generated: ${new Date().toLocaleString()}`);
  body.appendParagraph('');

  orderedSchema().forEach((sectionDef) => {
    body.appendParagraph(sectionDef.title).setHeading(DocumentApp.ParagraphHeading.HEADING1);
    sectionDef.fields.forEach((field) => {
      const value = getDeep(data, field.name);
      if (field.type === 'checkboxGroup') {
        body.appendParagraph(field.label + ': ' + (Array.isArray(value) ? value.join(', ') : ''));
      } else if (field.type === 'boolean') {
        body.appendParagraph(`${field.label}: ${value === true ? 'Yes' : 'No'}`);
      } else {
        body.appendParagraph(`${field.label}: ${formatValue(value)}`);
      }
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
        replacements[`${field.name}.${slug(option)}`] = selected.includes(option) ? 'X' : '';
        const alias = CHECKBOX_PLACEHOLDER_ALIASES[`${field.name}|${option}`];
        if (alias) replacements[`${field.name}.${alias}`] = selected.includes(option) ? 'X' : '';
      });
    } else if (field.type === 'select') {
      replacements[field.name] = value || '';
      field.options.forEach((option) => {
        replacements[`${field.name}.${slug(option)}`] = value === option ? 'X' : '';
      });
    } else if (field.type === 'boolean') {
      replacements[field.name] = value === true ? 'X' : '';
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
  const participant = getDeep(data, 'participant.fullLegalName') || getDeep(data, 'placement.participantName') || getDeep(data, 'roi.participantFullName') || 'Participant';
  const options = {
    name: 'DOFA Pathways Intake',
    htmlBody: `<p>A new DOFA intake submission was received for <strong>${participant}</strong>.</p><p>PDF: <a href="${pdfFile.getUrl()}">${pdfFile.getName()}</a></p>`,
  };
  if (CONFIG.emailPdfAsAttachment) options.attachments = [pdfFile.getBlob()];
  MailApp.sendEmail(recipients, `DOFA Intake Submission - ${participant}`, `PDF: ${pdfFile.getUrl()}`, options);
}

function flattenFields() {
  return orderedSchema().flatMap((sectionDef) => sectionDef.fields.map((field) => ({ ...field, section: sectionDef.title })));
}

function orderedSchema() {
  const byTitle = {};
  FIELD_SCHEMA.forEach((sectionDef) => byTitle[sectionDef.title] = sectionDef);
  return SECTION_ORDER.map((title) => byTitle[title]).filter(Boolean);
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

function boolField(name, label) {
  return { type: 'boolean', name, label };
}

function testPopulateTemplate() {
  const testData = {
    participant: {
      fullLegalName: 'Test Participant',
      preferredName: 'Test',
      dateOfBirth: '2000-01-01',
      ssnFull: '123-45-6789',
      genderIdentity: 'Female',
      raceEthnicity: ['Black / African American'],
      currentAddress: '123 Main Street',
      primaryPhone: '555-1000',
      email: 'test@example.com',
      currentHousingStatus: 'Home',
      primaryLanguage: 'English',
      medicaidId: 'MD-123',
      primaryInsurance: 'Medicaid',
      policyMemberId: 'PM-123',
    },
    emergency: {
      contactFullName: 'Emergency Contact',
      relationship: 'Parent',
      primaryPhone: '555-2000',
      hasNoGuardian: true,
      documentation: ['None - participant self-directs'],
    },
    placement: {
      participantName: 'Test Participant',
      placementStartDate: '2026-05-18',
      residenceHomeAddress: '123 Residence Road',
      group_home: true,
      respite: true,
    },
    consent: {
      participantSignature: 'Test Participant',
      signatureDate: '2026-05-18',
      ParticipantAdress: '123 Main Street',
      ParticipantNum: '555-1000',
      staffWitnessName: 'Staff Person',
      staffWitnessTitle: 'Coordinator',
      staffWitnessDate: '2026-05-18',
    },
    roi: {
      participantFullName: 'Test Participant',
      dateOfBirth: '2000-01-01',
      nameOrganization: 'Provider',
      mentalHealthRecordsNo: true,
      hivAidsTreatmentNo: true,
      substanceAlcoholTreatmentNo: true,
      recordsFromAnotherProviderNo: true,
      purposeOfDisclosure: ['Healthcare / Treatment'],
    },
    rights: {
      signature: 'Test Participant',
      date: '2026-05-18',
      printedName: 'Test Participant',
      relationship: 'Self',
    },
  };

  const pdfFile = createPdfFromTemplate(testData, 'TEST-' + Utilities.getUuid());
  Logger.log('PDF created: ' + pdfFile.getUrl());
  return { success: true, pdfUrl: pdfFile.getUrl() };
}
