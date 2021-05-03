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

  async validate(token) {
    try {
      var result = await knex
        .select()
        .where({ token })
        .table('password_tokens');
      if (result.length > 0) {
        var tokenFound = result[0];
        if (tokenFound.used) {
          return { status: false };
        } else {
          return { status: true, token: tokenFound };
        }
      } else {
        return { status: false };
      }
    } catch (error) {
      console.log(error);
      return { status: false };
    }
  }

  async setUsed(token) {
    try {
      await knex.update({ used: 1 }).where({ token }).table('password_tokens');
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new PasswordToken();
