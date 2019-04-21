const path = require('path');

const dbconfig = {
    dbserver: process.env.DBSERVER,
    dbuser: process.env.DBUSER,
    dbpass: process.env.DBPASS,
    db: process.env.DB,
    dbforce: true
  };


const defaults = {
    root: path.normalize(__dirname + '/..'),
    port: 3000
  };

module.exports = Object.assign({}, dbconfig, defaults);
