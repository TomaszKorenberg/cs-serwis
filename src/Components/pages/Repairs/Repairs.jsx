import React from 'react';


const data = [
    {
        'id':1,
        'unit':'CDJ-2000XNS',
        'client':'Tomasz Korenberg',
        'fault':"Nie włącza się",
        'repairTime':"8dni",
        'status':"Przyjęte do serwisu"
    },
    {
        'id':2,
        'unit':'DJM-300',
        'client':'Tomasz Korenberg',
        'fault':"Charczy",
        'repairTime':"6dni",
        'status':"Przyjęte do serwisu"
    },
];


const Repairs = () => {
    return (
        //todo:
        //- Dodawanie napraw (modal lub osobna strona)
        //- Edycja naprawy
        //- Statusy napraw
        //- Możliwość rejestrowania napraw online przez klienta
        //- Możliwość obserwacji statusu naprawy przez klienta po przez podanie np. numeru tel i imienia albo numeru seryjnego
        //- Dołączanie zdjęć do zlecenia
        <div>
            Aktualne naprawy:
            {data.map((item) => (
                <p>{item.id} {item.client} {item.unit} {item.fault} </p>))
            }

        </div>
    );
};


export default Repairs;