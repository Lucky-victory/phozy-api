import { IAlbum } from "../../interfaces/albums";
import { Request, Response, NextFunction } from 'express';

import AlbumModel from '../../models/albums';
import UsersModel from '../../models/users';

export default class AlbumController {

    static async createNewAlbum(req: Request, res: Response):Promise<void> {
        try {
            const { user } = req
            const album: IAlbum = {
                title: req.body.title, description: req.body.description, private: req.body.private, user_id: user.id
            }
    
            const result = await AlbumModel.create(album);

        res.status(201).json({
                message: "album successfully created",
                album: result,
        
            })
        }
        catch (error) {
             res.status(500).json({
                message: "an error occurred", error
            })
        }
    }
static async getAlbumById(req: Request, res: Response, next: NextFunction):Promise<void> {
    try {
        const { album_id }= req.params;
            const albumId= parseInt(album_id,10);
        let result;
        const album = await AlbumModel.findById(albumId);
        if (album) {
            
            const user = await UsersModel.findById(album.user_id);
            // const photos= await 
        }
            res.status(201).json({
                message: "album retrieved",
                album: result,
        
            })
        }
        catch (error) {
            res.status(500).json({
                message: "an error occurred", error
            })
        }
    }
}