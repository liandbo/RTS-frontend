import React, { useContext } from 'react';
import './Util.css';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/authContext';

const Header = () => {
    const navigate = useNavigate();

    const { auth, setAuth } = useContext(AuthContext);

    const onLogOutClick = () => {
        setAuth({
            Token: '',
            Role: -1,
            UserName: '',
            IDnumber: '',
            Department: ''
        });
        navigate("/login", { replace: true });
    };

    return (
        <div className='header-field'>
            <button
                className='log-out-btn'
                onClick={onLogOutClick}
            >
                Đăng xuất
            </button>
            <span>Xin chào {auth.UserName}</span>
        </div>
    );
};

export default Header;