import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import PDFDocument from 'pdfkit';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType } from 'docx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors());
app.use(express.json({ limit: '8mb' }));

// Serve static files from the React build in production
// In development, Vite will handle serving the frontend, but the API routes still work
if (NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
}

const sections = [
  { key: 'cover', title: 'Cover / Admission Summary' },
  { key: 'checklist', title: 'New Admission Documentation Checklist' },
  { key: 'participant', title: 'Form 1 — Participant Information & Demographics' },
  { key: 'emergency', title: 'Form 2 — Emergency Contact & Guardian Information' },
  { key: 'referral', title: 'Form 3 — Referral, Program Interest & Goals' },
  { key: 'risk', title: 'Form 4 — Risk Screening' },
  { key: 'clinical', title: 'Form 5 — Clinical / High-Support Needs Assessment' },
  { key: 'placement', title: 'Form 6 — Residential Placement Agreement' },
  { key: 'consent', title: 'Form 7 — Consent for Services & HIPAA Acknowledgement' },
  { key: 'roi', title: 'Form 8 — Authorization for Release of Protected Health Information' },
  { key: 'rights', title: 'Form 9 — Participant Rights & Responsibilities Acknowledgement' },
  { key: 'signature', title: 'Signature Page — Participant, Guardian & Responsible Party' },
  { key: 'staff', title: 'Form 10 — Staff Intake Review & Eligibility Determination' }
];

function valueText(value) {
  if (Array.isArray(value)) return value.length ? value.join(', ') : 'Not selected';
  if (value === true) return 'Yes';
  if (value === false) return 'No';
  if (value === undefined || value === null || value === '') return 'Not provided';
  return String(value);
}

function flattenEntries(obj, prefix = '') {
  const rows = [];
  for (const [key, value] of Object.entries(obj || {})) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      rows.push(...flattenEntries(value, prefix ? `${prefix} / ${labelize(key)}` : labelize(key)));
    } else {
      rows.push({ label: prefix ? `${prefix} / ${labelize(key)}` : labelize(key), value: valueText(value) });
    }
  }
  return rows;
}

function labelize(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/^./, c => c.toUpperCase())
    .trim();
}

function drawHeader(doc) {
  doc.rect(0, 0, doc.page.width, 72).fill('#123a59');
  doc.fillColor('#ffffff').fontSize(20).font('Helvetica-Bold').text('DOFA PATHWAYS', 50, 20);
  doc.fontSize(10).font('Helvetica').text('Residential Services — New Admission Intake Package', 50, 46);
  doc.fillColor('#000000');
}

function drawFooter(doc) {
  const y = doc.page.height - 45;
  doc.moveTo(50, y).lineTo(doc.page.width - 50, y).strokeColor('#cccccc').stroke();
  doc.fillColor('#555555').fontSize(8).font('Helvetica').text('Confidential — For Authorized Use Only', 50, y + 10, { align: 'center', width: doc.page.width - 100 });
  doc.fillColor('#000000');
}

function ensureSpace(doc, needed = 80) {
  if (doc.y + needed > doc.page.height - 70) {
    drawFooter(doc);
    doc.addPage();
    drawHeader(doc);
    doc.y = 95;
  }
}

function renderPdf(data, res) {
  const doc = new PDFDocument({ margin: 50, size: 'LETTER' });
  const filename = `DOFA_Intake_Filled_${Date.now()}.pdf`;
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  doc.pipe(res);

  drawHeader(doc);
  doc.y = 95;
  doc.fontSize(16).font('Helvetica-Bold').fillColor('#123a59').text('Completed Intake Form', { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(9).font('Helvetica').fillColor('#000000').text(`Generated: ${new Date().toLocaleString()}`, { align: 'center' });
  doc.moveDown(1);

  for (const section of sections) {
    const content = data[section.key];
    if (!content || Object.keys(content).length === 0) continue;
    ensureSpace(doc, 90);
    doc.rect(50, doc.y, doc.page.width - 100, 22).fill('#d9edf7');
    doc.fillColor('#123a59').font('Helvetica-Bold').fontSize(12).text(section.title, 58, doc.y + 6);
    doc.fillColor('#000000');
    doc.y += 34;
    const rows = flattenEntries(content);
    for (const row of rows) {
      ensureSpace(doc, 42);
      const startY = doc.y;
      doc.font('Helvetica-Bold').fontSize(9).fillColor('#333333').text(row.label, 58, startY, { width: 190 });
      doc.font('Helvetica').fontSize(9).fillColor('#000000').text(row.value, 255, startY, { width: 285 });
      doc.moveTo(55, doc.y + 4).lineTo(545, doc.y + 4).strokeColor('#eeeeee').stroke();
      doc.y += 10;
    }
    doc.moveDown(1);
  }

  drawFooter(doc);
  doc.end();
}

function makeCell(text, bold = false) {
  return new TableCell({
    width: { size: 50, type: WidthType.PERCENTAGE },
    children: [new Paragraph({ children: [new TextRun({ text: valueText(text), bold })] })]
  });
}

async function renderDocx(data, res) {
  const children = [
    new Paragraph({ text: 'DOFA PATHWAYS', heading: HeadingLevel.TITLE, alignment: AlignmentType.CENTER }),
    new Paragraph({ text: 'Residential Services — New Admission Intake Package', alignment: AlignmentType.CENTER }),
    new Paragraph({ text: 'Completed Intake Form', heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
    new Paragraph({ text: `Generated: ${new Date().toLocaleString()}`, alignment: AlignmentType.CENTER }),
    new Paragraph({ text: '' })
  ];

  for (const section of sections) {
    const content = data[section.key];
    if (!content || Object.keys(content).length === 0) continue;
    children.push(new Paragraph({ text: section.title, heading: HeadingLevel.HEADING_2 }));
    const rows = flattenEntries(content).map(item => new TableRow({
      children: [makeCell(item.label, true), makeCell(item.value)]
    }));
    children.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows }));
    children.push(new Paragraph({ text: '' }));
  }

  children.push(new Paragraph({ text: 'Confidential — For Authorized Use Only', alignment: AlignmentType.CENTER }));

  const doc = new Document({ sections: [{ properties: {}, children }] });
  const buffer = await Packer.toBuffer(doc);
  const filename = `DOFA_Intake_Filled_${Date.now()}.docx`;
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.send(buffer);
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', environment: NODE_ENV });
});

// API routes
app.post('/api/export/pdf', (req, res) => {
  renderPdf(req.body || {}, res);
});

app.post('/api/export/docx', async (req, res) => {
  try {
    await renderDocx(req.body || {}, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to generate DOCX' });
  }
});

app.post('/api/submit/google', async (req, res) => {
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  console.log('Submitting to Google Apps Script at:', scriptUrl);
  if (!scriptUrl) {
    res.status(500).json({ error: 'GOOGLE_APPS_SCRIPT_URL is not configured' });
    return;
  }

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body || {}),
    });
    const text = await response.text();
    let payload;
    try {
      payload = JSON.parse(text);
    } catch {
      payload = { ok: response.ok, raw: text };
    }
    res.status(response.ok ? 200 : 502).json(payload);
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: 'Unable to submit to Google Apps Script' });
  }
});

// Serve the React app for all other routes in production
if (NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`DOFA Intake Form API running at http://localhost:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});
