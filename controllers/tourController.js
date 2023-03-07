
const { json } = require('express');
const Tour = require('../modules/tourModule');

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

exports.getAllTours=  async(req, res)=>{
    try{
        const tours = await Tour.find();
        res.status(200).json({
            status: 'Success',
            data: {
                tours: tours
            }
        });
    }catch(err){
        res.status(400).json({
            status: " fail"
        })

    }
   
};

exports.getTour = async(req, res)=>{
    const tour = await Tour.findById(req.params.id);
        try{
            res.status(200).json({
                status: 'Success',
                data: {
                    tour
                }
            });

        }catch(err){
            res.status(400).json({
                message: "invalid ID"
            })
        }
        
   
};

exports.createTour = async (req,res)=>{
    try{
        const newTour = await Tour.create(req.body);
        res.status(201).json({
           stutas: 'success',
           data: {
               message: newTour
           }
          });

    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: "invalid data"
        })
    }
   
};

exports.updateTour = async (req, res)=>{
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: "success",
            data: {
                tour
            }
        })

    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: "invalid data"
        })

    }
 
};

exports.deleteTour = async(req, res)=>{
    try{
        const tour = await Tour.findByIdAndDelete(req.params.id);
        res.status(201).json({
            stutas: 'success',
            data: {
                message: " data deleted"
            }
           });


    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: "invalid data"
        })

    }
   
};