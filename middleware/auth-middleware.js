const jwt = require('../security/jwt')
const delay = require('delay');

module.exports = (req, res, next) => {
  //Establecer un time para ejecutar el codigo
  delay(500).then( () => {
    // Valida tods las routes GET, pero /veriy
    if(req.method === 'GET' && req.path != '/verify') {
      next(); // Continuar con Json Server Router
      return true; 
    }
    
    if (isLoggedIn(req)) { // Agregar la autorizacion si esta loguiado
      next(); // Continuar con Json Server Router
    } else {
      res.status(401).send('Not logged in'); //Mensaje de error
    }
  });
 }

function isLoggedIn(req) {
  let token = req.body.token; //Se toma el token enviado
  console.log('token', token); //Se muestra el token por consola
  let session = jwt.verify(token); //Se realiza la verificacion del token 
  console.log('Session:\n', session); //Se muestran por consola
  if (session) {
    req.usuario = session.email;
    return true;
  } else {
    return false;
  }
}