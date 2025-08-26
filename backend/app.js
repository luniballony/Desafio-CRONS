import cron from "node-cron";
// criação server express
import express from "express";
const app = express();
const port = 8080;

const temporaryMessage = "This message shows every 2 seconds";
const frequency = "*/2 * * * * *";


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


// função para definir o cron
function CronJob (schedule, body) {
  cron.schedule(schedule, () => {        
    console.log(`${Day()} ${Time()} - ${body}`);
  });
}


// função para criação individual endpoints
function IndividualEndpoint (uri, httpMethod, schedule, body) {
  app[httpMethod.toLowerCase()](`/${uri}`, (req, res) => {
    res.status(200).send
    ("CRON created! Check your console"); 
    
    CronJob(schedule, body);
  });
}


// função para iniciar o server
function StartServer(uri) {
  app.listen(uri, () => {
    console.log(`app on http://localhost:${port}`);
  }
  );


  IndividualEndpoint("itemm", 'GET', frequency, "This message shows every 2 seconds");
  IndividualEndpoint("a", 'GET', frequency, "hi there!!!");
}

StartServer(8080);





