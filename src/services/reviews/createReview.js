import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const createReview = async (userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();

  const review = await prisma.review.create({
    data: { id: uuid(), userId, propertyId, rating, comment },
  });

  return review;
};

export default createReview;
