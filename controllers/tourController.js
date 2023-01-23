
const { json } = require('express');
const fs = require('fs')
const tours=JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)) ;

exports.checkId = (req, res, next, val) =>{
    console.log(`Tour id Is : ${val}`)
    if(req.params.id > tours.length){
        return res.status(404).json({
            status: "fail",
            masseg: " not match here"
        })
    }
    next();
}

exports.checkBody = (req, res, next)=>{
    if (! req.body.name || req.body.price){
        return res.status(400).json({
            status: 'fail',
            message: 'missing name or price'
        })
    }
    next();
}

// ====ROUTER=====

exports.getAllTours=  (req, res)=>{
    res.status(200).json({
        status: 'Success',
        data: {
            tours: tours
        }
    });
};

exports.getTour = (req, res)=>{
    console.log(req.params)
    // if(req.params.id > tours.length){
    //     return res.status(404).json({
    //         status: "fail",
    //         masseg: " not match here"
    //     })
    // }
        const tour = tours.find(el => el.id===req.params.id *1);
        res.status(200).json({
            status: 'Success',
            data: {
                tour
            }
        });
   
};

exports.newTour = (req,res)=>{
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

exports.updateTour = (req, res)=>{
    // if(req.params.id > tours.length){
    //     return res.status(404).json({
    //         status: "fail",
    //         masseg: " not match here"
    //     })
    // }
    res.status(200).json({
        status: "success",
        data: {
            tour: '<Updated tour here...>'
        }
    })
};

exports.deleteTour = (req, res)=>{
    // if(req.params.id > tours.length){
    //     return res.status(404).json({
    //         status: "fail",
    //         masseg: " not match here"
    //     })
    // }
    res.status(204).json({
        status: "no content",
        data: null
    })
};