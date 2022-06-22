import express from 'express';
import engine from 'ejs-mate';
import { dirname, join} from 'path';
import { fileURLToPath } from 'url';

import logger from './logger.js';
import { PORT } from './config.js';
import indexRoutes from './routes/indexRoutes.js';
import mantenedorRoutes from './routes/mantenedorRoutes.js';


// Express App
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Settings
app.set('appName', 'TodoRutas');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set("views", join(__dirname,'views'));

// Middleware
// Directorios públicos que puede acceder el navegador
app.use('/', express.static(join(__dirname,'public')));
app.use('/', express.static('node_modules/@popperjs/core/dist/umd/'));
app.use('/', express.static('node_modules/bootstrap/dist/js'));
// Para aceptar formularios metodo POST
app.use(express.urlencoded({ extended: true}));
// Body parser json
app.use(express.json());
  
// Rutas
app.use('/', indexRoutes);
app.use('/mantenedor', mantenedorRoutes);

// 404 page
app.use((req, res) => {
  logger.error(`RUTA NO ENCONTRADA - ruta: ${req.path}`);
  res.status(404).render('404', { title: '404' });
});

app.listen(PORT, () => {
  logger.info(`Servidor iniciado en http://localhost:${PORT}`);
});