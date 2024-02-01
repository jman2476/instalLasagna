const express = require('express')
const {engine} = require('express-handlebars');

const PORT = 3340;
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
