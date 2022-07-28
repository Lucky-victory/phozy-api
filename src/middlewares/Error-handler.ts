import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      status: err.status || 401,
      message: "Invalid token",
    });
  }
  const errorObj = {
    status: err.status || 500,
    message: err.message,
    error:
      req.app.get("env") === "production" ? null : { err, stack: err.stack },
  };
  res.json(errorObj);
};
