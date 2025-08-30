// página para listar crons e selecionar o que se pretende eliminar
import List from "./List"

function Delete () {

  return (
    <div>
			<h1>{`Select which CRON to edit:`}</h1>
			<List />
		</div>
  )
}

export default Delete