class UserStorage {

  constructor() {
    this.users = [];
  }

  logUsers() { //Mostrar los usuarios que se encuentran definidos en memoria
          console.log(` User store in memory. Current users in store:`);
                          for(let i = 0; i < this.users.length; i++) {
                            console.log(this.users[i]);
                          }
              }

  registerUser(user) { //Proceso para realizar un /login
    if(user && user.email && user.password) { //Verifica que exista el objeto user y propiedades
      if(! this.chekEmailInUse(user.email)) { //Chequear el email en uso, no puede conincidir con una existente
        this.users.push(user);
        console.log(this.logUsers()); //Mostrar por consola todos los que estan memoria
        return true;
      }
    }
    return false;
  } 

  chekEmailInUse(email) { //Chequear los email, sino existe true, false en caso contrario
    for(let i = 0; i < this.users.length; i++) {
      if(this.users[i].email === email) {
        return true;
      }
    }
    return false;
  }

  userExists(user) { //Verifica que el user existe en memoria
    for(let i = 0; i < this.users.length; i++) {
      if(user.email === this.users[i].email && user.password === this.users[i].password) {
        console.log(this.logUsers());
        return true;
      }
    }
    return false;
  }
} 

module.exports = (user) => {
  userStorage = new UserStorage();
  userStorage.registerUser(user);
  return userStorage;
}
 
