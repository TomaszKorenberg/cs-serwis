const Sequelize = require('sequelize');
const sequelize = require('../utils/database');


const Users = sequelize.define('user', {
    userID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    facebookId: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    firstName: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    role: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    created: {
        type: Sequelize.DATE,
        allowNull: false,
    },
});



module.exports = Users;

