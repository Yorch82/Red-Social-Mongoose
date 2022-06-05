const Post = require("../models/Post");

const PostController ={
    async create(req,res){
        try {
            if (req.file)req.body.avatar = (req.file.destination + req.file.filename);
            else{
                req.body.avatar = "../assets/defaultavatar.jpg"
            };        
            const post = await Post.create({
                ...req.body,
                userId: req.user._id,
            });                    
            res.status(201).send({ message: 'Post creado con éxito', post});        
        } catch (error) {
            console.log(error)       
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
            console.log(error)                   
            res.status(500).send({ message: 'Ha habido un problema al actualizar el post' })
        }
    },
    async getAll(req, res) {
        try {        
            const { page = 1, limit = 10 } = req.query;        
            const posts = await Post.find()
            .populate("commentIds")
            .limit(limit * 1).skip((page - 1) * limit);        
            res.send(posts);        
        } catch (error) {        
            console.error(error);
            res.status(500).send({ message: 'Ha habido un problema al recuperar los post'});        
        }        
    },
    async getById (req, res) {
        try {
            const post = await Post.findById(req.params._id);
            res.status(201).send({ message: 'Post recuperado con éxito', post});
        }catch (error){
            console.error(error);
            res.status(500).send({ message: 'Ha habido un problema al buscar el post por ID' });
        }
    },
    async getByName (req, res) {
        try {
            const post = await Post.findOne ({title : req.params.title});
            res.status(201).send({ message: 'Post recuperado con éxito', post});
        } catch (error){
            console.error(error);
            res.status(500).send({ message: 'Ha habido un problema al buscar el post por nombre' });
        }
    }
}


module.exports = PostController;