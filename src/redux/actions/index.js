import {bindActionCreators} from "redux";
import {store} from "../store/store";
import {SET_REPAIRS, ADD_REPAIR} from '../reducers/repairsTypes'

const addRepair = (repair) => ({
    type: ADD_REPAIR,
    repair
});
//todo: rodzielić akcje na osobne moduły
const setRepairs = (repairs) => ({
    type: SET_REPAIRS,
    repairs
});

const setRepairDetails = (repairDetails) => ({
    type: "SET_REPAIR_DETAILS",
    repairDetails
});


const addClient = (client) => ({
    type: 'ADD_CLIENT',
    client
});

const setLeftMenu = (menuItems) => (
    {
    type: "SET_MENU",
    leftMenu: menuItems
});



const repairActions = bindActionCreators({addRepair, setRepairs, setRepairDetails}, store.dispatch);
const clientActions = bindActionCreators({addClient}, store.dispatch);
const leftMenuActions = bindActionCreators({setLeftMenu}, store.dispatch);


export {repairActions, clientActions, leftMenuActions}