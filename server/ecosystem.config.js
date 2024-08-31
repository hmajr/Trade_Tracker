module.exports = {
  apps : [{
    name: "TradeTracker",
    script: "./src/server.ts",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}