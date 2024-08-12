import logger from "../utils/log.js";

const errorHandler = (err, req, res, next) => {
  logger.error(`${err.message} - ${req.method} ${req.originalUrl}`);

  if (err.message.includes("not found")) {
    return res.status(404).json({ message: err.message });
  } else if (err.message.includes("bad request")) {
    return res.status(400).json({ message: err.message });
  } else if (err.message.includes("invalid credentials")) {
    return res.status(401).json({ message: err.message });
  } else {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default errorHandler;
