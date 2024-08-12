const UserAlreadyExistsError = (message = "User already exists") => ({
  message,
  statusCode: 409,
  name: "UserAlreadyExistsError",
});

const NotFoundError = (message = "Resource not found") => ({
  message,
  statusCode: 404,
  name: "NotFoundError",
});

const UnauthorizedError = (message = "Unauthorized access") => ({
  message,
  statusCode: 401,
  name: "UnauthorizedError",
});

const InternalServerError = (message = "Internal server error") => ({
  message,
  statusCode: 500,
  name: "InternalServerError",
});

const AmenityAlreadyExistsError = (message = "Amenity already exists") => ({
  message,
  statusCode: 409,
  name: "AmenityAlreadyExistsError",
});

const customErrors = {
  UserAlreadyExistsError,
  NotFoundError,
  UnauthorizedError,
  InternalServerError,
  AmenityAlreadyExistsError,
};

export default customErrors;
