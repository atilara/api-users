var knex = require('../database/connection');
var User = require('./User');

class PasswordToken {
  async create(email) {
    var user = await User.findByEmail(email);

    if (user != undefined) {
      try {
        var token = Date.now();

        await knex
          .insert({ user_id: user.id, used: 0, token })
          .table('password_tokens');

        return { status: true, token };
      } catch (error) {
        return {
          status: false,
          error,
        };
      }
    } else {
      return {
        status: false,
        error: 'Não existe um usuário com esse e-mail no banco',
      };
    }
  }
}

module.exports = new PasswordToken();
