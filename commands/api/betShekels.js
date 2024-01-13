const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('give')
    .setDescription('Give another user some hard deserved shekels')
    .addNumberOption((option) =>
      option
        .setName('bet')
        .setDescription('The bet amount you wish to give')
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user you wish to give your shekels')
        .setRequired(true)
    ),

  async execute(interaction) {
    const userId = interaction.user.id
    const userName = interaction.user.username

    const bet = interaction.options.getNumber('bet')
    const betWinner = interaction.options.getUser('user')

    try {
      const response = await axios.put(
        `http://localhost:3001/users/${userId}/${userName}`,
        {
          bet,
          winner: {
            userId: betWinner.id,
            userName: betWinner.username
          }
        }
      )

      await interaction.reply({
        content: `${response.data.message[0].userName} just donated ${bet} shekel[s] to ${response.data.message[1].userName}!`
      })

      await interaction.followUp({
        content: `Your shekel count is ${response.data.message[0].shekelCount}`,
        ephemeral: true
      })
    } catch (err) {
      await interaction.reply({
        content: err.response.data.message,
        ephemeral: true
      })
    }
  }
}
