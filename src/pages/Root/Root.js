import React from 'react';
import {BrowserRouter, NavLink, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import './Root.css';
import Repairs from "../Repairs/Repairs";
import Header from "../../components/Header/Header";
import LeftMenu from "../../components/LeftMenu/LeftMenu";
import Auctions from "../Auctions/Auctions";
import Dashboard from "../Dashboard/Dashboard";
import Messages from "../Messages/Messages";
import AddRepair from "../Repairs/AddRepair/AddRepair";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Warehouse from "../Warehouse/Warehouse";




const leftMenuLinks = [
    {path: "/repairs", text:"Aktualne naprawy"},
    {path: "/repairs/newrepair", text:"Dodaj naprawę"},
    {path: "/repairs/clients", text:"Klienci"},
    {path: "/messages/clients", text:"Wiadomości"}
    ];

function Root() {
    const leftMenu = useSelector(state => state.leftMenu);

    return (
        <BrowserRouter>
            <div className={"appWrapper"}>
                <Header/>
                <div className={"contentWrapper"}>
                    <LeftMenu links={leftMenu[0]}/>
                    <Switch>
                        <Route exact path={"/"}><Dashboard/></Route>
                        <Route exact path={"/repairs"}><Repairs/></Route>
                        <Route exact path={"/messages"}><Messages/></Route>
                        <Route exact path={"/auctions"}><Auctions/></Route>
                        <Route exact path={"/warehouse"}><Warehouse/></Route>
                        <Route exact path={"/repairs/newrepair"}><AddRepair/></Route>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default Root;
