import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import {NavLink} from "react-router-dom";
import "./LeftMenu.scss"




export default function LeftMenu({links}) {

    if (!links) {
        return (<p>Ładuję...</p>)
    }
    return (
        <List component="nav" className={"leftMenuWrapper"}  aria-label="mailbox folders">

            {
                links.map(link =>(
                    <div key={link.text}>
                        <NavLink exact className={"navLink"} activeClassName={"navLinkActive"} to={link.path}>
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

