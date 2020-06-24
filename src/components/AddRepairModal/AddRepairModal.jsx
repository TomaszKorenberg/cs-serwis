import React, {useReducer} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {addRepair} from "../../redux/operations";
import {useDispatch} from "react-redux";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Checkbox} from "@material-ui/core";

const initialState = {
    manufacturer: "",
    model: "",
    serialNumber: "",
    faultDescription: "",
    dateOfAdd: "",
    clientID: "",
    isWarranty: false,
};

const reducer = (state, {field, value}) => {
    return {
        ...state,
        [field]: value
    }
};

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    paper: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#282c34",
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: "600px",
    },
    input: {
        backgroundColor: "#4e5052",
        marginTop: "10px",
        borderRadius: "5px"
    }
}));


export default function AddRepairModal() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    // const [manufacturer, setManufacturer] = useState(null);
    // const [model, setModel] = useState(null);
    // const [serialNumber, setSerialNumber] = useState(null);
    // const [faultDescription, setFaultDescription] = useState(null);
    // const [dateOfAdd, setDateOfAdd] = useState(null);
    // const [clientID, setClientID] = useState(null);
    // const [isWarranty, setIsWarranty] = useState(false);
    const [state, dispatchState] = useReducer(reducer, initialState);

    // const onManufacturerChange = ({target: {value}}) => setManufacturer(value);
    // const onModelChange = ({target: {value}}) => setModel(value);
    // const onSerialNumberChange = ({target: {value}}) => setSerialNumber(value);
    // const onFaultDescriptionChange = ({target: {value}}) => setFaultDescription(value);
    // const onDateOfAddChange = ({target: {value}}) => setDateOfAdd(value);
    // const onClientIDChange = ({target: {value}}) => setClientID(value);
    // const onIsWarrantyChange = ({target: {value}}) => setIsWarranty(value);

    const onChange = e => {
        dispatchState({field: e.target.name, value: e.target.value});
    };


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddRepair = () => {
        dispatch(addRepair(
            {
                manufacturer: state.manufacturer,
                model: state.model,
                serialNumber: state.serialNumber,
                faultDescription: state.faultDescription,
                dateOfAdd: state.dateOfAdd,
                clientID: state.clientID,
                isWarranty: state.isWarranty,
            })
        );
        handleClose();

    };

    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Dodaj nową naprawę
            </button>
            <Modal
                disableEscapeKeyDown={true}
                disableBackdropClick={true}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Dodaj nową naprawę</h2>
                        <TextField
                            name={"manufacturer"}
                            classes={{root: classes.input}}
                            onChange={onChange}
                            id="manufacturerInput"
                            label="Producent"
                            variant="outlined"/>
                        <TextField
                            name={"model"}
                            classes={{root: classes.input}}
                            onChange={onChange}
                            id="modelInput"
                            label="Model"
                            variant="outlined"/>
                        <TextField
                            name={"serialNumber"}
                            classes={{root: classes.input}}
                            onChange={onChange}
                            id="serialNumberInput"
                            label="Numer seryjny"
                            variant="outlined"/>
                        <TextField
                            name={"faultDescription"}
                            classes={{root: classes.input}}
                            onChange={onChange}
                            id="faultDesctiptionInput"
                            label="Opis usterki"
                            variant="outlined"/>
                        <TextField
                            name={"dateOfAdd"}
                            classes={{root: classes.input}}
                            onChange={onChange}
                            id="dateOfAddInput"
                            label="Data przyjęcia"
                            variant="outlined"
                            type="datetime-local"
                            defaultValue=""
                            InputLabelProps={{
                                shrink: true,
                            }}/>
                        <TextField
                            name={"clientID"}
                            classes={{root: classes.input}}
                            onChange={onChange}
                            id="clientInput" label="Klient"
                            variant="outlined"/>
                        <FormControlLabel
                            name={"isWarranty"}
                            onChange={onChange}
                            control={<Checkbox name="checkedC"/>}
                            label="Naprawa gwarancyjna"/>
                        <Button
                            fullWidth={false}
                            disableElevation={true}
                            onClick={handleClose}
                            variant="outlined"
                            size={"large"}
                        >Zamknij</Button>
                        <Button
                            fullWidth={false}
                            disableElevation={true}
                            onClick={handleAddRepair}
                            variant="outlined"
                            size={"large"}
                        >Dodaj</Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}