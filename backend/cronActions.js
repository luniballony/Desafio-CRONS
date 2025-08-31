// ficheiro para listar, criar, apagar e editar cron jobs
import cron from "node-cron";
import fs from 'fs'; // permite manipular ficheiros
import data from './data.json' with { type: 'json' }; 


// função para calcular a timezone
function offsetToTimezone(offset) {
  const intOffset = parseInt(offset, 10);

  if (intOffset === 0) return "Etc/GMT";
  if (intOffset > 0) return `Etc/GMT-${intOffset}`; 
  if (intOffset < 0) return `Etc/GMT+${Math.abs(intOffset)}`; 
}


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
  // procura cron nos dados
  const cronData = data.find(c => c.uri === uri);

  // termina se não encontrar cron
  if (!cronData) return { success: false, message: `No cron found with URI: /${uri}.` };
  
  if (cronData.active) {
    return { success: false, message: `Cron ${uri} already active.` };
  }
    
  const timeZone = offsetToTimezone(cronData.timeZone || 0);

  cron.schedule(cronData.schedule, () => {
    const time = new Date().toLocaleString("en-GB", { timeZone: timeZone });
    console.log(`${time} (Time Zone: UTC ${cronData.timeZone}) - ${cronData.body}`);
  }, { timezone: timeZone });

  // muda flag para ativo
  cronData.active = true;
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

  const msg = `Cron activated with body: ${cronData.body}`;
  console.log(msg);

  return { success: true, message: msg };  
}


// função para criar crons
export function CreateCron (uri, httpMethod, schedule, timeZone, body ) {

  // permite verificar httpMethods
  const validMethods = ["GET", "POST", "PUT", "DELETE"];

  const index = data.findIndex(cron => cron.uri === uri);

  // verificação de parametros
  if (!uri || index !== -1) return { success: false, message: `That URI is already in use: /${uri}` };
  if (!schedule || !cron.validate(schedule) ) return { success: false, message: "Make sure you provide a valid schedule." };
  if (!httpMethod || !validMethods.includes(httpMethod.toUpperCase())) return { success: false, message: "Make sure you provide a valid http method." };
  if (!body) return { success: false, message: "Make sure you provide a body." };

  try {
    // adiciona o novo cron a data.json
    data.push({uri: uri, httpMethod: httpMethod, schedule: schedule, timeZone: timeZone, body: body, active: false});
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

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
    timeZone: cron.timeZone,
    body: cron.body
  }));
}


// função para eliminar cron
export function DeleteCron(uri) {
  const index = data.findIndex(cron => cron.uri === uri);
  if (index !== -1) {
    data.splice(index, 1);
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    return { success: true, message: `Cron with URI: /${uri} has been deleted.` };

  } else {
    return { success: false, message: `No cron found with URI: /${uri}.` };
  } 
}



// função para editar cron
export function EditCron(uri, newHttpMethod, newSchedule, newTimeZone, newBody) {

  const index = data.findIndex(cron => cron.uri === uri);

  // permite verificar httpMethods
  const validMethods = ["GET", "POST", "PUT", "DELETE"];

  if (index !== -1) {
    if (!newHttpMethod || !validMethods.includes(newHttpMethod.toUpperCase())) {
      return { success: false, message: "Make sure you provide a valid http method." };
    }
    if(!newSchedule ) return { success: false, message: `Make sure you provide a valid schedule.` };
    if(!newBody) return { success: false, message: `Make sure you provide a valid body.` };
  

    data.splice(index, 1, { 
      ...data[index], 
      httpMethod: newHttpMethod, 
      schedule: newSchedule, 
      timeZone: newTimeZone,
      body: newBody, 
      active: false
    });

    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
   
    return { success: true, message: `Cron with URI: /${uri} has been updated.` };

  } else {
    return { success: false, message: `No cron found with URI: /${uri}` };
  } 
}

