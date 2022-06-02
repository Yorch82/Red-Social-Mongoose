const Comment = require("../models/Comment");

const CommentController ={
    async create(req,res){
        try {        
            const comment = await Comment.create({
                ...req.body,
                userId: req.user._id,
                // postId: req.post._id
            });                    
            res.status(201).send({ message: 'Comentario creado con éxito', comment});        
        } catch (error) {
            console.log(error)       
            res.status(500).send({ message: 'Ha habido un problema al crear el comentario'})
        }
    }    
}

module.exports = CommentController;