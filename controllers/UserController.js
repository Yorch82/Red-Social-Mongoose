const  User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");
const transporter = require("../config/nodemailer");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const UserController ={    
    async create(req,res,next){
        try {
            let password;
            if (req.body.password !== undefined){
                password = bcrypt.hashSync(req.body.password,10);   //hashync?
            }
            req.body.confirmed = false;
            req.body.role = "user";
            req.body.avatar = "../assets/defaultavatar.jpg"              
            const user = await User.create({...req.body,confirmed: req.body.confirmed, password:password});
            const emailToken = jwt.sign({mail:req.body.mail},jwt_secret,{expiresIn:'48h'});
            const url = 'http://localhost:8080/users/confirm/'+ emailToken;  
            await transporter.sendMail({                
                to: req.body.mail,                
                subject: "Confirme su registro",                
                html: `<h3>Bienvenido, estás a un paso de registrarte </h3>                
                <a href="${url}"> Click para confirmar tu registro</a>
                `,});            
            res.status(201).send({message: "Te hemos enviado un correo para confirmar el registro", user,})            
        } catch (err) {
            console.log(err)
            err.origin = 'User';
            next(err);            
        }
    },  
    async login(req, res) {
        try {
            const user = await User.findOne({email: req.body.email});
            const token = jwt.sign({ _id: user._id }, jwt_secret);;
            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);
            await user.save();
            res.send({ message: 'Bienvenid@ ' + user.name, token });
        } catch (error) {
            console.error(error) 
            res.status(500).send({ message: 'Ha habido un problema en el login del usuario' })
        }
    },    
    async confirm(req,res){
        try {
            const token = req.params.emailToken;
            const payload = jwt.verify(token,jwt_secret);  
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
          res.send({ message: "Desconectado con éxito" });
        } catch (error) {
          console.error(error);
          res.status(500).send({message: "Hubo un problema al intentar desconectar al usuario",
          });
        }
      },
    async checkLoggedUser(req,res) {
        try{           
            const user = await User.findOne({tokens: req.headers.authorization});            
            res.status(201).send({ message: 'Usuario conectado: ', user});
        } catch (error){
        console.error(error);
        res.status(500).send({message: "Hubo un problema al intentar recuperar usuario conectado",
        });
      }
    },
    async like(req, res) {
        try {        
            const post = await Post.findByIdAndUpdate(        
            req.params._id,        
            { $push: { likes: req.user._id } },        
            { new: true }        
        );              
        res.send(post);        
        } catch (error) {        
            console.error(error);        
            res.status(500).send({ message: "Hubo un problema con tu like" });        
        }        
    },
    async dislike(req, res) {
        try {        
            const post = await Post.findByIdAndUpdate(        
            req.params._id,        
            { $pull: { likes: req.user._id } },        
            { new: true }        
        );              
        res.send(post);        
        } catch (error) {        
            console.error(error);        
            res.status(500).send({ message: "Hubo un problema con tu like" });        
        }        
    },        
}

module.exports = UserController;