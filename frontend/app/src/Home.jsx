// página inicial 
import { Link } from "react-router-dom"

function Home () {
    return (
        <div>
            <h1>CRONS Management Service</h1>
            <p>Select what you want to do:</p>
            <Link to='/list'>List all existing Crons</Link>
            <Link to='/create'>Create a new Cron</Link>
            <Link to='/edit'>Edit an existing Cron</Link>
            <Link to='/delete'>Delete a Cron</Link>

            <p>Thank you for your visit!</p>
        </div>)
}

export default Home