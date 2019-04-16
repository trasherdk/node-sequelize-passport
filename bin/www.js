/* eslint-disable no-console */
'use strict';

/**
* Module dependencies.
*/

var app = require('../app');
var debug = require('debug')('node-sequelize-passport:server');
var http = require('http');

/**
* Get port from environment and store in Express.
*/
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
* Create HTTP server.
*/
var server = http.createServer(app);

/**
* Listen on provided port, on all network interfaces.
*/
var models = require('../models');
models
  .sequelize
  //.sync({ force: true }) // !!!CAUTION: wipe out the entire database
  .sync() // use this instead, just sync model and the database
  .then(function() {
    console.log("Sequelize: Sync succeeded");
    console.log("Server: Start listening on "+ port);
    
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
}).catch(function(err) {
  throw err;
});

/**
* Normalize a port into a number, string, or false.
*/
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Server: Listening on ' + bind);
}
