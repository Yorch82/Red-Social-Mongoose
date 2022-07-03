const bcrypt = require("bcryptjs");

const users = [
	{		
		name: 'Yorch',
		mail: 'admin@admin.com',
        avatar:'/assets/defaultavatar.jpg',
		password: bcrypt.hashSync('password',10),
		role: 'admin',
        confirmed: true
        
	},
	{
		name: 'Obi Wan Kenobi',
		mail: 'lasthope@email.com',
        avatar:'/assets/defaultavatar.jpg',
		password: bcrypt.hashSync('password',10),
        role: 'user',
        confirmed: true
	},
	{
		name: 'Rey Skywalker',
		mail: 'sucks@sucks.com',
        avatar:'/assets/defaultavatar.jpg',
		password: bcrypt.hashSync('password',10),
        role: 'user',
        confirmed: true
	},
	{
		name: 'John Don',
		mail: 'John@John.com',
        avatar:'/assets/defaultavatar.jpg',
		password: bcrypt.hashSync('password',10),
        role: 'user',
        confirmed: true
	},
];

module.exports = users;