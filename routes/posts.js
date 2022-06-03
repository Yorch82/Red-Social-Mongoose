const express = require('express');
const { auth } = require('../config/keys');
const router = express.Router()
const PostController = require('../controllers/PostController');
const { authentication, isAdmin, isAuthor } = require("../middlewares/authentication");


router.post('/',authentication, PostController.create);
router.delete('/delete/:_id',authentication, isAuthor,PostController.delete);
router.put('/update/:_id',authentication, isAuthor,PostController.update);
router.get('/getAll', authentication, isAdmin, PostController.getAll);
router.get('/getById', authentication, isAdmin, PostController.getById);
router.get('/getByName/:title', authentication, isAdmin, PostController.getByName);

module.exports = router;