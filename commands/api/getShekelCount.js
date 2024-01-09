const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shekelcount')
    .setDescription('Replies with users shekel count'),

  async execute(interaction) {
    const userId = interaction.user.id
    const username = interaction.user.username

    const response = await axios.get(
      `http://localhost:3001/users/${userId}/${username}`
    )

    await interaction.reply({
      content: `Shekel count: ${response.data.user.shekelCount}`,
      ephemeral: true
    })
  }
}
