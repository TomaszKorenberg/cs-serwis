import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
    }
}));


export default function RepairShortSummary({repairDetails}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Accordion >
                {
                    //todo: zrobic tak by "expanded" było zapamiętywane jaki był osatni stan.
                }
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Szybki podgląd danych zlecenia</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        Przegląd naprawy:
                        <div className={"previewData"}>
                            <ul className={"previewDataContent"}>
                                <li><b>ID naprawy:</b> {repairDetails.repairId}</li>
                                <li><b>Producent:</b> {repairDetails.device.manufacturer}</li>
                                <li><b>Model:</b> {repairDetails.device.model}</li>
                                <li><b>S/N:</b> {repairDetails.serialNumber}</li>
                                <li><b>Data przyjęcia:</b> {repairDetails.dateOfAdd}</li>
                            </ul>
                            <ul>
                                <li><b>Klient:</b> {repairDetails.client.name} {repairDetails.client.lastName}</li>
                                <li><b>Numer do
                                    klienta:</b> {repairDetails.client.contactNumber ? repairDetails.client.contactNumber : "Brak"}
                                </li>
                                <li><b>Email do
                                    klienta:</b> {repairDetails.client.email ? repairDetails.client.email : "Brak"}</li>
                                <li>
                                    <b>Adres:</b> {repairDetails.client.streetAdress}<br/>{repairDetails.client.postalCode} {repairDetails.client.city}
                                </li>

                            </ul>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>

        </div>
    );
}
