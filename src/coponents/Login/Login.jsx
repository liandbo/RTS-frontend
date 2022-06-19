import React, { useState, useContext, useRef } from 'react';
import './Logincss.css';
import { LoginApi } from '../../api/api'
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../../context/authContext';

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { setAuth } = useContext(AuthContext);

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const isLoading = useRef(false);
    const [errorMessage, setErrorMessage] = useState(' ');

    const handleLogin = async (id, passwordValue) => {
        try {
            const response = await LoginApi(id,passwordValue)
            if (response.status === 200) {
                setAuth({
                    Token: response.data.data.token,
                    Role: response.data.data.Role,
                    UserName: response.data.data.userName,
                    IDnumber: response.data.data.IDnumber,
                    Department: response.data.data.Department
                });
                navigate(from, { replace: true });
            }
        } catch (error) {
            if (error.response.status === 400 || error.response.status === 404 || error.response.status === 401) {
                setErrorMessage("Login failed: " + error.response.data.message);
                isLoading.current = false;
            }
        }
    };

    const onSubmitClick = () => {
        if (!isLoading.current) {
            isLoading.current = true;
            handleLogin(userId, password);
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="input-area">
                    <div className="column-login">
                        <span className="text-label">Tài khoản:</span>
                        <input
                            type="text"
                            onChange={e => {
                                setUserId(e.target.value);
                                setErrorMessage(' ');
                            }}
                            className="text-box"
                            value={userId}
                            onKeyDown={e => e.key === 'Enter' && onSubmitClick()}
                        />
                    </div>
                    <div className="column-login">
                        <span className="text-label">Mật khẩu:</span>
                        <input
                            type="password"
                            onChange={e => {
                                setPassword(e.target.value);
                                setErrorMessage(' ');
                            }}
                            className="text-box"
                            value={password}
                            onKeyDown={e => e.key === 'Enter' && onSubmitClick()}
                        />
                    </div>
                </div>
                <button className='login-button' type="button" onClick={onSubmitClick}>Đăng nhập</button>
                <span className='error-message'>{errorMessage}</span>
            </div>
        </div>
    );
};

export default Login;