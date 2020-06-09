import {bindActionCreators} from "redux";
import {store} from "../store/store";

const addRepair = (repair) => ({
    type: 'ADD_REPAIR',
    repair:repair
});

const addClient = (client) => ({
    type: 'ADD_CLIENT',
    client
});

const repairActions = bindActionCreators({addRepair}, store.dispatch);
const clientActions = bindActionCreators({addClient}, store.dispatch);


export {repairActions, clientActions}