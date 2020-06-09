const Repairs = require("./../models/repair");



module.exports = (app) => {
    app.post("/repairs/addrepair", (req, res) => {
        Repairs.create({
                manufacturer: req.body.manufacturer,      //todo:podminić na dane wysyłane z frontendu
                model: req.body.model,
                serialNumber: req.body.serialNumber,
                faultDescription: req.body.faultDescription,
                dateOfAdd: new Date(Date.parse(req.body.dateOfAdd)),
                // clientID: req.body.clientID,
                isWarranty: req.body.isWarranty,
                //comments: req.body.comments,
                //assignedEmployee: req.body.assignedEmployee,
            }
        )
            .then(() => {
                res.status(200).send("Created new repair")
            })
            .catch(err => {
                throw new Error(err);
            })
    });

    app.get("/repairs", (req, res) => {
        Repairs.findAll()
            .then(response => res.status(200).send(response))
            .catch(err => {
                throw new Error(err)
            })
    })
};
