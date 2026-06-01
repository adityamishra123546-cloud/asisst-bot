# 🚀 Deploy AssistBot to GitHub

## Step-by-Step Guide

### Prerequisites
- GitHub account (free at https://github.com)
- Git installed (https://git-scm.com/download/win)

---

## 📝 Step 1: Install Git

1. Download from: https://git-scm.com/download/win
2. Run installer with default settings
3. Restart your terminal/PowerShell
4. Verify: `git --version`

---

## 📦 Step 2: Configure Git Locally

```powershell
# Set your GitHub username
git config --global user.name "Your Name"

# Set your GitHub email
git config --global user.email "your.email@github.com"
```

---

## 🔧 Step 3: Initialize Local Repository

```powershell
# Navigate to project
cd "c:\Users\aditya\VS CODE"

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: AssistBot v2.4.0 with dynamic UI"
```

---

## 🌐 Step 4: Create GitHub Repository

1. Go to https://github.com/new
2. Fill in details:
   - **Repository name**: `AssistBot` (or your choice)
   - **Description**: "AI Chat Assistant with Slack Integration"
   - **Public/Private**: Choose Public (to share!)
   - **Add README**: NO (we have one)
3. Click "Create repository"

---

## 🔗 Step 5: Connect Local to GitHub

After creating the repo on GitHub, you'll see these commands. Run them:

```powershell
# Add remote origin
git remote add origin https://github.com/YOUR-USERNAME/AssistBot.git

# Rename branch to main (if on master)
git branch -M main

# Push to GitHub
git push -u origin main
```

> Replace `YOUR-USERNAME` with your actual GitHub username!

---

## ✅ Verify Upload

1. Go to your GitHub repo URL: `https://github.com/YOUR-USERNAME/AssistBot`
2. You should see all your files there
3. ✅ Project is now on GitHub!

---

## 🎯 Next: Deploy to Vercel for 24/7 Uptime

### Option A: Deploy to Vercel (Recommended)

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Select your AssistBot repo
5. Click "Deploy"
6. ✅ Your bot is live 24/7!

### Option B: Deploy to Render

1. Go to https://render.com
2. Sign up with GitHub
3. Create new "Web Service"
4. Connect your AssistBot repo
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Deploy!
8. ✅ Your bot is live 24/7!

---

## 📊 Project Structure

```
AssistBot/
├── index.js                 # Main bot logic
├── package.json            # Dependencies
├── .env.example            # Environment template
├── .gitignore              # Git exclusions
├── public/
│   ├── index.html          # Chat UI
│   ├── styles.css          # Styling
│   ├── script.js           # Chat logic
│   └── chatbot-standalone.html  # Standalone version
├── CHATBOT_SETUP.md        # Setup guide
├── BOT_REQUIREMENTS_CHECK.md # Requirements
├── README.md               # Project info
└── Dockerfile              # Docker config
```

---

## 🔐 Security Notes

- `.env` file is in `.gitignore` (won't upload secrets!)
- Create `.env` file locally with your tokens
- On deployment platform, add environment variables through dashboard

---

## 📱 After Deployment

Your bot will be accessible at:
- **Vercel**: `https://assistbot-[random].vercel.app`
- **Render**: `https://assistbot-[random].onrender.com`

---

## 💡 Quick Reference

| Task | Command |
|------|---------|
| Check status | `git status` |
| View commits | `git log --oneline` |
| Make changes | Edit files normally |
| Stage changes | `git add .` |
| Commit | `git commit -m "message"` |
| Push to GitHub | `git push` |
| Pull updates | `git pull` |

---

## ❓ Troubleshooting

**"git not found"**
- Install Git: https://git-scm.com/download/win
- Restart PowerShell after installation

**"fatal: not a git repository"**
- Run: `git init` in your project folder

**"Permission denied"**
- Set up SSH key: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

**"fatal: 'origin' does not appear to be a 'git' repository"**
- Run: `git remote add origin https://github.com/USERNAME/AssistBot.git`

---

## 🎉 You're Done!

Your AssistBot is now:
✅ On GitHub (backed up!)
✅ Ready to deploy
✅ Shareable with others
✅ Can run 24/7 on a server

**Next:** Choose Vercel or Render and deploy! 🚀
