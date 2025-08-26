import cron from "node-cron";
// criação server express
import express from "express";
const app = express();
const port = 8080;

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
  try {
    if (!cron.validate(schedule)) {
      throw new Error(`Invalid cron expression: ${schedule}`);
    }

    cron.schedule(schedule, () => {        
      console.log(`${Day()} ${Time()} - ${body}`);
    });

  }
  catch (error) {
    console.error("Error scheduling cron job:", error.message);
  } 
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


  IndividualEndpoint("itemm", 'GET', frequency, "This message shows every 2 seconds");
  IndividualEndpoint("a", 'GET', "*/3 * * * * *", "This message shows every 3 seconds");

  // teste de erro (schedule inválido)
  IndividualEndpoint("b", 'GET', "*/ * * *", "This message shows every second");
}

StartServer(8080);





