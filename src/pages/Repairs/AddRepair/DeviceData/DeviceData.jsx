import React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import Search from "../../../../components/Search/Search";
import "../AddRepair.scss"
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";


const DeviceData = ({onRepairChange, handleDeviceSelect, inputsErrorValues, handleValidate}) => {
    const searchUrl = "http://localhost:3001/devices/search?text=";
    return (

        <div className={"sectionWrapper"}>
            Dane urządzenia:
            <FormControl
                error={inputsErrorValues.deviceId}
                fullWidth={true}>
                <Search
                    error={inputsErrorValues.deviceId}
                    searchUrl={searchUrl}
                    handleDeviceSelect={handleDeviceSelect}
                    handleValidate={handleValidate}/>
                {(inputsErrorValues.deviceId)
                    ? (<FormHelperText>Wpowadź imię</FormHelperText>)
                    : null}
            </FormControl>

            <FormControl

                error={inputsErrorValues.serialNumber}
                fullWidth={true}>
                <TextField
                    m={200}
                    name={"serialNumber"}
                    size={"small"}
                    onChange={onRepairChange}
                    error={inputsErrorValues.serialNumber}
                    onBlur={handleValidate}
                    id="serialNumberInput"
                    label="Numer seryjny"
                    variant="outlined"
                />
                {(inputsErrorValues.serialNumber)
                    ? (<FormHelperText>Wpowadź numer seryjny</FormHelperText>)
                    : null}
            </FormControl>
        </div>
    )
};

export default DeviceData;