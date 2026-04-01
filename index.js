require("dotenv").config();
const { createClient } = require("./src/client/createClient")
const { Events } = require("./src/handlers/eventHandler");
const { loadCommands } = require("./src/handlers/commandHandlers");
const { Logger } = require("aiko.logger");
const logger = new Logger({
    saveToFile: true   
});


process.on('unhandledRejection', (reason, promise) => {
    logger.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {

     logger.error('❌ Uncaught Exception:', error);
});


async function startBot() {
    try {
        const client = await createClient();
        logger.info("✅ Client created successfully!");
        await Events(client); 
        logger.info("✅ Event handlers set up successfully!");
       await loadCommands(client);
        logger.info("✅ Command handlers set up successfully!");
  
        await client.login(process.env.Token);
        logger.info("⏳ Bot is logging in...");

    } catch (error) {
        logger.error(`🚨 An error occurred while starting the bot: ${error.message}`);
        logger.error(error.stack);
        logger.error('❌ Bot failed to start due to the above error. Please check the logs for details.');

    }
}

startBot();