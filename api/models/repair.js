const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Repair = sequelize.define('repair', {
    repairID: {
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
    serialNumber: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    faultDescription: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    dateOfAdd: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date().toLocaleString()
    },
    clientID:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    isWarranty:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

// Repair.beforeCreate((repair, options) =>{
//     const date = new Date()
//     repair.dateOfAdd = date.toLocaleString()
// });

module.exports = Repair;

