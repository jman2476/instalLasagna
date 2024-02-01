const { User } = require('../models');
const faker = require('faker');

const userSeeds = [];

for (let i = 0; i < 10; i++){
    userSeeds.push({
        username:faker.internet.userName(),
        email:faker.internet.email(),
        password:'password'
    });
}

const seedUsers = () => User.bulkCreate(userSeeds, { validate: true });

module.exports = seedUsers;