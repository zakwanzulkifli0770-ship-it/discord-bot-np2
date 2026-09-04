module.exports = {
  apps: [
    {
      name: 'discord-bot-np2',
      script: 'index.js',
      instances: 1,
      autorestart: true,
      restart_delay: 5000,
      exp_backoff_restart_delay: 100,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
