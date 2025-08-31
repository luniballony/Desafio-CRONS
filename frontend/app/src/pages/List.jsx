// página para listar crons
import { Link } from "react-router-dom";
import {useCronData} from '../hooks/FetchData'

const List = () => {
  const { cron, loading } = useCronData();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>List of all existing Crons</h1>
      {
        cron.map((item) => (
          <div key={item.uri}>
            <p> uri: {item.uri} | http method: {item.httpMethod} | schedule: {item.schedule} | time zone: {item.timeZone}  | body: {item.body}</p>
            <br></br>
            <Link to={`/view/${item.uri}`}>View this Cron</Link>
            <Link to={`/edit/${item.uri}`}>Edit this Cron</Link>
            <Link to={`/delete/${item.uri}`}>Delete this Cron</Link>
          </div>))
      }
    </div>
  );
}

export default List;