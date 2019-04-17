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
const models = join(__dirname, 'models');

// Bootstrap models
fs
  .readdirSync(models)
  .filter(file => ~file.indexOf('.js'))
  .forEach(file => require(join(models, file)));
