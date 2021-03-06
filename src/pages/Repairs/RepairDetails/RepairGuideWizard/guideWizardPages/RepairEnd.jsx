import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import DefaultActionButtons from "../DefaultActionButtons/DefaultActionButtons";
import moment from "moment";
import {makeStyles} from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import Fade from "@material-ui/core/Fade/Fade";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import {Modal} from "@material-ui/core";
import {repairStatuses} from "../../../../../constans";

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

const RepairEnd = ({repairDetails, handleUpdateRepairData}) => {
    const [openModal, setOpenModal] = useState(false);
    const [dateOfPickupValue, setDateOfPickupValue] = useState(dateNow);

    const classes = useStyles();

    const handleOnChange = (e) => {
        setDateOfPickupValue(moment(e.target.value).locale("pl").format("YYYY-MM-DD[T]HH:mm"))
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleSave = async () => {
        await handleUpdateRepairData("dateOfPickup", dateOfPickupValue);
        await handleUpdateRepairData("status", repairStatuses.end.info);
        setOpenModal(false);
    };

    const handleOpenModal = () => {
        setOpenModal(true)
    };

    return (
        <>
            Status "repair end":<br/>
            - Naprawa zakończona / Mozesz odebrac urządzenie<br/>
            <div className={"repairActionsWrapper"}>
                <div>
                    <Button variant="outlined"
                            id={"confirmDevicePickup"}
                            onClick={handleOpenModal}>Odbior sprzętu przez klienta</Button><br/>
                    <DefaultActionButtons repairDetails={repairDetails}
                                          handleUpdateRepairData={handleUpdateRepairData}/>
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
                        <h2 id="transition-modal-title">Odbiór sprzętu przez klienta</h2>
                        <FormControl

                            fullWidth={true}>
                            <TextField
                                type="datetime-local"
                                name={"dateOfPickup"}
                                onChange={handleOnChange}
                                size={"small"}
                                id="dateOfPickup"
                                label="Data odbioru urządzenia przez klienta"
                                variant="outlined"
                                defaultValue={dateOfPickupValue}
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

export default RepairEnd;