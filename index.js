const { Client, GatewayIntentBits, REST, Routes, Events } = require('discord.js');
const axios = require('axios');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

const TOKEN = '';
const API_URL = '';

client.once(Events.ClientReady, async () => {
    console.log(`Logged in as ${client.user.tag}`);

    const rest = new REST({ version: '10' }).setToken(TOKEN);

    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationCommands(client.user.id), {
            body: [
                {
                    name: 'claim',
                    description: 'Claim a role based on your bio',
                },
            ],
        });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Error registering commands:', error);
    }
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'claim') {
        const userId = interaction.user.id;
        try {
            const response = await axios.get(`${API_URL}${userId}`);
            const bio = response.data.user.bio;

            if (bio.includes('n0step.xyz')) {
                const role = interaction.guild.roles.cache.get('the_role_id');
                if (!role) {
                    await interaction.reply({ content: 'Role not found', ephemeral: true });
                    return;
                }

                await interaction.member.roles.add(role);
                await interaction.reply({ content: 'You have been given the role!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'Your bio does not contain the required text.', ephemeral: true });
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            await interaction.reply({ content: 'An error occurred while fetching your data.', ephemeral: true });
        }
    }
});

client.login(TOKEN);
