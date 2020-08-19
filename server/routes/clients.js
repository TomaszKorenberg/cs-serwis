const Client = require("./../models/client");


module.exports = (app) => {
    app.post("/clients/addclient", (req, res) => {
        Client.create({
            name: req.body.firstName,
            lastName: req.body.lastName,
            contactNumber: req.body.phoneNumber,
            email: req.body.email,
            streetAdress: req.body.adress, //do poprawy aby front przesyłał rozbity adres
            postalCode: null,
            city: null
        })
            .then(() => {
                res.status(200).send("Created new client")
            })
            .catch(err => {
                throw new Error(err)
            })
    });
};

