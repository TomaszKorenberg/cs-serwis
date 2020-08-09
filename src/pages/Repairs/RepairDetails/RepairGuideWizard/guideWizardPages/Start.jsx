import React from 'react';
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";



const Start = ({repairDetails}) => {

    return (
        <>
            Status "start":<br/>
            - Rozpoczęto / Twoja naprawa rozpoczęła się i oczekuje na diagnozę<br/>
            <div className={"repairActionsWrapper"}>
                <div>
                    <Button variant="outlined">Dodaj ekspertyzę</Button><br/><br/>
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

export default Start;