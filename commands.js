const { v4: uuidv4 } = require('uuid');
const Database = require('./db');

class CommandHandler {
  constructor(app, client) {
    this.app = app;
    this.client = client;
  }

  // Register all command handlers
  register() {
    // /help command
    this.app.command('/help', this.handleHelp.bind(this));

    // /status command
    this.app.command('/status', this.handleStatus.bind(this));

    // /history command
    this.app.command('/history', this.handleHistory.bind(this));

    // /info command
    this.app.command('/info', this.handleInfo.bind(this));

    // /hello command (already exists, update it)
    this.app.command('/hello', this.handleHello.bind(this));
  }

  async handleHelp({ ack, respond }) {
    await ack();
    const helpText = `
*🤖 Slack Bot Commands*

*Available Commands:*
• \`/help\` - Show this help message
• \`/status\` - Check bot status and statistics
• \`/history\` - View your interaction history
• \`/info\` - Get bot information
• \`/hello\` - Get a friendly greeting

*Available Features:*
• Mention the bot with \`@bot_name\` to interact
• Message \`hello\` for a greeting
• Use buttons and interactive elements

*Need Support?*
React with a question mark (❓) on any bot message for support.
    `;
    await respond(helpText);
  }

  async handleStatus({ ack, respond }) {
    await ack();
    try {
      const stats = await Database.getStats();
      const statusText = `
*🟢 Bot Status: Online*

*Statistics:*
• Total Users: ${stats.total_users || 0}
• Total Interactions: ${stats.total_interactions || 0}
• Active Days: ${stats.active_days || 0}

*Uptime:* Running smoothly ✅
*Version:* 1.0.0
      `;
      await respond(statusText);
    } catch (err) {
      console.error('Error in /status:', err);
      await respond('❌ Unable to retrieve status. Please try again.');
    }
  }

  async handleHistory({ ack, respond, command }) {
    await ack();
    try {
      const history = await Database.getUserHistory(command.user_id, 5);

      if (!history || history.length === 0) {
        await respond('📝 No interaction history found.');
        return;
      }

      let historyText = '*📊 Your Interaction History (Last 5):*\n\n';
      history.forEach((item, idx) => {
        const date = new Date(item.timestamp).toLocaleString();
        historyText += `${idx + 1}. *${item.command || item.message}*\n`;
        historyText += `   Time: ${date}\n`;
        historyText += `   Channel: <#${item.channel_id}>\n\n`;
      });

      await respond(historyText);
    } catch (err) {
      console.error('Error in /history:', err);
      await respond('❌ Unable to retrieve history. Please try again.');
    }
  }

  async handleInfo({ ack, respond }) {
    await ack();
    const infoText = `
*ℹ️ Bot Information*

*About:*
This is an advanced Slack bot with interaction tracking, command handling, and smart features.

*Features:*
✅ User interaction logging
✅ Command-based interactions
✅ Message processing with keywords
✅ User profile tracking
✅ Activity statistics
✅ Error handling & monitoring

*Built with:* Slack Bolt Framework (Node.js)
*Database:* SQLite for persistent storage
*Version:* 1.0.0
    `;
    await respond(infoText);
  }

  async handleHello({ ack, respond, command }) {
    await ack();
    const interactionId = uuidv4();

    try {
      // Get user info for logging
      const userInfo = await this.client.users.info({ user: command.user_id });
      const userName = userInfo.user.real_name || userInfo.user.name;

      // Log interaction
      await Database.logInteraction({
        id: interactionId,
        user_id: command.user_id,
        user_name: userName,
        command: '/hello',
        message: '',
        channel_id: command.channel_id,
        response: `Hello ${userName}!`
      });

      // Update user profile
      await Database.updateUserProfile(command.user_id, userName, {});
      await Database.incrementUserCount(command.user_id);

      await respond(`👋 Hello <@${command.user_id}>! Thanks for saying hello.`);
    } catch (err) {
      console.error('Error in /hello:', err);
      await respond('👋 Hello! (Unable to log interaction)');
    }
  }
}

module.exports = CommandHandler;
