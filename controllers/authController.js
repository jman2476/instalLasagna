const { User } = require("../models");

const authController = {
    // handle the errors
    errorHandler(err, req, res, path) {
        try {
            let messages;

            if (err.errors) {
                messages = err.errors.map((errObj) => errObj.message);
            } else {
                messages = [err.message];
            }
            console.log(`\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n messages`);

            console.log(messages);
            req.session.errors = messages;
            console.log(req.session.errors);
            if (path) {
                res.redirect(path);
            }
        } catch (error) {
            console.log('Error handler has an error', error);
            res.status(500).json({ error: 'Internal Server error' });
        }

    },


    // check who someOne is signed in, and return:
    //        -- userId if true
    //        == redirect to loging page if false
    async validateSession(req) {
        try {
            const userId = req.session.userId || null
            console.log(req.session)
            if (userId) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log('Validate Session has an error', error);
            res.status(500).json({ error: 'Internal Server error' });
        }

    },


    // making a random test comment
    // function to handle user sign up
    async signUpUser(req, res) {
        try {

            console.log(req.session.errors);
            console.log(req.body);
            //create new user
            const user = await User.create(req.body);

            req.session.userId = user.id;
            req.session.userName = user.username;
            console.log(req.session.userId);
            console.log(req.session.username);

            res.redirect("/");
        } catch (error) {
            console.log(error);
            console.log('this')

            console.log(this)
            authController.errorHandler(error, req, res, "/signup");
        }
    },
    async logInUser(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({
                where: {
                    email: email,
                },
            });

            if (!user) {
                req.session.errors = ["No users with that email address"];

                return res.redirect("/login");
            }

            // validate password
            console.log(user.password);
            const isValidPassword = await user.comparePassword(password);

            console.log(isValidPassword);

            if (!isValidPassword) {
                req.session.errors = ["Invalid password"];

                return res.redirect("/login");
            }

            req.session.userId = user.dataValues.id;
            req.session.userName = user.dataValues.username;
            console.log(req.session.userId);
            console.log(req.session.userName);

            res.redirect(`/?login=success&username=${req.session.userName}`);
        } catch (error) {
            authController.errorHandler(error, req, res, "/login");
        }
    },

    logoutUser(req, res) {
        // clears session
        try {
            req.session.destroy((err) => {
                if (err) {
                    console.error("Session Deletion Error", err);
                } else {
                    res.redirect("/login");
                }
            });
        } catch (error) {
            console.log('Log out User has an error', error);
            res.status(500).json({ error: 'Internal Server error' });
        }

    },

    showSignUpPage(req, res) {
        try {
            res.render("pages/signupPage", {
                title: "Sign up for an account",
                errors: req.session.errors,
            });

            // clear errors
            delete req.session.errors;
        } catch (error) {
            console.log('Show sign up Page has an error', error);
            res.status(500).json({ error: 'Internal Server error' });
        }

    },

    showLoginPage(req, res) {
        try {
            res.render("pages/loginPage", {
                title: "Log into your account",
                errors: req.session.errors,
            });

            // clear errors
            delete req.session.errors;

        } catch (error) {
            console.log('Show Login Page has an error', error);
            res.status(500).json({ error: 'Internal Server error' });
        }

    },
};

// obj that handles user authentication and all methods needed 
// to obtain and perform authentication

module.exports = authController;
