const User = require('./../modules/userModel');
const jwt = require('jsonwebtoken');

ACCESS_TOKEN_SECERT= "david48879";

const signToken = id => {
    return  jwt.sign({ id },
    ACCESS_TOKEN_SECERT, { expiresIn: "50m"}
    );
}
exports.signup = async (req, res, next)=>{
    
    try{
        const newUser = await User.create(req.body)

        const accessToken =  signToken(newUser._id)

    res.status(201 ).json({
        status: 'success',
        accessToken,
        data: {
            user: newUser
        }
    })

    }catch(err){
        res.status(404).json({
            status: "fail",
            error: err
        })

    }

    
}


exports.signin = async (req, res, next)=>{
    const { email, password } = req.body;

    if (!email || !password){
        return res.status(400).json('please provide email and password')
    }

    // check if user exists &&  password is correct

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError('Incorrect email or password', 401));
    }

    // if everything ok, send token to client

    const token = signToken(user._id);
    res.status(200).json({status: 'success', token})
}