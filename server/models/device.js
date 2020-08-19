const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Device = sequelize.define('device', {
    deviceId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    manufacturer: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    model: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    type: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },

});


module.exports = Device;

