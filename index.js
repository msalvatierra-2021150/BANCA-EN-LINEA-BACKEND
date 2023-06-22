//Importaciones principales
require('dotenv').config();
const { adminAppDefCreate } = require('./controllers/admin');

adminAppDefCreate();

//Importación de archivos
const Server = require('./models/server');

//Instancia del servidor de arranque
const servidorIniciado = new Server();

//Llamar al método listen que levanta el servidor
servidorIniciado.listen();