import PropTypes from 'prop-types';
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";


const ProtectorRuout = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation();

    if (loading) {
        return <div className='max-w-lg mx-auto flex items-center justify-center'>
            <div className="w-16 h-16 border-4  border-dashed rounded-full animate-spin"></div>
        </div>
    }
    if (user) {
        return children
    }
    return <Navigate to={'/login'} state={location.pathname}></Navigate>

};
ProtectorRuout.propTypes = {
    children: PropTypes.node
}


export default ProtectorRuout;