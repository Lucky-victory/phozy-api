import { IUsersRecord, IUsersResult } from "./../../interfaces/users/index";
import { NextFunction, Request, Response } from "express";
import { Users } from "../../models/users";
import { generateJwtToken } from "../../helpers";

export const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
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
    res.status(201).json({
      user,
      token,
      messsage: "user successfully created ",
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "an error occured",
    });
  }
};
