import {repairActions} from "./actions/index";

const fetchAddRepair = async (data) => {
    await fetch("http://localhost:3001/repairs/addrepair", {
        method:"POST",
        headers: {'Content-Type': "application/json"},
        body:JSON.stringify(data),
    });
    }
;

const fetchGetAllRepairs = async() => {
        const response = await fetch("http://localhost:3001/repairs/", {method:"GET"});
        const json = await response.json();
        return json;
    };


export const getAllRepairs = () =>
    async () => {
        const repairs = await fetchGetAllRepairs();
        repairActions.setRepairs(repairs)
    };

export const addRepair = (data) =>
    async () => {
        await fetchAddRepair(data);
        repairActions.addRepair(data)
    };