import { JwtPayload, verify as jwtVerify, VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

const { JWT_SECRET_KEY } = process.env;

/**
 * Get user's jwtToken from authorization header
 *
 */
export const getTokenFromHeader = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerAuth = req.headers && req.headers.authorization;
  const jwtToken = headerAuth ? headerAuth.split("Bearer ")[0] : null;

  if (jwtToken) {
    req.jwtToken = jwtToken;
    next();
    return 
  }

 res.status(401).json({
    message: "No token provided",
  });
};

/**
 * Validate user's authorization token
 *
 */

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jwtToken } = req;
    let decodedToken;
    jwtVerify(jwtToken, JWT_SECRET_KEY as string, (err, decoded) => {
      if ((err as VerifyErrors)) {
        res.status(400).json({
          message: "Invalid token",
        });
        return
        }
      decodedToken  = (decoded as JwtPayload);
      const user = {
        id:decodedToken.id,username:decodedToken.username
      }
      req.user = user
     next();
    });

  } catch (error) {
  res.status(500).json({
      error,
      message: "couldn't validate token",
    });
  }
};
