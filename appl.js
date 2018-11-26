var express = require('express');
var bodyParser = require('body-parser');

var app = module.exports.app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));

// parse application/json
app.use(bodyParser.json());

// Adding routes
var server = require(__dirname + '/routes/main');
var mainCode = require(__dirname + '/routes/mainCode/main.js');

app.use('/Service', server);
app.use('/Service/mainCode', mainCode);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/* Error Handlers */
// Development Error Handler
// It will print the Stacktrace of error
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    // res.render('error', {
    //   message: err.message,
    //   error: err
    // });
    res.send({
      message: err.message,
      error: err
    });
  });
}

app.listen(3000,function(){
    console.log("Working on port 3000");
});