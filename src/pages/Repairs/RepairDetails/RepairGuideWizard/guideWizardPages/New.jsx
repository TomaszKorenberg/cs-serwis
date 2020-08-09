import React from 'react';
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";



const New = ({repairDetails}) => {

    return (
        <>
            Status "new":<br/>
            - Przyjęte do serwisu / Oczekuje na rozpoczęcie naprawy<br/>
            <div>
                Naprawa ma status "Przyjęto do serwisu".<br/>
                <Button variant="outlined">Rozpocznij obsługę zlecenia</Button><br/><br/>

                Inne dostępne operacje:<br/>
                <Button variant="outlined">Dodaj komentarz</Button>
                {(repairDetails.client.email || repairDetails.client.phoneNumber)
                    ? <Button variant="outlined">Wiadomość do klienta</Button>
                    : null}
                <Button variant="outlined">Zakończ bez naprawy</Button>
            </div>
            <Divider/>
        </>
    );
};

export default New;