import React from 'react';
import { getTicketFile } from '../../api/api';

const DataList = ({DataList, Role}) => {
    const getUserName = (role) => {
        if (role === Role) {
            return "Tôi";
        } else {
            switch (role) {
                case process.env.REACT_APP_ROLE_STUDENT:
                    return "Sinh Viên";
                case process.env.REACT_APP_ROLE_SECRETARY:
                    return "Thư ký Khoa";
                case process.env.REACT_APP_ROLE_DTDT:
                case process.env.REACT_APP_ROLE_QLKH:
                case process.env.REACT_APP_ROLE_HCTH:
                    return "Cán Bộ Trường";
                default:
                    return 'Hệ thống';
            }
        }
    };

    return (
        <div>
            {DataList.map((data) => {
                return (
                    <>
                        <div>
                            <p>{getUserName(data.AnswerRole)}</p>
                            <label htmlFor="content">Nội dung: </label>
                            <p id='content'>{data.Data.Content}</p>
                            <a href={getTicketFile(data._id)}>{data.Data.FileName}</a>
                            <p>{data.createdAt}</p>
                        </div>
                    </>
                )
            })}
        </div>
    );
};

export default DataList;