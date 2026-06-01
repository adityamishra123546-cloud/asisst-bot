const { v4: uuidv4 } = require('uuid');
const Database = require('./db');

// Logger utility
const logger = {
  info: (msg) => console.log(`[INFO] ${new Date().toISOString()} - ${msg}`),
  error: (msg, err) => console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`, err),
  debug: (msg) => console.log(`[DEBUG] ${new Date().toISOString()} - ${msg}`)
};

class MessageHandler {
  constructor(app, client) {
    this.app = app;
    this.client = client;
    this.keywords = {
      greeting: ['hi', 'hello', 'hey', 'greetings', 'howdy'],
      help: ['help', 'assist', 'support', 'urgently', '?'],
      status: ['status', 'stats', 'info'],
      thanks: ['thanks', 'thank you', 'appreciate', 'grateful']
    };
  }

  // Register all message handlers
  register() {
    // App mention handler (with enhanced features)
    this.app.event('app_mention', this.handleMention.bind(this));

    // Message handler (with smart keyword detection)
    this.app.message(/.*/, this.handleMessage.bind(this));

    // Button actions
    this.app.action('get_info', this.handleGetInfoButton.bind(this));
    this.app.action('view_history', this.handleViewHistoryButton.bind(this));
  }

  async handleMention({ event, say, client }) {
    const interactionId = uuidv4();
    logger.info(`App mentioned by user ${event.user}`);

    try {
      const userInfo = await client.users.info({ user: event.user });
      const userName = userInfo.user.real_name || userInfo.user.name;

      // Log interaction
      await Database.logInteraction({
        id: interactionId,
        user_id: event.user,
        user_name: userName,
        command: 'mention',
        message: event.text,
        channel_id: event.channel,
        response: 'Interactive menu shown'
      });

      // Update user profile
      await Database.updateUserProfile(event.user, userName, {});
      await Database.incrementUserCount(event.user);

      await say({
        text: `Hi <@${event.user}>! How can I help?`,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `👋 Hi <@${event.user}>! I can help you with:\n• Info about me\n• Your interaction history\n• Command help`
            }
          },
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                text: { type: 'plain_text', text: 'Get Info' },
                action_id: 'get_info',
                style: 'primary'
              },
              {
                type: 'button',
                text: { type: 'plain_text', text: 'View History' },
                action_id: 'view_history'
              }
            ]
          }
        ]
      });
    } catch (err) {
      logger.error('Error in app mention handler:', err);
      await say('Sorry, I encountered an error. Please try again.');
    }
  }

  async handleMessage({ event, say, client, message }) {
    // Ignore bot messages and edits
    if (message.subtype && (message.subtype === 'bot_message' || message.subtype === 'message_changed')) {
      return;
    }

    if (!event.text) return;

    const text = event.text.toLowerCase();
    const interactionId = uuidv4();

    try {
      const userInfo = await client.users.info({ user: event.user });
      const userName = userInfo.user.real_name || userInfo.user.name;

      // Detect keywords and respond
      if (this.matchesKeywords(text, this.keywords.greeting)) {
        await say(`👋 Hey <@${event.user}>! Nice to see you!`);
        this.logMessageInteraction(interactionId, event.user, userName, text, 'greeting response', event.channel);
      } else if (this.matchesKeywords(text, this.keywords.help)) {
        await say(`I'm here to help! Try \`/help\` to see all available commands.`);
        this.logMessageInteraction(interactionId, event.user, userName, text, 'help response', event.channel);
      } else if (this.matchesKeywords(text, this.keywords.thanks)) {
        await say(`😊 You're welcome <@${event.user}>! Happy to help.`);
        this.logMessageInteraction(interactionId, event.user, userName, text, 'thanks response', event.channel);
      } else if (this.matchesKeywords(text, this.keywords.status)) {
        const stats = await Database.getStats();
        await say(
          `📊 Current stats:\n• Users: ${stats.total_users}\n• Interactions: ${stats.total_interactions}\n• Active days: ${stats.active_days}`
        );
        this.logMessageInteraction(interactionId, event.user, userName, text, 'stats response', event.channel);
      }

      // Update user profile
      await Database.updateUserProfile(event.user, userName, {});
      await Database.incrementUserCount(event.user);
    } catch (err) {
      logger.error('Error in message handler:', err);
    }
  }

  async handleGetInfoButton({ ack, body, client }) {
    await ack();
    const interactionId = uuidv4();

    try {
      const userInfo = await client.users.info({ user: body.user.id });
      const userName = userInfo.user.real_name || userInfo.user.name;

      const infoText = `*ℹ️ About This Bot*\nI'm a smart Slack bot with:
• Command handling (/help, /status, /history, /info)
• Keyword recognition (greetings, help requests, thanks)
• User interaction tracking
• Statistics and analytics
• 24/7 availability`;

      await client.chat.postEphemeral({
        channel: body.channel.id,
        user: body.user.id,
        text: infoText
      });

      this.logMessageInteraction(
        interactionId,
        body.user.id,
        userName,
        '',
        'get_info button clicked',
        body.channel.id
      );
    } catch (err) {
      logger.error('Error in get_info button handler:', err);
    }
  }

  async handleViewHistoryButton({ ack, body, client }) {
    await ack();
    const interactionId = uuidv4();

    try {
      const userInfo = await client.users.info({ user: body.user.id });
      const userName = userInfo.user.real_name || userInfo.user.name;
      const history = await Database.getUserHistory(body.user.id, 3);

      let historyText = '*📊 Your Recent Interactions:*\n';
      if (history.length === 0) {
        historyText += '(No history yet)';
      } else {
        history.forEach((item, idx) => {
          const date = new Date(item.timestamp).toLocaleDateString();
          historyText += `${idx + 1}. ${item.command || item.message} - ${date}\n`;
        });
      }

      await client.chat.postEphemeral({
        channel: body.channel.id,
        user: body.user.id,
        text: historyText
      });

      this.logMessageInteraction(
        interactionId,
        body.user.id,
        userName,
        '',
        'view_history button clicked',
        body.channel.id
      );
    } catch (err) {
      logger.error('Error in view_history button handler:', err);
    }
  }

  matchesKeywords(text, keywords) {
    return keywords.some(keyword => text.includes(keyword));
  }

  async logMessageInteraction(id, userId, userName, message, responseType, channelId) {
    try {
      await Database.logInteraction({
        id,
        user_id: userId,
        user_name: userName,
        command: 'message',
        message: message,
        channel_id: channelId,
        response: responseType
      });
    } catch (err) {
      logger.error('Error logging message interaction:', err);
    }
  }
}

module.exports = { MessageHandler, logger };
