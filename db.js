const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'bot_data.db');
const db = new sqlite3.Database(dbPath);

// Initialize database
db.serialize(() => {
  // User interactions table
  db.run(`CREATE TABLE IF NOT EXISTS interactions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    user_name TEXT,
    command TEXT,
    message TEXT,
    channel_id TEXT,
    response TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // User profiles table
  db.run(`CREATE TABLE IF NOT EXISTS user_profiles (
    user_id TEXT PRIMARY KEY,
    user_name TEXT,
    interaction_count INTEGER DEFAULT 0,
    last_interaction DATETIME,
    preferences TEXT
  )`);

  // Bot activity log table
  db.run(`CREATE TABLE IF NOT EXISTS activity_log (
    id TEXT PRIMARY KEY,
    event_type TEXT,
    details TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

const Database = {
  // Log an interaction
  logInteraction: (interactionData) => {
    return new Promise((resolve, reject) => {
      const { id, user_id, user_name, command, message, channel_id, response } = interactionData;
      db.run(
        `INSERT INTO interactions (id, user_id, user_name, command, message, channel_id, response)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, user_id, user_name, command, message, channel_id, response],
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  },

  // Get user interaction history
  getUserHistory: (userId, limit = 10) => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM interactions WHERE user_id = ? ORDER BY timestamp DESC LIMIT ?`,
        [userId, limit],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows || []);
        }
      );
    });
  },

  // Update or create user profile
  updateUserProfile: (userId, userName, preferences) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT OR REPLACE INTO user_profiles (user_id, user_name, last_interaction, preferences)
         VALUES (?, ?, CURRENT_TIMESTAMP, ?)`,
        [userId, userName, JSON.stringify(preferences)],
        function(err) {
          if (err) reject(err);
          else resolve(true);
        }
      );
    });
  },

  // Get user profile
  getUserProfile: (userId) => {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM user_profiles WHERE user_id = ?`,
        [userId],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  },

  // Log activity
  logActivity: (id, eventType, details) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO activity_log (id, event_type, details) VALUES (?, ?, ?)`,
        [id, eventType, JSON.stringify(details)],
        function(err) {
          if (err) reject(err);
          else resolve(true);
        }
      );
    });
  },

  // Get bot statistics
  getStats: () => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT 
          COUNT(DISTINCT user_id) as total_users,
          COUNT(*) as total_interactions,
          COUNT(DISTINCT DATE(timestamp)) as active_days
         FROM interactions`,
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows[0] || {});
        }
      );
    });
  },

  // Increment user interaction count
  incrementUserCount: (userId) => {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE user_profiles SET interaction_count = interaction_count + 1 WHERE user_id = ?`,
        [userId],
        function(err) {
          if (err) reject(err);
          else resolve(true);
        }
      );
    });
  }
};

module.exports = Database;
