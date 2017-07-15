const express = require('express'),
      cors = require('cors'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      errorhandler = require('errorhandler'),
      mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const inProduction = process.env.NODE_ENV === 'production';


if(inProduction){
  mongoose.connect(process.env.MONGO_URI);
} else {
  mongoose.connect('mongodb://localhost/foo');
  mongoose.set('debug', 'true');
}
require('./models/Claim');
require('./models/User');


app.use(require('./routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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

const server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});