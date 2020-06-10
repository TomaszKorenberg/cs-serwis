import React, {useReducer} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {addRepair} from "../../../redux/operations";
import {useDispatch} from "react-redux";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Checkbox} from "@material-ui/core";
import NewClient from "../NewClient/NewClient";

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
        margin:"10px"
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
        <div>
        <h2 id="transition-modal-title">Dodaj nową naprawę</h2>
        <div className={classes.wrapper}>

            <div className={classes.inputsWrapper}>


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
                name={"isWarranty"}
                size={"small"}
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

            <div className={classes.clientWrapper}>
                <NewClient onChange={onChange}/>
            </div>
        </div>
</div>
    );
}