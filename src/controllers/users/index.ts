import { IUsersRecord, IUsersResult } from "../../interfaces/users/index";

import { Request, Response, NextFunction } from 'express';
import { hash as hashPassword,compare as comparePassword } from 'bcrypt';
import UsersModel from "../../models/users";
import { generateJwtToken, removePropFromObject } from "../../utils";
import slugify from 'slugify';
import randomWords from 'random-words';


export default class UsersController{

  static async logInUser(req: Request, res: Response):Promise<void>{
    try {
      const emailOrUsername = req.body.email_or_username;
      const{password
    } = req.body;
      
      if(!(password && emailOrUsername )){
        res.status(400).json({
  message:"Email or username and Password are required"
})
        return
      }
    // check if user exist 
      const [usernameExist, emailExist] = await Promise.all([await UsersModel.findByUsername(emailOrUsername,['password']), UsersModel.findByEmail(emailOrUsername,['password'])]) as [IUsersRecord,IUsersRecord];
      console.log(usernameExist,emailExist)
    if (!(usernameExist || emailExist)) {
      res.status(404).json({
        message: "user does not exist"
      });
      return
    }
      const prevPassword = usernameExist?.password ? usernameExist?.password : emailExist?.password;
      const isPasswordMatch = await comparePassword(String(password), prevPassword);
      if (!isPasswordMatch) {
        
        res.status(403).json({
          user: null,
          message: "Invalid credentials",
  
        });
        return
      }
      let user = usernameExist ? usernameExist : emailExist;
      user = removePropFromObject(user, 'password') as IUsersRecord;
      //const token = generateJwtToken(emailExist);
      res.status(200).json({
        message: "user retrieved",
        user
        
      });
    } catch (error) {
      res.status(500).json({
        message: "an error occurred ",error
      });
    }

  }
  static async createNewUser (
req: Request,
res: Response,next:NextFunction
  ):Promise<void> {
    try {
      let username= req.body.username ? req.body.username : randomWords({ exactly: 2, maxLength: 6 });
      username = slugify(username);
    const password = await hashPassword(String(req.body.password),10);
      const profile_image = req.photo_url || 'https://images.pexels.com/photos/3494648/pexels-photo-3494648.jpeg?auto=compress&cs=tinysrgb&w=640&h=854&dpr=2';
      
      const newUser: IUsersRecord = {
      email: req.body.email,
      firstname: req.body.firstname,
      username,
      password,
      profile_image
      };
      
    // check if user already exist 
      const [usernameExist, emailExist] = await Promise.all([await UsersModel.findByUsername(newUser.username), UsersModel.findByEmail(newUser.email)]);
      
    if (usernameExist) {
      res.status(400).json({
        message:"username is already taken"
      })
      return
    }
     if (emailExist) {
      res.status(400).json({
        message:"user already exist, do you want to login?"
      })
       return
    }
    const insertId = (await UsersModel.create(newUser) as number[]);

    let user!: IUsersResult;
    let token!:string;
    try {
      const result = await UsersModel.findById(insertId[0]) as any;
      user = result
      
      console.log(user,'here')
    
      token = generateJwtToken(user);
      
    }
    catch (error){
      throw error
    }
    res.status(201).json({
      user,
      token,
      messsage: "account successfully created ",
   });
  } catch (error) {
    res.status(500).json({
      error,
      message: "an error occured",
    });
  }
}
}