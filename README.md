# Discord Bio Checker Bot

A Discord bot that allows users to claim a role based on their profile bio from an external API. This bot is built using `discord.js` and can register slash commands dynamically.

## Table of Contents

1. [Example resposne from api](#response)
1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Commands](#commands)
   - [/claim](#claim)
6. [Running the Bot](#running-the-bot)
7. [Troubleshooting](#troubleshooting)
8. [License](#license)

# Response

```json
{
    "user": {
        "id": "853620650592567304",
        "username": "n0step_",
        "global_name": "n0step_",
        "avatar": "1fa5daa2aaa94a01b3a656d178122e3c",
        "avatar_decoration_data": null,
        "discriminator": "0",
        "public_flags": 4194432,
        "clan": null,
        "flags": 4194432,
        "banner": "5c032816e29310bea0f5c36c0a2e5cae",
        "banner_color": "#4e97d6",
        "accent_color": 5150678,
        "bio": "₪ Portfolio : https://n0step.xyz\nMy active hours:\n<t:1607229000:t> - <t:1607297400:t>"
    },
    "user_profile": {
        "bio": "₪ Portfolio : https://n0step.xyz\nMy active hours:\n<t:1607229000:t> - <t:1607297400:t>",
        "accent_color": 5150678,
        "pronouns": "",
        "profile_effect": null,
        "banner": "5c032816e29310bea0f5c36c0a2e5cae",
        "theme_colors": [
            13808754,
            4220852
        ],
        "popout_animation_particle_type": null,
        "emoji": null
    },
    "legacy_username": "Dornox#5595",
    "connected_accounts": [
        {
            "type": "domain",
            "id": "n0step.xyz",
            "name": "n0step.xyz",
            "verified": true
        },
        {
            "type": "github",
            "id": "69315835",
            "name": "krushna06",
            "verified": true
        },
        {
            "type": "spotify",
            "id": "31ytgiefk474kvsgeamlsa4wog54",
            "name": "Krushna",
            "verified": true
        },
        {
            "type": "steam",
            "id": "76561199548810322",
            "name": "Dornox06",
            "verified": true,
            "metadata": {
                "created_at": "2023-09-04T16:56:00",
                "game_count": "4",
                "item_count_dota2": "-1",
                "item_count_tf2": "2"
            }
        }
    ],
    "premium_since": "2024-05-20T07:08:28.382821+00:00",
    "premium_type": 2,
    "premium_guild_since": "2024-02-26T12:44:21.333000+00:00",
    "cached": true
}
```

## Features

- Responds to the `/claim` slash command.
- Fetches user profile data from an external API.
- Grants a role if the user’s bio contains a specific string.

## Prerequisites

- Node.js (v16.6.0 or later)
- A Discord bot token
- Access to a Discord server where you can add the bot
- An external API that provides user profile data

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/krushna06/Discord-Bio-Checker
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Configuration

1. **Create a `.env` file in the root directory with the following content:**

   ```env
   DISCORD_TOKEN=YOUR_BOT_TOKEN_HERE
   API_URL=http://179.61.181.108:8787/profile
   ROLE_ID=YOUR_ROLE_ID_HERE
   CLIENT_ID=YOUR_CLIENT_ID_HERE
   GUILD_ID=YOUR_GUILD_ID_HERE
   ```

   Replace the placeholders with your bot token, role ID, client ID, and guild ID.

2. **Deploy Commands:**

   Commands are registered automatically when the bot starts. Ensure that you have the correct `CLIENT_ID` and `GUILD_ID` in the `.env` file.

## Commands

### `/claim`

**Description:** Claims a role based on the user's bio.

**How it works:**

1. When a user runs the `/claim` command, the bot fetches the user's profile data from the external API (`http://localhost:3000/profile/{user_id}`).

2. The bot checks if the user's bio contains the string `n0step.xyz`.

3. If the bio contains the string, the bot assigns a predefined role (specified by `ROLE_ID`) to the user.

4. The bot responds with a confirmation message if the role is successfully assigned, or an error message if the bio does not contain the required string or if any issues occur.

## Running the Bot

1. **Start the bot:**

   ```bash
   node index.js
   ```

2. **Verify the bot is running:** The bot should log in and display a message indicating it is ready.

## Troubleshooting

- **Error: `TypeError: Cannot read properties of undefined (reading 'FLAGS')`**
  
  Ensure you are using `discord.js` v14 or later. Update the package if necessary:

  ```bash
  npm install discord.js@latest
  ```

- **Command registration issues**

  Ensure that `CLIENT_ID` and `GUILD_ID` are correctly set in the `.env` file and that the bot has the necessary permissions in the Discord server.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.