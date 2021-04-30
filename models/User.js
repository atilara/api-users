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

  async findAll() {
    try {
      return await knex.select(['id', 'name', 'email', 'role']).table('users');
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async findById(id) {
    try {
      var result = await knex
        .select(['id', 'name', 'email', 'role'])
        .where({ id })
        .table('users');

      if (result.length > 0) {
        return result[0];
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
      return error;
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

  async update(id, name, email, role) {
    var user = await this.findById(id);

    if (user == undefined) {
      return { status: false, error: 'Usuário não existe' };
    } else {
      var editUser = {};
      if (email != undefined) {
        if (email != user.email) {
          var result = await this.findEmail(email);
          if (result == false) {
            editUser.email = email;
          } else {
            return { status: false, error: 'Email já cadastrado' };
          }
        }
      }

      if (name != undefined) {
        editUser.name = name;
      }

      if (role != undefined) {
        editUser.role = role;
      }

      try {
        await knex.update(editUser).where({ id }).table('users');
        return { status: true };
      } catch (error) {
        return { status: false, error };
      }
    }
  }

  async remove(id) {
    try {
      var user = await this.findById(id);
      if (user != undefined) {
        try {
          await knex.delete().where({ id }).table('users');
          return { status: true };
        } catch (error) {
          return { status: false, error };
        }
      } else {
        return {
          status: false,
          error: 'Usuário não existe e não pode ser deletado',
        };
      }
    } catch (error) {}
  }
}

module.exports = new User();
