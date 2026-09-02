# Day Flow

A conversational time-management app. This folder is ready to publish for free.

## What's in this folder
- `index.html` — the whole app
- `manifest.json` — makes it installable to a phone's home screen
- `sw.js` — lets it load reliably and work offline
- `icon-192.png`, `icon-512.png` — the app icon

## How to publish it for free (Netlify — easiest, no coding)

1. Go to **app.netlify.com/drop** in your browser.
2. Drag this whole folder onto the page.
3. Netlify uploads it and gives you a live link in seconds — something like `https://random-name-123.netlify.app`.
4. Open that link on your phone. On Android, Chrome will offer "Add to Home Screen." On iPhone, tap the Share icon, then "Add to Home Screen."
5. (Optional) Create a free Netlify account to keep the link permanently and rename it to something like `dayflow-app.netlify.app`.

That's it — no payment, no card, no app store.

## Alternative: GitHub Pages (if you want it on GitHub too)

1. Create a free account at **github.com** if you don't have one.
2. Create a new repository — name it anything, e.g. `day-flow`.
3. Upload all the files in this folder to that repository (use the "Add file → Upload files" button on the repo page).
4. Go to the repo's **Settings → Pages**.
5. Under "Source," choose the `main` branch and save.
6. GitHub gives you a live link like `https://yourusername.github.io/day-flow/` within a minute or two.

Both options are entirely free and stay free — no expiry, no card required.

## Connecting background push notifications (OneSignal)

This version is wired to OneSignal so reminders can arrive even when the app is closed. Two things you must do on Netlify before it works:

1. **Set the secret key.** Go to your Netlify site's dashboard → **Site configuration → Environment variables** → **Add a variable**.
   - Key: `ONESIGNAL_REST_API_KEY`
   - Value: (paste your OneSignal REST API Key here — never put this in the app's files)
   - Save.

2. **Redeploy.** Go to your site's **Deploys** tab and drag this whole folder in again. This both updates your live app and picks up the new environment variable and the serverless function.

3. **Set the service worker path in OneSignal.** In your OneSignal dashboard, go to your app's Web Push settings → Advanced Push Settings, and set the Service Worker path/scope to `/onesignal/`. This keeps OneSignal's worker from conflicting with the app's own offline worker.

Once those three things are done, opening the app, allowing notifications, and adding a task with a future time should trigger a real push — even if you close the tab or lock your phone.

