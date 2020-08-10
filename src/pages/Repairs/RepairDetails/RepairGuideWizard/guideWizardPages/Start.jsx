import React from 'react';
import Button from "@material-ui/core/Button";
import DefaultActionButtons from "../DefaultActionButtons/DefaultActionButtons";



const Start = ({repairDetails}) => {

    return (
        <>
            Status "start":<br/>
            - Rozpoczęto / Twoja naprawa rozpoczęła się i oczekuje na diagnozę<br/>
            <div className={"repairActionsWrapper"}>
                <div>
                    <Button variant="outlined">Dodaj ekspertyzę</Button><br/><br/>
                    <DefaultActionButtons repairDetails={repairDetails}/>
                </div>
            </div>
        </>
    );
};

export default Start;