const express = require('express');
const db = require('../auxiliares/db');
const app = express();


app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    
    const dados = await db.selectLastKills();
    //console.log(dados);
    res.render(__dirname + '/views/index.ejs', {dados});

});

function keepAlive() {

  app.listen(80, () => {
    console.log("Web Server online!");
  });

};

module.exports = keepAlive;