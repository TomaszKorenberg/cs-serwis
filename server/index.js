const path = require('path');
require("./dotenv")();
const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require('./utils/database');
const config = require('./config');
const passport = require('./auth/auth')

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "development"){
    app.use(cors());
}


require('./routes/clients')(app);
require('./routes/repairs')(app);
require('./routes/devices')(app);
require('./routes/auth')(app);
require('./routes/warehouse')(app);


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../build')));
    app.get('/*', (req, res) => {
        console.log("This is production");
        res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });
}

sequelize
    .sync()
    .then(() => {
        console.log("Sequelize OK, database connected")
    })
    .catch(err => {
        throw new Error(err)
    });

const PORT = config.server.port;

const runSerer = port => {
    app.listen(port);
    console.log("Server started at http://localhost:" + port)
};

runSerer(PORT);


