require ("dotenv"). config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { log } = require("console");
const md5 = require("md5");
console.log(md5('message'));

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));


mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});


const User = new mongoose.model("User", userSchema);
app.get("/", function(req,res){
    res.render("home");  
});

app.get("/login", function(req,res){
    res.render("login");  
});


app.get("/register", function(req,res){
    res.render("register");  
});

app.post("/register", async function(req,res) { 
    const newUser = new User({
        email: req.body.username,
        password: md5(req.body.password)
    });
    await newUser.save() ;
    console.log(newUser);    
    res.render("projects");
    });


app.post("/login", (req,res) => {
    const username = req.body.username;
    const password = md5(req.body.password);
    
    User.findOne({email: username})
       .then((foundUser) => {
          if(foundUser) {
              if(foundUser.password === password) {
                 res.render("projects");
              }
           }
         })
    
         .catch((err) => {
           console.log(err);
             });
     });
    
    
          
app.listen(3000, function() {
    console.log("Server started on port 3000.");

});
