// ficheiro para criar novo cron
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Create() {
  const navigate = useNavigate();

  // estados para inputs
  const [uri, setUri] = useState("");
  const [httpMethod, setHttpMethod] = useState("");
  const [schedule, setSchedule] = useState("");
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
        body: JSON.stringify({ uri, httpMethod, schedule, body }),
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