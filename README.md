Set up

## Step 1 — Updating events (the only file you ever edit)

Open `events.json` on GitHub and edit directly in the browser (click the ✏️ pencil icon).

### To change an event's text:
Just edit the fields. Example:
```json
"title": "NEW EVENT NAME",
"desc":  "Updated description here.",
"date":  "SAT 20 SEP",
"time":  "18:00 – 22:00",
"price": "€10"
```

### To change which event is featured ("Coming Up"):
Set `"featured": true` on one event and `false` on all others.

### To change a colour:
Use any of: `"var(--cyan)"` `"var(--pink)"` `"var(--yellow)"` `"var(--purple)"` `"var(--green)"` `"var(--orange)"`
Or use any hex colour: `"#ff6600"`

### To add a new event:
Copy an existing event block, paste it, and update the fields.

### To remove an event:
Delete its `{ ... }` block (make sure commas between items stay correct).

---

## Step 2 — Mailing list → Google Sheets

### A. Create your spreadsheet
1. Go to [sheets.google.com](https://sheets.google.com) → New spreadsheet
2. Name it "Backlash Media Mailing List"
3. In Row 1: put `Timestamp` in A1 and `Email` in B1
4. Copy the spreadsheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/` **← THIS LONG STRING →** `/edit`

### B. Deploy the script
1. Go to [script.google.com](https://script.google.com) → New project
2. Delete any existing code
3. Paste the contents of `mailing-list-script.gs`
4. Replace `YOUR_SPREADSHEET_ID` with your actual ID
5. Click **Deploy → New Deployment**
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy** → copy the Web App URL

### C. Connect to your site
In `index.html`, find:
```js
const APPS_SCRIPT_URL = '';
```
Paste your Web App URL between the quotes:
```js
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/XXXXX/exec';
```
Commit the file. Done — emails now go straight to your Google Sheet.

---

## Step 3 — Follow statistics
https://backlashmedia.goatcounter.com/
