// página para editar cron
import ViewCron from "./ViewCron"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";

function EditCron () {

	const navigate = useNavigate();

  // estados para inputs
  //const [uri, setUri] = useState("");
	const {uriId}  = useParams();

  const [httpMethod, setHttpMethod] = useState("");
  const [schedule, setSchedule] = useState("");
	const [timeZone, setTimeZone] = useState("");
  const [body, setBody] = useState("");

  // função para tratar dos inputs
  async function handleSubmit(e) {
    e.preventDefault(); // evita refresh da página

    try {
      const response = await fetch(`/editing/${uriId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({uriId, httpMethod, schedule, timeZone, body }),
      });

      const result = await response.json();

			
      if (response.ok) {
        alert("Cron updated successfully!");

        // redireciona para ver o cron criado
        navigate(`/view/${uriId}`);
      } else {
        alert(`Erro: ${result.message}`);
      }
    } catch (err) {
      console.error("Error at editing cron:", err);
      alert("There was an error comunicating with the server.");
    }
  }


	return (
    <div>
      <h2>Editing the following CRON</h2>
			<ViewCron />
      <form onSubmit={handleSubmit}>
				<p>It's not possible to edit uri of a cron.</p>
				<p>If you wish to edit a cron's uri, please create a new cron.</p>
        <p>HTTP METHOD: </p>
        <input
          value={httpMethod}
          onChange={(e) => setHttpMethod(e.target.value)}
          placeholder="insert the new http method"
          required
        />

        <p>SCHEDULE: </p>
        <input
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          placeholder="insert the new schedule"
          required
        />

				<p>TIMEZONE:</p>
        <select value={timeZone} onChange={e => setTimeZone(e.target.value)}>
          <option value="UTC">UTC</option>
          <option value="Europe/Lisbon">Europe/Lisbon</option>
          <option value="America/New_York">America/New_York</option>
          <option value="Asia/Tokyo">Asia/Tokyo</option>
          <option value="America/Sao_Paulo">America/Sao_Paulo</option>
        </select>

        <p>BODY: </p>
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="insert the new body"
          required
        />

        <br />
        <button type="submit">Edit CRON</button>
      </form>
    </div>
  );
}

export default EditCron