var express = require('express');
var router = express.Router();
var HomeController = require('../controllers/HomeController');
var UserController = require('../controllers/UserController');

var AdminAuth = require('../middleware/AdminAuth');

router.get('/', HomeController.index);

router.post('/user', UserController.create);

router.get('/user', UserController.index);

router.get('/user/:id', UserController.findUser);

router.put('/user', AdminAuth, UserController.update);

router.delete('/user/:id', AdminAuth, UserController.remove);

router.post('/recoverpassword', AdminAuth, UserController.recoverPassword);

router.post('/changepassword', AdminAuth, UserController.changePassword);

router.post('/login', UserController.login);

module.exports = router;
