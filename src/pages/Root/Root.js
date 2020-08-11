import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import './Root.css';
import Header from "../../components/Header/Header";
import LeftMenu from "../../components/LeftMenu/LeftMenu";
import Auctions from "../Auctions/Auctions";
import Dashboard from "../Dashboard/Dashboard";
import Messages from "../Messages/Messages";
import AddRepair from "../Repairs/AddRepair/AddRepair";
import Warehouse from "../Warehouse/Warehouse";
import RepairDetails from "../Repairs/RepairDetails/RepairDetails"
import Repairs from "../Repairs/Repairs";
import {ThemeProvider} from '@material-ui/core/styles';
import theme from "../../theme"
import {getAllRepairs} from "../../redux/operations";


function Root() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllRepairs());
    }, [dispatch]);

    const leftMenu = useSelector(state => state.leftMenu);

    return (
        <ThemeProvider theme={theme}>
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
                            <Route path={"/repairs/repair-:repairId"}><RepairDetails/></Route>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        </ThemeProvider>
            );
            }

            export default Root;
