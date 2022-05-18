import React, { useContext } from 'react'
import AuthContext from '../../context/authContext'

const QLKHHome = () => {

    const {auth} = useContext(AuthContext)

    return (
        <div>QLKHHome {auth.UserName}</div>
    )
}

export default QLKHHome