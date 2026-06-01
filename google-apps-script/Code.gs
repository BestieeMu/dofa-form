// =============================================================================
//  DOFA PATHWAYS — Apps Script  (Code.gs)
//  Two-template PDF generation + per-participant Drive subfolder
// =============================================================================

const CONFIG = {
  driveFolderId:        '10TLoTQO6Qd1ifKNlgSnWiU-m7JUluSKR',  // Root output folder
  sheetName:            'DOFA Intake Entries',
  templateDocId:        '1eS5ocMoxAHIfzhcLwAO9EEptR1kOw99nSbZnbxR_A2Q', // Main intake template
  roiTemplateDocId:     '1HXGQXNkxKtRQlwjkmHvOhX20Uvt6obzw8eRIABNgCro',                  // ← paste Form 3 template ID here
  emailRecipients:      'chideraigboka7@gmail.com',
  emailPdfAsAttachment: true,
};

// -----------------------------------------------------------------------------
//  FIELD SCHEMA
// -----------------------------------------------------------------------------
const FIELD_SCHEMA = [
  section('Cover / Admission Summary', [
    text('cover.participantName',      'Participant Name'),
    dateField('cover.dateOfAdmission', 'Date of Admission'),
    text('cover.assignedResidence',    'Assigned Residence'),
    text('cover.assignedCaseManager',  'Assigned House Manager'),
  ]),
  section('New Admission Documentation Checklist', [
    checks('checklist.identification', 'Identification', [
      'Social Security Card',
      'State-Issued Photo ID',
      'Insurance / Medicaid / Medicare Cards',
    ]),
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
    checks('checklist.healthMedicalRecords', 'Health & Medical Records', [
      'Complete Medical History',
      'Allergies',
      'Immunization Record',
    ]),
    checks('checklist.legalDocuments', 'Legal Documents (If Applicable)', [
      'Guardianship Letters / POA Documentation',
      'Court Orders (if any)',
      'Authorized Representative Forms',
    ]),
  ]),
  section('Participant Information & Demographics', [
    text('participant.fullLegalName',       'Full Legal Name'),
    text('participant.preferredName',       'Preferred Name / Nickname'),
    dateField('participant.dateOfBirth',    'Date of Birth'),
    text('participant.ssnFull',             'Full SSN'),
    text('participant.genderIdentity',      'Gender Identity'),
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
    text('participant.currentAddress',      'Current Address'),
    text('participant.primaryPhone',        'Primary Phone'),
    text('participant.alternatePhone',      'Alternate Phone'),
    text('participant.email',               'Email Address'),
    text('participant.currentHousingStatus','Current Housing Status'),
    text('participant.primaryLanguage',     'Primary Language'),
    text('participant.medicaidId',          'Medicaid ID #'),
    text('participant.primaryInsurance',    'Primary Insurance / Payer'),
    text('participant.policyMemberId',      'Policy / Member ID'),
  ]),
  section('Emergency Contact & Guardian Information', [
    text('emergency.contactFullName',        'Emergency Contact Full Name'),
    text('emergency.relationship',           'Relationship to Participant'),
    text('emergency.primaryPhone',           'Primary Phone'),
    text('emergency.alternatePhone',         'Alternate Phone'),
    text('emergency.address',                'Address'),
    boolField('emergency.hasGuardian',       'Has Legal Guardian'),
    boolField('emergency.hasNoGuardian',     'No Legal Guardian'),
    text('emergency.guardianFullName',       'Guardian / Representative Full Name'),
    text('emergency.guardianRelationship',   'Guardian Relationship'),
    text('emergency.guardianPhone',          'Guardian Primary Phone'),
    text('emergency.guardianEmail',          'Guardian Email'),
    text('emergency.guardianMailingAddress', 'Guardian Mailing Address'),
    longText('emergency.legalAuthority',     'Legal Authority / Scope'),
    checks('emergency.documentation', 'Documentation', [
      'Power of Attorney on file',
      'Guardianship Order on file',
      'Healthcare Proxy on file',
      'None - participant self-directs',
    ]),
  ]),
  section('Clinical / High-Support Needs Assessment', [
    select('clinical.codeStatus', 'Code Status', ['Full Code', 'DNR - on file', 'DNI']),
  ]),
  section('Residential Placement Agreement', [
    text('placement.participantName',          'Participant Name'),
    dateField('placement.placementStartDate',  'Placement Start Date'),
    text('placement.residenceHomeAddress',     'Residence / Home Address'),
    boolField('placement.group_home',          'Group Home'),
    boolField('placement.supported_living',    'Supported Living'),
    boolField('placement.community_development_service', 'Community Development Service'),
    boolField('placement.day_habilitation',    'Day Habilitation'),
    boolField('placement.v',                   'Vocational / Employment Support'),
    boolField('placement.behavioral_support',  'Behavioral Support'),
    boolField('placement.family_caregiver',    'Family / Caregiver Support'),
    boolField('placement.respite',             'Respite'),
  ]),
  section('Consent for Services & HIPAA Acknowledgement', [
    text('consent.participantSignature',    'Participant / Authorized Representative Signature'),
    dateField('consent.signatureDate',      'Signature Date'),
    text('consent.printedName',             'Printed Name'),
    text('consent.ParticipantAdress',       'Participant Address'),
    text('consent.ParticipantNum',          'Participant Phone Number'),
    text('consent.staffWitnessSignature',   'Staff Witness Signature'),
    text('consent.staffWitnessName',        'Staff Witness Name'),
    text('consent.staffWitnessTitle',       'Staff Witness Title'),
    dateField('consent.staffWitnessDate',   'Staff Witness Date'),
  ]),
  section('Release of Information (ROI)', [
    text('roi.participantFullName',   'Participant Full Name'),
    dateField('roi.dateOfBirth',      'Date of Birth'),
    text('roi.nameOrganization',      'Name / Organization'),
    text('roi.titlePosition',         'Title / Position'),
    text('roi.phoneNumber',           'Phone Number'),
    text('roi.faxNumber',             'Fax Number'),
    text('roi.address',               'Address'),
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
    boolField('roi.mentalHealthRecords',             'Mental Health Records - Authorize'),
    boolField('roi.mentalHealthRecordsNo',           'Mental Health Records - Do Not Release'),
    boolField('roi.hivAidsTreatment',                'HIV / AIDS Treatment - Authorize'),
    boolField('roi.hivAidsTreatmentNo',              'HIV / AIDS Treatment - Do Not Release'),
    boolField('roi.substanceAlcoholTreatment',       'Substance / Alcohol Abuse Treatment - Authorize'),
    boolField('roi.substanceAlcoholTreatmentNo',     'Substance / Alcohol Abuse Treatment - Do Not Release'),
    boolField('roi.recordsFromAnotherProvider',      'Records from Another Provider - Authorize'),
    boolField('roi.recordsFromAnotherProviderNo',    'Records from Another Provider - Do Not Release'),
    checks('roi.purposeOfDisclosure', 'Purpose of Disclosure', [
      'At my request',
      'Healthcare / Treatment',
      'Payment / Insurance',
      'Coordination of Services',
      'Employment',
      'Other',
    ]),
    dateField('roi.effectiveDate',    'Authorization Effective Date'),
    dateField('roi.expirationDate',   'Authorization Expiration Date'),
    text('roi.signature',             'Participant / Authorized Representative Signature'),
    dateField('roi.signatureDate',    'Date'),
    text('roi.staffSignature',        'Staff Signature'),
    text('roi.printedName',           'Printed Name'),
    text('roi.relationship',          'Relationship'),
  ]),
  section('Rights & Responsibilities Acknowledgement', [
    text('rights.signature',       'Participant / Representative Signature'),
    dateField('rights.date',       'Date'),
    text('rights.printedName',     'Printed Name'),
    text('rights.relationship',    'Relationship'),
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

// -----------------------------------------------------------------------------
//  HTTP ENTRY POINT
// -----------------------------------------------------------------------------
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const result  = saveSubmission(payload);
    return jsonResponse({ ok: true, ...result });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error && error.message ? error.message : error) });
  }
}

