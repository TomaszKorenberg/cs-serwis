const Repairs = require("./../models/repair");
const {changeDevicesIdToDevicesName} = require("../utils/functions")


module.exports = (app) => {

    // ADD NEW REPAIR

    app.post("/repairs/addrepair", (req, res) => {
        Repairs.create({
                deviceId: req.body.deviceId,
                serialNumber: req.body.serialNumber,
                faultDescription: req.body.faultDescription,
                dateOfAdd: new Date(Date.parse(req.body.dateOfAdd)),
                clientId: req.body.clientID,
                isWarranty: req.body.isWarranty,
                comments: req.body.comments,
                assignedEmployee: req.body.assignedEmployee,
            }
        )
            .then(() => {
                res.status(200).send("Created new repair")
            })
            .catch(err => {
                throw new Error(err);
            })
    });

    // GET ALL REPAIRS

    app.get("/repairs", (req, res) => {
        Repairs.findAll()
            .then(changeDevicesIdToDevicesName)
            .then(response => res.status(200).send(response))
            .catch(err => {
                throw new Error(err)
            })
    });

    // GET ONE REPAIR BY ID

    app.get("/repairs/repair-:repairId", (req, res) => {
        Repairs.findOne({where: {repairId: req.params.repairId}})
            .then(response => res.status(200).send(response))
            .catch(err => {
                throw new Error(err)
            })
    })
};
