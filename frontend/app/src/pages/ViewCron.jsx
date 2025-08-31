// página para ver cron individualmente
import { useParams } from "react-router-dom";
import {GetSpecificCron} from '../hooks/FetchData'


function ViewCron () {
    
  const {uriId}  = useParams();

  // gets data  
  const cron = GetSpecificCron(uriId)

  // ativa o cron
  fetch(`/activate-cron/${uriId}`, { method: "POST" })
  .then(res => res.json())
  .then(data => console.log(data.message));

  
  return (
    <div>
      {(cron ? (
        <div >
          <p>{`URI: ${cron.uri}`}</p>
          <p>{`HTTP METHOD: ${cron.httpMethod}`}</p>
          <p>{`SCHEDULE: ${cron.schedule}`}</p>
          <p>{`TIMEZONE: ${cron.timeZone}`}</p>
          <p>{`BODY: ${cron.body}`}</p>
        </div>) :
        (<p>cant load</p>)
      )}
    </div>)
}

export default ViewCron
