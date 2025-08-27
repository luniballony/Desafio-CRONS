// ficheiro principal do backend 

import cron from "node-cron"; // criação server express
import fs from 'fs'; // permite manipular ficheiros
import express from "express";
import data from './data.json' with { type: 'json' }; 
import { ListCrons, CreateCron } from "./cronActions.js";
import { create } from "domain";

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
export function EndpointCreator (uri, httpMethod, body, schedule) {
  app[httpMethod.toLowerCase()](`/${uri}`, (req, res) => {
    res.status(200).send
    (    
      (`Cron ativated with body: ${body}`)
    ); 
  
    cron.schedule(schedule, () => {        
      console.log(`${Day()} ${Time()} - ${body}`);
    });
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
    EndpointCreator(cron.uri, cron.httpMethod, cron.body, cron.schedule);
  });
}

StartServer(8080);





