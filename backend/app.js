import cron from "node-cron";


const temporaryMessage = "This message shows every 2 seconds"
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
    cron.schedule(schedule, () => {        
        console.log(`${Day()} ${Time()} - ${body}`);
    });
}

CronJob(frequency, temporaryMessage)



