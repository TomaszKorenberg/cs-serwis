import React from 'react';
import {NavLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    menuItem: {
        display: "inline-block",
        listStyle: "none",
        marginRight: "15px",
        textDecoration: "none",
        color: "white",
    },

    navLinkActive: {
        fontWeight: "700",
    }
}));

const HeaderNavigation = () => {
    const classes = useStyles();

    return (
        <nav>
            <ul>
                <NavLink exact to={"/"} activeClassName={classes.navLinkActive}>
                    <li className={classes.menuItem}>Dashboard</li>
                </NavLink>
                <NavLink to={"/repairs/all"} activeClassName={classes.navLinkActive}>
                    <li className={classes.menuItem}>Naprawy</li>
                </NavLink>
                <NavLink to={"/messages"} activeClassName={classes.navLinkActive}>
                    <li className={classes.menuItem}>Wiadomości</li>
                </NavLink>
                <NavLink to={"/auctions"} activeClassName={classes.navLinkActive}>
                    <li className={classes.menuItem}>Aukcje</li>
                </NavLink>
                <NavLink to={"/warehouse"} activeClassName={classes.navLinkActive}>
                    <li className={classes.menuItem}>Magazyn</li>
                </NavLink>
            </ul>
        </nav>
    );
};

export default HeaderNavigation;