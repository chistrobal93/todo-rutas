const express = require('express');
const app = express();
const todorutasRoutes = require('./routes/todorutasRoutes');

//Settings
app.set('appName', 'TodoRutas');
app.set('view engine', 'ejs');
app.set('port', 3000);
app.set("views","./src/views");

// Hacer publico para la app carpeta public y elementos bootstrap
app.use(express.static('public'));
app.use('/scripts', express.static('node_modules/@popperjs/core/dist/umd/'));
app.use('/scripts', express.static('node_modules/bootstrap/dist/js'));

app.use(todorutasRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });
  
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
});