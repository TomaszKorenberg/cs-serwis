import React, {useEffect} from 'react';
import {leftMenuActions} from "../../redux/actions";

const leftMenuItems = [
    {path: "/auctions", text:"Wszystkie"},
    {path: "/auctions/shop", text:"Sklep interentowy"},
    {path: "/auctions/allegro", text:"Allegro"},
    {path: "/auctions/ebay", text:"Ebay"},
];

const Auctions = () => {
    useEffect(() => {
        leftMenuActions.setLeftMenu([...leftMenuItems]);
    }, []);

    return (
        <>
            Hello from auction!
        </>
    );
};

export default Auctions;