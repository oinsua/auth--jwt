const jwt = require('../security/jwt');
const delay = require('delay');

module.exports = (userStorage) => {
  return function (req, res) {
    let session = req.body; //Se asignan los datos recibidos
    delay(1000).then(() => { //Se establece un tiempo de 1s para simular unaconsulta API
      if (userStorage.userExists(session)) { //Se verifica si existe el usuario
        console.log('Login Data Valid'); //Se muestra por consola
        const token = jwt.tokenGeneration(session); //Se verifica el token
        console.log(token); //Se muestra por consola
        res.status(201).json(token); //Se emite un sms 201
      } else {
        console.log('Login attempt failed'); //En caso de no existir o error
        res.status(401).send('login attempt failed'); //sms de error
        res.send();
      }
    });
  }
}
