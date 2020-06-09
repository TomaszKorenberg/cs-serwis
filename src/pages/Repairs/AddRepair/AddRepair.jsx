import React, {useReducer} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {addRepair} from "../../../redux/operations";
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
    wrapper: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#282c34",
        width: "600px",
        padding: '25px'
    },
    input: {
        backgroundColor: "#4e5052",
        marginTop: "10px",
        borderRadius: "5px",
    }
}));


export default function AddRepair() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [state, dispatchState] = useReducer(reducer, initialState);

    const onChange = e => {
        dispatchState({field: e.target.name, value: e.target.value});
        console.log(e.target.value)
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

    };

    return (

        <div className={classes.wrapper}>
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
                href={"/repairs"}
                disableElevation={true}
                onClick={handleAddRepair}
                variant="outlined"
                size={"large"}
            >Dodaj</Button>
        </div>

    );
}