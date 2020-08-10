import React from 'react';
import Button from "@material-ui/core/Button";


const DefaultActionButtons = ({repairDetails}) => {

    return (
        <>
            Inne dostępne operacje:<br/>
            <div>
                <Button variant="outlined">Dodaj komentarz</Button>
                {(repairDetails.client.email || repairDetails.client.phoneNumber)
                    ? <Button variant="outlined">Wiadomość do klienta</Button>
                    : null}
                <Button variant="outlined">Zakończ bez naprawy</Button>
            </div>
        </>
    );
};

export default DefaultActionButtons;