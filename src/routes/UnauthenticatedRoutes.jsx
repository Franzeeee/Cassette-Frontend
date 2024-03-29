import { Navigate, Outlet } from "react-router-dom"

function UnauthenticatedRoutes(props) {
    console.log(props.loggedIn)
    const useAuth = () => {
        return !props.loggedIn
    }
    
    return useAuth() ? <Outlet /> : <Navigate to={'/'} />

}

export default UnauthenticatedRoutes