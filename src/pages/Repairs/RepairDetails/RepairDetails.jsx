import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import {getRepairById} from "../../../redux/operations";
import {useDispatch, useSelector} from "react-redux";
import "./RepairDetails.scss"
import moment from "moment";
import ClientDetails from "./ClientDetails/ClientDetails";
import DeviceDetails from "./DeviceDetails/DeviceDetails";
import RepairActions from "./RepairActions/RepairActions";


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

            <div className={"wrapper"}>
                <h1>Szczegóły naprawy</h1>
                <div className={"repairDataWrapper"}>

                    <DeviceDetails repairDetails={repairDetails}/>
                    <ClientDetails repairDetails={repairDetails}/>
                    <RepairActions repairDetails={repairDetails}/>

                </div>
            </div>
        </>
    );
};

export default RapairDetails;