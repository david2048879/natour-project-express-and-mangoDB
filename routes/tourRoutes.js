
const express = require('express')
const tourController = require('./../controllers/tourController')


const router = express.Router()

router.param('id', tourController.checkId)
router
.route('/')
.get(tourController.getAllTours)
.post(tourController.checkBody, tourController.newTour)
router
.route('/:id')
.get(tourController.getTour)
.delete(tourController.deleteTour)
.patch(tourController.updateTour)


module.exports= router;