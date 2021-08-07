const db = require('../auxiliares/db');
const log = require('../auxiliares/log');
const Discord = require("discord.js");

module.exports = {
    name: 'mortes',
    aliases: ['daun','deitados','mortes'],
    category: 'Informações',
    description: 'Retorna as últimas mortes que ocorreram no servidor.',
    guildOnly: false,
    testOnly: false,
    
    callback: async ({ message }) => {
        log('CMD',null,message,'Mortes');
        const dados = await db.selectLastKills();        
        let string_data;
        let string_atacante;
        let string_vitima;
        let string_local;

        if (dados){
            string_data = dados.map(g => g.date_time.toLocaleTimeString()).join("\n");
            string_atacante = dados.map(g => g.attacker_name).join("\n");
            string_vitima = dados.map(g => g.victim_name).join("\n");
            string_local = dados.map(g => g.location_name).join("\n");
        }else{
            string_data = 'sem conexão';
            string_atacante = 'sem conexão';
            string_vitima = 'sem conexão';
            string_local = 'sem conexão';
        }

        const embed = new Discord.MessageEmbed()
            .setTitle(":speech_balloon: **Últimas Mortes**")
            //.setAuthor(message.author.username, "https://tlcshard.com.br/img-bot-discord/caveira.png")
            .setColor(3734872)
            //.setDescription(`:space_invader: Ping entre Discord => Solicitante\n${espacamento}\n:robot: Ping interno do BOT\n${espacamento}\n:globe_with_meridians: Ping Discord => Shard\n${espacamento}`)
            .setDescription(`:arrow_right: Para ter mais info sobre as mortes [acesse o SITE](https://tlcshard.com.br)`)
            //.setFooter("AstroZombie", "http://tlcshard.com.br/img-bot-discord/sonic-icon-08.png")
            .setFooter(`solicitado por: ${message.author.username}`, 'http://tlcshard.com.br/img-bot-discord/bell.png')
            .setTimestamp()			
            //.addBlankField(false)//linha em branco
            .addField("HORA", `${string_data}`, true)
            .addField("MATADOR", `${string_atacante}`, true)
            .addField("VÍTIMA", `${string_vitima}`, true);

        message.channel.send({ embed: embed });

    }
}