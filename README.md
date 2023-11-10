# Casual_Coding_2.1. 
## What are we building?
This repository contains development code intended for the Member Profile Website of the Casual Coding Group.

The website intends to facilitate Casual Coding membership and collaboration for coding projects among members.

## Development
This App uses [NPM](https://www.npmjs.com/) Node Package Manager to manage it's dependencies and packages.

Developers should clone the repository and load the folder into Visual Studio Code.
To clone the master branch use ```git clone -b master [git url]```.

From the root directory run ```npm install``` to install all of the dependencies.

Remember to create a .env file and add ```node_modules``` along with any other values you might need.

<!-- To Start the app in development mode enter ```npm run dev``` in the terminal. -->
To run the program use the command ```node app.js``` in the terminal.
Enter ```http://localhost:3000``` on the browser to render the page. 
To use the site, register as a user by entering credentials on the login page (email and password) and click submit to enter project attributes. 
All users can view the list of projects on the projects page. Currently, the database has three test projects shown on the projects page.

## Tech Stack
[mongoose]: https://mongoosejs.com/
[mongodb]: https://www.mongodb.com/atlas/database
[node.js]: http://nodejs.org
[express]: http://expressjs.com
[EJS]: http://ejs.co/
Authentication is implemented through the use of hashing, salting, Sessions, and Passport.
The website is built using Javascript and has a Mongo database, which stores three attributes for the user: email, project, and percent_done.

### GitHub workflow

- Creator: Create a new issue

- Dev: Pick an issue and assign it to themselves

- Dev: Make a branch named with the issue number and description

- Dev: Make and commit changes

- Dev: Create a pull request (PR)

- Creator: Review PR

- Creator: Request changes

- Dev: Complete requested changes, commit and submit PR

- Creator: Approve changes, request merge

- Dev: Merge PR

- Dev: Delete issue-specific branch

- Creator: Close issue

_Credit for list_ : **puffalo**