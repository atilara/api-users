var User = require('../models/User');

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
}

module.exports = new UserController();
