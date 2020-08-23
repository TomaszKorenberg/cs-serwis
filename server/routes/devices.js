const Device = require("./../models/device");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


module.exports = (app) => {
    app.post("/devices/adddevice", (req, res) => {
        Device.create({
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            type: req.body.type,
            description: req.body.description,
        })
            .then((resp) => {
                res.status(200).send(["Created new device", resp.dataValues])
            })
            .catch(err => {
                throw new Error(err)
            })
    });



    app.get("/devices/search", (req, res) => {
        const text = req.query.text;
        Device.findAll({
            where: {
                [Op.or]:{
                    manufacturer: {[Op.iLike]: `%${text}%`},
                    model: {[Op.iLike]: `%${text}%`}
                }}
        })
            .then(devices => {
                console.log(devices)
                res.json({devices})


            })
    })
};

