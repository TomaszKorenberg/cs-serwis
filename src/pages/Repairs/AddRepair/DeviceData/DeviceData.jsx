import React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import SearchDeviceInDatabase from "./SearchDeviceInDatabase/SearchDeviceInDatabase";
import "../AddRepair.scss"
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";


const DeviceData = ({onRepairChange, handleExistDeviceSelected, handleNewDeviceSelected, inputsErrorValues, handleValidateInputOnBlur, handleValidate}) => {
    const searchUrl = process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_PORT + "/devices/search?text=";
    return (

        <div className={"sectionWrapper"}>
            Dane urządzenia:
            <FormControl
                error={inputsErrorValues.deviceId}
                fullWidth={true}>
                <SearchDeviceInDatabase
                    error={inputsErrorValues.deviceId}
                    searchUrl={searchUrl}
                    handleExistDeviceSelected={handleExistDeviceSelected}
                    handleNewDeviceSelected={handleNewDeviceSelected}
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