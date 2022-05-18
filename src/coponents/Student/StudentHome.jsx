import React, { useContext } from 'react';
import AuthContext from '../../context/authContext';

const StudentHome = () => {

    const {auth} = useContext(AuthContext);

    return (
        <div>Welcome student: {auth.UserName}</div>
    )
}

export default StudentHome