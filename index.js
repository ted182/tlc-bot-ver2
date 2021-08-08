const dotenv = require('dotenv').config();
const Discord = require('discord.js');
const keepAlive = require("./webserver/server");

const client = new Discord.Client({
    // Use recommended partials for the built-in help menu
    partials: ['MESSAGE', 'REACTION']
});

//ESTE BOT VAI UTILIZAR O PACOTE WOK COMMANDS
//https://docs.wornoffkeys.com/
//BOT QUE MANTEM O SITE ONLINE NO REPLIT
//https://uptimerobot.com/

const WOK = require('wokcommands');


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    new WOK(client, {
        commandsDir: 'comandos',
        featuresDir: 'features',
        // setando o servidor teste ASTRO BOT TESTE
        testServers: '711936855477583874'
    })
    .setBotOwner('226434974914576384') //astro discord ID
    .setCategorySettings(
    [
        {
            name: 'Development',
            emoji: '🔧',
            hidden: false
        },
        {
            name: 'Informações',
            emoji: '📜',
            hidden: false
        }
    ])
});

keepAlive();
client.login(process.env.TOKEN);