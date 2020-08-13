import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import DefaultActionButtons from "../DefaultActionButtons/DefaultActionButtons";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import Fade from "@material-ui/core/Fade/Fade";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
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

const Expertise = ({repairDetails, handleUpdateRepairData}) => {
    const [openModal, setOpenModal] = useState(false);
    const [expertiseValue, setExpertiseValue] = useState("");

    const classes = useStyles();

    const handleOnChange = (e) => {
        setExpertiseValue(e.target.value)
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleSave = async () => {
        await handleUpdateRepairData("expertise", expertiseValue);
        await handleUpdateRepairData("status", "expertise");
        setOpenModal(false);
    };

    const handleOpenModal = () => {
        setOpenModal(true)
    };

    return (
        <>
            Status "expertise:<br/>
            - Ekspertyza / Technik wycenił naprawę. Twoj ruch, czekamy na decyzję<br/>
            <div className={"repairActionsWrapper"}>
                <div>
                    <Button variant="outlined"
                            id={"confirmDeviceDelivery"}
                            onClick={handleOpenModal}>Rozpocznij naprawę</Button><br/><br/>
                    <DefaultActionButtons repairDetails={repairDetails}/>
                </div>
            </div>


        </>
    );
};

export default Expertise;