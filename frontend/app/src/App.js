import React, { useEffect, useState} from "react";

const App = () => {
  const [cron, setCron] = useState([]);

  const getList = () => {
  fetch('/list')
    .then(res => res.json()) // recebe dados do servidor e transforma-os em json para poder ser usada com js
    .then(newCron => {
      console.log(newCron);
    })
    .catch(err => console.error("Error fetching data:", err));
  }

  useEffect(() => { 
    getList();
  }, []);

  return (
    <div>
      <h1>List of Crons</h1>
    </div>
  );
}

export default App;