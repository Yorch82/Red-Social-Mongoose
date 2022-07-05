const  User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment")
const bcrypt = require("bcryptjs");
// const transporter = require("../config/nodemailer");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const UserController ={    
    async create(req,res,next){
        try {
            if (req.file)req.body.avatar = (req.file.destination + req.file.filename);
            else{
                req.body.avatar = "/assets/defaultavatar.jpg"
            }
            let password;
            if (req.body.password !== undefined){
                password = bcrypt.hashSync(req.body.password,10);
            };           
            req.body.confirmed = true;
            req.body.role = "user";                         
            const user = await User.create({...req.body,confirmed: req.body.confirmed, password});
            const emailToken = jwt.sign({mail:req.body.mail},JWT_SECRET,{expiresIn:'48h'});
            const url = 'http://localhost:8080/users/confirm/'+ emailToken;  
            await transporter.sendMail({                
                to: req.body.mail,                
                subject: "Confirme su registro",                
                html: `<h3>Bienvenido, estás a un paso de registrarte </h3>                
                <a href="${url}"> Click para confirmar tu registro</a>
                `,});            
            res.status(201).send({message: "Te hemos enviado un correo para confirmar el registro", user,})            
        } catch (err) {            
            err.origin = 'User';
            next(err);            
        }
    },  
    async login(req, res) {
        try {
            const user = await User.findOne({mail: req.body.mail});
            const token = jwt.sign({ _id: user._id }, JWT_SECRET);;
            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);
            await user.save();
            res.send({ message: 'Bienvenid@ ', user, token });
        } catch (error) {             
            res.status(500).send({ message: 'Ha habido un problema en el login del usuario' })
        }
    },    
    async confirm(req,res){
        try {
            const token = req.params.emailToken;
            const payload = jwt.verify(token,JWT_SECRET);  
            await User.updateOne({mail: payload.mail}, {$set :{confirmed:true}});     
            res.status(201).send( "Usuario confirmado con exito" );        
        } catch (error) {        
            console.error(error)                    
        }        
    },
    async logout(req, res) {
        try {
          await User.findByIdAndUpdate(req.user._id, {
            $pull: { tokens: req.headers.authorization },
          });
          res.status(200).send({ message: "Desconectado con éxito"});
        } catch (error) {          
          res.status(500).send({message: "Hubo un problema al intentar desconectar al usuario"});
        }
    },
    async checkLoggedUser(req,res) {
        try{           
            const user = await User.findOne({tokens: req.headers.authorization})
            .populate({
                path: "postIds",
                populate: {
                    path: "commentIds"
                }
            })
            .populate("likeIds")            
            res.status(201).send({ message: 'Usuario conectado: ', user});
        } catch (error){            
            res.status(500).send({message: "Hubo un problema al intentar recuperar usuario conectado",
        });
      }
    },
    async likePost(req, res) {
        try {
            const post = await Post.findById(req.params._id);
            if (post.likes.includes(req.user._id)) {
                res.send('Ya le diste a like a este post');
            } else {
                const post = await Post.findByIdAndUpdate(        
                    req.params._id,        
                    { $push: { likes: req.user._id } },        
                    { new: true }
                )
                res.status(201).send(post);
        }        
                    
        } catch (error) {                    
            res.status(500).send({ message: "Hubo un problema con tu like al post" });        
        }        
    },
    async dislikePost(req, res) {
        try {        
            const post = await Post.findByIdAndUpdate(        
            req.params._id,        
            { $pull: { likes: req.user._id } },        
            { new: true }        
        );              
        res.send(post);        
        } catch (error) {                    
            res.status(500).send({ message: "Hubo un problema con tu dislike al post" });        
        }        
    },
    async likeComment(req, res) {
        try {
            const comment = await Comment.findById(req.params._id);
            if (comment.likes.includes(req.user._id)) {
                res.send('Ya le diste a like a este comentario');
            } else {
                const comment = await Comment.findByIdAndUpdate(        
                    req.params._id,        
                    { $push: { likes: req.user._id } },        
                    { new: true }
                )
                res.status(201).send(comment);
            };                     
                    
        } catch (error) {
            console.error(error)                    
            res.status(500).send({ message: "Hubo un problema con tu like al comenatario" });        
        }        
    },
    async dislikeComment(req, res) {
        try {        
            const comment = await Comment.findByIdAndUpdate(        
            req.params._id,        
            { $pull: { likes: req.user._id } },        
            { new: true }        
        );              
        res.status(201).send(comment);        
        } catch (error) {                    
            res.status(500).send({ message: "Hubo un problema con tu dislike al comentario"});        
        }        
    },
    async getById (req, res) {
        try {
            const user = await User.findById(req.params._id);
            res.status(201).send({ message: 'Usuario recuperado con éxito', user});
        }catch (error){            
            res.status(500).send({ message: 'Ha habido un problema al buscar el usuario por ID'});
        }
    },
    async getByName (req, res) {
        try {
            const user = await User.findOne ({title : req.params.name});
            res.status(201).send({ message: 'Usuario recuperado con éxito', user});
        } catch (error){           
            res.status(500).send({ message: 'Ha habido un problema al buscar el usuario por nombre'});
        }
    },
    async followUser (req, res) {
        try{
            const user = await User.findById(req.params._id);
            if (user.followedBy.includes(req.user._id)) {
                res.send('Ya estás siguiendo a este usuario');
            } else {
                const user = await User.findByIdAndUpdate(
                    req.params._id,        
                    { $push: { followedBy: req.user._id } },        
                    { new: true } 
                )
                const user2 = await User.findByIdAndUpdate(
                    req.user._id,                       
                    { $push: { followTo: req.params._id } },        
                    { new: true } 
                )
                res.status(201).send({user, user2});
            }
        } catch (error){
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al seguir al usuario'});
        }
    },
    async unfollowUser (req, res) {
        try{
            const user = await User.findByIdAndUpdate(
                req.params._id,        
                { $pull: { followedBy: req.user._id } },        
                { new: true } 
            )
            const user2 = await User.findByIdAndUpdate(
                req.user._id,                       
                { $pull: { followTo: req.params._id } },        
                { new: true } 
            )
            res.status(201).send({user, user2});
        } catch (error){
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al dejar de seguir al usuario'});
        }
    },
    async getAll(req, res) {
        try {        
            const { page = 1, limit = 10 } = req.query;        
            const users = await User.find()
            .populate("commentIds")
            .limit(limit * 1).skip((page - 1) * limit);        
            res.send(users);        
        } catch (error) {            
            res.status(500).send({ message: 'Ha habido un problema al recuperar los usuarios'});        
        }        
    },
    async getInfo(req, res) {
        try {
            const user = await User.findById(req.user._id)
            .populate({
                path: "postIds",
                populate: {
                    path: "commentIds"
                }
            })
            // .populate("likeIDs")
            res.send(user)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al cargar la información del vecino' })
        }
    },       
}

module.exports = UserController;