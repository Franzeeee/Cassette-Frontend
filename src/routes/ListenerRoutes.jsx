import { Navigate, Outlet } from "react-router-dom"

function ListenerRoutes(props) {

    const useAuth = () => {
        return props.loggedIn
    }
    
    return useAuth() ? <Outlet /> : <Navigate to={'/login'} />

}

export default ListenerRoutes