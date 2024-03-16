import { Navigate, Outlet } from "react-router-dom"
import Login from "../pages/Login";

function AdminRoutes(props) {

    const useAuth = () => {
        const loggedIn = props.loggedIn;
        const isAdmin = props.isAdmin;

        return loggedIn && isAdmin
    }
    
    return useAuth() ? <Outlet /> : <Navigate to={'/'} />

}

export default AdminRoutes