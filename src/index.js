import express from "express";
import * as Sentry from "@sentry/node";
import "dotenv/config";

import BookingsRouter from "./routes/bookings.js";
import AmenitiesRouter from "./routes/amenities.js";
import HostsRouter from "./routes/hosts.js";
import PropertyRouter from "./routes/properties.js";
import ReviewsRouter from "./routes/reviews.js";
import UsersRouter from "./routes/users.js";
import loginRouter from "./routes/login.js";
import log from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
console.log("Sentry DSN:", process.env.SENTRY_DSN);

// O request handler deve estar antes de qualquer middleware
app.use(Sentry.Handlers.requestHandler());

// Rotas da sua aplicação
app.get("/debug-sentry", function mainHandler(req, res) {
  try {
    throw new Error("Minha primeira captura de erro com o Sentry!");
  } catch (err) {
    Sentry.captureException(err);
    res.status(500).send("Erro capturado e enviado para o Sentry!");
  }
});

//Resource routes
app.use("/bookings", BookingsRouter);
app.use("/amenities", AmenitiesRouter);
app.use("/hosts", HostsRouter);
app.use("/properties", PropertyRouter);
app.use("/reviews", ReviewsRouter);
app.use("/users", UsersRouter);
app.use("/login", loginRouter);

app.use(Sentry.Handlers.errorHandler());

// Global middleware
app.use(log);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
