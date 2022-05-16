// this file will import our index.js file in the apiRoutes folder which is
// importing all of our apiRoutes for each model!
// we keep things organized by importing everything to an index.js file

const router = require('express').Router();


// import our apiRoutes, we are linkking to the entire api folder
const apiRoutes = require('./api');


const homeRoutes = require('./home-routes.js');

///////////////////////////////////////////////////////////////



router.use('/', homeRoutes);



// we give api routes the /api prefix, then we pass in our routes that 
// we have imported
router.use('/api', apiRoutes);


// we need to add error handling, send 404
router.use((req, res) => {
    res.status(404).end();
});


/////////////////////////////////////////////////////////


module.exports = router;