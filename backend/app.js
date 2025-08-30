// ficheiro principal do backend 

import cron from "node-cron"; // criação server express
import express from "express";
import data from './data.json' with { type: 'json' }; 
import { ListCrons, DeleteCron, CreateCron } from "./cronActions.js";
import { Time, Day, cronActivator } from "./cronActions.js";



const app = express();

app.use(express.json()); 

// endpoint para ativar cron
app.post("/cron/:uri", (req, res) => {
  const result = cronActivator(req.params.uri);
  res.json(result);
});


// endpoint para criar cron jobs
app.post('/create-cron', (req, res) => {
  const { uri, httpMethod, body, schedule } = req.body;

  const result = CreateCron(uri, httpMethod, body, schedule);

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


// função para iniciar o server
function StartServer(port) {
  app.listen(port, () => {
    console.log(`app on http://localhost:${port}`);
  }
  );
}

StartServer(8080);





