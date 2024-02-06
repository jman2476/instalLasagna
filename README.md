# INSTALLASAGNA

## User Story

This application helps any and all people who needs some guidance when they have an error while installing a program, or downloading new software on to their hardware. But most importantly it will help them cook up a tasty lasagna out of their spaghetti mess. The user can also be a contributor to the recipe enabling others to resolve their problems


## Description

This application can be used by other coders/developers as well as people who are not tech savvy to resolve their installation issues. They can either use the app as a guest or one can register themselves and thereby be able to write recipes and also contribute in making the existing recipes better. They will be able to edit their own recipes and be able to enhance recipes written by others. Once you are logged you will see all the recipes that have been created by you and be able to edit them if need be.


## Table of Contents

- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Technologies

- Express
- Express-handlebars
- Path
- fs
- Express-session
- Bcrypt
- MYSQL
- dotenv
- nodemon
- Amazon Web Services
- Render Deployment Services

## Installation

So you want to run our service on your local machine, eh? Well we've got a few steps for you. You will need to have ``npm`` and ``mysql`` installed on your machine for this to work.

1 - Start by cloning down the repository from https://github.com/jman2476/instalLasagna

2 - ``cd`` into the cloned down directory, then run ``npm install``. This will install all of the dependencies.

3 - Open the MySQL shell by running ``mysql`` in the CLI, then type `SOURCE ./db/schema.sql`, then exit the shell by running `exit`

4 - In the bash terminal, run `npm run seed` to seed the database.

5 - Finally, run `npm run dev` to start the server. Once it is running, it should be accessible at `localhost:3340`. If you have something that is current using port 3340, feel free to open the `server.js` file and edit the port to suit your needs.



## Usage

A user would be able to flag an error, document a solution, then add it onto the recipe, so when other users have a similar error they can refer to the solution based on their operating system.


## License

This project is licensed under the MIT license.

## Contributing

Do you have any ideas? Something that could improve our site?Shoot us a message over at [our GitHub!](https://github.com/jman2476/instalLasagna)

## Questions

For questions or concerns, please contact us at:
cjswayne [GitHub](https://github.com/cjswayne)
jman2476 [GitHub](https://github.com/jman2476)
jsaini1727 [GitHub] (https://github.com/jsaini1727)
Edsong158 [GitHub](https://github.com/Edsong158)

or email us at installLasagna@spaghetti.com
