const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { ROLE_ID, API_URL } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('claim')
        .setDescription('Claim a role based on your bio'),
    async execute(interaction) {
        const userId = interaction.user.id;
        const url = `${API_URL}/${userId}`;
        
        try {
            const response = await axios.get(url);
            const bio = response.data.user_profile.bio;

            if (bio.includes('n0step.xyz')) {
                const role = interaction.guild.roles.cache.get(ROLE_ID);
                if (role) {
                    await interaction.member.roles.add(role);
                    await interaction.reply({ content: 'Role claimed!', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'Role not found!', ephemeral: true });
                }
            } else {
                await interaction.reply({ content: 'Bio does not contain the required link.', ephemeral: true });
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'An error occurred while processing your request.', ephemeral: true });
        }
    },
};
