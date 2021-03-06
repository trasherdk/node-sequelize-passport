/* eslint-disable no-console */
'use strict';

/**
* Module dependencies.
*/
require('dotenv').config();

const fs = require('fs');
const join = require('path').join;
const express = require('express');
const passport = require('passport');
const session = require('express-session');

const config = require('./config');
console.log('Config:',config);

// Bootstrap models
const models = join(__dirname, 'models');

fs.readdirSync(models)
  .filter(file => ~file.indexOf('.js'))
  .filter(file => file.indexOf('index.js'))
  .forEach(file => {
    require(join(models, file));
    console.log(models, file);
  });

console.log('Models:', models);