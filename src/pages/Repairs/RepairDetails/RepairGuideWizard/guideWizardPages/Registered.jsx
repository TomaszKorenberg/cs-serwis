import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import DefaultActionButtons from "../DefaultActionButtons/DefaultActionButtons";
import {Modal} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import Fade from "@material-ui/core/Fade/Fade";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import {makeStyles} from "@material-ui/core/styles";
import moment from "moment";

const dateNow = moment().locale("pl").format("YYYY-MM-DD[T]HH:mm");


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

const Registered = ({repairDetails, handleUpdateRepairData}) => {
    const [openModal, setOpenModal] = useState(false);
    const [dateOfConfirmValue, setDateOfConfirmValue] = useState(dateNow);

    const classes = useStyles();

    const handleOnChange = (e) => {
        setDateOfConfirmValue(moment(e.target.value).locale("pl").format("YYYY-MM-DD[T]HH:mm"))
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleSave = async () => {
        await handleUpdateRepairData("dateOfConfirm", dateOfConfirmValue);
        await handleUpdateRepairData("status", "new");
        setOpenModal(false);
    };

    const handleOpenModal = () => {
        setOpenModal(true)
    };


    return (
        <>
            Status "registered":<br/>
            - Zarejestrowano naprawę / Klient zarejestrował naprawę<br/>
            <div className={"repairActionsWrapper"}>
                <div>

                    <Button variant="outlined"
                            id={"confirmDeviceDelivery"}
                    onClick={handleOpenModal}>Potwierdź otrzymanie urządzenia</Button><br/><br/>


                    <DefaultActionButtons repairDetails={repairDetails}/>
                </div>
            </div>
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openModal}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            >
            <Fade in={openModal}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">Potwierdź otrzymanie urządzenia</h2>
                    <FormControl

                        fullWidth={true}>
                        <TextField
                            type="datetime-local"
                            name={"dateOfPickup"}
                            onChange={handleOnChange}
                            size={"small"}
                            id="dateOfPickup"
                            label="Podaj datę przyjęcia na serwis"
                            variant="outlined"
                            defaultValue={dateOfConfirmValue}
                        />

                    </FormControl>

                    <Button
                        fullWidth={false}
                        disableElevation={true}
                        onClick={() => handleSave()}
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
        </>
    );
};

export default Registered;