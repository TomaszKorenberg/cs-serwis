module.exports = {
  "server": {
    "port": process.env.PORT || "3001"
  },
  "database": {
    "database": process.env.DB_NAME,
    "user": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "host": process.env.DB_HOST,
    "ssl": {
      "require": true,
      "rejectUnauthorized": false
    }
  }
};