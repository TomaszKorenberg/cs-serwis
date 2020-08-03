import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import {getRepairById} from "../../../redux/operations";
import {useDispatch, useSelector} from "react-redux";
import "./RepairDetails.scss"
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
}));

export default function RapairDetails() {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const repairId = useParams().repairId;
    const repairDetails = useSelector(state => state.repairDetails)[0];

    const [value, setValue] = React.useState(0);


    useEffect(() => {
        dispatch(getRepairById(repairId))
    }, [dispatch, repairId]);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };


    if (!repairDetails) {
        return (
            <div>
                Ładuje... <CircularProgress/>

            </div>
        )
    }

    return (
        <div className={classes.root}>
            <h1>Szczegóły naprawy</h1>
            <div className={"repairDataWrapper"}>

                <div className={"previewWrapper"}>
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

            </div>

            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Realizator zlecenia" {...a11yProps(0)} />
                    <Tab label="Dane naprawy" {...a11yProps(1)} />
                    <Tab label="Dane zlecenia" {...a11yProps(2)} />
                    <Tab label="Rozliczenie" {...a11yProps(3)} />
                    <Tab label="Historia zlecenia" {...a11yProps(4)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    Status:<br/>
                    - Przyjęto do serwisu/Oczekuje na rozpoczęcie naprawy<br/>
                    <div className={"repairActionsWrapper"}>

                        {(repairDetails.status === "new")
                            ? <div>
                                Naprawa ma status "Przyjęto do serwisu".<br/>
                                <Button variant="outlined">Rozpocznij obsługę zlecenia</Button><br/><br/>

                                Inne dostępne operacje:<br/>
                                <Button variant="outlined">Dodaj komentarz</Button>
                                {(repairDetails.client.email || repairDetails.client.phoneNumber)
                                    ? <Button variant="outlined">Wiadomość do klienta</Button>
                                    : null}
                                <Button variant="outlined">Zakończ bez naprawy</Button>
                            </div>
                            : null}

                    </div>
                    <Divider/>

                    Status:<br/>
                    - Rozpoczęto naprawę/Twoja naprawa rozpoczęła się i oczekuje na diagnozę<br/>
                    <div className={"repairActionsWrapper"}>
                        <div>
                            <Button variant="outlined">Dodaj ekspertyzę</Button><br/><br/>
                            Inne dostępne operacje:<br/>
                            <Button variant="outlined">Dodaj komentarz</Button>
                            {(repairDetails.client.email || repairDetails.client.phoneNumber)
                                ? <Button variant="outlined">Wiadomość do klienta</Button>
                                : null}
                            <Button variant="outlined">Zakończ bez naprawy</Button>
                        </div>
                    </div>
                    <Divider/>

                    Status:<br/>
                    - Ekspertyza/ Technik wycenił naprawę. Twoj ruch, czekamy na decyzję<br/>
                    <div className={"repairActionsWrapper"}>
                        <div>
                            <Button variant="outlined">Rozpocznij naprawę</Button><br/><br/>
                            Inne dostępne operacje:<br/>
                            <Button variant="outlined">Dodaj komentarz</Button>
                            {(repairDetails.client.email || repairDetails.client.phoneNumber)
                                ? <Button variant="outlined">Wiadomość do klienta</Button>
                                : null}
                            <Button variant="outlined">Zakończ bez naprawy</Button>
                        </div>
                    </div>
                    <Divider/>

                    Status:<br/>
                    - W trakcie naprawy / Technik właśnie naprawia urządzenie<br/>
                    <div className={"repairActionsWrapper"}>
                        <div>
                        <Button variant="outlined">Zamowione części</Button><br/>
                        <Button variant="outlined">Przekazanie naprawy</Button><br/><br/>
                        Inne dostępne operacje:<br/>
                        <Button variant="outlined">Dodaj komentarz</Button>
                        {(repairDetails.client.email || repairDetails.client.phoneNumber)
                            ? <Button variant="outlined">Wiadomość do klienta</Button>
                            : null}
                        <Button variant="outlined">Zakończ bez naprawy</Button>
                    </div>
                    </div>
                    <Divider/>

                    Status:<br/>
                    - Oczekująca / Twoja naprawa oczekuje<br/>
                    /Oczekuje na części<br/>
                    <div className={"repairActionsWrapper"}>
                        <div>
                        <Button variant="outlined">Przyszły części</Button><br/>
                        <Button variant="outlined">Naprawiono</Button><br/><br/>
                        Inne dostępne operacje:<br/>
                        <Button variant="outlined">Dodaj komentarz</Button>
                        {(repairDetails.client.email || repairDetails.client.phoneNumber)
                            ? <Button variant="outlined">Wiadomość do klienta</Button>
                            : null}
                        <Button variant="outlined">Zakończ bez naprawy</Button>
                    </div>
                    </div>
                    <Divider/>

                    Status:<br/>
                    - Oczekująca / Twoja naprawa oczekuje<br/>
                    /Przekazano do serwisu zewnętrznego (widziane tylko dla serwisu, dla klienta oczekuje na
                    części)<br/>
                    <div className={"repairActionsWrapper"}>
                        <div>
                        <Button variant="outlined">Powrot sprzętu z serwisu</Button><br/><br/>
                        Inne dostępne operacje:<br/>
                        <Button variant="outlined">Dodaj komentarz</Button>
                        {(repairDetails.client.email || repairDetails.client.phoneNumber)
                            ? <Button variant="outlined">Wiadomość do klienta</Button>
                            : null}
                        <Button variant="outlined">Zakończ bez naprawy</Button>
                    </div>
                    </div>
                    <Divider/>


                    Status:<br/>
                    - Naprawa zakończona / Możesz odebrac urządzenie<br/>
                    <div className={"repairActionsWrapper"}>
                        <div>
                        <Button variant="outlined">Odbior sprzętu przez klienta</Button><br/>
                        </div>
                    </div>
                    <Divider/>

                    Status:<br/>
                    - Odebrane / To tyle z naszej strony (oby nie) do zobaczenia! :)<br/>
                    <div className={"repairActionsWrapper"}>
                        <div>
                        </div>
                    </div>
                    <Divider/>

                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    Data rozpoczęcia i data zakończenia naprawy:<br/>
                    Diagnoza i opis:<br/>
                    Części:<br/>
                    Komentarz Serwisu:<br/>

                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    Dane klienta:<br/>
                    Dane urządzenia:

                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                    Zużyte części:<br/>
                    Czas poświęcony na naprawę:
                </TabPanel>
                <TabPanel value={value} index={4} dir={theme.direction}>
                    - Dnia 1.1.1111r przyjęto urządzenie do serwisu<br/>
                    - Dnia 1.1.1111r technik rozpoczął pomiary<br/>
                    - Dnia 1.1.1111r technik wydał werdykt<br/>
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}