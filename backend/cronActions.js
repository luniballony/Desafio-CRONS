// ficheiro para listar, criar, apagar e editar cron jobs
import cron from "node-cron";
import fs from 'fs'; // permite manipular ficheiros
import data from './data.json' with { type: 'json' }; 
import { Time, Day, EndpointCreator } from "./app.js";


// função para listar todos os crons
export function ListCrons() {
  data.forEach(cron => {
    console.log(`URI: /${cron.uri} | Method: ${cron.httpMethod} | Schedule: ${cron.schedule} | Body: ${cron.body}`);
  });
}


// função para criar o cron
/*
export function CreateCron (schedule, body) {
  try {
    if (!cron.validate(schedule) || !schedule) {
      console.log(`Invalid cron expression: ${schedule}`);
      return;
    }
    if (!body) {
      console.log("Body cannot be empty.");
      return;
    }

    cron.schedule(schedule, () => {        
      console.log(`${Day()} ${Time()} - ${body}`);
    });

  }
  catch (error) {
    console.error("Error scheduling cron job:", error.message);
  } 
}
*/

export function CreateCron (uri, httpMethod, body, schedule) {
  try {
    const index = data.findIndex(cron => cron.uri === uri);
    if (index !== -1 || !uri) {
      console.log(`Thar uri is already in use or invalid: /${uri}`);
      return;
    }

    if (!cron.validate(schedule) || !schedule) {
      console.log(`Invalid cron expression: ${schedule}`);
      return;
    }
    if (!body) {
      console.log("Body cannot be empty.");
      return;
    }

    // adiciona o novo cron a data.json
    data.push({uri: uri, httpMethod: httpMethod, schedule: schedule, body: body });
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

    // cria o endpoint e o cron job
    EndpointCreator(uri, httpMethod, body, schedule);
    console.log(`New cron created: URI: /${uri} | Method: ${httpMethod} | Schedule: ${schedule} | Body: ${body}`);
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
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    console.log(`Cron with URI: /${uri} has been deleted.`);
  } else {
    console.log(`No cron found with URI: /${uri}`);
  } 
}


// função para editar cron
export function EditCron(uri, newHttpMethod, newSchedule, newBody) {
  const index = data.findIndex(cron => cron.uri === uri);
  if (index !== -1) {
    if(!newHttpMethod) {
      console.log("Make sure you provide a valid http method.");
      return;
    }
    if(!newSchedule || !cron.validate(newSchedule)) {
      console.log("Make sure you provide a valid schedule.");
      return;
    } 
    if(!newBody) {
      console.log("Make sure you provide a valid body.");
      return;
    }

    data.splice(index, 1, { ...data[index], schedule: newSchedule, body: newBody });
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    console.log(`Cron with URI: /${uri} has been edited.`);
    console.log(`new Cron: URI: /${data[index].uri} | Method: ${newHttpMethod} | Schedule: ${newSchedule} | Body: ${newBody}`);

  } else {
    console.log(`No cron found with URI: /${uri}`);
  } 
}

