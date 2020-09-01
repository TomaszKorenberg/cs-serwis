import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import AddNewDeviceModal from "../AddNewDeviceModal/AddNewDeviceModal";

const filter = createFilterOptions();

const SearchDeviceInDatabase = ({searchUrl, handleValidateInputOnBlur, handleExistDeviceSelected, handleNewDeviceSelected, error, handleValidate}) => {
    const [devicesList, setDevicesList] = useState([]);
    const [value, setValue] = useState(null);
    const [openNewDeviceModal, setOpenNewDeviceModal] = useState(false)

    const handleInputChange = event => {

        const text = event.target.value;
        fetch(searchUrl + text, {
            method: "GET"
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(data => {
                setDevicesList(data.devices)
            })
    };

    return (
        <div>

            <Autocomplete
                freeSolo
                onClose={(e) => handleExistDeviceSelected(e, devicesList)}
                disableClearable
                loading
                value={value}
                onChange={(event, newValue) => {
                    if (newValue.onSelect) {
                        return newValue.onSelect();
                    }
                    if (typeof newValue === "string") {
                        setValue({
                            title: newValue
                        });
                    } else if (newValue && newValue.inputValue) {
                        // Create a new value from the user input
                        setValue({
                            title: newValue.inputValue
                        });
                    } else {
                        setValue(newValue);
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    // Suggest the creation of a new value
                    if (params.inputValue !== '') {

                        filtered.push({
                            onSelect: () => (setOpenNewDeviceModal(true)),
                            inputValue: params.inputValue,
                            title: `Dodaj "${params.inputValue}" do bazy`
                        });
                    }

                    return filtered;
                }}
                getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                        return option.title;
                    }
                    // Regular option
                    return option.title;
                }}
                loadingText={"Podaj producenta i model"}
                options={devicesList.map((option) => option.manufacturer + " " + option.model)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Producent i model"
                        margin="normal"
                        // fixme: poprawić walidację aby działała
                        // error={error}
                        // onBlur={handleValidateInputOnBlur}
                        onChange={handleInputChange}
                        variant="outlined"
                        InputProps={{...params.InputProps, type: 'search'}}
                    />
                )}
            />

            <AddNewDeviceModal isModalOpen={openNewDeviceModal}
                               openModal={setOpenNewDeviceModal}
                               setValue={setValue}
                               handleNewDeviceSelected={handleNewDeviceSelected}
                               onChange={handleInputChange}/>

        </div>
    )
};

export default SearchDeviceInDatabase