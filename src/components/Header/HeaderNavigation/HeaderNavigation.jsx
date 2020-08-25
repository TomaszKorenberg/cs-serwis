import React from 'react';
import "./HeaderNavigation.scss"
import {NavLink} from "react-router-dom";

const HeaderNavigation = () => {
    return (
        <nav>
            <ul>
                <NavLink exact to={"/"} activeClassName={"navLinkActive"}><li className={"menuItem"} >Dashboard</li></NavLink>
                <NavLink to={"/repairs/all"} activeClassName={"navLinkActive"}><li className={"menuItem"}>Naprawy</li></NavLink>
                <NavLink to={"/messages"} activeClassName={"navLinkActive"}><li className={"menuItem"}>Wiadomości</li></NavLink>
                <NavLink to={"/auctions"} activeClassName={"navLinkActive"}><li className={"menuItem"}>Aukcje</li></NavLink>
                <NavLink to={"/warehouse"} activeClassName={"navLinkActive"}><li className={"menuItem"}>Magazyn</li></NavLink>
            </ul>
        </nav>
    );
};

export default HeaderNavigation;