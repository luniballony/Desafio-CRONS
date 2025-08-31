// ficheiro para listar, criar, apagar e editar cron jobs
import cron from "node-cron";
import fs from 'fs'; // permite manipular ficheiros
import data from './data.json' with { type: 'json' }; 



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


// função para ativar crons
export function cronActivator(uri) {
  const cronData = data.find(c => c.uri === uri);

  if (!cronData) {
    console.log(`No cron found with URI: /${uri}`);
    return { success: false, message: `No cron found with URI: /${uri}.` };
  }

  // ativa o cron com os dados
  cron.schedule(cronData.schedule, () => {
    const timestamp = `${Day()} ${Time()}`;
    //console.log(`${timestamp} - ${cronData.body}`);
  }, {
    timezone: cronData.timeZone
  });

  const msg = `Cron activated with body: ${cronData.body}`;
  console.log(msg);

  return { success: true, message: msg };
}


// função para criar crons
export function CreateCron (uri, httpMethod, body, schedule) {
  const index = data.findIndex(cron => cron.uri === uri);
    if (index !== -1 || !uri) {
      console.log(`Thar uri is already in use or invalid: /${uri}`);
      return { success: false, message: `That URI is already in use: /${uri}` };
    }

    if (!cron.validate(schedule) || !schedule) {
      console.log(`Invalid cron expression: ${schedule}`);
      return;
    }
    if (!uri || !httpMethod || !schedule || !body) {
    const message = "All fields (uri, httpMethod, schedule, body) are required.";
    console.log(message);
    return { success: false, message: message };
  }

  try {
    // adiciona o novo cron a data.json
    data.push({uri: uri, httpMethod: httpMethod, schedule: schedule, body: body });
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

    console.log(`New cron created: URI: /${uri} | Method: ${httpMethod} | Schedule: ${schedule} | Body: ${body}`);
    return { success: true, message: "Cron created successfully." };
  }
  catch (error) {
    console.error("Error scheduling cron job:", error.message);
    return { success: false, message: "Server error creating the cron." };
  } 
}


// função para listar todos os crons
export function ListCrons() {
  return data.map(cron => ({
    uri: cron.uri,
    httpMethod: cron.httpMethod,
    schedule: cron.schedule,
    body: cron.body
  }));
}


// função para eliminar cron
export function DeleteCron(uri) {
  const index = data.findIndex(cron => cron.uri === uri);
  if (index !== -1) {
    data.splice(index, 1);
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    console.log(`Cron with URI: /${uri} has been deleted.`);
     return { success: true, message: `Cron with URI: /${uri} has been deleted.` };
  } else {
    console.log(`No cron found with URI: /${uri}`);
    return { success: false, message: `No cron found with URI: /${uri}.` };
  } 
}



// função para editar cron
export function EditCron(uri, newHttpMethod, newSchedule, newBody) {
  const index = data.findIndex(cron => cron.uri === uri);
  if (index !== -1) {
    if(!newHttpMethod) {
      return { success: false, message: `Make sure you provide a valid http method.` };
    }
    if(!newSchedule || !cron.validate(newSchedule)) {
      return { success: false, message: `Make sure you provide a valid schedule.` };
    } 
    if(!newBody) {
      return { success: false, message: `Make sure you provide a valid body.` };
    }

    data.splice(index, 1, { ...data[index], schedule: newSchedule, body: newBody });
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    console.log(`Cron with URI: /${uri} has been edited.`);
    console.log(`new Cron: URI: /${data[index].uri} | Method: ${newHttpMethod} | Schedule: ${newSchedule} | Body: ${newBody}`);
    return { success: true, message: `Cron with URI: /${uri} has been updated.` };

  } else {
    console.log(`No cron found with URI: /${uri}`);
  } 
}

