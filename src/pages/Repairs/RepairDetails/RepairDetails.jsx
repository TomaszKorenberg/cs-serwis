import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';



const RapairDetails = () => {

    const repairId = useParams();


    const [repairDetails, setRepairDetails] = useState(null);


    // useEffect(() => {
    //     api.(repairId).then(response => setRepairDetails(response[0]));
    // }, []);

    if (!repairDetails) {
        return (
            <div>Ładuje... <CircularProgress /></div>
        )
    }

    return (
        <>
            Hello from repair details!
        </>
    );
};

export default RapairDetails;