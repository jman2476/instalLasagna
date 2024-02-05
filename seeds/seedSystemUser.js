const sequelize = require('../config/connection');
const {User} = require('../models');
const bcrypt = require('bcrypt')
const SYSTEM_USER_ID = -1;

async function seedSystemUser(){
    try{
        const hashedPassword = await bcrypt.hash('password', saltRounds);
        await sequelize.sync();
        const systemUser = await User.findByPk(SYSTEM_USER_ID)
        if(!systemUser){
            await User.create({
                id:SYSTEM_USER_ID,
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

seedSystemUser();