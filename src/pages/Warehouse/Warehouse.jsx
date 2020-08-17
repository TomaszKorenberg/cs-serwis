import React, {useEffect} from 'react';
import {leftMenuActions} from "../../redux/actions";

const leftMenuItems = [
    {path: "/warehouse", text:"Wszystkie"},
    {path: "/warehouse/wfirma", text:"wFirma"},
    {path: "/warehouse/quadra", text:"Quadra"},
];

const Warehouse = () => {
    useEffect(() => {
        leftMenuActions.setLeftMenu([...leftMenuItems]);
    }, []);
    return (
        <>
            Hello from messages!<br/>
            {process.env.NODE_ENV}<br/>
            {process.env.API_URL}<br/>
            {process.env.WDS_SOCKET_PORT}<br/>
            {process.env.DB_USER}<br/>
            {process.env.DB_HOST}<br/>
        </>
    );
};

export default Warehouse;