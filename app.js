const express = require('express');
const fs = require('fs')
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express();

//MIDELWARE

app.use(express.json());
app.use(morgan('dev'))
app.use(express.static(`${__dirname}/public`))

app.use((res, req, next)=>{
console.log('Hello from midleware');
next()
})

app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    next();
})


app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports= app;