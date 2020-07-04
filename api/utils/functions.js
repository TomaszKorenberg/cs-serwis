const Devices = require("./../models/device");
const Clients = require("./../models/client");


const changeIdsToObjectWithData = async (data) => {

    // rename keys
    let str = JSON.stringify(data);
    str = str.replace(/deviceId/g, 'device');
    str = str.replace(/clientId/g, 'client');
    data = JSON.parse(str);

    // change id to object with details
    for (let item of data) {
        let deviceId = item.device;
        let clientId = item.client;
        item.device = await Devices.findOne({
            where: {deviceId},
            raw: true,
            nest: true});
        item.client = await Clients.findOne({
            where: {clientId},
            raw: true,
            nest: true});
    }
    return data
};

module.exports = {changeIdsToObjectWithData};