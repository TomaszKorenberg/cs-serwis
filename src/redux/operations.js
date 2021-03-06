import {repairActions} from "./actions/index";
import {store} from "./store/store";

const fetchAddRepair = async (data) => {
        await fetch(process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_PORT + "/repairs/addrepair", {
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(data),
        });
    }
;

const fetchGetAllRepairs = async () => {
    const response = await fetch(process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_PORT + "/repairs", {method: "GET"});
    return await response.json();
};

const fetchGetRepairById = async (id) => {
    const response = await fetch(process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_PORT + "/repairs/repair-" + id, {method: "GET"});
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

const fetchGetAllProductsFromWarehouse = async () => {
    const wfirmaApiUrl = process.env.REACT_APP_WFIRMA_API_URL;
    const wfirmaUsername = process.env.REACT_APP_WFIRMA_USERNAME;
    const wfirmaPassword = process.env.REACT_APP_WFIRMA_PASSWORD;
    const encodedString = new Buffer(wfirmaUsername + ":" + wfirmaPassword).toString('base64');



    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + encodedString);

    const response = await fetch(wfirmaApiUrl, {
        method: "POST",
        headers
    });

    return await response.json();
};

export const getAllProductsFromWarehouse = () =>
    async () => {
        const products = await fetchGetAllProductsFromWarehouse();
        console.log(products)
        //repairActions.setRepairs(repairs)
    };