import { PrismaClient } from "@prisma/client";
import getAmenities from "../amenities/getAmenities.js";

const getProperties = async (location, pricePerNight, amenities) => {
  const prisma = new PrismaClient();

  // Converte pricePerNight para um número de ponto flutuante
  pricePerNight = parseFloat(pricePerNight);

  const filters = {};
  if (location) filters.location = location;

  // Verifica se pricePerNight é um número válido antes de adicionar ao filtro
  if (!isNaN(pricePerNight)) filters.pricePerNight = pricePerNight;

  if (amenities) {
    // Verifique se as amenities existem no banco de dados
    const allAmenities = await getAmenities(); // Busque todas as amenities
    const amenitiesArray = amenities.split(","); // Supondo que as amenities sejam passadas como uma string separada por vírgulas
    const validAmenities = allAmenities
      .filter((amenity) => amenitiesArray.includes(amenity.id))
      .map((amenity) => amenity.id);

    if (validAmenities.length > 0) {
      filters.amenities = {
        some: {
          id: {
            in: validAmenities,
          },
        },
      };
    }
  }

  const properties = await prisma.property.findMany({
    where: filters,
    include: {
      amenities: true,
    },
  });

  return properties;
};

export default getProperties;
