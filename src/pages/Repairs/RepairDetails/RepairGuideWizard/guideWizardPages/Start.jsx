import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import DefaultActionButtons from "../DefaultActionButtons/DefaultActionButtons";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import Fade from "@material-ui/core/Fade/Fade";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import {Modal} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import InputAdornment from '@material-ui/core/InputAdornment';


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

const Start = ({repairDetails, handleUpdateRepairData}) => {

    const [openModal, setOpenModal] = useState(false);
    const [expertiseValue, setExpertiseValue] = useState("");
    const [expectedCostValue, setExpectedCost] = useState("");


    const classes = useStyles();

    const handleOnExpertiseChange = (e) => {
        setExpertiseValue(e.target.value)
    };

    const handleOnExpectedCostChange = (e) => {
        setExpectedCost(e.target.value)
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleSave = async () => {
        await handleUpdateRepairData("expertise", expertiseValue);
        await handleUpdateRepairData("expectedCost", expectedCostValue);
        await handleUpdateRepairData("status", "expertise");
        setOpenModal(false);
    };

    const handleOpenModal = () => {
        setOpenModal(true)
    };

    return (
        <>
            Status "start":<br/>
            - Rozpoczęto / Twoja naprawa rozpoczęła się i oczekuje na diagnozę<br/>
            <div className={"repairActionsWrapper"}>
                <div>
                    <Button variant="outlined"
                            id={"confirmDeviceDelivery"}
                            onClick={handleOpenModal}>Dodaj ekspertyzę</Button><br/><br/>
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
                        <h2 id="transition-modal-title">Ekspertyza serwisowa</h2>
                        <FormControl

                            fullWidth={true}>
                            <TextField
                                name={"expertise"}
                                onChange={handleOnExpertiseChange}
                                multiline
                                rows={8}
                                size={"small"}
                                id="expertise"
                                label="Ekspertyza"
                                variant="outlined"
                            />
                            <TextField
                                name={"expectedCost"}
                                onChange={handleOnExpectedCostChange}
                                size={"small"}
                                id="expectedCost"
                                label="Przewidywany koszt naprawy"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">zł</InputAdornment>,
                                }}
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

export default Start;