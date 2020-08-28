import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    wrapper: {
        border: '1px white solid',
        borderRadius: "5px",
        padding: "10px",
        width: "35vw"
    }
}));

const InfoBox = ({data, description}) => {

    const classes = useStyles();


    return (
        <div className={classes.wrapper}>
            {description} <br/>
            {data}
        </div>
    );
};

export default InfoBox;