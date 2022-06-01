const  User = require("../models/User");
const bcrypt = require("bcryptjs");
const transporter = require("../config/nodemailer");
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/keys');

const UserController ={    
    async create(req,res){
        try {
            req.body.confirmed = false;
            req.body.role = "user";        
            const password = bcrypt.hashSync(req.body.password,10);      
            const user = await User.create({...req.body,confirmed: req.body.confirmed, password:password});
            const emailToken = jwt.sign({mail:req.body.mail},jwt_secret,{expiresIn:'48h'});
            const url = 'http://localhost:8080/users/confirm/'+ emailToken;  
            await transporter.sendMail({                
                to: req.body.mail,                
                subject: "Confirme su registro",                
                html: `<h3>Bienvenido, estás a un paso de registrarte </h3>                
                <a href="${url}"> Click para confirmar tu registro</a>
                `,});            
            res.status(201).send({
                message: "Te hemos enviado un correo para confirmar el registro",
                user,
            })            
        } catch (error) {       
            console.error(error)     
            res.status(500).send({ message: 'Ha habido un problema al crear el usuario' })
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
}

module.exports = UserController;