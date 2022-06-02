const express = require('express');
const router = express.Router()
const CommentController = require('../controllers/CommentController');
const { authentication, isAdmin, isAuthor } = require("../middlewares/authentication");

router.post('/',authentication, CommentController.create);

module.exports = router;