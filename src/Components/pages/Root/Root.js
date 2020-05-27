import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import './Root.css';
import Repairs from "../Repairs/Repairs";
import Header from "./../../organisms/Header/Header";
import LeftMenu from "../../organisms/LeftMenu/LeftMenu";
import Auctions from "../Auctions/Auctions";
import Dashboard from "../Dashboard/Dashboard";
import Messages from "../Messages/Messages";


function Root() {
    return (
        <BrowserRouter>
            <div className={"appWrapper"}>
                <Header/>
                <Switch>
                    <div className={"contentWrapper"}>
                        <LeftMenu/>
                        <Route exact path={"/"}><Dashboard/></Route>
                        <Route exact path={"/repairs"}><Repairs/></Route>
                        <Route exact path={"/messages"}><Messages/></Route>
                        <Route exact path={"/auctions"}><Auctions/></Route>
                    </div>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default Root;
