/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getTicketDataApi, clostTicket } from '../../api/api';
import AuthContext from '../../context/authContext';
import DataList from '../utils/DataList';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const Student_ticket_view = () => {

    const navigate = useNavigate();

    const { ticketId } = useParams();
    const { auth } = useContext(AuthContext);

    const [dataList, setDataList] = useState([]);
    const [popupUpdateIsOpen, setPopupUpdateIsOpen] = useState(false);
    const [popupCloseIsOpen, setPopupCloseIsOpen] = useState(false);

    const getData = async () => {
        const res = await getTicketDataApi(ticketId);
        console.log(res);
        if (res.status === 200) {
            setDataList(res.data.data.dataList);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const openUpdateTicket = () => {
        setPopupUpdateIsOpen(true);
    };
    const openCloseTicket = () => {
        setPopupCloseIsOpen(true);
    };

    const closeUpdateTicket = () => {
        setPopupUpdateIsOpen(false);
    };
    const closeCloseTicket = () => {
        setPopupCloseIsOpen(false);
    };

    const onCloseTicketCkick = async () => {
        const close = await clostTicket(ticketId);
        if( close.status === 200) {
            navigate(`/`);
        }
    };

    const modalUpdateStyle = {
        content: {
            top: '10%',
            left: '10%',
            right: '10%',
            bottom: '10%',
        }
    };
    const modalCloseStyle = {
        content: {
            top: '40%',
            left: '40%',
            right: '40%',
            bottom: '40%',
        }
    };

    return (
        <div className="student-container">
            <div className="content-wrapper">
                <button className="create-request-btn" style={{ marginRight: '10px' }} onClick={openUpdateTicket}>C???p nh???t</button>
                <button className="create-request-btn" onClick={openCloseTicket}>????ng</button>
                <DataList DataList={dataList} Role={auth.Role} />
            </div>
            <Modal
                isOpen={popupUpdateIsOpen}
                onRequestClose={closeUpdateTicket}
                style={modalUpdateStyle}
                ariaHideApp={false}
            >

            </Modal>
            <Modal
                isOpen={popupCloseIsOpen}
                onRequestClose={closeCloseTicket}
                style={modalCloseStyle}
                ariaHideApp={false}
            >
                <>
                    <p>B???n c?? mu???n ????ng ticket n??y ?</p>
                    <div className="close-modal-footer">
                        <button onClick={onCloseTicketCkick}>C??</button>
                        <button onClick={closeCloseTicket}>Kh??ng</button>
                    </div>
                </>
            </Modal>
        </div>
    );
};

export default Student_ticket_view;