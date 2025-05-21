const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { user: true }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get bookings' });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const booking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: { status }
    });
    
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update booking' });
  }
};

module.exports = { getAllBookings, updateBookingStatus };