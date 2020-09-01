import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";

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

const EmployeeData = ({onRepairChange, handleSelectChange, assignedEmployee}) => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.sectionWrapper}>
                Pracownik przypisany do naprawy:
                <FormControl >
                    <InputLabel id="Pracownik">Wybierz pracownika</InputLabel>
                    <Select
                        labelId="Pracownik"
                        id="demo-simple-select"
                        name={"assignedEmployee"}
                        value={assignedEmployee}
                        onChange={onRepairChange}
                        onClick={handleSelectChange}
                    >
                        <MenuItem value={"Tomasz Korenberg"}>Tomasz Korenberg</MenuItem>
                        {
                            //fixme: poprawić by pobierało pracowników z bazy danych - zapytanie do bazy przy ładownianu, a później .map()
                        }
                        <MenuItem value={"Jędrzej Artymiak"}>Jędrzej Artymiak</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </>
    )
};

export default EmployeeData