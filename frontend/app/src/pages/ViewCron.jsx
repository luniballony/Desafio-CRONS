// página para ver cron individualmente
import { useParams } from "react-router-dom";
import {GetSpecificCron} from '../hooks/FetchData'


function ViewCron () {
    
  const {uriId}  = useParams();

  // gets data  
  const cron = GetSpecificCron(uriId)
  
  return (
    <div>
      {(cron ? (
        <div >
          <p>{`URI: ${cron.uri}`}</p>
          <p>{`HTTP METHOD: ${cron.httpMethod}`}</p>
          <p>{`SCHEDULE: ${cron.schedule}`}</p>
          <p>{`BODY: ${cron.body}`}</p>
        </div>) :
        (<p>cant load</p>)
      )}
    </div>)
}

export default ViewCron
