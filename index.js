// importar librerias
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const lodash = require('lodash');
const chalk = require('chalk');
const axios = require("axios");

// crear servidor
const app = express();
const PORT = process.env.PORT || 3005;
// API y cantidad de resultados
const myApi = 'https://randomuser.me/api/?results=9';

app.get('/', (req, res) => {

    // llamado a la API
    axios.get(myApi)
        .then((data) => {
            let myDates = "";
            // obtención de resultados
            const myFind = data.data.results;
            lodash.forEach(myFind, (content, index) => {
                let myPacient = `${index + 1}. ${myDB(content)}`;
                //defino colores
                console.log(chalk.blue.bgWhiteBright(myPacient));
                // estructura
                myDates += myPacient + "\n";
            })
            res.status = 200;
            // envio info
            res.setHeader('Content-Type', 'text/plain')
            res.send(myDates)
            res.end();
        })
    
        //posible error
        .catch((e) => {
            console.log(e);
        });
});

app.listen(PORT, () => {
    // puerto a la escucha y mensaje
    console.log(`Escuchando el servidor en http://localhost:${PORT}`);
});

//formato salida
function myDB(content) {
    //ID 6 digitos
    const idUnique = uuidv4().slice(30);
    //formato fecha y hora
    const timeStamp = moment().format("MMM Do YY, h:mm a");
    return `ID: ${idUnique} | Timestamp: ${timeStamp} | Paciente: ${content.name.title} ${content.name.first} ${content.name.last}`;
}

//fin//





