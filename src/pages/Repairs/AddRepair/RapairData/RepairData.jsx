import React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import {Checkbox} from "@material-ui/core";
import "../AddRepair.scss"

const RepairData = ({onRepairChange, handleCheckboxClick, classes}) => {
    return (
        <>
            <div className={"sectionWrapper"}>

                Dane naprawy:

                <TextField
                    name={"faultDescription"}
                    size={"small"}
                    multiline={true}
                    rows={4}

                    onChange={onRepairChange}
                    id="faultDesctiptionInput"
                    label="Opis usterki"
                    variant="outlined"
                    />
                <div>
                    <TextField
                        name={"dateOfAdd"}
                        size={"small"}

                        onChange={onRepairChange}
                        id="dateOfAddInput"
                        label="Data przyjęcia"
                        variant="outlined"
                        required={true}
                        type="datetime-local"
                        InputLabelProps={{
                            shrink: true,
                        }}/>

                    <TextField
                        name={"dateOfEnd"}
                        size={"small"}

                        id="dateOfEnd"
                        label="Przewidywana data zakończenia"
                        variant="outlined"
                        type="datetime-local"
                        InputLabelProps={{
                            shrink: true,
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