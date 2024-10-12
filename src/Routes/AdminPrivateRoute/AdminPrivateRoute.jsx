import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import Loading from "../../Components/Loading/Loading";
import { Navigate } from "react-router-dom";


const AdminPrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);

    if(user.userType === 1){
        return children;
    }

    if(loading){
        return <Loading></Loading>
    }
    
    return <Navigate to="/login"></Navigate>
};

export default AdminPrivateRoute;