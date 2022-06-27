import React from 'react';
import "./Secretary.css";
import { useParams } from 'react-router-dom';


const SecretaryTicketDetail = () => {

    const {ticketId} = useParams()

    return (
        <div>
            {ticketId}
        </div>
    );
};

export default SecretaryTicketDetail;