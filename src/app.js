import express from 'express';
import engine from 'ejs-mate';
import { dirname, join} from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import flash from 'connect-flash';

import logger from './logger.js';
import { HOST, PORT } from './config.js';
import indexRoutes from './routes/indexRoutes.js';
import empleadosRoutes from './routes/empleadosRoutes.js';


// Express App
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Settings
app.set('appName', 'TodoRutas');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set("views", join(__dirname,'views'));

// Middleware
// Definición de sesiones
app.use(session({
  secret: 'todorutas-session',
  resave: false,
  saveUninitialized: false
}));
// Mensajes alertas en vistas
app.use(flash());
app.use((req, res, next)=>{
  app.locals.messageSuccess = req.flash('messageSuccess');
  app.locals.messageError = req.flash('messageError');
  next();
});
// Directorios públicos que puede acceder el navegador
app.use('/', express.static(join(__dirname,'public')));
app.use('/', express.static('node_modules/@popperjs/core/dist/umd/'));
app.use('/', express.static('node_modules/bootstrap/dist/js'));
// Body parser json
app.use(express.json());
// Para acceder a body en formularios método POST
app.use(express.urlencoded({ extended: true}));
  
// Routes
app.use('/', indexRoutes);
app.use('/empleados', empleadosRoutes);

// 404 page
app.use((req, res) => {
  logger.error(`RUTA NO ENCONTRADA - ruta: ${req.path}`);
  res.status(404).render('404', { title: '404' });
});

app.listen(PORT, () => {
  logger.info(`Servidor iniciado en http://${HOST}:${PORT}`);
});