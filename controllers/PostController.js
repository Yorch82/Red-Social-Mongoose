const Post = require("../models/Post");
const User = require("../models/User");

const PostController ={
    async create(req,res,next){
        try {
            if (req.file)req.body.avatar = (req.file.destination + req.file.filename);
            else{
                req.body.avatar = "/assets/jedi.jpg"
            };        
            const post = await Post.create({
                ...req.body,
                userId: req.user._id,
            });
            await User.findByIdAndUpdate(req.user._id,{$push:{postIds: post._id}})                    
            res.status(201).send({ message: 'Post creado con éxito', post});        
        } catch (err) {                  
            err.origin = 'Post';
            next(err);
        }
    },
    async delete(req,res){
        try {        
            const post = await Post.deleteOne({ _id : req.params._id});        
            res.status(201).send({ message: 'Post borrado con éxito', post});        
        } catch (error) {                   
            res.status(500).send({ message: 'Ha habido un problema al borrar el post' })
        }
    },
    async update(req,res){
        try {        
            const post = await Post.findByIdAndUpdate(
                req.params._id,
                {...req.body, userId: req.user._id},                
                { 
                    new: true,                
                }             
            );        
            res.status(201).send({ message: 'Post actualizado con éxito', post});        
        } catch (error) {                               
            res.status(500).send({ message: 'Ha habido un problema al actualizar el post' })
        }
    },
    async getAll(req, res) {
        try {        
            const { page = 1, limit = 20 } = req.query;        
            const posts = await Post.find()
            .populate("commentIds")
            .populate("userId")
            .limit(limit * 1).skip((page - 1) * limit);        
            res.send(posts);        
        } catch (error) {            
            res.status(500).send({ message: 'Ha habido un problema al recuperar los post'});        
        }        
    },
    async getById (req, res) {
        try {
            const post = await Post.findById(req.params._id);
            res.status(201).send({ message: 'Post recuperado con éxito', post});
        }catch (error){            
            res.status(500).send({ message: 'Ha habido un problema al buscar el post por ID' });
        }
    },
    async getByName (req, res) {
        try {
            const title = new RegExp(req.params.title, "i");
            const post = await Post.findOne ({title});
            res.status(201).send(post);
        } catch (error){            
            res.status(500).send({ message: 'Ha habido un problema al buscar el post por nombre' });
        }
    }
}


module.exports = PostController;