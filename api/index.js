const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require('./utils/database');
const config = require('./config');
const path = require('path');



app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

require('./routes/clients')(app);
require('./routes/repairs')(app);
require('./routes/devices')(app);
require('./routes/auth')(app);

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


