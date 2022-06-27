/* eslint-disable react/jsx-pascal-case */
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Student_createTicket from './Student_createTicket';
import './Student.css';
import { getStudentTicketListApi } from '../../api/api';

const StudentHome = () => {

    const { auth } = useContext(AuthContext);

    const navigate = useNavigate();

    const [ticketList, setTicketList] = useState([]);
    const [popupIsOpen, setPopupIsOpen] = useState(false);

    const getStudentTicketList = async () => {
        const list = await getStudentTicketListApi(auth.Token)
        setTicketList(list.data.data.ticketList.reverse());
    };

    const refresh = () => {
        getStudentTicketList();
        setPopupIsOpen(false);
    };

    useEffect(() => {
        getStudentTicketList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toTicketPage = (id) => {
        navigate(`/ticket/${id}`);
    };

    const openCreateTicket = () => {
        setPopupIsOpen(true);
    };

    const closeCreateTicket = () => {
        setPopupIsOpen(false);
    };

    const modalStyle = {
        content: {
            top: '10%',
            left: '10%',
            right: '10%',
            bottom: '10%',
        }
    }

    return (
        <div className="student-container">
            <div className="content-wrapper">
                <div>
                    <button
                        onClick={openCreateTicket}
                        className='create-request-btn'
                    >
                        Tạo request
                    </button>
                </div>
                {ticketList.map(ticket => {
                    return (
                        <div key={ticket} className="ticket-wrapper">
                            <span key={ticket.Name} className="ticket-name">{ticket.Name}</span>
                            <button
                                key={ticket._id}
                                onClick={() => toTicketPage(ticket._id)}
                                className="detail-btn"
                            >
                                Chi tiết
                            </button>
                        </div>
                    )
                })}
            </div>
            <Modal
                isOpen={popupIsOpen}
                onRequestClose={closeCreateTicket}
                style={modalStyle}
                ariaHideApp={false}
            >
                <Student_createTicket refreshTrigger={refresh} />
            </Modal>
        </div>
    );
};

export default StudentHome;