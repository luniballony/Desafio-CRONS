// página para listar crons e selecionar o que se pretende editar
import List from "./List"

function Edit () {
	return (
		<div>
			<h1>{`Select which CRON to edit:`}</h1>
			<List />
		</div>
	)
}

export default Edit 