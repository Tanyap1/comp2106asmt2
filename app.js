var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var index = require('./controllers/index');
var users = require('./controllers/users');

//add the employees 
const employees = require('./controllers/employees')

//add auth
const auth = require('./controllers/auth')

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
  secret: process.env.SESSION_SECRET,//we can hard code the secret session as secret:process.env.SESSION_SECRET
  resave:true,
  saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())

let User = require('./models/user')
passport.use(User.createStrategy())

// set up passport to read/write user data to/from the session object
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


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
app.use('/auth',auth)
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
