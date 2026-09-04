require('dotenv').config()

const { Client, GatewayIntentBits } = require('discord.js')

const token = process.env.TOKEN || process.env.DISCORD_TOKEN

if (!token) {
  console.error('Missing TOKEN or DISCORD_TOKEN environment variable.')
  process.exit(1)
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})

client.once('ready', () => {
  console.log(`✅ Bot online sebagai ${client.user.tag}`)

  const statuses = ['OWN BY ZYR 👑']
  let i = 0

  client.user.setPresence({
    activities: [{ name: statuses[0], type: 4 }],
    status: 'online'
  })

  setInterval(() => {
    client.user.setPresence({
      activities: [{ name: statuses[i], type: 4 }],
      status: 'online'
    })

    i = (i + 1) % statuses.length
  }, 10000)
})

client.on('error', (error) => {
  console.error('Discord client error:', error)
})

client.on('shardDisconnect', (event, shardId) => {
  console.warn(`Shard ${shardId} disconnected`, event)
})

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error)
})

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error)
  process.exit(1)
})

process.on('SIGINT', async () => {
  console.log('Stopping bot...')
  await client.destroy()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down bot...')
  await client.destroy()
  process.exit(0)
})

client.login(token).catch((error) => {
  console.error('Failed to login to Discord:', error)
  process.exit(1)
})