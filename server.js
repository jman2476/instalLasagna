const express = require('express')
const {engine} = require('express-handlebars');

const PORT = 3333;
const app = express();
const {view_routes} = require('./routes')
// Import the sequelize connection
const db = require('./config/connection.js');

// Opening up the middleware channel to allow json to be sent through from the client
app.use(express.json());

// Open a channel to allow url encoded data through
app.use(express.urlencoded({ extended:
false }));

// Share or create a GET route for every file in the public folder
app.use(express.static('./public'))

// Set up Handlebars
app.engine('hbs', engine({extname:'.hbs'}));
app.set('view engine', 'hbs');
app.set('views', './views');

// Load Routes
// app.use('/api', []);
app.use('/', [view_routes]);

db.sync({force: true})
    .then(() => {
        app.listen(PORT, () => {
            console.log('Server started on port', PORT)
        });
    });


/*
    -- STOPPING POINT --
        -seeding and models done

    -- Tasks for project --

        *all tasks subject to change upon review

>BACKEND TASKS
    - authentication and authorization
    - API endpoints(routes)
    - Error/validation handling
    - tests

>FRONTEND TASKS
    - create mockups for key pages
        - Recipe view
        - homepage
        - user login
        - user dashboard/where they can see their made recipes
    - connect frontend with backend
    - design for mobile + desktop

>MAIN FEATURES
    - Implement the recipe creation and editing workflow
    - Develop the feature for viewing and following along to recipes.
    - Add the ability to report errors on recipes and steps.
    - Create a system for linking error reports to solutions or solution recipes.
    - Implement user profiles and manage user-generated content.

-- FINISHED TASKS--
- Finalize project requirements and objectives.
- Set up version control
- Set up the project structure and env
- db config
- Choosing framework --> handlebars
- Design the database schema
- Implement the models in Sequelize (User, Recipe, Step, ErrorReport, ErrorSolution)
- Set up model associations and foreign key constraints
- Seed the database with initial data for development and testing  
*/