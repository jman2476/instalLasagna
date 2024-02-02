const router = require('express').Router();
// const Models = require('../models');
// const user

//show hp
router.get('/', (req, res) => {
    res.render('./pages/dashboard' , {
        title: 'InstallLasagna'
    });
});



module.exports = router;