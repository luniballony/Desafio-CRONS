import { useState, useEffect } from "react";

export function useCronData() {
  const [cron, setCron] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/list')
      .then(res => res.json())
      .then(newCron => {
        setCron(newCron);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  return { cron, loading };
}


export function GetSpecificCron(id) {
    // carrega lista de crons
    const { cron, loading } = useCronData();

    // procura por cron especifico
    const found = cron.find(item => item.uri === id);
    return found;

}

export default {useCronData, GetSpecificCron}
