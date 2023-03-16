const User = require('../modules/userModel');



exports.getAllUsers = async(req, res) =>{
        try{
            const user = await User.find();
            res.status(200).json({
                status: 'Success',
                data: {
                    user
                }
            });

        }catch(err){
            res.status(400).json({
                message: "fail"
            })
        }
        
   
};

exports.createUser = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message: 'this router is not yet defined'
    })
}
exports.getUser = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message: 'this router is not yet defined'
    })
}
exports.updateUser = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message: 'this router is not yet defined'
    })
}
exports.deleteUser = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message: 'this router is not yet defined'
    })
}