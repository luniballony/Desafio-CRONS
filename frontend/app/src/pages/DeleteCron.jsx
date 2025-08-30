// ficheiro para eliminar cron
import ViewCron from "./ViewCron"
import { useParams, useNavigate  } from "react-router-dom"

function DeleteCron () {
	const { uriId } = useParams();
  const navigate = useNavigate();

  async function handleDelete() {
    try {
      const response = await fetch(`/delete/${uriId}`, {
        method: "DELETE"
      });

      const result = await response.json();

			// redireciona
      if (response.ok) {
        alert(result.message);
        navigate("/"); 
      } else {
        alert(`Erro: ${result.message}`);
      }
    } catch (err) {
      console.error("Erro ao apagar cron:", err);
      alert("Ocorreu um erro ao comunicar com o servidor.");
    }
  }

	return (
    <div>
			<p>Are you sure you want to delete this cron?</p>
			<ViewCron />
      <button onClick={handleDelete}>Yes</button>
    </div>
	)
}

export default DeleteCron