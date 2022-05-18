import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import AuthContext from './context/authContext';

const AuthCheck = () => {

    const { auth } = useContext(AuthContext);
    const location = useLocation();

    return (
        auth?.Token
            ? <Outlet />
            : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default AuthCheck