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

mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    project: String,
    percent_done: String,
    description: String
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


app.get(["/project_tables", "/project_cards"], function(req, res) {
  User.find({ "project": { $ne: null } })
    .then(function(foundUsers) {
      if (req.url === "/project_tables") {
        // Render users in table format
        res.render("project_tables", { usersWithProjects: foundUsers });
      } else if (req.url === "/project_cards") {
        // Render users in card format
        res.render("project_cards", { usersWithProjects: foundUsers });
      } else {
        // Handle unexpected URL (optional)
        res.status(404).send("Not Found");
      }
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});


  
app.get("/logout", function(req, res) {
    req.logout(function(err) {
      if (err) {
        console.log(err);
      }
    });
    res.redirect("/");
  });
   
  app.get("/edit/:id", function(req, res) {
    User.findById(req.params.id)
      .then(foundUser => {
        if (foundUser) {
          res.render("edit", { user: foundUser });
        } else {
          res.status(404).send("User not found");
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Internal Server Error");
      });
  });
  
          
  app.get("/delete/:id", function(req, res) {
    const userId = req.params.id;
 
    // Validate user ID (optional)
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send("Invalid user ID format");
    }
 
    User.findByIdAndDelete(userId)
      .then(deletedUser => {
        if (!deletedUser) {
          return res.status(404).send("User not found");
        }
        res.send("Project deleted successfully");
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Internal Server Error");
      });
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
          res.redirect("/project_tables");
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
          foundUser.description = req.body.description;
          return foundUser.save();
        }
        return null;
      })
      .then(() => {
        res.redirect("/project_tables");
      })
      .catch(err => {
        console.log(err);
      });
  });
   
  app.post("/update/:id", function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedUser => {
        if (updatedUser) {
          res.redirect("/project_tables");
        } else {
          res.status(404).send("User not found");
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Internal Server Error");
      });
  });
  
  


  // app.delete("/project/:id", function(req, res) {
  //    const userId = req.params.userId;
  
  //    // Validate user ID (optional)
  //    if (!mongoose.Types.ObjectId.isValid(userId)) {
  //      return res.status(400).send("Invalid user ID format");
  //    }
  
  //    User.findByIdAndDelete(userId)
  //      .then(deletedUser => {
  //        if (!deletedUser) {
  //          return res.status(404).send("User not found");
  //        }
  //        res.send("Project deleted successfully");
  //      })
  //      .catch(err => {
  //        console.error(err);
  //        res.status(500).send("Internal Server Error");
  //      });
  //  });
  
  

  
 app.listen(3000, function() {
     console.log("Server on Port 3000...");
   });

