import React, { useContext } from 'react';
import AuthContext from '../../context/authContext';

const HCTHHome = () => {

    const {auth}  = useContext(AuthContext)

    return (
        <div>HCTHHome {auth.UserName}</div>
    );
};

export default HCTHHome;