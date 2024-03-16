import { Navigate, Outlet } from "react-router-dom"

function StudioRoutes(props) {

    const useAuth = () => {
        const isArtist = props.role == 'admin' || props.role == 'artist';

        return props.loggedIn && isArtist;
    }
    
    return useAuth() ? <Outlet /> : <Navigate to={'/'} />

}

export default StudioRoutes