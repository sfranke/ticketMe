var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var io = require('socket.io')();

var routes = require('./routes/index');
var register = require('./routes/register');
var userAdd = require('./routes/userAdd');
var dashboard = require('./routes/dashboard');
var login = require('./routes/login');
var logout = require('./routes/logout');
var users = require('./routes/users');
var tickets = require('./routes/tickets');
var createTicket = require('./routes/createTicket');
var editComment = require('./routes/editComment');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({resave: true, saveUninitialized: true, secret: 'ljR4sdf076asdGEewXxklv'}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use('/', routes);
app.use('/register', register);
app.use('/userAdd', userAdd);
app.use('/dashboard', dashboard);
app.use('/login', login);
app.use('/logout', logout);
app.use('/users', users);
app.use('/tickets', tickets);
app.use('/createTicket', createTicket);
app.use('/editComment', editComment);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
