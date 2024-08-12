import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const createAmenity = async (name) => {
  const prisma = new PrismaClient();

  const amenity = await prisma.amenity.create({
    data: { id: uuid(), name },
  });
  return amenity;
};

export default createAmenity;
