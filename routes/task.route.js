let express = require('express');
let router = express.Router();

let taskController = require('../controllers/task');

router.route('/getAttractions').get(taskController.getListOfAttractions);

router.route('/storeattractions').post(taskController.storeAttractions);

router.route('/pricingAndCheckAvaliability').post(taskController.getPricingAndAvaliabilityData);

router.route('/createBooking').post(taskController.createBookingAndStoreBooking);

router.route('/getDetailsCreateBooking').post(taskController.bookTicketByAttractionIdAndTicketId);
module.exports = router;