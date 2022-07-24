import { IRequest, IResponse, INext} from "../interfaces/common";
import { JsonWebTokenError, JwtPayload, verify as jwtVerify } from "jsonwebtoken";
const { JWT_SECRET_KEY } = process.env;

/**
 * Get user's jwtToken from authorization header
 *
 */
export const getTokenFromHeader = (
  req: IRequest,
  res: IResponse,
  next: INext
) => {
  const headerAuth = req.headers && req.headers.authorization;
  const jwtToken = headerAuth ? headerAuth.split("Bearer ")[0] : null;

  if (jwtToken) {
    req.jwtToken = jwtToken;
    return next();
  }

  return res.status(401).json({
    message: "No token provided",
  });
};

/**
 * Validate user's authorization token
 *
 */

export const validateToken = (
  req: IRequest,
  res: IResponse,
  next: INext
) => {
  try {
    const { jwtToken } = req;
    let decodedToken;
    jwtVerify(jwtToken, JWT_SECRET_KEY as string, (err:JsonWebTokenError, decoded:JwtPayload) => {
      if (err) {
      return   res.status(400).json({
          message: "Invalid token",
        });
        }
      decodedToken = decoded;
      const user = {
        id:decodedToken.id,username:decodedToken.username
      }
      req.user = user
    return   next();
    });

  } catch (error) {
    return res.status(500).json({
      error,
      message: "couldn't validate token",
    });
  }
};
