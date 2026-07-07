import { Outlet,Navigate } from "react-router";
import {useAuth} from "../../context/AuthContext.tsx";

const ProtectedRoutes=()=>{
    const {user,loading}  = useAuth();
    if (loading) {
        return <div>Loading...</div>; // or a spinner
    }
    return user ? <Outlet/>:<Navigate to='/login/sign-in'/>;
}

export default ProtectedRoutes;