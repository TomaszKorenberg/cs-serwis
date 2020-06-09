import { combineReducers } from "redux";
import { repairs } from "./repairs";
import {clients} from "./clients";

export default combineReducers({ //combine reducers łączy wiele reducerów w jeden - w tym przypadku wrzucamy contacts.js
    repairs,
    clients
});