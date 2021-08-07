const db = require('../auxiliares/db');
const log = require('../auxiliares/log');
const Discord = require("discord.js");

module.exports = {
    name: 'online',
    aliases: ['online','on'],
    category: 'Informações',
    description: 'Retorna o número de players online no servidor.',
    guildOnly: false,
    testOnly: false,
    
    callback: async ({ message }) => {
        log('CMD',null,message,'Online')
        const dados = await db.online();        
        let online;
        let img_check;

        if (dados){
            online = dados[0].playersonline;	
            img_check = 'http://tlcshard.com.br/img-bot-discord/web-check(green).png';
        }else{
            online = 'sem conexão';	
            img_check = 'http://tlcshard.com.br/img-bot-discord/web-check(red).png';
        }

        const embed = new Discord.MessageEmbed()
            .setTitle(":speech_balloon: **Players Online**")
            .setURL("https://tlcshard.com.br")
            .setThumbnail(img_check)
			//.setAuthor(message.author.username, "https://tlcshard.com.br/img-bot-discord/caveira.png")
			.setColor(3734872)
			.setDescription(`\`\`\`${online}\`\`\``)
            //.setFooter("AstroZombie", "http://tlcshard.com.br/img-bot-discord/sonic-icon-08.png")
            .setFooter(`solicitado por: ${message.author.username}`, 'http://tlcshard.com.br/img-bot-discord/bell.png')
			.setTimestamp()			
			//.addBlankField(false)//linha em branco
			//.addField(":space_invader: DISCORD", `${ping_discord}ms`, false)
	
        message.channel.send({ embed: embed })        

    }
}