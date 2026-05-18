const fs = require('fs');

const vars = {
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
};

let html = fs.readFileSync('index.html', 'utf8');
for (const [key, val] of Object.entries(vars)) {
  if (!val) { console.warn(`Warning: env var ${key} is not set`); }
  html = html.split(`%%${key}%%`).join(val || '');
}
fs.writeFileSync('index.html', html);
console.log('Firebase config injected successfully.');
