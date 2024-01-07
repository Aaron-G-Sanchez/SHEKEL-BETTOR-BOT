const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shekelcount')
    .setDescription('Replies with users shekel count'),

  async execute(interaction) {
    console.log(interaction)
    await interaction.reply({ content: 'Shekel cound: 100', ephemeral: true })
  }
}
