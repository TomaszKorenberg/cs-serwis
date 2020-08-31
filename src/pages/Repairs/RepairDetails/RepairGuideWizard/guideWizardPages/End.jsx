import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import Fade from "@material-ui/core/Fade/Fade";
import {Modal} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {repairStatuses} from "../../../../../constans";


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


const End = ({repairDetails, handleUpdateRepairData}) => {
    const [openModal, setOpenModal] = useState(false);

    const classes = useStyles();


    const handleClose = () => {
        setOpenModal(false);
    };

    const handleSave = async () => {
        await handleUpdateRepairData("status", repairStatuses.archive.info);
        setOpenModal(false);
    };

    const handleOpenModal = () => {
        setOpenModal(true)
    };
    return (
        <>
            Status "end":<br/>
            - Odebrane / To tyle z naszej strony. Zapraszamy po odbiór, (oby nie) do zobaczenia! :)<br/>
            <div className={"repairActionsWrapper"}>
                <Button variant="outlined"
                        id={"confirmDeviceDelivery"}
                        onClick={handleOpenModal}>Przenieś naprawę do archiwum</Button><br/><br/>
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
                        <h2 id="transition-modal-title">Przenieś naprawę do archiwum</h2>

                        Czy przenieść naprawę do archiwum?<br/><br/>

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

export default End;