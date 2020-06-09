const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require('./utils/database');
const config = require('./config');


app.use(cors());
app.use(express.json());

require('./routes/clients')(app);
require('./routes/repairs')(app);

sequelize
    .sync()
    .then(() => {
        console.log("Sequelize OK, database connected")
    })
    .catch(err => {
        throw new Error(err)
    });

const runSerer = port => {
    app.listen(port);
    console.log("Server started at http://localhost:" + port)
};

runSerer(config.server.port);


