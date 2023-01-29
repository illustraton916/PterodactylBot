import axios from "axios";
import { SlashCommandBuilder } from "discord.js";

const ServerList = () => {
  return {
    data: new SlashCommandBuilder()
      .setName("slist")
      .setDescription("Shows a list of servers"),
    execute: async (interaction) => {
      const url = process.env.PTERODACTYL_URL;
      const api = process.env.PTERODACTYL_API;
      try {
        const auth = { headers: { Authorization: `Bearer ${api}` } };
        const response = await axios.get(
          `${url}/api/application/servers`,
          auth
        );

        const servers = response.data.data.map((server) => server.attributes);

        let serverList = "Server List: \n";
        servers.forEach((server) => {
          serverList += `- ${server.name} (${server.id}) \n`;
        });
        interaction.reply(serverList);
      } catch (error) {
        interaction.reply(`Error: ${error}`);
      }
    },
  };
};

export default ServerList;
