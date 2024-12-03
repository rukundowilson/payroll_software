import { Link } from "react-router";

function NavBar(){
    return (
        <>
             <div className="bg-green-500 w-full p-4 min-w-100">
                 <Link className="mx-4" to="/">Home</Link>
                 <Link to="/register">register</Link>
             </div>
        </>
    )

}
export default NavBar;