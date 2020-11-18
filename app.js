//jshint esversion: 6
// ignore this comment, using for linter

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//This is where all the routes will live (basically all the pages)

var indexRouter = require('./routes/index');
var resultsRouter = require('./routes/results');
var yelpRouter = require('./routes/yelp')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//This is where all the pages will actually declared, using '/[pagename]' here
app.use('/', indexRouter);
app.use('/results', resultsRouter);
app.use('/yelp', yelpRouter);



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



// Heroku must listen on a specific port
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);


module.exports = app;
