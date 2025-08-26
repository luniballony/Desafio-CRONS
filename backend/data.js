// este ficheiro pretende guardar info de cron jobs
// estrutura: uri, httpMethod, schedule, body, [timeZone <- por adicionar]

export let data = [
  {
    uri: "itemm",
    httpMethod: "GET",
    schedule: "*/2 * * * * *",
    body: "This message shows every 2 seconds"
  } ,
  {
    uri: "a",
    httpMethod: "GET",
    schedule: "*/3 * * * * *",
    body: "This message shows every 3 seconds"
  },
  {
    uri: "b",
    httpMethod: "GET",
    schedule: "*/1 * * * * *",
    body: "This message shows every second"
  },
  {
    uri: "bla",
    httpMethod: "GET",
    schedule: "*/5 * * * * *",
    body: "This message shows every 5 seconds"
  }
];