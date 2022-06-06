const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;
const MONGO_URI2 = process.env.MONGO_URI2;
const DB = process.env.DB;

const dbConnection = async () => {
    try {
        if (DB === 'true'){
            await mongoose.connect(MONGO_URI2);
            console.log("Base de datos de TEST conectada con éxito");
        } else {
            await mongoose.connect(MONGO_URI);
        console.log("Base de datos conectada con éxito");
        }
        
    } catch (error) {
        console.error(error);
        throw new Error("Error a la hora de iniciar la base de datos");
    }
};

module.exports = {dbConnection};