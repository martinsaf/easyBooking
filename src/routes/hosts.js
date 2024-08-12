import express from "express";
import getHosts from "../services/hosts/getHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import createHost from "../services/hosts/createHost.js";
import updateHostById from "../services/hosts/updateHostById.js";
import deleteHost from "../services/hosts/deleteHost.js";
import authMiddleware from "../middleware/auth.js";
import logMiddleware from "../middleware/logMiddleware.js";

const router = express.Router();

router.use(logMiddleware);

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    const hosts = await getHosts(name);
    res.status(200).json(hosts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const host = await getHostById(id);
    if (!host) {
      res.status(404).json(`Host with id ${id} was not found!`);
    } else {
      res.status(200).json(host);
    }
  } catch (error) {
    next(error);
    //res.status(500).json("Something went wrong while getting host by id!");
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    // Verifique se os campos obrigatórios estão presentes
    if (!username || !password || !name || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newHost = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    res.status(201).json(newHost);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verifica se o host existe antes de tentar atualizar
    const host = await getHostById(id);
    if (!host) {
      return res
        .status(404)
        .json({ message: `Host with id ${id} was not found!` });
    }

    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;

    const updatedHost = await updateHostById(id, {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    });

    res.status(200).json(updatedHost);
  } catch (error) {
    next(error);
    // Você pode adicionar uma lógica aqui para responder com um 500 se houver um erro inesperado
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedHost = await deleteHost(id);

    if (!deletedHost) {
      res.status(404).json(`Host with id ${id} was not found!`);
    } else {
      res.status(200).json({ message: `Host with id ${id} was deleted!` });
    }
  } catch (error) {
    next(error);
    //res.status(500).json("Something went wrong while deleting Host by id!");
  }
});

export default router;
