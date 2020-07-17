import React from 'react';
import Button from '@material-ui/core/Button';
import "../RepairDetails.scss"


const RepairActions = ({repairDetails}) => {
    console.log(repairDetails)
    return (
        <div className={"repairActionsWrapper"}>
            {(repairDetails.status === "new")
                ? <div>
                    <Button variant="outlined">Rozpocznij naprawę</Button>
                    <Button variant="outlined">Dodaj komentarz</Button>
                    {(repairDetails.client.email)
                    ? <Button variant="outlined">Wiadomość do klienta</Button>
                    : null}
                    <Button variant="outlined">Edytuj naprawę</Button>
                    <Button variant="outlined">Zakończ bez naprawy</Button>
                </div>
                : null}
        </div>
    );
};

export default RepairActions;