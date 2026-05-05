// Step definitions for the wizard
export const STEPS = [
  { id: 'welcome', title: 'Welcome & Overview', icon: '📋', desc: 'Introduction to DOFA Pathways' },
  { id: 'contact', title: 'Agency Contact Info', icon: '📞', desc: 'How to reach us' },
  { id: 'checklist', title: 'Documentation Checklist', icon: '✅', desc: 'Required documents for admission' },
  { id: 'form1', title: 'Participant Information', icon: '👤', desc: 'Form 1 — Demographics & contact details', requiredFields: ['participant.fullLegalName','participant.dateOfBirth','participant.currentAddress','participant.primaryPhone'] },
  { id: 'form2', title: 'Emergency Contact', icon: '🆘', desc: 'Form 2 — Guardian information', requiredFields: ['emergency.contactFullName','emergency.relationship','emergency.primaryPhone'] },
  { id: 'form3', title: 'Referral & Goals', icon: '🎯', desc: 'Form 3 — Program interest & goals', requiredFields: ['referral.referralSource'] },
  { id: 'form4', title: 'Risk Screening', icon: '⚠️', desc: 'Form 4 — Confidential risk assessment' },
  { id: 'form5', title: 'Clinical Assessment', icon: '🏥', desc: 'Form 5 — High-support needs', conditional: true },
  { id: 'form6', title: 'Placement Agreement', icon: '🏠', desc: 'Form 6 — Residential placement terms' },
  { id: 'form7', title: 'Consent & HIPAA', icon: '🔒', desc: 'Form 7 — Privacy acknowledgement' },
  { id: 'form8', title: 'Release of Information', icon: '📄', desc: 'Form 8 — ROI authorization' },
  { id: 'form9', title: 'Rights & Responsibilities', icon: '⚖️', desc: 'Form 9 — Acknowledgement' },
  { id: 'signatures', title: 'Signatures & Staff Review', icon: '✍️', desc: 'Final signatures & Form 10' },
];
