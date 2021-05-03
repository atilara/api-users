var express = require('express');
var router = express.Router();
var HomeController = require('../controllers/HomeController');
var UserController = require('../controllers/UserController');

var AdminAuth = require('../middleware/AdminAuth');

router.get('/', AdminAuth, HomeController.index);

router.post('/user', AdminAuth, UserController.create);

router.get('/user', AdminAuth, UserController.index);

router.get('/user/:id', AdminAuth, UserController.findUser);

router.put('/user', AdminAuth, UserController.update);

router.delete('/user/:id', AdminAuth, UserController.remove);

router.post('/recoverpassword', AdminAuth, UserController.recoverPassword);

router.post('/changepassword', AdminAuth, UserController.changePassword);

router.post('/login', AdminAuth, UserController.login);

module.exports = router;
