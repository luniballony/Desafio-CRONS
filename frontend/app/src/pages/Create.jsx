// ficheiro para criar novo cron
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../index.css'

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
    <div className="create-container">
      <h2>Create a new CRON</h2>
      <form className="create-form" onSubmit={handleSubmit}>
        <label>URI:</label>
        <input
          value={uri}
          onChange={(e) => setUri(e.target.value)}
          placeholder="Insert the URI (will be the CRON id)"
          required
        />

        <label>HTTP METHOD:</label>
        <input
          value={httpMethod}
          onChange={(e) => setHttpMethod(e.target.value)}
          placeholder="Insert the HTTP method (e.g. POST)"
          required
        />

        <label>SCHEDULE:</label>
        <input
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          placeholder="Insert the schedule (e.g. */5 * * * *)"
          required
        />
        <a
          href="https://crontab.guru/examples.html"
          target="_blank"
          rel="noreferrer"
        >
          Learn more about CRON schedules here
        </a>

        <label>TIMEZONE:</label>
        <select value={timeZone} onChange={(e) => setTimeZone(e.target.value)}>
          {Array.from({ length: 27 }, (_, i) => i - 12).map((tz) => (
            <option key={tz} value={tz}>
              {tz >= 0 ? `UTC+${tz}` : `UTC${tz}`}
            </option>
          ))}
        </select>
        <a
          href="https://en.wikipedia.org/wiki/List_of_UTC_offsets"
          target="_blank"
          rel="noreferrer"
        >
          Learn more about UTC offsets here
        </a>

        <label>BODY:</label>
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Insert the body content"
          required
        />

        <button type="submit">Create CRON</button>
      </form>
    </div>
  );
}

export default Create