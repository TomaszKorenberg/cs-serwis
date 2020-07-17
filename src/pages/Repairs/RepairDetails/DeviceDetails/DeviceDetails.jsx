import React from 'react';
import "../RepairDetails.scss"
import moment from "moment";


const DeviceDetails = ({repairDetails}) => {

    return (
        <div className={"deviceData"}>
            Dane naprawy:
            <div className={"deviceDataContent"}>
                <div>
                    <ul>
                        <li><b>ID naprawy:</b> {repairDetails.repairId}</li>
                        <li><b>Producent:</b> {repairDetails.device.manufacturer}</li>
                        <li><b>Model:</b> {repairDetails.device.model}</li>
                        <li><b>S/N:</b> {repairDetails.serialNumber}</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li><b>Opis usterki:</b> {repairDetails.faultDescription}</li>
                        <li><b>Data
                            dodania:</b> {moment(repairDetails.dateOfAdd).locale("pl").format("YYYY-MM-DD HH:mm")}</li>
                        <li><b>Naprawa gwarancyjna:</b> {repairDetails.isWarranty ? "Tak" : "Nie"}</li>
                        <li><b>Przypisany
                            pracownik:</b> {repairDetails.assignedEmployee ? repairDetails.assignedEmployee : "Brak"}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default DeviceDetails;