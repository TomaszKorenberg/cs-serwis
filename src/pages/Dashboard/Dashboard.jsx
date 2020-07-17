import React, {useEffect} from "react";
import {leftMenuActions} from "../../redux/actions";
import "./Dashboard.scss"
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
        <div className={"box"}>
            <div className={"box"}>
                Nieprzeczytane wiadomości:<br/>
                - Tomek, dziś wyjdę wcześniej<br/>
                - Poinformuj klienta ze zlecenia 101 o kosztach<br/>
            </div>
            <div className={"box"}>
                Zadania na dziś:<br/>
                - (SYSTEMOWE) Naprawić zlecenie 82<br/>
                - Zamówić laser KSS213 w Impelu<br/>
            </div>
            <div className={"box"}>
                Statystyki:<br/>
                - Naprawione dziś: 3<br/>
                - Naprawioone w tym tygodniu: 15<br/>
                - Naprawioone w tym miesiącu: 84<br/>
            </div>

        </div>
    )
};

export default Dashboard;