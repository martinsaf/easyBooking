import { PrismaClient } from "@prisma/client";

const getHosts = async (name) => {
  const prisma = new PrismaClient();

  const filters = {};
  if (name) filters.name = name;

  const hosts = await prisma.host.findMany({
    where: filters,
  });
  return hosts;
};

export default getHosts;
