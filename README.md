# DOFA Pathways Frontend + API

This is a React + Vite frontend combined with an Express API server for PDF/DOCX export.

## Development

To run in development mode:

```bash
npm run dev
```

This starts the Vite dev server at `http://localhost:5173/`. 

If you need to test the export APIs during development, start the server in a separate terminal:

```bash
npm run dev:api
```

The API will be available at `http://localhost:3001/`.

Then in your React app, you'll need to change the fetch URLs to point to `http://localhost:3001/api/export/...`.

## Production Build & Run

To build and deploy:

```bash
npm run build
npm start
```

This will:
1. Build the React frontend into `dist/`
2. Start the Express server at `http://localhost:3001/` (or `$PORT` if set)
3. Serve the React app from `dist/` along with the API endpoints

## Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Set to `production` for deployment

## Deployment

For cloud deployment (Heroku, Railway, Render, etc.):

1. Ensure `npm run build` runs during the build phase
2. Set `npm start` as the start command
3. The server will serve both the React frontend and API on the specified PORT

Example for Procfile (Heroku):

```
web: npm run build && npm start
```

Or if your host runs `start` script automatically:

```
web: npm start
```

## API Endpoints

- `POST /api/export/pdf` - Generate filled PDF from form data
- `POST /api/export/docx` - Generate filled DOCX from form data
- `POST /api/submit/google` - Forward intake data to the configured Google Apps Script web app
- `GET /health` - Health check endpoint

## Google Sheets Workflow

The spreadsheet-first workflow lives in `google-apps-script/Code.gs`. Paste that file into a Google Sheet Apps Script project, run `setupWorkbook()`, deploy it as a web app, then set `GOOGLE_APPS_SCRIPT_URL` in the server environment.

See `docs/google-sheets-apps-script.md` for setup details.
