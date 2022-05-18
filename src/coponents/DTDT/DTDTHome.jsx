import React, { useContext } from 'react'
import AuthContext from '../../context/authContext'

const DTDTHome = () => {

    const {auth} = useContext(AuthContext)

    return (
        <div>DTDTHome {auth.UserName} </div>
    )
}

export default DTDTHome