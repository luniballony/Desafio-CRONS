import cron from "node-cron";

const seconds = "This message shows every 2 seconds"
const timer = "*/2 * * * * *";

// função para definir o cron
function message (schedule, body) {
    cron.schedule(schedule, () => {
    console.log(body);
    });
}

// função para correr o cron + mandar notif
function program (schedule, body) {
    message(schedule, body);
    console.log(`CRON was acticvated at: ${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`)
}

program(timer, seconds)