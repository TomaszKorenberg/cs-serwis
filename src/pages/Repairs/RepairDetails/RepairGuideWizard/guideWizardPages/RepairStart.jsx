import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import DefaultActionButtons from "../DefaultActionButtons/DefaultActionButtons";
import {makeStyles} from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import Fade from "@material-ui/core/Fade/Fade";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import {Modal} from "@material-ui/core";
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


const RepairStart = ({repairDetails, handleUpdateRepairData}) => {
    const [openModal, setOpenModal] = useState(false);
    const [modalRenderData, setModalRenderData] = useState(null);
    const [partsOrderedValue, setPartsOrderedValue] = useState(null);
    const [partsUsedValue, setPartsUsedValue] = useState(null);
    const [dateOfEndRepairValue, setDateOfEndRepairValue] = useState(dateNow);
    const [externalServiceDataValue, setExternalServiceDataValue] = useState(null);
    const [repairSummaryDescriptionValue, setRepairSummaryDescriptionValue] = useState(null);
    const [repairCostValue, setRepairCostValue] = useState();


    const classes = useStyles();

    const handleOnChange = (e) => {
        switch (e.target.name) {
            case "orderedParts":
                setPartsOrderedValue(e.target.value);
                break;
            case "usedParts":
                setPartsUsedValue(e.target.value);
                break;
            case "repairSucces":
            case "repairFailure":
                setDateOfEndRepairValue(moment(e.target.value).locale("pl").format("YYYY-MM-DD[T]HH:mm"));
                break;
            case "externalServiceData":
                setExternalServiceDataValue(e.target.value);
                break;
            case "repairSummaryDescription":
                setRepairSummaryDescriptionValue(e.target.value);
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
            case "parts ordered":
                await handleUpdateRepairData("partsOrdered", partsOrderedValue);
                await handleUpdateRepairData("status", "waiting spare parts");
                break;
            case "parts used":
                await handleUpdateRepairData("partsUsed", partsUsedValue);
                break;
            case "repair succes":
            case "repair failure":
                await handleUpdateRepairData("dateOfEndRepair", dateOfEndRepairValue);
                await handleUpdateRepairData("status", "repair end");
                await handleUpdateRepairData("repairSummaryDescription", repairSummaryDescriptionValue);
                await handleUpdateRepairData("repairCost", repairCostValue);
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

            Status "repair start":<br/>
            - W trakcie naprawy / Technik właśnie naprawia urządzenie<br/>
            <div className={"repairActionsWrapper"}>
                <div>
                    <Button variant="outlined"
                            onClick={() => {
                                handleOpenModal();
                                setModalRenderData("parts ordered");
                            }}>Oczekiwanie na części</Button>
                    <Button variant="outlined"
                            onClick={() => {
                                handleOpenModal();
                                setModalRenderData("parts used");
                            }}>Dodaj użyte części</Button>
                    <Button variant="outlined"
                            onClick={() => {
                                handleOpenModal();
                                setModalRenderData("repair succes");
                            }}>Naprawa zakończona sukcesem</Button>
                    <Button variant="outlined"
                            onClick={() => {
                                handleOpenModal();
                                setModalRenderData("repair failure");
                            }}>Naprawa zakończona niepowodzeniem</Button><br/>
                    <Button variant="outlined"
                            id={"confirmDeviceDelivery"}
                            onClick={() => {
                                setModalRenderData("device forwarded");
                                handleOpenModal(true)
                            }}>Przekazanie do serwisu
                        zewnętrznego</Button><br/><br/>

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
                        {(modalRenderData === "parts ordered") ?

                            (<>
                                <h2 id="transition-modal-title">Zamówione części</h2>
                                <FormControl fullWidth={true}>

                                    <TextField
                                        name={"orderedParts"}
                                        onChange={handleOnChange}
                                        size={"small"}
                                        multiline
                                        rows={8}
                                        id="orderedParts"
                                        label="Zamówione części"
                                        variant="outlined"
                                        defaultValue={repairDetails.partsOrdered}
                                    />

                                </FormControl>
                            </>) : null}

                        {(modalRenderData === "parts used") ?

                            (<>
                                <h2 id="transition-modal-title">Zamówione części</h2>
                                <FormControl fullWidth={true}>

                                    <TextField
                                        name={"usedParts"}
                                        onChange={handleOnChange}
                                        size={"small"}
                                        multiline
                                        rows={8}
                                        id="usedParts"
                                        label="Użyte części"
                                        variant="outlined"
                                        defaultValue={repairDetails.partsUsed}
                                    />

                                </FormControl>
                            </>) : null}

                        {(modalRenderData === "repair succes") ?

                            (<>
                                <h2 id="transition-modal-title">Zakończenie naprawy</h2>
                                <FormControl fullWidth={true}>

                                    <TextField
                                        type="datetime-local"
                                        name={"repairSucces"}
                                        onChange={handleOnChange}
                                        size={"small"}
                                        id="repairSucces"
                                        label="Data zakończenia naprawy"
                                        variant="outlined"
                                        defaultValue={dateOfEndRepairValue}
                                    />

                                    <TextField
                                        name={"repairSummaryDescription"}
                                        onChange={handleOnChange}
                                        size={"small"}
                                        multiline
                                        rows={8}
                                        id="repairSummaryDescription"
                                        label="Posdsumowanie naprawy"
                                        variant="outlined"
                                    />
                                    <TextField
                                        name={"repairCost"}
                                        onChange={handleOnChange}
                                        size={"small"}
                                        id="repairCost"
                                        label="Ostateczny koszt naprawy"
                                        variant="outlined"
                                        defaultValue={repairDetails.repairCost}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">zł</InputAdornment>,
                                        }}
                                    />

                                </FormControl>
                            </>) : null}
                        {(modalRenderData === "repair failure") ?

                            (<>
                                <h2 id="transition-modal-title">Zakończenie naprawy</h2>
                                <FormControl fullWidth={true}>

                                    <TextField
                                        type="datetime-local"
                                        name={"repairFailure"}
                                        onChange={handleOnChange}
                                        size={"small"}
                                        id="repairFailure"
                                        label="Data zakończenia naprawy"
                                        variant="outlined"
                                        defaultValue={dateOfEndRepairValue}
                                    />
                                    <TextField
                                        name={"repairSummaryDescription"}
                                        onChange={handleOnChange}
                                        size={"small"}
                                        multiline
                                        rows={8}
                                        id="repairSummaryDescription"
                                        label="Posdsumowanie naprawy"
                                        variant="outlined"
                                    />
                                    <TextField
                                        name={"repairCost"}
                                        onChange={handleOnChange}
                                        size={"small"}
                                        id="repairCost"
                                        label="Ostateczny koszt naprawy"
                                        variant="outlined"
                                        defaultValue={repairDetails.repairCost}
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

export default RepairStart;