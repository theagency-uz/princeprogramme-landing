module.exports = {
  apps: [
    {
      name: "prince-programme",
      script: "./server.js",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      watch: false,
      autorestart: true,
      max_memory_restart: "280M",
      node_args: "--max-old-space-size=192",
      exp_backoff_restart_delay: 100,
      kill_timeout: 5000,
      listen_timeout: 10000,
      time: true,
      env: {
        NODE_ENV: "production",
        HOSTNAME: "127.0.0.1",
        PORT: "3000",
        TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
        TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
        ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN
      }
    }
  ]
};
