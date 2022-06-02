const Comment = require("../models/Comment");
const Post = require("../models/Post");

const CommentController ={
    async create(req,res){
        try {
            const comment = await Comment.create(                
                { ...req.body, userId: req.user._id, postId: req.body.postId }
            );
            console.log(comment)
            await Post.findByIdAndUpdate(req.body.postId,{$push:{commentIds: comment._id}})
            res.send(comment);            
            } catch (error) {            
                console.error(error);            
                res.status(500).send({ message: "Hubo un problema con el comentario" });            
            }
    }    
}

module.exports = CommentController;