import React, {useEffect} from "react";
import {leftMenuActions} from "../../redux/actions";
import {makeStyles} from "@material-ui/core/styles";
const leftMenuItems = [
    {path: "/dashboard", text:"Pulpit"},
    {path: "/dashboard/todo", text:"Zadania"},
    {path: "/dashboard/settings", text:"Ustawiania"},

];

const useStyles = makeStyles(() => ({
    box: {
    borderRadius: "10px",
    border: "1px solid gray",
    padding: "5px",
    margin: "10px",
}
}));

const Dashboard = () => {
    const classes = useStyles();

    useEffect(() => {
        leftMenuActions.setLeftMenu([...leftMenuItems]);
    }, []);

    return(
        //todo:
        //- wiadomości od innych użytkowników
        //- Zadania na dziś automatyczne i od administratora wyświetlane wg. priorytetu
        //- statystyki napraw z dnia/tygodnia/od początku miesiąca
        //- notatki
        <div className={classes.box}>
            <div className={classes.box}>
                Nieprzeczytane wiadomości:<br/>
                - Tomek, dziś wyjdę wcześniej<br/>
                - Poinformuj klienta ze zlecenia 101 o kosztach<br/>
            </div>
            <div className={classes.box}>
                Zadania na dziś:<br/>
                - (SYSTEMOWE) Naprawić zlecenie 82<br/>
                - Posprzątać recepcję<br/>
            </div>
            <div className={classes.box}>
                Statystyki:<br/>
                - Naprawione dziś: 3<br/>
                - Naprawioone w tym tygodniu: 15<br/>
                - Naprawioone w tym miesiącu: 84<br/>
            </div>
            <div className={classes.box}>
                Lista zakupów:<br/>
                - KSS-213 1szt.<br/>
                - 2SC5200 10szt.<br/>
                - DCV1010 3szt.<br/>
            </div>

        </div>
    )
};

export default Dashboard;