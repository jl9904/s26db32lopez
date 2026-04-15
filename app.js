var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    Account.findOne({ username: username })
      .then(function (user) {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        user.authenticate(password, function(err, result) {
            if (result) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        });
      })
      .catch(function(err) {
        return done(err);
      });
  }
));

require('dotenv').config();
const connectionString = process.env.MONGO_CON;
mongoose = require('mongoose');
mongoose.connect(connectionString);

// Get the default connection
var db = mongoose.connection;

// Bind connection to error event 
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
  console.log("Connection to DB succeeded");
});

var Lighthouse = require("./models/lighthouse");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var lighthouseRouter = require('./routes/lighthouse');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
var Account = require('./models/account');
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/lighthouses', lighthouseRouter);
app.use('/grid', gridRouter);
app.use('/selector', pickRouter);
app.use('/resource', resourceRouter);
// passport config
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


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

// We can seed the collection if needed on server start
async function recreateDB(){
    // Delete everything
    await Lighthouse.deleteMany();

    let instance1 = new Lighthouse({
        name: "Old Point Loma", 
        location: "San Diego, CA",
        height: 40
    });
    instance1.save().then(doc => {
        console.log("First object saved");
    }).catch(err => {
        console.error(err);
    });

    let instance2 = new Lighthouse({
        name: "Cape Hatteras", 
        location: "Buxton, NC",
        height: 198
    });
    instance2.save().then(doc => {
        console.log("Second object saved");
    }).catch(err => {
        console.error(err);
    });

    let instance3 = new Lighthouse({
        name: "Portland Head Light", 
        location: "Cape Elizabeth, ME",
        height: 80
    });
    instance3.save().then(doc => {
        console.log("Third object saved");
    }).catch(err => {
        console.error(err);
    });
}

let reseed = true;
if (reseed) { recreateDB(); }

module.exports = app;
