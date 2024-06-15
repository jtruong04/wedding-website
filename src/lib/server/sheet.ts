import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID } from '$env/static/private';

const SCOPES = [
	'https://www.googleapis.com/auth/spreadsheets',
	'https://www.googleapis.com/auth/drive.file'
];

const jwt = new JWT({
	email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
	key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
	scopes: SCOPES
});

// export const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, jwt);

export async function getSheet(title: string) {
    const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, jwt);
    await doc.loadInfo();
    return doc.sheetsByTitle[title];
}

export function findRow<T extends Record<string, any>>(sheet: GoogleSpreadsheetWorksheet, key: keyof T, value: string) {
    return sheet.getRows<T>().then(rows => rows.find(r => r.get(key) === value));
}