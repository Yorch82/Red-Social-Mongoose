const express = require('express');
const router = express.Router()
const UserController = require('../controllers/UserController');
const { authentication } = require("../middlewares/authentication");

router.post('/',UserController.create);
router.post('/login',UserController.login);
router.get('/confirm/:emailToken',UserController.confirm);
router.put('/logout', authentication, UserController.logout);


module.exports = router;