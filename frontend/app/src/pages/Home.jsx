// página inicial 
import { Link } from "react-router-dom"
import "../index.css";

function Home () {
    return (
        <div className="home-container">
            <h1>CRONS Management Service</h1>
            <p>Select what you want to do:</p>

            <div className="home-links">
                <Link to="/list">List all existing Crons</Link>
                <Link to="/create">Create a new Cron</Link>
                <Link to="/list">Edit an existing Cron</Link>
                <Link to="/list">Delete a Cron</Link>
            </div>

      <p className="home-footer">Thank you for your visit!</p>
    </div>
    )
};

export default Home