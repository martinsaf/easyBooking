import { PrismaClient } from "@prisma/client";

const getAminityById = async (id) => {
  const prisma = new PrismaClient();
  const amenity = await prisma.amenity.findUnique({
    where: {
      id,
    },
  });
  return amenity;
};

export default getAminityById;
