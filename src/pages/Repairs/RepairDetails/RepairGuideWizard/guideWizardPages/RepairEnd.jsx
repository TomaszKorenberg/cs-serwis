import React from 'react';
import Button from "@material-ui/core/Button";
import DefaultActionButtons from "../DefaultActionButtons/DefaultActionButtons";



const RepairEnd = ({repairDetails}) => {

    return (
        <>
            Status "repair end":<br/>
            - Naprawa zakończona / Mozesz odebrac urządzenie<br/>
            <div className={"repairActionsWrapper"}>
                <div>
                    <Button variant="outlined">Odbior sprzętu przez klienta</Button><br/>
                    <DefaultActionButtons repairDetails={repairDetails}/>
                </div>
            </div>
        </>
    );
};

export default RepairEnd;