# ⚡ Quick GitHub Upload (2 Minutes)

## Step 1: Install Git
- Download: https://git-scm.com/download/win
- Run installer (use default settings)
- **Restart PowerShell/Terminal**

## Step 2: Configure Git
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@github.com"
```

## Step 3: Initialize Repository
```powershell
cd "c:\Users\aditya\VS CODE"
git init
git add .
git commit -m "AssistBot v2.4.0 - Dynamic AI Chatbot"
```

## Step 4: Create GitHub Repo
1. Go to https://github.com/new
2. Name it: `AssistBot`
3. Click "Create repository"

## Step 5: Connect & Push
```powershell
git remote add origin https://github.com/YOUR-USERNAME/AssistBot.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username!

## ✅ Done!
Your code is now on GitHub: `https://github.com/YOUR-USERNAME/AssistBot`

## 🚀 Next: Deploy to Vercel (for 24/7 uptime)
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Select your AssistBot repo
5. Click "Deploy"
6. ✅ Bot runs 24/7!

---

**That's it! Your bot is now on GitHub and ready to deploy!** 🎉
