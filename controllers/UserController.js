class UserController {
  async index(req, res) {}

  async create(req, res) {
    console.log(req.body);
    res.send('Requisição funcionando!');
  }
}

module.exports = new UserController();
