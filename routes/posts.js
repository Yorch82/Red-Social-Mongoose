const express = require('express');
const router = express.Router()
const PostController = require('../controllers/PostController');
const { authentication } = require("../middlewares/authentication");


router.post('/',authentication, PostController.create);
router.delete('/delete/:_id',authentication, PostController.delete);
router.put('/update/:_id',authentication, PostController.update);

module.exports = router;