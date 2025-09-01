# Desafio FullStack CRONS
    Este é um projeto full-stack para o desafio CRONS, que tem como objetivo a criação de um serviço de agendamento de tarefas (CRON jobs) com uma API RESTful e uma interface de usuário para sua gestão.

**Objetivo**
    O principal objetivo do projeto é desenvolver um serviço capaz de gerenciar CRON jobs. Este serviço deve expor uma API para a configuração das tarefas e um frontend para interagir com essa API de forma intuitiva.

    Quando um CRON job for disparado, o serviço deve notificar um endereço externo (uri) por meio de uma requisição HTTP, enviando um body e respeitando o método (httpMethod) e o fuso horário (timeZone) definidos. O serviço externo, por sua vez, deve registrar a data atual e o conteúdo do body em sua saída.

**Funcionalidades da API**
A API fornece as seguintes operações para o gerenciamento de CRONs:
   - Criar: Adicionar um novo CRON job com os parâmetros necessários.
   - Editar: Modificar um CRON job existente.
   - Remover: Apagar um CRON job.
   - Listar: Obter a lista de todos os CRONs agendados.


## Tecnologias Utilizadas
**Backend**
    - node-cron: Para o agendamento de tarefas (cron jobs).
    - axios: Para a realização de requisições HTTP.
    - express: Para criar o servidor e a API.

Frontend
    - react-router-dom: Para o roteamento de páginas no React.


**Como Executar o Projeto**
    **AVISO** 
    - Este projeto só foi testado em Windows + Chrome
    - As seguintes indicações são para ser corridas no mesmo sistema
    - Ajuste a instalação de dependências conforme o seu sistema operativo

    **Pré-requisitos**
        - Certifique-se de ter o Node.js e o npm instalados em sua máquina.

    **Instalação** 
        Backend:
            - Navegue até o diretório do backend (cd backend).
            - Instale as dependências:
                npm install node-cron
                npm install axios
                npm install luxon cron-parser
                npm install express
                
        Frontend:
            - Navegue até o diretório do frontend (cd frontend/app/src).
            - Instale as dependências:
                npm install react react-dom
                npm install react-router-dom
                npm install react-scripts
                npm install web-vitals
        
        External Server:
            - Instale as dependências:
                npm install express

    **Inicialização** 
        - Crie um terminal para cada servidor
        - Todos podem ser iniciados com: npm start


**Como usar**
    - Após iniciar todos os servidores, navegue pelo servidor frontend
    - No mesmo poderá selecionar: 
        - Criar novo CRON
        - Listar CRON's já existentes
        - Editar CRON's já existentes
        - Eliminar CRON's
    - Se desejar ativar um CRON, selecione Listar -> CRON que deseja ativar e depois abra o ficheiro 'cron_log.txt' onde verá as notificações em tempo real
    - No ficheiro deverá aparecer uma mensagem com o formato:
        DATA(DD/MM/AAA), HORA(HH:MM:SS) -  (DATA(DD/MM/AAA), HORA(HH:MM:SS) Time Zone: UTC [timeZone]) - BODY
        sendo que o primeiro conjunto de data + hora é para está definido para (UTC+1) e o segundo para o time Zone definido
        ex.: 01/09/2025, 14:35:36 - (01/09/2025, 07:35:36 Time Zone: UTC -6) - TESTING 123456789


**Observações Importantes**
    - O uri de cada CRON é tratado como um identificador único.
    - A execução dos CRONs é ativada somente quando o endpoint do serviço é visitado.
    - O body da requisição é assumido como uma string.
    - Os dados de todos os uri são enviados para o ficheiro: cron_log.txt


**Futuro Trabalho** 
    - Implementação de testes
    - Melhorar lógica de time zones
    - Melhorar lógica de re-ativação de CRONs
    - Criar mais componentes reutilizaveis para simplificar estrutura de frontEnd
    - Testar em outros ambientes e máquinas