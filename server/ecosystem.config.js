module.exports = {
  apps : [{
    name: 'TradeTracker', // Replace with your app name
    script: './src/server.ts', // Adjust if your main entry point is different
    instances: 1, // Adjust based on your needs
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};