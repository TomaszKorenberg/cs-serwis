import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import {getRepairById} from "../../../redux/operations";
import {useDispatch, useSelector} from "react-redux";


const RapairDetails = () => {
    const dispatch = useDispatch();
    const repairId = useParams().repairId;

    const repairDetails = useSelector(state => state.repairDetails)[0];


    useEffect(() => {
        dispatch(getRepairById(repairId))
    }, [dispatch, repairId]);


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
            {console.log(repairDetails)}
            <ul>
                <li>ID naprawy: {repairDetails.repairId}</li>
                <li>Producent: {repairDetails.device.manufacturer}</li>
                <li>Model: {repairDetails.device.model}</li>
                <li>S/N: {repairDetails.serialNumber}</li>
                <li>Opis usterki: {repairDetails.faultDescription}</li>
                <li>Data dodania: {repairDetails.dateOfAdd}</li>
                <li>Klient: {repairDetails.client.name} {repairDetails.client.lastName}</li>
                <li>Numer do klienta: {repairDetails.client.contactNumber ? repairDetails.client.contactNumber : "Brak"}</li>
                <li>Email do klienta: {repairDetails.client.email ? repairDetails.client.email : "Brak"}</li>
                <li>Naprawa gwarancyjna: {repairDetails.isWarranty ? "Tak" : "Nie"}</li>
                <li>Przypisany pracownik: {repairDetails.assignedEmployee ? repairDetails.assignedEmployee : "Brak"}</li>
            </ul>
        </>
    );
};

export default RapairDetails;