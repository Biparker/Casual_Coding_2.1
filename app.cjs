require ("dotenv"). config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { log } = require("console");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(session({
    secret: 'thisIsTheAuthenticateString',
    resave: false,
    saveUninitialized: true
  }));

app.use(passport.initialize());
app.use(passport.session());



mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    project: String,
    percent_done: String
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res) {
    res.render("register");
  });
   
app.get("/login", function(req, res) {
    res.render("login");
  });
   
app.get("/register", function(req, res) {
    res.render("register");
  });
   
    
app.get("/submit", function(req, res) {
    if (req.isAuthenticated()) {
      res.render("submit");
    } else {
      res.redirect("/login");
    }
  });

app.get("/projects",function(req,res){
    User.find({"project":{$ne:null}})
    .then(function (foundUsers) {
      res.render("projects",{usersWithProjects:foundUsers});
    })
    .catch(function (err) {
        console.log(err);
      })
  });


app.get("/logout", function(req, res) {
    req.logout(function(err) {
      if (err) {
        console.log(err);
      }
    });
    res.redirect("/");
  });
   
  
  
      
app.post("/register", function(req, res) {
   
    User.register({username: req.body.username}, req.body.password, function(err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function() {
          res.redirect("/login");
        });
      }
    });
   
  });
   
app.post("/login", function(req, res) {
   
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
   
    req.login(user, function(err) {
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, function() {
          res.redirect("/projects");
        });
   
      }
    });
   
  });
  

app.post("/submit", function (req, res) {
    console.log(req.user);
    User.findById(req.user)
      .then(foundUser => {
        if (foundUser) {
          foundUser.project = req.body.project;
          foundUser.email = req.body.email;
          foundUser.percent_done = req.body.percent_done;
          return foundUser.save();
        }
        return null;
      })
      .then(() => {
        res.redirect("/projects");
      })
      .catch(err => {
        console.log(err);
      });
  });
   
  
  
  
app.listen(3000, function() {
    console.log("Server on Port 3000...");
  });

