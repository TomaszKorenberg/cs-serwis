import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import './Root.css';
import Repairs from "../Repairs/Repairs";
import Header from "../../components/Header/Header";
import LeftMenu from "../../components/LeftMenu/LeftMenu";
import Auctions from "../Auctions/Auctions";
import Dashboard from "../Dashboard/Dashboard";
import Messages from "../Messages/Messages";
import AddRepair from "../Repairs/AddRepair/AddRepair";


function Root() {
    return (
        <BrowserRouter>
            <div className={"appWrapper"}>
                <Header/>
                <div className={"contentWrapper"}>
                    <LeftMenu/>
                    <Switch>
                        <Route exact path={"/"}><Dashboard/></Route>
                        <Route exact path={"/repairs"}><Repairs/></Route>
                        <Route exact path={"/messages"}><Messages/></Route>
                        <Route exact path={"/auctions"}><Auctions/></Route>
                        <Route exact path={"/repairs/newrepair"}><AddRepair/></Route>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default Root;
