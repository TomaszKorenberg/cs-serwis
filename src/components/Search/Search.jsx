import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Search = ({searchUrl, handleDeviceSelect, error, handleValidate}) => {
    const [devicesList, setDevicesList] = useState([]);

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
                onClose={(e) => handleDeviceSelect(e, devicesList)}
                disableClearable
                loading
                loadingText={"Podaj producenta i model"}
                options={devicesList.map((option) => option.manufacturer + " " + option.model)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Producent i model"
                        margin="normal"
                        // fixme: poprawić walidację aby działała
                        // error={error}
                        // onBlur={handleValidate}
                        onChange={handleInputChange}
                        variant="outlined"
                        InputProps={{...params.InputProps, type: 'search'}}
                    />
                )}
            />
        </div>
    )
};

export default Search