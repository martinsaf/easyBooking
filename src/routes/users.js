import express from "express";
import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js";
import createUser from "../services/users/createUser.js";
import updateUserById from "../services/users/updateUserById.js";
import deleteUserById from "../services/users/deleteUserById.js";
import authMiddleware from "../middleware/auth.js";
import logMiddleware from "../middleware/logMiddleware.js";

const router = express.Router();

router.use(logMiddleware);

router.get("/", async (req, res, next) => {
  try {
    const { username, email } = req.query;
    const users = await getUsers(username, email);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id); 
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id ${id} was not found!` });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;

    if (
      !username ||
      !password ||
      !name ||
      !email ||
      !phoneNumber ||
      !profilePicture
    ) {
      return res.status(400).json({
        error:
          "All fields are required: username, password, name, email, phoneNumber, profilePicture",
      });
    }

    const newUser = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    res.status(201).json(newUser);
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error("Internal Server Error:", error);
      res
        .status(500)
        .json({ error: "Something went wrong while creating the new User!" });
    }
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id ${id} was not found!` });
    }

    const updatedUser = await updateUserById(id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);

    if (!deletedUser) {
      res.status(404).json({ message: `User with id ${id} was not found!` });
    } else {
      res
        .status(200)
        .json({ message: `User with id ${id} was deleted!`, deletedUser });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
