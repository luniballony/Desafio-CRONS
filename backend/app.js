import cron from "node-cron";

const seconds = "This message shows every 2 seconds"
const timer = "*/2 * * * * *";

// função para definir o cron
function message (schedule, body) {
    cron.schedule(schedule, () => {    
    const now = new Date();

    console.log(`${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')} - ${body}`  
    );

    });
}

// função para correr o cron + mandar notif
function program (schedule, body) {
    message(schedule, body);

    
    const now = new Date();
    console.log(`CRON was acticvated at: ${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
    console.log(`CRON runs every 2 seconds.`)
}

program(timer, seconds)
