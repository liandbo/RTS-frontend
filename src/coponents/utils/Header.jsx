import React from 'react';
import './Util.css';

const header = () => {

    const onLogOutClick = () => {
        
    };

    return (
        <div className='header-field'>
            <button
                className='log-out-btn'
                onClick={onLogOutClick}
            >
                Đăng xuất
            </button>
        </div>
    );
};

export default header;