import { IAlbum, } from "../../interfaces/albums";
import { IRequest ,IResponse,INext} from "../../interfaces/common";
import AlbumModel from '../../models/album';

export default class AlbumController {

    static async createNewAlbum(req: IRequest, res: IResponse, next: INext):Promise<void> {
        try {
            const { user } = req
            const album: IAlbum = {
                title: req.body.title, description: req.body.description, coverImage: req.body.coverImage, private: req.body.private, userId: user.id
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
static async getAlbumById(req: IRequest, res: IResponse, next: INext):Promise<void> {
    try {
        const { album_id }= req.params;
            const albumId= parseInt(album_id,10);

            const result = await AlbumModel.findById(albumId);

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
}