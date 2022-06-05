const express = require('express');
const router = express.Router()
const CommentController = require('../controllers/CommentController');
const { authentication, isAdmin, isAuthor } = require("../middlewares/authentication");
const { upload } = require('../middlewares/multer');

router.post('/',authentication, upload.single('myFile'), CommentController.create);

module.exports = router;