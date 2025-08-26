import cron from "node-cron";
// criação server express
import express from "express";
import { data } from "./data.js";
import { ListCrons, CronJob } from "./cronActions.js";

const app = express();
const port = 8080;

// função para mostrar a hora atual
function Time() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
}

// função para mostrar dia atual
function Day() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
}


// função para criação individual endpoints
function IndividualEndpoint (uri, httpMethod, schedule, body) {
  app[httpMethod.toLowerCase()](`/${uri}`, (req, res) => {
    res.status(200).send
    (`CRON created! Check your console.\n 
      Body: ${body}
    `); 
    
    CronJob(schedule, body);
  });
}


// função para iniciar o server
function StartServer(uri) {
  app.listen(uri, () => {
    console.log(`app on http://localhost:${port}`);
  }
  );

  // cria todos os endpoints presentes em data.js
  data.forEach(cron => {
    IndividualEndpoint(cron.uri, cron.httpMethod, cron.schedule, cron.body);
  });
}

//StartServer(8080);





