const db = require('../auxiliares/db');
const log = require('../auxiliares/log');
const Discord = require("discord.js");
const {table} = require('table');


function muitosCaracteres(message){

    const embed = new Discord.MessageEmbed()
    .setTitle(":speech_balloon: **Crafting Itens**")
    //.setURL("https://tlcshard.com.br")
    //.setThumbnail(img_check)
    .setColor(3734872)
    .setDescription(`:arrow_right: Sua pesquisa retornou + de 2000 caracteres.\n:arrow_right: Utilize nossa [BASE DE DADOS](https://tlcshard.com.br/tabeladinamica)`)
    .setFooter(`solicitado por: ${message.author.username}`, 'http://tlcshard.com.br/img-bot-discord/bell.png')
    .setTimestamp();	
    message.channel.send({ embed: embed })
};

async function printaTabela(message, result, i=0, argumento=0, filtro=false){
    
    let tabelaData = [];
    let paginas = [];
    tabelaData[0] = ['ITEM','REQUERIMENTO','RECURSO'];
    let j = 0;
    let k = 0;
    let output;
    let resultado;  
  
    if (filtro) {
        let resultadoFiltrado = result.filter(g => {              
            if (g.item.toLowerCase().includes(argumento.toLowerCase())){
                return true;
            }else {
                return false;
            }     
        });
        if (resultadoFiltrado.length === 0) {
            message.reply(`item não encontrado...`);
            return;
        }
        resultado = resultadoFiltrado;
    }else{
        resultado = result;
    };  
  
    for (i; i < resultado.length; i++) {        
        tabelaData[j+1] = [resultado[i].item, resultado[i].requerimentos.split(',').map(g => g.trim()).join("\n"), resultado[i].recursos.split(',').map(g => g.trim()).join("\n")];
        output = table(tabelaData);
        //console.log(output);
        j++;
        //if (output.length > 1500) break; //o discord tem uma limitação de 2000 caracteres nas msgs :(
        if (output.length > 1500) {           
            /*
            paginas[k] = output;
            k++;
            j = -1;
            tabelaData = [];
            */
            return muitosCaracteres(message);
        };
    };

    paginas[k] = output; // joga o ultimo output, caso ele n atinja os caracteres maximos
    paginas.forEach(async (item, index) => {
        let msg = await message.channel.send(`\`\`\`${item}\`\`\``);
    });
  
};



module.exports = {
    name: 'crafting',
    aliases: ['c','craft'],
    category: 'Informações',
    description: 'Retorna uma pesquisa dos itens craftaveis.',
    guildOnly: false,
    testOnly: false,
    
    callback: async ({ message, args }) => {
        
        log('CMD',null,message,'Crafting');
        const dados = await db.getCraft(args); 

        if (dados[0] !== undefined){            
            if (args[1] === undefined){
                //mostrar todos os dados da tabela registrados pra skill digitada (caso n tenha digitado o item)            
                printaTabela(message,dados); 
            }else{            
                //juntar os argumentos digitados
                let pesquisa = args.map((el, index) => {
                    if (el !== undefined && index !== 0) return el;
                }).join(' ').trim(); 
                //console.log(pesquisa);
                //mostrar os resultados filtrados do argumento capturado
                //printaTabela(message,result,0,args[1],true);
                printaTabela(message,dados,0,pesquisa,true);
            }; 
        }else{
            //message.channel.send(`Não encontrei essa skill ${args[0].toUpperCase()} na base de dados...`);
            message.reply(`Não encontrei essa skill \`${args[0].toUpperCase()}\` na base de dados...\nAs skills existentes são: \`ALCHEMY\`-\`BLACKSMITHING\`-\`BOWCRAFT\`-\`CARPENTRY\`-\`TINKERING\`-\`COOKING\`-\`TAILORING\`.`);
            return;
        };

    }
       
};