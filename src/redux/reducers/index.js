import {combineReducers} from "redux";
import {repairs} from "./repairs";
import {clients} from "./clients";
import {leftMenu} from "./leftMenu";
import {repairDetails} from "./repairDetails"

export default combineReducers({ //combine reducers łączy wiele reducerów w jeden - w tym przypadku wrzucamy contacts.js
    repairs,
    clients,
    leftMenu,
    repairDetails
});