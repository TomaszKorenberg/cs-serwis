import React from 'react';
import Button from "@material-ui/core/Button";
import DefaultActionButtons from "../DefaultActionButtons/DefaultActionButtons";



const RepairStart = ({repairDetails}) => {

    return (
        <>

            Status "repair start":<br/>
            - W trakcie naprawy / Technik właśnie naprawia urządzenie<br/>
            <div className={"repairActionsWrapper"}>
                <div>
                    <Button variant="outlined">Zamowione części</Button><br/>
                    <Button variant="outlined">Przekazanie naprawy</Button><br/><br/>

                    <DefaultActionButtons repairDetails={repairDetails}/>
                </div>
            </div>
        </>
    );
};

export default RepairStart;