import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

// walidacja obowiązkowych pól
// stylowanie

const initialInputsErrorValue = {
    manufacturer: false,
    model: false,
};

const initialNewDeviceInputValues = {
    manufacturer: "",
    model: ""
};


const addNewDevice = async (data) => {
    return await fetch("http://localhost:3001/devices/adddevice", {
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
}));

export default function AddNewDeviceModal({openModal, isModalOpen, setValue, handleNewDeviceSelected}) {
    const [newDeviceDataInputs, setNewDeviceDataInputs] = useState(initialNewDeviceInputValues);
    const [inputsErrorValues, setInputsErrorValues] = useState(initialInputsErrorValue);
    const [isAnyRequiredInputIsEmpty, setIsAnyRequiredInputIsEmpty] = useState(true);


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
        validateAllEmptyInputs();

        if(isAnyRequiredInputIsEmpty){
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

    const validateAllEmptyInputs = () => {
        let emptyInput = false;
        setIsAnyRequiredInputIsEmpty(false);
        const errorData = {...inputsErrorValues};



        for (let item in errorData) {
            if (!newDeviceDataInputs || !newDeviceDataInputs[item]) {
                errorData[item] = true;
                setInputsErrorValues(errorData);
                emptyInput = true;
            }
        }
        setIsAnyRequiredInputIsEmpty(emptyInput);

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
                                name={"type"}
                                size={"small"}
                                onChange={handleOnChange}
                                id="typeInput"
                                label="Typ urządzenie"
                                variant="outlined"
                            />

                            <TextField
                                m={200}
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