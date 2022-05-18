import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './coponents/Login/Login';
import Error from './coponents/Error/Error';
import StudentHome from './coponents/Student/StudentHome';
import { useContext } from 'react';
import AuthContext from './context/authContext';
import AuthCheck from './AuthCheck';
import SecretaryHome from './coponents/Secretary/SecretaryHome';
import DTDTHome from './coponents/DTDT/DTDTHome';
import QLKHHome from './coponents/QLKH/QLKHHome';
import HCTHHome from './coponents/HCTH/HCTHHome';

function App() {

    const { auth } = useContext(AuthContext);

    const roleCheck = (role) => {
        switch (String(role)) {
            case process.env.REACT_APP_ROLE_STUDENT:
                return <StudentHome />
            case process.env.REACT_APP_ROLE_SECRETARY:
                return <SecretaryHome />
            case process.env.REACT_APP_ROLE_DTDT:
                return <DTDTHome />
            case process.env.REACT_APP_ROLE_QLKH:
                return <QLKHHome />
            case process.env.REACT_APP_ROLE_HCTH:
                return <HCTHHome />
            default:
                return <Error />
        }
    }

    return (
        <div className='Container'>
            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route element={<AuthCheck />}>
                    <Route path="/" element={roleCheck(auth.Role)} />
                </Route>
                <Route path="*" element={<Error />} />
            </Routes>
        </div>
    );
};

export default App;
