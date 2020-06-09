const Sequelize = require("sequelize");
const config = require('../config');
const sequelize = new Sequelize(config.database.database, config.database.user, config.database.password,
    {
        dialect: 'postgres',
        host: config.database.host,
        define: {
            timestamps: false
        },
        dialectOptions: {
            ssl: config.database.ssl
        },
        logging: false
    });

module.exports = sequelize;