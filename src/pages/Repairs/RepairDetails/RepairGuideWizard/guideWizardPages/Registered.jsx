import React from 'react';
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import DefaultActionButtons from "../DefaultActionButtons/DefaultActionButtons";



const Registered = ({repairDetails}) => {

    return (
        <>
            Status "registered":<br/>
            - Zarejestrowano naprawę / Klient zarejestrował naprawę<br/>
            <div className={"repairActionsWrapper"}>
                <div>
                    <Button variant="outlined">Przyjmij do serwisu</Button><br/><br/>
                    <DefaultActionButtons repairDetails={repairDetails}/>
                </div>
            </div>
            <Divider/>
        </>
    );
};

export default Registered;