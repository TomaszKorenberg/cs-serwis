const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Client = sequelize.define('client', {
    clientId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    lastName: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    contactNumber: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    streetAdress: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    postalCode: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    city: {
        type: Sequelize.TEXT,
        allowNull: true
    },
});


module.exports = Client;

