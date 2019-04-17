const path = require('path');
require('dotenv').config();


const dbconfig = {
    dbserver: process.env.DBSERVER,
    dbuser: process.env.DBUSER,
    dbpass: process.env.DBPASS,
    db: process.env.DB
  };


const defaults = {
    root: path.normalize(__dirname + '/..'),
    port: 3000
  };

module.exports = Object.assign({}, dbconfig, defaults);
