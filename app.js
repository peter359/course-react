var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sqlite3 = require('sqlite3').verbose();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authorisationRouter = require('./routes/authorisation');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var app = express();

passport.use(new LocalStrategy(
  function (username, password, done) {
    app.locals.db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, result) => {
      if (result) {
        return done(null, user);
      }
    });

    return done(null, false, { message: 'Incorrect username or password' });
  }
));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', authorisationRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log(req);

  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Initialize DB
const DB_FILE = './pm_system.db';
const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) throw err;

  //Test if comments table exists - if not create it
  let result = db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?;`, ['users']);

  console.log(result);

  if (!result) {
    console.log('Db not initialized!')
  }
  else {
    console.log(`Successfully connected to SQLite server`);
  }

  //Add db as app local property
  app.locals.db = db;
});

module.exports = app;
