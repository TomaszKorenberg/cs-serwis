import React, {useReducer, useState} from 'react';
import {addRepair} from "../../../redux/operations";
import {useDispatch} from "react-redux";
import Button from '@material-ui/core/Button';
import ClientData from "../ClientData/ClientData";
import {Redirect} from "react-router";
import DeviceData from "./DeviceData/DeviceData";
import RepairData from "./RapairData/RepairData";
import "./AddRepair.scss"
import EmployeeData from "../EmployeeData/EmployeeData";
import moment from "moment";

const dateNow = moment().format("YYYY-MM-DD[T]HH:mm");

const initialRepairState = {
    serialNumber: null,
    firstName: null,
    lastName: null,
    faultDescription: null,
    dateOfAdd: dateNow,
    clientId: 0,
    isWarranty: false,
    comments: null,
    assignedEmployee: null
};

const initialInputsErrorValue = {
    firstName: false,
    lastName: false,
    phoneNumber: false,
    serialNumber: false,
    faultDescription: false,
    dateOfAdd: false
};

const addNewClient = async (data) => {
    await fetch("http://localhost:3001/clients/addclient", {
        method: "POST",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(data),
    });
};


const reducer = (state, {field, value}) => {
    console.log(field + ": " + value);
    return {
        ...state,
        [field]: value
    }
};


export default function AddRepair() {
    const dispatch = useDispatch();
    const [state, dispatchState] = useReducer(reducer, initialRepairState);
    const [redirect, setRedirect] = useState(false);
    const [assignedEmployee, setAssignedEmployee] = useState('');
    const [newClientData, setNewClientData] = useState({});
    const [inputsErrorValues, setInputsErrorValues] = useState(initialInputsErrorValue);


    const handleClientChange = (e) => {
        setNewClientData({
            ...newClientData,
            [e.target.name]: e.target.value,
        });
        dispatchState({field: e.target.name, value: e.target.value})
    };

    const handleDeviceSelect = (e, devicesList) => {
        let selectedDevice = (devicesList.filter(item => {
            return item.manufacturer + " " + item.model === e.target.textContent
        })[0]);
        if (!selectedDevice) {
            dispatchState({field: "deviceId", value: 0})
        } else {
            dispatchState({field: "deviceId", value: selectedDevice.deviceId})
        }
    };


    const onRepairChange = e => {
        dispatchState({field: e.target.name, value: e.target.value});
    };

    const handleCheckboxClick = (e) => {
        e.target.value = e.target.checked;
    };

    const handleSelectChange = (e) => {
        setAssignedEmployee(e.target.value);
        onRepairChange(e)
    };

    const handleValidateInputOnBlur = (e) => {
        if (!e.target.value) {
            setInputsErrorValues({
                ...inputsErrorValues,
                [e.target.name]: true
            })
        } else {
            setInputsErrorValues({
                ...inputsErrorValues,
                [e.target.name]: false
            })
        }
    };

    const validateAllEmptyInputs = () => {
        let isAnyRequiredInputIsEmpty = false;
        const errorData = {...inputsErrorValues};

        for (let item in errorData) {
            if (!state || !state[item]) {
                errorData[item] = true;
                isAnyRequiredInputIsEmpty = true
            }
        }
        setInputsErrorValues(errorData);

        if (isAnyRequiredInputIsEmpty) {
        }
    };

    const handleOnSubmit = async () => {

        validateAllEmptyInputs();

        await addNewClient(newClientData);
        dispatch(addRepair(
            {
                deviceId: state.deviceId,
                serialNumber: state.serialNumber,
                faultDescription: state.faultDescription,
                dateOfAdd: state.dateOfAdd,
                dateOfEnd: state.dateOfEnd,
                clientId: state.clientId,
                isWarranty: state.isWarranty,
                comments: state.comments,
                assignedEmployee: state.assignedEmployee
            })
        );
        setRedirect(true)
    };


    return (
        <div>
            {redirect
                ? <Redirect to={"/repairs"}/>
                : null
            }


            <h2 id="transition-modal-title">Dodaj nową naprawę</h2>
            <div className={"wrapper"}>


                <DeviceData onRepairChange={onRepairChange}
                            handleDeviceSelect={handleDeviceSelect}
                            inputsErrorValues={inputsErrorValues}
                            handleValidate={handleValidateInputOnBlur}/>

                <RepairData handleCheckboxClick={handleCheckboxClick}
                            onRepairChange={onRepairChange}
                            inputsErrorValues={inputsErrorValues}
                            handleValidate={handleValidateInputOnBlur}/>
                <EmployeeData handleSelectChange={handleSelectChange}
                              assignedEmployee={assignedEmployee}/>
                <ClientData handleClientChange={handleClientChange}
                            inputsErrorValues={inputsErrorValues}
                            handleValidate={handleValidateInputOnBlur}/>


            </div>
            <Button
                fullWidth={false}
                disableElevation={true}
                onClick={handleOnSubmit}
                variant="outlined"
                size={"medium"}
            >Dodaj naprawę</Button>
        </div>
    );
}