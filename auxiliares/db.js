//const dotenv = require('dotenv').config({ path: '../.env' });
const log = require('./log');
const mysql = require('mysql2/promise');

async function connect(){
    // checar se ja existe uma conexão aberta para evitar abrir outra conexão
    /*
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
    */
    const conn = await mysql.createConnection({
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,        
        password: process.env.DB_PASS        
    });
    //log('Conectou no MySQL!');
    //global.connection = conn;
    return conn;

}

//connect(); //testar a conexão com o banco

async function selectLastKills(quantidade_itens=10){    
    try {
        const conn = await connect();
        const [rows] = await conn.query(`SELECT date_time, attacker_name, victim_name, location_name FROM pvp_ranking ORDER BY id DESC LIMIT ${quantidade_itens}`);
        //console.log(rows);
        conn.end();
        //global.connection.state = 'disconnected'
        return rows;
    } catch (e) {
        //console.log('caught exception!', e);
        log('ERR','[Erro 01] problema na conexão com o banco!');
        return null;
    }
}

async function online(){    
    try {
        const conn = await connect();
        const [rows] = await conn.query(`SELECT playersonline FROM playersonline`);
        conn.end();
        return rows;
    } catch (e) {
        log('ERR','[Erro 02] problema na conexão com o banco!');
        return null;
    }
}

// função que vai checar se um novo aviso foi postado na tabela SQL de anuncios
async function checaNovaLinha(){    
    const tabela = 'eventos_avisos'
    try {
        const conn = await connect();
        const [rows] = await conn.query(`SELECT anuncio, foipublicado FROM ${tabela} ORDER BY id DESC`);
        conn.end();
        return rows;
    } catch (e) {
        log('ERR','[Erro 03] problema na conexão com o banco!');
        return null;
    }
}

// função marca na tabela SQl que um aviso já foi anunciado no discord
async function finalizaAnuncio(){    
    const tabela = 'eventos_avisos';
    try {
        const conn = await connect();
        await conn.query(`UPDATE ${tabela} SET foipublicado = 1 WHERE id = (SELECT MAX(id) FROM ${tabela})`);
        conn.end();
        return true;
    } catch (e) {
        log('ERR','[Erro 04] problema na conexão com o banco!');
        return null;
    }
}

// função que retorna a pesquisa na tabela de itens craftaveis
async function getCraft(args){    
    const tabela = 'craftitens';
    try {
        const conn = await connect();
        const [rows] = await conn.query(`SELECT * FROM ${tabela} WHERE skill = '${args[0].toUpperCase()}' ORDER BY ordem`);
        conn.end();
        return rows;
    } catch (e) {
        log('ERR','[Erro 05] problema craftitens');
        return null;
    }
}

module.exports = {selectLastKills, online, checaNovaLinha, finalizaAnuncio, getCraft}