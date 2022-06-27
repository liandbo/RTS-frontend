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

export const createTicketApi = async (token) => {

};

export const getRequestListApi = async () => {
    const request = await axios({
        method: 'GET',
        url: '/api/v1/ticket/getRequestList'
    });
    return request;
};