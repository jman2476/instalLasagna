const { User } = require("../models");

const authController = {
  // handle the errors
  errorHandler(err, req, res, path) {
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
    res.redirect(path);
  },

  // function to handle user sign up
  async signUpUser(req, res) {
    try {
      const errors = req.session.errors;

      console.log(req.session.errors);
      console.log(req.body);
      //create new user
      const user = await User.create(req.body);

      req.session.userId = user.id;
      req.session.userName = user.username;
      console.log(req.session.userId);
      console.log(req.session.username);

      res.redirect("/signup");
    } catch (error) {
      console.log(error);
      this.errorHandler(error, req, res, "/signup");
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
      this.errorHandler(error, req, res, "/login");
    }
  },
  logoutUser(req, res) {
    // clears session

    req.session.destroy((err) => {
      if (err) {
        console.error("Session Deletion Error", err);
      } else {
        res.redirect("/login");
      }
    });
  },
  showSignUpPage(req, res) {
    res.render("pages/signupPage", {
      title: "Sign up for an account",
      errors: req.session.errors,
    });

    // clear errors
    delete req.session.errors;
  },
  showLoginPage(req, res) {
    res.render("pages/loginPage", {
      title: "Log into your account",
      errors: req.session.errors,
    });

    // clear errors
    delete req.session.errors;
  },
};

// obj that handles user authentication and all methods needed 
// to obtain and perform authentication

module.exports = authController;
