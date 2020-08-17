import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import DefaultActionButtons from "../DefaultActionButtons/DefaultActionButtons";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import Fade from "@material-ui/core/Fade/Fade";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import {Modal} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import moment from "moment";
import InputAdornment from "@material-ui/core/InputAdornment";

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

const Expertise = ({repairDetails, handleUpdateRepairData}) => {
    const [openModal, setOpenModal] = useState(false);
    const [dateOfStartRepairValue, setDateOfStartRepairValue] = useState(dateNow);
    const [dateOfEndRepairValue, setDateOfEndRepairValue] = useState(dateNow);
    const [externalServiceDataValue, setExternalServiceDataValue] = useState();
    const [repairCostValue, setRepairCostValue] = useState();
    const [modalRenderData, setModalRenderData] = useState(null);

    const classes = useStyles();

    const handleOnChange = (e) => {
        switch (e.target.name) {
            case "dateOfStartRepair":
                setDateOfStartRepairValue(moment(e.target.value).locale("pl").format("YYYY-MM-DD[T]HH:mm"));
                break;
            case "dateOfEndRepair":
                setDateOfEndRepairValue(moment(e.target.value).locale("pl").format("YYYY-MM-DD[T]HH:mm"));
                break;
            case "externalServiceData":
                setExternalServiceDataValue(e.target.value);
                break;
            case "repairCost":
                setRepairCostValue(e.target.value);
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
            case "cost accepted":
                await handleUpdateRepairData("dateOfStartRepair", dateOfStartRepairValue);
                await handleUpdateRepairData("status", "repair start");
                break;
            case "cost rejected":
                await handleUpdateRepairData("dateOfEndRepair", dateOfEndRepairValue);
                await handleUpdateRepairData("repairCost", repairCostValue);
                await handleUpdateRepairData("status", "repair end");
                break;
            case "device forwarded":
                await handleUpdateRepairData("externalServiceData", externalServiceDataValue);
                await handleUpdateRepairData("status", "waiting forwarded");
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
            Status "expertise:<br/>
            - Ekspertyza / Technik wycenił naprawę. Twoj ruch, czekamy na decyzję<br/>
            <div className={"repairActionsWrapper"}>
                <div>
                    <Button variant="outlined"
                            id={"confirmDeviceDelivery"}
                            onClick={() => {
                                setModalRenderData("cost accepted");
                                handleOpenModal(true)
                            }}>Akceptacja kosztów</Button>
                    <Button variant="outlined"
                            id={"confirmDeviceDelivery"}
                            onClick={() => {
                                setModalRenderData("cost rejected");
                                handleOpenModal(true)
                            }}>Rezygnacja z naprawy</Button>
                    <Button variant="outlined"
                            id={"confirmDeviceDelivery"}
                            onClick={() => {
                                setModalRenderData("device forwarded");
                                handleOpenModal(true)
                            }}>Przekazanie do serwisu
                        zewnętrznego</Button><br/><br/>
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
                        {(modalRenderData === "cost accepted") ?

                            (<>
                                <h2 id="transition-modal-title">Rozpocznij naprawę</h2>
                                <FormControl

                                    fullWidth={true}>
                                    <TextField
                                        type="datetime-local"
                                        name={"dateOfStartRepair"}
                                        onChange={handleOnChange}
                                        size={"small"}
                                        id="dateOfStartRepair"
                                        label="Data rozpoczęcia naprawy"
                                        variant="outlined"
                                        defaultValue={dateOfStartRepairValue}
                                    />

                                </FormControl>
                            </>) : null}

                        {(modalRenderData === "cost rejected") ?

                            (<>
                                <h2 id="transition-modal-title">Rezygnacja z naprawy</h2>
                                <FormControl

                                    fullWidth={true}>
                                    <TextField
                                        type="datetime-local"
                                        name={"dateOfEndRepair"}
                                        onChange={handleOnChange}
                                        size={"small"}
                                        id="dateOfEndRepair"
                                        label="Data zakończenia naprawy"
                                        variant="outlined"
                                        defaultValue={dateOfStartRepairValue}
                                    />
                                    <TextField
                                        name={"repairCost"}
                                        onChange={handleOnChange}
                                        size={"small"}
                                        id="repairCost"
                                        label="Koszt naprawy"
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">zł</InputAdornment>,
                                        }}
                                    />

                                </FormControl>
                            </>) : null}

                        {(modalRenderData === "device forwarded") ?

                            (<>
                                <h2 id="transition-modal-title">Przekaż do serwisu zewnętrznego</h2>
                                <FormControl

                                    fullWidth={true}>
                                    <TextField
                                        name={"externalServiceData"}
                                        onChange={handleOnChange}
                                        size={"small"}
                                        multiline
                                        rows={8}
                                        id="externalServiceData"
                                        label="Podaj dane serwisu "
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

export default Expertise;