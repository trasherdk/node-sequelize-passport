/* eslint-disable no-console */
const express = require('express');
const path = require('path');
//const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// add dependencies: passport, passport-local, express-session, connect-flash
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

// Initialize passport variables
const passportConfig = require('./config/passport');

const index_routes = require('./routes/index');
const about_routes = require('./routes/about');

const account_routes = require('./routes/account');
const login_routes = require('./routes/login');
const logout_routes = require('./routes/logout');
const register_routes = require('./routes/register');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//NOTE: don't move this more down than here.. will cause blank database requests
// by passport middleware sitting below
app.use(express.static(path.join(__dirname, 'public')));

// setup the flash message middleware
app.use(flash());

// setup the session middleware
app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// specify controllers to handle various routes
app.use('/', index_routes);
app.use('/about', about_routes);
app.use('/account', account_routes);
app.use('/login', login_routes);
app.use('/logout', logout_routes);
app.use('/register', register_routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'production') {
  // production error handler
  // no stacktraces leaked to user
  console.log("production mode.");

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      request: {
        path: (typeof req.route.path == 'undefined') ? "/" : req.route.path
      },
      User: req.user,
      message: err.message,
      error: {}
    });
  });

} else {
  console.log("development mode.");

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    if (typeof req.route === 'undefined') {
      console.log("Setting req.route");
      req.route = { path: '/' };
    }

    console.log("app.js error req:", req.route);
    res.render('error', {
      request: {
        path: req.route.path
      },
      User: req.user,
      message: err.message,
      errors: err
    });
  });
}



module.exports = app;
