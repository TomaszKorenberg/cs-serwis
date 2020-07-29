import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";


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

export default function AddNewDeviceModal({closeOrOpenModal, isModalOpen, setValue}) {
    const classes = useStyles();


    const handleClose = () => {
        closeOrOpenModal(false);
        setValue("")
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
                                // onChange={onRepairChange}
                                // error={inputsErrorValues.serialNumber}
                                // onBlur={handleValidate}
                                id="manufacturerInput"
                                label="Producent"
                                variant="outlined"
                            />

                            <TextField
                                m={200}
                                name={"model"}
                                size={"small"}
                                // onChange={onRepairChange}
                                // error={inputsErrorValues.serialNumber}
                                // onBlur={handleValidate}
                                id="modelInput"
                                label="Model"
                                variant="outlined"
                            />

                            <TextField
                                m={200}
                                name={"type"}
                                size={"small"}
                                // onChange={onRepairChange}
                                // error={inputsErrorValues.serialNumber}
                                // onBlur={handleValidate}
                                id="typeInput"
                                label="Typ urządzenie"
                                variant="outlined"
                            />

                            <TextField
                                m={200}
                                name={"description"}
                                size={"small"}
                                // onChange={onRepairChange}
                                // error={inputsErrorValues.serialNumber}
                                // onBlur={handleValidate}
                                id="descriptionInput"
                                label="Opis"
                                variant="outlined"
                            />

                        </FormControl>

                        <Button
                            fullWidth={false}
                            disableElevation={true}
                            // onClick={}
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