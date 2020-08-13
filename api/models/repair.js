const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Repairs = sequelize.define('repair', {
    repairId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    deviceId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    serialNumber: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    faultDescription: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    dateOfAdd: {                //Date when device was registered to repair
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    dateOfConfirm:{             //Date when service confirm delivery device registered at RMA system
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
    },
    dateOfStartProcessing:{             //Date when service started with order processing
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
    },
    dateOfStartRepair:{         //Date when service started repair
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
    },
    dateOfEndRepair:{           //Date when service ended repair
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
    },
    dateOfPickup:{              //Date when client picked up device
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
    },
    dateOfShipment:{            //Date when service did return shipment
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
    },
    clientId:{
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    isWarranty:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    comments: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    assignedEmployee: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    status: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: "new"
    },
    expertise: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    expectedCost: {
        type: Sequelize.TEXT,
        allowNull: true,
    },

});



module.exports = Repairs;

