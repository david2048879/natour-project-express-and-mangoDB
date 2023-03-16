const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const bcryptjs = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name']
    },
    email:{
        type: String,
        required: [true, 'please enter your email'],
        unique: true,
        lowercase: true
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'please enter a password'],
        mainlingth: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'please comfirm your password'],
        validate: {
            validator: function (el){
                return el === this.password
            },
            massage: 'password doesnt match'
        }
    }
});

userSchema.pre('save', async  function(next){

    //only ru this function if password was actually modified
    if(!this.isModified('password')) return next();

    this.password =  await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next()
})

userSchema.methods.correctPassword = function(candidatePassword, userPassword){
    return bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema);

module.exports = User