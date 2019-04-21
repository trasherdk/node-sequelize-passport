// boilerplate to import all models in the folder
// taken from sequelize website

// make sure to have a method named "associate" in the class Methods
// this is used to build the association between various tables
"use strict";

const config = require('../config');

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.db, config.dbuser, config.dbpass, {
  dialect: "mysql",
  host: config.dbserver,
  port:    3306,
});

// backend model reference object, used to expose everything in it
// for everyone to use
var db = {};

// read all files present in the folder except index.js
// ., .. and hidden files
// import each module into the db object
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

// Make associations if we have an association with the table
Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

// export stuff
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


/*

exports.users = require('./user');

*/
