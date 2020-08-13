import {repairActions} from "./actions/index";
import {store} from "./store/store";

const fetchAddRepair = async (data) => {
        await fetch("http://localhost:3001/repairs/addrepair", {
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(data),
        });
    }
;

const fetchGetAllRepairs = async () => {
    const response = await fetch("http://localhost:3001/repairs/", {method: "GET"});
    return await response.json();
};

const fetchGetRepairById = async (id) => {
    const response = await fetch("http://localhost:3001/repairs/repair-" + id, {method: "GET"});
    return await response.json();
};


export const getAllRepairs = () =>
    async () => {
        const repairs = await fetchGetAllRepairs();
        repairActions.setRepairs(repairs)
    };

export const getRepairById = (id) => (
    async () => {
        const repairDetails = await fetchGetRepairById(id);
        repairActions.setRepairDetails(repairDetails)
    });

export const addRepair = (data) =>
    async () => {
        await fetchAddRepair(data);
        repairActions.addRepair(data)
    };

export const updateRepairData = async (repairId, dataName, newDataValue) => {
    let allRepairs = store.getState().repairs;
    let repairDetails = store.getState().repairDetails
    let repairArrayIndexForUpdate = null;
    for (const item in allRepairs) {
        if (allRepairs[item].repairId === repairId) {
            repairArrayIndexForUpdate = item;
            break
        }
    }
    allRepairs[repairArrayIndexForUpdate][dataName] = newDataValue;
    repairActions.setRepairs(allRepairs);

    repairDetails[0][dataName] = newDataValue;
    repairActions.setRepairDetails(repairDetails)

};