// -----------------------------------------------------------------------------
//  CORE SUBMISSION HANDLER
// -----------------------------------------------------------------------------
function saveSubmission(data) {
  const sheet       = getSheet();
  const headers     = ensureHeaders(sheet);
  const entryId     = Utilities.getUuid();
  const submittedAt = new Date();

  // ── Resolve participant name for folder & file names ──────────────────────
  const participantName =
    getDeep(data, 'participant.fullLegalName') ||
    getDeep(data, 'placement.participantName') ||
    getDeep(data, 'roi.participantFullName')   ||
    entryId;

  // ── Create a dedicated subfolder for this participant ─────────────────────
  const rootFolder       = DriveApp.getFolderById(CONFIG.driveFolderId);
  const participantFolder = getOrCreateSubfolder(rootFolder, participantName);

  // ── Process Base64 Signature Images ──────────────────────────────────────
  const signatures = collectBase64SignatureImages(data);

  Object.keys(signatures).filter((fieldPath) => isBase64ImageString(getDeep(data, fieldPath))).forEach((fieldPath) => {
    try {
      const fileName = `${participantName}_${fieldPath.replace(/\./g, '_')}.png`;
      const blob = convertBase64ToImageBlob(signatures[fieldPath], fileName);
      const file = participantFolder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      setDeep(data, fieldPath, file.getUrl());
    } catch (err) {
      Logger.log('Failed to save signature image for ' + fieldPath + ': ' + err);
    }
  });

  // ── Generate Main Intake PDF ──────────────────────────────────────────────
  let mainPdfFile;
  try {
    mainPdfFile = createMainIntakePdf(data, entryId, participantName, participantFolder, signatures);
  } catch (err) {
    Logger.log('Main intake PDF creation failed: ' + err);
    mainPdfFile = makeDummyFileObject('Main PDF creation failed: ' + err.message);
  }

  // ── Generate Form 3 (ROI) PDF ─────────────────────────────────────────────
  let roiPdfFile;
  try {
    roiPdfFile = createRoiPdf(data, entryId, participantName, participantFolder, signatures);
  } catch (err) {
    Logger.log('ROI PDF creation failed: ' + err);
    roiPdfFile = makeDummyFileObject('ROI PDF creation failed: ' + err.message);
  }

  // ── Save row to spreadsheet ───────────────────────────────────────────────
  const rowObject = buildRowObject(data, entryId, submittedAt, mainPdfFile.getUrl(), roiPdfFile.getUrl());
  sheet.appendRow(headers.map((h) => rowObject[h] || ''));

  // ── Send notification email ───────────────────────────────────────────────
  try {
    sendNotification(data, participantName, mainPdfFile, roiPdfFile);
  } catch (emailError) {
    Logger.log('Email notification failed: ' + emailError);
  }

  return {
    entryId,
    participantFolder: participantFolder.getUrl(),
    mainPdfUrl:  mainPdfFile.getUrl(),
    mainPdfId:   mainPdfFile.getId(),
    roiPdfUrl:   roiPdfFile.getUrl(),
    roiPdfId:    roiPdfFile.getId(),
  };
}

