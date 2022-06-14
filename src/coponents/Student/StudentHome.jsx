/* eslint-disable react/jsx-pascal-case */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Student_createTicket from './Student_createTicket';
import './Student.css';

const StudentHome = () => {

    const { auth } = useContext(AuthContext);

    const navigate = useNavigate();

    const [ticketList, setTicketList] = useState([]);
    const [popupIsOpen, setPopupIsOpen] = useState(false);

    const getStudentTicketList = async () => {
        const list = await axios({
            method: 'GET',
            url: '/api/v1/ticket/getStudentTicketList',
            headers: {
                'Authorization': `Bearer ${auth.Token}`
            },
        });
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
                    <div key={ticket} className="ticketGroup">
                        <p key={ticket.Name}>{ticket.Name}</p>
                        <button key={ticket._id} onClick={() => toTicketPage(ticket._id)} >Chi tiết</button>
                    </div>
                )
            })}
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