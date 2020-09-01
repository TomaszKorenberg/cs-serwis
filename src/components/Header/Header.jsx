import React from "react";
import HeaderNavigation from "./HeaderNavigation/HeaderNavigation";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    headerWrapper: {
        height: "5vw",
        borderBottom: "1px solid gray",
        display: "flex",
        alignItems: "center",
    },
}));

const Header = () => {
    const classes = useStyles();

    return (
        <div className={classes.headerWrapper}>
            <HeaderNavigation/>
        </div>
    )
};

export default Header;