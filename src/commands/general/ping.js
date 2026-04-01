const { SlashCommandBuilder, ContainerBuilder, TextDisplayBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Shows bot latency.'),

    async execute(interaction) {
    
        const sent = await interaction.deferReply({ fetchReply: true });
        
        const apiPing = Math.round(interaction.client.ws.ping); 
        const messagePing = sent.createdTimestamp - interaction.createdTimestamp; 

        const container = new ContainerBuilder()
            .setAccentColor(0x5865F2) 
            .addTextDisplayComponents(
                new TextDisplayBuilder()
                    .setContent(`## 🏓 Pong!\n\n📡 **API Latency:** \`${apiPing}ms\`\n💬 **Message Latency:** \`${messagePing}ms\``)
            );

        await interaction.editReply({ 
            components: [container],
            flags: MessageFlags.IsComponentsV2
        });
    }
};