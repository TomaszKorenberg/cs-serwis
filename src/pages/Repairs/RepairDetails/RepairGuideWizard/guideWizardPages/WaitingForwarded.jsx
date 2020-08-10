import React from 'react';
import Button from "@material-ui/core/Button";
import DefaultActionButtons from "../DefaultActionButtons/DefaultActionButtons";



const WaitingForwarded = ({repairDetails}) => {

    return (
        <>
            Status "waiting forwarded":<br/>
            - Oczekująca / Przekazano do serwisu zewnętrznego (widziane tylko dla serwisu, dla klienta oczekuje na części)<br/>
            <div className={"repairActionsWrapper"}>
                <div>
                    <Button variant="outlined">Powrot sprzętu z serwisu</Button><br/><br/>
                    <DefaultActionButtons repairDetails={repairDetails}/>
                </div>
            </div>
        </>
    );
};

export default WaitingForwarded;