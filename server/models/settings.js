const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Settings = sequelize.define('settings', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    wFirmaNickname: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    wFirmaPassword: {
        type: Sequelize.TEXT,
        allowNull: true
    }

});


module.exports = Settings;

