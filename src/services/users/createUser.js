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
    // Verificar se o username já existe
    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      throw customErrors.UserAlreadyExistsError();
    }

    // Criar o novo usuário
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
    throw error; // O erro será capturado pelo manipulador de rotas
  }
};

export default createUser;
