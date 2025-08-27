// ficheiro principal do backend 

import cron from "node-cron"; // criação server express
import fs from 'fs'; // permite manipular ficheiros
import express from "express";
import data from './data.json' with { type: 'json' }; 
import { ListCrons, CreateCron } from "./cronActions.js";

const app = express();

// função para mostrar a hora atual
export function Time() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
}

// função para mostrar dia atual
export function Day() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
}


// função para criação individual endpoints
function IndividualEndpoint (uri, httpMethod, schedule, body) {
  const index = data.findIndex(cron => cron.uri === uri);
  /*if (index !== -1 || !uri) {
    console.log(`Thar uri is already in use or invalid: /${uri}`);
    return;
  } */

  app[httpMethod.toLowerCase()](`/${uri}`, (req, res) => {
    res.status(200).send
    (    
      (`New Cron Created: URI: /${uri} Method: ${httpMethod} Schedule: ${schedule} Body: ${body}`)
    ); 
    
    // adiciona o novo cron a data.json
    data.push({uri: uri, httpMethod: httpMethod, schedule: schedule, body: body });
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

    CreateCron(schedule, body);
  });
}


// função para iniciar o server
function StartServer(port) {
  app.listen(port, () => {
    console.log(`app on http://localhost:${port}`);
  }
  );

  // cria todos os endpoints presentes em data.js
  data.forEach(cron => {
    IndividualEndpoint(cron.uri, cron.httpMethod, cron.schedule, cron.body);
  });
}

StartServer(8080);





