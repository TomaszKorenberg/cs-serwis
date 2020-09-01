import React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import {Checkbox} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import moment from "moment";
import settings from "../../../../settings"
import {makeStyles} from "@material-ui/core/styles";

const dateNow = moment().locale("pl").format("YYYY-MM-DD[T]HH:mm");
const dateFuture = moment().locale("pl").add(settings.rapairs.daysToEndOfRepair, "days").format("YYYY-MM-DD[T]HH:mm");


const useStyles = makeStyles(() => ({
    sectionWrapper: {
        display: "flex",
        flexDirection: "column",
        width: "40%",
        padding: "25px",
        border: "1px solid gray",
        borderRadius: "10px",
        margin: "10px",
        maxWidth: "535px",

    }
}));

const RepairData = ({onRepairChange, handleCheckboxClick, inputsErrorValues, handleValidate}) => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.sectionWrapper}>

                Dane naprawy:

                <FormControl
                    error={inputsErrorValues.faultDescription}
                    fullWidth={true}>
                <TextField
                    name={"faultDescription"}
                    size={"small"}
                    multiline={true}
                    rows={4}
                    error={inputsErrorValues.faultDescription}
                    onBlur={handleValidate}
                    onChange={onRepairChange}
                    id="faultDesctiptionInput"
                    label="Opis usterki"
                    variant="outlined"
                    />
                    {(inputsErrorValues.faultDescription)
                        ? (<FormHelperText>Wpowadź opis usterki</FormHelperText>)
                        : null}
                </FormControl>

                    <FormControl
                        error={inputsErrorValues.dateOfAdd}
                        fullWidth={true}>
                    <TextField
                        name={"dateOfAdd"}
                        defaultValue={dateNow}
                        size={"small"}
                        onChange={onRepairChange}
                        id="dateOfAddInput"
                        label="Data przyjęcia"
                        variant="outlined"
                        required={true}
                        error={inputsErrorValues.dateOfAdd}
                        onBlur={handleValidate}
                        type="datetime-local"
                        InputLabelProps={{
                            shrink: true,
                        }}/>
                        {(inputsErrorValues.dateOfAdd)
                            ? (<FormHelperText>Wpowadź datę przyjęcia</FormHelperText>)
                            : null}
                    </FormControl>

                    <TextField
                        name={"dateOfEnd"}
                        size={"small"}

                        id="dateOfEnd"
                        label="Przewidywana data zakończenia"
                        variant="outlined"
                        type="datetime-local"
                        defaultValue={dateFuture}
                        InputLabelProps={{
                            shrink: true,
                        }}/>

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

                    onChange={onRepairChange}
                    id="commentsInput"
                    label="Uwagi"
                    variant="outlined"
                    />
            </div>
        </>
    )
};

export default RepairData