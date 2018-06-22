const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sqlite3 = require('sqlite3').verbose();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authorisationRouter = require('./routes/authorisation');
const projectsRouter = require('./routes/projects');

const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const app = express();

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

app.use(logger());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/projects', projectsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', authorisationRouter);

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
