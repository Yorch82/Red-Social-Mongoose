const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { jwt_secret } = require('../config/keys.js');

const UserController ={
    async create(req,res){
        try {
            req.body.is_admin = false;
            const password = bcrypt.hashSync(req.body.password,10);
            const user = await User.create({...req.body, password:password});            
            res.status(201).send(user)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al crear el usuario' })
        }
    },
    login(req, res){
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if(!user){
                return res.status(400).send({message: "Usuario o contraseña incorrecta."})
            }
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if(!isMatch){
                return res.status(400).send({message: "Usuario o contraseña incorrecta."})
            }
            // if(!user.confirmed){
            //     return res.status(400).send({message:"Debes confirmar tu correo"})
            // }
            token = jwt.sign({ id: user.id }, jwt_secret);
            // Token.create({ token, UserId: user.id });
            res.send({ message: 'Bienvenid@' + user.name, user, token });
        })
    },
}
module.exports = UserController;