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

const useStyles = makeStyles({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#282c34",
        width: "40%",
        padding: '25px'
    },
    input: {
        backgroundColor: "#4e5052",
        marginTop: "10px",
        borderRadius: "5px",
        '& label.Mui-focused': {
            color: 'none',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'yellow',
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
        "&$focused": { // increase the specificity for the pseudo class
            color: "white"
        }
    }
});


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

            <div>
                <TextField
                    name={"clientID"}
                    size={"small"}
                    classes={{root: classes.input}}
                    onChange={onChange}
                    id="clientInput" label="Klient"
                    variant="outlined"
                    InputLabelProps={{className: classes.inputLabel}}/>
            </div>

            <TextField
                name={"manufacturer"}
                size={"small"}
                classes={{root: classes.input}}
                onChange={onChange}
                id="manufacturerInput"
                label="Producent"
                variant="outlined"
                InputLabelProps={{className: classes.inputLabel}}/>
            <TextField
                name={"model"}
                size={"small"}
                classes={{root: classes.input}}
                onChange={onChange}
                id="modelInput"
                label="Model"
                variant="outlined"
                InputLabelProps={{className: classes.inputLabel}}/>
            <TextField
                name={"serialNumber"}
                size={"small"}
                classes={{root: classes.input}}
                onChange={onChange}
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
                onChange={onChange}
                id="faultDesctiptionInput"
                label="Opis usterki"
                variant="outlined"
                InputLabelProps={{className: classes.inputLabel}}/>
            <div>
                <TextField
                name={"dateOfAdd"}
                size={"small"}
                classes={{root: classes.input}}
                onChange={onChange}
                id="dateOfAddInput"
                label="Data przyjęcia"
                variant="outlined"
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
                name={"isWarranty"}
                size={"small"}
                onChange={onChange}
                control={<Checkbox name="checkedC"/>}
                label="Naprawa gwarancyjna"
                InputLabelProps={{className: classes.inputLabel}}/>
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