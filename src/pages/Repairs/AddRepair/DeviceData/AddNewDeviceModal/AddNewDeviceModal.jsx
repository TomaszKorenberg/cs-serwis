import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";


const initialInputsErrorValue = {
    manufacturer: false,
    model: false,
};

const initialNewDeviceInputValues = {
    manufacturer: "",
    model: ""
};


const addNewDevice = async (data) => {
    return await fetch(process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_PORT + "/devices/adddevice", {
        method: "POST",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(data),
    }).then(response => response.json());
};


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    input: {
        marginBottom: "10px"
    }
}));

export default function AddNewDeviceModal({openModal, isModalOpen, setValue, handleNewDeviceSelected}) {
    const [newDeviceDataInputs, setNewDeviceDataInputs] = useState(initialNewDeviceInputValues);
    const [inputsErrorValues, setInputsErrorValues] = useState(initialInputsErrorValue);


    const classes = useStyles();


    const handleClose = () => {
        openModal(false);
        setInputsErrorValues(initialInputsErrorValue);
        setValue("");
    };

    const handleOnChange = (e) => {
        setNewDeviceDataInputs({...newDeviceDataInputs, [e.target.name]: e.target.value});
        console.log(newDeviceDataInputs);
    };

    const handleSave = async () => {
        let isAnyInputEmpty = await validateAllEmptyInputs();

        if(isAnyInputEmpty){
            return
        }

        const newDeviceData = await addNewDevice(newDeviceDataInputs);
        setValue(newDeviceData[1].manufacturer + " " + newDeviceData[1].model);
        handleNewDeviceSelected(newDeviceData[1].deviceId);
        openModal(false);
    };

    const handleValidateInputOnBlur = (e) => {
        if (!e.target.value) {
            setInputsErrorValues({
                ...inputsErrorValues,
                [e.target.name]: true
            })
        } else {
            setInputsErrorValues({
                ...inputsErrorValues,
                [e.target.name]: false
            })
        }
    };

    const validateAllEmptyInputs = async () => {
        let emptyInput = false;
        const errorData = {...inputsErrorValues};
        console.log(inputsErrorValues);


        for (let item in errorData) {
            if (!newDeviceDataInputs || !newDeviceDataInputs[item]) {
                errorData[item] = true;
                setInputsErrorValues(errorData);
                emptyInput = true;
            }
        }
        return emptyInput
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={isModalOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isModalOpen}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Dodaj nowe urządzenie:</h2>
                        <FormControl

                            fullWidth={true}>
                            <TextField
                                m={200}
                                className={classes.input}
                                name={"manufacturer"}
                                size={"small"}
                                onChange={handleOnChange}
                                error={inputsErrorValues.manufacturer}
                                onBlur={handleValidateInputOnBlur}
                                id="manufacturerInput"
                                label="Producent"
                                variant="outlined"
                            />
                            {(inputsErrorValues.manufacturer)
                                ? (<FormHelperText>Wpowadź producenta</FormHelperText>)
                                : null}

                            <TextField
                                m={200}
                                className={classes.input}
                                name={"model"}
                                size={"small"}
                                onChange={handleOnChange}
                                error={inputsErrorValues.model}
                                onBlur={handleValidateInputOnBlur}
                                id="modelInput"
                                label="Model"
                                variant="outlined"
                            />
                            {(inputsErrorValues.model)
                                ? (<FormHelperText>Wpowadź model</FormHelperText>)
                                : null}

                            <TextField
                                m={200}
                                className={classes.input}
                                name={"type"}
                                size={"small"}
                                onChange={handleOnChange}
                                id="typeInput"
                                label="Typ urządzenie"
                                variant="outlined"
                            />

                            <TextField
                                m={200}
                                className={classes.input}
                                name={"description"}
                                size={"small"}
                                onChange={handleOnChange}
                                id="descriptionInput"
                                label="Opis"
                                variant="outlined"
                            />

                        </FormControl>

                        <Button
                            fullWidth={false}
                            disableElevation={true}
                            onClick={handleSave}
                            variant="outlined"
                            size={"medium"}
                        >Dodaj</Button>
                        <Button
                            fullWidth={false}
                            disableElevation={true}
                            onClick={handleClose}
                            variant="outlined"
                            size={"medium"}
                        >Zamknij</Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}