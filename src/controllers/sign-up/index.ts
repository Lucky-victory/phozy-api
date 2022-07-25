import { IUsersRecord, IUsersResult } from "./../../interfaces/users/index";

import { NextFunction, Request, Response } from "../../interfaces/common";
import { Users } from "../../models/users";
import { generateJwtToken } from "../../utils";

export const createNewUser = async (
req: Request,
res: Response,
  next:NextFunction
) => {
  try {
    const newUser: IUsersRecord = {
      email: req.body.email,
      firstname: req.body.firstname,
      username: req.body.username,
      password: req.body.password,
      lastname: req.body.lastname,
    };
    const user = (await Users.create(newUser)) as IUsersResult;
    const token = generateJwtToken(user);
   return res.status(201).json({
      user,
      token,
      messsage: "user successfully created ",
    });
  } catch (error) {
    return res.status(500).json({
      error,
      message: "an error occured",
    });
  }
};
