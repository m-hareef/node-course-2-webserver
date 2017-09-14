const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//get port number from environment variable. deploying to heroku, their port number keeps changing. so to get the port number of the heroku
const port = process.env.PORT || 3000; //if no port found, if run locally, set the default to 3000
//To make a express app
var app = express();

hbs.registerPartials(__dirname + '/views/partials'); //To enable partial rendering of webpages, like same header and footer for several files
app.set('view engine', 'hbs'); //this tells express to use the hbs view engine


//Register express middleware,to control all respnse and requests or log them
app.use((req, res, next) => {  //the application will continue to run only if we give a next();
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFileSync('server.log',log + '\n');
  next();
});
//We can use several express middleware, below used if we have a maintenance and show only that page
app.use((req, res, next) => {
  // res.render('maintenance.hbs');
  next();
});

//use other HTML file
app.use(express.static(__dirname + '/public'))

//Create a helper function. It takes 2 arguments (name of function, Function())
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

//Create a helper function to return all strong to upper case
hbs.registerHelper('toCapitalLetters', (text) => {
  return text.toUpperCase();
})
//set a http get request
app.get('/', (req, res) => { // '/' to process the root request
  // res.send('<h1>Hello Express</h1>'); //send text or html
  res.render('home.hbs', {
    homePageTitle: 'Home Page - Title',
    pageHeading: 'Home Page - Header',
    paragraphText: 'Dynamicaly loaded'
  });
});

app.get('/about', (req, res) => { // '/' to process the root request
  // res.send('<h1>About Page</h1>'); //send text or html
  //To render dynaming content on pages, add second argument as an object of key-value pairs
  res.render('about.hbs', {
    pageHeading: 'About Page - Hareef'
  });
});

app.get('/projects', (req, res) => { // '/' to process the root request
  // res.send('<h1>About Page</h1>'); //send text or html
  //To render dynaming content on pages, add second argument as an object of key-value pairs
  res.render('projects.hbs', {
    pageHeading: 'Projects Page - Hareef'
  });
});

app.get('/mahir', (req, res) => { // '/' to process the root request
  res.send('<h1>This is Mahirs page</h1>'); //send text or html

});



// app.listen(3000); //set up on port 3000 http://localhost:3000

//it can tkae a second optional argument
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
