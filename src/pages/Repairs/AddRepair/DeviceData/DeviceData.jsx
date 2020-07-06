import React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import Search from "../../../../components/Search/Search";
import "../AddRepair.scss"

const DeviceData = ({onRepairChange}) => {
    return (

        <div className={"sectionWrapper"}>
            Dane urządzenia:

            <Search/>

            <TextField
                name={"serialNumber"}
                size={"small"}
                onChange={onRepairChange}
                id="serialNumberInput"
                label="Numer seryjny"
                variant="outlined"
                />
        </div>
    )
};

export default DeviceData;