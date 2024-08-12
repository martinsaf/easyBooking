import express from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import createAmenity from "../services/amenities/createAmenity.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import deleteAmenity from "../services/amenities/deleteAmenity.js";
import authMiddleware from "../middleware/auth.js";
import logMiddleware from "../middleware/logMiddleware.js";

const router = express.Router();

router.use(logMiddleware);

router.get("/", async (req, res, next) => {
  try {
    const amenities = await getAmenities();
    res.status(200).json(amenities);
  } catch (error) {
    next(error);
    //res.status(500).json("Something went wrong while getting list of amenities!");
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const amenity = await getAmenityById(id);
    if (!amenity) {
      res.status(404).json({ message: `Amenity with id ${id} was not found!` });
    } else {
      res.status(200).json(amenity);
    }
  } catch (error) {
    next(error);
    //res.status(500).json("Something went wrong while getting amenity by id!");
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newAmenity = await createAmenity(name);
    res.status(201).json(newAmenity);
  } catch (error) {
    next(error);
    //res.status(500).json("Something went wrong while creating new Amenity");
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedAmenity = await updateAmenityById(id, { name });

    if (updatedAmenity) {
      res.status(200).json(updatedAmenity);
    } else {
      res.status(404).json({
        message: `User with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
    //res.status(500).json("Something went wrong while updating amenity by id!");
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAmenity = await deleteAmenity(id);

    if (!deletedAmenity) {
      res.status(404).json({ message: `Amenity with id ${id} was not found!` });
    } else {
      res.status(200).json({ message: `Amenity with id ${id} was deleted!` });
    }
  } catch (error) {
    next(error);
    //res.status(500).json("Something went wrong while deleting Amenity by id!");
  }
});

export default router;
