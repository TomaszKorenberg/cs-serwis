import React from 'react';
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";



const RepairEnd = ({repairDetails}) => {

    return (
        <>
            Status "repair end":<br/>
            - Naprawa zakończona / Mozesz odebrac urządzenie<br/>
            <div className={"repairActionsWrapper"}>
                <div>
                    <Button variant="outlined">Odbior sprzętu przez klienta</Button><br/>
                </div>
            </div>
            <Divider/>
        </>
    );
};

export default RepairEnd;