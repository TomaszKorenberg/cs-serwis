import React from 'react';
import Button from "@material-ui/core/Button";
import DefaultActionButtons from "../DefaultActionButtons/DefaultActionButtons";



const New = ({repairDetails}) => {

    return (
        <>
            Status "new":<br/>
            - Przyjęte do serwisu / Oczekuje na rozpoczęcie naprawy<br/>
            <div>
                Naprawa ma status "Przyjęto do serwisu".<br/>
                <Button variant="outlined">Rozpocznij obsługę zlecenia</Button><br/><br/>

                <DefaultActionButtons repairDetails={repairDetails}/>
            </div>
        </>
    );
};

export default New;