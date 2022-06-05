const express = require('express');
const router = express.Router()
const CommentController = require('../controllers/CommentController');
const { authentication, isAdmin, isAuthorComment } = require("../middlewares/authentication");
const { upload } = require('../middlewares/multer');

router.post('/',authentication, upload.single('myFile'), CommentController.create);
router.get('/getAll',authentication, isAdmin, CommentController.getAll);
router.put('/update/:_id',authentication, isAuthorComment, CommentController.update);
router.delete('/delete/:_id',authentication, isAuthorComment, CommentController.delete);

module.exports = router;