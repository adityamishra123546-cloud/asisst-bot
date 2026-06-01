# 🤖 AssistBot v2.4.0

An advanced AI chatbot with a beautiful dynamic UI, Slack integration, and 24/7 deployment capability.

## ✨ Features

✅ **Dynamic Web UI** - Beautiful pastel design with smooth animations
✅ **11+ Bot Functions** - Greetings, help, movies, HR info, IT support, jokes, motivation
✅ **Slack Integration** - Full Slack bot with commands and events
✅ **Real-time Chat** - Instant message processing with typing indicators
✅ **Intent Recognition** - Smart keyword matching with confidence scoring
✅ **Responsive Design** - Works perfectly on mobile and desktop
✅ **Multiple Response Types** - Varied responses for natural conversations
✅ **Database Ready** - SQLite integration for persistent storage
✅ **Docker Support** - Easy deployment and containerization

## 🎯 Bot Capabilities

### 🤖 Core Functions (11 Available)
1. **Greeting** - Friendly hellos
2. **Help/Features** - Show all capabilities
3. **HR Holidays** - Company vacation calendar
4. **IT WiFi** - Network credentials & setup
5. **IT Support** - Ticket filing & issues
6. **Movie Recommendations** - Hindi & international films
7. **Synonyms/Definitions** - Word meanings
8. **Jokes** - Funny one-liners (randomized)
9. **Motivation** - Inspirational messages
10. **Bot Info** - About AssistBot
11. **Gratitude** - Thank you responses

## 🚀 Quick Start

### 1. **Installation**
```bash
# Clone repository
git clone https://github.com/YOUR-USERNAME/AssistBot.git
cd AssistBot

# Install dependencies
npm install
```

### 2. **Configuration**
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your Slack credentials
# SLACK_BOT_TOKEN=xoxb-...
# SLACK_SIGNING_SECRET=...
# PORT=3000
```

### 3. **Run Locally**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

### 4. **Access UI**
- Web UI: http://localhost:3001
- Slack: Invite bot to your workspace

## 📁 Project Structure

```
AssistBot/
├── index.js                      # Main bot & Express server
├── package.json                  # Dependencies
├── .env.example                  # Environment template
├── .gitignore                    # Git exclusions
├── Dockerfile                    # Docker config
├── public/
│   ├── index.html               # Chat interface
│   ├── styles.css               # Pastel design
│   ├── script.js                # Chat logic
│   └── chatbot-standalone.html  # Standalone version
├── CHATBOT_SETUP.md             # Setup guide
├── BOT_REQUIREMENTS_CHECK.md    # Requirements checklist
├── GITHUB_DEPLOYMENT.md         # GitHub & Vercel guide
├── README.md                    # This file
└── Dockerfile                   # Docker config
```

## 🎨 UI Design

- **Color Palette**: Pastel pink (#FFD6E8), blue (#C9E4FF), peach (#FFE5B4), mint (#D6F5E8)
- **Animations**: Smooth transitions, bounce effects, typing indicators
- **Responsive**: Mobile-first design, works on all devices
- **Accessibility**: Clear contrast, readable fonts, emoji support

## 💬 Try These Commands

```
hello              → Greeting
help               → Show all features
movie              → Movie recommendations
wifi               → Network info
holiday            → Company holidays
ticket             → IT support
synonym happy      → Word meanings
joke               → Funny jokes
motivate           → Inspiration
thanks             → Gratitude
```

## 🔧 Available Commands

### Slack Slash Commands (if integrated)
- `/help` - Show bot capabilities
- `/status` - Bot status
- `/hello` - Greeting

### Message Keywords
The bot listens for keywords in messages:
- Greetings: "hi", "hello", "hey"
- Support: "help", "issue", "problem"
- Gratitude: "thanks", "thank you"

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - FREE)
```bash
# 1. Push to GitHub
git push origin main

# 2. Go to vercel.com
# 3. Import GitHub repo
# 4. Deploy!
```

### Option 2: Render
```bash
# 1. Push to GitHub
git push origin main

# 2. Go to render.com
# 3. Create new Web Service
# 4. Connect repo and deploy
```

### Option 3: Docker
```bash
docker build -t assistbot .
docker run -p 3000:3000 -p 3001:3001 assistbot
```

## 🔐 Security

- `.env` file is in `.gitignore` (never exposed)
- Never commit secrets to repository
- Use platform environment variables for deployment
- API keys stored server-side only

## 🤖 Bot Architecture

```
User Input → Keyword Matching → Intent Recognition 
    ↓           ↓                    ↓
Chat UI      Extract Keywords    Calculate Score
    ↓           ↓                    ↓
API Call → Process Message → Select Response
    ↓           ↓                    ↓
Display      Format Answer     Send to User
```

## 🧠 Intent Matching System

The bot uses a confidence-based matching system:
- Analyzes user keywords
- Matches against trained intents
- Scores confidence level
- Returns best matching response
- Falls back gracefully for unknowns

## 📊 Database Schema (Optional)

When using full backend:
- `interactions` - Chat history
- `user_profiles` - User data
- `activity_log` - Bot events

## 🐛 Troubleshooting

### "Port already in use"
```bash
# Change PORT in .env
PORT=3002
```

### "Bot not responding"
- Check `.env` file has correct credentials
- Verify Slack workspace permissions
- Check browser console for errors

### "npm: command not found"
- Install Node.js: https://nodejs.org
- Restart terminal after installation

## 🚀 Deployment Checklist

- ✅ Push code to GitHub
- ✅ Connect to Vercel/Render
- ✅ Set environment variables
- ✅ Deploy
- ✅ Test at public URL
- ✅ Bot runs 24/7!

## 📚 Documentation

- [CHATBOT_SETUP.md](./CHATBOT_SETUP.md) - Detailed setup guide
- [BOT_REQUIREMENTS_CHECK.md](./BOT_REQUIREMENTS_CHECK.md) - Requirements verification
- [GITHUB_DEPLOYMENT.md](./GITHUB_DEPLOYMENT.md) - GitHub & deployment guide
- [FEATURES_ADDED.md](./FEATURES_ADDED.md) - Features overview

## 🎓 Learning Resources

- [Slack Bolt Documentation](https://slack.dev/bolt)
- [Express.js Guide](https://expressjs.com)
- [Node.js Tutorial](https://nodejs.org/en/docs)
- [SQLite Documentation](https://www.sqlite.org/docs.html)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Push to GitHub
5. Submit a pull request

## 📝 License

MIT - Feel free to use this project!

## 💡 Future Enhancements

- [ ] Machine learning for better responses
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Custom response training
- [ ] Voice chat integration
- [ ] Video call support
- [ ] Integration with more APIs
- [ ] Mobile app version

## 🎉 Support

For questions or issues:
1. Check [GitHub Issues](https://github.com/YOUR-USERNAME/AssistBot/issues)
2. Open a new issue with details
3. Include error messages and steps to reproduce

---

**Made with ❤️ for better team communication**

**Version**: 2.4.0  
**Last Updated**: 2026-06-01  
**Status**: Production Ready ✅


