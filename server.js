// START SERVER


const app = require('./app')

const port=3000;
app.listen(port, ()=>{

    console.log('App runningon port 3000');
})