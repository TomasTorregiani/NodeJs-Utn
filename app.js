var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session') // Importo express-session

/* var indexRouter = require('./routes/index'); */
var usersRouter = require('./routes/users');
var contactRouter = require('./routes/contact')
var pageNotAvailableRouter = require('./routes/pageNotAvailable')
var productsRouter = require('./routes/products')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({                   //Inicializo express-session
  secret: "NoSeQuePonerPeroTieneQueSerAlgoLargo",
  resave: false,
  saveUninitialized: true
}))

/* app.use('/', indexRouter); */
app.use('/users', usersRouter);
app.use('/contact', contactRouter);
app.use('/pageNotAvailable', pageNotAvailableRouter);
app.use('/products', productsRouter)


app.get('/', (req, res) => {
  const usuario = Boolean(req.session.nombre)
  res.render('index', {
    title: 'Completa el formulario',
    usuario: usuario,
    nombre: req.session.nombre
  })
})


app.post('/ingresar', (req, res) => {
  if(req.body.nombre) {
    req.session.nombre = req.body.nombre
  }
  res.redirect('/')
})

app.get('/salir', (req, res) => {
  req.session.destroy(),
  res.redirect('/')
})


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
