import React from 'react';
import Button from "@material-ui/core/Button";
import DefaultActionButtons from "../DefaultActionButtons/DefaultActionButtons";



const WaitingForSpareParts = ({repairDetails}) => {

    return (
        <>
            Status "waiting spare parts":<br/>
            - Oczekująca / Twoja naprawa oczekuje na części<br/>
            <div className={"repairActionsWrapper"}>
                <div>
                    <Button variant="outlined">Przyszły części</Button><br/>
                    <Button variant="outlined">Naprawiono</Button><br/><br/>
                    <DefaultActionButtons repairDetails={repairDetails}/>
                </div>
            </div>
        </>
    );
};

export default WaitingForSpareParts;