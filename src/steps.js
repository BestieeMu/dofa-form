export const STEPS = [
  { id: 'welcome', title: 'Cover & Agency Contact', icon: '1', desc: 'PDF page 1', requiredFields: ['cover.participantName'] },
  { id: 'contact', title: 'Welcome Letter', icon: '2', desc: 'PDF page 2' },
  { id: 'checklist', title: 'Documentation Checklist', icon: '3', desc: 'PDF page 3' },
  { id: 'form1', title: 'Participant Information', icon: '4', desc: 'PDF page 4', requiredFields: ['participant.fullLegalName', 'participant.dateOfBirth', 'participant.ssnFull', 'participant.primaryLanguage', 'participant.medicaidId', 'participant.currentAddress', 'participant.primaryPhone'] },
  { id: 'form2', title: 'Emergency Contact', icon: '5', desc: 'PDF page 5', requiredFields: ['emergency.contactFullName', 'emergency.relationship', 'emergency.primaryPhone'] },
  { id: 'form8', title: 'Release of Information', icon: '6', desc: 'PDF pages 6-7', requiredFields: ['roi.participantFullName', 'roi.dateOfBirth', 'roi.nameOrganization'] },
  { id: 'form9', title: 'Rights & Responsibilities', icon: '7', desc: 'PDF page 8' },
  { id: 'form6', title: 'Placement Agreement', icon: '8', desc: 'PDF page 9' },
  { id: 'form7', title: 'Consent & HIPAA', icon: '9', desc: 'PDF page 9' },
];
