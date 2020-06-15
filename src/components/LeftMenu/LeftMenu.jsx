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


export default function LeftMenu({links}) {
    const classes = useStyles();

    if (!links) {
        return (<p>Ładuję...</p>)
    }
    return (
        <List component="nav" className={classes.root}  aria-label="mailbox folders">
            {
                console.log(links)
            }

            {
                links.map(link =>(
                    <>
                        <NavLink exact className={"navLink"} activeClassName={"navLinkActive"} to={link.path}>
                            <ListItem button>{link.text}</ListItem>
                        </NavLink>
                        <Divider/>
                    </>
                )
                    )
            }

            <Divider light/>
        </List>
    );
}

