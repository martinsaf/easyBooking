import express from "express";
import getProperties from "../services/properties/getProperties.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import createProperty from "../services/properties/createProperty.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import deleteProperty from "../services/properties/deleteProperty.js";
import authMiddleware from "../middleware/auth.js";
import logMiddleware from "../middleware/logMiddleware.js";

const router = express.Router();

router.use(logMiddleware);

router.get("/", async (req, res, next) => {
  try {
    const { location, pricePerNight, amenities } = req.query;
    const properties = await getProperties(location, pricePerNight, amenities);
    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await getPropertyById(id);
    if (!property) {
      res.status(404).json(`Property with id ${id} was not found!`);
    } else {
      res.status(200).json(property);
    }
  } catch (error) {
    next(error);
    //res.status(500).json("Something went wrong while getting property by id!");
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    } = req.body;

    if (
      !title ||
      !description ||
      !location ||
      !pricePerNight ||
      !bedroomCount ||
      !bathRoomCount ||
      !maxGuestCount ||
      !hostId ||
      !rating
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProperty = await createProperty(
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating
    );
    res.status(201).json(newProperty);
  } catch (error) {
    next(error);
    //res.status(500).json("Something went wrong while creating new Property!");
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verifica se a propriedade existe antes de tentar atualizar
    const property = await getPropertyById(id);
    if (!property) {
      return res
        .status(404)
        .json({ message: `Property with id ${id} was not found!` });
    }

    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    } = req.body;

    const updatedProperty = await updatePropertyById(id, {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    });
    res.status(200).json(updatedProperty);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProperty = await deleteProperty(id);

    if (!deletedProperty) {
      res.status(404).json(`Property with id ${id} was not found!`);
    } else {
      res.status(200).json({ message: `Property with id ${id} was deleted!` });
    }
  } catch (error) {
    next(error);
    //res.status(500).json("Something went wrong while deleting Property by id!");
  }
});

export default router;
