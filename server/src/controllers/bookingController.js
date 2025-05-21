const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createBooking = async (req, res) => {
  try {
    const { date, time, guests, phoneNumber } = req.body;
    const booking = await prisma.booking.create({
      data: {
        date: new Date(date),
        time,
        guests: parseInt(guests),
        phoneNumber,
        userId: req.user.userId
      }
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: 'Booking creation failed' });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.userId }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get bookings' });
  }
};

const deleteUserBookingsAdmin = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId); // ID из URL параметра
    
    const deletedBookings = await prisma.booking.deleteMany({
      where: { userId }
    });

    res.json({ 
      message: `Удалено бронирований пользователя ${userId}: ${deletedBookings.count}`,
      deletedCount: deletedBookings.count
    });

  } catch (error) {
    res.status(400).json({ 
      error: 'Неверный запрос',
      details: error.message 
    });
  }
};

module.exports = { createBooking, getUserBookings, deleteUserBookingsAdmin };