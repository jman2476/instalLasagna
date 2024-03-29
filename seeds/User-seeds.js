const { User } = require('../models');
const { faker } = require('@faker-js/faker');


function generateUserData() {
    const userSeeds = [];

    for (let i = 0; i < 2; i++){
        let name = faker.internet.userName();
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