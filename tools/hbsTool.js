const fs = require('fs');
const path = require('path');


const hbsTool = {
    registerPartials(directory, hbs){
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
}; 


module.exports = hbsTool;