
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

        //BUILD QUERY
        //1)  Filtering
        const queryObj = {...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        //2) advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte\|gt|lte|lt|)\b/g, match => `$${match}`);
        console.log(JSON.parse(queryStr));

        let query = Tour.find(JSON.parse(queryStr));

        // const = await Tour.find(queryObj);
        //3) sorting 
        if(req.query.sort){
            query = query.sort(req.query.sort);
        }

        //4) field limiting
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            query= query.select(fields);
        }else{
            query = query.select('-__v')
        }

        // pagination
         const page = req.query.page *1 || 1;
         const limit = req.query.limit *1 || 100;
         const skip = (page -1) * limit;

         query = query.skip(skip).limit(limit);

        //EXECUTE QUERY
        const tours = await query

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

exports.createTour = async (req, res)=>{
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
            message: err
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