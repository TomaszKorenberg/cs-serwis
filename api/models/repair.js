const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Repairs = sequelize.define('repair', {
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
        defaultValue: Sequelize.NOW
    },
    clientID:{
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
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


module.exports = Repairs;

