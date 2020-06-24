import React, {useReducer, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {addRepair} from "../../../redux/operations";
import {useDispatch} from "react-redux";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Checkbox} from "@material-ui/core";
import NewClient from "../NewClient/NewClient";
import {Redirect} from "react-router";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const initialRepairState = {
    deviceId: 0,
    serialNumber: "",
    faultDescription: "",
    dateOfAdd: "",
    clientId: 0,
    isWarranty: false,
    comments: "",
    assignedEmployee: ""
};

const useStyles = makeStyles({
    wrapper: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#282c34",
        width: "100%",
    },
    inputsWrapper: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#282c34",
        width: "500px",
        padding: '25px',
        border: "1px solid gray",
        borderRadius: "10px",
        margin: "10px"

    },
    clientWrapper: {
        backgroundColor: "#282c34",
        margin: "10px"
    },
    input: {
        backgroundColor: "#4e5052",
        marginTop: "10px",
        borderRadius: "5px",
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'none',
            },
            '&:hover fieldset': {
                borderColor: 'gray',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'gray',
            },
        },
    },
    inputLabel: {
        color: "white",
    }
});

const reducer = (state, {field, value}) => {
    return {
        ...state,
        [field]: value
    }
};


export default function AddRepair() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [state, dispatchState] = useReducer(reducer, initialRepairState);
    const [redirect, setRedirect] = useState(false);
    const [assignedEmployee, setAssignedEmployee] = React.useState('');



    const onRepairChange = e => {
        dispatchState({field: e.target.name, value: e.target.value});
    };

    const handleCheckboxClick = (e) => {
        e.target.value = e.target.checked;
    };

    const handleSelectChange = (e) => {
        setAssignedEmployee(e.target.value);
    };

    const handleAddRepair = (e) => {
        e.preventDefault();
        dispatch(addRepair(
            {
                deviceId: state.deviceId,
                serialNumber: state.serialNumber,
                faultDescription: state.faultDescription,
                dateOfAdd: state.dateOfAdd,
                clientId: state.clientId,
                isWarranty: state.isWarranty,
                comments: state.comments,
                assignedEmployee: state.assignedEmployee
            })
        );
        setRedirect(true)
    };

    return (
        <div>
            {redirect
                ? <Redirect to={"/repairs"}/>
                : null
            }


            <h2 id="transition-modal-title">Dodaj nową naprawę</h2>
            <div className={classes.wrapper}>

                <div className={classes.inputsWrapper}>


                    <TextField
                        required={true}
                        name={"manufacturer"}
                        size={"small"}
                        classes={{root: classes.input}}
                        onChange={onRepairChange}
                        id="manufacturerInput"
                        label="Producent"
                        variant="outlined"
                        InputLabelProps={{className: classes.inputLabel}}/>
                    <TextField
                        name={"model"}
                        size={"small"}
                        classes={{root: classes.input}}
                        onChange={onRepairChange}
                        id="modelInput"
                        label="Model"
                        variant="outlined"
                        InputLabelProps={{className: classes.inputLabel}}/>
                    <TextField
                        name={"serialNumber"}
                        size={"small"}
                        classes={{root: classes.input}}
                        onChange={onRepairChange}
                        id="serialNumberInput"
                        label="Numer seryjny"
                        variant="outlined"
                        InputLabelProps={{className: classes.inputLabel}}/>
                    <TextField
                        name={"faultDescription"}
                        size={"small"}
                        multiline={true}
                        rows={4}
                        classes={{root: classes.input}}
                        onChange={onRepairChange}
                        id="faultDesctiptionInput"
                        label="Opis usterki"
                        variant="outlined"
                        InputLabelProps={{className: classes.inputLabel}}/>
                    <div>
                        <TextField
                            name={"dateOfAdd"}
                            size={"small"}
                            classes={{root: classes.input}}
                            onChange={onRepairChange}
                            id="dateOfAddInput"
                            label="Data przyjęcia"
                            variant="outlined"
                            required={true}
                            type="datetime-local"
                            InputLabelProps={{
                                shrink: true,
                                className: classes.inputLabel
                            }}/>

                        <TextField
                            name={"dateOfEnd"}
                            size={"small"}
                            classes={{root: classes.input}}
                            id="dateOfEnd"
                            label="Przewidywana data zakończenia"
                            variant="outlined"
                            type="datetime-local"
                            InputLabelProps={{
                                shrink: true,
                                className: classes.inputLabel
                            }}/>
                    </div>
                    <FormControlLabel
                        name={"isWarrantyLabel"}
                        size={"small"}
                        onClick={handleCheckboxClick}
                        onChange={onRepairChange}
                        control={<Checkbox name="isWarranty"/>}
                        label="Naprawa gwarancyjna"/>

                    <TextField
                        name={"comments"}
                        size={"small"}
                        multiline={true}
                        rows={4}
                        classes={{root: classes.input}}
                        onChange={onRepairChange}
                        id="commentsInput"
                        label="Uwagi"
                        variant="outlined"
                        InputLabelProps={{className: classes.inputLabel}}/>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="Pracownik">Pracownik</InputLabel>
                        <Select
                            labelId="Pracownik"
                            id="demo-simple-select"
                            name={"assignedEmployee"}
                            value={assignedEmployee}
                            onChange={onRepairChange}
                            onClick={handleSelectChange}
                        >
                            <MenuItem value={"Tomasz Korenberg"}>Tomasz Korenberg</MenuItem>
                            <MenuItem value={"Jędrzej Artymiak"}>Jędrzej Artymiak</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className={classes.clientWrapper}>
                    <NewClient/>
                    <Button
                        fullWidth={false}
                        disableElevation={true}
                        onClick={handleAddRepair}
                        variant="outlined"
                        size={"large"}
                    >Dodaj</Button>
                </div>
            </div>
        </div>
    );
}