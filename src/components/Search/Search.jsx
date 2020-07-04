import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Search = () => {
    const [selectedDeviceValue, setSelectedDeviceValue] = useState(null);
    const [devicesList, setDevicesList] = useState([]);

    const handleOnClose = (e) => {
        let selectedDevice = (devicesList.filter(item => {
            return item.manufacturer + " " + item.model === e.target.textContent
        })[0]);
        setSelectedDeviceValue(selectedDevice)
    }

    const handleInputChange = event => {
        const text = event.target.value;
        fetch(`http://127.0.0.1:3001/devices/search?text=${text}`, {
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

    }

    return (
        <div>

            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                onClose={handleOnClose}
                disableClearable
                loading
                loadingText={"Podaj producenta i model"}
                options={devicesList.map((option) => option.manufacturer + " " + option.model)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Producent i model"
                        margin="normal"
                        onChange={handleInputChange}
                        variant="outlined"
                        InputProps={{...params.InputProps, type: 'search'}}
                    />
                )}
            />
            {(selectedDeviceValue) ? "Model: " + selectedDeviceValue.model + "Producent: " + selectedDeviceValue.manufacturer : "Brak"}
        </div>
    )
};

export default Search