const { User} = require("../models/User");
const bcrypt = require("bcryptjs");
const transporter = require("../config/nodemailer");
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/keys');

const UserController ={    
    async create(req,res){
        try {
            req.body.confirmed = false;
            req.body.is_admin = false;        
            const password = bcrypt.hashSync(req.body.password,10);
            const user = await User.create({...req.body,confirmed: req.body.confirmed, password:password});
            const emailToken = jwt.sign({mail:req.body.mail},jwt_secret,{expiresIn:'48h'})
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
    login(req, res){
        User.findOne({mail: req.body.mail})
        .then(user => {
            if(!user){
                return res.status(400).send({message: "Usuario o contraseña incorrecta."})
            }
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if(!isMatch){
                return res.status(400).send({message: "Usuario o contraseña incorrecta."})
            }
            if(!user.confirmed){
                return res.status(400).send({message:"Debes confirmar tu correo"})
            }
            token = jwt.sign({ id: user._id }, jwt_secret);
            Token.create({ token, UserId: user._id });
            res.send({ message: 'Bienvenid@' + user.name, user, token });
        })
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