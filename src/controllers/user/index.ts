import { IUsersRecord, IUsersResult } from "./../../interfaces/users/index";

import { Users } from "../../models/users";
import { generateJwtToken } from "../../helpers";
import { IResponse,IRequest,INext } from "../../interfaces/common";

export default class UsersController{

  static async getUser(req: IRequest, res: IResponse){
    try {
      const decodedUser = req.user;
      const user = await Users.findByUsername(decodedUser.username as string);
      if (!user) {
        return res.status(404).json({
          user: null,
          message: "User not found",
        });
      
      }
      return res.status(200).json({
        message: "user retrieved",
        user,
      });
    } catch (error) {
      return res.status(500).json({
        message: "an error occurred ",
      });
    }
  }
  static async createNewUser (
req: IRequest,
res: IResponse,
  ) {
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
}
}