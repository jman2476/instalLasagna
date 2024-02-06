const sequelize = require('../config/connection');
const {User} = require('../models');
const bcrypt = require('bcrypt')


const saltRounds = 10; // Define saltRounds for bcrypt


async function seedSystemUser(){
    try{
        const hashedPassword = await bcrypt.hash('password', saltRounds);
        await sequelize.sync();
        const systemUser = await User.findOne({
            where:{
              username:'system'
            }
          })       
          
        if(!systemUser){
            await User.create({
                username:'system',
                email:'system@gmail.com',
                password:hashedPassword
            })
            console.log('System User Seeded Successful')
        } else {
            console.log('System user already exists.');
        }
    } catch(err){
        console.error('Failed to seed system user:', err);

    }
}
console.log('about to seed user')
seedSystemUser();
console.log('\n----- SYSTEM SEEDED -----\n')

module.exports = seedSystemUser;