// ficheiro para criar novo cron
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Create() {
  const navigate = useNavigate();

  // estados para inputs
  const [uri, setUri] = useState("");
  const [httpMethod, setHttpMethod] = useState("");
  const [schedule, setSchedule] = useState("");  
  const [timeZone, setTimeZone] = useState("");
  const [body, setBody] = useState("");

  // função para tratar dos inputs
  async function handleSubmit(e) {
    e.preventDefault(); // evita refresh da página

    try {
      const response = await fetch("/create-cron", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uri, httpMethod, schedule, timeZone, body }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Cron created successfully!");
        // redireciona para ver o cron criado
        navigate(`/view/${uri}`);
      } else {
        alert(`Erro: ${result.message}`);
      }
    } catch (err) {
      console.error("Error at creating cron:", err);
      alert("There was an error comunicating with the server.");
    }
  }

  return (
    <div>
      <h2>Create a new CRON</h2>
      <form onSubmit={handleSubmit}>
        <p>URI: </p>
        <input
          value={uri}
          onChange={(e) => setUri(e.target.value)}
          placeholder="insert the uri which will be the CRON id"
          required
        />

        <p>HTTP METHOD: </p>
        <input
          value={httpMethod}
          onChange={(e) => setHttpMethod(e.target.value)}
          placeholder="insert the http method"
          required
        />

        <p>SCHEDULE: </p>
        <input
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          placeholder="insert the schedule"
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

        <p>To learn more about UTC schedule go to: </p>

        <p>BODY: </p>
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="insert the body"
          required
        />

        <br />
        <button type="submit">Create CRON</button>
      </form>
    </div>
  );
}

export default Create