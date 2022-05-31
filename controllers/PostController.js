const Post = require("../models/Post");

const PostController ={
    async create(req,res){
        try {        
            const post = await Post.create(req.body);        
            res.status(201).send({ message: 'Post creado con éxito', post});        
        } catch (error) {                   
            res.status(500).send({ message: 'Ha habido un problema al crear el post' })
        }
    },
    async delete(req,res){
        try {        
            const post = await Post.deleteOne({ _id : req.params._id});        
            res.status(201).send({ message: 'Post borrado con éxito', post});        
        } catch (error) {                   
            res.status(500).send({ message: 'Ha habido un problema al borrar el post' })
        }
    }
}


module.exports = PostController;