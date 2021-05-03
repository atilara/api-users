var User = require('../models/User');
var PasswordToken = require('../models/PasswordToken');

class UserController {
  async index(req, res) {
    res.json(await User.findAll());
  }

  async findUser(req, res) {
    var id = req.params.id;
    var user = await User.findById(id);
    if (user == undefined) {
      res.status(404);
      res.send({});
    } else {
      res.json(user);
    }
  }

  async create(req, res) {
    var { email, name, password } = req.body;

    if (email == undefined || email == '') {
      res.status(400);
      res.json({ error: 'Invalid Email' });
      return;
    }

    if (name == undefined || name == '') {
      res.status(400);
      res.json({ error: 'Invalid Name' });
      return;
    }

    if (password == undefined || password == '') {
      res.status(400);
      res.json({ error: 'Invalid password' });
      return;
    }

    if (await User.findEmail(email)) {
      res.status(406);
      res.json({ error: 'Email já cadastrado' });
      return;
    }

    // Criação de user utilizando o model
    await User.new(email, name, password);

    res.status(200);
    res.send('Requisição funcionando!');
  }

  async update(req, res) {
    var { id, name, email, role } = req.body;
    try {
      var result = await User.update(id, name, email, role);
      if (result != undefined) {
        if (result.status) {
          res.send('Atualizado');
        } else {
          res.status(406);
          res.send(result.error);
        }
      } else {
        res.status(406);
        res.send('Ocorreu um erro');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async remove(req, res) {
    var id = req.params.id;

    var result = await User.remove(id);

    if (result.status) {
      res.send('Usuário deletado');
    } else {
      res.status(406);
      res.send(result.error);
    }
  }

  async recoverPassword(req, res) {
    var email = req.body.email;

    var result = await PasswordToken.create(email);

    if (result.status) {
      res.send('' + result.token);
    } else {
      res.status(406);
      res.send(result.error);
    }
  }

  async changePassword(req, res) {
    var token = req.body.token;
    var password = req.body.password;

    var isTokenValid = await PasswordToken.validate(token);
    if (isTokenValid.status) {
      await User.changePassword(
        isTokenValid.token.user_id,
        isTokenValid.token.token,
        password,
      );
      res.send('Senha alterada');
    } else {
      res.status(400);
      res.send({ status: false, error: 'Token inválido' });
    }
  }
}

module.exports = new UserController();
