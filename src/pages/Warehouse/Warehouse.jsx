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
            Hello from warehouse!<br/>
        </>
    );
};

export default Warehouse;