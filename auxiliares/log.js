const colorLog = require('chalk');

// acrescentar 0 quando o número for < 10
function formatarValor(valor) {
    return valor.toString().padStart(2, '0');
}

function logData(tipo,texto,message=null,comando=null) {
    
    const data = new Date(); 
    let stringComando;
    let stringTipo;
    let DM = 'DM';

    if (comando) {
        stringComando = colorLog.underline(comando);
    }

    if (message){
        if(message.guild !== null) {
            DM = message.guild.name;
        };
    }      
 
    const stringData = `[`+
        `${formatarValor(data.getDate())}` +
        `/` +
        `${formatarValor(data.getMonth()+1)}` +
        `/` +
        `${data.getFullYear()}` + 
        `]*[`+
        `${formatarValor(data.getHours())}` +
        `:` +
        `${formatarValor(data.getMinutes())}` +
        `]`        
    
    if (tipo == 'CMD'){
        stringTipo = colorLog.black.bgGrey(' CMD ');
        console.log(`${stringTipo}${stringData} comando ${stringComando} por ${message.author.username} (id: ${message.author.id}) (canal: ${DM})`);
    }
    else if (tipo == 'ERR'){
        stringTipo = colorLog.bgRed(' ERR ');
        console.log(`${stringTipo}${stringData} ${texto}`);
    }
    else{
        stringTipo = colorLog.black.bgGreen(' LOG ');
        console.log(`${stringTipo}${stringData} ${texto}`);
    }

}

//logData('teste de msg...')
//logData('teste de msg...','CMD')
//logData('teste de msg...','AAA')
//logData('teste de msg...','ERR')

module.exports = logData