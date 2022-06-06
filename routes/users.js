const express = require('express');
const router = express.Router()
const UserController = require('../controllers/UserController');
const { authentication, isAdmin, isAuthor } = require("../middlewares/authentication");
const { upload } = require('../middlewares/multer');
const User = require('../models/User');

router.post('/', upload.single('myFile'), UserController.create);
router.post('/login',UserController.login);
router.get('/getLoggedUser', authentication, UserController.checkLoggedUser);
router.get('/confirm/:emailToken',UserController.confirm);
router.put('/logout', authentication, UserController.logout);
router.put('/likes/:_id', authentication, UserController.likePost);
router.put('/dislikes/:_id', authentication, UserController.dislikePost);
router.put('/likeComment/:_id', authentication, UserController.likeComment);
router.put('/dislikeComment/:_id', authentication, UserController.dislikeComment);
router.get('/getById/:_id', authentication, isAdmin, UserController.getById);
router.get('/getByName/:name', authentication, isAdmin, UserController.getByName);
router.put('/follow/:_id', authentication, UserController.followUser);
router.put('/unfollow/:_id', authentication, UserController.unfollowUser);
router.get('/getAll', UserController.getAll);

module.exports = router;