const Device = require("./../models/device");
const express = require("express")
const Sequelize = require("sequelize")
const Op = Sequelize.Op;


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
    })

    // app.get("/devices/search", (req,res)=>{
    //     console.log("aaa")
    //     const text = req.query.text.toLowerCase()
    //
    //     Device
    //         .findAll()
    //         .then(devices =>{
    //             const searchObjects = devices
    //                 .filter(device => (
    //                     device.manufacturer.toLowerCase().includes(text) || device.model.toLowerCase().includes(text)
    //                 ))
    //             const searchText = []
    //
    //             searchObjects.forEach(device => {
    //                 searchText.push(device.model)
    //                 searchText.push(device.manufacturer)
    //             })
    //
    //             res.json({searchText})
    //         })
    // })


    app.get("/devices/search", (req, res) => {
        const text = req.query.text
        Device.findAll({
            where: {
                [Op.or]:{
                    manufacturer: {[Op.iLike]: `%${text}%`},
                    model: {[Op.iLike]: `%${text}%`}
                }}
        })
            .then(devices => {
                // console.log(devices)
                res.json({devices})


            })
    })
};

