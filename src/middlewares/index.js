const { Request, Response, NextFunction } = require("express");

/**
 * Get user's Apikey from authorization header
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getApiKeyFromHeader = (req, res, next) => {
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
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */

const validateApiKey = (req, res, next) => {
  const { apikey } = req;
};

module.exports = {
  getApiKeyFromHeader,
  validateApiKey,
};
