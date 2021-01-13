const jwt = require('../security/jwt');
const delay = require('delay');

module.exports = (userStorage) => {
  return function (req, res) {
    let user = req.body; //Se asignan los datos recibidos
    delay(1000).then(() => { //Se establece un time para simular la consulta API
      if(userStorage.registerUser(user)) { //Se veriffica que este registrado
        console.log('User signed in'); //
        res.status(201).json('User signed in successfully');
      } else {
        console.log('User not signed in');
        res.status(401).send('User not signed in');
        res.send();
      }
    })
  }

}
