const { Events } = require("discord.js");
const { Logger } = require("aiko.logger");
const logger = new Logger({
    saveToFile: true   
});
module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        client.user.setActivity({name:`Furkibu_ Github furkibuu`, type: 3});
        client.user.setStatus('idle');
        logger.info(`Ready! Logged in as ${client.user.tag}`);
    
     
   
    }
};