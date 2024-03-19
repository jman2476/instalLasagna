const { model, Schema } = require('mongoose')
const { hash, compare } = require('bcrypt')

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, 'Please enter a valid username'],
            minLength: [5, 'Your username must be at least 5 characters']
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Please enter a valid email address'],
            validate: {
                validator(val) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ig.test(val);
                },
                message: 'Your email address is invalid.'
            }
        },
        
    }
)

const User = model('User', userSchema)