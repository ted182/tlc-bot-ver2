const db = require('../auxiliares/db');
const log = require('../auxiliares/log');

async function checaAvisos(client){
    
    //log('LOG',`checando avisos...`);
    //const channelID = '711936856010522706'; //canal geral do ASTRO BOT TESTE
    const channelID = '825733983387910184'; //canal de avisos TLC
    //const channel = client.channels.find(ch => ch.id === channelID)
    const channel = await client.channels.fetch(channelID);
    //console.log(channel);
    try{
        const aviso = await db.checaNovaLinha() //retorna a msg presente na tabela SQL de avisos
        if (aviso[0].foipublicado == null || aviso[0].foipublicado == 0){
            //console.log('Anúncio publicado: ', aviso[0].anuncio);
            log('LOG',`Anúncio publicado: ${aviso[0].anuncio}`);
            channel.send('@everyone ' + aviso[0].anuncio);
            db.finalizaAnuncio();
        }      
    }catch(err){
        //console.log(err);
        log('ERR','[Erro 05] problema na função de checagem de avisos.');
    }

}

module.exports = async (client, instance) => {
    
    setInterval(checaAvisos, 60*1000, client); //repete checagem a cada 60 segundos

}
    

