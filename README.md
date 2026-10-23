# Steam Library Exporter

Export your Steam library to a JSON file with each game's name, Steam app ID, and hours played. Games are sorted alphabetically, and hours are rounded to one decimal place.

## Prerequisites

- Node.js 22 or later
- A Steam Web API key
- Your 64-bit Steam ID

Check that Node.js and npm are available:

```sh
node --version
npm --version
```

### Steam credentials

Sign in to the [Steam Web API key page](https://steamcommunity.com/dev/apikey) to obtain your API key. Keep this key private.

Use your numeric 64-bit Steam ID for `STEAM_ID`. A display name or custom profile URL will not work. If your profile URL has the form `https://steamcommunity.com/profiles/7656...`, use the number after `/profiles/`.

The account's game details must be visible to the API. If Steam does not return your library, review your profile's privacy settings.

## Setup

1. Clone or download this repository and open a terminal in its folder.
2. Copy `.env.example` to `.env`:

   ```powershell
   Copy-Item .env.example .env
   ```

   On macOS or Linux, use `cp .env.example .env`.

3. Replace the placeholders in `.env` with your Steam Web API key and 64-bit Steam ID.

   ```dotenv
   STEAM_API_KEY=your_steam_web_api_key
   STEAM_ID=your_64_bit_steam_id
   ```

4. Run:

   ```sh
   npm start
   ```

There are no dependencies to install. Keep your API key private. The `.env` file and generated export are excluded from Git.

## How it works

1. `npm start` loads the values from `.env` and runs `index.js`.
2. The script requests the account's games through Steam's [GetOwnedGames API](https://partner.steamgames.com/doc/webapi/IPlayerService#GetOwnedGames), asking for game information and played free games.
3. It keeps each game's name, app ID, and lifetime playtime, converting minutes to hours rounded to one decimal place.
4. It sorts the games by name and saves the result to `steam-library.json`.

Each run fetches a fresh snapshot. It does not run in the background or update the export automatically.

## Output

The utility writes `steam-library.json` in the current directory, replacing any previous export:

```json
[
  {
    "name": "Example Game",
    "appId": 12345,
    "hoursPlayed": 12.5
  }
]
```

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Node.js or npm is not recognized | Install Node.js 22 or later, then reopen your terminal. |
| `.env` cannot be found | Copy `.env.example` to `.env` and run the command from the project folder. |
| `Set STEAM_API_KEY and STEAM_ID in your .env file.` | Fill in both values in `.env`. |
| `Steam API error: ...` | Check your API key. The number in the message is Steam's HTTP response status. |
| `No games returned. Check your Steam privacy settings.` | Check the numeric Steam ID and the account's game-details privacy setting. This also occurs when Steam omits the game list. |
| A network or fetch error | Check your internet connection and try again. |
