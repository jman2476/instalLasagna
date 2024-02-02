const router = require('express').Router();
// const Models = require('../models');
// const user

//show hp
router.get('/', (req, res) => {
    res.render('./pages/dashboard' , {
        title: 'InstallLasagna'
    });
});

// view sign up page
router.get('/signup', async (req, res) => {
    res.render('signup', {
        title: 'Sign up for an account',
        errors: req.session.errors
    })

    // clear errors
    delete req.session.errors
})

// view log in page
router.get('/login', async (req, res) => {
    res.render('login', {
        title: 'Log into your account',
        errors: req.session.errors
    })

    // clear errors
    delete req.session.errors
})


module.exports = router;