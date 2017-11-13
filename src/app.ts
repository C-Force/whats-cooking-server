import * as express from 'express';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'body-parser';
import mongoose = require('mongoose');
import * as passport from 'passport';

// import * as path from 'path';
// import * as fs from 'fs';
// import Dish from './models/dish';

// import * as _LocalStrategy from 'passport-local';
// const LocalStrategy = _LocalStrategy.Strategy;

import { config } from './lib/config';
import index from './routes/index';
import User from './models/user';

import loginRouter from './routes/login';
import registerRouter from './routes/register';
import dishRouter from './routes/dish';
import userRouter from './routes/user';

mongoose.Promise = global.Promise;

mongoose.connect(config.mongoUrl, { useMongoClient: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected correctly to server");
})

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// passport config
app.use(passport.initialize());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', index);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/dish', dishRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if(app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    //res.status(err.status || err.error.status || err.error.cause.status || 500);
    res.status((err && err.status) || (err.error && err.error.status) || 500).json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status((err && err.status) || (err.error && err.error.status) || 500).json({
    message: err.message,
  });
});

// console.log(path.join(__dirname, 'data.json'));
// const content = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8');
// const result = JSON.parse(content);
// Dish.insertMany(result.dishes, (err, doc) => {
//   console.log("Successful!");
// });

export default app;