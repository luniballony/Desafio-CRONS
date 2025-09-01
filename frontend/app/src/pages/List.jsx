// página para listar crons
import { Link } from "react-router-dom";
import {useCronData} from '../hooks/FetchData'

const List = () => {
  const { cron, loading } = useCronData();

  if (loading) return <p className="info-text">Loading...</p>;

  return (
    <div className="list-container">
      <h1>List of all existing Crons</h1>
      {cron.map((item) => (
        <div key={item.uri} className="cron-card">
          <div className="cron-info">
            <p><strong>URI:</strong> {item.uri}</p>
            <p><strong>HTTP Method:</strong> {item.httpMethod}</p>
            <p><strong>Schedule:</strong> {item.schedule}</p>
            <p><strong>Time Zone:</strong> {item.timeZone}</p>
            <p><strong>Body:</strong> {item.body}</p>
          </div>
          <div className="cron-actions">
            <Link to={`/view/${item.uri}`}>View</Link>
            <Link to={`/edit/${item.uri}`}>Edit</Link>
            <Link to={`/delete/${item.uri}`}>Delete</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default List;