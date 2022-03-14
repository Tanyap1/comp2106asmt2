var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var index = require('./controllers/index');
var users = require('./controllers/users');

//add the employees 
const employees = require('./controllers/employees')



var app = express();



//used env file for db connection
if(process.env.NODE_ENV !=='production'){
  require('dotenv').config()
}

//passport config

const passport= require ('passport')
const session = require('express-session')

//enable session
app.use(session({
  secret:'could-hardcode-here',
  resave:true,
  saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())


//mongoose
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {

}).then((res)=>{
  console.log('connected to DB')
}).catch(()=>{
  console.log('DB connection failed')
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/employees', employees)//map employees to the right controller

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
