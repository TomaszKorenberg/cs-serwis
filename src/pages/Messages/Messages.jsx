import React, {useEffect} from 'react';
import {leftMenuActions} from "../../redux/actions";

const leftMenuItems = [
    {path: "/messages", text:"Wszystkie"},
    {path: "/messages/system", text:"Wewnętrzne"},
    {path: "/messages/facebook", text:"Facebook"},
    {path: "/messages/instagram", text:"Instagram"},
    {path: "/messages/mail", text:"Mail"},
];

const Messages = () => {
        useEffect(() => {
            leftMenuActions.setLeftMenu([...leftMenuItems]);
        }, []);

    return (
        <>
            Hello from messages!
        </>
    );
};

export default Messages;