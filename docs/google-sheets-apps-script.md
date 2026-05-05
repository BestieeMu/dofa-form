# Google Sheets + Apps Script Workflow

This project now uses the spreadsheet-first approach.

## What The Apps Script Does

`google-apps-script/Code.gs`:

- Defines every intake section and field in `FIELD_SCHEMA`.
- Includes checkbox groups and their individual options.
- Creates spreadsheet headers using `Section | Field` naming.
- Stores each checkbox option as its own `Yes` / `No` column, plus a combined `Selected` column.
- Stores the full raw JSON submission in a `Raw JSON` column.
- Populates a Google Docs template with placeholders, then exports it as PDF.
- Falls back to a generated summary PDF if no template is configured.
- Saves the PDF to Google Drive folder:

```text
10TLoTQO6Qd1ifKNlgSnWiU-m7JUluSKR
```

- Can email the generated PDF link or attachment.

## Setup

1. Create or open the Google Sheet that should collect submissions.
2. Go to `Extensions > Apps Script`.
3. Paste the contents of `google-apps-script/Code.gs`.
4. In `CONFIG.emailRecipients`, add comma-separated recipient emails.
5. Optional but recommended: create a Google Docs template and put its file ID in `CONFIG.templateDocId`.
6. Run `createPlaceholderGuide()` once to generate a guide with every placeholder you can use.
7. Run `setupWorkbook()` once and approve permissions.
8. Deploy as a web app:
   - Execute as: `Me`
   - Who has access: `Anyone`
9. Copy the web app URL.
10. Add it to your server environment:

```text
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

## Notes

## Placeholder Format

Use double braces in the Google Docs template:

```text
{{participant.fullLegalName}}
{{cover.dateOfAdmission}}
{{entryId}}
{{submittedAt}}
```

Checkbox groups have two placeholder styles:

```text
{{checklist.identification}}
{{checklist.identification.social_security_card}} Social Security card
{{checklist.identification.state_id}} State ID
```

The group placeholder prints selected values as text. The option placeholder prints `[x]` if selected and `[ ]` if not selected.

Select/dropdown fields also support option placeholders. For example:

```text
{{emergency.hasGuardian.yes}} Yes
{{emergency.hasGuardian.no}} No
```

The selected option prints `[x]`; the unselected option prints `[ ]`.

Apps Script cannot reliably replace text inside a finished flat PDF. The practical placeholder workflow is: create a Google Docs template that visually matches the PDF, add placeholders there, let Apps Script replace them, then export the completed document as PDF.
