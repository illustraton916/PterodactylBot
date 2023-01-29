import { SlashCommandBuilder } from "discord.js";

 const Ping = () => {
  return {
    data: new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Replies with Pong!"),
    execute: (interaction) => {
      interaction.reply("Pong!!");
    },
  };
};

export default Ping;
