import React, {} from 'react';
import "../RepairDetails.scss"
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import New from "./guideWizardPages/New";
import Start from "./guideWizardPages/Start";
import Expertise from "./guideWizardPages/Expertise";
import RepairStart from "./guideWizardPages/RepairStart";
import Registered from "./guideWizardPages/Registered";
import End from "./guideWizardPages/End";
import RepairEnd from "./guideWizardPages/RepairEnd";
import WaitingForwarded from "./guideWizardPages/WaitingForwarded";
import WaitingForSpareParts from "./guideWizardPages/WaitingForSpareParts";
import {changeRepairStatus} from "../../../../redux/operations";


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



export default function RapairGuideWizard({repairDetails}) {


    const theme = useTheme();
    const useStyles = makeStyles(() => ({
        root: {
            width: "100%",
        },
    }));

    const classes = useStyles();


    const [value, setValue] = React.useState(0);

    const changeRepairStatus = async (newStatus) => {
        await fetch("http://localhost:3001/repairs/repair-" + repairDetails.repairId + "/change-status", {
            method: "PUT",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({newStatus})
        });
        await changeRepairStatus(repairDetails.repairId, "new")
    };


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };


    return (
        <div className={classes.root}>

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


                    <div className={"repairActionsWrapper"}>

                        {(repairDetails.status === "new")
                            ? <New repairDetails={repairDetails}/>
                            : null}
                        {(repairDetails.status === "start")
                            ? <Start repairDetails={repairDetails}/>
                            : null}
                        {(repairDetails.status === "expertise")
                            ? <Expertise repairDetails={repairDetails}/>
                            : null}
                        {(repairDetails.status === "repair start")
                            ? <RepairStart repairDetails={repairDetails}/>
                            : null}
                        {(repairDetails.status === "waiting spare parts")
                            ? <WaitingForSpareParts repairDetails={repairDetails}/>
                            : null}
                        {(repairDetails.status === "waiting forwarded")
                            ? <WaitingForwarded repairDetails={repairDetails}/>
                            : null}
                        {(repairDetails.status === "repair end")
                            ? <RepairEnd repairDetails={repairDetails}/>
                            : null}
                        {(repairDetails.status === "end")
                            ? <End repairDetails={repairDetails}/>
                            : null}
                        {(repairDetails.status === "registered")
                            ? <Registered repairDetails={repairDetails}/>
                            : null}

                    </div>




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