import React from 'react';
import Button from "@material-ui/core/Button";
import DefaultActionButtons from "../DefaultActionButtons/DefaultActionButtons";



const Expertise = ({repairDetails}) => {

    return (
        <>
            Status "expertise:<br/>
            - Ekspertyza / Technik wycenił naprawę. Twoj ruch, czekamy na decyzję<br/>
            <div className={"repairActionsWrapper"}>
                <div>
                    <Button variant="outlined">Rozpocznij naprawę</Button><br/><br/>
                    <DefaultActionButtons repairDetails={repairDetails}/>
                </div>
            </div>

        </>
    );
};

export default Expertise;