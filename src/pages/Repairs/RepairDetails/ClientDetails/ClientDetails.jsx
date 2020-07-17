import React from 'react';
import "../RepairDetails.scss"


const ClientDetails = ({repairDetails}) => {

    return (
        <div className={"clientData"}>
            Dane klienta:
            <ul>
                <li><b>Klient:</b> {repairDetails.client.name} {repairDetails.client.lastName}</li>
                <li><b>Numer do klienta:</b> {repairDetails.client.contactNumber ? repairDetails.client.contactNumber : "Brak"}</li>
                <li><b>Email do klienta:</b> {repairDetails.client.email ? repairDetails.client.email : "Brak"}</li>
                <li><b>Adres:</b> {repairDetails.client.streetAdress}<br/>{repairDetails.client.postalCode} {repairDetails.client.city}</li>
            </ul>
        </div>

    );
};

export default ClientDetails;