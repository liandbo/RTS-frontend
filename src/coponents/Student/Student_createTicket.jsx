import { getRequestListApi, getMasterFileApi, createTicketApi, uploadFile } from '../../api/api';
import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/authContext';

const Student_createTicket = ({ refreshTrigger }) => {

    const [requestList, setRequestList] = useState([]);
    const [selectedRequestFileName, setSelectedRequestFileName] = useState(null);
    const [fileData, setFileData] = useState(null);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [inputContent, setInputContent] = useState('');

    const { auth } = useContext(AuthContext);


    const getRequestList = async () => {
        const request = await getRequestListApi();
        if (request.status === 200) {
            setRequestList(request.data.data.requestList);
        }
    };

    useEffect(() => {
        getRequestList();
    }, []);

    const onRequestChange = async (requestId) => {
        const request = requestList.find(r => r._id === requestId);
        setSelectedRequest(request);
        setSelectedRequestFileName(request.FileName);
    };

    const onFileUploadChange = (e) => {
        setFileData(e.target.files[0]);
    };

    const onDescriptionChange = (e) => {
        setInputContent(e.target.value);
    };

    const renderName = (name) => {
        const today = new Date();

        return name + " - " + today.getDate().toString() + "/" + (today.getMonth() + 1).toString() + "/" + today.getFullYear().toString();
    };

    const onSubmitClick = async () => {
        try {
            const token = auth.Token;
            const name = renderName(selectedRequest.Name);
            const requestID = selectedRequest._id || 0;
            const target = selectedRequest.RoleInCharge;
            const filename = fileData.name || '';
            const Content = inputContent;
            const Department = auth.Department;

            const ticketCreateResponse = await createTicketApi(token, name, requestID, Department, target, filename, Content);

            if (ticketCreateResponse.status === 200) {
                const uploadData = new FormData();
                uploadData.append('upload', fileData);
                uploadData.append('ticket', ticketCreateResponse.data.data.dataId);
                await uploadFile(uploadData);
            }

            refreshTrigger();
        } catch (err) {
            console.log(err);
        }

    };


    return (
        <div>
            <p>Chọn loại đơn</p>
            <select onChange={e => onRequestChange(e.target.value)}>
                <option value={"None"} selected hidden disabled>Chọn...</option>
                {requestList.map(request => {
                    return <option
                        key={request._id}
                        value={request._id}
                    >{request.Name}</option>;
                })}
            </select>
            {selectedRequest && <>
                <p>Điền đơn</p>
                <div>
                    <p>Template file:</p>
                    <a href={getMasterFileApi(selectedRequest._id)} download>{selectedRequestFileName}</a>
                </div>
                <div className="data-field">
                    <div>
                        <label htmlFor="context">Nội dung: </label>
                        <input id="context" type="text" onChange={e => onDescriptionChange(e)} />
                    </div>
                    <div>
                        <label htmlFor="file">File đính kèm: </label>
                        <input type="file" id="file" multiple={false} onChange={e => onFileUploadChange(e)} />
                    </div>
                </div>
                <button onClick={onSubmitClick}>Gửi</button>
            </>}
        </div>
    );
};

export default Student_createTicket;