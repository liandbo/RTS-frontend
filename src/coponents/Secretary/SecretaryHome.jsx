import React, { useContext } from 'react';
import AuthContext from '../../context/authContext';

const SecretaryHome = () => {

    const {auth}  = useContext(AuthContext);

    return (
        <div>SecretaryHome: {auth.UserName}</div>
    )
}

export default SecretaryHome