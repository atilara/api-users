var knex = require('../database/connection');
var bcrypt = require('bcrypt');

class User {
  async new(email, name, password) {
    try {
      // Gera a senha em hash
      var hash = await bcrypt.hash(password, 5);

      // Insere os dados no banco de dados
      await knex
        .insert({ email, name, password: hash, role: 0 })
        .table('users');
    } catch (error) {
      console.log(error);
    }
  }

  async findEmail(email) {
    try {
      var resultado = await knex.select().from('users').where({ email });
      if (resultado.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = new User();
