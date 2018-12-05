var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var pensumsRouter = require('./routes/pensumsRouter');
var encuestasRouter = require('./routes/encuestasRouter');
var clasesAprobadasRouter = require('./routes/clasesAprobadasRouter');
var usuariosRouter = require('./routes/usuariosRouter');
var catedraticosRouter = require('./routes/catedraticosRouter');
var votosRouter = require('./routes/votosRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
//app.use('/api/users', usersRouter);
app.use('/api/pensums', pensumsRouter);
app.use('/api/encuestas', encuestasRouter);
app.use('/api/clasesAprobadas', clasesAprobadasRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/catedraticos', catedraticosRouter);
app.use('/api/votos', votosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

mongoose.connect('mongodb://jrivera30:Chicoguada14uf@ds155903.mlab.com:55903/restapi',{ useNewUrlParser: true }, function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  else{
    console.log('Conexion base de datos OK');
  }
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