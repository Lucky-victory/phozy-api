import { IUsersRecord, IUsersResult } from "./../../interfaces/users/index";

import { NextFunction, Request, Response } from "express";
import  UsersModel from "../../models/users";
import { generateJwtToken } from "../../utils";


