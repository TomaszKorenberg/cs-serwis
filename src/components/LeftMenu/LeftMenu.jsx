import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import {NavLink} from "react-router-dom";
import "./LeftMenu.scss"


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 150,
        backgroundColor: "#282c34",
    },
}));

export default function LeftMenu() {
    const classes = useStyles();

    return (
        <List component="nav" className={classes.root}  aria-label="mailbox folders">

            <NavLink exact className={"navLink"} activeClassName={"navLinkActive"} to={"/repairs"}>
                <ListItem button>Aktualne naprawy</ListItem>
            </NavLink>
            <Divider/>

            <NavLink className={"navLink"} activeClassName={"navLinkActive"} to={"/repairs/newrepair"}>
                <ListItem button divider>Dodaj naprawę</ListItem>
            </NavLink>

            <NavLink className={"navLink"} activeClassName={"navLinkActive"} to={"/repairs/clients"}>
                <ListItem button>Klienci</ListItem>
            </NavLink>

            <Divider light/>
        </List>
    );
}

