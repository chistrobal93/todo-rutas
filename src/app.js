const express = require('express');
require('dotenv').config();
const engine = require('ejs-mate');
const logger = require("./logger");

// Express App
const app = express();

// Settings
app.set('appName', 'TodoRutas');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', 3000);
app.set("views","./src/views");

app.listen(app.get('port'), () => {
  logger.info(
    `Servidor iniciado en puerto ${app.get('port')}`
  )
});

// Middleware
  // Directorios públicos que puede acceder el navegador
app.use('/', express.static('public'));
app.use('/', express.static('node_modules/@popperjs/core/dist/umd/'));
app.use('/', express.static('node_modules/bootstrap/dist/js'));
  // Para aceptar formularios metodo POST
app.use(express.urlencoded({ extended: true}));

// app.use((req, res, next) => {
//   res.locals.path = req.path;
//   next();
// });

// Rutas
app.use('/', require('./routes/indexRoutes'));
app.use('/mantenedor', require('./routes/mantenedorRoutes'));

// 404 page
app.use((req, res) => {
    logger.error(`RUTA NO ENCONTRADA - ruta: ${req.path}`);
    res.status(404).render('404', { title: '404' });
  });