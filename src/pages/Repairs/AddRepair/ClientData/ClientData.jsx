import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import TextField from "@material-ui/core/TextField/TextField";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
    sectionWrapper: {
        display: "flex",
        flexDirection: "column",
        width: "40%",
        padding: "25px",
        border: "1px solid gray",
        borderRadius: "10px",
        margin: "10px",
        maxWidth: "535px",

    }
}));


function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
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
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}


export default function ClientData({handleClientChange, inputsErrorValues, handleValidate}) {
    const [value, setValue] = React.useState(0);

    const classes = useStyles();


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.sectionWrapper}>
            Dane klienta:
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="scrollable force tabs example"
                >
                    <Tab label="Nowy" {...a11yProps(0)} />
                    <Tab label="Istniejący" {...a11yProps(1)} />
                    <Tab label="Anonimowy" {...a11yProps(2)} />

                </Tabs>
            </AppBar>
            <TabPanel value={value}
                      index={0}>

                <FormControl
                    error={inputsErrorValues.firstName}
                    fullWidth={true}>
                    <TextField
                        name={"firstName"}
                        size={"small"}
                        fullWidth={true}
                        onChange={handleClientChange}
                        error={inputsErrorValues.firstName}
                        id="clientFirstNameInput"
                        label="Imię"
                        variant="outlined"
                        onBlur={handleValidate}
                    />
                    {(inputsErrorValues.firstName)
                        ? (<FormHelperText>Wpowadź imię</FormHelperText>)
                        : null}
                </FormControl>

                <FormControl
                    error={inputsErrorValues.lastName}
                    fullWidth={true}>
                    <TextField
                        name={"lastName"}
                        size={"small"}
                        fullWidth={true}
                        onChange={handleClientChange}
                        error={inputsErrorValues.lastName}
                        id="clientLastNameInput"
                        label="Nazwisko"
                        variant="outlined"
                        onBlur={handleValidate}
                    />
                    {(inputsErrorValues.lastName)
                        ? (<FormHelperText>Wpowadź nazwisko</FormHelperText>)
                        : null}
                </FormControl>

                <FormControl
                    error={inputsErrorValues.phoneNumber}
                    fullWidth={true}>
                    <TextField
                        name={"phoneNumber"}
                        size={"small"}
                        fullWidth={true}
                        error={inputsErrorValues.phoneNumber}
                        onChange={handleClientChange}
                        id="clientPhoneNumberInput"
                        label="Telefon"
                        variant="outlined"
                        onBlur={handleValidate}
                    />
                    {(inputsErrorValues.phoneNumber)
                        ? (<FormHelperText>Wpowadź numer telefonu</FormHelperText>)
                        : null}
                </FormControl>

                <TextField
                    name={"email"}
                    size={"small"}
                    fullWidth={true}
                    onChange={handleClientChange}
                    id="clientEmailInput"
                    label="Email"
                    variant="outlined"
                />
                <TextField
                    name={"adress"}
                    size={"small"}
                    fullWidth={true}
                    multiline={true}
                    rows={3}
                    onChange={handleClientChange}
                    id="clientAdressInput"
                    label="Adres"
                    variant="outlined"
                />
            </TabPanel>
            <TabPanel value={value}
                      index={1}>
                Szukaj w bazie
            </TabPanel>
            <TabPanel value={value}
                      index={2}>
                Klient anonimowy
            </TabPanel>
        </div>
    );
}
