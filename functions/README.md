# Satkar Hotel — Firebase Cloud Functions

Owner notification pipeline. Sends an instant WhatsApp message whenever a guest submits a booking through the public site.

## What it does

`notifyOwnerOnBooking` triggers on every new document in the Firestore `bookings` collection. It formats a clean WhatsApp alert and pushes it to the owner's phone via CallMeBot (free, no API cost).

## One-time setup

### 1. Get your CallMeBot API key

1. Open WhatsApp and message **+34 634 52 94 91** with `I allow callmebot to send me messages`
2. Or visit: https://www.callmebot.com/blog/free-api-whatsapp-messages/
3. Save the API key they reply with.

### 2. Set your Firebase project ID

```bash
# In the repo root
firebase login
firebase use --add
# Select your Satkar Firebase project
```

### 3. Configure the secrets

```bash
firebase functions:config:set callmebot.phone="+9779851411730" callmebot.apikey="YOUR_CALLMEBOT_KEY"
```

### 4. Install & deploy

```bash
cd functions
npm install
npm run build
firebase deploy --only functions
```

## Local emulation (optional)

```bash
firebase emulators:start --only functions,firestore
```

Then create a test booking in the Firestore emulator. The function will log to the emulator console.

## Files

| File | Purpose |
|------|---------|
| `src/index.ts` | Main function — `notifyOwnerOnBooking` |
| `package.json` | Node 20 runtime + deps |
| `tsconfig.json` | TypeScript build config |
| `.env.example` | Template for local env vars |
