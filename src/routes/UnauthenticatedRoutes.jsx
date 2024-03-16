import { Navigate, Outlet } from "react-router-dom"

function UnauthenticatedRoutes(props) {

    const useAuth = () => {
        return !props.loggedIn
    }
    
    return useAuth() ? <Outlet /> : <Navigate to={'/'} />

}

export default UnauthenticatedRoutes