const express = require('express');
const router = express.Router()
const UserController = require('../controllers/UserController');
const { authentication, isAdmin, isAuthor } = require("../middlewares/authentication");

router.post('/',UserController.create);
router.post('/login',UserController.login);
router.get('/getLoggedUser', authentication, UserController.checkLoggedUser);
router.get('/confirm/:emailToken',UserController.confirm);
router.put('/logout', authentication, UserController.logout);
router.put('/likes/:_id', authentication, UserController.like);
router.put('/dislikes/:_id', authentication, UserController.dislike);


module.exports = router;