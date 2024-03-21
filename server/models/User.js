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
        password: {
            type: String,
            required: [true, 'You must enter a passowrd'],
            minLength: [8, 'Your password must be at least 8 characters long'],
            //validate with regex that password has uppercase, lowercase, number, special char
            validate: {
                validator(val) {
                    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g.test(val)
                }
            }
        },
        recipes: [{
            type: Schema.Types.ObjectId,
            ref: 'Recipe'
        }],
        notes: [{
            type: Schema.Types.ObjectId,
            ref: 'Notes'
        }]
    }
)

userSchema.methods.validatePass = async function(formPass) {
    const validPass = await compare(formPass, this.Password)

    return validPass
}

userSchema.pre('save', async function(next) {
    if(this.isNew){
        this.password = await hash(this.password, 10)
    }

    next()
})

const User = model('User', userSchema)

module.exports = User