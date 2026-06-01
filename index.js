require('dotenv').config();
const { App } = require('@slack/bolt');
const Database = require('./db');
const CommandHandler = require('./commands');
const { MessageHandler, logger } = require('./messages');

const port = process.env.PORT || 3000;

// Validate environment variables
if (!process.env.SLACK_BOT_TOKEN || !process.env.SLACK_SIGNING_SECRET) {
  logger.error('Missing SLACK_BOT_TOKEN or SLACK_SIGNING_SECRET in environment. See .env.example');
  process.exit(1);
}

// Initialize Slack App
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  port: port
});

// Middleware for logging all requests
app.middleware(async ({ logger: _logger }) => {
  logger.debug('Processing request');
});

// Error handler middleware
app.error(async (error) => {
  logger.error('Slack app error:', error);
});

// Initialize handlers
const commandHandler = new CommandHandler(app, app.client);
const messageHandler = new MessageHandler(app, app.client);

// Register handlers
commandHandler.register();
messageHandler.register();

// Global error handler
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', reason);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
});

// Start the app
(async () => {
  try {
    await app.start(port);
    logger.info(`⚡️ Slack Bolt app running on port ${port}`);
    logger.info('✅ All handlers registered successfully');
    
    // Log startup activity
    await Database.logActivity(
      `startup-${Date.now()}`,
      'bot_started',
      { timestamp: new Date().toISOString(), port }
    );
  } catch (error) {
    logger.error('Failed to start app:', error);
    process.exit(1);
  }
})();
