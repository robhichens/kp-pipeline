# HINGE Advisors — Lead Pipeline

Internal sales tool for Kathe Petchel, Business Development Specialist.

## Deploy to Netlify (one-time setup, ~5 minutes)

### 1. Push to GitHub
- Create a new **private** repo on github.com
- Push this entire folder as-is

### 2. Connect to Netlify
- Go to [netlify.com](https://netlify.com) → **Add new site → Import an existing project**
- Connect your GitHub account → select this repo
- Build settings will auto-detect from `netlify.toml` — leave defaults
- Click **Deploy site**

### 3. Add your API key
- In Netlify dashboard → **Site → Environment variables → Add variable**
  - Key: `ANTHROPIC_API_KEY`
  - Value: your `sk-ant-...` key from [console.anthropic.com](https://console.anthropic.com)
- Go to **Deploys → Trigger deploy** to pick up the new variable

### 4. Done
Netlify gives you a URL like `https://hinge-advisors.netlify.app`.  
Share that URL with Kathe — works in any browser, no install required.

---

## Repo structure

```
├── index.html                  ← the full app
├── netlify.toml                ← Netlify config
├── netlify/
│   └── functions/
│       └── claude.js           ← serverless API proxy (keeps API key secret)
└── README.md
```

## Security notes
- The Anthropic API key is stored **only** in Netlify's environment variables — never in the HTML or committed to Git
- Keep the GitHub repo **private**
- Data is saved in each user's browser localStorage — nothing is sent to any server except Claude API calls

## Updating leads / making changes
- Edit `index.html` locally, commit, push to GitHub
- Netlify auto-deploys within ~30 seconds
