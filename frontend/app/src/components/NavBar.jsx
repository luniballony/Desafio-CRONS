import { Link } from "react-router-dom";
import '../index.css'

function NavBar () {
	return (
		<nav>
		<Link to="/" end className={({ isActive }) => (isActive ? "active" : "")}>Home</Link>
		<Link to="/list" className={({ isActive }) => (isActive ? "active" : "")}>List</Link>
		<Link to="/create" className={({ isActive }) => (isActive ? "active" : "")}>Create</Link>
		<Link to="/list" className={({ isActive }) => (isActive ? "active" : "")}>Edit & Delete</Link>
	</nav>
	)
}

export default NavBar