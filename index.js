require('dotenv').config()

const { Client, GatewayIntentBits } = require('discord.js')

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
})

client.once('ready', () => {
  console.log(`Bot online sebagai ${client.user.tag}`)
})

const statuses = [
  "AI Assistant 🤖",
  "Helping users 💬",
  "Running dashboard 📊",
  "Online 24/7 ⚡"
]

let i = 0

setInterval(() => {
  client.user.setPresence({
    activities: [{ name: statuses[i], type: 2 }],
    status: "online"
  })

  i = (i + 1) % statuses.length
}, 10000)

client.login(process.env.TOKEN)