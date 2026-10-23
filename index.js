
import fs from "node:fs/promises";

const apiKey = process.env.STEAM_API_KEY;
const steamId = process.env.STEAM_ID;

if (!apiKey || !steamId) {
  throw new Error("Set STEAM_API_KEY and STEAM_ID in your .env file.");
}

const url = new URL(
  "https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/",
);

url.searchParams.set("key", apiKey);
url.searchParams.set("steamid", steamId);
url.searchParams.set("include_appinfo", "true");
url.searchParams.set("include_played_free_games", "true");

console.log("Fetching Steam library...");

const response = await fetch(url);

if (!response.ok) {
  throw new Error(`Steam API error: ${response.status}`);
}

const data = await response.json();

if (!Array.isArray(data.response?.games)) {
  throw new Error("No games returned. Check your Steam privacy settings.");
}

const games = data.response.games.map((game) => ({
  name: game.name,
  appId: game.appid,
  hoursPlayed: Number((game.playtime_forever / 60).toFixed(1)),
}));

games.sort((a, b) => a.name.localeCompare(b.name));

await fs.writeFile(
  "steam-library.json",
  JSON.stringify(games, null, 2),
  "utf8",
);

console.log(`Success! Exported ${games.length} games.`);
