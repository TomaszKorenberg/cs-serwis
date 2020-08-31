import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        border: '1px white solid',
        borderRadius: "5px",
        padding: "10px",
        width: "35vw",
        position: "relative"
},
    iconBox: {
        margin: 0,
        background: theme.palette.background,
        position: "absolute",
        left:"90%",
        transform: "translateY(-35px)"
    }
}));

const InfoBox = ({data, description}) => {

    const classes = useStyles();


    return (
        <div className={classes.wrapper}>
            <div className={classes.iconBox}>
            <IconButton aria-label="delete">
                <EditIcon/>
            </IconButton>
            </div>
            {description} <br/>
            {data}
        </div>
    );
};

export default InfoBox;