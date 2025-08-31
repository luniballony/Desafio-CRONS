// página para editar cron
import ViewCron from "./ViewCron"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";


function EditCron () {

	const navigate = useNavigate();

  // estados para inputs
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
          <option value="-12">UTC-12</option>
          <option value="-11">UTC-11</option>
          <option value="-10">UTC-10</option>
          <option value="-9">UTC-9</option>
          <option value="-8">UTC-8</option>
          <option value="-7">UTC-7</option>
          <option value="-6">UTC-6</option>
          <option value="-5">UTC-5</option>
          <option value="-4">UTC-4</option>
          <option value="-3">UTC-3</option>
          <option value="-2">UTC-2</option>
          <option value="-1">UTC-1</option> 
          <option value="0">UTC</option>
          <option value="1">UTC+1</option>          
          <option value="2">UTC+2</option>
          <option value="3">UTC+3</option>
          <option value="4">UTC+4</option>
          <option value="5">UTC+5</option>
          <option value="6">UTC+6</option>
          <option value="7">UTC+7</option>
          <option value="8">UTC+8</option>
          <option value="9">UTC+9</option>
          <option value="10">UTC+10</option>
          <option value="11">UTC+11</option>
          <option value="12">UTC+12</option>
          <option value="13">UTC+13</option>
          <option value="14">UTC+14</option>
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