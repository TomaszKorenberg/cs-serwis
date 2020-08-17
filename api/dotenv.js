const dotenv = require('dotenv');
const path = require('path');


module.exports = () => {
    return dotenv.config({ path: path.join(__dirname, ".env")}).parsed;
};