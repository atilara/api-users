var express = require('express');
var app = express();
var router = express.Router();
var HomeController = require('../controllers/HomeController');
var UserController = require('../controllers/UserController');

router.get('/', HomeController.index);

router.post('/user', UserController.create);

router.get('/user', UserController.index);

router.get('/user/:id', UserController.findUser);

router.put('/user', UserController.update);

router.delete('/user/:id', UserController.remove);

module.exports = router;
