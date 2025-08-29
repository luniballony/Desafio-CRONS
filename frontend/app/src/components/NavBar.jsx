import { Link } from "react-router-dom";


function NavBar () {
    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/list'>List</Link>
            <Link to='/create'>Create</Link>
            <Link to='/edit'>Edit</Link>
            <Link to='/delete'>Delete</Link>
        </nav>
    )
}

export default NavBar