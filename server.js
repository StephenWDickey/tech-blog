// this is our 'master file' that will import all of our routes
// we dont need to import models because those are being used
// in our routes files, not here

const express = require('express');

// we import all of our routes with the /routes folder
const routes = require('./controllers');

// we must import our connection to the database
const sequelize = require('./config/connection');


// we require path to get access to css
// path allows us to interact with file system
// it provides 'path segment separator'

const path = require ('path');


// we import express-handlebars package
const exphbs = require('express-handlebars');
// we use the create() method of handlebars
const hbs = exphbs.create({});


// import express method so we can chain other methods to it
// this is our main instance of the express server running, all other
// files will need to use router(), beacuse using app would created
// a new server! not use the existing one
const app = express();

// we make our PORT variable OR 3001
const PORT = process.env.PORT || 3001;


const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

////////////////////////////////////////////////////////////


// we establish handlebars as our template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


//////////////////////////////////////////////////////////////



// middleware expressions
// we use json data for req.body
app.use(express.json());
// we accept arrays/objects within arrays/objects
app.use(express.urlencoded({ extended: true }));
// express.static() is a middleware method
// takes contents of a folder and:
// 'serves them as static assets'
// in this case these are our front-end files
app.use(express.static(path.join(__dirname, 'public')));

////////////////////////////////////////////////////////////////


// turn on routes
app.use(routes);


//////////////////////////////////////////////////////////////////


// turn on connection to db and server
// sync method is a Sequelize method, it is like app.listen for the db
// the we write our actual app.listen expression for the server
// force: true would drop and recreate all of our tables on startup
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});