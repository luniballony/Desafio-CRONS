import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <h2>External Cron Service is running!</h2>
        <p>Please check the <strong>cron_log.txt</strong> file for notifications from your cron jobs.</p>
    `);
});

// Rota específica para receber notificações do cron
app.all('/:uriId', (req, res) => {
    const { message } = req.body || {};
    const currentTime = new Date().toLocaleString("en-GB");
    
    if (message) {
        const logMessage = `${currentTime} - ${message}\n`;
        
        console.log(`[EXTERNAL SERVICE]: ${message}`);
        fs.appendFileSync('cron_log.txt', logMessage);
        res.status(200).send('Notification received!');
    } else {
        res.status(400).send('Something went wrong regarding the body.');
    }
});


app.listen(PORT, () => {
    console.log('Endpoint: POST http://localhost:3001');

    // Cria o arquivo de log se não existir
    if (!fs.existsSync('cron_log.txt')) {
        fs.writeFileSync('cron_log.txt', '');
    }
});