const dotenv = require('dotenv');
const users = require('../seeders/users');
const User = require('../models/User');
const posts = require('../seeders/posts');
const Post = require('../models/Post');
const { dbConnection } = require("./config");
// const { find } = require('../models/Post');
dotenv.config();

dbConnection();

const importData = async () => {
	try {
		const usersIDs = [];
		const  papa = await Post.insertMany(posts);		     
		await User.insertMany(users);
		const idUser = await User.find({ name: 'Yorch'})		
		const prueba = await Post.updateMany({}, {$set : {userId: idUser[0]._id} })        
		console.log('Data Imported');
		process.exit();
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};



const deleteData = async () => {
	try {
		await User.deleteMany();
        await Post.deleteMany();
		console.log('Data destroyed');
		process.exit();
	} catch (err) {
		console.log(error);
		process.exit(1);
	}
};



switch (process.argv[2]) {
	case '-d': {
		deleteData();
		break;
	}
	default: {
		importData();
	}
}

