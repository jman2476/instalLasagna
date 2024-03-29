const express = require("express");
const { create } = require("express-handlebars");
const path = require('path');
const fs = require('fs');
const session = require('express-session');

const PORT = process.env.PORT || 3340;
const app = express();
const router = require("./routes");

// Import the sequelize connection
const db = require("./config/connection.js");

// Opening up the middleware channel to allow json to be sent through from the client
app.use(express.json());

// Open a channel to allow url encoded data through
app.use(express.urlencoded({ extended: false }));

// Share or create a GET route for every file in the public folder
app.use(express.static("./public"));

const hbs = create({
    defaultLayout: "main",
    partialsDir: ["./views/partials"],
    extname: ".hbs",
    helpers: {
        print: function(name, second){
            return name === second;
        },
        eq: function (v1, v2){
            return v1 === v2;
        },
        dynamicPartial: function (name, options) {

            let template = hbs.handlebars.partials[name]; // getting the partial by name

            if (typeof template !== "function") {
                // asking if the template has been compiled
                template = hbs.handlebars.compile(template);

            }

            let data = Object.assign({}, this, options.hash);
            let renderedHtml = template(data);
            
            // renders compiled template with additional options
            return new hbs.handlebars.SafeString(template(options.hash)); // safestring ensures hbs doesnt escape
        },

    },
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

// const hbs = expHbs.create();
// Register partials
function registerPartials(directory){
    fs.readdirSync(directory).forEach((filename) => { // reading entire directory thats specified
        const fullPath = path.join(directory, filename);
        const matches = /^([^.]+).hbs$/.exec(filename); // looking through each file to see if it ends in a .hbs
        if (!matches){
            return; // if it doesn't contain .hbs, skip to next file
        }

        const name = matches[1]; // extracts the filename without the .hbs
        const template = fs.readFileSync(fullPath, 'utf8');
        hbs.handlebars.registerPartial(name, template); // registering partials for later use.
    })
}
registerPartials(path.join(__dirname, "views", "partials"));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: {}
  }))



// Load Routes
app.use("/api", [router.recipeDB, router.searchDB]);
app.use("/", [router.view, router.user, router.step, router.recipeForm]);

// Middleware net to catch 404's -->
app.use((req, res, next) => {
    res.status(404).render("pages/404",  {title: '404'});
});


db.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log("Server started on port", PORT);
      });
});

/*
    -- STOPPING POINT --

    -- Tasks for project --


>BACKEND TASKS
    - API endpoints(routes) -IN PROGRESS
    - Error/validation handling --> PRIORITY(server can crash if db f's up)
    

>FRONTEND TASKS
    - connect frontend with backend -IN PROGRESS
    - design for mobile + desktop -IN PROGRESS

>MAIN FEATURES
    - Implement the recipe creation and editing workflow
    --
    - Add the ability to report errors on recipes and steps.
    - Create a system for linking error reports to solutions or solution recipes.
    - Implement user profiles and manage user-generated content.

-- FINISHED TASKS--
    - authentication and authorization 
    - Develop the feature for viewing and following along to recipes.

- Finalize project requirements and objectives.
- Set up version control
- Set up the project structure and env
- db config
- Choosing framework --> handlebars
- Design the database schema
- Implement the models in Sequelize (User, Recipe, Step, ErrorReport, ErrorSolution)
- Set up model associations and foreign key constraints
- Seed the database with initial data for development and testing  
- create mockups for key pages
        - Recipe view
        - homepage
        - user dashboard/where they can see their made recipes
*/
