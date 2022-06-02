const express = require('express');
const mongoose = require('mongoose');

// Express App
const app = express();

// Conectar a MongoDB
// const dbURI = 'mongodb+srv://tobal:ABCabc123!!@todorutas.hxl4m.mongodb.net/TodoRutas?retryWrites=true&w=majority';
// mongoose.connect(dbURI)
//  .then((result) => console.log('Conectado a MongoDB'))
//  .catch((err) => console.log(err))

// Settings
app.set('appName', 'TodoRutas');
app.set('view engine', 'ejs');
app.set('port', 3000);
app.set("views","./src/views");

// Hacer publico para la app carpeta public y elementos bootstrap
app.use(express.static('public'));
app.use('/scripts', express.static('node_modules/@popperjs/core/dist/umd/'));
app.use('/scripts', express.static('node_modules/bootstrap/dist/js'));

// Rutas
app.use('/', require('./routes/rutas'));

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });
  
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
});