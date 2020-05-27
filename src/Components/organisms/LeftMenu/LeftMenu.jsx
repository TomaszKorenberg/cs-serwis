import React from 'react';
import "./LeftMenu.scss"
import {NavLink} from "react-router-dom";

const LeftMenu = () => {
    return (
        <nav className={"leftMenuWrapper"}>
            Left Menu:
            <ul>
                <NavLink to={"/repairs"}><li>Aktualne naprawy</li></NavLink>
                <NavLink to={"/repairs/addrepair"}><li>Dodaj naprawę</li></NavLink>
                <NavLink to={"/repairs/clients"}><li>Klienci</li></NavLink>

            </ul>
        </nav>
    );
};

export default LeftMenu;