var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentsRouter = require('./routes/students');
var schoolRouter = require('./routes/school');
var ordersRouter = require('./routes/orders');
var sectionsRouter = require('./routes/sections');
var teachersRouter = require('./routes/teachers');
var timeTableRouter = require('./routes/timetable');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

let baseUrl = '/timetable/api/v1'

app.use('/', indexRouter);
app.use( baseUrl + '/users', usersRouter);
app.use( '/students', studentsRouter);
app.use( baseUrl + '/school', schoolRouter);
app.use( baseUrl + '/orders', ordersRouter);
app.use( baseUrl + '/sections', sectionsRouter);
app.use( baseUrl + '/teachers', teachersRouter);
app.use( baseUrl + '/timetable', timeTableRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
