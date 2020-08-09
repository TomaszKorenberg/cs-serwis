import React from 'react';
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";



const Registered = ({repairDetails}) => {

    return (
        <>
            Status "registered":<br/>
            - Zarejestrowano naprawę / Klient zarejestrował naprawę<br/>
            <div className={"repairActionsWrapper"}>
                <div>
                    <Button variant="outlined">Przyjęto do serwisu</Button><br/><br/>
                    Inne dostępne operacje:<br/>
                    <Button variant="outlined">Dodaj komentarz</Button>
                    {(repairDetails.client.email || repairDetails.client.phoneNumber)
                        ? <Button variant="outlined">Wiadomość do klienta</Button>
                        : null}
                </div>
            </div>
            <Divider/>
        </>
    );
};

export default Registered;