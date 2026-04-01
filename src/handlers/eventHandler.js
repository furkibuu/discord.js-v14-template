const fs = require('fs');
const path = require('path');
const {Logger} = require("aiko.logger");
const logger = new Logger({
    saveToFile: true
});
function Events(client) {
    const eventsPath = path.join(__dirname, '../events');

    try {

        const eventFolders = fs.readdirSync(eventsPath);

        for (const folder of eventFolders) {
            const folderPath = path.join(eventsPath, folder);
            
            if (fs.statSync(folderPath).isDirectory()) {
                const eventFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

                for (const file of eventFiles) {
                    const event = require(path.join(folderPath, file));
                    if (event.once) {
                        client.once(event.name, (...args) => event.execute(...args, client));
                    } else {
                        client.on(event.name, (...args) => event.execute(...args, client));
                    }
                }
            }
        }
        logger.info('✅ Event handlers loaded successfully!');
    } catch (error) {
        logger.error('❌ Error loading event handlers:', error);
    }
}

module.exports = { Events };