// -----------------------------------------------------------------------------
//  SUBFOLDER HELPER — reuse existing folder if it already exists
// -----------------------------------------------------------------------------
function getOrCreateSubfolder(parentFolder, folderName) {
  const safeFolderName = safeName(folderName);
  const existing = parentFolder.getFoldersByName(safeFolderName);
  if (existing.hasNext()) return existing.next();
  return parentFolder.createFolder(safeFolderName);
}

// -----------------------------------------------------------------------------
//  MAIN INTAKE PDF  (uses CONFIG.templateDocId)
// -----------------------------------------------------------------------------
function createMainIntakePdf(data, entryId, participantName, destinationFolder, signatures) {
  if (!CONFIG.templateDocId) return createSummaryPdf(data, entryId, participantName, destinationFolder);

  const fileName    = `DOFA Intake - ${safeName(participantName)}`;
  const templateFile = DriveApp.getFileById(CONFIG.templateDocId);

  // Make a temporary working copy in the destination folder
  const workingCopy = templateFile.makeCopy(`${fileName} - Working`, destinationFolder);
  const doc  = DocumentApp.openById(workingCopy.getId());
  const body = doc.getBody();

  const replacements = buildReplacements(data, entryId);
  applyReplacements(body, replacements, signatures);

  doc.saveAndClose();

  // Convert to PDF and save in destination folder
  const pdfBlob = workingCopy.getAs(MimeType.PDF).setName(`${fileName}.pdf`);
  const pdfFile = destinationFolder.createFile(pdfBlob);
  workingCopy.setTrashed(true);   // clean up working copy

  return pdfFile;
}

// -----------------------------------------------------------------------------
//  FORM 3 (ROI) PDF  (uses CONFIG.roiTemplateDocId)
// -----------------------------------------------------------------------------
function createRoiPdf(data, entryId, participantName, destinationFolder, signatures) {
  if (!CONFIG.roiTemplateDocId || CONFIG.roiTemplateDocId === 'YOUR_ROI_FORM3_TEMPLATE_DOC_ID') {
    throw new Error('roiTemplateDocId is not configured. Please set CONFIG.roiTemplateDocId.');
  }

  const fileName     = `DOFA Form 3 ROI - ${safeName(participantName)}`;
  const templateFile = DriveApp.getFileById(CONFIG.roiTemplateDocId);

  // Make a temporary working copy in the destination folder
  const workingCopy = templateFile.makeCopy(`${fileName} - Working`, destinationFolder);
  const doc  = DocumentApp.openById(workingCopy.getId());
  const body = doc.getBody();

  // Build ROI-specific replacements (a focused subset of buildReplacements)
  const replacements = buildRoiReplacements(data, entryId);
  applyReplacements(body, replacements, signatures);

  doc.saveAndClose();

  // Convert to PDF and save in destination folder
  const pdfBlob = workingCopy.getAs(MimeType.PDF).setName(`${fileName}.pdf`);
  const pdfFile = destinationFolder.createFile(pdfBlob);
  workingCopy.setTrashed(true);   // clean up working copy

  return pdfFile;
}

