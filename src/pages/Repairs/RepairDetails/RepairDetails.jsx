import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getRepairById} from "../../../redux/operations";
import {useDispatch, useSelector} from "react-redux";
import RepairShortSummary from "./RepairShortSummary/RepairShortSummary";
import RapairGuideWizard from "./RepairGuideWizard/RepairGuideWizard";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";


export default function RapairDetails() {
    const dispatch = useDispatch();
    const repairId = useParams().repairId;
    const repairDetails = useSelector(state => state.repairDetails)[0];
    const [shortSummaryFullWidth, setShortSummaryFullWidth] = useState(false)


    useEffect(() => {
        dispatch(getRepairById(repairId))
    }, [dispatch, repairId]);

    const useStyles = makeStyles(() => ({
        root: {
            width: "100%",
            padding: "0 25px",
            borderLeft: "1px solid gray",
        },
        repairDataWrapper: {
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            alignItems: "center",
        },
        repairShortSummary: {
            marginBottom: "20px",
            width: shortSummaryFullWidth ? "100%" : "30%",
            transition: "0.5s"
        }
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
            <div className={classes.repairDataWrapper}>

                <div onClick={() => setShortSummaryFullWidth(!shortSummaryFullWidth)} className={classes.repairShortSummary}>
                    <RepairShortSummary repairDetails={repairDetails}/>
                </div>
                <RapairGuideWizard repairDetails={repairDetails}/>
            </div>


        </div>
    );
}