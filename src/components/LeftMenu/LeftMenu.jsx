import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import {NavLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    navLink: {
        textDecoration: "none",
        color: "white",
    },
    navLinkActive: {
        fontWeight: "700",
    },

    leftMenuWrapper: {
        borderRight: "1px solid gray",
        height: "100vh",
        minWidth: "170px"
    }
}));


export default function LeftMenu({links}) {
    const classes = useStyles();


    if (!links) {
        return (<p>Ładuję...</p>)
    }
    return (
        <List component="nav" className={classes.leftMenuWrapper} aria-label="mailbox folders">

            {
                links.map(link => (
                        <div key={link.text}>
                            <NavLink exact className={classes.navLink} activeClassName={classes.navLinkActive} to={link.path}>
                                <ListItem button>{link.text}</ListItem>
                            </NavLink>
                            <Divider/>
                        </div>
                    )
                )
            }

            <Divider light/>
        </List>
    );
}