// -----------------------------------------------------------------------------
//  APPLY REPLACEMENTS  (shared helper used by both template functions)
// -----------------------------------------------------------------------------
function applyReplacements(body, replacements, signatures) {
  signatures = signatures || {};

  const replaceOne = (placeholderKey, actualValue, isImageSig) => {
    try {
      const escaped = placeholderKey.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
      const pattern = '\\{\\{\\s*' + escaped + '\\s*\\}\\}';
      const renderAsImage = isImageSig || isBase64ImageString(actualValue);
      
      if (renderAsImage) {
        // Use a temporary unique single-run token. This solves the issue of Google Docs
        // splitting the placeholder text run into multiple pieces, which makes findText fail.
        // replaceText is native and handles split text elements beautifully.
        const tempToken = '__TEMP_SIG_' + placeholderKey.replace(/\./g, '_') + '__';
        body.replaceText(pattern, tempToken);
        replacePlaceholderWithImage(body, tempToken, actualValue);
      } else {
        body.replaceText(pattern, actualValue);
      }
    } catch (e) {
      Logger.log(`Failed to replace ${placeholderKey}: ${e.message}`);
    }
  };

  Object.keys(replacements).forEach((placeholder) => {
    const value = replacements[placeholder];
    const isImageSig = !!signatures[placeholder];
    const sigValue = signatures[placeholder];

    // Replace primary placeholder
    replaceOne(placeholder, isImageSig ? sigValue : value, isImageSig);

    // Support flexible fallback aliases for signature fields
    if (placeholder.endsWith('.signature')) {
      const fallback = placeholder.replace(/\.signature$/, '.participantSignature');
      replaceOne(fallback, isImageSig ? sigValue : value, isImageSig);
    } else if (placeholder.endsWith('.participantSignature')) {
      const fallback = placeholder.replace(/\.participantSignature$/, '.signature');
      replaceOne(fallback, isImageSig ? sigValue : value, isImageSig);
    } else if (placeholder.endsWith('.staffWitnessSignature')) {
      const fallback = placeholder.replace(/\.staffWitnessSignature$/, '.staffSignature');
      replaceOne(fallback, isImageSig ? sigValue : value, isImageSig);
      const fallbackWitness = placeholder.replace(/\.staffWitnessSignature$/, '.witnessSignature');
      replaceOne(fallbackWitness, isImageSig ? sigValue : value, isImageSig);
    } else if (placeholder.endsWith('.staffSignature')) {
      const fallback = placeholder.replace(/\.staffSignature$/, '.staffWitnessSignature');
      replaceOne(fallback, isImageSig ? sigValue : value, isImageSig);
    }

    // Support generic signature.* placeholders in the main Google Doc template
    if (placeholder === 'consent.participantSignature') {
      replaceOne('signature.participantSignature', isImageSig ? sigValue : value, isImageSig);
    } else if (placeholder === 'consent.staffWitnessSignature') {
      replaceOne('signature.staffSignature', isImageSig ? sigValue : value, isImageSig);
    } else if (placeholder === 'consent.printedName') {
      replaceOne('signature.participantFullName', isImageSig ? sigValue : value, isImageSig);
    } else if (placeholder === 'consent.signatureDate') {
      replaceOne('signature.participantDate', isImageSig ? sigValue : value, isImageSig);
    } else if (placeholder === 'consent.ParticipantNum') {
      replaceOne('signature.participantPhone', isImageSig ? sigValue : value, isImageSig);
    } else if (placeholder === 'consent.ParticipantAdress') {
      replaceOne('signature.participantAddress', isImageSig ? sigValue : value, isImageSig);
    } else if (placeholder === 'consent.staffWitnessName') {
      replaceOne('signature.staffFullName', isImageSig ? sigValue : value, isImageSig);
    } else if (placeholder === 'consent.staffWitnessTitle') {
      replaceOne('signature.staffTitle', isImageSig ? sigValue : value, isImageSig);
    } else if (placeholder === 'consent.staffWitnessDate') {
      replaceOne('signature.staffDate', isImageSig ? sigValue : value, isImageSig);
    }
  });
}

