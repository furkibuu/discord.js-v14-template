const { REST, Routes, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { Logger } = require("aiko.logger");

const logger = new Logger({
    saveToFile: true   
});

async function loadCommands(client) {

    client.commands = new Collection(); 
    
    const commandsArray = []; 
    
    const commandsPath = path.join(__dirname, '../commands');

    try {

        const commandFolders = fs.readdirSync(commandsPath);

        for (const folder of commandFolders) {
            const folderPath = path.join(commandsPath, folder);
            
            if (fs.statSync(folderPath).isDirectory()) {
                const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

                for (const file of commandFiles) {
                    const filePath = path.join(folderPath, file);
                    const command = require(filePath);

                    if ('data' in command && 'execute' in command) {
                        client.commands.set(command.data.name, command);
                        commandsArray.push(command.data.toJSON());
                    } else {
                        logger.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                    }
                }
            }
        }

        logger.info(`⏳ Loading ${commandsArray.length} slash commands to the Discord API...`);

        const rest = new REST({ version: '10' }).setToken(process.env.Token)

        const data = await rest.put(
            Routes.applicationCommands(process.env.App_ID), 
            { body: commandsArray },
        );

        logger.info(`✅ Successfully loaded ${data.length} slash commands!`);

    } catch (error) {
        logger.error('❌ Error while loading slash commands:');
        logger.error(error);
    }
}

module.exports = { loadCommands };