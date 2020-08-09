import React from 'react';
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";



const RepairStart = ({repairDetails}) => {

    return (
        <>

            Status "repair start":<br/>
            - W trakcie naprawy / Technik właśnie naprawia urządzenie<br/>
            <div className={"repairActionsWrapper"}>
                <div>
                    <Button variant="outlined">Zamowione części</Button><br/>
                    <Button variant="outlined">Przekazanie naprawy</Button><br/><br/>
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

export default RepairStart;