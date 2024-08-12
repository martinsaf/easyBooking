import { PrismaClient } from "@prisma/client"; // Certifique-se de que esta linha está presente
import { v4 as uuid } from "uuid";

const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const prisma = new PrismaClient();

  const host = await prisma.host.create({
    data: {
      id: uuid(),
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    },
  });
  return host;
};

export default createHost;
