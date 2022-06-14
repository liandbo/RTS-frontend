/* eslint-disable react/jsx-pascal-case */
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
import Student_ticket_view from './coponents/Student/Student_ticket_view';
import Header from './coponents/utils/Header';

function App() {

    const { auth } = useContext(AuthContext);

    const roleCheck = (role) => {
        switch (String(role)) {
            case process.env.REACT_APP_ROLE_STUDENT:
                return (
                    <>
                        <Route path="/" element={<StudentHome />} />
                        <Route path="/ticket/:ticketId" element={<Student_ticket_view />} />
                    </>
                )
            case process.env.REACT_APP_ROLE_SECRETARY:
                return (
                    <>
                        <Route path="/" element={<SecretaryHome />} />
                    </>
                )
            case process.env.REACT_APP_ROLE_DTDT:
                return (
                    <>
                        <Route path="/" element={<DTDTHome />} />
                    </>
                )
            case process.env.REACT_APP_ROLE_QLKH:
                return (
                    <>
                        <Route path="/" element={<QLKHHome />} />
                    </>
                )

            case process.env.REACT_APP_ROLE_HCTH:
                return (
                    <>
                        <Route path="/" element={<HCTHHome />} />
                    </>
                )
            default:
                return (
                    <>
                        <Route path="/" element={<Error />} />
                    </>
                )
        }
    }

    return (
        <div className='Container'>
            <div className='header-area'>
                <Routes>
                    <Route path="/Login" />
                    <Route path="*" element={<Header />} />
                </Routes>         
            </div>
            <div className='body-area'>
                <Routes>
                    <Route path="/Login" element={<Login />} />
                    <Route element={<AuthCheck />}>
                        {roleCheck(auth.Role)}
                    </Route>
                    <Route path="*" element={<Error />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
