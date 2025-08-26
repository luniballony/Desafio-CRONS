// ficheiro para listar, criar, apagar e editar cron jobs
import cron from "node-cron";
// permite manipular ficheiros
import fs from 'fs';
import { data } from "./data.js";
import { Time, Day } from "./app.js";


// função para listar todos os crons
export function ListCrons() {
  data.forEach(cron => {
    console.log(`URI: /${cron.uri} | Method: ${cron.httpMethod} | Schedule: ${cron.schedule} | Body: ${cron.body}`);
  });
}

// função para definir o cron
export function CronJob (schedule, body) {
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


// função para eliminar cron
export function DeleteCron(uri) {
  const index = data.findIndex(cron => cron.uri === uri);
  if (index !== -1) {
    data.splice(index, 1);
    fs.writeFileSync('./data.js', `export const data = ${JSON.stringify(data, null, 2)};`);
    console.log(`Cron with URI: /${uri} has been deleted.`);
  } else {
    console.log(`No cron found with URI: /${uri}`);
  } 
}


DeleteCron("a"); // exemplo de delete
ListCrons();  