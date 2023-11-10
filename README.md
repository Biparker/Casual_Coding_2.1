# Casual_Coding_2.1. This is development code intended for the Member Profile Website of the Casual Coding Group. 
Intent of the website is to facilitate Casual Coding membership and collaboration in coding projects among members.
Website Code with Authentication is in repository, including hashing, salting, Sessions and Passport.
Dependencies include Node, Express, EJS, NPM, Mongo and Mongoose. The user must insure these are installed using npm from the terminal command line.
The website is built using Javascript and has a Mongo database, which stores three attributes for the user: email, project, and percent_done.
The developer needs to clone the repository and load the folder into Visual Studio Code.
From the terminal line, run the command "node app.js".
On the browser being used, enter "localhost:3000" and the register page should render. 
To use the site, user must register on the site, enter credentials on the login page (email and password), and click submit to enter project attribues. 
All users can view the list of projects of other members on the projects page. Currently the database has three test projects shown on the projects page.
