const { User } = require('../models');
const faker = require('faker');

function generateUserData() {
    const userSeeds = [];

    for (let i = 0; i < 10; i++){
        userSeeds.push({
            username:faker.internet.userName(),
            email:faker.internet.email(),
            password:'password'
        });
    }

    return userSeeds;
}

async function seedUsers() {
    const users = generateUserData();
    try {
        await User.bulkCreate(userSeeds, { validate: true });
    } catch (err) {
        console.log(err)
    }

}

module.exports = seedUsers;