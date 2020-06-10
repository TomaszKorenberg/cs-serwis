import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import TextField from "@material-ui/core/TextField/TextField";


function TabPanel(props) {
    const { children, value, index, ...other } = props;
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

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        width: '500px',
        backgroundColor: "#282c34",
        border: "1px solid gray",
        borderRadius: "10px",
    },
    tabs: {
        backgroundColor: "#282c34",
        color: "white"
    },
    inputLabel: {
        color: "white",
    },
});

export default function NewClient({onChange}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            Klient:
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    classes={{flexContainer: classes.tabs}}
                    onChange={handleChange}
                    aria-label="scrollable force tabs example"
                >
                    <Tab label="Nowy" {...a11yProps(0)} />
                    <Tab label="Istniejący" {...a11yProps(1)} />
                    <Tab label="Anonimowy" {...a11yProps(2)} />

                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <TextField
                    name={"clientID"}
                    size={"small"}
                    classes={{root: classes.input}}
                    onChange={onChange}
                    id="clientInput" label="Klient ID"
                    variant="outlined"
                    InputLabelProps={{className: classes.inputLabel}}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Szukaj w bazie
            </TabPanel>
            <TabPanel value={value} index={2}>
                Klient anonimowy
            </TabPanel>
        </div>
    );
}
