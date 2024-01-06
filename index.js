const fs = require('fs')
const path = require('path')

const { Client, Collection, Events, GatewayIntentBits } = require('discord.js')
const dotenv = require('dotenv')

dotenv.config()

const TOKEN = process.env.TOKEN

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.commands = new Collection()

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})

client.login(TOKEN)