// -----------------------------------------------------------------------------
//  BUILD REPLACEMENTS — full intake template
// -----------------------------------------------------------------------------
function buildReplacements(data, entryId) {
  const replacements = {
    entryId:     entryId,
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

// -----------------------------------------------------------------------------
//  BUILD ROI REPLACEMENTS — Form 3 template only
//  Covers every {{roi.*}} placeholder visible in the template PDF.
// -----------------------------------------------------------------------------
function buildRoiReplacements(data, entryId) {
  const roi = data.roi || {};

  // Helper: safe date string
  const fmtDate = (v) => v ? new Date(v).toLocaleDateString() : '';

  // Checkbox helper: returns 'X' if option was selected, '' otherwise
  const chk = (arrayVal, option) =>
    Array.isArray(arrayVal) && arrayVal.includes(option) ? 'X' : '';

  // Boolean helper: returns 'X' if true, '' otherwise
  const bool = (v) => v === true ? 'X' : '';

  const infoTypes  = roi.informationTypes  || [];
  const purposes   = roi.purposeOfDisclosure || [];

  return {
    // ── Identity ────────────────────────────────────────────────────────────
    'roi.participantFullName': formatValue(roi.participantFullName),
    'roi.dateOfBirth':         fmtDate(roi.dateOfBirth),

    // ── Disclose To / From ───────────────────────────────────────────────────
    'roi.nameOrganization': formatValue(roi.nameOrganization),
    'roi.titlePosition':    formatValue(roi.titlePosition),
    'roi.phoneNumber':      formatValue(roi.phoneNumber),
    'roi.faxNumber':        formatValue(roi.faxNumber),
    'roi.address':          formatValue(roi.address),

    // ── Type of Information checkboxes ───────────────────────────────────────
    'roi.informationTypes.discharge_summary':             chk(infoTypes, 'Discharge Summary'),
    'roi.informationTypes.history_and_physical_exam':     chk(infoTypes, 'History and Physical Exam'),
    'roi.informationTypes.consultation_reports':          chk(infoTypes, 'Consultation Reports'),
    'roi.informationTypes.reports_of_operation':          chk(infoTypes, 'Reports of Operation'),
    'roi.informationTypes.medication_records':            chk(infoTypes, 'Medication Records'),
    'roi.informationTypes.imaging_lab_reports':           chk(infoTypes, 'Imaging / Lab Reports'),
    'roi.informationTypes.nursing_notes':                 chk(infoTypes, 'Nursing Notes'),
    'roi.informationTypes.psychological_psychiatric_records': chk(infoTypes, 'Psychological / Psychiatric Records'),
    'roi.informationTypes.isp_support_plan':              chk(infoTypes, 'ISP / Support Plan'),
    'roi.informationTypes.other':                         chk(infoTypes, 'Other'),

    // ── Sensitive Information booleans ───────────────────────────────────────
    'roi.hivAidsTreatment':             bool(roi.hivAidsTreatment),
    'roi.hivAidsTreatmentNo':           bool(roi.hivAidsTreatmentNo),
    'roi.mentalHealthRecords':          bool(roi.mentalHealthRecords),
    'roi.mentalHealthRecordsNo':        bool(roi.mentalHealthRecordsNo),
    'roi.substanceAlcoholTreatment':    bool(roi.substanceAlcoholTreatment),
    'roi.substanceAlcoholTreatmentNo':  bool(roi.substanceAlcoholTreatmentNo),
    'roi.recordsFromAnotherProvider':   bool(roi.recordsFromAnotherProvider),
    'roi.recordsFromAnotherProviderNo': bool(roi.recordsFromAnotherProviderNo),

    // ── Purpose of Disclosure checkboxes ────────────────────────────────────
    'roi.purposeOfDisclosure.at_my_request':          chk(purposes, 'At my request'),
    'roi.purposeOfDisclosure.healthcare_treatment':   chk(purposes, 'Healthcare / Treatment'),
    'roi.purposeOfDisclosure.payment_insurance':      chk(purposes, 'Payment / Insurance'),
    'roi.purposeOfDisclosure.coordination_of_services': chk(purposes, 'Coordination of Services'),
    'roi.purposeOfDisclosure.employment':             chk(purposes, 'Employment'),
    'roi.purposeOfDisclosure.other':                  chk(purposes, 'Other'),

    // ── Dates ────────────────────────────────────────────────────────────────
    'roi.effectiveDate':   fmtDate(roi.effectiveDate),
    'roi.expirationDate':  fmtDate(roi.expirationDate),

    // ── Signatures ───────────────────────────────────────────────────────────
    'roi.signature':      formatValue(roi.signature),
    'roi.signatureDate':  fmtDate(roi.signatureDate),
    'roi.staffSignature': formatValue(roi.staffSignature),
    'roi.printedName':    formatValue(roi.printedName),
    'roi.relationship':   formatValue(roi.relationship),
  };
}

// -----------------------------------------------------------------------------
//  FALLBACK: plain-text summary PDF (when templateDocId is not set)
// -----------------------------------------------------------------------------
function createSummaryPdf(data, entryId, participantName, destinationFolder) {
  const name = `DOFA Intake - ${safeName(participantName)}`;
  const doc  = DocumentApp.create(name);
  const body = doc.getBody();

  body.appendParagraph('DOFA PATHWAYS').setHeading(DocumentApp.ParagraphHeading.TITLE);
  body.appendParagraph('Residential Services — New Admission Intake Package');
  body.appendParagraph(`Entry ID: ${entryId}`);
  body.appendParagraph(`Generated: ${new Date().toLocaleString()}`);
  body.appendParagraph('');

  orderedSchema().forEach((sectionDef) => {
    body.appendParagraph(sectionDef.title).setHeading(DocumentApp.ParagraphHeading.HEADING1);
    sectionDef.fields.forEach((field) => {
      const value = getDeep(data, field.name);
      if (field.type === 'checkboxGroup') {
        body.appendParagraph(`${field.label}: ${Array.isArray(value) ? value.join(', ') : ''}`);
      } else if (field.type === 'boolean') {
        body.appendParagraph(`${field.label}: ${value === true ? 'Yes' : 'No'}`);
      } else {
        const isImg = typeof value === 'string' && (value.indexOf('data:image/') === 0 || value.includes(';base64,'));
        if (isImg) {
          try {
            const p = body.appendParagraph(`${field.label}: `);
            const blob = convertBase64ToImageBlob(value, 'signature.png');
            p.appendInlineImage(blob).setWidth(150).setHeight(40);
          } catch (e) {
            body.appendParagraph(`${field.label}: [Failed to render signature image]`);
          }
        } else {
          body.appendParagraph(`${field.label}: ${formatValue(value)}`);
        }
      }
    });
    body.appendParagraph('');
  });

  doc.saveAndClose();
  const docFile = DriveApp.getFileById(doc.getId());
  const pdfBlob = docFile.getAs(MimeType.PDF).setName(`${name}.pdf`);
  const pdfFile = destinationFolder.createFile(pdfBlob);
  docFile.setTrashed(true);
  return pdfFile;
}

// -----------------------------------------------------------------------------
//  SPREADSHEET HELPERS
// -----------------------------------------------------------------------------
function setupWorkbook() {
  const sheet = getSheet();
  ensureHeaders(sheet);
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(CONFIG.sheetName) || ss.insertSheet(CONFIG.sheetName);
}

function ensureHeaders(sheet) {
  const headers = buildHeaders();
  const current = sheet
    .getRange(1, 1, 1, Math.max(sheet.getLastColumn(), headers.length))
    .getValues()[0]
    .filter(String);
  if (current.join('|') !== headers.join('|')) {
    sheet.clear();
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  }
  return headers;
}

function buildHeaders() {
  // Added ROI PDF URL column alongside Main PDF URL
  const headers = ['Entry ID', 'Submitted At', 'Main PDF URL', 'ROI PDF URL', 'Raw JSON'];
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

function buildRowObject(data, entryId, submittedAt, mainPdfUrl, roiPdfUrl) {
  const row = {
    'Entry ID':     entryId,
    'Submitted At': submittedAt,
    'Main PDF URL': mainPdfUrl,
    'ROI PDF URL':  roiPdfUrl,
    'Raw JSON':     JSON.stringify(data || {}),
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

// -----------------------------------------------------------------------------
//  EMAIL NOTIFICATION
// -----------------------------------------------------------------------------
function sendNotification(data, participantName, mainPdfFile, roiPdfFile) {
  const adminRecipients = CONFIG.emailRecipients.trim();

  // ── Admin notification ────────────────────────────────────────────────────
  if (adminRecipients) {
    try {
      const adminHtml = `
        <p>A new DOFA intake submission was received for <strong>${participantName}</strong>.</p>
        <p>
          <strong>Main Intake PDF:</strong>
          <a href="${mainPdfFile.getUrl()}">${mainPdfFile.getName()}</a>
        </p>
        <p>
          <strong>Form 3 ROI PDF:</strong>
          <a href="${roiPdfFile.getUrl()}">${roiPdfFile.getName()}</a>
        </p>
      `;

      const adminOptions = {
        name:     'DOFA Pathways Intake',
        htmlBody: adminHtml,
      };

      if (CONFIG.emailPdfAsAttachment) {
        adminOptions.attachments = [mainPdfFile.getBlob(), roiPdfFile.getBlob()];
      }

      MailApp.sendEmail(
        adminRecipients,
        `DOFA Intake Submission — ${participantName}`,
        `Main PDF: ${mainPdfFile.getUrl()}\nROI PDF: ${roiPdfFile.getUrl()}`,
        adminOptions
      );
      Logger.log('Admin notification email sent successfully.');
    } catch (e) {
      Logger.log('Failed to send admin notification email: ' + e);
    }
  }

  // ── Applicant confirmation email ──────────────────────────────────────────
  const applicantEmail = getDeep(data, 'participant.email') || '';
  if (applicantEmail && applicantEmail.indexOf('@') > 0) {
    try {
      const applicantHtml = `
        <p>Dear <strong>${participantName}</strong>,</p>
        <p>Thank you for completing the DOFA Pathways Residential Services intake form. We have successfully received your submission.</p>
        <p>Our team will review your information and reach out to you shortly regarding next steps.</p>
        <p>If you have any questions in the meantime, please don't hesitate to contact us.</p>
        <br/>
        <p>Warm regards,<br/><strong>DOFA Pathways</strong><br/>Residential Services Team</p>
      `;

      MailApp.sendEmail(
        applicantEmail,
        'Your DOFA Pathways Intake Form Has Been Received',
        `Dear ${participantName},\n\nThank you for completing the DOFA Pathways intake form. We have successfully received your submission and will be in touch shortly.\n\nWarm regards,\nDOFA Pathways Residential Services Team`,
        {
          name:     'DOFA Pathways',
          htmlBody: applicantHtml,
        }
      );
      Logger.log('Applicant confirmation email sent successfully to: ' + applicantEmail);
    } catch (e) {
      Logger.log('Failed to send applicant confirmation email: ' + e);
    }
  }

  // ── "Send me a copy" opt-in email ────────────────────────────────────────
  const sendCopy = getDeep(data, 'meta.sendCopyToEmail');
  const copyEmail = (getDeep(data, 'meta.copyEmail') || '').trim();
  if (sendCopy === true && copyEmail && copyEmail.indexOf('@') > 0) {
    try {
      const copyHtml = `
        <p>Dear <strong>${participantName}</strong>,</p>
        <p>As requested, please find attached a PDF copy of your completed DOFA Pathways intake form.</p>
        <p>Please keep this for your records. If you have any questions, feel free to contact our team.</p>
        <br/>
        <p>Warm regards,<br/><strong>DOFA Pathways</strong><br/>Residential Services Team</p>
      `;
      MailApp.sendEmail(
        copyEmail,
        'Your Copy — DOFA Pathways Completed Intake Form',
        `Dear ${participantName},\n\nAs requested, please find attached a copy of your completed DOFA Pathways intake form.\n\nWarm regards,\nDOFA Pathways Residential Services Team`,
        {
          name:        'DOFA Pathways',
          htmlBody:    copyHtml,
          attachments: [mainPdfFile.getBlob()],
        }
      );
      Logger.log('Copy email sent to: ' + copyEmail);
    } catch (e) {
      Logger.log('Failed to send copy email to ' + copyEmail + ': ' + e);
    }
  }
}

// -----------------------------------------------------------------------------
//  SCHEMA UTILITIES
// -----------------------------------------------------------------------------
function flattenFields() {
  return orderedSchema().flatMap((sectionDef) =>
    sectionDef.fields.map((field) => ({ ...field, section: sectionDef.title }))
  );
}

function orderedSchema() {
  const byTitle = {};
  FIELD_SCHEMA.forEach((s) => (byTitle[s.title] = s));
  return SECTION_ORDER.map((title) => byTitle[title]).filter(Boolean);
}

// -----------------------------------------------------------------------------
//  GENERAL UTILITIES
// -----------------------------------------------------------------------------
function getDeep(data, path) {
  return path.split('.').reduce(
    (val, key) => (val && val[key] !== undefined ? val[key] : ''),
    data || {}
  );
}

function isBase64ImageString(value) {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  return trimmed.indexOf('data:image/') === 0 || /^image\/[a-zA-Z+.-]+;base64,/.test(trimmed) || trimmed.includes(';base64,');
}

function collectBase64SignatureImages(data) {
  const signatures = {};

  const walk = (value, prefix) => {
    if (isBase64ImageString(value)) {
      signatures[prefix] = value.trim();
      return;
    }

    if (!value || typeof value !== 'object' || Array.isArray(value)) return;

    Object.keys(value).forEach((key) => {
      const path = prefix ? `${prefix}.${key}` : key;
      walk(value[key], path);
    });
  };

  walk(data || {}, '');

  const aliasPairs = [
    ['consent.participantSignature', 'signature.participantSignature'],
    ['consent.staffWitnessSignature', 'signature.staffSignature'],
    ['roi.signature', 'roi.participantSignature'],
    ['roi.staffSignature', 'roi.staffWitnessSignature'],
    ['rights.signature', 'rights.participantSignature'],
  ];

  aliasPairs.forEach(([source, alias]) => {
    if (signatures[source] && !signatures[alias]) signatures[alias] = signatures[source];
    if (signatures[alias] && !signatures[source]) signatures[source] = signatures[alias];
  });

  return signatures;
}

function setDeep(obj, path, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((o, k) => {
    if (!o[k]) o[k] = {};
    return o[k];
  }, obj);
  if (target) {
    target[lastKey] = value;
  }
}

function replacePlaceholderWithImage(body, tempToken, base64ImageString) {
  const escapedTag = tempToken.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  
  let rangeElement;
  while ((rangeElement = body.findText(escapedTag)) !== null) {
    const textElement = rangeElement.getElement().asText();
    const startOffset = rangeElement.getStartOffset();
    const endOffset = rangeElement.getEndOffsetInclusive();

    const parent = textElement.getParent();
    // Duck typing check for any container element (Paragraph, ListItem, etc.) that can contain inline images
    if (parent && typeof parent.getChildIndex === 'function' && typeof parent.insertInlineImage === 'function') {
      try {
        const blob = convertBase64ToImageBlob(base64ImageString, 'signature.png');
        const childIndex = parent.getChildIndex(textElement);
        const inlineImage = parent.insertInlineImage(childIndex, blob);
        
        if (inlineImage) {
          const originalWidth = inlineImage.getWidth();
          const originalHeight = inlineImage.getHeight();
          const targetWidth = 150;
          const targetHeight = Math.round((originalHeight / originalWidth) * targetWidth);
          inlineImage.setWidth(targetWidth);
          inlineImage.setHeight(targetHeight);
        }

        if (textElement.getText().length === (endOffset - startOffset + 1)) {
          textElement.removeFromParent();
        } else {
          textElement.deleteText(startOffset, endOffset);
        }
      } catch (err) {
        Logger.log('Error replacing placeholder with image: ' + err);
        // Fall back to deleting tag text if rendering fails
        textElement.deleteText(startOffset, endOffset);
      }
    } else {
      Logger.log('Could not insert signature image for token ' + tempToken + ': unsupported parent element');
      textElement.deleteText(startOffset, endOffset);
    }
  }
}

function convertBase64ToImageBlob(base64String, defaultName) {
  let base64 = base64String.trim();
  let mimeType = 'image/png'; // default
  
  if (base64.includes(';base64,')) {
    const matches = base64.match(/^data:(image\/[a-zA-Z+.-]+);base64,/);
    if (matches && matches[1]) {
      mimeType = matches[1];
    }
    base64 = base64.split(';base64,')[1];
  } else if (base64.includes(',')) {
    base64 = base64.split(',')[1];
  }
  
  // Clean base64 string (remove whitespace and newlines)
  base64 = base64.replace(/\s/g, '');
  
  const decoded = Utilities.base64Decode(base64);
  return Utilities.newBlob(decoded, mimeType, defaultName || 'signature.png');
}

function formatValue(value) {
  if (Array.isArray(value)) return value.join(', ');
  if (value === null || value === undefined) return '';
  return String(value);
}

function safeName(value) {
  return String(value)
    .replace(/[\\/:*?"<>|#%{}~&]/g, '-')
    .trim()
    .slice(0, 120);
}

function slug(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 80);
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Returns a minimal file-like object used when PDF generation fails */
function makeDummyFileObject(message) {
  return {
    getUrl:  () => message,
    getId:   () => 'failed',
    getName: () => 'PDF creation failed',
    getBlob: () => Utilities.newBlob(message, 'text/plain', 'pdf-error.txt'),
  };
}

// -----------------------------------------------------------------------------
//  FIELD DEFINITION HELPERS
// -----------------------------------------------------------------------------
function section(title, fields)           { return { title, fields }; }
function text(name, label)                { return { type: 'text',          name, label }; }
function longText(name, label)            { return { type: 'longText',      name, label }; }
function dateField(name, label)           { return { type: 'date',          name, label }; }
function select(name, label, options)     { return { type: 'select',        name, label, options }; }
function checks(name, label, options)     { return { type: 'checkboxGroup', name, label, options }; }
function boolField(name, label)           { return { type: 'boolean',       name, label }; }

// -----------------------------------------------------------------------------
//  TEST FUNCTION — run from the Apps Script editor to verify end-to-end
// -----------------------------------------------------------------------------
function testPopulateTemplate() {
  const testData = {
    participant: {
      fullLegalName:       'Jane Doe',
      preferredName:       'Jane',
      dateOfBirth:         '2000-01-15',
      ssnFull:             '123-45-6789',
      genderIdentity:      'Female',
      raceEthnicity:       ['Black / African American'],
      currentAddress:      '123 Main Street, Columbia, MD 21046',
      primaryPhone:        '555-1000',
      email:               'jane.doe@example.com',
      currentHousingStatus:'Home',
      primaryLanguage:     'English',
      medicaidId:          'MD-123456',
      primaryInsurance:    'Medicaid',
      policyMemberId:      'PM-654321',
    },
    emergency: {
      contactFullName:  'John Doe',
      relationship:     'Parent',
      primaryPhone:     '555-2000',
      hasNoGuardian:    true,
      documentation:    ['None - participant self-directs'],
    },
    placement: {
      participantName:       'Jane Doe',
      placementStartDate:    '2026-05-19',
      residenceHomeAddress:  '456 Residence Road, Columbia, MD 21046',
      group_home:            true,
      respite:               false,
    },
    consent: {
      participantSignature: 'Jane Doe',
      signatureDate:        '2026-05-19',
      ParticipantAdress:    '123 Main Street, Columbia, MD 21046',
      ParticipantNum:       '555-1000',
      staffWitnessName:     'Staff Person',
      staffWitnessTitle:    'Coordinator',
      staffWitnessDate:     '2026-05-19',
    },
    roi: {
      participantFullName:          'Jane Doe',
      dateOfBirth:                  '2000-01-15',
      nameOrganization:             'Dr. Smith Medical Group',
      titlePosition:                'Primary Care Physician',
      phoneNumber:                  '301-555-7890',
      faxNumber:                    '301-555-7891',
      address:                      '789 Medical Drive, Columbia, MD 21046',
      informationTypes:             ['Medication Records', 'Nursing Notes'],
      mentalHealthRecordsNo:        true,
      hivAidsTreatmentNo:           true,
      substanceAlcoholTreatmentNo:  true,
      recordsFromAnotherProviderNo: true,
      purposeOfDisclosure:          ['Healthcare / Treatment', 'Coordination of Services'],
      effectiveDate:                '2026-05-19',
      expirationDate:               '2027-05-19',
      signature:                    'Jane Doe',
      signatureDate:                '2026-05-19',
      staffSignature:               'Staff Person',
      printedName:                  'Jane Doe',
      relationship:                 'Self',
    },
    rights: {
      signature:    'Jane Doe',
      date:         '2026-05-19',
      printedName:  'Jane Doe',
      relationship: 'Self',
    },
  };

  const result = saveSubmission(testData);
  Logger.log('=== TEST RESULT ===');
  Logger.log('Participant folder: ' + result.participantFolder);
  Logger.log('Main Intake PDF:    ' + result.mainPdfUrl);
  Logger.log('Form 3 ROI PDF:     ' + result.roiPdfUrl);
  return result;
}
