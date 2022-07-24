import { Request, Response, NextFunction } from 'express';
import { IUsersResult } from './users';

export type DateType = string | Date;

export interface IRequest extends Request{
    user: IUsersResult,
    jwtToken:string
}
export interface IResponse extends Response{
    

}
export interface INext extends NextFunction{

}
