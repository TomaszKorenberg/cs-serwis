import React from 'react';
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";



const WaitingForwarded = ({repairDetails}) => {

    return (
        <>
            Status "waiting forwarded":<br/>
            - Oczekująca / Przekazano do serwisu zewnętrznego (widziane tylko dla serwisu, dla klienta oczekuje na części)<br/>
            <div className={"repairActionsWrapper"}>
                <div>
                    <Button variant="outlined">Powrot sprzętu z serwisu</Button><br/><br/>
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

export default WaitingForwarded;