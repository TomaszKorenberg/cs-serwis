import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import Fade from "@material-ui/core/Fade/Fade";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import {Modal} from "@material-ui/core";

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

const DefaultActionButtons = ({repairDetails, handleUpdateRepairData}) => {
    const [openModal, setOpenModal] = useState(false);
    const [repairTechnicianComments, setRepairTechnicianComments] = useState(null);
    const [repairSummaryDescriptionValue, setRepairSummaryDescriptionValue] = useState(null);
    const [messagesSendToClientValue, setMessagesSendToClientValue] = useState(null);
    const [modalRenderData, setModalRenderData] = useState(null);



    const classes = useStyles();

    const handleOnChange = (e) => {
        switch (e.target.name) {
            case "repairTechnicianComments":
                setRepairTechnicianComments(e.target.value)
                break;
            case "messageToClient":
                setMessagesSendToClientValue(e.target.value)
                break;
            case "endOfRepair":
                setRepairSummaryDescriptionValue(e.target.value)
                break;
            default:
                break;
        }
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleSave = async () => {

        switch (modalRenderData) {
            case "add repair comment":
                await handleUpdateRepairData("repairTechnicianComments", repairTechnicianComments);
                break;
            case "write to client":
                await handleUpdateRepairData("messagesSendToClient", messagesSendToClientValue);
                break;
            case "end repair":
                await handleUpdateRepairData("status", "repair end");
                await handleUpdateRepairData("repairSummaryDescription", repairSummaryDescriptionValue);
                break;
            default:
                break;
        }
        setOpenModal(false);
    };

    const handleOpenModal = () => {
        setOpenModal(true)
    };


    return (
        <>
            Inne dostępne operacje:<br/>
            <div>
                <Button variant="outlined"
                        id={"addRepairCommentButton"}
                        onClick={() => {
                            setModalRenderData("add repair comment");
                            handleOpenModal(true)
                        }}>Dodaj komentarz</Button>
                {(repairDetails.client.email || repairDetails.client.phoneNumber)
                    ? <Button variant="outlined"
                              id={"messageToClient"}
                              onClick={() => {
                                  setModalRenderData("write to client");
                                  handleOpenModal(true)
                              }}>Wiadomość do klienta</Button>
                    : null}
                {(repairDetails.status === "repair end" || repairDetails.status === "end")
                    ? null
                    : <Button variant="outlined"
                              id={"endOfRepair"}
                              onClick={() => {
                                  setModalRenderData("end repair");
                                  handleOpenModal(true)
                              }}>Zakończ bez naprawy</Button>}
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

                        {(modalRenderData === "add repair comment") ?

                            (<>
                                <h2 id="transition-modal-title">Komentarz do naprawy</h2>
                                <FormControl

                                    fullWidth={true}>
                                    <TextField
                                        name={"repairTechnicianComments"}
                                        onChange={handleOnChange}
                                        size={"small"}
                                        multiline
                                        rows={8}
                                        id="repairTechnicianComments"
                                        label="Komentarz do naprawy"
                                        variant="outlined"
                                        defaultValue={repairDetails.repairTechnicianComments}
                                    />

                                </FormControl>
                            </>) : null}

                        {(modalRenderData === "write to client") ?

                            (<>
                                <h2 id="transition-modal-title">Wiadomość do klienta</h2>
                                <FormControl

                                    fullWidth={true}>
                                    <TextField
                                        name={"repairTechnicianComments"}
                                        onChange={handleOnChange}
                                        size={"small"}
                                        multiline
                                        rows={8}
                                        id="repairTechnicianComments"
                                        label="Wiadomość do klienta"
                                        variant="outlined"
                                        // defaultValue={repairDetails.messagesSendToClient}
                                        value={"Funkcja jeszcze nie dostępna"}
                                    />

                                </FormControl>
                            </>) : null}

                        {(modalRenderData === "end repair") ?

                            (<>
                                <h2 id="transition-modal-title">Podsumowanie naprawy</h2>
                                <FormControl

                                    fullWidth={true}>
                                    <TextField
                                        name={"repairTechnicianComments"}
                                        onChange={handleOnChange}
                                        size={"small"}
                                        multiline
                                        rows={8}
                                        id="repairTechnicianComments"
                                        label="Podsumowanie naprawy"
                                        variant="outlined"
                                    />

                                </FormControl>
                            </>) : null}

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

export default DefaultActionButtons;