# 🤖 Dynamic Chatbot UI - Setup Guide

## ✨ Features

Your chatbot now has:
- **Beautiful Pastel Design** - Soft color palette with gradients (pink, blue, peach, mint)
- **Minimal UI** - Clean, distraction-free interface
- **Dynamic Animations** - Smooth transitions and loading indicators
- **Responsive Layout** - Works on mobile and desktop
- **Real-time Chat** - Send/receive messages with timestamps
- **Typing Indicators** - Bot shows when it's "thinking"
- **Emoji Support** - Fun, visual interactions

## 🎨 Color Palette

```
Primary (Pink):   #FFD6E8
Secondary (Blue): #C9E4FF
Accent (Peach):   #FFE5B4
Success (Mint):   #D6F5E8
```

## 📦 Installation

### Prerequisites
- Node.js (v14+) - [Download](https://nodejs.org)
- npm (comes with Node.js)

### Steps

1. **Navigate to project directory:**
   ```bash
   cd "c:\Users\aditya\VS CODE"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Add your Slack credentials:
     ```
     SLACK_BOT_TOKEN=your_token_here
     SLACK_SIGNING_SECRET=your_secret_here
     PORT=3000
     ```

4. **Start the bot:**
   ```bash
   npm start
   ```

5. **Access the chat UI:**
   - Open browser: `http://localhost:3001`

## 🚀 Running the Bot

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The bot runs on:
- **Slack Integration**: Port 3000
- **Web Chat UI**: Port 3001

## 📁 Project Structure

```
.
├── index.js              # Main bot logic + Express server
├── package.json          # Dependencies
├── .env                  # Environment variables (create from .env.example)
├── README.md             # Original readme
├── Dockerfile            # Docker configuration
└── public/
    ├── index.html        # Chat UI markup
    ├── styles.css        # Pastel design & animations
    └── script.js         # Chat functionality & API calls
```

## 🎯 How It Works

1. **User Types Message** → `public/script.js` sends to backend
2. **Backend Processes** → `index.js` runs `getBotResponse()`
3. **Bot Responds** → Message appears with animation
4. **Slack Integration** → Also works in Slack channels

## 🔧 Customization

### Change Colors
Edit `:root` variables in `public/styles.css`:
```css
--primary: #FFD6E8;    /* Change pink to your color */
--secondary: #C9E4FF;  /* Change blue */
--accent: #FFE5B4;     /* Change peach */
```

### Update Bot Responses
Edit `getBotResponse()` in `index.js`:
```javascript
function getBotResponse(message) {
  const msg = message.toLowerCase();
  
  if (msg.includes('your-keyword')) {
    return 'Your custom response!';
  }
  // ... more responses
}
```

### Add More Features
- Integrate with databases
- Add authentication
- Connect to APIs
- Implement more Slack features

## 🐛 Troubleshooting

**"npm is not recognized"**
- Install Node.js from https://nodejs.org
- Restart your terminal after installation

**Port already in use**
- Change PORT in `.env` file
- Or kill the process using the port

**Messages not sending**
- Check browser console (F12) for errors
- Verify `/api/chat` endpoint is accessible
- Check backend logs in terminal

## 📱 UI Components

- **Header** - Bot info with online status
- **Messages Area** - Chat history with timestamps
- **Input Box** - Message composition with buttons
- **Send Button** - Airplane emoji for sending
- **Attach Button** - Placeholder for file uploads
- **Typing Indicator** - Animated dots while bot responds

## ✅ Next Steps

1. Install Node.js if needed
2. Run `npm install` to get dependencies
3. Configure `.env` with Slack tokens
4. Start with `npm start`
5. Visit `http://localhost:3001` in your browser

Enjoy your beautiful chatbot! 🎉
