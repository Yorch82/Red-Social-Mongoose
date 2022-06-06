const { dbConnection } = require("../config/config");
const  User = require("../models/User");
const app = require("../index");
const request = require ("supertest");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

describe("testing/users", () => {
    beforeAll(async() => await dbConnection());

    afterAll(async() => await User.deleteOne({name: 'Username'}));

    const user = {
      name: "Username",
      mail: "test@example.com",
      avatar: "../assets/defaultavatar.jpg",
      password: bcrypt.hashSync('hola',10),
      role: "user",
      confirmed: false,
      commentIds: [],
      followedBy: [],
      followTo: [], 
      postIds: []
    };
   
    test("Create a user", async () => {
      const res = await request(app)
        .post("/users")
        .send(user)
        .expect(201)
           const sendUser = {
            ...user,
            _id: res.body.user._id,
            __v: res.body.user.__v,
            createdAt: res.body.user.createdAt,
            updatedAt: res.body.user.updatedAt,
            password: res.body.user.password
          };

          const newUser = res.body.user;
          expect(newUser).toEqual(sendUser);
    });
  });
  