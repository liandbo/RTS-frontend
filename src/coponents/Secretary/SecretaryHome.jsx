import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { getSecretaryTicketListApi } from '../../api/api';
import AuthContext from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import './Secretary.css';

const SecretaryHome = () => {
    const navigate = useNavigate();

    const { auth } = useContext(AuthContext);
    // console.log(auth);

    const [ticketList, setTicketList] = useState([]);

    const getTicketList = async () => {
        const ticketList = await getSecretaryTicketListApi(auth.Token);
        setTicketList(ticketList.data.data.ticketList.reverse());
    }

    const toTicketPage = (id) => {
        navigate(`/ticket/${id}`);
    };

    useEffect(() => {
        getTicketList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="big-container">
            <div className="content-wrapper">
                <h1 className="header">Công việc ngày hôm nay</h1>
                <div className='ticket-list'>
                    {ticketList.map((ticket, key) => {
                        return (
                            <div className='ticket-wrapper'>
                                <span
                                    key={ticket.Name}
                                    className='ticket-name'
                                >
                                    {ticket.Name}
                                </span>
                                <button
                                    className="detail-btn"
                                    key={ticket._id}
                                    onClick={() => toTicketPage(ticket._id)}
                                >
                                    Chi Tiết
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SecretaryHome