import React from 'react';
import "./HeaderNavigation.scss"
import {NavLink} from "react-router-dom";

const HeaderNavigation = () => {
    return (
        <nav>
            <ul>
                <NavLink to={"/"}><li className={"menuItem"}>Dashboard</li></NavLink>
                <NavLink to={"/repairs"}><li className={"menuItem"}>Naprawy</li></NavLink>
                <NavLink to={"/messages"}><li className={"menuItem"}>Wiadomości</li></NavLink>
                <NavLink to={"/auctions"}><li className={"menuItem"}>Aukcje</li></NavLink>
                <NavLink to={"/warehouse"}><li className={"menuItem"}>Magazyn</li></NavLink>
            </ul>
        </nav>
    );
};

export default HeaderNavigation;