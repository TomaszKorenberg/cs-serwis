import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {getRepairById} from "../../../redux/operations";
import {useDispatch, useSelector} from "react-redux";
import "./RepairDetails.scss"
import RepairShortSummary from "./RepairShortSummary/RepairShortSummary";
import RapairGuideWizard from "./RepairGuideWizard/RepairGuideWizard";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";



export default function RapairDetails() {
    const dispatch = useDispatch();
    const repairId = useParams().repairId;
    const repairDetails = useSelector(state => state.repairDetails)[0];


    useEffect(() => {
        dispatch(getRepairById(repairId))
    }, [dispatch, repairId]);

    const useStyles = makeStyles(() => ({
        root: {
            width: "100%",
        },
    }));

    const classes = useStyles();



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

                <RepairShortSummary repairDetails={repairDetails}/>
                <RapairGuideWizard repairDetails={repairDetails}/>
            </div>


        </div>
    );
}