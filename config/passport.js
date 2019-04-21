const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require('../models/user');

passport.use(new LocalStrategy((username, password, done) => {
  models.User
  .find({ where: { username: username } })
  .then((user) => { // successful query to database
    if(!user) {
      return done(null, false, { message: 'Unknown user ' + username });
    }
    models.User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) {
        return done(err);
      }
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid password' });
      }
    });
  })
  .catch((err) => { // something went wrong with query to db
    done(err);
  });
}));

// serialize session, only store user id in the session information
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// from the user id, figure out who the user is...
passport.deserializeUser((userId, done) => {
  models.User
    .find({ where: { id: userId } })
    .then((user) => {
      done(null, user);
    }).catch((err) => {
      done(err, null);
    });
});
