import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";

export const registerCommands = async () => {
  const clientId = process.env.CLIENT_ID;
  const guildId = process.env.GUILD_ID;
  const token = process.env.TOKEN;

  const commands = [];
  const commandFiles = fs
    .readdirSync(path.join("./commands"))
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const { default: data } = await import(`./commands/${file}`);
    commands.push(data());
  }

  const rest = new REST({ version: "10" }).setToken(token);

  (async () => {
    try {
      console.log("Started refreshing application (/) commands.");

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commands.map((command) => command.data.toJSON()),
      });

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  })();

  return commands;
};
