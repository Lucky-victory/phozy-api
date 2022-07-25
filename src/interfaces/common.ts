import { IUsersResult } from './users';

export type DateType = string | Date;

declare global{

    
    namespace Express{

        interface Request{
            user: IUsersResult,
            jwtToken: string;
            photo_url: string;
            photos_url:string[]
    }
    interface Response{
        
        
    }
}

}