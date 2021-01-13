// GET JSON file in args 
const yargs = require('yargs');
yargs.options({
  //Puerto a traves del cual se realiza el enlace
  port: {
    alias: 'port',
    description: 'Set port',
    default: 3000
  },
  file: {
    alias: 'file',
    description: 'Set JSON File',
    default: './json-samples/default.json'
  },
  //Habilita la autenticacion routes
  authentication: {
    alias: 'auth',
    description: 'Enable authenticaded routes',
    default: 'true'
  },
  //Establece el tiempo de respuesta para simular la consulta API
  delay: {
    alias: 'delay',
    description: 'Miliseconds delay before response',
    default: '1500'
  }
});

console.log(yargs.argv); //Mostrar la configuracion inicial de la API
//Importar jsonserver, crear server, router y middleware
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(yargs.argv.file);
const middlewares = jsonServer.defaults();

// bodyParser, load json-server son las instancias a usar en el proyecto
server.use(jsonServer.bodyParser)

// Usar json-server middlewares 
server.use(middlewares);

// conigurar el user storage con un usuario por defecto que pueda acceder a la API
const userStorage = require('./security/users-storage')({
  email: 'user@gmail.com',
  password: '1234'
});
userStorage.logUsers();

// Se define la route para el proceso de login
const login = require('./routes/login-route')(userStorage);
server.post('/login', login); //Se realiza una peticion post para /login

// se define la route para el proceso de register
const register = require('./routes/sign-in-route')(userStorage);
server.post('/sign-in', register);// Se realiza una peticion post para /sign-in

// Se agrega la autorizacion si esta loguiado 
if (yargs.argv.authentication === 'true') {
  const authMiddleware = require('./middleware/auth-middleware');
  server.use(authMiddleware);
}

// Establecer un time para la ejecucion del proceso para simular una consulta API
const delayMiddleware = require('./middleware/delay-middleware')(yargs.argv.delay);
server.use(delayMiddleware);

// Se desarrolla el proceso de verificar el Token recibido y emitir una respuesta
const verify = require('./routes/verify-route');
server.post('/verify', verify);

// Start JSON Server
server.use(router); 
server.listen(yargs.argv.port, () => { //Mostrar lsos datos de inicio
  console.log(`
JSON Server is running on port ${yargs.argv.port}
http://localhost:${yargs.argv.port}
`)
});