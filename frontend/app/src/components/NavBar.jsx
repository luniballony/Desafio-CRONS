import { Link } from "react-router-dom";


function NavBar () {
    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/list'>List</Link>
            <Link to='/create'>Create</Link>
            <Link to='/list'>Edit & Delete</Link>
        </nav>
    )
}

export default NavBar