const Devices = require("./../models/device");

const changeDevicesIdToDevicesName = async (data) => {

    // rename "deviceId" key to "device"
    let str = JSON.stringify(data);
    str = str.replace(/deviceId/g, 'device');
    data = JSON.parse(str);

    // change device id to object with device details
    for (let item of data) {
        let deviceId = item.device;
        item.device = await Devices.findOne({
            where: {deviceId},
            raw: true,
            nest: true})
    }
    return data
};

module.exports = {changeDevicesIdToDevicesName};