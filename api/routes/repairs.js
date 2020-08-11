const Repairs = require("./../models/repair");
const {changeIdsToObjectWithData} = require("../utils/functions");


module.exports = (app) => {

    // ADD NEW REPAIR

    app.post("/repairs/addrepair", (req, res) => {
        Repairs.create({
                deviceId: req.body.deviceId,
                serialNumber: req.body.serialNumber,
                faultDescription: req.body.faultDescription,
                dateOfAdd: new Date(Date.parse(req.body.dateOfAdd)),
                clientId: req.body.clientId,
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
            .then(response => changeIdsToObjectWithData(response))
            .then(response => res.status(200).send(response))
            .catch(err => {
                throw new Error(err)
            })
    });

    // GET ONE REPAIR BY ID

    app.get("/repairs/repair-:repairId", (req, res) => {
        Repairs.findOne({where: {repairId: req.params.repairId}})
            .then(response => changeIdsToObjectWithData([response]))
            .then(response => res.status(200).send(response))
            .catch(err => {
                throw new Error(err)
            })
    });

    // CHANGE REPAIR STATUS

    app.put("/repairs/repair-:repairId/change-status", (req, res) => {
        Repairs.findOne({where: {repairId: req.params.repairId}})
            .then(response => {
                response.status = req.body.newStatus;
                response.save()
            })
            .then(res.status(200).send("Repair status changed"))
            .catch(err => {
                throw new Error(err)
            })
    })
};
