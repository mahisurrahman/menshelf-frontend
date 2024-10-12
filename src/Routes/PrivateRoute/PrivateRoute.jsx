import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import Loading from "../../Components/Loading/Loading";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({type, children}) => {
    const {user, loading} = useContext(AuthContext);

    if (user) {
        return children;
    }

    if(loading){
        return <Loading></Loading>
    }
    
    return <Navigate to="/login"></Navigate>
};

export default PrivateRoute;