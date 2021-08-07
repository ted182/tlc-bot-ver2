const log = require('../auxiliares/log');

module.exports = {
    name: 'ping',
    aliases: ['p'],
    category: 'Informações',
    description: 'Responde com pong :D',
    guildOnly: false,
    testOnly: false,
    
    // Invoked when the command is actually ran
    callback: ({ message }) => {
        log('CMD',null,message,'Ping');
        message.reply("Pong!")
    }
}