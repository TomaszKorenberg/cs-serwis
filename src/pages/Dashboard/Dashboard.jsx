import React, {useEffect} from "react";
import {leftMenuActions} from "../../redux/actions";

const leftMenuItems = [
    {path: "/dashboard", text:"Pulpit"},
    {path: "/dashboard/todo", text:"Zadania"},
    {path: "/dashboard/settings", text:"Ustawiania"},

];

const Dashboard = () => {
    useEffect(() => {
        leftMenuActions.setLeftMenu([...leftMenuItems]);
    }, []);

    return(
        //todo:
        //- wiadomości od innych użytkowników
        //- Zadania na dziś automatyczne i od administratora wyświetlane wg. priorytetu
        //- statystyki napraw z dnia/tygodnia/od początku miesiąca
        //- notatki
        <div className={"headerWrapper"}>
            Hello from dashboard!
        </div>
    )
};

export default Dashboard;