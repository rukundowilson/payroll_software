import { Link } from "react-router";

function NavBar(){
    return (
        <>
             <div className="bg-gray-900 w-full p-4 min-w-100">
                 <Link className="mx-4 text-white text-xl" to="/">Home</Link>
                 <Link to="/register" className="text-white mx-4 text-xl">register</Link>
                 <Link to="/login" className="text-white text-xl">login</Link>

             </div>
        </>
    )

}
export default NavBar;