import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import {getRepairById} from "../../../redux/operations";
import {useDispatch, useSelector} from "react-redux";
import "./RepairDetails.scss"
import ClientDetails from "./ClientDetails/ClientDetails";
import DeviceDetails from "./DeviceDetails/DeviceDetails";
import RepairActions from "./RepairActions/RepairActions";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


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
                        </ul>
                        <ul>
                            <li><b>Klient:</b> {repairDetails.client.name} {repairDetails.client.lastName}</li>
                            <li><b>Numer do klienta:</b> {repairDetails.client.contactNumber ? repairDetails.client.contactNumber : "Brak"}</li>
                            <li><b>Email do klienta:</b> {repairDetails.client.email ? repairDetails.client.email : "Brak"}</li>
                            <li><b>Adres:</b> {repairDetails.client.streetAdress}<br/>{repairDetails.client.postalCode} {repairDetails.client.city}</li>
                            <li><b>Data przyjęcia:</b> {repairDetails.dateOfAdd}</li>

                        </ul>
                    </div>
                </div>

                {/*<DeviceDetails repairDetails={repairDetails}/>*/}
                {/*<ClientDetails repairDetails={repairDetails}/>*/}

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


                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <RepairActions repairDetails={repairDetails}/>
                    Data rozpoczęcia i data zakończenia naprawy:<br/>
                    Diagnoza i opis:<br/>
                    Części:<br/>
                    Komentarz Serwisu:<br/>

                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    Rozliczenie:<br/>

                </TabPanel>
            </SwipeableViews>
        </div>
    );
}