const { User } = require('../models');
const { faker } = require('@faker-js/faker');


function generateUserData() {
    const userSeeds = [];

    for (let i = 0; i < 5; i++){
        // console.log()
        let name = faker.internet.userName();
        console.log(name, `\n\n\\n\n\n\n\n\n\n\n Hello`)
        userSeeds.push({
            username:name,
            email:faker.internet.email(),
            password:'password'
        });
    }

    return userSeeds;
}

async function seedUsers() {
    const users = generateUserData();
    try {
        await User.bulkCreate(users, { validate: true });
    } catch (err) {
        console.log(err)
    }

}

module.exports = seedUsers;