import { IUsersResult } from './users';

export type DateType = string | Date;

declare global{

    
   declare namespace Express{

        interface Request{
            user: IUsersResult,
            jwtToken: string;
            photo_url: string;
            photos_url:string[]
    }

}

}