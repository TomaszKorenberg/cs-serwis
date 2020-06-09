const Client = require("./../models/client");


module.exports = (app) => {
    app.post("/clients/addclient", (req, res) => {
        Client.create({
            name: "Imię",      //todo:podminić na dane wysyłane z frontendu
            lastName: "Nazwisko",
            contactNumber: "Numer kontaktowy",
            email: "e-m@il",
            streetAdress: "Ulica i numer",
            postalCode: "Kod-pocztowy",
            city: "Miasto"
        })
            .then(() => {
                res.status(200).send("Created new client")
            })
            .catch(err => {
                throw new Error(err)
            })
    });
};

