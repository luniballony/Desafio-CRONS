// ficheiro para listar, criar, apagar e editar cron jobs
import cron from "node-cron";
import { data } from "./data.js";

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

ListCrons();  