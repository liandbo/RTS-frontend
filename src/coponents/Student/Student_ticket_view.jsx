import React from 'react';
import { useParams } from 'react-router-dom';

const Student_ticket_view = () => {

    const {ticketId} = useParams()

    return (
        <div>
            <span>{ticketId}</span>
        </div>
    );
};

export default Student_ticket_view;