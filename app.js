const express = require('express');
const fs = require('fs')
const morgan = require('morgan')

const app = express();

//MIDELWARE

app.use(express.json());
app.use(morgan('dev'))

app.use((res, req, next)=>{
console.log('Hello from midleware');
next()
})

app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    next();
})


const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)) ;

// ====ROUTER=====

const getAllTours=  (req, res)=>{
    res.status(200).json({
        status: 'Success',
        data: {
            tours: tours
        }
    });
};

const getTour = (req, res)=>{
    console.log(req.params)
    if(req.params.id > tours.length){
        return res.status(404).json({
            status: "fail",
            masseg: " not match here"
        })
    }
        const tour = tours.find(el => el.id===req.params.id *1);
        res.status(200).json({
            status: 'Success',
            data: {
                tour
            }
        });
   
};

const newTour = (req,res)=>{
    const newId = tours[tours.length - 1].id + 1;
   const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours),
    err =>{
        res.status(201).json({
            stutas: 'success',
            data: {
                tours: newTour
            }
        });
    });
};

const updateTour = (req, res)=>{
    if(req.params.id > tours.length){
        return res.status(404).json({
            status: "fail",
            masseg: " not match here"
        })
    }
    res.status(200).json({
        status: "success",
        data: {
            tour: '<Updated tour here...>'
        }
    })
};

const deleteTour = (req, res)=>{
    if(req.params.id > tours.length){
        return res.status(404).json({
            status: "fail",
            masseg: " not match here"
        })
    }
    res.status(204).json({
        status: "no content",
        data: null
    })
};

const getAllUsers = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message: 'this router is not yet defined'
    })
}
const createUser = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message: 'this router is not yet defined'
    })
}
const getUser = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message: 'this router is not yet defined'
    })
}
const updateUser = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message: 'this router is not yet defined'
    })
}
const deleteUser = (req, res) =>{
    res.status(500).json({
        status: 'error',
        message: 'this router is not yet defined'
    })
}

const tourRouter = express.Router()
const userRouter = express.Router()
//tour
tourRouter
    .route('/')
    .get(getAllTours)
    .post(newTour)
tourRouter
    .route('/:id')
    .get(getTour)
    .delete(deleteTour)
    .patch(updateTour)
//user
userRouter
   .route('/')
   .get(getAllUsers)
   .post(createUser)

userRouter
   .route('/:id')
   .get(getUser)
   .patch(updateUser)
   .delete(deleteUser)

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

// START SERVER
const port=3000;
app.listen(port, ()=>{

    console.log('App runningon port 3000');
})