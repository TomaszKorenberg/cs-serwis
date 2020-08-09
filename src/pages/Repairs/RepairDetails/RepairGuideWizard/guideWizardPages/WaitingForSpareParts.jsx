import React from 'react';
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";



const WaitingForSpareParts = ({repairDetails}) => {

    return (
        <>
            Status "waiting spare parts":<br/>
            - Oczekująca / Twoja naprawa oczekuje na części<br/>
            <div className={"repairActionsWrapper"}>
                <div>
                    <Button variant="outlined">Przyszły części</Button><br/>
                    <Button variant="outlined">Naprawiono</Button><br/><br/>
                    Inne dostępne operacje:<br/>
                    <Button variant="outlined">Dodaj komentarz</Button>
                    {(repairDetails.client.email || repairDetails.client.phoneNumber)
                        ? <Button variant="outlined">Wiadomość do klienta</Button>
                        : null}
                    <Button variant="outlined">Zakończ bez naprawy</Button>
                </div>
            </div>
            <Divider/>
        </>
    );
};

export default WaitingForSpareParts;