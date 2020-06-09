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
    async (dispatch) => {
        const repairs = await fetchGetAllRepairs();
        repairs.map(repair => repairActions.addRepair(repair))
    };

export const addRepair = (data) =>
    async (dispatch) => {
        await fetchAddRepair(data);
        repairActions.addRepair(data)
    };