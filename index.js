require('dotenv').config()
const { Client, GatewayIntentBits } = require('discord.js')
const axios = require('axios')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})

client.once('ready', async () => {

  console.log(`✅ Bot online sebagai ${client.user.tag}`)

  const statuses = ["OWN BY ZYR 👑"]

  let i = 0

  setInterval(() => {

    client.user.setPresence({
      activities: [{ name: statuses[i], type: 4 }],
      status: "online"
    })

    i = (i + 1) % statuses.length

  }, 10000)

})

client.login(process.env.TOKEN)