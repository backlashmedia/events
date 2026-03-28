# BACKLASH MEDIA EVENTS — Setup Guide

## Your repository structure

```
your-repo/
├── index.html          ← the website (never needs editing)
├── events.json         ← ALL your content lives here ← EDIT THIS
├── mailing-list-script.gs  ← Google Apps Script (one-time setup)
└── images/
    ├── summer-sounds.jpg
    ├── street-food.jpg
    ├── gallery-1.jpg
    └── ... all your photos
```

---

## Step 1 — Host on GitHub Pages (free)

1. Create a new repository on GitHub (can be private or public)
2. Upload all these files
3. Go to **Settings → Pages → Source → Deploy from branch → main → / (root)**
4. Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

---

## Step 2 — Connect your content (2 lines to edit)

Open `index.html` and find these two lines near the top of the `<script>` block:

```js
const GITHUB_USER = 'YOUR_GITHUB_USERNAME';   // e.g. 'backlashmedia'
const GITHUB_REPO = 'YOUR_REPO_NAME';         // e.g. 'events-site'
```

Replace with your actual GitHub username and repo name. That's it.
The page will now automatically load your `events.json` every time it opens.

---

## Step 3 — Updating events (the only file you ever edit)

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

## Step 4 — Adding photos

### For event images:
1. Upload your photo to the `images/` folder in GitHub
2. In `events.json`, set `"img": "images/your-photo.jpg"`

### For gallery photos:
In `events.json`, update the `"gallery"` array:
```json
"gallery": [
  { "img": "images/gallery-1.jpg", "caption": "▸ EVENT NAME 2025", "emoji": "🎶" },
  { "img": "images/gallery-2.jpg", "caption": "▸ ANOTHER PHOTO",    "emoji": "🎨" }
]
```

**Tip:** You can also use external image URLs (Unsplash, your own CDN, etc.):
```json
"img": "https://images.unsplash.com/photo-XXXXX?w=800"
```

---

## Step 5 — Mailing list → Google Sheets

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

## Editing tips

- GitHub lets you edit `events.json` directly in the browser — no need to download anything
- Changes go live within ~1 minute (GitHub Pages cache)
- If an image doesn't show, the emoji fallback appears automatically
- Always make sure your JSON is valid — use [jsonlint.com](https://jsonlint.com) if unsure
