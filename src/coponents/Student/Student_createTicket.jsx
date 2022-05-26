import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Student_createTicket = ({refreshTrigger}) => {

    const [requestList, setRequestList] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const getRequestList = async () => {
        const request = await axios({
            method: 'GET',
            url: '/api/v1/ticket/getRequestList'
        });
        setRequestList(request.data.data.requestList);
    };

    useEffect(() => {
        getRequestList();
    }, []);

    return (
        <div>
            {console.log(requestList)}
            <p>Chọn loại đơn</p>
            <select onChange={e => setSelectedRequest(e.target.value)}>
                <option value={"None"} selected hidden disabled>Chọn...</option>
                {requestList.map(request => {
                    return <option 
                        value={request._id}
                    >{request.Name}</option>;
                })}
            </select>

            {selectedRequest && <>
                {/* Làm form input ở đây */}
            </>}
        </div>
    );
};

export default Student_createTicket;