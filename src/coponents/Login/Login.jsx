import React, { useState, useContext } from 'react';
import './Logincss.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
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
                navigate(from, { replace: true })
            }
        }).catch(error => {
            if (error.response.status === 400 || error.response.status === 404 || error.response.status === 401) {
                alert(error.response.data.message);
            }
        })
    }

    const onSubmitClick = () => {
        handleLogin(userId, password)
    }

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="input-area">
                    <div className="column-login">
                        <span className="text-label">Tài khoản:</span>
                        <input
                            type="text"
                            onChange={e => setUserId(e.target.value)}
                            className="text-box"
                            value={userId}
                            onKeyDown={e => e.key === 'Enter' && onSubmitClick()}
                        />
                    </div>
                    <div className="column-login">
                        <span className="text-label">Mật khẩu:</span>
                        <input
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                            className="text-box"
                            value={password}
                            onKeyDown={e => e.key === 'Enter' && onSubmitClick()}
                        />
                    </div>
                </div>
                <button className='login-button' type="button" onClick={onSubmitClick}>Đăng nhập</button>
            </div>
        </div>
    );
};

export default Login;