const express = require('express');
require('dotenv').config();
const engine = require('ejs-mate');
const logger = require("./logger");
const parquesModel = require('./models/parquesModel');

// Express App
const app = express();

// Settings
app.set('appName', 'TodoRutas');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', 3000);
app.set("views","./src/views");

// Hacer publico para la app carpeta public y elementos bootstrap
app.use('/', express.static('public'));
app.use('/', express.static('node_modules/@popperjs/core/dist/umd/'));
app.use('/', express.static('node_modules/bootstrap/dist/js'));

// Rutas
app.use('/', require('./routes/indexRoutes'));
app.use('/mantenedor', require('./routes/mantenedorRoutes'));

// 404 page
app.use((req, res) => {
    logger.error(`RUTA NO ENCONTRADA - ruta: ${req.path}`);
    res.status(404).render('404', { title: '404' });
  });
  
app.listen(app.get('port'), () => {
  logger.info(
    `Servidor iniciado en puerto ${app.get('port')}`
  )
});

// Para probar agregar. Tira error foreign key para cod estado. funciona agregando en tipo_parque (1, Publico)
// parquesModel.guardarParque(1,1,"Torres del paine","Sur","1234","hola.com",11,1,"horario","www.parque.cl","reserva.com");