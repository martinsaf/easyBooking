import { PrismaClient } from "@prisma/client";
import getAmenities from "../amenities/getAmenities.js";

const getProperties = async (location, pricePerNight, amenities) => {
  const prisma = new PrismaClient();

  // Converts pricePerNight to a floating-point number
  pricePerNight = parseFloat(pricePerNight);

  const filters = {};
  if (location) filters.location = location;

  // Checks if pricePerNight is a valid number before adding to the filter
  if (!isNaN(pricePerNight)) filters.pricePerNight = pricePerNight;

  if (amenities) {
    
    const allAmenities = await getAmenities(); 
    const amenitiesArray = amenities.split(",");
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
