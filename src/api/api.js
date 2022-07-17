import axios from 'axios';

export const LoginApi = async (username, password) => {
    const response = await axios({
        method: 'POST',
        url: '/api/v1/auth/login',
        data: {
            IDnumber: username,
            Password: password
        }
    });
    return response;
};

export const getStudentTicketListApi = async (token) => {
    const list = await axios({
        method: 'GET',
        url: '/api/v1/ticket/getStudentTicketList',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    return list;
};
export const getSecretaryTicketListApi = async (token) => {
    const list = await axios({
        method: 'GET',
        url: '/api/v1/ticket/getSecretaryTicketList',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    return list;
};

export const createTicketApi = async (token, name, requestId, DepartmentId, TargetRole, FileName, Content) => {
    const ticket = await axios({
        method: 'POST',
        url: '/api/v1/ticket/create',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: {
            Name: name,
            requestId: requestId,
            Department: DepartmentId,
            TargetRole: TargetRole,
            FileName: FileName,
            Content: Content
        }
    });
    return ticket;
};

export const getRequestListApi = async () => {
    const request = await axios({
        method: 'GET',
        url: '/api/v1/ticket/getRequestList'
    });
    return request;
};

export const getTicketDataApi = async (ticketID) => {
    const requestData = await axios({
        method: 'GET',
        url: '/api/v1/ticket/getTicketData',
        data: {
            Ticket: ticketID
        }
    });
    return requestData;
};

export const getMasterFileApi = (requestId) => {
    return process.env.REACT_APP_DOWNLOAD + "api/v1/files/downloadmaster/" + requestId;
};

export const uploadFile = async (data) => {
    const uploadFile = await axios({
        method: 'POST',
        url: '/api/v1/files/upload',
        data: data
    });
    return uploadFile;
};

export const getTicketFile = async (dataId) => {
    return process.env.REACT_APP_DOWNLOAD + "api/v1/files/download/" + dataId;
};

export const clostTicket = async (ticketID) => {
    const close = await axios({
        method: 'PUT',
        url: '/api/v1/ticket/closeTicket',
        data: {
            Ticke: ticketID
        }
    });
    return close;
}