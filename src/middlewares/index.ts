import { Request, Response, NextFunction } from "express";

/**
 * Get user's Apikey from authorization header
 *
 */
export const getApiKeyFromHeader = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerAuth = req.headers && req.headers.authorization;
  const apikey = headerAuth ? headerAuth.split("Basic ") : null;

  if (apikey) {
    req.apikey = apikey;
    next();
    return;
  }

  res.status(400).json({
    message: "No token provided",
  });
};

/**
 * Validate user's authorization token
 *
 */

export const validateApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { apikey } = req;
};
