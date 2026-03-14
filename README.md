# Lourdes — Tap to Pray Prototype
### Holy Water Bracelets · Preview Build

---

## Deploy in 3 minutes (Vercel)

### Step 1 — Create a free Vercel account
Go to **vercel.com** → Sign up (free, no credit card needed)

### Step 2 — Deploy this folder
Two options:

**Option A — Drag & Drop (easiest)**
1. Go to vercel.com/new
2. Click "Browse" and select this entire `lourdes-deploy` folder
3. Click Deploy

**Option B — Vercel CLI**
```bash
npm install -g vercel
cd lourdes-deploy
vercel
```
Follow the prompts. When asked for project name, type: `lourdes-hwb`

### Step 3 — Add your Anthropic API key
1. In your Vercel dashboard, go to your project → **Settings → Environment Variables**
2. Add a new variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your Anthropic API key (starts with `sk-ant-...`)
   - **Environment:** Production, Preview, Development (check all three)
3. Click Save

### Step 4 — Redeploy
Go to **Deployments** → click the three dots on your latest deploy → **Redeploy**

### Step 5 — Share the URL
Vercel gives you a URL like: `https://lourdes-hwb.vercel.app`

That's your shareable link. Send it to anyone — works on any phone or desktop browser.

---

## How it works

```
User taps bracelet
       ↓
Opens lourdes-hwb.vercel.app (this app)
       ↓
User types a message
       ↓
Browser calls /api/chat (YOUR server — key is hidden)
       ↓
Server calls Anthropic API with your key
       ↓
Lourdes responds
```

The API key lives only on Vercel's servers. It is never visible to anyone viewing the page.

---

## Optional: Custom bracelet URL

Each bracelet type can open with a personalized greeting by adding a URL parameter:

| Bracelet | URL |
|----------|-----|
| Sacred Heart | `your-url.vercel.app/?bracelet=sacred-heart` |
| Cross | `your-url.vercel.app/?bracelet=cross` |
| Miraculous Mary | `your-url.vercel.app/?bracelet=miraculous` |
| Red Cardinal | `your-url.vercel.app/?bracelet=cardinal` |
| Serenity Prayer | `your-url.vercel.app/?bracelet=serenity` |
| Guardian Angel | `your-url.vercel.app/?bracelet=guardian` |
| Petite/Kids | `your-url.vercel.app/?bracelet=petite` |

This is what would be encoded in each NFC chip once the product launches.

---

## Files in this folder

```
lourdes-deploy/
├── index.html       ← the full app (all 5 screens)
├── api/
│   └── chat.js      ← secure API proxy (Vercel serverless function)
├── vercel.json      ← routing configuration
└── README.md        ← this file
```

---

## Questions?
Built by Claude for Holy Water Bracelets · holywaterbracelet.com
