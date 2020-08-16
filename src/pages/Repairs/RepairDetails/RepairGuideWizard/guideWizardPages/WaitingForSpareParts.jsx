import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import DefaultActionButtons from "../DefaultActionButtons/DefaultActionButtons";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import Fade from "@material-ui/core/Fade/Fade";
import {Modal} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";



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

const WaitingForSpareParts = ({repairDetails, handleUpdateRepairData}) => {

    const [openModal, setOpenModal] = useState(false);

    const classes = useStyles();

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleSave = async () => {
        await handleUpdateRepairData("status", "repair start");
        setOpenModal(false);
    };

    const handleOpenModal = () => {
        setOpenModal(true)
    };

    return (
        <>
            Status "waiting spare parts":<br/>
            - Oczekująca / Twoja naprawa oczekuje na części<br/>
            <div className={"repairActionsWrapper"}>
                <div>
                    <Button variant="outlined"
                            id={"confirmPartsDelivery"}
                            onClick={handleOpenModal}>Dostawa części</Button><br/>
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
                        <h2 id="transition-modal-title">Dostawa części</h2>

                        Potwierdzasz dostawę poniższych części? <br/><br/>

                        {repairDetails.partsOrdered}<br/><br/>

                        <Button
                            fullWidth={false}
                            disableElevation={true}
                            onClick={() => handleSave()}
                            variant="outlined"
                            size={"medium"}
                        >Tak</Button>
                        <Button
                            fullWidth={false}
                            disableElevation={true}
                            onClick={handleClose}
                            variant="outlined"
                            size={"medium"}
                        >Nie</Button>
                    </div>
                </Fade>
            </Modal>
        </>
    );
};

export default WaitingForSpareParts;