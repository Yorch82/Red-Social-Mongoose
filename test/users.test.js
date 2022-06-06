const { dbConnection } = require("../config/config");
const  User = require("../models/User");
const app = require("../index");
const request = require ("supertest");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const transporter = require("../config/nodemailer");
const { mock } = require('../__mocks__/nodemailer');

beforeEach(() =>{
  // sendMailMock.mockClear();
  // transporter.createTransport.mockClear();
})

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
          // check the mock for our sent emails
          const sentEmails = mock.getSentMail();
          // there should be one
          expect(sentEmails.length).toBe(1);
          // and it should match the to address
          expect(sentEmails[0].to).toBe('test@example.com');
          const newUser = res.body.user;
          expect(newUser).toEqual(sendUser);          
    });
    test("Confirm a user", async () => {
      const emailToken = jwt.sign({ email: user.mail },JWT_SECRET, {
        expiresIn: "48h",
      });
      const res = await request(app)
        .get("/users/confirm/" + emailToken)
        .expect(201);
      expect(res.text).toBe("Usuario confirmado con exito");
    });
    let token;
    test("Login a user", async () => {
    const res = await request(app)
      .post("/users/login")
      .send({ email: "test@example.com", password: "123456" })
      .expect(200);
    token = res.body.token;
    });
    
    test("Get all users", async () => {
      const res = await request(app)
        .get("/users/getAll")
        .expect(200)
        .set({ Authorization: token });
        expect(res.body).toBeInstanceOf(Array);
        // token = res.body.token;
    });  
    test("Logout a user record", async () => {
      const res = await request(app)
        .put("/users/logout")
        .set({ Authorization: token })
        .expect(200);
        console.log(res.body.message)
        expect(res.body.message).toBe("Desconectado con éxito");
    });
  
  });

  

  