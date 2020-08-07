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
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';
import RepairShortSummary from "./RepairShortSummary/RepairShortSummary";


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
                <Box>
                    {children}
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

                <RepairShortSummary repairDetails={repairDetails}/>

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
                    Status "new":<br/>
                    - Przyjęte do serwisu / Oczekuje na rozpoczęcie naprawy<br/>
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

                    Status "start":<br/>
                    - Rozpoczęto / Twoja naprawa rozpoczęła się i oczekuje na diagnozę<br/>
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

                    Status "expertise:<br/>
                    - Ekspertyza / Technik wycenił naprawę. Twoj ruch, czekamy na decyzję<br/>
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

                    Status "repair start":<br/>
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

                    Status "waiting spare parts":<br/>
                    - Oczekująca / Twoja naprawa oczekuje na części<br/>
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

                    Status "waiting forwarded":<br/>
                    - Oczekująca / Przekazano do serwisu zewnętrznego (widziane tylko dla serwisu, dla klienta oczekuje na części)<br/>
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


                    Status "repair end":<br/>
                    - Naprawa zakończona / Możesz odebrac urządzenie<br/>
                    <div className={"repairActionsWrapper"}>
                        <div>
                        <Button variant="outlined">Odbior sprzętu przez klienta</Button><br/>
                        </div>
                    </div>
                    <Divider/>

                    Status "end":<br/>
                    - Odebrane / To tyle z naszej strony (oby nie) do zobaczenia! :)<br/>
                    <div className={"repairActionsWrapper"}>
                        <div>
                        </div>
                    </div>
                    <Divider/>

                    Status "registered":<br/>
                    - Zarejestrowano naprawę / Klient zarejestrował naprawę<br/>
                    <div className={"repairActionsWrapper"}>
                        <div>
                            <Button variant="outlined">Przyjęto do serwisu</Button><br/><br/>
                            Inne dostępne operacje:<br/>
                            <Button variant="outlined">Dodaj komentarz</Button>
                            {(repairDetails.client.email || repairDetails.client.phoneNumber)
                                ? <Button variant="outlined">Wiadomość do klienta</Button>
                                : null}
                        </div>
                    </div>
                    <Divider/>

                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    Data rozpoczęcia i data zakończenia naprawy (przycisk "edytuj")<br/>
                    Diagnoza i opis (przycisk "edytuj")<br/>
                    Części (przycisk "edytuj")<br/>
                    Komentarze Serwisu (przycisk "edytuj" i "dodaj")<br/>

                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    Dane klienta (przycisk "edytuj")<br/>
                    Dane urządzenia (przycisk "edytuj")

                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                    Zużyte części (+ przycisk "Dodaj częśći" i "edytuj"):<br/>
                    Czas poświęcony na naprawę (przycisk "dodaj" i "edytuj"):
                    Wyliczony koszt naprawy (+przycisk "Skoryguj koszta" i info jeżeli tak sie stało "Skorygowanko koszta naprawy do kwory xxx zł")
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