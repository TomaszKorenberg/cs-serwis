import React from 'react';
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";



const Expertise = ({repairDetails}) => {

    return (
        <>
            Status "expertise:<br/>
            - Ekspertyza / Technik wycenił naprawę. Twoj ruch, czekamy na decyzję<br/>
            <div className={"repairActionsWrapper"}>
                <div>
                    <Button variant="outlined">Rozpocznij naprawę</Button><br/><br/>
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

export default Expertise;