const express = require('express');
const { authenticate, isAdmin } = require('../middleware/auth');
const { getAllBookings, updateBookingStatus } = require('../controllers/adminController');

const router = express.Router();
router.use(authenticate, isAdmin);
router.get('/bookings', getAllBookings);
router.put('/bookings/:id', updateBookingStatus);

module.exports = router;