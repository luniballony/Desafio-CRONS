// ficheiro principal do backend 

import express from "express";
import { ListCrons, DeleteCron, CreateCron, EditCron} from "./cronActions.js";
import { cronActivator} from "./cronActions.js";
import fs from "fs";


const app = express();

app.use(express.json()); 

// endpoint para ativar cron
app.post("/activate-cron/:uri", (req, res) => {
  const result = cronActivator(req.params.uri);
  res.json(result);
});


// endpoint para criar cron jobs
app.post('/create-cron', (req, res) => {
  const { uri, httpMethod, schedule, timeZone, body } = req.body;

  const result = CreateCron(uri, httpMethod, schedule, timeZone, body);

  if (result.success) {
    res.status(201).json(result);
  } else {
    res.status(400).json(result);
  }
});

// endpoint para listar
app.get('/list', (req, res) => {
  res.status(200).json(ListCrons());  
});


// endpoint para eliminar
app.delete('/delete/:uriId', (req, res) => {
  const { uriId } = req.params;
  
  const result = DeleteCron(uriId);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(404).json(result);
  }
});

// endpoint para editar
app.put(`/editing/:uriId`, (req, res) => {
  const { uriId } = req.params;
  const { httpMethod, schedule, timeZone, body } = req.body;
  
  const result = EditCron(uriId, httpMethod, schedule, timeZone, body);

  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
})

// marca todos os crons como não ativos
function resetCrons() {

  let data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  data = data.map(c => ({ ...c, active: false }));
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

}


// função para iniciar o server
function StartServer(port) {

  resetCrons();

  app.listen(port, () => {
    console.log(`app on http://localhost:${port}`);
  }
  );
}

StartServer(8080);





