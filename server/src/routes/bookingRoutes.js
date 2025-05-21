const express = require('express');
const { authenticate } = require('../middleware/auth');
const { createBooking, getUserBookings, deleteUserBookingsAdmin } = require('../controllers/bookingController');

const router = express.Router();
router.use(authenticate);
router.post('/', createBooking);
router.get('/', getUserBookings);
router.delete('/admin/users/:userId/bookings', deleteUserBookingsAdmin);

module.exports = router;