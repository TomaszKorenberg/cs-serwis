const Repair = require("./../models/repair");


module.exports = (app) => {
    app.get("/repairs/addrepair", (req, res) => {
        Repair.create({
                manufacturer: "Producent",      //todo:podminić na dane wysyłane z frontendu
                model: "Model urządzenia",
                serialNumber: "Numer seryjny",
                faultDescription: "Opis usterki",
                // dateOfAdd: "Da-ta-2020r.",
                clientID: 1,
                isWarranty: true,
            }
        )
            .then(() => {
                res.status(200).send("Created new repair")
            })
            .catch(err => {
                throw new Error(err);
            })
    });
};

