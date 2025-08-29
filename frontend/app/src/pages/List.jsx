// página para listar crons
import React, { useEffect, useState} from "react";

const List = () => {
  const [cron, setCron] = useState([]);

  const getList = () => {
  fetch('/list')
    .then(res => res.json()) // recebe dados do servidor e transforma-os em json para poder ser usada com js
    .then(newCron => {
      setCron(newCron);
      console.log(newCron);
    })
    .catch(err => console.error("Error fetching data:", err));
  }

  useEffect(() => { 
    getList();
  }, []); // importante estar vazio para só correr quando a página é carregada

  return (
    <div>
      <h1>List of Crons</h1>
      {
        cron.map((item) => (
          <div key={item.uri}>
            <p> uri: {item.uri} | http method: {item.httpMethod} | schedule: {item.schedule} | time zone: TBD | body: {item.body}</p>
          </div>))
      }
    </div>
  );
}

export default List;