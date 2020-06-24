import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import {getRepairById} from "../../../redux/operations";
import {useDispatch, useSelector} from "react-redux";


const RapairDetails = () => {
    const dispatch = useDispatch();
    const repairId = useParams().repairId;

    const repairDetails = useSelector(state => state.repairDetails);


    useEffect(() => {
        dispatch(getRepairById(repairId))
    }, [dispatch]);


    if (!repairDetails) {
        return (
            <div>
                Ładuje... <CircularProgress/>

            </div>
        )
    }

    return (
        <>
            Dane naprawy:
            <ul>
            <li>ID naprawy: {repairDetails.repairId}</li>
            <li>Producent: {repairDetails.manufacturer}</li>
            <li>Model: {repairDetails.model}</li>
            <li> {repairDetails.repairId}</li>
            <li>ID naprawy: {repairDetails.repairId}</li>
            </ul>
        </>
    );
};

export default RapairDetails;