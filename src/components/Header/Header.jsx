import React from "react";
import "./Header.scss"
import HeaderNavigation from "./HeaderNavigation/HeaderNavigation";

const Header = () => {
    return(
        <div className={"headerWrapper"}>
            <HeaderNavigation/>
        </div>
    )
};

export default Header;