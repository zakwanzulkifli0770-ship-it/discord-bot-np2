require('dotenv').config()
const { Client, GatewayIntentBits } = require('discord.js')

const botClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})

module.exports = async function handler(req, res) {
  try {
    const token = process.env.TOKEN

    if (!token) {
      return res.status(500).json({
        ok: false,
        error: 'TOKEN is missing. Add DISCORD_TOKEN or TOKEN in Vercel environment variables.'
      })
    }

    botClient.once('ready', () => {
      console.log(`✅ Bot online sebagai ${botClient.user.tag}`)
    })

    await botClient.login(token)

    const message = botClient.user
      ? `Discord bot started as ${botClient.user.tag}`
      : 'Discord bot started successfully'

    res.status(200).json({
      ok: true,
      message,
      note: 'This is Vercel-compatible startup only. A Discord bot needs a persistent process, so Vercel is not a long-term host for this kind of app.'
    })

    setTimeout(() => {
      botClient.destroy()
    }, 1500)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      ok: false,
      error: error.message
    })
  }
}
