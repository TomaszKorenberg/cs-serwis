const Device = require("./../models/device");


module.exports = (app) => {
    app.post("/devices/adddevice", (req, res) => {
        Device.create({
            manufacturer: "Producent",      //todo:podminić na dane wysyłane z frontendu
            model: "Model",
            type: "Rodzaj urządzenia",
            description: "Opis",
        })
            .then(() => {
                res.status(200).send("Created new device")
            })
            .catch(err => {
                throw new Error(err)
            })
    });
};

