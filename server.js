const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
let app = express();
app.use(cors());
app.options('*', cors());
const mongoClient = require("mongodb").MongoClient;

var port = 3000;

var urlencodedParser = bodyParser.urlencoded({extended: false});
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vaslnko25@gmail.com',
    pass: 'albinailera1999'
  }
});


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get("/", function(request, response) {
  response.send("Hello");
});
app.post("/", urlencodedParser, function (request, response) {
  if(!request.body) return response.sendStatus(400);
  console.log('ВОТ ТУТ НИЧЕГО НЕ ПОКАЗЫВАЕТ:', request.body)

    let mailOptions = {
      from: 'vaslnko25@gmail.com',
      to: 'vaslnko25@gmail.com',
      subject: request.body.subjectUsers,
      text:'Name: '+ request.body.nameUsers + '; ' +' Email: '+ request.body.emailUsers +'; ' + 'Mess: '+ request.body.messageUsers,
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });


});


app.listen(3000, function(){
  console.log("Сервер ожидает подключения...");
});

/*const express = require("express");
const bodyParser = require("body-parser");
const mongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
  
const app = express();
const jsonParser = bodyParser.json();
const url = "mongodb://localhost:27017/productInventorydb";
  
app.use(express.static(__dirname + "/public"));

app.get("/api/users", function(req, res){
       
    mongoClient.connect(url, function(err, client){
        client.db("productInventorydb").collection("users").find({}).toArray(function(err, users){
            res.send(users)
            client.close();
        });
    });
});

  
app.post("/api/users", jsonParser, function (req, res) {
      
    if(!req.body) return res.sendStatus(400);
      
    var userLogin = req.body.login;
    var userPassword = req.body.password;
    var user = {name: userLogin, age: userPassword};
      
    mongoClient.connect(url, function(err, client){
        client.db("productInventorydb").collection("users").insertOne(user, function(err, result){
              
            if(err) return res.status(400).send();
              
            res.send(user);
            client.close();
        });
    });
});

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vaslnko25@gmail.com',
    pass: 'albinailera1999'
  }
});

var mailOptions = {
  from: 'email',
  to: 'vaslnko25@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'лалала!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
   
app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});*/
