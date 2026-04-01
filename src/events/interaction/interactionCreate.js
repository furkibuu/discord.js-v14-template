const { Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const OWNER_ID =  process.env.Owner_ID || 'YOUR_DISCORD_USER_ID';

const { Logger } = require("aiko.logger");
const logger = new Logger({
    saveToFile: true   
});
module.exports = {
    name: Events.InteractionCreate,
    once: false, 
    
    async execute(interaction) {
      
        interaction.isOwner = (interaction.user.id === OWNER_ID);

        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) return;

          
            if (command.ownerOnly && !interaction.isOwner) {
                return await interaction.reply({ 
                    content: '❌ This command is restricted to the bot owner only.', 
                    ephemeral: true 
                });
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                logger.error(`🚨 Slash command error:\n ${error}`);
                const errorPayload = { content: 'An error occurred while executing this command!', ephemeral: true };
                
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp(errorPayload);
                } else {
                    await interaction.reply(errorPayload);
                }
            }
        } 
        else if (interaction.isButton()) {
            const [action, ...params] = interaction.customId.split(':');

        } 
        else if (interaction.isModalSubmit()) {
            const [action, ...params] = interaction.customId.split(':');
         
        } 
        else {
            logger.warn(`⚠️ Unhandled interaction type: ${interaction.type}`);
        }
    }
};