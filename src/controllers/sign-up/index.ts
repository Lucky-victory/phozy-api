import { IUsersRecord, IUsersResult } from "./../../interfaces/users/index";

import { Users } from "../../models/users";
import { generateJwtToken } from "../../helpers";
import { IResponse,IRequest,INext } from "../../interfaces/common";

export const createNewUser = async (
req: IRequest,
res: IResponse,
  next:INext
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
