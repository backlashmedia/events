// ═══════════════════════════════════════════════════════════════
//  BACKLASH MEDIA — Mailing List → Google Sheets
//  Paste this entire file into Google Apps Script and deploy
//  as a Web App (see README comments below).
// ═══════════════════════════════════════════════════════════════
//
//  HOW TO SET UP (takes ~5 minutes):
//
//  1. Go to https://sheets.google.com and create a new spreadsheet.
//     Name it "Backlash Media Mailing List" (or anything you like).
//     In Row 1, add these headers: Timestamp | Email
//
//  2. Go to https://script.google.com → New Project
//     Delete any existing code and paste this entire file.
//
//  3. At the top of this file, replace YOUR_SPREADSHEET_ID below
//     with the ID from your sheet's URL:
//     https://docs.google.com/spreadsheets/d/ ← THIS PART → /edit
//
//  4. Click Deploy → New Deployment → Web App
//     - Execute as: Me
//     - Who has access: Anyone
//     Click Deploy and copy the Web App URL.
//
//  5. Paste that URL into index.html where it says APPS_SCRIPT_URL.
//
// ═══════════════════════════════════════════════════════════════

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // ← replace this
const SHEET_NAME     = 'Sheet1';               // ← or your tab name

function doPost(e) {
  try {
    const data  = JSON.parse(e.postData.contents);
    const email = (data.email || '').trim().toLowerCase();

    // Basic validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      return jsonResponse({ success: false, error: 'Invalid email address.' });
    }

    const sheet = SpreadsheetApp
      .openById(SPREADSHEET_ID)
      .getSheetByName(SHEET_NAME);

    // Check for duplicates
    const existing = sheet.getDataRange().getValues().flat();
    if (existing.includes(email)) {
      return jsonResponse({ success: true, duplicate: true });
    }

    // Append new row: timestamp + email
    sheet.appendRow([new Date().toISOString(), email]);

    return jsonResponse({ success: true, duplicate: false });

  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

// Handle preflight CORS requests from the browser
function doGet(e) {
  return jsonResponse({ status: 'Backlash Media mailing list endpoint is live.' });
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
