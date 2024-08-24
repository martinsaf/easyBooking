import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import customErrors from "../../utils/customError.js";

const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      throw customErrors.UserAlreadyExistsError();
    }

    const user = await prisma.user.create({
      data: {
        id: uuid(),
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
      },
    });

    return user;
  } catch (error) {
    throw error; 
  }
};

export default createUser;
