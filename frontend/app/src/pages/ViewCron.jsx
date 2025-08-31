// página para ver cron individualmente
import { useParams } from "react-router-dom";
import {GetSpecificCron} from '../hooks/FetchData'
import { useEffect } from "react";


function ViewCron () {
    
  const {uriId}  = useParams();

  // gets data  
  const cron = GetSpecificCron(uriId)

  useEffect(() => {
    fetch(`/activate-cron/${uriId}`, { method: "POST" })
    .then(res => res.json())
    .then(data => console.log(data.message));
  }, []);

  
  return (
    <div>
      {(cron ? (
        <div >
          <p>{`URI: ${cron.uri}`}</p>
          <p>{`HTTP METHOD: ${cron.httpMethod}`}</p>
          <p>{`SCHEDULE: ${cron.schedule}`}</p>
          <p>{`TIMEZONE: UTC ${cron.timeZone}`}</p>
          <p>{`BODY: ${cron.body}`}</p>
        </div>) :
        (<p>Loading...</p>)
      )}
    </div>)
}

export default ViewCron
