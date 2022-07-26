import multer from 'multer';
import { v4 as uuidV4 } from 'uuid';
import path from 'path';

export default class ImageUploader{


    static upload() {
        let photo_url = '';
        const destination ='uploads/';
        const storage = multer.diskStorage({
            destination,
            filename(req, file, callback) {
                const uniqueSuffix: string = Date.now() + '' + uuidV4();
                const filename = `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`;
                callback(null,filename)
                
                
                photo_url = `${ req.protocol }://${ req.hostname }/${destination}${ filename }`;
                
                req.photo_url = photo_url;
            },
        });
        
        return multer({ storage: storage });
        
    }

    static uploadMany() {
        let photos_url:string[] = [];
        const destination = 'uploads/';
        const storage = multer.diskStorage({
            destination,
            filename(req, file, callback) {
                const uniqueSuffix: string = Date.now() + '' + uuidV4();
                const filename = `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`;
                callback(null,filename)
                
                
                // photos_url = `${ req.protocol }://${ req.hostname }/${destination}${ filename }`;
                // console.log(photo_url);
                
                // req.photo_url = photo_url;
            },
        });
        
        return multer({ storage: storage });
        
    }
}
