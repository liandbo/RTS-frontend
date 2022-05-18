import React, { useState, useContext } from 'react';
import './Logincss.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router';
import AuthContext from '../../context/authContext';

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { setAuth } = useContext(AuthContext);

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (id, passwordValue) => {
        axios({
            method: 'POST',
            url: '/api/v1/auth/login',
            data: {
                IDnumber: id,
                Password: passwordValue
            }
        }).then((response) => {
            setAuth({
                Token: response.data.data.token,
                Role: response.data.data.Role,
                UserName: response.data.data.userName,
                IDnumber: response.data.data.IDnumber,
                Department: response.data.data.Department
            })
            if (response.status === 200) {
                navigate(from, {replace: true})
            }
        }).catch(error => {
            if (error.response.status === 400 || error.response.status === 404) {
                alert(error.response.data.message);
            }
        })
    }

    const onSubmitClick = () => {
        handleLogin(userId, password)
    }

    return (
        <div className="Loginbox">
            <div className="InputArea">
                <div className="columnLogin">
                    <span>UserID</span>
                    <span>Password</span>
                </div>
                <div className="columnLogin">
                    <input
                        type="text"
                        onChange={e => setUserId(e.target.value)}
                        value={userId}
                        onKeyDown={e => e.key === 'Enter' && onSubmitClick()}
                    />
                    <input
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        onKeyDown={e => e.key === 'Enter' && onSubmitClick()}
                    />
                </div>
            </div>
            <button type="button" onClick={onSubmitClick}>Submit</button>
        </div>
    );
};

export default Login;