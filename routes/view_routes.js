const router = require('express').Router();
// const Models = require('../models');

//show hp
router.get('/', (req, res) => {
    res.render('home' , {
        title: 'InstallLasagna'
    });
});


module.exports = router;