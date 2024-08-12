import { PrismaClient } from "@prisma/client";

const getBookings = async (userId) => {
  const prisma = new PrismaClient();

  const filters = {};
  if (userId) filters.userId = userId;

  const bookings = await prisma.booking.findMany({
    where: filters,
  });
  return bookings;
};
export default getBookings;
