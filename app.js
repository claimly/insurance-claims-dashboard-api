const express = require('express'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      errorhandler = require('errorhandler'),
      index = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);

const inProduction = process.env.NODE_ENV === 'production';

if (!inProduction) {
  app.use(errorhandler());
  app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({err});
  });
} else {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: {}
    }});
  });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

const server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});