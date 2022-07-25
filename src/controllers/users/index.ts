import { IUsersRecord, IUsersResult } from "../../interfaces/users/index";

import { Request, Response, NextFunction } from 'express';
import { hash as hashPassword } from 'bcrypt';
import UsersModel from "../../models/users";
import { generateJwtToken } from "../../utils";

export default class UsersController{

  static async getUser(req: Request, res: Response):Promise<void>{
    try {
      const decodedUser = req.user;
      const user = await UsersModel.findByUsername(decodedUser.username as string);
      if (!user) {
        res.status(404).json({
          user: null,
          message: "User not found",
        });
      
      }
      res.status(200).json({
        message: "user retrieved",
        user,
      });
    } catch (error) {
      res.status(500).json({
        message: "an error occurred ",
      });
    }
  }
  static async createNewUser (
req: Request,
res: Response,next:NextFunction
  ):Promise<void> {
  try {
    const password = await hashPassword(String(req.body.password),10);
    const newUser: IUsersRecord = {
      email: req.body.email,
      firstname: req.body.firstname,
      username: req.body.username, 
      lastname: req.body.lastname,
      password,
      profile_image:req.photo_url
    };
    console.log(newUser);
    
    const user = (await UsersModel.create(newUser) as IUsersResult);
    console.log('after user db model');
    
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
}
}