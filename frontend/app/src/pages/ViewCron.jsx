// página para ver cron individualmente
import { useParams } from "react-router-dom";
import {GetSpecificCron} from '../hooks/FetchData'
import { useEffect } from "react";
import '../index.css';


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
     <div className="view-container">
     <h2>CRON Details</h2>
      {cron ? (
        <div className="cron-details">
          <p><strong>URI:</strong> {cron.uri}</p>
          <p><strong>HTTP METHOD:</strong> {cron.httpMethod}</p>
          <p><strong>SCHEDULE:</strong> {cron.schedule}</p>
          <p><strong>TIMEZONE:</strong> UTC {cron.timeZone}</p>
          <p><strong>BODY:</strong> {cron.body}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ViewCron
