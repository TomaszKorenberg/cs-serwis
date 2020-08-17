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

const WaitingForwarded = ({repairDetails, handleUpdateRepairData}) => {


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
            Status "waiting forwarded":<br/>
            - Oczekująca / Przekazano do serwisu zewnętrznego (widziane tylko dla serwisu, dla klienta oczekuje na części)<br/>
            <div className={"repairActionsWrapper"}>
                <div>
                    <Button variant="outlined"
                            id={"confirmPartsDelivery"}
                            onClick={handleOpenModal}>Powrot sprzętu z serwisu</Button><br/><br/>
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
                        <h2 id="transition-modal-title">Powrot sprzętu z serwisu</h2>

                        Potwierdzasz powrót sprzętu z serwisu zewnętrznego?<br/><br/>

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

export default WaitingForwarded;