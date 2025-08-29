# Desafio-CRONS
Desafio FullStack CRONS para Glartek

========
to run (backend):
    node app

to run (frontend):
    npm start

========
Dependências a instalar (backend):
    # agendamento (cron jobs)
    npm install node-cron

    # HTTP requests
    npm install axios

    # timezones, validação cron
    npm install luxon cron-parser

    # express
    npm install express


Depedências a instalar (frontEnd):
    # react router
    npm install react-router-dom


==========
- assume que body é uma string
- considera-se uri como um id de cada cron
- cron so dispara se página for ativada (tem se de visitar o endpoint)
