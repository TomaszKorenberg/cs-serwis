import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import DefaultActionButtons from "../DefaultActionButtons/DefaultActionButtons";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import Fade from "@material-ui/core/Fade/Fade";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import {Modal} from "@material-ui/core";
import moment from "moment";
import {makeStyles} from "@material-ui/core/styles";

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

const New = ({repairDetails, handleUpdateRepairData}) => {
    const [openModal, setOpenModal] = useState(false);
    const [dateOfStartProcessingValue, setDateOfStartProcessingValue] = useState(dateNow);

    const classes = useStyles();

    const handleOnChange = (e) => {
        setDateOfStartProcessingValue(moment(e.target.value).locale("pl").format("YYYY-MM-DD[T]HH:mm"))
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleSave = async () => {
        await handleUpdateRepairData("dateOfProcessing", dateOfStartProcessingValue);
        await handleUpdateRepairData("status", "start");
        setOpenModal(false);
    };

    const handleOpenModal = () => {
        setOpenModal(true)
    };

    return (
        <>
            Status "new":<br/>
            - Przyjęte do serwisu / Oczekuje na naprawę<br/>
            <div className={"repairActionsWrapper"}>
                <div>
                Naprawa ma status "Przyjęto do serwisu".<br/>
                <Button variant="outlined"
                        id={"confirmDeviceDelivery"}
                        onClick={handleOpenModal}>Rozpocznij obsługę zlecenia</Button><br/><br/>

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
                        <h2 id="transition-modal-title">Rozpocznij obsługę zlecenia</h2>
                        <FormControl

                            fullWidth={true}>
                            <TextField
                                type="datetime-local"
                                name={"dateOfPickup"}
                                onChange={handleOnChange}
                                size={"small"}
                                id="dateOfPickup"
                                label="Podaj datę rozpoczęcia obsługi zlecenia"
                                variant="outlined"
                                defaultValue={dateOfStartProcessingValue}
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

export default New;