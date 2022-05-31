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
}
module.exports = UserController;