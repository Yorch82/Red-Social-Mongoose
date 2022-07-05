const express = require('express');
const router = express.Router()
const PostController = require('../controllers/PostController');
const { authentication, isAdmin, isAuthor } = require("../middlewares/authentication");
require("dotenv").config();
const { upload } = require('../middlewares/multer');

router.post('/',authentication,  upload.single('myFile'), PostController.create);
router.delete('/delete/:_id',PostController.delete);
router.put('/update/:_id',authentication,PostController.update);
router.get('/getAll', PostController.getAll);
router.get('/getById/:_id', authentication, PostController.getById);
router.get('/getByName/:title', PostController.getByName);

module.exports = router;