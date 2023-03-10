// START SERVER
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app')
dotenv.config({path: './config.env'});
mongoose
.connect(process.env.DATABASE_LOCAL, {
    userNewurlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=> console.log('DB connection successful'));



const port=3000;
app.listen(port, ()=>{

    console.log('App runningon port 3000');
})